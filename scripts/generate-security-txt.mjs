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

// 12 months ahead, snapped to end-of-day UTC. RFC 9116 §2.5.5 requires
// a future Expires within ~1 year — gives plenty of buffer between rebuilds.
export function computeExpires(now = new Date()) {
  const e = new Date(now);
  e.setUTCFullYear(e.getUTCFullYear() + 1);
  e.setUTCHours(23, 59, 59, 0);
  return e;
}

export function buildSecurityTxt(now = new Date()) {
  const expires = computeExpires(now);
  return [
    "Contact: mailto:security@kaynos.net",
    `Expires: ${expires.toISOString().split(".")[0]}Z`,
    "Preferred-Languages: en",
    "Canonical: https://www.kaynos.net/.well-known/security.txt",
    "Policy: https://www.kaynos.net/security",
    "",
  ].join("\n");
}

// Only run the side-effecting write when executed directly (not when
// imported by tests). Compares the resolved path to argv[1].
const isDirectInvocation =
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith("generate-security-txt.mjs");

if (isDirectInvocation) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const outDir = resolve(__dirname, "..", "dist", ".well-known");
  const outFile = resolve(outDir, "security.txt");
  const now = new Date();
  const body = buildSecurityTxt(now);
  await mkdir(outDir, { recursive: true });
  await writeFile(outFile, body, "utf8");
  const expiresDate = computeExpires(now).toISOString().split("T")[0];
  console.log(
    `generate-security-txt: wrote dist/.well-known/security.txt (expires ${expiresDate})`,
  );
}
