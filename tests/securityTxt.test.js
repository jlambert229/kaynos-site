import { describe, it, expect } from "vitest";
import { buildSecurityTxt, computeExpires } from "../scripts/generate-security-txt.mjs";

describe("computeExpires", () => {
  it("returns a date ~12 months in the future", () => {
    const now = new Date("2026-05-13T10:00:00Z");
    const exp = computeExpires(now);
    expect(exp.getUTCFullYear()).toBe(2027);
    expect(exp.getUTCMonth()).toBe(4); // May (0-indexed)
    expect(exp.getUTCDate()).toBe(13);
    expect(exp.getUTCHours()).toBe(23);
    expect(exp.getUTCMinutes()).toBe(59);
    expect(exp.getUTCSeconds()).toBe(59);
  });

  // Date math edge case: leap-year Feb 29 → next year is non-leap, JS
  // normalizes to March 1. Confirm the result is still valid.
  it("handles a Feb-29 starting date without throwing", () => {
    const now = new Date("2028-02-29T10:00:00Z"); // 2028 is a leap year
    const exp = computeExpires(now);
    expect(exp).toBeInstanceOf(Date);
    expect(Number.isNaN(exp.getTime())).toBe(false);
    expect(exp.getUTCFullYear()).toBe(2029);
  });
});

describe("buildSecurityTxt", () => {
  it("includes all required RFC 9116 fields", () => {
    const body = buildSecurityTxt(new Date("2026-05-13T10:00:00Z"));
    expect(body).toMatch(/^Contact: mailto:security@kaynos\.net$/m);
    expect(body).toMatch(/^Expires: 2027-05-13T23:59:59Z$/m);
    expect(body).toMatch(/^Preferred-Languages: en$/m);
    expect(body).toMatch(/^Canonical: https:\/\/www\.kaynos\.net\/\.well-known\/security\.txt$/m);
    expect(body).toMatch(/^Policy: https:\/\/www\.kaynos\.net\/security$/m);
  });

  it("ends with a trailing newline (POSIX text convention)", () => {
    const body = buildSecurityTxt();
    expect(body.endsWith("\n")).toBe(true);
  });

  it("never emits an Expires field that is already in the past", () => {
    const body = buildSecurityTxt(new Date());
    const expiresLine = body.split("\n").find((l) => l.startsWith("Expires:"));
    expect(expiresLine).toBeTruthy();
    const expiresAt = new Date(expiresLine.replace("Expires: ", ""));
    expect(expiresAt.getTime()).toBeGreaterThan(Date.now());
  });
});
