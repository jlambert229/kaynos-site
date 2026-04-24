/**
 * Static visual render of the coach mobile app interface.
 * Shown on the marketing site hero to give prospects a taste of the product.
 * Pure CSS/JSX - no real data, no API calls.
 */
import KaynosLogo from "./KaynosLogo";

const ACCENT = "#3b7dd8";
const GREEN = "#30a46c";
const ORANGE = "#f76b15";
const YELLOW = "#ffb224";
const PURPLE = "#6d28d9";

const kpis = [
  { label: "Students", value: "12", color: ACCENT, bg: "rgba(59,125,216,0.12)" },
  { label: "Sessions", value: "48", color: GREEN, bg: "rgba(48,164,108,0.12)" },
  { label: "Classes", value: "30", color: ORANGE, bg: "rgba(247,107,21,0.12)" },
  { label: "Notes", value: "156", color: YELLOW, bg: "rgba(255,178,36,0.12)" },
];

const schedule = [
  { time: "9:00 AM", title: "Fundamentals", type: "class", color: GREEN, dur: "60 min" },
  { time: "11:00 AM", title: "Private - Sofia R.", type: "session", color: ACCENT, dur: "45 min" },
  { time: "2:00 PM", title: "Advanced: Back Attacks", type: "class", color: PURPLE, dur: "60 min" },
];

const activity = [
  { title: "Guard Retention Drill", student: "Sofia Reyes", time: "2h ago", notes: 4, hasVideo: true },
  { title: "X-Guard Sweeps", student: "Jake Morrison", time: "Yesterday", notes: 3, hasVideo: true },
];

const tabs = [
  { label: "Home", active: true, icon: IconHome },
  { label: "Sessions", icon: IconPlay },
  { label: "Classes", icon: IconCalendar },
  { label: "Students", icon: IconUsers },
  { label: "More", icon: IconMore },
];

export default function CoachPreview() {
  return (
    <div className="cp-frame" role="img" aria-label="Kaynos coach mobile app preview">
      <div className="cp-notch" aria-hidden="true" />

      <div className="cp-status" aria-hidden="true">
        <span className="cp-status-time">9:41</span>
        <span className="cp-status-icons">
          <IconSignal />
          <IconWifi />
          <IconBattery />
        </span>
      </div>

      <div className="cp-appbar">
        <KaynosLogo size="sm" color={ACCENT} />
        <div className="cp-appbar-text">
          <div className="cp-greeting">Good morning, Marco</div>
          <div className="cp-date">FL Jitsu Academy</div>
        </div>
      </div>

      <div className="cp-body">
        <div className="cp-kpi-row">
          {kpis.map((k) => (
            <div key={k.label} className="cp-kpi" style={{ borderTopColor: k.color }}>
              <div className="cp-kpi-icon" style={{ background: k.bg, color: k.color }}>●</div>
              <div className="cp-kpi-value">{k.value}</div>
              <div className="cp-kpi-label">{k.label}</div>
            </div>
          ))}
        </div>

        <div className="cp-section-title">Today&apos;s Schedule</div>
        <div className="cp-schedule">
          {schedule.map((s) => (
            <div key={s.time} className="cp-sched-item" style={{ borderLeftColor: s.color }}>
              <div className="cp-sched-time">{s.time}</div>
              <div className="cp-sched-body">
                <div className="cp-sched-title">{s.title}</div>
                <div className="cp-sched-meta">{s.type === "class" ? "Group class" : "Private"} · {s.dur}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="cp-section-title">Recent Activity</div>
        <div className="cp-activity">
          {activity.map((a) => (
            <div key={a.title} className="cp-act-item">
              <div className={`cp-act-icon ${a.hasVideo ? "cp-act-icon--video" : "cp-act-icon--default"}`}>
                <IconPlayGlyph />
              </div>
              <div className="cp-act-body">
                <div className="cp-act-title">{a.title}</div>
                <div className="cp-act-meta">{a.student} · {a.time}</div>
              </div>
              {a.notes > 0 && <div className="cp-act-badge">{a.notes}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="cp-tabbar" aria-hidden="true">
        {tabs.map(({ label, icon: Icon, active }) => (
          <div key={label} className={`cp-tab ${active ? "cp-tab--active" : ""}`}>
            <Icon />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="cp-home-indicator" aria-hidden="true" />
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

function IconPlayGlyph() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="currentColor" aria-hidden="true">
      <path d="M2 1.2v6.6L8 4.5z" />
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

function IconUsers() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7" />
      <path d="M17 14a5 5 0 0 1 4.5 5" />
    </svg>
  );
}

function IconMore() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="19" cy="12" r="1.8" />
    </svg>
  );
}
