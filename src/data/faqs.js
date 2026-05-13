import { FMT, VIDEO_UPLOADS, STORAGE_GB } from "../config/pricing";
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
    question: "Can I cancel anytime, and what happens to my videos?",
    answer: "Yes. Cancellation takes effect at the end of your current billing month — you keep full access until then. After cancellation, videos and notes remain accessible for 30 days so you can download anything you want to keep, then the account is deleted. Nothing renews after you cancel.",
  },
  {
    question: "Are there refunds?",
    answer: "There's no charge during the 14-day trial — cancel before day 14 and you pay nothing. After that the plan is month-to-month with no contract; cancel anytime and you won't be billed again. If you canceled mid-month and want a refund for the unused portion, email me and we'll sort it out.",
    linkText: "Email support",
    linkHref: URLS.support,
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
    answer: "It takes your uploaded video, runs a grappling-focused analysis pass, and drops timestamped placeholders on moments worth a second look — submission attempts, sweep entries, guard passes, takedown setups, scrambles, and position changes are the kinds of things it tends to surface. You go through each placeholder and either turn it into a note for the student, edit it, or throw it out. It's a starting point for your review, not a replacement for it, and you should expect to discard some flags and add your own — especially for moments like stalling or subtle pressure that don't visually pop.",
  },
  {
    question: "How long are videos stored?",
    answer: "Videos are kept for at least 6 months. Older videos cycle out past the retention window to free up storage. An active account keeps recent content indefinitely. If the account is canceled, videos stay for 30 days before deletion.",
  },
  {
    question: "Can I export my videos and data?",
    answer: "Yes. Individual videos download from the session view. The admin panel ships a full JSON export of your roster, sessions, notes, and metadata, plus a roster CSV. For a bulk video archive of an entire account (useful before cancellation), email support and we'll set it up.",
    linkText: "Email support",
    linkHref: URLS.support,
  },
  {
    question: "Is my data safe? What about videos of kids?",
    answer: "Every academy is isolated from every other one. Students only see their own sessions. There are no social features, no public profiles, and no way for anyone outside the academy to discover content. Videos are encrypted in transit and at rest. For gyms running a kids program, that isolation is the point — there's no path for someone outside the gym to find the footage.",
    linkText: "See security details",
    linkHref: "/security",
  },
  {
    question: "What happens to my data if Kaynos shuts down?",
    answer: "If Kaynos ever winds down, the plan is to give meaningful advance notice and an export window so every coach can pull their videos and notes out before anything goes away. Kaynos is independent and self-funded — not VC-pressured — so there's no investor with a 'shut it off' option above me. Hosting, storage, and database all run on major providers (Netlify, Backblaze, Neon) with their own continuity guarantees.",
    linkText: "See sub-processors",
    linkHref: "/processors",
  },
  {
    question: `What happens if I hit ${VIDEO_UPLOADS} uploads or ${STORAGE_GB} GB?`,
    answer: `You'll get an email at about 80% of either limit so there's no surprise mid-class. If you hit the ceiling, new uploads pause until the next billing cycle (older videos also cycle out past the 6-month retention window, which can free up storage on its own). If you regularly bump the ceiling, email me — I'd rather know and work out a plan than have you blocked.`,
    linkText: "Email support",
    linkHref: URLS.support,
  },
  {
    question: "Can I have multiple coaches on one account?",
    answer: `Each coach gets their own Kaynos account at ${FMT.coachMonthlySlash}. In a multi-coach gym, each coach manages their own roster. For larger schools with 50+ active students across several coaches, reach out — I can work out team pricing.`,
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
