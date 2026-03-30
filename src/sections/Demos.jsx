import { ExternalLink, GraduationCap, User } from "lucide-react";

const demos = [
  {
    title: "Instructor demo",
    description:
      "Explore the dashboard, sessions, classes, and coaching tools as an instructor at a sample school.",
    href: "https://demo.kaynos.net",
    icon: GraduationCap,
    cta: "Open instructor demo",
  },
  {
    title: "Student demo",
    description:
      "See the student experience: assigned sessions, class library, video review, and notes.",
    href: "https://student.kaynos.net",
    icon: User,
    cta: "Open student demo",
  },
];

export default function Demos() {
  return (
    <section id="demos" className="section section--alt demos-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Live demos</span>
          <h2 className="section-title">Try Kaynos in the browser</h2>
          <p className="section-subtitle">
            Two sandboxes switch roles instantly. Use real UI with sample data. Nothing to install.
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
                  <Icon size={22} strokeWidth={1.75} aria-hidden />
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
          Each demo includes a banner to jump between instructor and student views.
        </p>
      </div>
    </section>
  );
}
