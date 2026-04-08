import { Video, PenLine, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

const steps = [
  {
    number: 1,
    icon: Video,
    title: "Film your session",
    description:
      "Use your phone, a GoPro, or any camera you have. Any common video format works.",
  },
  {
    number: 2,
    icon: PenLine,
    title: "Upload and add notes",
    description:
      "Drop the video into Kaynos and leave notes at the moments that matter. Tag it however you like.",
  },
  {
    number: 3,
    icon: Eye,
    title: "Clients watch and improve",
    description:
      "Send a signup link. Clients watch their footage, add their own notes, and pick things up between sessions.",
  },
];

export default function HowItWorks() {
  const headerRef = useScrollReveal();
  const stepsRef = useScrollReveal();

  return (
    <section id="how-it-works" className="section section--alt">
      <div className="container">
        <div ref={headerRef} className="reveal section-header">
          <span className="section-label">How it works</span>
          <h2 className="section-title">Three steps. That's it.</h2>
          <p className="section-subtitle">
            No complicated setup. No training manual. If you can upload a video to
            YouTube, you can use Kaynos.
          </p>
        </div>
        <div ref={stepsRef} className="reveal steps">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="step">
                <div className="step-number">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            );
          })}
        </div>
        <div className="how-it-works-cta">
          <Link to="/getting-started" className="how-it-works-link">
            Read the full setup guide <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
