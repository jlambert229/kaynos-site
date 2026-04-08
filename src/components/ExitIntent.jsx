import { useState, useEffect, useCallback } from "react";
import { X, Sparkles } from "lucide-react";

export default function ExitIntent() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleMouseLeave = useCallback((e) => {
    if (e.clientY <= 0 && !dismissed) {
      setShow(true);
    }
  }, [dismissed]);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("kaynos-exit-intent");
    if (alreadySeen) {
      setDismissed(true);
      return;
    }
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  function dismiss() {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("kaynos-exit-intent", "1");
  }

  if (!show) return null;

  return (
    <div className="exit-overlay" onClick={dismiss}>
      <div className="exit-modal" onClick={(e) => e.stopPropagation()}>
        <button className="exit-close" onClick={dismiss} aria-label="Close">
          <X size={20} />
        </button>
        <div className="exit-icon">
          <Sparkles size={32} />
        </div>
        <h3 className="exit-title">Before you go…</h3>
        <p className="exit-desc">
          Try Kaynos free for 14 days. Your first 3 clients are on us —
          no credit card needed to explore.
        </p>
        <a
          href="https://app.kaynos.net/signup"
          className="btn btn-primary btn-lg exit-cta"
          onClick={dismiss}
        >
          Start Free Trial
        </a>
        <button className="exit-dismiss" onClick={dismiss}>
          No thanks, maybe later
        </button>
      </div>
    </div>
  );
}
