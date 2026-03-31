/**
 * @typedef {{ role: 'user' | 'assistant' | 'system'; content: string; id?: string }} ChatMessage
 * @typedef {{ messages: ChatMessage[]; sessionId: string }} SendArgs
 * @typedef {{ enabled: boolean; launcherLabel: string; panelTitle: string; assistantName: string; welcomeMessage: string; inputPlaceholder: string; sendLabel: string }} SupportChatUiConfig
 */

const API_URL = import.meta.env.VITE_SUPPORT_CHAT_API_URL;

/**
 * Returns a transport that POSTs to VITE_SUPPORT_CHAT_API_URL when set,
 * otherwise resolves with a placeholder assistant message (safe for local dev).
 * Expected JSON from API: `{ "content": "..." }` or `{ "message": "..." }`.
 * @returns {(args: SendArgs) => Promise<ChatMessage>}
 */
export function createChatTransport() {
  return async function sendToAssistant({ messages, sessionId }) {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const userText = lastUser?.content ?? "";

    if (API_URL) {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          messages: messages.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const hint =
          typeof data?.error === "string"
            ? data.error
            : `Support chat request failed (${res.status})`;
        throw new Error(hint);
      }
      const content =
        typeof data?.content === "string"
          ? data.content
          : typeof data?.message === "string"
            ? data.message
            : "";
      if (!content) {
        throw new Error("Support chat returned an empty reply");
      }
      return { role: "assistant", content };
    }

    await new Promise((r) => setTimeout(r, 650));
    const preview =
      userText.length > 280 ? `${userText.slice(0, 280)}…` : userText;
    return {
      role: "assistant",
      content: [
        "This site is using the built-in stub transport (set VITE_SUPPORT_CHAT_API_URL to connect a real backend).",
        "",
        preview ? `Your message: "${preview}"` : "(No message text.)",
        "",
        "Set VITE_SUPPORT_CHAT_API_URL=/api/support-chat and configure OPENAI_API_KEY (or Anthropic) on Netlify for live answers.",
      ].join("\n"),
    };
  };
}
