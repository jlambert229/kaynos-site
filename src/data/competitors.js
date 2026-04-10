/* ── Competitor data ──────────────────────────────────────────────────
 * Single source of truth for all competitor references on the site.
 * Used by Calculator (bar chart) and Comparison (feature table).
 * ─────────────────────────────────────────────────────────────────── */

import { FMT, FREE_SEATS, SEAT_PRICE } from "../config/pricing";

/* ── Calculator bar-chart competitors ────────────────────────────── */

export const calculatorCompetitors = [
  { name: "CoachNow", price: 50, note: "PRO plan, app required", verified: "2026-03" },
  { name: "OnForm", price: 30, note: "Coach plan, iOS only", verified: "2026-03" },
  { name: "Sprongo", price: 49, note: "Small Team (20 members)", verified: "2026-03" },
];

/* ── Comparison table columns ────────────────────────────────────── */

export const comparisonColumns = [
  { key: "kaynos", label: "Kaynos", sub: `${FMT.coachMonthlySlash} coach` },
  { key: "coachnow", label: "CoachNow", sub: "$50/mo" },
  { key: "onform", label: "OnForm", sub: "$30/mo" },
  { key: "diy", label: "Drive + Vimeo", sub: "Free" },
];

/* ── Comparison table features ───────────────────────────────────── */

export const comparisonFeatures = [
  {
    name: "Works in the browser",
    detail: "No app install for coaches or clients",
    kaynos: true, coachnow: false, onform: false, diy: true,
  },
  {
    name: "Timestamped video notes",
    detail: "Pin feedback to exact moments",
    kaynos: true, coachnow: true, onform: true, diy: false,
  },
  {
    name: "Clients use it free",
    detail: "No cost to your clients",
    kaynos: true, coachnow: false, onform: false, diy: true,
  },
  {
    name: "Private sessions + group classes",
    detail: "1-on-1 and shared content in one place",
    kaynos: true, coachnow: true, onform: false, diy: false,
  },
  {
    name: "All features, no tiers",
    detail: "No upgrade gates or feature gating",
    kaynos: true, coachnow: false, onform: false, diy: true,
  },
  {
    name: "Scales by active seats",
    detail: `${FMT.seatPriceSlash} per extra client beyond ${FREE_SEATS} included`,
    kaynos: true, coachnow: false, onform: false, diy: false,
  },
  {
    name: "Works for any coaching style",
    detail: "Fitness, martial arts, music, dance, etc.",
    kaynos: true, coachnow: true, onform: "partial", diy: true,
  },
  {
    name: "Watch tracking",
    detail: "See who's viewed their sessions",
    kaynos: true, coachnow: true, onform: false, diy: false,
  },
  {
    name: "Voice-to-note dictation",
    detail: "Dictate timestamped notes hands-free while watching video",
    kaynos: true, coachnow: false, onform: false, diy: false,
  },
  {
    name: "AI video analysis",
    detail: "AI flags key moments for coach review with one click",
    kaynos: true, coachnow: false, onform: false, diy: false,
  },
  {
    name: "Pose skeleton overlay",
    detail: "Real-time body position overlay for form analysis",
    kaynos: true, coachnow: false, onform: false, diy: false,
  },
];
