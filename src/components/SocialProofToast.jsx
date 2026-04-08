import { useState, useEffect } from "react";
import { UserCheck } from "lucide-react";

const toasts = [
  { city: "Austin", time: "2 minutes ago" },
  { city: "Denver", time: "5 minutes ago" },
  { city: "Toronto", time: "8 minutes ago" },
  { city: "London", time: "12 minutes ago" },
  { city: "San Diego", time: "15 minutes ago" },
];

export default function SocialProofToast() {
  const [current, setCurrent] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let idx = 0;
    const show = () => {
      setCurrent(toasts[idx % toasts.length]);
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
      idx++;
    };

    const initial = setTimeout(show, 15000);
    const interval = setInterval(show, 45000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  if (!current) return null;

  return (
    <div className={`proof-toast ${visible ? "proof-toast-visible" : ""}`}>
      <UserCheck size={16} className="proof-toast-icon" aria-hidden="true" />
      <span>A coach in {current.city} started a trial {current.time}</span>
    </div>
  );
}
