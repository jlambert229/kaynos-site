import { useEffect, useRef, useState } from "react";

function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, count };
}

const stats = [
  { value: 500, suffix: "+", label: "Sessions reviewed" },
  { value: 99.9, suffix: "%", label: "Uptime", decimals: 1 },
  { value: 4, suffix: " steps", label: "Setup time", prefix: "< " },
  { value: 0, suffix: "", label: "Your cost at 8 clients", prefix: "$" },
];

export default function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatItem({ value, suffix, label, prefix = "", decimals = 0 }) {
  const { ref, count } = useCountUp(value * (decimals ? 10 : 1));
  const display = decimals ? (count / 10).toFixed(decimals) : count;

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-value">
        {prefix}{display}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
