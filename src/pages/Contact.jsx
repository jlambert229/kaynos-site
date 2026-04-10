import { useState, useRef, useCallback } from "react";
import { SendHorizonal, Inbox } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { URLS } from "../config/urls";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_NAME = 200;
const MAX_MESSAGE = 500;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState({});
  const honeypotRef = useRef(null);

  const validate = useCallback(() => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    else if (form.name.length > MAX_NAME) errs.name = `Name must be under ${MAX_NAME} characters.`;
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email)) errs.email = "Please enter a valid email address.";
    if (!form.message.trim()) errs.message = "Message is required.";
    else if (form.message.length > MAX_MESSAGE) errs.message = `Message must be under ${MAX_MESSAGE} characters.`;
    return errs;
  }, [form]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (honeypotRef.current && honeypotRef.current.value) return;
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");
    try {
      const body = new URLSearchParams({
        "form-name": "contact",
        name: form.name.slice(0, MAX_NAME),
        email: form.email,
        message: form.message.slice(0, MAX_MESSAGE),
        website: "",
      });
      const res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
      if (!res.ok) throw new Error(res.statusText);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Seo title="Contact" description="Get in touch with the Kaynos team. Questions, feedback, partnerships - we'd love to hear from you." path="/contact" />
      <Navbar />
      <main className="contact-main container">
        <div className="contact-content">
          <span className="section-label">Contact</span>
          <h1 className="contact-title">Get in touch</h1>
          <p className="contact-lead">
            Have a question, want a walkthrough, or just want to say hi? We'd love to hear from you.
          </p>

          <div className="contact-grid">
            <div className="contact-card">
              <Inbox size={20} className="contact-card-icon" />
              <h3>Email us</h3>
              <p>For anything - questions, feedback, partnerships.</p>
              <a href={URLS.support} className="contact-link">support@kaynos.net</a>
            </div>
          </div>

          {status !== "sent" ? (
            <form className="contact-form" name="contact" data-netlify="true" netlify-honeypot="website" onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="contact" />
              <h3 className="contact-form-title">Send a message</h3>
              {status === "error" && <p className="contact-error contact-form-error">Something went wrong. Please try again or email us directly.</p>}
              {/* Honeypot - hidden from humans, bots will fill it */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
                <label htmlFor="contact-website">Website</label>
                <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" ref={honeypotRef} />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-name" className="contact-label">Name</label>
                <input
                  id="contact-name"
                  className="contact-input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={MAX_NAME}
                  required
                />
                {errors.name && <span className="contact-error">{errors.name}</span>}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email" className="contact-label">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  className="contact-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={254}
                  required
                />
                {errors.email && <span className="contact-error">{errors.email}</span>}
              </div>
              <div className="contact-field">
                <label htmlFor="contact-msg" className="contact-label">Message</label>
                <textarea
                  id="contact-msg"
                  className="contact-input contact-textarea"
                  rows={5}
                  placeholder="How can we help?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  maxLength={MAX_MESSAGE}
                  required
                />
                {errors.message && <span className="contact-error">{errors.message}</span>}
              </div>
              <button type="submit" className="btn btn-primary btn-lg contact-submit" disabled={status === "sending"}>
                <SendHorizonal size={18} /> {status === "sending" ? "Sending\u2026" : "Send Message"}
              </button>
            </form>
          ) : (
            <div className="contact-success">
              <h3>Message sent.</h3>
              <p>We'll get back to you within a day. You can also reach us at <a href={URLS.support}>support@kaynos.net</a>.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
