/* ── Pricing constants ────────────────────────────────────────────────
 * Single source of truth for every dollar figure on the site.
 * Import from here instead of hard-coding values in sections/pages.
 * ─────────────────────────────────────────────────────────────────── */

/** Plan name */
export const PLAN_NAME = "Coach Plan";

/** Monthly coach plan price (flat, no per-seat) */
export const COACH_MONTHLY_PRICE = 29;

/** Free trial duration in days */
export const TRIAL_DAYS = 14;

/** Video upload limit (per month) */
export const VIDEO_UPLOADS = 100;

/** Storage limit (total active, oldest videos cycle out after retention period) */
export const STORAGE_GB = 50;

/** Video retention period */
export const VIDEO_RETENTION = "6-month";

/* ── Formatted strings (convenience) ──────────────────────────────── */

export const FMT = {
  coachMonthly: `$${COACH_MONTHLY_PRICE}`,
  coachMonthlySlash: `$${COACH_MONTHLY_PRICE}/mo`,
  trialDays: `${TRIAL_DAYS}`,
};

/* ── Feature list for the coach plan ─────────────────────────────── */

export const COACH_FEATURES = [
  "All features included",
  "Unlimited student accounts",
  "AI sparring breakdown",
  "Voice-to-note dictation",
  "Timestamped coach notes",
  "Private sessions & group classes",
  `${VIDEO_UPLOADS} video uploads per month`,
  `${STORAGE_GB} GB active storage`,
  "6-month video retention",
  "Session scheduling & private lesson booking",
  "Custom gym branding",
  "Admin panel & usage reports",
  "Direct email support",
];

/* ── Copy fragments used in multiple places ──────────────────────── */

export const PRICING_COPY = {
  heroLine: `${FMT.coachMonthlySlash} flat. All features. Unlimited students.`,
  subtitle: `${FMT.coachMonthlySlash}. No per-seat math. No tiers. Your students access everything for free.`,
  ctaLine: `${FMT.coachMonthlySlash}. Unlimited students. ${TRIAL_DAYS}-day trial.`,
  trialNote: `${TRIAL_DAYS}-day trial. Card on file.`,
  seoDescription: `Video review for BJJ coaches. ${FMT.coachMonthlySlash} flat, unlimited students. AI flags the sweeps, submissions, and scrambles worth reviewing.`,
  jsonLdProductDesc: `Private video review platform built for BJJ and MMA coaches. ${FMT.coachMonthlySlash} flat. Unlimited students. AI flags the moments in sparring footage worth reviewing.`,
  jsonLdOfferDesc: `Coach plan. All features included. Unlimited students. ${TRIAL_DAYS}-day trial, card on file.`,
};
