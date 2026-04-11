import { ExternalLink, LayoutDashboard, CirclePlay } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";
import CoachPreview from "../components/CoachPreview";
import StudentPreview from "../components/StudentPreview";
import { URLS } from "../config/urls";

export default function Demos() {
  const headerRef = useScrollReveal();
  const previewRef = useScrollReveal();

  return (
    <section id="demos" className="section section--alt demos-section">
      <div className="container">
        <div ref={headerRef} className="reveal section-header">
          <span className="section-label">Live demos</span>
          <h2 className="section-title">See it for yourself</h2>
          <p className="section-subtitle">
            No sign-up needed. Click and explore the real app with sample data.
          </p>
        </div>

        <div ref={previewRef} className="reveal demos-previews">
          <div className="demos-preview-col">
            <div className="demos-preview-label">
              <LayoutDashboard size={16} aria-hidden />
              Coach dashboard
            </div>
            <CoachPreview />
            <a
              href={URLS.demoCoach}
              className="demos-preview-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try the coach demo <ExternalLink size={14} aria-hidden />
            </a>
          </div>

          <div className="demos-preview-col">
            <div className="demos-preview-label">
              <CirclePlay size={16} aria-hidden />
              Student dashboard
            </div>
            <StudentPreview />
            <a
              href={URLS.demoStudent}
              className="demos-preview-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try the student demo <ExternalLink size={14} aria-hidden />
            </a>
          </div>
        </div>

        <p className="demos-note">
          Both demos use sample data. You can switch between coach and client views from inside.
        </p>
      </div>
    </section>
  );
}
