import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CtaButton from "../components/CtaButton";
import { URLS } from "../config/urls";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section section--alt">
      <div className="container">
        <div className="early-access">
          <h2 className="section-title">Still early days</h2>

          <div className="early-access-body">
            <p>
              Kaynos is new. There aren&rsquo;t users to quote here yet.
              If you sign up now you&rsquo;ll be one of the first, which
              mostly means you&rsquo;ll have a direct line to me when
              something&rsquo;s broken or missing.
            </p>
            <p>
              Rather look before signing up? The demo is wired up with
              sample BJJ data and works without an account.{" "}
              <a
                href={URLS.demoCoach}
                target="_blank"
                rel="noopener noreferrer"
                className="early-access-link plausible-event-name=Demo+Coach"
              >
                Open the demo <ArrowRight size={14} />
              </a>
            </p>
            <p>
              Or see what&rsquo;s already shipped.{" "}
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
