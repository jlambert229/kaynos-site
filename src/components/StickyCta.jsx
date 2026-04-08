import { useState, useEffect } from "react";

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 800);
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className={`sticky-cta ${visible ? "sticky-cta-visible" : ""}`}>
      <div className="sticky-cta-inner">
        <span className="sticky-cta-text">
          Start your 14-day free trial — first 3 clients free
        </span>
        <a href="https://app.kaynos.net/signup" className="btn btn-primary sticky-cta-btn">
          Start Free Trial
        </a>
      </div>
    </div>
  );
}
