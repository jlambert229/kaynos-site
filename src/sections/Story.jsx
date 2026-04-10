import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Story() {
  const ref = useScrollReveal();

  return (
    <section id="story" className="section">
      <div className="container">
        <div ref={ref} className="reveal story-prose">
          <h2 className="section-title">Why I built this</h2>
          <div className="prose-body">
            <p>
              I train BJJ. I kept watching coaches film great rolls and then
              lose the footage in text threads. Clients would ask "what was that
              sweep you showed me?" and there was no way to point them back to
              the exact moment.
            </p>
            <p>
              So I built the tool I wanted. Upload a video, pin notes to the
              timeline - or dictate them hands-free - and share it with one
              client or a whole class. AI can flag the key moments, but you're
              the coach. No social feeds. No feature bloat. AI is there when you
              want a hand - voice dictation for notes between classes, video
              analysis to catch what you missed - but the core is simple: video,
              notes, share.
            </p>
            <p>
              I built it for BJJ, but coaches in every discipline have the same
              problem - footage scattered across text threads, feedback
              disconnected from video. It works the same whether you're coaching
              a guard pass or a piano recital.
            </p>
            <p>
              Kaynos is independent and self-funded. I use it myself. If
              something's broken or missing, I want to hear about it.
            </p>
          </div>
          <Link to="/contact" className="story-contact-link">
            Talk to me directly <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
