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
            Open either demo below. No signup, no email. It&apos;s the real app,
            loaded with sample BJJ data.
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
          Both demos run on the same sample data. You can flip between the
          coach and student views without logging out.
        </p>
      </div>
    </section>
  );
}
