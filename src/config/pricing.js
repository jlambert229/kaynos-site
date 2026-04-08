/* ── Pricing constants ────────────────────────────────────────────────
 * Single source of truth for every dollar figure on the site.
 * Import from here instead of hard-coding values in sections/pages.
 * ─────────────────────────────────────────────────────────────────── */

/** Monthly coach plan price */
export const COACH_MONTHLY_PRICE = 49;

/** Annual coach plan price (total) */
export const COACH_ANNUAL_PRICE = 488;

/** Annual coach plan price per month (rounded display) */
export const COACH_ANNUAL_PER_MONTH = "40.67";

/** Annual discount percentage */
export const ANNUAL_DISCOUNT_PCT = 17;

/** Credit earned per paid client per month */
export const CLIENT_CREDIT_MONTHLY = 10;

/** Credit earned per paid client per year */
export const CLIENT_CREDIT_ANNUAL = 120;

/** What clients pay per month */
export const CLIENT_PRICE_MONTHLY = 49;

/** Number of free clients included */
export const FREE_CLIENTS = 3;

/** Number of paid clients needed to reach $0 cost */
export const ZERO_COST_PAID_CLIENTS = 5;

/** Total clients when cost reaches $0 (free + paid) */
export const ZERO_COST_TOTAL_CLIENTS = FREE_CLIENTS + ZERO_COST_PAID_CLIENTS;

/** Free trial duration in days */
export const TRIAL_DAYS = 14;

/* ── Formatted strings (convenience) ──────────────────────────────── */

export const FMT = {
  coachMonthly: `$${COACH_MONTHLY_PRICE}`,
  coachAnnual: `$${COACH_ANNUAL_PRICE}`,
  coachAnnualPerMonth: `$${COACH_ANNUAL_PER_MONTH}`,
  clientCreditMonthly: `$${CLIENT_CREDIT_MONTHLY}`,
  clientCreditAnnual: `$${CLIENT_CREDIT_ANNUAL}`,
  clientPriceMonthly: `$${CLIENT_PRICE_MONTHLY}`,
};
