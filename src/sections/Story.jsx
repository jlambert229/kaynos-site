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
              I train BJJ, and the most effective training always came from
              private lessons. I wanted a simple way to keep those sessions,
              along with my coach&rsquo;s thoughts and feedback to help me
              improve.
            </p>
            <p>
              Easy enough that my coach would actually use it with his other
              students, useful enough that I&rsquo;d open it the night before
              every private. So that&rsquo;s what I built.
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
