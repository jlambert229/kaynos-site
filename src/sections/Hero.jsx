import { Play } from "lucide-react";
import KaynosLogo from "../components/KaynosLogo";

function DashboardMockup() {
  const navItems = [
    { label: "Dashboard", active: true },
    { label: "Clients", active: false },
    { label: "Sessions", active: false },
    { label: "Classes", active: false },
  ];

  const stats = [
    { value: "12", label: "Clients" },
    { value: "34", label: "Sessions" },
    { value: "$90", label: "Credits" },
    { value: "97", label: "Notes" },
  ];

  const sessions = [
    {
      title: "Private Session Review",
      meta: "Mar 24 \u00b7 12 min \u00b7 3 notes",
      badge: "Watched",
      pending: false,
    },
    {
      title: "Group Workshop",
      meta: "Mar 22 \u00b7 8 min \u00b7 1 note",
      badge: "New",
      pending: true,
    },
    {
      title: "Progress Check-In",
      meta: "Mar 20 \u00b7 15 min \u00b7 5 notes",
      badge: "Watched",
      pending: false,
    },
  ];

  return (
    <div className="mockup-window">
      <div className="mockup-titlebar">
        <div className="mockup-dot mockup-dot--red" />
        <div className="mockup-dot mockup-dot--yellow" />
        <div className="mockup-dot mockup-dot--green" />
        <div className="mockup-url">app.kaynos.net</div>
      </div>
      <div className="mockup-body">
        <div className="mockup-sidebar">
          <div className="mockup-nav">
            {navItems.map((item) => (
              <div
                key={item.label}
                className={`mockup-nav-item${item.active ? " active" : ""}`}
              >
                {item.label}
              </div>
            ))}
          </div>
          <div className="mockup-content">
            <div className="mockup-stat-row">
              {stats.map((stat) => (
                <div key={stat.label} className="mockup-stat">
                  <div className="mockup-stat-value">{stat.value}</div>
                  <div className="mockup-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
            {sessions.map((session) => (
              <div key={session.title} className="mockup-session">
                <div className="mockup-session-thumb">
                  <Play size={12} color="var(--text-tertiary)" />
                </div>
                <div className="mockup-session-info">
                  <div className="mockup-session-title">{session.title}</div>
                  <div className="mockup-session-meta">{session.meta}</div>
                </div>
                <span
                  className={`mockup-badge${session.pending ? " mockup-badge--pending" : ""}`}
                >
                  {session.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <div className="hero-glow hero-glow--blue" />
        <div className="hero-glow hero-glow--warm" />
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-logo-lockup" style={{ marginBottom: 32 }}>
            <KaynosLogo size="hero" />
          </div>
          <h1 className="hero-title">
            Better feedback tools.{" "}
            <span className="accent">Lower cost per client.</span>
          </h1>
          <p className="hero-description">
            Your clients get video review, timestamped notes, and progress tracking.
            Every active client lowers your monthly cost. Enroll enough and the platform pays for itself.
          </p>
          <div className="hero-cta-row">
            <a
              href="https://app.kaynos.net/signup"
              className="btn btn-primary btn-lg"
            >
              Start Free Trial
            </a>
          </div>
          <p className="hero-proof-line">
            14-day free trial. First 3 clients free. No credit card required.
          </p>
        </div>
        <div className="hero-mockup">
          <div className="hero-mockup-img">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
