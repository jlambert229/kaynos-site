import { ExternalLink, GraduationCap, User } from "lucide-react";

const demos = [
  {
    title: "Instructor view",
    description:
      "See what it looks like to manage sessions, classes, and students. Poke around with sample data.",
    href: "https://demo.kaynos.net",
    icon: GraduationCap,
    cta: "Try the instructor demo",
  },
  {
    title: "Student view",
    description:
      "See what your students see: their assigned sessions, the class library, and video review with notes.",
    href: "https://student.kaynos.net",
    icon: User,
    cta: "Try the student demo",
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
            No sign-up needed. Just click and explore the real app with sample data.
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
          You can switch between instructor and student views from inside either demo.
        </p>
      </div>
    </section>
  );
}
