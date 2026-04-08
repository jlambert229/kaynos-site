import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("kaynos-cookies");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem("kaynos-cookies", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p className="cookie-text">
        We use cookies to improve your experience. By continuing to browse, you agree to our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
      <button className="btn btn-primary cookie-accept" onClick={accept}>
        Got it
      </button>
    </div>
  );
}
