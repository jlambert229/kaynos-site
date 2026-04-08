import { Zap, Users, Target, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

const values = [
  {
    icon: Zap,
    title: "We train too",
    detail:
      "Kaynos came from our own frustration. Great coaching moments kept disappearing after class, and nothing out there solved the problem without being a pain to use.",
  },
  {
    icon: Target,
    title: "Made for coaches",
    detail:
      "Every feature starts with a simple question: does this actually help a coach? If the answer is no, we don't build it.",
  },
  {
    icon: Heart,
    title: "No fluff",
    detail:
      "No social feeds, no leaderboards, no AI hype. Just video review that works. We'd rather do one thing well than ten things halfway.",
  },
  {
    icon: Users,
    title: "Pricing that rewards growth",
    detail:
      "Most platforms charge you more as you grow. Kaynos does the opposite. Every client you enroll lowers your cost. Grow your practice, shrink your bill.",
  },
];

export default function Story() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section id="story" className="section">
      <div className="container">
        <div ref={headerRef} className="reveal section-header">
          <span className="section-label">Why Kaynos</span>
          <h2 className="section-title">
            Built by coaches, for coaches
          </h2>
        </div>

        <p className="story-pullquote">
          &ldquo;We kept losing the best coaching moments the second class ended. Google Drive links and group chats weren't cutting it. So we built the tool we wished we had.&rdquo;
        </p>

        <div ref={gridRef} className="reveal story-grid">
          {values.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="story-card">
              <div className="story-icon">
                <Icon size={20} />
              </div>
              <h3 className="story-card-title">{title}</h3>
              <p className="story-card-detail">{detail}</p>
            </div>
          ))}
        </div>

        <p className="story-closer">
          Kaynos is independent, self-funded, and built by people who
          actually use it. Got feedback?{" "}
          <Link to="/contact" className="story-closer-link">
            Talk to us directly <ArrowRight size={14} />
          </Link>
        </p>
      </div>
    </section>
  );
}
