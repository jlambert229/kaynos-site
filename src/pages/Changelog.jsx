import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";

const entries = [
  {
    date: "April 2026",
    title: "AI features, new pages, and site polish",
    items: [
      "Voice dictation and AI video review highlighted across the site",
      "New /for/coaches and /for/students landing pages",
      "Security and trust page at /security",
      "Online coaching use case tab for remote/async coaches",
      "Enterprise pricing callout for 51+ client accounts",
      "Comparison table with switching CTA for CoachNow/OnForm users",
      "Newsletter and contact forms now capture via Netlify Forms",
      "Pricing calculator with annual cost, share link, and multi-coach note",
    ],
  },
  {
    date: "March 2026",
    title: "Pricing and legal foundations",
    items: [
      "Pricing set at $50/mo base with 3 included seats and $5/mo per extra active client",
      "Privacy Policy and Data Use Policy published",
      "Getting Started guide with 5-step quick setup",
      "Comparison table: Kaynos vs CoachNow, OnForm, and DIY stack",
    ],
  },
  {
    date: "February 2026",
    title: "Platform launch",
    items: [
      "Video uploads with timestamped coaching notes",
      "Private sessions and shared group classes",
      "Seat-based pricing with active client billing",
      "Admin panel with usage reports and CSV export",
      "Live demos: coach view and client view",
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
