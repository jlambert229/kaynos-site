import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const entries = [
  {
    date: "April 2026",
    title: "Interactive ROI calculator & comparison table",
    items: [
      "Drag-the-slider calculator showing your real cost as you add clients",
      "Side-by-side comparison: Kaynos vs Google Drive, Teachable, DIY",
      "Use case showcase for fitness, martial arts, music, and technique coaching",
    ],
  },
  {
    date: "March 2026",
    title: "Pricing precision & legal audit",
    items: [
      "Client credit pricing refined to $49/month with $10/mo credit per paid client",
      "Privacy Policy and Data Use Policy updated for compliance",
      "Getting Started guide published",
    ],
  },
  {
    date: "February 2026",
    title: "Platform launch",
    items: [
      "Video uploads with timestamped coaching notes",
      "Private sessions and shared group classes",
      "Client signup links with built-in credit system",
      "Admin panel with usage reports and CSV export",
      "Live demos: coach view and client view",
    ],
  },
];

export default function Changelog() {
  return (
    <>
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
