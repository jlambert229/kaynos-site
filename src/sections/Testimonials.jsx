import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CtaButton from "../components/CtaButton";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section section--alt">
      <div className="container">
        <div className="early-access">
          <h2 className="section-title">We're early and we know it</h2>
          <div className="early-access-body">
            <p>
              Kaynos launched recently. We don't have hundreds of testimonials
              or a wall of logos yet. What we do have is a product we use
              ourselves every week and a small group of coaches who've been
              testing it with real clients.
            </p>
            <p>
              If you sign up now, you get a direct line to the team. We read
              every message and we ship fast — check the{" "}
              <Link to="/changelog" className="early-access-link">
                changelog <ArrowRight size={14} />
              </Link>{" "}
              if you want proof.
            </p>
          </div>
          <CtaButton>
            <Sparkles size={18} />
            Join Early Access
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
