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
  "AI video analysis",
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
  heroLine: `Flat ${FMT.coachMonthlySlash} for the coach. Students are free.`,
  subtitle: `${FMT.coachMonthlySlash} for the coach, flat. Students stay free no matter how many you add, and every feature is included without tiers.`,
  ctaLine: `${FMT.coachMonthlySlash} for the coach, students free. ${TRIAL_DAYS}-day trial.`,
  trialNote: `${TRIAL_DAYS} days free. Card required to start.`,
  billingNote: `Monthly billing — cancel anytime.`,
  softLimitNote: `If you're approaching ${VIDEO_UPLOADS} uploads or ${STORAGE_GB} GB, I'll send a heads-up around 80% — no surprise cutoffs mid-class.`,
  seoDescription: `Video review built for BJJ coaches. Upload sparring, let AI surface the moments worth reviewing, and send notes straight to your students. ${FMT.coachMonthlySlash} flat — students are free.`,
  jsonLdProductDesc: `Private video review for BJJ and MMA coaches. ${FMT.coachMonthlySlash} flat, students use Kaynos for free. AI surfaces the moments in sparring footage worth reviewing.`,
  jsonLdOfferDesc: `Coach plan. Every feature included, students free. ${TRIAL_DAYS}-day trial, card required.`,
};
