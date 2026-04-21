import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CtaButton from "../components/CtaButton";
import { URLS } from "../config/urls";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section section--alt">
      <div className="container">
        <div className="early-access">
          <h2 className="section-title">Early and transparent</h2>

          <div className="early-access-body">
            <p>
              Kaynos is new. I ship features weekly and every early
              user has a direct line to me. If something&rsquo;s missing,
              I want to hear about it before you work around it.
            </p>
            <p>
              Try the demo with real sample data — no signup
              needed.{" "}
              <a
                href={URLS.demoCoach}
                target="_blank"
                rel="noopener noreferrer"
                className="early-access-link"
              >
                Open the demo <ArrowRight size={14} />
              </a>
            </p>
            <p>
              Or see what&rsquo;s shipped recently.{" "}
              <Link to="/changelog" className="early-access-link">
                Changelog <ArrowRight size={14} />
              </Link>
            </p>
          </div>
          <CtaButton>Start 14-Day Trial</CtaButton>
        </div>
      </div>
    </section>
  );
}
