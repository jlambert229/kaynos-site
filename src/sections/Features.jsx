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
      "Pin a note to 0:34 where their elbow drops, or 2:15 where the tempo drifts. Clients see your notes synced to the video and can add their own.",
  },
  {
    icon: UserRoundCheck,
    title: "Private sessions and shared classes",
    description:
      "One-on-one reviews stay between you and your client. Shared classes go to the whole group. Everyone sees exactly what's meant for them.",
  },
  {
    icon: ShieldCheck,
    title: "Your footage stays private",
    description:
      "Videos are never public. Each account is isolated. No one sees your clients' footage except you and them. For coaches working with minors, there are no social features, no public profiles, and no way for anyone outside the account to discover content.",
  },
  {
    icon: AudioLines,
    title: "Dictate notes hands-free",
    description:
      "Tap the mic button while watching video. Speak your feedback and it becomes a timestamped note - transcribed in real time. Edit it, save it, move to the next moment.",
  },
  {
    icon: Sparkles,
    title: "AI spots what you might miss",
    description:
      "One click and AI analyzes your video, flagging the most important moments (typically 2-4, depending on video length) worth reviewing. A starting point, not a replacement - jump to the key timestamps instead of scrubbing through an hour of footage. You can also toggle a pose skeleton overlay to analyze body position frame by frame.",
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
            Upload video, leave timestamped notes, share with clients. Here's what that means day to day.
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
