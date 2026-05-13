#!/usr/bin/env node
/**
 * Generate `dist/.well-known/security.txt` (RFC 9116) with a fresh
 * Expires date (~12 months from the build).
 *
 * Static-file alternative would require manual annual refresh; generating
 * at build time means every deploy ships a non-expired file. Cost is one
 * fs.writeFile per build.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "..", "dist", ".well-known");
const outFile = resolve(outDir, "security.txt");

// 12 months from now, snapped to end-of-day UTC. RFC 9116 §2.5.5 requires
// a future Expires within ~1 year — gives plenty of buffer between rebuilds.
const expires = new Date();
expires.setUTCFullYear(expires.getUTCFullYear() + 1);
expires.setUTCHours(23, 59, 59, 0);

const body = [
  "Contact: mailto:security@kaynos.net",
  `Expires: ${expires.toISOString().split(".")[0]}Z`,
  "Preferred-Languages: en",
  "Canonical: https://www.kaynos.net/.well-known/security.txt",
  "Policy: https://www.kaynos.net/security",
  "",
].join("\n");

await mkdir(outDir, { recursive: true });
await writeFile(outFile, body, "utf8");

console.log(
  `generate-security-txt: wrote dist/.well-known/security.txt (expires ${expires.toISOString().split("T")[0]})`,
);
