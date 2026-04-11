import { useState, useRef, useCallback } from "react";
import { Dumbbell, Swords, Music, Crosshair, Globe } from "lucide-react";
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
      "Remote clients film at their gym and upload for async review - same workflow, different timezone",
      "AI flags reps where form breaks down - jump straight to the moments that matter",
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
      "Dictate corrections hands-free while demonstrating the fix. AI highlights the key scrambles from a 60-minute class",
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
      "Pin a note at 2:34 - 'watch your left hand position here'",
      "Upload recital recordings for group review",
      "Students add their own practice notes alongside yours",
      "Voice-annotate a student's recital while listening - no typing interrupts the flow",
    ],
  },
  {
    id: "technique",
    icon: Crosshair,
    label: "Technique",
    title: "Dance, golf, swim & movement coaches",
    description:
      "Any discipline where seeing yourself matters. Upload video, mark the key moments, and give clients a clear path from where they are to where they want to be.",
    examples: [
      "Side-by-side review of a swing before and after adjustments",
      "Tag sessions by skill level so students find what they need",
      "Track progress over weeks with a timeline of session notes",
      "Remote clients film at their gym and upload for async review - same workflow, different timezone",
      "Pose overlay shows skeletal alignment frame by frame. AI spots the three moments worth discussing",
    ],
  },
  {
    id: "online",
    icon: Globe,
    label: "Online",
    title: "Remote & async coaches",
    description:
      "Your clients film at their gym, home, or studio and upload for review. You watch on your schedule, leave timestamped notes, and they review when it works for them. No shared timezone required.",
    examples: [
      "Client uploads a training video from their home gym - you review overnight",
      "Timestamped notes replace Loom recordings and Google Doc feedback",
      "AI flags the key moments across 8 client videos so you focus on what matters",
      "Voice-dictate corrections while watching - faster than typing for every client",
      "Replaces Drive + Loom + Trello at a fraction of the cost",
    ],
  },
];

export default function UseCases() {
  const [active, setActive] = useState("fitness");
  const headerRef = useScrollReveal();
  const contentRef = useScrollReveal();
  const tabRefs = useRef({});

  const current = cases.find((c) => c.id === active);
  const Icon = current.icon;

  const handleKeyDown = useCallback(
    (e) => {
      const currentIndex = cases.findIndex((c) => c.id === active);
      let nextIndex = currentIndex;

      switch (e.key) {
        case "ArrowRight":
          nextIndex = (currentIndex + 1) % cases.length;
          break;
        case "ArrowLeft":
          nextIndex = (currentIndex - 1 + cases.length) % cases.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = cases.length - 1;
          break;
        default:
          return;
      }

      e.preventDefault();
      const nextId = cases[nextIndex].id;
      setActive(nextId);
      tabRefs.current[nextId]?.focus();
    },
    [active],
  );

  return (
    <section id="use-cases" className="section">
      <div className="container">
        <div ref={headerRef} className="reveal section-header">
          <span className="section-label">Use Cases</span>
          <h2 className="section-title">Built for how you coach</h2>
          <p className="section-subtitle">
            Pick your coaching style. The tools are the same - the examples change.
          </p>
        </div>

        <div ref={contentRef} className="reveal">
          <div className="uc-tabs" role="tablist" aria-label="Use cases">
            {cases.map((c) => {
              const TabIcon = c.icon;
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  ref={(el) => { tabRefs.current[c.id] = el; }}
                  id={`uc-tab-${c.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`uc-panel-${c.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`uc-tab ${isActive ? "uc-tab-active" : ""}`}
                  onClick={() => setActive(c.id)}
                  onKeyDown={handleKeyDown}
                >
                  <TabIcon size={18} aria-hidden="true" />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>

          <div
            className="uc-panel"
            key={active}
            id={`uc-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`uc-tab-${active}`}
            tabIndex={0}
          >
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
