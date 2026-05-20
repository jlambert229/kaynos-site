import { beforeEach, describe, expect, it } from "vitest";
import {
  consumeMagicLinkToken,
  parseMagicLinkParams,
  resetConsumedTokens,
} from "../src/utils/magicLink";

describe("consumeMagicLinkToken", () => {
  beforeEach(() => {
    resetConsumedTokens();
  });

  it("accepts a valid token once", () => {
    const result = consumeMagicLinkToken({
      token: "abc123",
      expiresAt: Date.now() + 60_000,
    });

    expect(result).toEqual({ ok: true });
  });

  it("normalizes whitespace around tokens", () => {
    const payload = { token: "  abc123  ", expiresAt: Date.now() + 60_000 };
    expect(consumeMagicLinkToken(payload)).toEqual({ ok: true });

    const replayResult = consumeMagicLinkToken({
      token: "abc123",
      expiresAt: Date.now() + 60_000,
    });

    expect(replayResult).toMatchObject({ ok: false, code: "replayed" });
  });

  it("rejects replay attempts", () => {
    const payload = { token: "abc123", expiresAt: Date.now() + 60_000 };
    consumeMagicLinkToken(payload);

    const replayResult = consumeMagicLinkToken(payload);

    expect(replayResult).toMatchObject({ ok: false, code: "replayed" });
    expect(replayResult.message).toMatch(/already used/i);
  });

  it("rejects expired tokens with a clear error", () => {
    const result = consumeMagicLinkToken({
      token: "expired-token",
      expiresAt: Date.now() - 1,
    });

    expect(result).toMatchObject({ ok: false, code: "expired" });
    expect(result.message).toMatch(/expired/i);
  });

  it("rejects invalid expiration values with a clear error", () => {
    const result = consumeMagicLinkToken({ token: "abc123", expiresAt: NaN });

    expect(result).toMatchObject({ ok: false, code: "invalid" });
    expect(result.message).toMatch(/invalid/i);
  });
});

describe("parseMagicLinkParams", () => {
  it("extracts a usable token and expiry from search params", () => {
    const result = parseMagicLinkParams("?token=abc123&expires_at=999999");

    expect(result).toEqual({ token: "abc123", expiresAt: 999999, parseError: null });
  });

  it("returns missing parse error when token is absent", () => {
    const result = parseMagicLinkParams("?expires_at=999999");

    expect(result.parseError).toBe("missing");
  });

  it("returns invalid parse error when expires_at is malformed", () => {
    const result = parseMagicLinkParams("?token=abc123&expires_at=nope");

    expect(result.parseError).toBe("invalid");
  });
});
