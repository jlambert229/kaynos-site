import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";

export default function ForStudents() {
  return (
    <>
      <Seo
        title="For Students"
        description="Your coach sent you a session on Kaynos. Here's how it works — watch video, see notes, and reply. Free, no app needed."
        path="/for/students"
      />
      <Navbar />
      <main className="students-main container">
        <div className="students-content">
          <span className="section-label">For Students</span>
          <h1 className="students-title">Your coach sent you a session.</h1>
          <p className="students-lead">
            Here's how it works — it takes about 30 seconds.
          </p>
          <p className="students-parent-note">
            Parents: your child's coach invited them to review their session.
            Here's what that means.
          </p>

          <ol className="students-steps">
            <li className="students-step">
              <span className="students-step-number">1</span>
              <div className="students-step-body">
                <h3>You get a link</h3>
                <p>
                  Your coach uploads a video and shares it with you. You'll get
                  an email with a direct link.
                </p>
              </div>
            </li>
            <li className="students-step">
              <span className="students-step-number">2</span>
              <div className="students-step-body">
                <h3>Watch and see their notes</h3>
                <p>
                  Open the video in your browser — no app to install. Your
                  coach's notes appear at the exact moments they're talking
                  about.
                </p>
              </div>
            </li>
            <li className="students-step">
              <span className="students-step-number">3</span>
              <div className="students-step-body">
                <h3>Reply and ask questions</h3>
                <p>
                  Leave your own notes or reply to your coach's. It's a
                  conversation anchored to the video.
                </p>
              </div>
            </li>
          </ol>

          <div className="students-messages">
            <div className="students-message-card">
              <h3>It's free for you</h3>
              <p>
                Your coach pays for Kaynos. Students and clients always use it
                free.
              </p>
            </div>
            <div className="students-message-card">
              <h3>No app needed</h3>
              <p>
                Works in any browser on any device. Nothing to download.
              </p>
            </div>
            <div className="students-message-card">
              <h3>Your footage is private</h3>
              <p>
                You only see your own sessions. Nobody else can see your videos
                or notes.
              </p>
            </div>
            <div className="students-message-card">
              <h3>Safe for kids</h3>
              <p>
                Videos are private — only your coach and you can see your
                sessions. There are no social features, no public profiles, and
                no way for strangers to find your content. If you're a parent,
                your child's footage stays between them and their coach.
              </p>
            </div>
          </div>

          <div className="students-cta">
            <a
              href="https://app.kaynos.net"
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
