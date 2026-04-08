import { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";

const SIGNUP_URL = "https://app.kaynos.net/signup";

export default function CtaButton({ children, className = "btn btn-primary btn-lg" }) {
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const delay = prefersReduced ? 0 : 400;

    setTimeout(() => {
      window.location.href = SIGNUP_URL;
    }, delay);
  }, [loading]);

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 size={18} className="cta-spinner" aria-hidden="true" />
          <span aria-live="polite">Processing&hellip;</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
