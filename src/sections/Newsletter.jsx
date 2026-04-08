import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const revealRef = useScrollReveal();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <section className="section newsletter-section">
      <div className="container">
        <div ref={revealRef} className="reveal newsletter-card">
          {!submitted ? (
            <>
              <div className="newsletter-icon">
                <Mail size={24} />
              </div>
              <h3 className="newsletter-title">Not ready to start a trial?</h3>
              <p className="newsletter-desc">
                Get coaching tips and product updates. No spam, unsubscribe anytime.
              </p>
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                />
                <button type="submit" className="btn btn-primary newsletter-btn">
                  Subscribe
                </button>
              </form>
              <p className="newsletter-note">Join 100+ coaches getting updates.</p>
            </>
          ) : (
            <div className="newsletter-success">
              <CheckCircle size={32} className="newsletter-success-icon" />
              <h3 className="newsletter-title">You're in!</h3>
              <p className="newsletter-desc">
                We'll send you coaching tips and product updates. Check your inbox for a welcome email.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
