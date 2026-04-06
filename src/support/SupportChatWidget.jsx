import { useEffect, useId, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useSupportChat } from "./SupportChatContext";

export default function SupportChatWidget() {
  const titleId = useId();
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const endRef = useRef(null);
  const {
    ui,
    isOpen,
    setIsOpen,
    messages,
    pending,
    error,
    clearError,
    sendMessage,
  } = useSupportChat();

  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, pending]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;
    const getFocusable = () => panel.querySelectorAll('button, textarea, a, [tabindex]:not([tabindex="-1"])');
    const trap = (e) => {
      if (e.key !== 'Tab') return;
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    panel.addEventListener('keydown', trap);
    return () => panel.removeEventListener('keydown', trap);
  }, [isOpen]);

  if (!ui.enabled) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!draft.trim() || pending) return;
    sendMessage(draft);
    setDraft("");
  }

  return (
    <div className="support-chat-root">
      {!isOpen ? (
        <button
          type="button"
          className="support-chat-launcher"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={false}
          aria-label={ui.launcherLabel}
        >
          <MessageCircle size={26} strokeWidth={2} aria-hidden />
        </button>
      ) : (
        <div
          ref={panelRef}
          className="support-chat-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <header className="support-chat-header">
            <h2 id={titleId} className="support-chat-title">
              {ui.panelTitle}
            </h2>
            <button
              type="button"
              className="support-chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close support chat"
            >
              <X size={20} aria-hidden />
            </button>
          </header>

          {error ? (
            <div className="support-chat-banner" role="status">
              <span>{error}</span>
              <button type="button" onClick={clearError} className="support-chat-banner-dismiss">
                Dismiss
              </button>
            </div>
          ) : null}

          <div className="support-chat-messages" role="log" aria-live="polite" aria-relevant="additions">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user"
                    ? "support-chat-bubble support-chat-bubble--user"
                    : "support-chat-bubble support-chat-bubble--assistant"
                }
              >
                {m.role === "assistant" ? (
                  <span className="support-chat-bubble-meta">{ui.assistantName}</span>
                ) : null}
                <div className="support-chat-bubble-text">{m.content}</div>
              </div>
            ))}
            {pending ? (
              <div className="support-chat-bubble support-chat-bubble--assistant support-chat-bubble--typing">
                <span className="support-chat-typing-dot" />
                <span className="support-chat-typing-dot" />
                <span className="support-chat-typing-dot" />
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <form className="support-chat-form" onSubmit={handleSubmit}>
            <label htmlFor="support-chat-input" className="visually-hidden">
              Message
            </label>
            <textarea
              id="support-chat-input"
              ref={inputRef}
              className="support-chat-input"
              rows={2}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={ui.inputPlaceholder}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              disabled={pending}
            />
            <button
              type="submit"
              className="support-chat-send btn btn-primary"
              disabled={pending || !draft.trim()}
              aria-label={ui.sendLabel}
            >
              <Send size={18} aria-hidden />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
