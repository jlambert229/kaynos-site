import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";

const entries = [
  {
    date: "April 2026",
    title: "AI review, video clips, and notifications",
    items: [
      "AI video review: one-click analysis flags key moments with timestamped suggestions",
      "Video clips: extract and share segments from any session or class",
      "In-app notifications: bell icon with read/unread list alongside email alerts",
      "Coach progress reports: automated weekly email with per-student watch rates",
      "Session scheduling: calendar UI, conflict checks, ICS export, and email reminders",
      "Pose skeleton overlay for form and movement analysis",
    ],
  },
  {
    date: "March 2026",
    title: "Voice dictation and search",
    items: [
      "Voice-to-note dictation: hands-free coaching notes via Deepgram transcription",
      "Global search palette (Cmd+K / Ctrl+K) across sessions, classes, clients, and notes",
      "Drawing annotations: freehand overlay on video frames for visual feedback",
      "Highlight markers: time-range selections on the video timeline",
      "Tenant admin dashboard for multi-school management",
    ],
  },
  {
    date: "February 2026",
    title: "Platform launch",
    items: [
      "Video uploads with timestamped coaching notes and threaded replies",
      "Private sessions and shared group classes",
      "@mention notifications with email alerts and direct links",
      "Custom video player with timeline markers, speed control, and resume",
      "Watch progress tracking: see which clients viewed their sessions",
      "Admin portal with member management, usage reports, and CSV export",
      "Dark mode, light mode, and system theme",
      "Stripe billing with seat-based pricing",
      "Mobile-responsive across all devices",
    ],
  },
];

export default function Changelog() {
  return (
    <>
      <Seo title="Changelog" description="See what's new in Kaynos. Latest features, improvements, and updates to the coaching platform." path="/changelog" />
      <Navbar />
      <main className="changelog-main container">
        <div className="changelog-content">
          <span className="section-label">Changelog</span>
          <h1 className="changelog-title">What's new</h1>
          <p className="changelog-lead">
            We ship fast. Here's what's landed recently.
          </p>

          <div className="changelog-timeline">
            {entries.map((entry) => (
              <div key={entry.date} className="changelog-entry">
                <div className="changelog-date">{entry.date}</div>
                <h3 className="changelog-entry-title">{entry.title}</h3>
                <ul className="changelog-items">
                  {entry.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
