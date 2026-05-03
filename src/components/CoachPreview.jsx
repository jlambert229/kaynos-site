/**
 * Real device screenshot of the coach dashboard at app.kaynos.net.
 * Image already includes iPhone bezel + Safari chrome — no CSS device frame.
 *
 * `priority` opts into eager-load + fetchPriority=high for above-the-fold use
 * (Hero). Default is lazy + auto for below-the-fold use (Demos).
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
        src="/app-coach-iphone.png"
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
