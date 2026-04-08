import { Sparkles, Quote } from "lucide-react";
import CtaButton from "../components/CtaButton";

const quotes = [
  {
    text: "We kept losing the best coaching moments the second class ended. Kaynos fixed that overnight.",
    name: "J. Lambert",
    role: "Founder & Coach",
  },
  {
    text: "I wanted something my clients could actually use without a tutorial. This is it.",
    name: "Early Access Coach",
    role: "Personal Training",
  },
];

export default function Testimonials() {
  return (
    <section id="early-access" className="section section--alt">
      <div className="container">
        <div className="early-access">
          <span className="section-label">Early Access</span>
          <h2 className="section-title">
            Built and shipped by people who train.
          </h2>

          <div className="testimonial-cards">
            {quotes.map((q) => (
              <div key={q.name} className="testimonial-card">
                <Quote size={24} className="testimonial-quote-icon" />
                <p className="testimonial-text">{q.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {q.name.charAt(0)}
                  </div>
                  <div>
                    <div className="testimonial-name">{q.name}</div>
                    <div className="testimonial-role">{q.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="early-access-desc">
            Kaynos is new and we're shipping fast. Every coach who signs up
            right now gets a direct line to the team and real input on what
            we build next.
          </p>
          <CtaButton>
            <Sparkles size={18} />
            Start Free Trial
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
