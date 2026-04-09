/* ── Pricing constants ────────────────────────────────────────────────
 * Single source of truth for every dollar figure on the site.
 * Import from here instead of hard-coding values in sections/pages.
 * ─────────────────────────────────────────────────────────────────── */

/** Monthly coach plan price */
export const COACH_MONTHLY_PRICE = 50;

/** Number of client seats included in the coach plan at no extra cost */
export const FREE_SEATS = 3;

/** Price per additional active client seat per month */
export const SEAT_PRICE = 5;

/** Free trial duration in days */
export const TRIAL_DAYS = 14;

/** Calculate total monthly cost for a given number of clients */
export function calcMonthlyCost(clients) {
  const extraSeats = Math.max(0, clients - FREE_SEATS);
  return COACH_MONTHLY_PRICE + extraSeats * SEAT_PRICE;
}

/* ── Formatted strings (convenience) ──────────────────────────────── */

export const FMT = {
  coachMonthly: `$${COACH_MONTHLY_PRICE}`,
  seatPrice: `$${SEAT_PRICE}`,
  freeSeats: `${FREE_SEATS}`,
};
