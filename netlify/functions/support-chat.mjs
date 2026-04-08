/**
 * Sales & support chat for the Kaynos marketing site.
 *
 * Client: POST JSON { sessionId, messages: { role, content }[] }
 * Response: { content: string }
 *
 * Netlify UI: set secrets with Functions scope:
 *   SUPPORT_CHAT_PROVIDER = openai | anthropic
 *   OPENAI_API_KEY or ANTHROPIC_API_KEY
 * Optional: OPENAI_MODEL, ANTHROPIC_MODEL
 *
 * Frontend: VITE_SUPPORT_CHAT_API_URL=/api/support-chat
 */

const SYSTEM_PROMPT = `You are Kaynos Sales Assistant, the friendly, knowledgeable chatbot on the Kaynos marketing website (www.kaynos.net). Your job is to answer questions, overcome objections, and guide coaches toward starting a free trial.

## About Kaynos
Kaynos is a private video training platform built for coaches and trainers. Coaches upload training footage, add timestamped notes pinned to exact moments, and share sessions with clients. Clients watch, add their own notes, and track progress — all in the browser, no app download needed.

## Pricing (Single Plan)
- Coach Plan: $49/month (or $488/year, ~$40.67/mo — 17% savings)
- 14-day free trial included, no charge until trial ends
- Cancel anytime, no contracts, no cancellation fees
- Includes: 100 video uploads, 50 GB storage, 6-month video retention, timestamped coach notes, admin panel, usage reports, priority support

## Client Credit System (Key Selling Point)
- First 3 clients per coach are FREE
- Each additional paid client pays $49/month via a signup link the coach sends
- Coach earns $10/month credit per paid client toward their own bill
- With 5 paid clients (8 total including 3 free), credits = $50/mo, covering the $49 plan entirely
- Result: coach's platform cost drops to $0
- Annual plans: $120/year credit per paid client

## What Clients Get ($49/mo each)
- Watch assigned private sessions
- Browse shared group classes
- Add their own notes alongside coach feedback
- Resume where they left off
- Progress tracking
- Works in any browser

## Key Features
- Drag-and-drop video uploads (MP4, MOV, WebM, MKV, up to 5 GB)
- Vimeo link import
- Timestamped coaching notes pinned to exact video moments
- Private sessions (coach + assigned client only) and shared classes (visible to all)
- Tag-based organization
- Admin tools: roster management, invite links, CSV export, usage reports
- Usage tracking: see who's watching, when, and how often

## Who It's For
- Personal trainers & strength coaches
- BJJ, boxing, MMA & martial arts coaches
- Music & instrument teachers
- Dance, golf, swim & movement coaches
- Any coach where reviewing video helps clients improve

## vs Alternatives
- vs Google Drive + Vimeo: No timestamped notes, no client-specific sessions, no tracking, not built for coaching
- vs Teachable / Kajabi: Those are course platforms, not coaching tools. Expensive ($99-199/mo). No video annotation, no per-session review
- vs DIY / Email: Disorganized, clients lose links, no tracking, no progress history

## Live Demos
- Coach demo: demo.kaynos.net (no signup needed)
- Client demo: client.kaynos.net (no signup needed)

## Signup
- Start at: app.kaynos.net/signup
- 14-day free trial, first 3 clients free

## Rules
- Be concise, warm, and helpful. Use short paragraphs or bullets.
- Always steer toward the free trial as the next step.
- If someone asks about a feature that doesn't exist, say so honestly. Don't invent features.
- For account-specific issues (billing, passwords, client data), direct to support@kaynos.net.
- Never ask for passwords, API keys, or payment card numbers.
- If asked about competitors, be factual and fair — highlight Kaynos advantages without trash-talking.
- Match the visitor's energy — casual if they're casual, detailed if they want detail.
- Mention the demos (demo.kaynos.net / client.kaynos.net) when relevant.`;

const MAX_MESSAGES = 24;
const MAX_CONTENT_LEN = 8000;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function trimMessages(raw) {
  if (!Array.isArray(raw)) return [];
  const cleaned = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") continue;
    const role = m.role;
    if (role !== "user" && role !== "assistant") continue;
    let content = typeof m.content === "string" ? m.content : "";
    if (content.length > MAX_CONTENT_LEN) {
      content = `${content.slice(0, MAX_CONTENT_LEN)}…`;
    }
    cleaned.push({ role, content });
  }
  return cleaned.slice(-MAX_MESSAGES);
}

function stripLeadingAssistants(messages) {
  const out = [...messages];
  while (out.length > 0 && out[0].role === "assistant") {
    out.shift();
  }
  return out;
}

function anthropicThread(messages) {
  const out = [];
  for (const msg of messages) {
    if (!out.length) {
      if (msg.role !== "user") continue;
      out.push({ role: "user", content: msg.content });
      continue;
    }
    const last = out[out.length - 1];
    if (last.role === msg.role) {
      last.content = `${last.content}\n\n${msg.content}`;
    } else {
      out.push({ role: msg.role, content: msg.content });
    }
  }
  return out;
}

async function completeOpenAI(messages) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 900,
      temperature: 0.4,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error?.message || res.statusText || "OpenAI request failed");
  }
  const text = data?.choices?.[0]?.message?.content;
  if (typeof text !== "string" || !text.trim()) throw new Error("Empty model response");
  return text.trim();
}

async function completeAnthropic(messages) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not configured");
  const model = process.env.ANTHROPIC_MODEL || "claude-3-5-haiku-20241022";
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 900,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error?.message || res.statusText || "Anthropic request failed");
  }
  const block = data?.content?.[0];
  const text = block?.type === "text" ? block.text : "";
  if (typeof text !== "string" || !text.trim()) throw new Error("Empty model response");
  return text.trim();
}

/* ── Offline fallback (no API key set) ────────────────────── */

const FALLBACK_ANSWERS = [
  { patterns: ["pric", "cost", "how much", "pay", "bill", "free", "money", "afford", "expensive"], answer: "Kaynos is $49/month for coaches (or $488/year for 17% savings). Your first 3 clients are free. Each paid client earns you $10/mo in credit — so with 5 paid clients, your bill drops to $0.\n\nThere's a 14-day free trial to get started, no charge until it ends. Want to try it?" },
  { patterns: ["client", "credit", "revenue", "earn", "share"], answer: "Here's how credits work:\n\n• Your first 3 clients are free\n• Each paid client pays $49/mo via a link you send\n• You earn $10/mo credit per paid client\n• 5 paid clients = $50/mo credit, covering your $49 plan\n\nResult: your platform cost drops to $0. The more you grow, the less you pay." },
  { patterns: ["trial", "try", "test", "start", "signup", "sign up", "begin"], answer: "You can start a 14-day free trial at app.kaynos.net/signup — no credit card required to explore. Your first 3 clients are included free.\n\nOr try the live demos first (no signup needed):\n• Coach view: demo.kaynos.net\n• Client view: client.kaynos.net" },
  { patterns: ["demo", "preview", "see it", "look like", "show me"], answer: "You can explore the real app with sample data — no signup needed:\n\n• Coach demo: demo.kaynos.net\n• Client demo: client.kaynos.net\n\nBoth use sample data so you can click around freely." },
  { patterns: ["feature", "what can", "what does", "do", "include", "offer"], answer: "Kaynos includes:\n\n• Drag-and-drop video uploads (MP4, MOV, WebM, MKV, up to 5 GB)\n• Timestamped coaching notes pinned to exact moments\n• Private sessions + shared group classes\n• Client progress tracking & usage analytics\n• Tag-based organization\n• Admin tools (rosters, invite links, CSV export)\n• Works in any browser — no app download\n\nWant to see it in action? Try demo.kaynos.net" },
  { patterns: ["video", "upload", "format", "file", "size", "storage"], answer: "Kaynos supports MP4, MOV, WebM, and MKV files up to 5 GB each. You can also link Vimeo videos if you already host there.\n\nThe coach plan includes 100 video uploads and 50 GB storage with 6-month retention." },
  { patterns: ["note", "timestamp", "comment", "annotate", "feedback"], answer: "Timestamped notes are the core of Kaynos. You pin notes to exact moments in a video — your client sees them right at the relevant point. Clients can add their own notes too, and everything is searchable.\n\nIt's like leaving coaching cues exactly where they matter." },
  { patterns: ["bjj", "martial art", "boxing", "mma", "fight", "grappl", "jiu"], answer: "Kaynos is great for martial arts coaches! You can:\n\n• Break down sparring rounds with timestamped notes\n• Annotate the exact moment a technique opens up\n• Post comp footage as a shared class for the gym\n• Keep private session reviews between you and a student\n\nTry the coach demo at demo.kaynos.net to see how it works." },
  { patterns: ["fitness", "personal train", "gym", "workout", "strength", "pt"], answer: "Personal trainers use Kaynos to:\n\n• Record form checks and leave timestamped cues\n• Upload session recaps clients can rewatch\n• Share mobility drills as group classes\n• Track which clients are watching their sessions\n\nNo more texting video links that get buried. Try demo.kaynos.net" },
  { patterns: ["music", "instrument", "voice", "lesson", "teach", "piano", "guitar"], answer: "Music teachers use Kaynos to:\n\n• Record lessons and mark bars that need practice\n• Pin notes at exact moments ('watch your hand position here')\n• Upload recital recordings for group review\n• Let students add their own practice notes\n\nStudents hear your feedback right at the moment that matters." },
  { patterns: ["compare", "vs", "versus", "alternative", "competitor", "better than", "different from", "drive", "teachable", "kajabi", "vimeo"], answer: "Here's how Kaynos compares:\n\n• vs Google Drive + Vimeo: No timestamped notes, no tracking, not built for coaching\n• vs Teachable/Kajabi: Those are course platforms ($99-199/mo), not coaching tools\n• vs DIY/Email: Disorganized, clients lose links, no progress history\n\nKaynos is purpose-built for coaches — video review with timestamped notes, client management, and a pricing model that rewards growth." },
  { patterns: ["cancel", "contract", "lock", "commitment"], answer: "No contracts, no cancellation fees. Cancel anytime from your billing settings. Your 14-day trial is completely free — you won't be charged until it ends." },
  { patterns: ["app", "download", "install", "phone", "mobile", "browser"], answer: "No app download needed! Everything runs in the browser — your clients just log in from their phone or computer using the link you send them. Works on any device." },
  { patterns: ["private", "secure", "privacy", "data", "who can see"], answer: "Private by default. Private sessions are only visible to the assigned client, the coach, and admins. Shared classes are visible to everyone in your account.\n\nYour footage stays yours — each account is separate, and videos are never public." },
  { patterns: ["annual", "yearly", "discount", "save"], answer: "The annual plan is $488/year (~$40.67/mo) — that's 17% off the monthly price. Client credits on annual plans earn $120/year per paid client.\n\nWith 5 paid clients on annual billing, your credits cover the full year." },
  { patterns: ["hello", "hi ", "hey", "howdy", "sup", "what's up"], answer: "Hey! 👋 I'm here to help you learn about Kaynos. What are you curious about? I can tell you about features, pricing, how the credit system works, or anything else." },
  { patterns: ["help", "support", "contact", "email", "reach", "talk to"], answer: "For general questions, I'm right here! For account-specific help (billing, passwords, client data), reach out to support@kaynos.net and we'll get back to you quickly." },
];

function fallbackReply(userText) {
  const lower = userText.toLowerCase();
  for (const entry of FALLBACK_ANSWERS) {
    if (entry.patterns.some((p) => lower.includes(p))) {
      return entry.answer;
    }
  }
  return "Great question! I'd love to help. Could you tell me a bit more about what you're looking for? I can help with:\n\n• Pricing & how credits work\n• Features & what's included\n• How Kaynos compares to alternatives\n• Getting started with a free trial\n\nOr try the live demo at demo.kaynos.net — no signup needed!";
}

export default async (req) => {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const trimmed = stripLeadingAssistants(trimMessages(body?.messages));
  if (trimmed.length === 0) {
    return json({ error: "At least one user message is required" }, 400);
  }

  const provider = (process.env.SUPPORT_CHAT_PROVIDER || "").toLowerCase();
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  const hasAnthropic = !!process.env.ANTHROPIC_API_KEY;

  /* If no API keys, use fallback knowledge base */
  if (!hasOpenAI && !hasAnthropic) {
    const lastUser = [...trimmed].reverse().find((m) => m.role === "user");
    const content = fallbackReply(lastUser?.content ?? "");
    return json({ content });
  }

  try {
    let content;
    if (provider === "anthropic" && hasAnthropic) {
      const thread = anthropicThread(trimmed);
      if (thread.length === 0 || thread[0].role !== "user") {
        return json({ error: "Invalid message sequence" }, 400);
      }
      content = await completeAnthropic(thread);
    } else {
      content = await completeOpenAI(trimmed);
    }
    return json({ content });
  } catch (e) {
    /* If LLM fails, fall back to knowledge base */
    const lastUser = [...trimmed].reverse().find((m) => m.role === "user");
    const content = fallbackReply(lastUser?.content ?? "");
    console.error("support-chat LLM error, using fallback:", e.message);
    return json({ content });
  }
};

export const config = {
  path: "/api/support-chat",
};
