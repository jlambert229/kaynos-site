const consumedTokenFingerprints = new Set();

export const MAGIC_LINK_ERROR = {
  missing: "Missing magic link token.",
  invalid: "This magic link is invalid. Request a new sign-in email.",
  expired: "This magic link has expired. Request a new sign-in email.",
  replayed: "This magic link was already used. Request a new sign-in email.",
};

function normalizeToken(token) {
  if (typeof token !== "string") {
    return "";
  }

  return token.trim();
}

function fingerprintToken(token) {
  let hash = 5381;

  for (let i = 0; i < token.length; i += 1) {
    hash = (hash * 33) ^ token.charCodeAt(i);
  }

  return `ml_${(hash >>> 0).toString(36)}`;
}

export function parseMagicLinkParams(search) {
  const params = new URLSearchParams(search);
  const token = normalizeToken(params.get("token"));
  const expiresAtValue = params.get("expires_at");

  if (!token) {
    return { token: "", expiresAt: NaN, parseError: "missing" };
  }

  if (!expiresAtValue) {
    return { token, expiresAt: NaN, parseError: "invalid" };
  }

  const expiresAt = Number(expiresAtValue);

  if (!Number.isFinite(expiresAt)) {
    return { token, expiresAt: NaN, parseError: "invalid" };
  }

  return { token, expiresAt, parseError: null };
}

export function resetConsumedTokens() {
  consumedTokenFingerprints.clear();
}

export function consumeMagicLinkToken({ token, expiresAt, now = Date.now() }) {
  const normalizedToken = normalizeToken(token);

  if (!normalizedToken) {
    return { ok: false, code: "missing", message: MAGIC_LINK_ERROR.missing };
  }

  if (!Number.isFinite(expiresAt)) {
    return { ok: false, code: "invalid", message: MAGIC_LINK_ERROR.invalid };
  }

  if (expiresAt <= now) {
    return { ok: false, code: "expired", message: MAGIC_LINK_ERROR.expired };
  }

  const fingerprint = fingerprintToken(normalizedToken);

  if (consumedTokenFingerprints.has(fingerprint)) {
    return { ok: false, code: "replayed", message: MAGIC_LINK_ERROR.replayed };
  }

  consumedTokenFingerprints.add(fingerprint);
  return { ok: true };
}
