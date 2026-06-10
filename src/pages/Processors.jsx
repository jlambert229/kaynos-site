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

/* "Provider standard terms" = the provider's own published data-processing
   terms that apply to every account under its terms of service. Do NOT
   claim "DPA in place" or "SCCs in place" here unless a DPA has actually
   been accepted/executed for OUR account with that provider — these rows
   are legal attestations, not marketing copy. */
const subProcessors = [
  { provider: "Netlify", purpose: "Hosting, CDN, form processing, edge functions", location: "United States", dpa: "Provider standard terms" },
  { provider: "Neon", purpose: "Managed PostgreSQL database", location: "United States", dpa: "Provider standard terms" },
  { provider: "Backblaze B2", purpose: "Video and file storage", location: "United States", dpa: "Provider standard terms" },
  { provider: "Resend", purpose: "Transactional email delivery", location: "United States", dpa: "Provider standard terms" },
  { provider: "Deepgram", purpose: "Voice and class video transcription", location: "United States", dpa: "Provider standard terms" },
  { provider: "Stripe", purpose: "Subscription billing for coach accounts", location: "United States", dpa: "Provider standard terms" },
  { provider: "Twilio", purpose: "SMS notifications and booking reminders", location: "United States", dpa: "Provider standard terms" },
];

export default function Processors() {
  return (
    <LegalLayout
      title="Sub-Processors"
      description="Third-party providers that process data for Kaynos: Netlify, Neon, Backblaze B2, Resend, Deepgram, Stripe, and Twilio. All US-hosted."
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
              <th>Data protection terms</th>
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
