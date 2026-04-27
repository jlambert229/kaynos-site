import { useState, useRef, useCallback } from "react";
import { Swords, Trophy, UserCheck, Globe } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";

const cases = [
  {
    id: "sparring",
    icon: Swords,
    label: "Sparring & Rolls",
    title: "Daily sparring review",
    description:
      "Film a few rolls each class, upload after, and let AI do a first pass on the moments worth talking through. Then send each student their own session so they can rewatch during the week.",
    examples: [
      "Upload a roll and let AI flag the moments worth reviewing first",
      "Pin a note at the exact moment the pass finishes",
      "Dictate corrections hands-free while you watch — no typing between observations",
      "See which students have actually watched their sessions",
    ],
  },
  {
    id: "competition",
    icon: Trophy,
    label: "Competition Prep",
    title: "Comp footage and prep",
    description:
      "Break down matches with your competitors. Post a full tournament's footage as a shared class for everyone to learn from. Keep each competitor's match history in their own private library.",
    examples: [
      "Post comp footage as a shared class so the whole gym can study from it",
      "Review a match privately with timestamped notes on what worked and what didn't",
      "Tag sessions by opponent, division, or tournament to find them later",
      "Each competitor builds a private library of their matches over time",
    ],
  },
  {
    id: "privates",
    icon: UserCheck,
    label: "Private Lessons",
    title: "Private lesson libraries",
    description:
      "Every private student gets a library of their lessons so they can rewatch between sessions. Booking runs on the built-in scheduler — students request, you approve.",
    examples: [
      "Record a technique detail once, the student can replay it as often as they need",
      "Schedule privates through a built-in calendar with availability windows",
      "Students request private lessons through the booking flow — you approve or decline",
      "Tag sessions by technique so a student can pull up prior lessons on the same move",
    ],
  },
  {
    id: "remote",
    icon: Globe,
    label: "Online / Remote",
    title: "Remote and async coaching",
    description:
      "A student films at their own gym and uploads it to you. You watch on your own schedule, drop timestamped notes, and they review when they can. No shared timezone needed.",
    examples: [
      "Student uploads a roll from their home gym — you watch on your own schedule",
      "Timestamped notes replace long voice memos and scrolling through Google Docs",
      "AI runs through every upload first so you spend your time on the notes that matter",
      "Replaces the Drive + Loom + Trello stack most remote coaches end up with",
    ],
  },
];

export default function UseCases() {
  const [active, setActive] = useState("sparring");
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
          <h2 className="section-title">Four ways coaches are using it</h2>
          <p className="section-subtitle">
            Sparring, comp prep, privates, remote coaching. Same set of
            tools under the hood; what changes is how you reach for them.
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
