import { ExternalLink } from "lucide-react";
import CtaButton from "../components/CtaButton";
import useScrollReveal from "../hooks/useScrollReveal";

export default function CTA() {
  const revealRef = useScrollReveal();

  return (
    <section className="cta-section">
      <div ref={revealRef} className="reveal container cta-container">
        <h2 className="cta-title">Your clients pay for the platform.</h2>
        <p className="cta-subtitle">
          Start your 14-day trial. First 3 clients free, then $10/month credit
          for each one after.
        </p>
        <div className="btn-group cta-actions">
          <CtaButton>Start Free Trial</CtaButton>
          <a
            href="https://demo.kaynos.net"
            className="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Try the Demo <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
