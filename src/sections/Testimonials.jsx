import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CtaButton from "../components/CtaButton";
import { quotes } from "../data/testimonials";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section section--alt">
      <div className="container">
        <div className="early-access">
          <h2 className="section-title">What early adopters say</h2>

          {quotes.length > 0 && (
            <div className="testimonial-cards">
              {quotes.map((q) => (
                <blockquote key={q.name} className="testimonial-card">
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
              These coaches shaped the product alongside us. If you want that
              kind of access, now&rsquo;s the time.{" "}
              <Link to="/changelog" className="early-access-link">
                See what we&rsquo;ve shipped <ArrowRight size={14} />
              </Link>
            </p>
          </div>
          <CtaButton>Start 14-Day Trial</CtaButton>
        </div>
      </div>
    </section>
  );
}
