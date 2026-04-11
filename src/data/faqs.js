import { FMT, FREE_SEATS, SEAT_PRICE, COACH_MONTHLY_PRICE, calcMonthlyCost } from "../config/pricing";
import { URLS } from "../config/urls";

export const faqs = [
  {
    question: "How does pricing work?",
    answer: `Coaches pay ${FMT.coachMonthlySlash}. The first ${FREE_SEATS} client seats are included. Each additional active client seat is ${FMT.seatPriceSlash}. Your bill adjusts monthly based on how many clients are active. For example, 10 clients costs $${calcMonthlyCost(10)}/mo (${FMT.coachMonthly} base + ${10 - FREE_SEATS} extra seats at ${FMT.seatPrice} each).`,
    linkText: "See pricing",
    linkHref: "#pricing",
  },
  {
    question: "What do clients pay?",
    answer: "Nothing. Clients access Kaynos for free. The coach is the only one who pays. Clients sign up through a link you send them and get full access to their sessions, classes, and notes at no cost.",
    linkText: "See pricing details",
    linkHref: "#pricing",
  },
  {
    question: "What counts as an active seat?",
    answer: `An active seat is a client who has logged in or accessed content during the current billing period. If a client is inactive for a full billing cycle, they don't count toward your seat total. Your first ${FREE_SEATS} active seats are always included in the ${FMT.coachMonthlySlash} base price.`,
    linkText: "See pricing",
    linkHref: "#pricing",
  },
  {
    question: "What types of coaching does this work for?",
    answer: "Any coaching where reviewing video helps. Personal training, martial arts, music lessons, sports technique. If you film it, Kaynos works.",
    linkText: "See use cases",
    linkHref: "#use-cases",
  },
  {
    question: "Do my clients need to download an app?",
    answer: "No. Everything runs in the browser. Clients just log in from their phone or computer using the link you send them.",
    linkText: "Try the client demo",
    linkHref: URLS.demoStudent,
    external: true,
  },
  {
    question: "Can clients see each other's private sessions?",
    answer: "No. Private sessions are only visible to the assigned client, the coach, and admins. Classes are visible to everyone in your account, great for group content and shared recordings.",
  },
  {
    question: "What happens after the trial?",
    answer: `Your coach plan continues at ${FMT.coachMonthlySlash}. The first ${FREE_SEATS} client seats stay included. Any additional active seats are billed at ${FMT.seatPriceSlash} each. Cancel anytime. No contracts, no cancellation fees.`,
    linkText: "Start 14-Day Trial",
    linkHref: URLS.signup,
    external: true,
  },
  {
    question: "What video formats work?",
    answer: "MP4, MOV, WebM, and MKV. Files up to 5 GB. You can also link Vimeo videos if you already host there.",
    linkText: "Try the coach demo",
    linkHref: URLS.demoCoach,
    external: true,
  },
  {
    question: "Can I use Kaynos from my phone?",
    answer: "Yes. Upload videos, add notes, and manage clients right from your phone's browser. No app to install. Most coaches film on their phone and upload directly - the whole workflow works without a laptop.",
  },
  {
    question: "Can my clients upload videos too?",
    answer: "Yes. Coaches and clients can both upload. This is how remote coaching works - your client films at their gym, uploads it, and you review on your schedule with timestamped notes.",
  },
  {
    question: "What does the AI video review do?",
    answer: "You click one button and AI analyzes your video, flagging the most important moments (typically 2-4, depending on video length) worth reviewing with your client. It gives you timestamped starting points so you don't have to scrub through the whole recording. You decide what to keep, edit, or delete.",
  },
  {
    question: "How long are videos stored?",
    answer: "Videos are stored for a minimum of 6 months. Active accounts retain videos indefinitely. If your account is canceled, videos are kept for 30 days before deletion.",
  },
  {
    question: "Is my data safe? What about videos of minors?",
    answer: "Each account is fully isolated. Students only see their own sessions. There are no social features, no public profiles, and no way for anyone outside the account to discover content. Videos are encrypted in transit and at rest.",
    linkText: "See security details",
    linkHref: "/security",
  },
  {
    question: "Can I have multiple coaches on one account?",
    answer: `Each coach gets their own Kaynos account at ${FMT.coachMonthlySlash}. If you run a multi-coach gym, each coach manages their own roster independently. At 51+ active clients, you unlock invoicing, dedicated support, and SLA-backed uptime.`,
    linkText: "Contact us about teams",
    linkHref: URLS.support,
  },
  {
    question: "Can I organize sessions by topic or technique?",
    answer: "Yes. Tag sessions with any label - guard, takedowns, recital prep, whatever fits. Use the search palette (Cmd+K or Ctrl+K) to find sessions, clients, or notes across your whole account.",
  },
  {
    question: "Can I see usage reports?",
    answer: "Yes. The admin panel shows member counts, session stats, storage usage, and expiring videos. Export your roster as CSV or download a full data export as JSON. Optional weekly or monthly email reports.",
  },
  {
    question: "Does Kaynos have scheduling?",
    answer: "Session scheduling and calendar integration are on our roadmap. Today, coaches create sessions manually and clients are notified by email when new content is available.",
    linkText: "See what we've shipped",
    linkHref: "/changelog",
  },
  {
    question: "Does Kaynos have dark mode?",
    answer: "Yes. Choose light, dark, or match your system setting. The app also has keyboard shortcuts: N for new note, H for highlight, Space for play/pause, and Cmd+K for search.",
  },
];
