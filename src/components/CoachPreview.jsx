/**
 * Static visual render of the coach dashboard interface.
 * Shown on the marketing site hero to give prospects a taste of the product.
 * Pure CSS/JSX - no real data, no API calls.
 */

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
  { time: "5:30 PM", title: "Competition Team", type: "class", color: ORANGE, dur: "90 min" },
];

const activity = [
  { title: "Guard Retention Drill", student: "Sofia Reyes", time: "2h ago", notes: 4, hasVideo: true },
  { title: "X-Guard Sweeps", student: "Jake Morrison", time: "Yesterday", notes: 3, hasVideo: true },
  { title: "Omaplata Setup", student: "Noah Jackson", time: "2 days ago", notes: 5, hasVideo: false },
];

export default function CoachPreview() {
  return (
    <div className="cp-frame">
      {/* Window chrome */}
      <div className="cp-chrome">
        <div className="cp-dots">
          <span className="cp-dot cp-dot--red" />
          <span className="cp-dot cp-dot--yellow" />
          <span className="cp-dot cp-dot--green" />
        </div>
        <div className="cp-url">app.kaynos.net</div>
      </div>

      <div className="cp-body">
        {/* Sidebar */}
        <div className="cp-sidebar">
          <div className="cp-sidebar-logo">
            <svg width="18" height="18" viewBox="0 0 185 191" xmlns="http://www.w3.org/2000/svg">
              <path d="M 64 151 L 102 189 L 178 190 L 102 114 Z" fill={ACCENT} />
              <path d="M 184 1 L 116 1 L 1 115 L 0 185 Z" fill={ACCENT} />
              <path d="M 58 0 L 3 0 L 0 3 L 0 91 L 57 34 Z" fill={ACCENT} />
            </svg>
            <span>Kaynos</span>
          </div>
          {["Dashboard", "Sessions", "Classes", "Students", "Schedule", "Admin"].map((item, i) => (
            <div key={item} className={`cp-nav-item ${i === 0 ? "cp-nav-item--active" : ""}`}>
              {item}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="cp-main">
          {/* Header */}
          <div className="cp-header">
            <div>
              <div className="cp-greeting">Good morning, Professor Marco</div>
              <div className="cp-date">Safety Harbor Jiu-Jitsu</div>
            </div>
          </div>

          {/* KPI row */}
          <div className="cp-kpi-row">
            {kpis.map((k) => (
              <div key={k.label} className="cp-kpi" style={{ borderTopColor: k.color }}>
                <div className="cp-kpi-icon" style={{ background: k.bg, color: k.color }}>●</div>
                <div className="cp-kpi-value">{k.value}</div>
                <div className="cp-kpi-label">{k.label}</div>
              </div>
            ))}
          </div>

          {/* Two columns */}
          <div className="cp-grid">
            {/* Schedule */}
            <div className="cp-section">
              <div className="cp-section-title">Today's Schedule</div>
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
            </div>

            {/* Activity */}
            <div className="cp-section">
              <div className="cp-section-title">Recent Activity</div>
              <div className="cp-activity">
                {activity.map((a) => (
                  <div key={a.title} className="cp-act-item">
                    <div className={`cp-act-icon ${a.hasVideo ? "cp-act-icon--video" : "cp-act-icon--default"}`}>▶</div>
                    <div className="cp-act-body">
                      <div className="cp-act-title">{a.title}</div>
                      <div className="cp-act-meta">{a.student} · {a.time}</div>
                    </div>
                    {a.notes > 0 && <div className="cp-act-badge">{a.notes}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
