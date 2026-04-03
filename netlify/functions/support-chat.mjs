/**
 * LLM proxy for the marketing site support widget.
 *
 * Client: POST JSON { sessionId, messages: { role, content }[] }
 * Response: { content: string }
 *
 * Netlify UI: set secrets with Functions scope (not netlify.toml [build.environment]):
 *   SUPPORT_CHAT_PROVIDER = openai | anthropic
 *   OPENAI_API_KEY or ANTHROPIC_API_KEY
 * Optional: OPENAI_MODEL, ANTHROPIC_MODEL
 *
 * Frontend: VITE_SUPPORT_CHAT_API_URL=/api/support-chat
 */

const SYSTEM_PROMPT = `You are Kaynos Support, the public help assistant for Kaynos (private video training software for coaches and trainers).

Rules:
- Be concise, friendly, and accurate. Use short paragraphs or bullets when it helps.
- If you do not know something about Kaynos, say so. Do not invent features, integrations, or pricing.
- For account-specific issues (billing, passwords, student data, tenant settings), tell the user to email support@kaynos.net.
- You are not allowed to ask for passwords, API keys, or payment card numbers.`;

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

/** Drop UI welcome bubbles; both APIs work better with conversation starting at real user text. */
function stripLeadingAssistants(messages) {
  const out = [...messages];
  while (out.length > 0 && out[0].role === "assistant") {
    out.shift();
  }
  return out;
}

/** Anthropic requires alternating user/assistant starting with user. */
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
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const body = {
    model,
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    max_tokens: 900,
    temperature: 0.4,
  };
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = data?.error?.message || res.statusText || "OpenAI request failed";
    throw new Error(err);
  }
  const text = data?.choices?.[0]?.message?.content;
  if (typeof text !== "string" || !text.trim()) {
    throw new Error("Empty model response");
  }
  return text.trim();
}

async function completeAnthropic(messages) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }
  const model =
    process.env.ANTHROPIC_MODEL || "claude-3-5-haiku-20241022";
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
    const err = data?.error?.message || res.statusText || "Anthropic request failed";
    throw new Error(err);
  }
  const block = data?.content?.[0];
  const text = block?.type === "text" ? block.text : "";
  if (typeof text !== "string" || !text.trim()) {
    throw new Error("Empty model response");
  }
  return text.trim();
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

  const provider = (process.env.SUPPORT_CHAT_PROVIDER || "openai").toLowerCase();

  try {
    let content;
    if (provider === "anthropic") {
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
    const message = e instanceof Error ? e.message : "Chat completion failed";
    console.error("support-chat:", message);
    return json(
      {
        error: "The assistant could not complete your request. Please try again or email support@kaynos.net.",
      },
      502
    );
  }
};

export const config = {
  path: "/api/support-chat",
};
