/**
 * Real device screenshot of the coach dashboard at app.kaynos.net.
 * Image already includes iPhone bezel + Safari chrome — no CSS device frame.
 *
 * `priority` opts into eager-load + fetchPriority=high for above-the-fold use
 * (Hero). Default is lazy + auto for below-the-fold use (Demos).
 *
 * WebP-only — every browser shipping in the last ~5 years supports it
 * (Safari 14+, iOS 14+, Chrome 32+, Firefox 65+). The 1x source covers
 * the fallback `<img>` for any UA that ignores <picture>/<source>.
 *
 * The matching <link rel="preload" as="image"> is emitted only for the
 * Home route by prerender.jsx — Helmet mangles the imagesrcset attribute
 * casing, so the preload is injected as raw HTML at prerender time
 * instead of via React.
 */
export default function CoachPreview({ priority = false }) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet="/app-coach-iphone-1x.webp 1x, /app-coach-iphone-2x.webp 2x"
      />
      <img
        className="coach-screenshot"
        src="/app-coach-iphone-1x.webp"
        alt="Kaynos coach dashboard on iPhone — welcome banner, KPI tiles, today's schedule, and recent activity"
        width="381"
        height="775"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
