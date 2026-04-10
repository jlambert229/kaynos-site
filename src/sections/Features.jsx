import {
  Upload,
  MessageSquare,
  Users,
  Shield,
  Mic,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";

const features = [
  {
    icon: Upload,
    title: "Upload footage from anywhere",
    description:
      "Drag a video into your browser — phone clips, GoPro files, whatever you have. Big files are fine. You can link Vimeo videos too if you already host there.",
  },
  {
    icon: MessageSquare,
    title: "Leave notes at the exact right moment",
    description:
      "Pin a note to 0:34 where their elbow drops, or 2:15 where the tempo drifts. Clients see your notes synced to the video and can add their own.",
  },
  {
    icon: Users,
    title: "Private sessions and shared classes",
    description:
      "One-on-one reviews stay between you and your client. Shared classes go to the whole group. Everyone sees exactly what's meant for them.",
  },
  {
    icon: Shield,
    title: "Your footage stays private",
    description:
      "Videos are never public. Each account is isolated. No one sees your clients' footage except you and them.",
  },
  {
    icon: Mic,
    title: "Dictate notes hands-free",
    description:
      "Talk through what you see while the video plays. Your voice becomes timestamped notes — no typing, no pausing. Review film between classes with your hands free.",
  },
  {
    icon: Sparkles,
    title: "AI spots what you might miss",
    description:
      "One click and AI analyzes your video, flagging 2-3 moments worth reviewing. A starting point, not a replacement — jump to the key timestamps instead of scrubbing through an hour of footage.",
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
            The short version: upload video, leave timestamped notes, share with
            clients. Here's what that actually looks like.
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
            href="https://demo.kaynos.net"
            className="feature-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Try the demo — no signup needed <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
