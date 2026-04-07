import { Sparkles } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="early-access" className="section section--alt">
      <div className="container">
        <div className="early-access">
          <span className="section-label">Early Access</span>
          <h2 className="section-title">
            We are onboarding coaches now.
          </h2>
          <p className="early-access-desc">
            Be one of the first to try Kaynos and shape what we build next.
            Early access coaches get a direct line to the team and input on
            every feature we ship.
          </p>
          <a
            href="https://app.kaynos.net/signup"
            className="btn btn-primary btn-lg"
          >
            <Sparkles size={18} />
            Request Early Access
          </a>
        </div>
      </div>
    </section>
  );
}
