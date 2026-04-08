/**
 * @typedef {{ role: 'user' | 'assistant' | 'system'; content: string; id?: string }} ChatMessage
 * @typedef {{ messages: ChatMessage[]; sessionId: string }} SendArgs
 * @typedef {{ enabled: boolean; launcherLabel: string; panelTitle: string; assistantName: string; welcomeMessage: string; inputPlaceholder: string; sendLabel: string; quickReplies?: string[] }} SupportChatUiConfig
 */

const API_URL = import.meta.env.VITE_SUPPORT_CHAT_API_URL || "/api/support-chat";

/**
 * Returns a transport that POSTs to the support chat API.
 * Falls back to /api/support-chat (Netlify function) by default.
 */
export function createChatTransport() {
  return async function sendToAssistant({ messages, sessionId }) {
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
          : `Chat request failed (${res.status})`;
      throw new Error(hint);
    }
    const content =
      typeof data?.content === "string"
        ? data.content
        : typeof data?.message === "string"
          ? data.message
          : "";
    if (!content) {
      throw new Error("Chat returned an empty reply");
    }
    return { role: "assistant", content };
  };
}
