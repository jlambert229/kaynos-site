/* ── Pricing constants ────────────────────────────────────────────────
 * Single source of truth for every dollar figure on the site.
 * Import from here instead of hard-coding values in sections/pages.
 * ─────────────────────────────────────────────────────────────────── */

/** Plan name */
export const PLAN_NAME = "Coach Plan";

/** Monthly coach plan price */
export const COACH_MONTHLY_PRICE = 50;

/** Number of client seats included in the coach plan at no extra cost */
export const FREE_SEATS = 3;

/** Price per additional active client seat per month */
export const SEAT_PRICE = 5;

/** Free trial duration in days */
export const TRIAL_DAYS = 14;

/** Video upload limit */
export const VIDEO_UPLOADS = 100;

/** Storage limit */
export const STORAGE_GB = 50;

/** Video retention period */
export const VIDEO_RETENTION = "6-month";

/** Calculate total monthly cost for a given number of clients */
export function calcMonthlyCost(clients) {
  const extraSeats = Math.max(0, clients - FREE_SEATS);
  return COACH_MONTHLY_PRICE + extraSeats * SEAT_PRICE;
}

/* ── Formatted strings (convenience) ──────────────────────────────── */

export const FMT = {
  coachMonthly: `$${COACH_MONTHLY_PRICE}`,
  coachMonthlySlash: `$${COACH_MONTHLY_PRICE}/mo`,
  seatPrice: `$${SEAT_PRICE}`,
  seatPriceSlash: `$${SEAT_PRICE}/mo`,
  freeSeats: `${FREE_SEATS}`,
  trialDays: `${TRIAL_DAYS}`,
};

/* ── Feature list for the coach plan ─────────────────────────────── */

export const COACH_FEATURES = [
  "All features included",
  `First ${FREE_SEATS} client seats included`,
  `${FMT.seatPriceSlash} per additional active seat`,
  `${VIDEO_UPLOADS} video uploads`,
  `${STORAGE_GB} GB storage`,
  "Videos stored for at least 6 months",
  "Timestamped coach notes",
  "Admin panel & usage reports",
  "Priority support",
  "Clients access for free",
];

/* ── Seat pricing examples ───────────────────────────────────────── */

export const SEAT_EXAMPLES = [
  { clients: 3, cost: `$${calcMonthlyCost(3)}`, note: `${FREE_SEATS} seats included` },
  { clients: 5, cost: `$${calcMonthlyCost(5)}`, note: "" },
  { clients: 10, cost: `$${calcMonthlyCost(10)}`, note: "" },
  { clients: 20, cost: `$${calcMonthlyCost(20)}`, note: "" },
  { clients: 50, cost: `$${calcMonthlyCost(50)}`, note: "" },
];

/* ── Copy fragments used in multiple places ──────────────────────── */

export const PRICING_COPY = {
  heroLine: `${FMT.coachMonthlySlash}. First ${FREE_SEATS} clients included. ${FMT.seatPrice} per extra client.`,
  subtitle: `Coaches pay ${FMT.coachMonthlySlash}. First ${FREE_SEATS} client seats are included. Each additional active seat is ${FMT.seatPriceSlash}. Clients never pay anything. Monthly true-up based on active seats.`,
  creditDesc: `${FMT.coachMonthlySlash} base includes ${FREE_SEATS} client seats. Each additional active seat is ${FMT.seatPriceSlash}. Your bill adjusts monthly based on how many clients are active.`,
  ctaLine: `${FMT.coachMonthlySlash}. ${FREE_SEATS} clients included. ${FMT.seatPrice} per extra. ${TRIAL_DAYS}-day trial.`,
  trialNote: `${TRIAL_DAYS}-day trial. Card on file.`,
  seoDescription: `Kaynos is private video review for coaches. ${FMT.coachMonthlySlash}. First ${FREE_SEATS} clients included. ${FMT.seatPrice} per extra active seat. Clients use it free.`,
  jsonLdProductDesc: `Private video review platform for coaches. ${FMT.coachMonthlySlash}. First ${FREE_SEATS} client seats included. ${FMT.seatPriceSlash} per additional active seat. Clients use it free.`,
  jsonLdOfferDesc: `Coach plan. All features included. First ${FREE_SEATS} client seats included. ${FMT.seatPriceSlash} per additional active seat. Clients access for free. ${TRIAL_DAYS}-day trial, card on file.`,
};
