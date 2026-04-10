import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

export default function HowItWorks() {
  const ref = useScrollReveal();

  return (
    <section id="how-it-works" className="section section--alt">
      <div className="container">
        <div ref={ref} className="reveal how-it-works-prose">
          <h2 className="section-title">How it works</h2>
          <div className="prose-steps">
            <p>
              <strong>Film your session</strong> - or have your client film
              theirs. Phone, GoPro, tripod - whatever you already use. Works
              the same whether you're in the room or reviewing remotely. Any
              common video format works.
            </p>
            <p>
              <strong>Upload and add notes.</strong> Drop the video into Kaynos
              and leave notes at the moments that matter. Tag sessions however
              makes sense for your practice.
            </p>
            <p>
              <strong>Send your client a link.</strong> They watch their footage,
              see your notes synced to the timeline, and can leave questions
              or observations of their own.
            </p>
          </div>
          <Link to="/getting-started" className="how-it-works-link">
            Full setup guide <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
