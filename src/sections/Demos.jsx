import { ExternalLink, Briefcase, User } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";
import { URLS } from "../config/urls";

const demos = [
  {
    title: "Coach view",
    description:
      "Upload videos, add timestamped notes, manage clients, and track who's watching.",
    href: URLS.demoCoach,
    icon: Briefcase,
    cta: "Try the coach demo",
  },
  {
    title: "Client view",
    description:
      "Watch your assigned sessions, browse shared classes, and add your own notes.",
    href: URLS.demoStudent,
    icon: User,
    cta: "Try the client demo",
  },
];

export default function Demos() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();

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

        <div ref={gridRef} className="reveal demos-grid">
          {demos.map((d) => {
            const Icon = d.icon;
            return (
              <a
                key={d.href}
                href={d.href}
                className="demo-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="demo-card-icon">
                  <Icon size={24} strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="demo-card-title">{d.title}</h3>
                <p className="demo-card-desc">{d.description}</p>
                <span className="demo-card-cta">
                  {d.cta}
                  <ExternalLink size={16} aria-hidden />
                </span>
              </a>
            );
          })}
        </div>

        <p className="demos-note">
          Both demos use sample data. You can switch between coach and client views from inside.
        </p>
      </div>
    </section>
  );
}
