import { FMT, PRICING_COPY, ACTIVE_VIDEO_LIMIT, STORAGE_GB } from "../config/pricing";
import { URLS } from "../config/urls";

export const faqs = [
  {
    question: "How does pricing work?",
    answer: `Flat ${FMT.coachMonthlySlash} for the coach. Every feature is included and the price doesn't change as you add more student accounts. There are video and storage limits on the plan. Cancel anytime.`,
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
    answer: "BJJ and MMA coaches first. The workflow is shaped around grappling — rolls, positional rounds, comp footage, and private lessons. Other grappling disciplines (judo, wrestling, submission grappling) fit the same way. If you teach striking or another sport entirely, the core loop — film, note, share — works just the same; only the grappling-specific touches matter less.",
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
    linkText: PRICING_COPY.trialCta,
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
    question: "What tools are there for actually reviewing footage?",
    answer: "The player is built for rewatching. A–B loop a sequence and replay it while you write the note, save labeled segments for the teachable twenty seconds, draw on a paused frame when a grip is easier to show than describe, and put two sessions side by side for a before-and-after. Notes can be typed or dictated, voice notes get automatic transcripts, and everything — notes and transcripts included — shows up in search.",
    linkText: "Try the coach demo",
    linkHref: URLS.demoCoach,
    external: true,
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
    question: `What happens if I hit ${ACTIVE_VIDEO_LIMIT} videos or ${STORAGE_GB} GB?`,
    answer: `You'll get an email at about 80% of either limit so there's no surprise mid-class. The video limit counts what's stored right now, not monthly uploads — delete a video, or let an older one cycle out past the 6-month retention window, and the slot frees up immediately. If you regularly bump the ceiling, email me — I'd rather know and work out a plan than have you blocked.`,
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
    answer: "Yes. There's a built-in calendar with recurring classes, conflict checks, ICS export, and Google Calendar sync. Students RSVP to classes and request private lessons through the booking flow — you approve or decline, and both sides get email and SMS reminders. Instructors set weekly availability with exceptions for one-off changes.",
    linkText: "See what's shipped",
    linkHref: "/changelog",
  },
  {
    question: "Does Kaynos have dark mode?",
    answer: "Yes, with light, dark, and system-match options. The app also has a few keyboard shortcuts: N for a new note, H for a highlight, Space for play/pause, and Cmd+K for search.",
  },
];
