import { Dumbbell, Music, Swords, Crosshair } from "lucide-react";

const categories = [
  { icon: Dumbbell, label: "Fitness" },
  { icon: Swords, label: "Martial Arts" },
  { icon: Music, label: "Music" },
  { icon: Crosshair, label: "Technique Coaching" },
];

export default function SocialProofBar() {
  return (
    <div className="social-proof-bar">
      <p className="social-proof-text">
        Trusted by coaches across disciplines
      </p>
      <div className="social-proof-categories">
        {categories.map(({ icon: Icon, label }) => (
          <span key={label} className="social-proof-cat">
            <Icon size={16} aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
