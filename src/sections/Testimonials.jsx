import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CtaButton from "../components/CtaButton";
import { stats, quotes } from "../data/testimonials";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section section--alt">
      <div className="container">
        <div className="early-access">
          <h2 className="section-title">Real numbers, real coaches</h2>

          <div className="stats-bar">
            <div className="stats-item">
              <span className="stats-number">{stats.coaches}</span>
              <span className="stats-label">coaches</span>
            </div>
            <div className="stats-item">
              <span className="stats-number">{stats.sessionsReviewed}</span>
              <span className="stats-label">sessions reviewed</span>
            </div>
            <div className="stats-item">
              <span className="stats-number">{stats.hoursOfVideo}</span>
              <span className="stats-label">hours of video</span>
            </div>
          </div>

          {quotes.length > 0 && (
            <div className="testimonial-cards">
              {quotes.map((q, i) => (
                <blockquote key={i} className="testimonial-card">
                  <p className="testimonial-text">&ldquo;{q.text}&rdquo;</p>
                  <footer className="testimonial-footer">
                    <strong>{q.name}</strong>
                    <span>
                      {q.discipline} &middot; {q.roster}
                    </span>
                  </footer>
                </blockquote>
              ))}
            </div>
          )}

          <div className="early-access-body">
            <p>
              We launched recently. These numbers are real — not projected, not
              rounded up. We earn trust by shipping fast and listening. Check
              the{" "}
              <Link to="/changelog" className="early-access-link">
                changelog <ArrowRight size={14} />
              </Link>{" "}
              if you want proof.
            </p>
          </div>
          <CtaButton>
            <Sparkles size={18} />
            Want to try it? Join Early Access
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
