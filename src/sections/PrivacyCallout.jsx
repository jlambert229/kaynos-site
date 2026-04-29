import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

export default function PrivacyCallout() {
  const ref = useScrollReveal();

  return (
    <section id="privacy" className="section">
      <div className="container">
        <div ref={ref} className="reveal section-header">
          <span className="section-label">Privacy</span>
          <h2 className="section-title">Isolated by default.</h2>
          <p className="section-subtitle">
            Every academy is fully isolated. No social feeds, no public
            profiles, no way for anyone outside your gym to discover a
            video. Students see only their own sessions. If you run a
            kids program, that isolation isn&apos;t a setting you have to
            remember to flip on &mdash; it&apos;s the default.
          </p>
          <Link to="/security" className="story-contact-link">
            See security details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
