import { FMT, COACH_MONTHLY_PRICE } from "../config/pricing";
import { URLS } from "../config/urls";

export const faqs = [
  {
    question: "How does pricing work?",
    answer: `${FMT.coachMonthlySlash} flat. All features included. Unlimited student accounts — no per-seat math, no tiers. Your bill is the same whether you coach 5 students or 500. Cancel anytime.`,
    linkText: "See pricing",
    linkHref: "#pricing",
  },
  {
    question: "What do students pay?",
    answer: "Nothing. Students access Kaynos for free. The coach is the only one who pays. Students sign up through a link you send them and get full access to their sessions, classes, and notes at no cost.",
    linkText: "See pricing details",
    linkHref: "#pricing",
  },
  {
    question: "Who is Kaynos built for?",
    answer: "BJJ and MMA coaches. The AI is tuned for grappling — it recognizes sweeps, submissions, scrambles, and positional changes. Other grappling disciplines (judo, wrestling, submission grappling) work well too. If you teach striking, dance, or a non-grappling sport, the core workflow works but you'll get less out of the AI.",
    linkText: "See use cases",
    linkHref: "#use-cases",
  },
  {
    question: "Do my students need to download an app?",
    answer: "No. Everything runs in the browser. Students just log in from their phone or computer using the link you send them.",
    linkText: "Try the student demo",
    linkHref: URLS.demoStudent,
    external: true,
  },
  {
    question: "Can students see each other's private sessions?",
    answer: "No. Private sessions are only visible to the assigned student, the coach, and admins. Classes are visible to everyone in your academy — great for competition footage, drill demos, and shared recordings.",
  },
  {
    question: "What happens after the trial?",
    answer: `Your plan continues at ${FMT.coachMonthlySlash}. Cancel anytime. No contracts, no cancellation fees.`,
    linkText: "Start 14-Day Trial",
    linkHref: URLS.signup,
    external: true,
  },
  {
    question: "What video formats work?",
    answer: "MP4, MOV, WebM, and MKV. Files up to 5 GB. Phone footage, GoPro files, camera files — they all work.",
    linkText: "Try the coach demo",
    linkHref: URLS.demoCoach,
    external: true,
  },
  {
    question: "Can I use Kaynos from my phone?",
    answer: "Yes. Upload videos, add notes, and manage students right from your phone's browser. No app to install. Most coaches film on their phone and upload directly after class.",
  },
  {
    question: "Can my students upload videos too?",
    answer: "Yes. Coaches and students can both upload. Useful for remote coaching — a student films a roll at their home gym, uploads it, and you review on your schedule.",
  },
  {
    question: "What does the AI video review do?",
    answer: "You upload a sparring video. AI analyzes it and places timestamped placeholders at the moments worth reviewing — typically 2-4 per roll, depending on length. You review each placeholder, edit, delete, or turn it into a note for your student. It's a starting point, not a replacement.",
  },
  {
    question: "How long are videos stored?",
    answer: "Videos are retained for at least 6 months. As older videos age past the retention window, they cycle out to free up storage. Active accounts keep recent content indefinitely. If your account is canceled, videos are kept for 30 days before deletion.",
  },
  {
    question: "Is my data safe? What about videos of kids?",
    answer: "Each academy is fully isolated. Students only see their own sessions. There are no social features, no public profiles, and no way for anyone outside the academy to discover content. Videos are encrypted in transit and at rest. For coaches running kids programs, this is the point — no way for strangers to find your footage.",
    linkText: "See security details",
    linkHref: "/security",
  },
  {
    question: "Can I have multiple coaches on one account?",
    answer: `Each coach gets their own Kaynos account at ${FMT.coachMonthlySlash}. If you run a multi-coach academy, each coach manages their own roster. For larger schools (50+ active students across multiple coaches), contact us about team pricing.`,
    linkText: "Contact us about teams",
    linkHref: URLS.support,
  },
  {
    question: "Can I organize sessions by topic or technique?",
    answer: "Yes. Tag sessions with anything — guard, takedowns, passing, comp prep. Use the search palette (Cmd+K or Ctrl+K) to find sessions, students, or notes across your whole academy.",
  },
  {
    question: "Can I see usage reports?",
    answer: "Yes. The admin panel shows student counts, session stats, storage usage, and expiring videos. Export your roster as CSV or download a full data export as JSON. Optional weekly or monthly email reports.",
  },
  {
    question: "Does Kaynos have scheduling?",
    answer: "Yes. Built-in calendar with session scheduling, conflict checks, ICS export, and email reminders. Instructors set their weekly availability, add one-off exceptions, and students can request private lessons through a booking flow with approval.",
    linkText: "See what we've shipped",
    linkHref: "/changelog",
  },
  {
    question: "Does Kaynos have dark mode?",
    answer: "Yes. Choose light, dark, or match your system setting. The app also has keyboard shortcuts: N for new note, H for highlight, Space for play/pause, and Cmd+K for search.",
  },
];
