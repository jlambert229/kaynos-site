import { useState } from "react";
import { Dumbbell, Swords, Music, GraduationCap } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";

const cases = [
  {
    id: "fitness",
    icon: Dumbbell,
    label: "Fitness",
    title: "Personal trainers & strength coaches",
    description:
      "Record form checks, upload session recaps, and leave timestamped cues your clients can replay before their next workout. No more texting video links that get buried.",
    examples: [
      "Film a set, pin a note at the exact rep where form breaks",
      "Share mobility drills as a class so everyone can access them",
      "Track which clients are actually watching their sessions",
    ],
  },
  {
    id: "martial-arts",
    icon: Swords,
    label: "Martial Arts",
    title: "BJJ, boxing & MMA coaches",
    description:
      "Break down sparring rounds, highlight technique details, and give each student a private library of their own footage. Students rewatch between classes and show up sharper.",
    examples: [
      "Annotate a roll at the exact moment a sweep opens up",
      "Post comp footage as a shared class for the whole gym",
      "Private session reviews that only the student can see",
    ],
  },
  {
    id: "music",
    icon: Music,
    label: "Music",
    title: "Instrument & voice teachers",
    description:
      "Record lessons, mark the bars that need practice, and let students review at their own pace. Students hear your feedback right at the moment that matters.",
    examples: [
      "Pin a note at 2:34 — 'watch your left hand position here'",
      "Upload recital recordings for group review",
      "Students add their own practice notes alongside yours",
    ],
  },
  {
    id: "technique",
    icon: GraduationCap,
    label: "Technique",
    title: "Dance, golf, swim & movement coaches",
    description:
      "Any discipline where seeing yourself matters. Upload video, mark the key moments, and give clients a clear path from where they are to where they want to be.",
    examples: [
      "Side-by-side review of a swing before and after adjustments",
      "Tag sessions by skill level so students find what they need",
      "Track progress over weeks with a timeline of session notes",
    ],
  },
];

export default function UseCases() {
  const [active, setActive] = useState("fitness");
  const headerRef = useScrollReveal();
  const contentRef = useScrollReveal();

  const current = cases.find((c) => c.id === active);
  const Icon = current.icon;

  return (
    <section id="use-cases" className="section">
      <div className="container">
        <div ref={headerRef} className="reveal section-header">
          <span className="section-label">Use Cases</span>
          <h2 className="section-title">Built for how you coach</h2>
          <p className="section-subtitle">
            Whether you teach takedowns or tempo, Kaynos adapts to your workflow.
          </p>
        </div>

        <div ref={contentRef} className="reveal">
          <div className="uc-tabs" role="tablist">
            {cases.map((c) => {
              const TabIcon = c.icon;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active === c.id}
                  className={`uc-tab ${active === c.id ? "uc-tab-active" : ""}`}
                  onClick={() => setActive(c.id)}
                >
                  <TabIcon size={18} aria-hidden="true" />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>

          <div className="uc-panel" key={active} role="tabpanel">
            <div className="uc-panel-icon">
              <Icon size={28} aria-hidden="true" />
            </div>
            <h3 className="uc-panel-title">{current.title}</h3>
            <p className="uc-panel-desc">{current.description}</p>
            <ul className="uc-panel-examples">
              {current.examples.map((ex) => (
                <li key={ex}>{ex}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
