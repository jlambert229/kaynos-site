import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { createChatTransport } from "./createChatTransport";
import { supportChatUiConfig } from "./supportChatConfig";

/** @typedef {import('./createChatTransport.js').ChatMessage} ChatMessage */

const SupportChatContext = createContext(null);

function randomId() {
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function SupportChatProvider({ children, transport: transportProp }) {
  const transportRef = useRef(transportProp ?? createChatTransport());
  const inFlightRef = useRef(false);
  const [sessionId] = useState(
    () => `sess-${crypto.randomUUID?.() ?? randomId()}`
  );
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => [
    {
      id: "welcome",
      role: "assistant",
      content: supportChatUiConfig.welcomeMessage,
    },
  ]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || inFlightRef.current) return;

      const userMsg = { id: randomId(), role: "user", content: trimmed };
      inFlightRef.current = true;
      setError(null);
      setPending(true);

      let snapshot = [];
      setMessages((prev) => {
        snapshot = [...prev, userMsg];
        return snapshot;
      });

      try {
        const reply = await transportRef.current({
          messages: snapshot,
          sessionId,
        });
        setMessages((prev) => [
          ...prev,
          {
            id: randomId(),
            role: reply.role,
            content: reply.content,
          },
        ]);
      } catch (e) {
        const message = e instanceof Error ? e.message : "Something went wrong.";
        setError(message);
        setMessages((prev) => [
          ...prev,
          {
            id: randomId(),
            role: "assistant",
            content:
              "Sorry, I could not reach support right now. Please try again or email support@kaynos.net.",
          },
        ]);
      } finally {
        inFlightRef.current = false;
        setPending(false);
      }
    },
    [sessionId]
  );

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo(
    () => ({
      ui: supportChatUiConfig,
      sessionId,
      isOpen,
      setIsOpen,
      messages,
      pending,
      error,
      clearError,
      sendMessage,
    }),
    [sessionId, isOpen, messages, pending, error, clearError, sendMessage]
  );

  return (
    <SupportChatContext.Provider value={value}>
      {children}
    </SupportChatContext.Provider>
  );
}

export function useSupportChat() {
  const ctx = useContext(SupportChatContext);
  if (!ctx) {
    throw new Error("useSupportChat must be used within SupportChatProvider");
  }
  return ctx;
}
