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
              <strong>Film the roll or the technique.</strong> A phone is
              enough. GoPros and tripod cameras work fine if that&apos;s already
              your setup. Students can also film at their own gym and send
              the footage back to you for review.
            </p>
            <p>
              <strong>Upload and mark it up.</strong> Drag the video in,
              scrub to whatever you want to point at, and drop a note. Tag
              sessions however makes sense — by student, by technique, by
              tournament.
            </p>
            <p>
              <strong>Send your student the link.</strong> They open it in
              a browser, watch with your notes appearing in place, and can
              reply on specific moments with questions of their own.
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
