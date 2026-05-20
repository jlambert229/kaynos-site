import { describe, it, expect } from "vitest";
import { validateDistHeaders } from "../scripts/verify-dist-headers.mjs";
import { validateRemoteHeaders } from "../scripts/verify-remote-headers.mjs";

describe("verify-dist-headers helpers", () => {
  it("accepts a hash-based CSP _headers body", () => {
    const body = `# generated
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' https://plausible.io 'sha256-abc123=='; connect-src 'self' https://plausible.io; frame-ancestors 'none'
`;
    expect(validateDistHeaders(body).ok).toBe(true);
  });

  it("rejects CSP without sha256 hashes", () => {
    const body = `Content-Security-Policy: script-src 'self' 'unsafe-inline'`;
    const result = validateDistHeaders(body);
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes("sha256"))).toBe(true);
  });
});

describe("verify-remote-headers helpers", () => {
  it("validates required security headers on a response map", () => {
    const result = validateRemoteHeaders({
      "content-security-policy": "script-src 'self' 'sha256-abc==' https://plausible.io; frame-ancestors 'none'",
      "x-frame-options": "DENY",
      "x-content-type-options": "nosniff",
      "strict-transport-security": "max-age=31536000",
    });
    expect(result.ok).toBe(true);
  });
});
