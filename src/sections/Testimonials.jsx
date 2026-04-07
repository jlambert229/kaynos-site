import { Sparkles } from "lucide-react";
import CtaButton from "../components/CtaButton";

export default function Testimonials() {
  return (
    <section id="early-access" className="section section--alt">
      <div className="container">
        <div className="early-access">
          <span className="section-label">From the Team</span>
          <h2 className="section-title">
            Built and shipped by people who train.
          </h2>
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
