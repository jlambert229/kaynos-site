import { useState, useRef, useEffect } from "react";
import { Inbox, CircleCheck } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";
import { URLS } from "../config/urls";

export default function Newsletter() {
  const revealRef = useScrollReveal();
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [email, setEmail] = useState("");
  const cooldownTimer = useRef(null);

  useEffect(() => () => clearTimeout(cooldownTimer.current), []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const formData = new FormData(e.target);
      const res = await fetch("/", { method: "POST", body: formData });
      if (!res.ok) throw new Error(res.statusText);
      setStatus("success");
      cooldownTimer.current = setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section newsletter-section">
      <div className="container">
        <div ref={revealRef} className="reveal newsletter-card">
          <div className="newsletter-icon">
            <Inbox size={24} />
          </div>
          <h3 className="newsletter-title">One email a month</h3>
          <p className="newsletter-desc">
            What shipped, what&apos;s next, and things I&apos;ve learned about
            coaching with video. One short email a month — that&apos;s it.
          </p>

          {status === "success" ? (
            <div className="newsletter-success" role="status" aria-live="polite">
              <CircleCheck size={32} className="newsletter-success-icon" />
              <p>You&apos;re on the list. Expect about one email a month.</p>
            </div>
          ) : (
            <form
              name="newsletter"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="fax_number"
              onSubmit={handleSubmit}
              className="newsletter-form-wrap"
            >
              <input type="hidden" name="form-name" value="newsletter" />
              <p style={{ display: "none" }} aria-hidden="true">
                <label>
                  Don&apos;t fill this out: <input name="fax_number" tabIndex={-1} />
                </label>
              </p>
              <div className="newsletter-input-row">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  autoComplete="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  inputMode="email"
                />
                <button
                  type="submit"
                  className="btn btn-primary newsletter-btn"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Subscribing\u2026" : "Subscribe"}
                </button>
              </div>
              <div className="newsletter-consent">
                <input id="newsletter-consent" type="checkbox" name="consent" required />
                <span>
                  <label htmlFor="newsletter-consent">I agree to receive product updates via email.</label>{" "}
                  <a href="/privacy">Privacy Policy</a>.
                </span>
              </div>
            </form>
          )}

          {status === "error" && (
            <p className="newsletter-error" aria-live="polite">Something went wrong. Please try again or email <a href={URLS.support}>support@kaynos.net</a>.</p>
          )}
        </div>
      </div>
    </section>
  );
}
