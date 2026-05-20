#!/usr/bin/env node
/**
 * Postbuild: validate dist/_headers CSP output before deploy.
 * Netlify applies _headers on deploy; vite preview does not — this catches
 * regressions in CI/build without needing a live deploy preview.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const HEADERS_FILE = resolve(__dirname, "..", "dist", "_headers");

/**
 * @param {string} body
 * @returns {{ ok: boolean, errors: string[] }}
 */
export function validateDistHeaders(body) {
  const errors = [];
  if (!body.includes("Content-Security-Policy:")) {
    errors.push("missing Content-Security-Policy directive");
  }
  if (!/sha256-[A-Za-z0-9+/=]+/.test(body)) {
    errors.push("CSP script-src missing sha256-* hashes for inline JSON-LD");
  }
  if (/script-src[^;]*'unsafe-inline'/.test(body)) {
    errors.push("script-src must not include 'unsafe-inline'");
  }
  if (!body.includes("https://plausible.io")) {
    errors.push("CSP must allow plausible.io in script-src or connect-src");
  }
  if (!body.includes("frame-ancestors 'none'")) {
    errors.push("CSP must include frame-ancestors 'none'");
  }
  return { ok: errors.length === 0, errors };
}

function main() {
  if (!existsSync(HEADERS_FILE)) {
    console.error("verify-dist-headers: dist/_headers missing — run build first");
    process.exit(1);
  }
  const body = readFileSync(HEADERS_FILE, "utf-8");
  const result = validateDistHeaders(body);
  if (!result.ok) {
    console.error("verify-dist-headers: failed:");
    for (const err of result.errors) console.error(`  - ${err}`);
    process.exit(1);
  }
  console.log("verify-dist-headers: OK (CSP with sha256 hashes present)");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
