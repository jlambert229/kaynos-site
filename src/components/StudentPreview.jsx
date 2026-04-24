/**
 * Static visual render of the student/client mobile app interface.
 * Shown in the Demos section alongside CoachPreview for side-by-side comparison.
 * Pure CSS/JSX - no real data, no API calls.
 */
import KaynosLogo from "./KaynosLogo";

const ACCENT = "#3b7dd8";

const sessions = [
  { title: "Guard Retention Drill", coach: "Professor Marco", time: "Today", watched: false, notes: 4 },
  { title: "Takedown Entry - Single Leg", coach: "Professor Marco", time: "Yesterday", watched: true, notes: 2 },
  { title: "Half Guard Sweeps", coach: "Professor Marco", time: "3 days ago", watched: true, notes: 5 },
];

const classes = [
  { title: "Fundamentals - April 10", coach: "Professor Marco", time: "Today", watched: false },
  { title: "Advanced: Back Attacks", coach: "Coach Kenji", time: "Yesterday", watched: true },
];

const tabs = [
  { label: "Home", active: true, icon: IconHome },
  { label: "Sessions", icon: IconPlay },
  { label: "Classes", icon: IconCalendar },
  { label: "Profile", icon: IconUser },
];

export default function StudentPreview() {
  const unwatched = sessions.filter((s) => !s.watched).length;
  return (
    <div className="sp-frame" role="img" aria-label="Kaynos student mobile app preview">
      <div className="sp-notch" aria-hidden="true" />

      <div className="sp-status" aria-hidden="true">
        <span className="sp-status-time">9:41</span>
        <span className="sp-status-icons">
          <IconSignal />
          <IconWifi />
          <IconBattery />
        </span>
      </div>

      <div className="sp-appbar">
        <KaynosLogo size="sm" color={ACCENT} />
        <div className="sp-appbar-text">
          <div className="sp-greeting">Welcome back, Sofia</div>
          <div className="sp-subtitle">
            {unwatched} unwatched session{unwatched !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      <div className="sp-body">
        <div className="sp-section-title">My Sessions</div>
        <div className="sp-list">
          {sessions.map((s) => (
            <div key={s.title} className="sp-item">
              <div className={`sp-status-pill ${s.watched ? "sp-status-pill--watched" : "sp-status-pill--new"}`}>
                {s.watched ? "Watched" : "New"}
              </div>
              <div className="sp-item-body">
                <div className="sp-item-title">{s.title}</div>
                <div className="sp-item-meta">{s.coach} - {s.time}</div>
              </div>
              {s.notes > 0 && <div className="sp-notes-badge">{s.notes}</div>}
            </div>
          ))}
        </div>

        <div className="sp-section-title">Recent Classes</div>
        <div className="sp-list">
          {classes.map((c) => (
            <div key={c.title} className="sp-item">
              <div className={`sp-status-pill ${c.watched ? "sp-status-pill--watched" : "sp-status-pill--new"}`}>
                {c.watched ? "Watched" : "New"}
              </div>
              <div className="sp-item-body">
                <div className="sp-item-title">{c.title}</div>
                <div className="sp-item-meta">{c.coach} - {c.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sp-tabbar" aria-hidden="true">
        {tabs.map(({ label, icon: Icon, active }) => (
          <div key={label} className={`sp-tab ${active ? "sp-tab--active" : ""}`}>
            <Icon />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="sp-home-indicator" aria-hidden="true" />
    </div>
  );
}

function IconSignal() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor" aria-hidden="true">
      <rect x="0" y="7" width="2" height="3" rx="0.5" />
      <rect x="4" y="5" width="2" height="5" rx="0.5" />
      <rect x="8" y="3" width="2" height="7" rx="0.5" />
      <rect x="12" y="1" width="2" height="9" rx="0.5" />
    </svg>
  );
}

function IconWifi() {
  return (
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
      <path d="M1 3.5a8 8 0 0 1 11 0" />
      <path d="M3 5.8a5 5 0 0 1 7 0" />
      <path d="M5 8.1a2 2 0 0 1 3 0" />
      <circle cx="6.5" cy="9.2" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconBattery() {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
      <rect x="0.5" y="1" width="16" height="8" rx="1.5" />
      <rect x="17.5" y="3.5" width="1.5" height="3" rx="0.5" fill="currentColor" />
      <rect x="2" y="2.5" width="12" height="5" rx="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconHome() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}

function IconPlay() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5v7l6-3.5z" fill="currentColor" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}
