import { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, XCircle, RefreshCw } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { URLS } from "../config/urls";

const services = [
  {
    name: "Marketing Site",
    description: "kaynos.net - this website",
    checkUrl: "/",
    type: "self",
  },
  {
    name: "Application",
    description: "app.kaynos.net - coach and student dashboards",
    checkUrl: "https://app.kaynos.net",
    type: "external",
  },
  {
    name: "Coach Demo",
    description: "demo.kaynos.net - live demo with sample data",
    checkUrl: "https://demo.kaynos.net",
    type: "external",
  },
  {
    name: "Student Demo",
    description: "student.kaynos.net - client demo view",
    checkUrl: "https://student.kaynos.net",
    type: "external",
  },
  {
    name: "Help Center",
    description: "docs.kaynos.net - documentation and guides",
    checkUrl: "https://docs.kaynos.net",
    type: "external",
  },
];

const infrastructure = [
  { name: "Hosting & CDN", provider: "Netlify", description: "Global edge network, DDoS protection, SSL", statusUrl: "https://www.netlifystatus.com" },
  { name: "Database", provider: "Neon", description: "Managed PostgreSQL with encryption at rest", statusUrl: "https://neonstatus.com" },
  { name: "Video Storage", provider: "Backblaze B2", description: "S3-compatible object storage, encrypted", statusUrl: "https://www.backblazestatus.com" },
  { name: "Email Delivery", provider: "Resend", description: "Transactional email for notifications", statusUrl: "https://resend-status.com" },
  { name: "Voice Transcription", provider: "Deepgram", description: "Real-time speech-to-text", statusUrl: "https://status.deepgram.com" },
  { name: "AI Video Analysis", provider: "Twelve Labs", description: "Video understanding and analysis", statusUrl: "https://status.twelvelabs.io" },
];

function StatusIcon({ status }) {
  if (status === "operational") return <CheckCircle2 size={18} className="status-icon status-icon--ok" />;
  if (status === "reachable") return <CheckCircle2 size={18} className="status-icon status-icon--ok" />;
  if (status === "degraded") return <AlertTriangle size={18} className="status-icon status-icon--warn" />;
  if (status === "down") return <XCircle size={18} className="status-icon status-icon--down" />;
  return <RefreshCw size={16} className="status-icon status-icon--checking" />;
}

function statusLabel(status) {
  if (status === "operational") return "Operational";
  if (status === "reachable") return "Reachable";
  if (status === "degraded") return "Degraded";
  if (status === "down") return "Unreachable";
  return "Checking...";
}

export default function Status() {
  const [results, setResults] = useState({});
  const [lastChecked, setLastChecked] = useState(null);

  async function checkServices(mounted = { current: true }) {
    const checks = {};
    for (const svc of services) {
      if (svc.type === "self") {
        checks[svc.name] = "operational";
        continue;
      }
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        await fetch(svc.checkUrl, {
          method: "HEAD",
          mode: "no-cors",
          signal: controller.signal,
        });
        clearTimeout(timeout);
        checks[svc.name] = "reachable";
      } catch {
        checks[svc.name] = "down";
      }
    }
    if (!mounted.current) return;
    setResults(checks);
    setLastChecked(new Date());
  }

  useEffect(() => {
    const mounted = { current: true };
    // checkServices is async and guards every setState behind mounted.current —
    // the set-state-in-effect rule fires on the call site, not the guard.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkServices(mounted);
    return () => { mounted.current = false; };
  }, []);

  const vals = Object.values(results);
  const allOk = vals.length > 0 && vals.every(s => s === "operational" || s === "reachable");
  const anyDown = vals.some(s => s === "down");

  return (
    <>
      <Seo
        title="System Status"
        description="Real-time status of Kaynos services - application, demos, help center, and infrastructure components."
        path="/status"
      />
      <Navbar />
      <main className="status-main container">
        <div className="status-content">
          <span className="section-label">System Status</span>
          <h1 className="status-title">Kaynos System Status</h1>

          <div className="status-quick-links">
            <a href={URLS.helpCenter} target="_blank" rel="noopener noreferrer">Help Center</a>
            <span className="status-quick-sep">/</span>
            <a href="/contact">Contact Support</a>
            <span className="status-quick-sep">/</span>
            <a href="/security">Security</a>
          </div>

          <div className={`status-banner ${allOk ? "status-banner--ok" : anyDown ? "status-banner--down" : "status-banner--checking"}`}>
            {allOk ? (
              <><CheckCircle2 size={22} /> All systems operational</>
            ) : anyDown ? (
              <><AlertTriangle size={22} /> Some services may be unreachable</>
            ) : (
              <><RefreshCw size={20} className="status-spin" /> Checking services...</>
            )}
          </div>

          {lastChecked && (
            <p className="status-last-checked">
              Last checked: {lastChecked.toLocaleTimeString()} &middot;{" "}
              <button onClick={checkServices} className="status-refresh-btn">
                Refresh
              </button>
            </p>
          )}

          <section className="status-section">
            <h2 className="status-section-title">Services</h2>
            <div className="status-list">
              {services.map((svc) => (
                <div key={svc.name} className="status-row">
                  <div className="status-row-info">
                    <div className="status-row-name">{svc.name}</div>
                    <div className="status-row-desc">{svc.description}</div>
                  </div>
                  <div className={`status-row-status status-row-status--${results[svc.name] || "checking"}`}>
                    <StatusIcon status={results[svc.name]} />
                    <span>{statusLabel(results[svc.name])}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="status-section">
            <h2 className="status-section-title">Infrastructure</h2>
            <p className="status-section-desc">
              Underlying providers that power Kaynos. Check each provider&apos;s status page for current availability.
            </p>
            <div className="status-list">
              {infrastructure.map((infra) => (
                <div key={infra.name} className="status-row">
                  <div className="status-row-info">
                    <div className="status-row-name">{infra.name}</div>
                    <div className="status-row-desc">
                      {infra.provider} &mdash; {infra.description}
                    </div>
                  </div>
                  <div className="status-row-status">
                    {infra.statusUrl && (
                      <a href={infra.statusUrl} target="_blank" rel="noopener noreferrer" className="status-provider-link">
                        Provider status &rarr;
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="status-section">
            <h2 className="status-section-title">Report an Issue</h2>
            <p className="status-section-desc">
              If you&apos;re experiencing problems, email{" "}
              <a href={URLS.support}>support@kaynos.net</a>.
              For security issues, contact{" "}
              <a href={URLS.security}>security@kaynos.net</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
