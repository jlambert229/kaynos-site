/**
 * Static visual render of the student/client dashboard interface.
 * Shown in the Demos section alongside CoachPreview for side-by-side comparison.
 * Pure CSS/JSX - no real data, no API calls.
 */
import KaynosLogo from "./KaynosLogo";

const sessions = [
  { title: "Guard Retention Drill", coach: "Professor Marco", time: "Today", watched: false, notes: 4 },
  { title: "Takedown Entry - Single Leg", coach: "Professor Marco", time: "Yesterday", watched: true, notes: 2 },
  { title: "Half Guard Sweeps", coach: "Professor Marco", time: "3 days ago", watched: true, notes: 5 },
];

const classes = [
  { title: "Fundamentals - April 10", coach: "Professor Marco", time: "Today", watched: false },
  { title: "Advanced: Back Attacks", coach: "Coach Kenji", time: "Yesterday", watched: true },
];

export default function StudentPreview() {
  return (
    <div className="sp-frame">
      <div className="sp-chrome">
        <div className="sp-dots">
          <span className="sp-dot sp-dot--red" />
          <span className="sp-dot sp-dot--yellow" />
          <span className="sp-dot sp-dot--green" />
        </div>
        <div className="sp-url">app.kaynos.net</div>
      </div>

      <div className="sp-body">
        <div className="sp-sidebar">
          <div className="sp-sidebar-logo">
            <KaynosLogo size="sm" />
            <span>Kaynos</span>
          </div>
          {["Dashboard", "My Sessions", "Classes", "Profile"].map((item, i) => (
            <div key={item} className={`sp-nav-item ${i === 0 ? "sp-nav-item--active" : ""}`}>
              {item}
            </div>
          ))}
        </div>

        <div className="sp-main">
          <div className="sp-header">
            <div>
              <div className="sp-greeting">Welcome back, Sofia</div>
              <div className="sp-subtitle">You have {sessions.filter(s => !s.watched).length} unwatched session{sessions.filter(s => !s.watched).length !== 1 ? "s" : ""}</div>
            </div>
          </div>

          <div className="sp-section">
            <div className="sp-section-title">My Sessions</div>
            <div className="sp-list">
              {sessions.map((s) => (
                <div key={s.title} className="sp-item">
                  <div className={`sp-status ${s.watched ? "sp-status--watched" : "sp-status--new"}`}>
                    {s.watched ? "Watched" : "New"}
                  </div>
                  <div className="sp-item-body">
                    <div className="sp-item-title">{s.title}</div>
                    <div className="sp-item-meta">{s.coach} - {s.time}</div>
                  </div>
                  {s.notes > 0 && <div className="sp-notes-badge">{s.notes} notes</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="sp-section">
            <div className="sp-section-title">Recent Classes</div>
            <div className="sp-list">
              {classes.map((c) => (
                <div key={c.title} className="sp-item">
                  <div className={`sp-status ${c.watched ? "sp-status--watched" : "sp-status--new"}`}>
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
        </div>
      </div>
    </div>
  );
}
