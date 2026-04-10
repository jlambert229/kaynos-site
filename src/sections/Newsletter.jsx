import { useState, useRef } from "react";
import { Mail } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const COOLDOWN_MS = 3000;

export default function Newsletter() {
  const revealRef = useScrollReveal();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [error, setError] = useState("");
  const honeypotRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    // Honeypot check
    if (honeypotRef.current && honeypotRef.current.value) return;
    if (!email.trim() || !EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setCooldown(true);
    const subject = encodeURIComponent("Subscribe to updates");
    const body = encodeURIComponent(`Please add ${email} to the mailing list.`);
    window.location.href = `mailto:support@kaynos.net?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setCooldown(false), COOLDOWN_MS);
  }

  return (
    <section className="section newsletter-section">
      <div className="container">
        <div ref={revealRef} className="reveal newsletter-card">
          <div className="newsletter-icon">
            <Mail size={24} />
          </div>
          <h3 className="newsletter-title">Stay in the loop</h3>
          <p className="newsletter-desc">
            Product updates and the occasional coaching tip. Drop us a line and we'll add you to the list.
          </p>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              {/* Honeypot — hidden from humans, bots will fill it */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
                <label htmlFor="nl-company">Company</label>
                <input id="nl-company" type="text" name="company" tabIndex={-1} autoComplete="off" ref={honeypotRef} />
              </div>
              <div className="newsletter-form">
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={254}
                  required
                  aria-label="Email address"
                />
                <button type="submit" className="btn btn-primary newsletter-btn" disabled={cooldown}>
                  {cooldown ? "Sending\u2026" : "Subscribe"}
                </button>
              </div>
              {error && <p className="newsletter-error">{error}</p>}
            </form>
          ) : (
            <p className="newsletter-success">
              Your email client should have opened. If not, email us directly at{" "}
              <a href="mailto:support@kaynos.net?subject=Subscribe%20to%20updates">support@kaynos.net</a>.
            </p>
          )}
          <p className="newsletter-note">We send about one email a month. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
