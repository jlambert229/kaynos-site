/* ── Competitor data ──────────────────────────────────────────────────
 * Single source of truth for all competitor references on the site.
 * Used by Comparison (feature table).
 * ─────────────────────────────────────────────────────────────────── */

import { FMT } from "../config/pricing";

/* ── Comparison table columns ────────────────────────────────────── */

export const comparisonColumns = [
  { key: "kaynos", label: "Kaynos", sub: `${FMT.coachMonthlySlash} flat` },
  { key: "coachnow", label: "CoachNow", sub: "$50/mo" },
  { key: "onform", label: "OnForm", sub: "$30/mo" },
  { key: "diy", label: "Drive + Vimeo", sub: "Free" },
];

/* ── Comparison table features ───────────────────────────────────── */

export const comparisonFeatures = [
  {
    name: "Built for BJJ & MMA",
    detail: "AI tuned for grappling; examples, language, and workflow match how coaches actually teach",
    kaynos: true, coachnow: "partial", onform: "partial", diy: false,
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
    name: "Unlimited students included",
    detail: "Scale from 5 to 500 without pricing changes",
    kaynos: true, coachnow: false, onform: false, diy: false,
  },
  {
    name: "Watch progress tracking",
    detail: "See who watched their session and how far they got",
    kaynos: true, coachnow: true, onform: false, diy: false,
  },
];
