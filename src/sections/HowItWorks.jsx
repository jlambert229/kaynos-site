import { Video, PenLine, Eye } from "lucide-react";

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
    title: "Clients watch and learn",
    description:
      "Send your clients a signup link. They watch their footage, add notes, and you earn $10/mo credit for each one.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section section--alt">
      <div className="container">
        <div className="section-header">
          <span className="section-label">How it works</span>
          <h2 className="section-title">Three steps. That's it.</h2>
          <p className="section-subtitle">
            No complicated setup. No training manual. If you can upload a video to
            YouTube, you can use Kaynos.
          </p>
        </div>
        <div className="steps">
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
      </div>
    </section>
  );
}
