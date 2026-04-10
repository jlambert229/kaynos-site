import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";
import { URLS } from "../config/urls";

export default function Newsletter() {
  const revealRef = useScrollReveal();
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const formData = new FormData(e.target);
      await fetch("/", { method: "POST", body: formData });
      setStatus("success");
    } catch {
      setStatus("error");
    }
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
            Product updates and coaching workflow tips — about once a month.
          </p>

          {status === "success" ? (
            <div className="newsletter-success">
              <CheckCircle size={32} className="newsletter-success-icon" />
              <p>You're on the list. We email about once a month.</p>
            </div>
          ) : (
            <form
              name="newsletter"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="newsletter-form"
            >
              <input type="hidden" name="form-name" value="newsletter" />
              {/* Honeypot field for spam prevention */}
              <p style={{ display: "none" }}>
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
              />
              <button
                type="submit"
                className="btn btn-primary newsletter-btn"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Subscribing\u2026" : "Subscribe"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="newsletter-error">Something went wrong. Please try again or email <a href={URLS.support}>support@kaynos.net</a>.</p>
          )}

          <p className="newsletter-note">We send about one email a month. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
