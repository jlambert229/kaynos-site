import LegalLayout from "../components/LegalLayout";
import { SITE_URL } from "../seo/constants";
import { PROCESSORS_LAST_UPDATED } from "../config/business";

const processorsJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Sub-Processors",
  description: "Third-party service providers that process data on behalf of Kaynos.",
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
    <LegalLayout
      title="Sub-Processors"
      description="Third-party providers that process data for Kaynos: Netlify (hosting), Neon (database), Backblaze B2 (video storage), Resend (email). US-hosted with DPAs."
      path="/processors"
      jsonLd={processorsJsonLd}
      eyebrow="Privacy"
      heading="Sub-Processors"
      lead="Third-party service providers that process data on our behalf."
    >
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
        This list is updated when we add or change sub-processors. Last updated: {PROCESSORS_LAST_UPDATED}.
      </p>
    </LegalLayout>
  );
}
