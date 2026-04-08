import {
  Upload,
  MessageSquare,
  Users,
  BarChart3,
  Tag,
  Shield,
  TrendingDown,
  Settings,
} from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";

const primary = [
  {
    icon: Upload,
    title: "Easy video uploads",
    description:
      "Drag and drop training footage from your browser. Handles big files, and you can link Vimeo videos too.",
  },
  {
    icon: MessageSquare,
    title: "Timestamped coaching notes",
    description:
      "Pin notes to exact moments in the video. Clients add their own notes too. Search and filter everything.",
  },
  {
    icon: TrendingDown,
    title: "Clients lower your cost",
    description:
      "Each paid client earns you $10/month in credit toward your coach bill. Five paid clients and your platform cost drops to $0.",
  },
  {
    icon: Users,
    title: "Private sessions and shared classes",
    description:
      "One-on-one sessions stay between coach and client. Shared classes go to everyone. Each person sees exactly what they should.",
  },
];

const secondary = [
  {
    icon: Tag,
    title: "Organized by tags",
    description: "Tag sessions by topic, type, or anything that makes sense for your practice.",
  },
  {
    icon: Settings,
    title: "Admin tools",
    description: "Manage rosters, send invite links, export CSV, get automated usage reports.",
  },
  {
    icon: BarChart3,
    title: "Usage tracking",
    description: "See video and storage usage at a glance. Know which clients are watching and when.",
  },
  {
    icon: Shield,
    title: "Private by default",
    description: "Your footage stays yours. Each account is separate, videos are never public.",
  },
];

export default function Features() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section id="features" className="section">
      <div className="container">
        <div ref={headerRef} className="reveal section-header">
          <span className="section-label">Features</span>
          <h2 className="section-title">
            Better tools for your clients. Better economics for you.
          </h2>
          <p className="section-subtitle">
            Video review, timestamped notes, and progress tracking for your
            clients. Credits that lower your bill for every one who signs up.
          </p>
        </div>

        {/* TODO: Replace lucide icons with custom-drawn icons for these four
            primary features (upload, notes, credit, lock). Keep lucide for
            secondary features and FAQ chevrons. */}
        <div ref={gridRef} className="reveal features-grid-primary">
          {primary.map(({ icon: Icon, title, description }) => (
            <div key={title} className="feature-card">
              <div className="feature-icon">
                <Icon size={22} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>

        <div className="features-grid-secondary">
          {secondary.map(({ icon: Icon, title, description }) => (
            <div key={title} className="feature-card">
              <div className="feature-icon">
                <Icon size={18} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
