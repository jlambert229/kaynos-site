/* ── Business identity ────────────────────────────────────────────────
 * Single source of truth for the company's postal address and the
 * structured pieces of it. Use BUSINESS_ADDRESS_LINE for prose surfaces
 * (privacy policy, email footers); the structured fields feed JSON-LD
 * and any future address-emitting code (CAN-SPAM footers, invoices).
 * ─────────────────────────────────────────────────────────────────── */

export const BUSINESS = {
  name: "Kaynos",
  city: "Safety Harbor",
  region: "FL",
  postalCode: "34695",
  country: "US",
};

/** Single-line address suitable for inline copy or email footers. */
export const BUSINESS_ADDRESS_LINE = `${BUSINESS.city}, ${BUSINESS.region} ${BUSINESS.postalCode}`;

/* ── Document update markers ──────────────────────────────────────────
 * Last-updated dates that surface on legal-ish pages without their own
 * effective-date semantics. Keep these as human-readable month/year so
 * editors can update one place when content changes. Pages with formal
 * "Effective date: …" lines (PrivacyPolicy, DataUsePolicy) keep their
 * own page-local consts because those dates have legal weight.
 * ─────────────────────────────────────────────────────────────────── */
export const PROCESSORS_LAST_UPDATED = "April 2026";
export const ACCESSIBILITY_LAST_UPDATED = "April 2026";
