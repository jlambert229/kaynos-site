import { Upload, MessageSquare, Users, BarChart3, Tag, Shield } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Easy video uploads",
    description:
      "Drag and drop your training footage right from your browser. Handles big files without breaking a sweat.",
  },
  {
    icon: MessageSquare,
    title: "Coach notes on the timeline",
    description:
      "Pin notes to the exact moment in the video. Your students see exactly what you saw and what to work on.",
  },
  {
    icon: Users,
    title: "Everyone gets their own view",
    description:
      "Coaches manage sessions and classes. Students see only what is assigned to them, plus shared material.",
  },
  {
    icon: BarChart3,
    title: "See who is watching",
    description:
      "Know which students have reviewed their footage and which ones still need a nudge.",
  },
  {
    icon: Tag,
    title: "Stay organized",
    description:
      "Tag sessions by technique, class type, or anything that makes sense for your school. Find stuff fast.",
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
            Video review tools that actually make sense for a martial arts school.
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
