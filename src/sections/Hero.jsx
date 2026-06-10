import KaynosLogo from "../components/KaynosLogo";
import CtaButton from "../components/CtaButton";
import CoachPreview from "../components/CoachPreview";
import DemoLink from "../components/DemoLink";
import { PRICING_COPY } from "../config/pricing";
import { URLS } from "../config/urls";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg" />
      <div className="container">
        <div className="hero-content">
          <div className="hero-logo-lockup">
            <KaynosLogo size="hero" />
          </div>
          <h1 className="hero-title">
            Video review for BJJ coaches.
          </h1>
          <p className="hero-description">
            Film on your phone, upload, and pin notes at the moments you
            want your student to come back to. Loop the exact sequence,
            draw on the frame, or dictate the note &mdash; your student
            watches it all in a browser, nothing to install.
          </p>
          <div className="hero-cta-row">
            <CtaButton />
            <DemoLink className="btn btn-secondary">See a Demo</DemoLink>
          </div>
          <p className="hero-meta">
            {PRICING_COPY.heroLine} &middot; {PRICING_COPY.trialNote}
            {" "}<a href="#pricing" className="hero-calc-link">See pricing &rarr;</a>
          </p>
          <p className="hero-meta hero-meta--alt">
            Already invited?{" "}
            <a href={URLS.login}>Log in &rarr;</a>
          </p>
        </div>
        <CoachPreview priority />
      </div>
    </section>
  );
}
