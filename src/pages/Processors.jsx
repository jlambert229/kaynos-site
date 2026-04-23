import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { SITE_URL } from "../seo/constants";

const processorsJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Sub-Processors",
  url: `${SITE_URL}/processors`,
};

const subProcessors = [
  { provider: "Netlify", purpose: "Hosting, CDN, form processing, edge functions", location: "United States", dpa: "SCCs in place" },
  { provider: "Neon", purpose: "Managed PostgreSQL database", location: "United States", dpa: "SCCs in place" },
  { provider: "Backblaze B2", purpose: "Video and file storage", location: "United States", dpa: "SCCs in place" },
  { provider: "Resend", purpose: "Transactional email delivery", location: "United States", dpa: "DPA in place" },
];

export default function Processors() {
  return (
    <>
      <Seo
        title="Sub-Processors"
        description="Third-party service providers that process data on behalf of Kaynos."
        path="/processors"
        jsonLd={processorsJsonLd}
      />
      <Navbar />
      <main className="legal-main container">
        <article className="legal-article">
          <span className="section-label">Privacy</span>
          <h1 className="legal-title">Sub-Processors</h1>
          <p className="legal-lead">
            Third-party service providers that process data on our behalf.
          </p>

          <div className="processors-table-wrap">
            <table className="processors-table">
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Purpose</th>
                  <th>Location</th>
                  <th>DPA Status</th>
                </tr>
              </thead>
              <tbody>
                {subProcessors.map((sp) => (
                  <tr key={sp.provider}>
                    <td className="processors-provider">{sp.provider}</td>
                    <td>{sp.purpose}</td>
                    <td>{sp.location}</td>
                    <td>{sp.dpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="processors-note">
            This list is updated when we add or change sub-processors. Last updated: April 2026.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
