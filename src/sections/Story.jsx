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
              lose the footage in text threads and group chats. Students
              would ask "what was that sweep you showed me?" and there was
              no way to point them back to the exact moment it happened.
            </p>
            <p>
              So I built what I wanted. Upload a video, pin notes to the
              timeline (or dictate them hands-free) and send it to one
              student or a whole class. AI can flag moments worth reviewing,
              but you&rsquo;re still the one coaching. There are no social
              feeds here and no public profiles.
            </p>
            <p>
              Kaynos is independent and self-funded. If something&rsquo;s
              broken or missing, I want to hear about it.
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
