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
      "Film rolls, upload after class, add timestamped notes. AI places placeholders at moments worth reviewing. Send each student their own session so they can review between classes.",
    examples: [
      "Upload a roll, AI places placeholders at moments worth discussing",
      "Pin a note at the exact moment their guard gets passed",
      "Dictate corrections hands-free while watching — no typing interrupts the flow",
      "Track who has watched their sessions and who hasn't",
    ],
  },
  {
    id: "competition",
    icon: Trophy,
    label: "Competition Prep",
    title: "Comp footage & prep",
    description:
      "Break down matches. Post comp footage as shared classes for the whole academy. Build per-student session libraries tagged by opponent or tournament.",
    examples: [
      "Post comp footage as a shared class for the whole gym to study",
      "Private match review — add timestamped notes on what worked and what didn't",
      "Tag sessions by opponent, division, or tournament for easy lookup",
      "Each student gets a private library of their matches over time",
    ],
  },
  {
    id: "privates",
    icon: UserCheck,
    label: "Private Lessons",
    title: "Private lesson libraries",
    description:
      "Each private student gets their own library of their sessions. They rewatch between privates. You track who has viewed what. Built-in scheduling handles the booking.",
    examples: [
      "Record a technique detail once, your student can replay it as many times as they want",
      "Schedule private lessons with built-in availability and booking",
      "Students request new privates through the booking flow — you approve or decline",
      "Tag sessions by technique so students find prior lessons quickly",
    ],
  },
  {
    id: "remote",
    icon: Globe,
    label: "Online / Remote",
    title: "Remote & async BJJ coaching",
    description:
      "Your students film at their home gym or academy and upload for review. You watch on your schedule, leave timestamped notes, and they review when they can. No shared timezone required.",
    examples: [
      "Student uploads a roll from their home gym — you review on your schedule",
      "Timestamped notes replace long voice memos and Google Doc breakdowns",
      "AI places placeholders across student videos so you focus on what matters",
      "Replaces Drive + Loom + Trello for your remote coaching workflow",
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
          <h2 className="section-title">Built for how BJJ coaches actually teach</h2>
          <p className="section-subtitle">
            Pick your workflow. The tools are the same - the examples change.
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
