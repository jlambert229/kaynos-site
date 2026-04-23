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
    title: "Upload from the mat",
    description:
      "Film on your phone between rounds and upload from the same device. GoPro and tripod files work too if you'd rather shoot with something dedicated.",
  },
  {
    icon: MessageSquareQuote,
    title: "Notes pinned to the timeline",
    description:
      "Drop a note at 1:42 where the sweep opens up, or at 3:15 where the guard pass goes through. Students see the notes appear as the video plays and can reply on a specific moment.",
  },
  {
    icon: UserRoundCheck,
    title: "Private rolls and shared classes",
    description:
      "One-on-one session reviews stay between you and the student who rolled. Drill demos and comp footage go to the whole academy. Nobody sees material that wasn't meant for them.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    description:
      "Videos are never public, and academies are fully isolated from each other. For gyms running a kids program, that also means no social feeds, no public profiles, and nothing an outsider can search to find your footage.",
  },
  {
    icon: AudioLines,
    title: "Dictate notes instead of typing",
    description:
      "Tap the mic, talk, and the transcription comes back as a timestamped note you can edit before saving. Useful when you're working through a stack of rolls and don't want to keep pausing to type.",
  },
  {
    icon: Sparkles,
    title: "AI does the first pass",
    description:
      "Upload the video and Kaynos runs an AI pass that drops timestamped placeholders on moments worth a second look. They're starting points, not finished notes — you keep, edit, or throw out each one.",
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
            The core of Kaynos is short: upload a video, drop notes at the
            right timestamps, send the link. Everything else on this list is
            stuff I wanted when I was on the mats.
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
            Try the demo — no signup needed <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
