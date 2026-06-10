import CtaButton from "../components/CtaButton";
import DemoLink from "../components/DemoLink";
import useScrollReveal from "../hooks/useScrollReveal";
import { TRIAL_DAYS } from "../config/pricing";

export default function CTA() {
  const revealRef = useScrollReveal();

  return (
    <section className="cta-section">
      <div ref={revealRef} className="reveal container cta-container">
        <h2 className="cta-title">Give it a shot.</h2>
        <p className="cta-subtitle">
          Sign up, upload a roll, pin a note, send the link.
          {" "}{TRIAL_DAYS} days free with a card on file — cancel anytime,
          students free.
        </p>
        <div className="cta-actions">
          <CtaButton />
          <DemoLink className="btn btn-outline btn-lg">See a Demo</DemoLink>
        </div>
      </div>
    </section>
  );
}
