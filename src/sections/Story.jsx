import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Story() {
  const ref = useScrollReveal();

  return (
    <section id="story" className="section">
      <div className="container">
        <div ref={ref} className="reveal story-prose">
          <h2 className="section-title">Why we built this</h2>
          <div className="prose-body">
            <p>
              We're coaches. We kept recording great sessions and then losing
              the footage in Google Drive folders no one opened. Group chats
              got buried. Clients would ask "what was that thing you said about
              my footwork?" and we'd have no way to point them back to the
              exact moment.
            </p>
            <p>
              So we built the tool we wanted. Upload a video, pin notes to the
              timeline, share it with one client or a whole class. That's it.
              No social feeds. No AI gimmicks. No feature bloat.
            </p>
            <p>
              Kaynos is independent and self-funded. We use it ourselves every
              week. If something's broken or missing, we want to hear about it.
            </p>
          </div>
          <Link to="/contact" className="story-contact-link">
            Talk to us directly <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
