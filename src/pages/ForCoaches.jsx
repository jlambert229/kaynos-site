import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { URLS } from "../config/urls";
import { FMT, PRICING_COPY } from "../config/pricing";

export default function ForCoaches() {
  return (
    <>
      <Seo
        title="Video Review for BJJ Coaches"
        description="Video review for BJJ coaches. Upload sparring, let AI surface the moments worth reviewing, and send notes to your students. $29/mo flat, students free."
        path="/for/coaches"
        jsonLd={{ "@context": "https://schema.org", "@type": "WebPage", name: "Kaynos for BJJ Coaches", url: "https://www.kaynos.net/for/coaches" }}
      />
      <Navbar />
      <main className="coaches-main container">
        <div className="coaches-content">
          {/* ── Hero ── */}
          <span className="section-label">For Coaches</span>
          <h1 className="coaches-title">
            Video review your students will actually watch.
          </h1>
          <p className="coaches-lead">
            Upload your sparring footage and let AI do a first pass on
            what's worth reviewing. Send the result to the student. They
            watch in a browser on any device — nothing to install.
          </p>
          <div className="coaches-cta">
            <a href={URLS.signup} className="btn btn-primary btn-lg">
              Start 14-Day Trial
            </a>
            <a href={URLS.demoCoach} className="btn btn-secondary btn-lg">
              See a Demo
            </a>
          </div>

          {/* ── How it works ── */}
          <h2 className="coaches-section-heading">How it works</h2>
          <ol className="coaches-steps">
            <li className="coaches-step">
              <span className="coaches-step-number">1</span>
              <div className="coaches-step-body">
                <h3>Film</h3>
                <p>
                  Phone, GoPro, or a tripod camera — whatever you already
                  bring to the mats. MP4, MOV, WebM, and MKV all work.
                </p>
              </div>
            </li>
            <li className="coaches-step">
              <span className="coaches-step-number">2</span>
              <div className="coaches-step-body">
                <h3>AI flags moments to review</h3>
                <p>
                  AI scans the roll and drops timestamped placeholders on
                  moments worth a second look. You decide what to keep,
                  edit, or throw out. Or skip the AI and dictate your own
                  notes — tap the mic, talk, and it transcribes into the
                  timeline.
                </p>
              </div>
            </li>
            <li className="coaches-step">
              <span className="coaches-step-number">3</span>
              <div className="coaches-step-body">
                <h3>Share &amp; schedule</h3>
                <p>
                  Send the student a link. They watch in a browser, see
                  your notes at the right timestamps, and can reply on
                  specific moments. Private lessons book through the
                  built-in calendar.
                </p>
              </div>
            </li>
          </ol>

          {/* ── Built for BJJ ── */}
          <h2 className="coaches-section-heading">
            Built for BJJ &amp; MMA
          </h2>
          <div className="coaches-disciplines">
            <div className="coaches-discipline-card">
              <h3>Sparring &amp; rolls</h3>
              <p>AI-assisted review of rolls and positional sparring</p>
            </div>
            <div className="coaches-discipline-card">
              <h3>Competition prep</h3>
              <p>Match review and comp footage libraries</p>
            </div>
            <div className="coaches-discipline-card">
              <h3>Private lessons</h3>
              <p>Per-student libraries, built-in scheduling and booking</p>
            </div>
            <div className="coaches-discipline-card">
              <h3>Remote coaching</h3>
              <p>Students film at their gym, upload for async review</p>
            </div>
          </div>

          {/* ── Pricing summary ── */}
          <h2 className="coaches-section-heading">Pricing</h2>
          <p className="coaches-pricing-line">{PRICING_COPY.heroLine}</p>
          <p className="coaches-pricing-detail">
            <a href="/#pricing">See pricing details &rarr;</a>
          </p>

          {/* ── Final CTA ── */}
          <div className="coaches-final-cta">
            <h2>Try it free for {FMT.trialDays}&nbsp;days</h2>
            <a href={URLS.signup} className="btn btn-primary btn-lg">
              Start 14-Day Trial
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
