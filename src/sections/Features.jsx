import { Upload, MessageSquare, Users, BarChart3, Tag, Shield, Play, Settings } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Easy video uploads",
    description:
      "Drag and drop your training footage right from your browser. Handles big files, and you can link Vimeo videos too.",
  },
  {
    icon: MessageSquare,
    title: "Coach notes on the timeline",
    description:
      "Pin notes to the exact moment in the video. Students add their own notes too, and everyone can search and filter them.",
  },
  {
    icon: Users,
    title: "Private sessions and shared classes",
    description:
      "One-on-one sessions stay between coach and student. School-wide classes go to everyone. Each person sees exactly what they should.",
  },
  {
    icon: Play,
    title: "Resume where you left off",
    description:
      "Students pick up right where they stopped. Coaches see who has watched, who hasn't, and which videos are still pending.",
  },
  {
    icon: Tag,
    title: "Stay organized",
    description:
      "Tag sessions by topic, type, or anything that makes sense for your practice. Find stuff fast.",
  },
  {
    icon: Settings,
    title: "School admin tools",
    description:
      "Manage your roster, reset passwords, export to CSV, and get automated usage reports delivered to your inbox.",
  },
  {
    icon: BarChart3,
    title: "Usage and progress tracking",
    description:
      "See video and storage usage at a glance. Track which students are reviewing footage and staying on top of their training.",
  },
  {
    icon: Shield,
    title: "Private by default",
    description:
      "Your school's footage stays yours. Each account is completely separate, and videos are never public.",
  },
];

export default function Features() {
  return (
    <section id="features" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Features</span>
          <h2 className="section-title">Everything you need, nothing you don't</h2>
          <p className="section-subtitle">
            Video review tools built for private coaching and training.
          </p>
        </div>

        <div className="features-grid">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="feature-card">
              <div className="feature-icon">
                <Icon />
              </div>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-description">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
