import { CheckCircle2, Play } from "lucide-react";
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
    { value: "8", label: "Classes" },
    { value: "97", label: "Notes" },
  ];

  const sessions = [
    {
      title: "Private Session Review",
      meta: "Mar 24 · 12 min · 3 notes",
      badge: "Watched",
      pending: false,
    },
    {
      title: "Group Workshop",
      meta: "Mar 22 · 8 min · 1 note",
      badge: "New",
      pending: true,
    },
    {
      title: "Progress Check-In",
      meta: "Mar 20 · 15 min · 5 notes",
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
                  <Play size={14} color="var(--text-tertiary)" />
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
  const proofItems = [
    "14-day free trial",
    "Not charged until trial ends",
    "Cancel anytime",
  ];

  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <div className="hero-glow hero-glow--blue" />
        <div className="hero-glow hero-glow--red" />
      </div>
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-logo-lockup">
              <KaynosLogo size="hero" />
            </div>
            <div className="hero-badge">Built for coaches</div>
            <h1 className="hero-title">
              Keep your clients improving{" "}
              <span className="accent">between sessions.</span>
            </h1>
            <p className="hero-description">
              Record your sessions, drop in some notes, and give every client
              their own video library to review on their own time. Simple as that.
            </p>
            <div className="btn-group">
              <a
                href="https://app.kaynos.net/signup"
                className="btn btn-primary btn-lg"
              >
                Start Free Trial
              </a>
              <a href="#how-it-works" className="btn btn-secondary btn-lg">
                See How It Works
              </a>
            </div>
            <div className="hero-demo-links">
              <span className="hero-demo-links-label">Live demos</span>
              <a
                href="https://demo.kaynos.net"
                className="hero-demo-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Coach
              </a>
              <span className="hero-demo-sep" aria-hidden>
                ·
              </span>
              <a
                href="https://student.kaynos.net"
                className="hero-demo-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Client
              </a>
            </div>
            <div className="hero-proof">
              {proofItems.map((item) => (
                <div key={item} className="hero-proof-item">
                  <CheckCircle2 size={16} />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="hero-mockup">
            <div className="hero-mockup-img">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
