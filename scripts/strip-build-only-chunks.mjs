#!/usr/bin/env node
/**
 * Post-build cleanup: drop chunks that vite emits to dist/ but no
 * client code path can reach.
 *
 * Targets:
 *   - `parse-*.js` — the link parser from vite-prerender-plugin. Loaded via
 *     `await import('vite-prerender-plugin/parse')` inside the prerender()
 *     function in src/prerender.jsx; that function runs only at build time.
 *   - `server.browser-*.js` — react-dom/server's browser entry. Loaded via
 *     `await import('react-dom/server')` inside the same prerender()
 *     function. Also build-only.
 *
 * Both are pulled in by `src/prerender.jsx`'s build path, never by the
 * client hydration entry. The dynamic-import keeps them in their own
 * chunks; no HTML references them; the prerender bundle preserves the
 * `import("./...")` strings, but no live code in either chunk calls the
 * function that triggers those imports at runtime.
 *
 * Before stripping, we verify:
 *   1. No HTML in dist/ references the file.
 *   2. The only JS chunk that references it is the prerender bundle
 *      itself (which references it via __vite__mapDeps and `import()`,
 *      both inside the build-only `prerender()` function).
 *
 * If either check fails we exit non-zero rather than silently shipping
 * a broken build.
 */
import { readFile, readdir, stat, unlink } from "node:fs/promises";
import { resolve, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const ASSETS = join(DIST, "assets");

const STRIPPABLE_PREFIXES = ["parse-", "server.browser-"];

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile()) yield full;
  }
}

async function main() {
  let assetEntries;
  try {
    assetEntries = await readdir(ASSETS);
  } catch {
    console.error(`strip-build-only-chunks: ${ASSETS} not found. Run 'npm run build' first.`);
    process.exit(1);
  }

  const targets = assetEntries.filter((name) =>
    STRIPPABLE_PREFIXES.some((prefix) => name.startsWith(prefix) && name.endsWith(".js")),
  );
  if (targets.length === 0) {
    console.log("strip-build-only-chunks: nothing to strip.");
    return;
  }

  let stripped = 0;
  let bytesSaved = 0;

  for (const target of targets) {
    const targetPath = join(ASSETS, target);
    const targetMap = `${targetPath}.map`;

    // 1. No HTML may reference the file.
    let htmlRefs = [];
    for await (const file of walk(DIST)) {
      if (!file.endsWith(".html")) continue;
      const content = await readFile(file, "utf-8");
      if (content.includes(target)) htmlRefs.push(relative(DIST, file));
    }
    if (htmlRefs.length > 0) {
      console.error(`strip-build-only-chunks: refusing to strip ${target} — referenced by HTML: ${htmlRefs.join(", ")}`);
      process.exit(1);
    }

    // 2. The only JS chunk that may reference it is the prerender bundle.
    //    `assetEntries` is a snapshot taken before any strips, so files
    //    deleted in earlier loop iterations may no longer exist on disk.
    //    Treat ENOENT as "gone, can't reference anything."
    const offendingJsRefs = [];
    for (const name of assetEntries) {
      if (!name.endsWith(".js") || name === target) continue;
      if (name.startsWith("prerender-")) continue;
      let content;
      try {
        content = await readFile(join(ASSETS, name), "utf-8");
      } catch (err) {
        if (err.code === "ENOENT") continue;
        throw err;
      }
      if (content.includes(target)) offendingJsRefs.push(name);
    }
    if (offendingJsRefs.length > 0) {
      console.error(`strip-build-only-chunks: refusing to strip ${target} — referenced by client JS: ${offendingJsRefs.join(", ")}`);
      process.exit(1);
    }

    // Safe to strip. Remove the chunk and its sourcemap if present.
    const size = (await stat(targetPath)).size;
    await unlink(targetPath);
    bytesSaved += size;
    try {
      const mapSize = (await stat(targetMap)).size;
      await unlink(targetMap);
      bytesSaved += mapSize;
    } catch {
      /* sourcemap may not exist (e.g. when minify drops them) */
    }
    stripped++;
    console.log(`strip-build-only-chunks: removed ${target} (${(size / 1024).toFixed(1)} kB)`);
  }

  console.log(
    `strip-build-only-chunks: stripped ${stripped} chunk${stripped === 1 ? "" : "s"}, ${(bytesSaved / 1024).toFixed(1)} kB removed from dist/.`,
  );
}

main().catch((err) => {
  console.error("strip-build-only-chunks: unexpected error");
  console.error(err);
  process.exit(1);
});
