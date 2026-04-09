import { useState } from "react";
import { Send, Mail, MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${form.name}`);
    const body = encodeURIComponent(form.message);
    window.location.href = `mailto:support@kaynos.net?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <>
      <Seo title="Contact" description="Get in touch with the Kaynos team. Questions, feedback, partnerships — we'd love to hear from you." path="/contact" />
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
              <Mail size={20} className="contact-card-icon" />
              <h3>Email us</h3>
              <p>For anything — questions, feedback, partnerships.</p>
              <a href="mailto:support@kaynos.net" className="contact-link">support@kaynos.net</a>
            </div>
            <div className="contact-card">
              <MessageCircle size={20} className="contact-card-icon" />
              <h3>Live chat</h3>
              <p>Click the chat bubble on any page for instant answers.</p>
              <span className="contact-link">Available now</span>
            </div>
          </div>

          {!submitted ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3 className="contact-form-title">Send a message</h3>
              <div className="contact-field">
                <label htmlFor="contact-name" className="contact-label">Name</label>
                <input
                  id="contact-name"
                  className="contact-input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
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
                  required
                />
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
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg contact-submit">
                <Send size={18} /> Send via Email
              </button>
              <p className="contact-form-note">Opens your default email client with your message pre-filled.</p>
            </form>
          ) : (
            <div className="contact-success">
              <h3>Thanks for reaching out!</h3>
              <p>Your email client should have opened with the message. If not, email us directly at <a href="mailto:support@kaynos.net">support@kaynos.net</a>.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
