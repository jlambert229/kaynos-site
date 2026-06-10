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

/** Active-video limit. The app enforces this as videos stored at once —
 *  NOT a monthly upload counter. Deleting a video (or retention cycling
 *  one out) frees a slot immediately. */
export const ACTIVE_VIDEO_LIMIT = 100;

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
  "Timestamped coach notes",
  "Voice notes with automatic transcripts",
  "A–B loops, segments & session compare",
  "Draw on the frame to mark grips and angles",
  "Private sessions & group classes",
  `${ACTIVE_VIDEO_LIMIT} active videos at a time`,
  `${STORAGE_GB} GB active storage`,
  "6-month video retention",
  "Class RSVPs & private lesson booking",
  "Custom gym branding",
  "Admin panel & usage reports",
  "Direct email support",
];

/* ── Copy fragments used in multiple places ──────────────────────── */

export const PRICING_COPY = {
  /** CTA button label — every trial button on the site uses this. */
  trialCta: `Start ${TRIAL_DAYS}-Day Trial`,
  heroLine: `Flat ${FMT.coachMonthlySlash} for the coach. Students are free.`,
  subtitle: `${FMT.coachMonthlySlash} for the coach, flat. Students stay free no matter how many you add, and every feature is included without tiers.`,
  ctaLine: `${FMT.coachMonthlySlash} for the coach, students free. ${TRIAL_DAYS}-day trial.`,
  trialNote: `${TRIAL_DAYS} days free. Card required to start — no charge until day ${TRIAL_DAYS + 1}, cancel anytime before.`,
  billingNote: `Monthly billing — cancel anytime.`,
  softLimitNote: `If you're approaching ${ACTIVE_VIDEO_LIMIT} active videos or ${STORAGE_GB} GB, I'll send a heads-up around 80% — no surprise cutoffs mid-class.`,
  seoDescription: `Video review for BJJ coaches. Upload sparring, pin notes to the exact moment, and send each student their own session. ${FMT.coachMonthlySlash} flat — students free.`,
  jsonLdProductDesc: `Private video review for BJJ and MMA coaches. ${FMT.coachMonthlySlash} flat, students use Kaynos for free. Timestamped notes, loops, and side-by-side compare on sparring footage.`,
  jsonLdOfferDesc: `Coach plan. Every feature included, students free. ${TRIAL_DAYS}-day trial, card required.`,
};
