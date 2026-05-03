/* ── Competitor data ──────────────────────────────────────────────────
 * Single source of truth for all competitor references on the site.
 * Used by Comparison (feature table).
 *
 * Note: competitor monthly prices are deliberately omitted from the
 * column subtitles. Their pricing pages tier (CoachNow has plans from
 * $9.99 to $900; OnForm has a free tier) and any single number we
 * picked would be cherry-picked. The comparison stands on features.
 * ─────────────────────────────────────────────────────────────────── */

import { FMT } from "../config/pricing";

/* ── Comparison table columns ────────────────────────────────────── */

export const comparisonColumns = [
  { key: "kaynos", label: "Kaynos", sub: `${FMT.coachMonthlySlash} flat` },
  { key: "coachnow", label: "CoachNow", sub: "" },
  { key: "onform", label: "OnForm", sub: "" },
  { key: "diy", label: "Drive + Vimeo", sub: "" },
];

/* ── Comparison table features ───────────────────────────────────── */

export const comparisonFeatures = [
  {
    name: "BJJ-tuned AI prompt",
    detail: "Default AI analysis is written for jiu jitsu rather than generic coaching",
    kaynos: true, coachnow: false, onform: false, diy: false,
  },
  {
    name: "Works in the browser",
    detail: "No app install for coaches or students",
    kaynos: true, coachnow: false, onform: false, diy: true,
  },
  {
    name: "Timestamped video notes",
    detail: "Pin feedback to exact moments",
    kaynos: true, coachnow: true, onform: true, diy: false,
  },
  {
    name: "Students use it free, no app",
    detail: "No cost and no download for your students",
    kaynos: true, coachnow: false, onform: false, diy: true,
  },
  {
    name: "Private sessions + group classes",
    detail: "1-on-1 rolls and shared class content in one place",
    kaynos: true, coachnow: true, onform: false, diy: false,
  },
  {
    name: "All features, one flat price",
    detail: "No tiers, no per-seat math, no upgrade gates",
    kaynos: true, coachnow: false, onform: false, diy: true,
  },
  {
    name: "No per-seat billing",
    detail: "Your price is the same as you add more student accounts",
    kaynos: true, coachnow: false, onform: false, diy: false,
  },
  {
    name: "Watch progress tracking",
    detail: "See who watched their session and how far they got",
    kaynos: true, coachnow: true, onform: false, diy: false,
  },
];
