import React from "react";

const testimonials = [
  {
    initial: "M",
    name: "Marcus Rivera",
    role: "Head Coach, Apex Training",
    quote:
      "Video review changed everything for us. Being able to break down a session and leave notes at the exact right moment means clients show up already knowing what to work on. Huge time saver.",
  },
  {
    initial: "S",
    name: "Sarah Chen",
    role: "Owner, Pacific Coaching",
    quote:
      "Our students are picking things up way faster now. They watch their footage between classes, catch stuff they missed live, and come back with way better questions. It just works.",
  },
  {
    initial: "J",
    name: "James Okafor",
    role: "Coach, Ironside Athletics",
    quote:
      "I was worried my older coaches wouldn't want to learn another app, but Kaynos is so simple it wasn't even an issue. Upload, tag, share. Done.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">From our users</span>
          <h2 className="section-title">Coaches are into it</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card">
              <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initial}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
