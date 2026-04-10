import { Mail } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Newsletter() {
  const revealRef = useScrollReveal();

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
          <a href="mailto:support@kaynos.net?subject=Subscribe%20to%20updates" className="btn btn-primary newsletter-btn">
            Email us to subscribe
          </a>
          <p className="newsletter-note">We send about one email a month. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
