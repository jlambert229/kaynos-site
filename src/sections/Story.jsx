import { Heart } from "lucide-react";

const values = [
  {
    title: "We train too",
    detail:
      "Kaynos was born on the mats, not in a boardroom. We are jiu jitsu practitioners who got tired of losing coaching insights between classes.",
  },
  {
    title: "Coach-first design",
    detail:
      "Every feature starts with one question: does this make coaching easier? If it does not help an instructor or student on the mat, it does not ship.",
  },
  {
    title: "No bloat, no gimmicks",
    detail:
      "We skipped the social-media features, the leaderboard drama, and the AI buzzwords. Kaynos does video review and does it well.",
  },
  {
    title: "Small-school friendly",
    detail:
      "You should not need 200 students to afford proper video tools. One flat price, unlimited students, no per-seat surprises.",
  },
];

export default function Story() {
  return (
    <section id="story" className="section section--alt">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Story</span>
          <h2 className="section-title">
            Built by grapplers, for grapplers
          </h2>
          <p className="section-subtitle">
            We built Kaynos because nothing else solved the problem we kept
            running into: great coaching moments disappear the second class
            ends. Film review fixes that, but the tools out there were either
            overbuilt enterprise software or clunky shared drives. So we made
            exactly what we wished existed.
          </p>
        </div>

        <div className="story-grid">
          {values.map(({ title, detail }) => (
            <div key={title} className="story-card">
              <div className="story-icon">
                <Heart size={20} />
              </div>
              <h3 className="story-card-title">{title}</h3>
              <p className="story-card-detail">{detail}</p>
            </div>
          ))}
        </div>

        <p className="story-closer">
          Kaynos is independent, self-funded, and run by people who still pull
          guard on weeknights. If you have feedback, you are talking to the
          people who build it.
        </p>
      </div>
    </section>
  );
}
