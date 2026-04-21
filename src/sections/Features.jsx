import {
  CloudUpload,
  MessageSquareQuote,
  UserRoundCheck,
  ShieldCheck,
  AudioLines,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";
import { URLS } from "../config/urls";

const features = [
  {
    icon: CloudUpload,
    title: "Upload footage from anywhere",
    description:
      "Film on your phone between sessions and upload right there - no laptop needed. GoPro and camera files work too.",
  },
  {
    icon: MessageSquareQuote,
    title: "Leave notes at the exact right moment",
    description:
      "Pin a note at 1:42 where the sweep opens up, or 3:15 where they forced the guard pass. Students see your notes synced to the video and can reply with questions.",
  },
  {
    icon: UserRoundCheck,
    title: "Private rolls and shared classes",
    description:
      "One-on-one session reviews stay between you and your student. Competition footage and drill demos go to the whole academy. Everyone sees exactly what's meant for them.",
  },
  {
    icon: ShieldCheck,
    title: "Your footage stays private",
    description:
      "Videos are never public. Each academy is isolated. No one sees your students' footage except you and them. For coaches running kids programs, there are no social features, no public profiles, and no way for anyone outside the academy to find content.",
  },
  {
    icon: AudioLines,
    title: "Dictate notes hands-free",
    description:
      "Tap the mic button while watching the video. Speak your feedback and it becomes a timestamped note - transcribed in real time. Edit it, save it, move to the next roll.",
  },
  {
    icon: Sparkles,
    title: "AI flags the moments worth reviewing",
    description:
      "AI analyzes your sparring footage and places timestamped placeholders at moments worth a closer look. You review each one, keep it, edit it, or delete it. Skip scrubbing through every minute of mat time.",
  },
];

export default function Features() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section id="features" className="section">
      <div className="container">
        <div ref={headerRef} className="reveal section-header">
          <h2 className="section-title">What you get</h2>
          <p className="section-subtitle">
            Upload video, leave timestamped notes, share with your students. Here's what that means day to day.
          </p>
        </div>

        <div ref={gridRef} className="reveal features-grid-primary">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="feature-card">
              <div className="feature-icon">
                <Icon size={22} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>

        <div className="features-bottom-link">
          <a
            href={URLS.demoCoach}
            className="feature-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Try the demo - no signup needed <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
