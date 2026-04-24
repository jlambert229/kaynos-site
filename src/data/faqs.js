import { FMT } from "../config/pricing";
import { URLS } from "../config/urls";

export const faqs = [
  {
    question: "How does pricing work?",
    answer: `Flat ${FMT.coachMonthlySlash} for the coach. Every feature is included and the price doesn't change as you add more student accounts. There are upload and storage limits on the plan. Cancel anytime.`,
    linkText: "See pricing",
    linkHref: "#pricing",
  },
  {
    question: "What do students pay?",
    answer: "Nothing. The coach is the only person on the account who pays. Students sign up through an invite link and get full access to their own sessions, their classes, and their notes at no cost.",
    linkText: "See pricing details",
    linkHref: "#pricing",
  },
  {
    question: "Who is Kaynos built for?",
    answer: "BJJ and MMA coaches first. The default AI prompt is written for jiu jitsu, so it gives more useful output on grappling footage than on anything else. Other grappling disciplines (judo, wrestling, submission grappling) work well too. If you teach striking or another sport entirely, the core workflow still works the same way — the AI is just less tuned to what you're watching.",
    linkText: "See use cases",
    linkHref: "#use-cases",
  },
  {
    question: "Do my students need to download an app?",
    answer: "No. Everything runs in the browser. Students log in from a phone or computer using the invite link you send them.",
    linkText: "Try the student demo",
    linkHref: URLS.demoStudent,
    external: true,
  },
  {
    question: "Can students see each other's private sessions?",
    answer: "No. A private session is only visible to the student it's assigned to, the coach, and admins. Classes are different — those are visible to everyone at your gym, which is what makes them useful for comp footage and drill demos.",
  },
  {
    question: "What happens after the trial?",
    answer: `The plan continues at ${FMT.coachMonthlySlash}. You can cancel anytime. No contracts, no cancellation fees.`,
    linkText: "Start 14-Day Trial",
    linkHref: URLS.signup,
    external: true,
  },
  {
    question: "What video formats work?",
    answer: "MP4, MOV, WebM, and MKV. Files up to 5 GB each. Phone exports, GoPro files, and camera exports all upload the same way.",
    linkText: "Try the coach demo",
    linkHref: URLS.demoCoach,
    external: true,
  },
  {
    question: "Can I use Kaynos from my phone?",
    answer: "Yes. You can upload video, add notes, and manage your roster straight from a phone browser. Most coaches using Kaynos film on a phone and upload right after class on the same device.",
  },
  {
    question: "Can my students upload videos too?",
    answer: "Yes. Both coaches and students can upload. It's especially useful for remote coaching — a student films a roll at their home gym, uploads it, and you review on your own schedule.",
  },
  {
    question: "What does the AI video review do?",
    answer: "It takes your uploaded video, runs an analysis pass, and drops timestamped placeholders on moments worth reviewing. You go through each one and either turn it into a note for the student, edit it, or throw it out. It's a starting point for your review, not a replacement for it.",
  },
  {
    question: "How long are videos stored?",
    answer: "Videos are kept for at least 6 months. Older videos cycle out past the retention window to free up storage. An active account keeps recent content indefinitely. If the account is canceled, videos stay for 30 days before deletion.",
  },
  {
    question: "Is my data safe? What about videos of kids?",
    answer: "Every academy is isolated from every other one. Students only see their own sessions. There are no social features, no public profiles, and no way for anyone outside the academy to discover content. Videos are encrypted in transit and at rest. For gyms running a kids program, that isolation is the point — there's no path for someone outside the gym to find the footage.",
    linkText: "See security details",
    linkHref: "/security",
  },
  {
    question: "Can I have multiple coaches on one account?",
    answer: `Each coach gets their own Kaynos account at ${FMT.coachMonthlySlash}. In a multi-coach gym, each coach manages their own roster. For larger schools with roughly 50+ active students across several coaches, reach out — I can work out team pricing.`,
    linkText: "Contact about teams",
    linkHref: URLS.support,
  },
  {
    question: "Can I organize sessions by topic or technique?",
    answer: "Yes. Tag sessions with whatever makes sense to you — guard, takedowns, passing, comp prep, student name. Use the search palette (Cmd+K or Ctrl+K) to jump to sessions, students, or notes from anywhere in the app.",
  },
  {
    question: "Can I see usage reports?",
    answer: "Yes. The admin panel shows active student counts, session stats, storage usage, and videos approaching retention. You can export your roster as CSV or pull a full JSON data export. Optional weekly or monthly email reports are available.",
  },
  {
    question: "Does Kaynos have scheduling?",
    answer: "Yes. There's a built-in calendar with session scheduling, conflict checks, ICS export, and email reminders. Instructors set their weekly availability and add exceptions for one-off changes. Students can request a private lesson through the booking flow with approval.",
    linkText: "See what's shipped",
    linkHref: "/changelog",
  },
  {
    question: "Does Kaynos have dark mode?",
    answer: "Yes, with light, dark, and system-match options. The app also has a few keyboard shortcuts: N for a new note, H for a highlight, Space for play/pause, and Cmd+K for search.",
  },
];
