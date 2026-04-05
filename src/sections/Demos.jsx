import { ExternalLink, GraduationCap, User } from "lucide-react";

const demos = [
  {
    title: "Coach view",
    description:
      "Upload videos, leave timestamped notes, manage clients, organize with tags, and track who's watching. Full admin panel and usage dashboard included.",
    href: "https://demo.kaynos.net",
    icon: GraduationCap,
    cta: "Try the coach demo",
  },
  {
    title: "Client view",
    description:
      "Watch assigned sessions, browse shared classes, add your own notes alongside coach feedback, and resume right where you left off.",
    href: "https://student.kaynos.net",
    icon: User,
    cta: "Try the client demo",
  },
];

export default function Demos() {
  return (
    <section id="demos" className="section section--alt demos-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Live demos</span>
          <h2 className="section-title">See it for yourself</h2>
          <p className="section-subtitle">
            No sign-up needed. Click and explore the real app with sample data.
          </p>
        </div>

        <div className="demos-grid">
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
          Switch between coach and client views from inside either demo.
        </p>
      </div>
    </section>
  );
}
