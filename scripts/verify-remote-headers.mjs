#!/usr/bin/env node
/**
 * Optional deploy-preview smoke check for security headers on a live Netlify URL.
 *
 * Usage:
 *   DEPLOY_PREVIEW_URL=https://deploy-preview-N--kaynos-site.netlify.app \
 *     node scripts/verify-remote-headers.mjs
 */
const url = process.env.DEPLOY_PREVIEW_URL || process.env.HEADER_CHECK_URL;

/**
 * @param {Record<string, string>} headers
 * @returns {{ ok: boolean, errors: string[] }}
 */
export function validateRemoteHeaders(headers) {
  const errors = [];
  const get = (name) => {
    const key = Object.keys(headers).find((k) => k.toLowerCase() === name.toLowerCase());
    return key ? headers[key] : "";
  };

  const csp = get("content-security-policy");
  if (!csp) errors.push("missing Content-Security-Policy response header");
  else {
    if (!/sha256-[A-Za-z0-9+/=]+/.test(csp)) {
      errors.push("CSP missing sha256-* script hashes");
    }
    if (/script-src[^;]*'unsafe-inline'/.test(csp)) {
      errors.push("CSP script-src includes unsafe-inline");
    }
  }

  for (const name of ["x-frame-options", "x-content-type-options", "strict-transport-security"]) {
    if (!get(name)) errors.push(`missing ${name} header`);
  }

  return { ok: errors.length === 0, errors };
}

async function main() {
  if (!url) {
    console.error("verify-remote-headers: set DEPLOY_PREVIEW_URL or HEADER_CHECK_URL");
    process.exit(1);
  }
  const target = url.replace(/\/$/, "");
  const res = await fetch(`${target}/`, { redirect: "follow" });
  const headers = Object.fromEntries(res.headers.entries());
  const result = validateRemoteHeaders(headers);
  if (!result.ok) {
    console.error(`verify-remote-headers: ${target} failed:`);
    for (const err of result.errors) console.error(`  - ${err}`);
    process.exit(1);
  }
  console.log(`verify-remote-headers: OK (${target})`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error("verify-remote-headers: request failed", err.message);
    process.exit(1);
  });
}
