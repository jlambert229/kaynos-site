import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { URLS } from "../config/urls";
import { SITE_URL } from "../seo/constants";

const forStudentsJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Kaynos for Students",
  url: `${SITE_URL}/for/students`,
};

export default function ForStudents() {
  return (
    <>
      <Seo
        title="For Students"
        description="Your coach sent you a session on Kaynos. Here's what to expect — watch the video, read your coach's notes, reply on any moment. Free, no app needed."
        path="/for/students"
        jsonLd={forStudentsJsonLd}
      />
      <Navbar />
      <main id="main-content" className="students-main container">
        <div className="students-content">
          <span className="section-label">For Students</span>
          <h1 className="students-title">Your coach sent you a session.</h1>
          <p className="students-lead">
            Here&apos;s what to do — about 30 seconds to read.
          </p>
          <aside className="students-parent-note" aria-label="Note for parents">
            <strong>Parents:</strong> your child&apos;s coach invited them to
            review their own training footage. Here&apos;s what&apos;s on the
            other end of the link.
          </aside>

          <ol className="students-steps">
            <li className="students-step">
              <span className="students-step-number">1</span>
              <div className="students-step-body">
                <h2>You get a link</h2>
                <p>
                  Your coach uploads a video and shares it with you. You&apos;ll get
                  an email with a direct link.
                </p>
              </div>
            </li>
            <li className="students-step">
              <span className="students-step-number">2</span>
              <div className="students-step-body">
                <h2>Watch and see their notes</h2>
                <p>
                  Open the video in your browser — no app to install. Your
                  coach&apos;s notes appear at the exact moments they&apos;re talking
                  about.
                </p>
              </div>
            </li>
            <li className="students-step">
              <span className="students-step-number">3</span>
              <div className="students-step-body">
                <h2>Reply and ask questions</h2>
                <p>
                  Leave your own notes or reply to your coach&apos;s. It&apos;s a
                  conversation anchored to the video.
                </p>
              </div>
            </li>
          </ol>

          <div className="students-messages">
            <div className="students-message-card">
              <h2>It&apos;s free for you</h2>
              <p>
                Your coach pays for Kaynos. Students don&apos;t, always.
              </p>
            </div>
            <div className="students-message-card">
              <h2>No app to install</h2>
              <p>
                It runs in the browser on any device. Nothing to download.
              </p>
            </div>
            <div className="students-message-card">
              <h2>Your footage is private</h2>
              <p>
                You only see the sessions your coach shares with you. Your
                videos and your notes aren&apos;t visible to other students.
              </p>
            </div>
            <div className="students-message-card">
              <h2>Safe for kids</h2>
              <p>
                Only your coach and you can see sessions they&apos;ve shared
                with you. There are no social features, no public
                profiles, and no way for someone outside your gym to find
                the footage. For parents: video of your child stays
                between them and the coach.{" "}
                <Link to="/privacy#minors" className="students-message-link">
                  How we handle minors&rsquo; data &rarr;
                </Link>
              </p>
            </div>
          </div>

          <div className="students-cta">
            <a
              href={URLS.login}
              className="btn btn-primary btn-lg"
            >
              Log In
            </a>
            <Link to="/" className="btn btn-secondary btn-lg">
              Learn more about Kaynos
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
