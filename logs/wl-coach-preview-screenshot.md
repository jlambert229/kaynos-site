# wl-coach-preview-screenshot

## Goal
Replace the CSS-rendered `<CoachPreview />` (used in Hero + Demos) with a real
device screenshot of the coach dashboard at app.kaynos.net. Student preview
stays untouched until the user provides a student-side screenshot.

## Scope
- Hero (right column on desktop, stacks on mobile)
- Demos section (left "Coach dashboard" column)

## Out of scope
- StudentPreview component / Demos right column — user is still working on it.
- iPad screenshot — moved into `public/` but not wired in yet (no other surface
  asks for a tablet rendering today).

## Inputs
- `iPhone-13-PRO-app.kaynos.net.png` — 762×1550, PNG+RGBA, ~740KB. Includes
  iPhone bezel, Safari status/URL chrome, app dashboard. Coach logged in as
  "Jourdan", school "FL Jitsu Academy".
- `iPad-Air-4-app.kaynos.net.png` — 1382×1916, PNG+RGBA, ~1.1MB. Same content,
  iPad chrome.

## Plan
1. Move both PNGs from repo root → `public/` (so they're not committed loose).
2. Generate WebP variants of the iPhone PNG at 1x (~380px) and 2x (~760px).
   Keep the original PNG as a fallback inside `<picture>`.
3. Rewrite `src/components/CoachPreview.jsx` — replace the JSX/CSS phone with
   a `<picture>` element pointing at the new asset. Keep the default export
   so Hero.jsx and Demos.jsx don't need to change.
4. Delete every `.cp-*` rule from `src/styles.css` (the CSS phone frame is
   gone). Add minimal layout rules for the new image so it sits in the same
   spot at the same width as the old preview.
5. `npm run build` + headless visual check at desktop and mobile.

## Constraints
- Hero image is above-the-fold → optimize aggressively, mark eager + high
  priority for LCP.
- Demos image is below-the-fold → fine to lazy-load.
- Image already includes device chrome → no CSS bezel/notch.
- Memory note: marketing previews stay independent of live demo branding —
  FL Jitsu / Jourdan in this screenshot is fine (not SHJJ).

## Verify
- `npm run build` succeeds, prerendered HTML contains the new img src.
- Headless screenshot of `/` (Hero) and `/#demos` confirms the screenshot
  renders at expected size on desktop and mobile breakpoints.
