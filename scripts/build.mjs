#!/usr/bin/env node
/**
 * Wrapper around `vite build` that force-exits once the build + prerender
 * finish. vite 8 + rolldown-rc leaves dangling native handles after
 * `writeBundle`, so the parent process never exits on its own — causing
 * Netlify to sit on "Deploy Preview processing" until the build timeout.
 *
 * We spawn vite, stream its output verbatim, and once both the "built in"
 * and "Prerendered N pages" sentinels have been seen, we give writes a
 * brief grace window and then SIGTERM (escalating to SIGKILL) so
 * `npm run build` returns with exit code 0 and the `postbuild` sitemap
 * step can run.
 */
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const viteBin = path.join(
  projectRoot,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "vite.cmd" : "vite",
);

const args = ["build", ...process.argv.slice(2)];
const child = spawn(viteBin, args, {
  cwd: projectRoot,
  stdio: ["inherit", "pipe", "pipe"],
  env: process.env,
});

const BUILT_RE = /built in \d/;
const PRERENDER_RE = /Prerendered \d+ pages?/;
const GRACE_MS = 1500;
const KILL_ESCALATION_MS = 2000;

let buffer = "";
let builtSeen = false;
let prerenderSeen = false;
let shutdownScheduled = false;

function maybeScheduleShutdown() {
  if (shutdownScheduled) return;
  if (!builtSeen || !prerenderSeen) return;
  shutdownScheduled = true;
  setTimeout(() => {
    if (child.exitCode != null || child.signalCode) return;
    child.kill("SIGTERM");
    setTimeout(() => {
      if (child.exitCode != null || child.signalCode) return;
      child.kill("SIGKILL");
    }, KILL_ESCALATION_MS).unref();
  }, GRACE_MS).unref();
}

function pipeAndScan(stream, outStream) {
  stream.on("data", (chunk) => {
    outStream.write(chunk);
    buffer += chunk.toString("utf8");
    if (buffer.length > 64 * 1024) buffer = buffer.slice(-32 * 1024);
    if (!builtSeen && BUILT_RE.test(buffer)) builtSeen = true;
    if (!prerenderSeen && PRERENDER_RE.test(buffer)) prerenderSeen = true;
    maybeScheduleShutdown();
  });
}

pipeAndScan(child.stdout, process.stdout);
pipeAndScan(child.stderr, process.stderr);

child.on("error", (err) => {
  console.error(`[build.mjs] failed to spawn vite: ${err.message}`);
  process.exit(1);
});

child.on("close", (code, signal) => {
  if (shutdownScheduled && builtSeen && prerenderSeen) {
    process.exit(0);
  }
  if (code != null) process.exit(code);
  process.exit(signal ? 1 : 0);
});

for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"]) {
  process.on(sig, () => {
    if (child.exitCode == null && !child.signalCode) child.kill(sig);
  });
}
