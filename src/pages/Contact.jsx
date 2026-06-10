import { useState, useRef, useEffect } from "react";
import { SendHorizonal, Inbox } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { contactJsonLd } from "../seo/contactJsonLd";
import { URLS } from "../config/urls";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_NAME = 200;
const MAX_MESSAGE = 500;

// Cap the submit at 15s so a hung Netlify response can't strand the button
// in "Sending…" forever. Matches the Newsletter form's pattern.
const SUBMIT_TIMEOUT_MS = 15_000;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errors, setErrors] = useState({});
  const honeypotRef = useRef(null);
  const cooldownTimer = useRef(null);

  useEffect(() => () => clearTimeout(cooldownTimer.current), []);

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    else if (form.name.length > MAX_NAME) errs.name = `Name must be under ${MAX_NAME} characters.`;
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email)) errs.email = "Please enter a valid email address.";
    if (!form.message.trim()) errs.message = "Message is required.";
    else if (form.message.length > MAX_MESSAGE) errs.message = `Message must be under ${MAX_MESSAGE} characters.`;
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (honeypotRef.current && honeypotRef.current.value) return;
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Tell screen-reader users validation failed by moving focus to the
      // first invalid field (aria-describedby reads its error message).
      const firstInvalid = errs.name ? "contact-name" : errs.email ? "contact-email" : "contact-msg";
      requestAnimationFrame(() => document.getElementById(firstInvalid)?.focus());
      return;
    }
    setErrors({});
    setStatus("submitting");
    const controller = new AbortController();
    const abortTimer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
    try {
      const formData = new FormData(e.target);
      const res = await fetch("/", { method: "POST", body: formData, signal: controller.signal });
      if (!res.ok) throw new Error(res.statusText || `HTTP ${res.status}`);
      window.plausible?.("Contact Submit");
      setStatus("success");
      cooldownTimer.current = setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("[contact] submission failed:", err);
      window.plausible?.("Contact Submit Error", {
        props: { reason: err?.message?.slice(0, 80) || "unknown" },
      });
      setStatus("error");
    } finally {
      clearTimeout(abortTimer);
    }
  }

  return (
    <>
      <Seo title="Contact" description="Questions, feedback, walkthroughs — send them over. I read everything and usually reply the same day." path="/contact" jsonLd={contactJsonLd} />
      <Navbar />
      <main id="main-content" className="contact-main container">
        <div className="contact-content">
          <span className="section-label">Contact</span>
          <h1 className="contact-title">Get in touch</h1>
          <p className="contact-lead">
            Questions, feedback, or a walkthrough — send it over. I read
            everything and usually reply the same day.
          </p>

          <div className="contact-grid">
            <div className="contact-card">
              <Inbox size={20} className="contact-card-icon" aria-hidden="true" />
              <h2>Email</h2>
              <p>For anything at all.</p>
              <a href={URLS.support} className="contact-link">support@kaynos.net</a>
            </div>
          </div>

          {status !== "success" ? (
            <form className="contact-form" name="contact" method="post" data-netlify="true" data-netlify-honeypot="phone_ext" onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="contact" />
              <h2 className="contact-form-title">Send a message</h2>
              {/* Live region stays mounted (regions that appear with their
                  message already inside are skipped by many screen readers);
                  the padded-box styling only applies when there's content. */}
              <div className={status === "error" ? "contact-error contact-form-error" : undefined} role="alert">
                {status === "error" ? "Something went wrong on my end. Try again or just email support@kaynos.net directly." : null}
              </div>
              {/* Honeypot - hidden from humans, bots will fill it */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
                <label htmlFor="contact-phone-ext">Phone ext</label>
                <input id="contact-phone-ext" type="text" name="phone_ext" tabIndex={-1} autoComplete="off" ref={honeypotRef} />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-name" className="contact-label">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  className="contact-input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={MAX_NAME}
                  required
                  autoComplete="name"
                  autoCapitalize="words"
                  inputMode="text"
                  aria-invalid={errors.name ? "true" : undefined}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                {errors.name && <span id="contact-name-error" className="contact-error">{errors.name}</span>}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email" className="contact-label">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="contact-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={254}
                  required
                  autoComplete="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  inputMode="email"
                  aria-invalid={errors.email ? "true" : undefined}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                {errors.email && <span id="contact-email-error" className="contact-error">{errors.email}</span>}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-msg" className="contact-label">Message</label>
                <textarea
                  id="contact-msg"
                  name="message"
                  className="contact-input contact-textarea"
                  rows={5}
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  maxLength={MAX_MESSAGE}
                  required
                  autoCapitalize="sentences"
                  enterKeyHint="send"
                  aria-invalid={errors.message ? "true" : undefined}
                  aria-describedby={errors.message ? "contact-msg-error" : undefined}
                />
                {errors.message && <span id="contact-msg-error" className="contact-error">{errors.message}</span>}
              </div>
              <button type="submit" className="btn btn-primary btn-lg contact-submit" disabled={status === "submitting"}>
                <SendHorizonal size={18} aria-hidden="true" /> {status === "submitting" ? "Sending\u2026" : "Send Message"}
              </button>
              <p className="contact-privacy-link">
                By submitting, you agree to our <a href="/privacy">Privacy Policy</a>.
              </p>
            </form>
          ) : (
            <div className="contact-success" role="status" aria-live="polite">
              <h2>Got it.</h2>
              <p>I&apos;ll get back to you the same day. If you need me sooner, <a href={URLS.support}>support@kaynos.net</a> goes to the same inbox.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
