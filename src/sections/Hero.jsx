import { Play } from "lucide-react";
import KaynosLogo from "../components/KaynosLogo";
import CtaButton from "../components/CtaButton";

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
      <div className="hero-bg" />
      <div className="container">
        <div className="hero-content">
          <div className="hero-logo-lockup">
            <KaynosLogo size="hero" />
          </div>
          <h1 className="hero-title">
            Your clients fund your platform.{" "}
            <span className="accent">5 paying clients and your bill is $0.</span>
          </h1>
          <p className="hero-description">
            Each paid client earns you $10/month in credit toward your coach
            plan. Your first 3 clients are free. After that, the math does
            the rest.
          </p>
          <div className="hero-cta-row">
            <CtaButton>Start Free Trial</CtaButton>
          </div>
          <p className="hero-proof-line">
            14-day free trial. Your first 3 clients are on us.
          </p>
        </div>
        {/* TODO: Replace with real product screenshot.
            Recommended: 1200x800 @2x PNG or 8-second WebM loop showing the
            timestamped-notes interaction. Place at /assets/hero-product.png */}
        <div className="hero-mockup">
          <div className="hero-mockup-img">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
