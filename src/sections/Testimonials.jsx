import React from 'react';

const testimonials = [
  {
    initial: 'M',
    name: 'Marcus Rivera',
    role: 'Head Instructor, Apex BJJ',
    quote:
      'Video review completely transformed how we develop students. Being able to break down rolls frame by frame and leave timestamped notes means our feedback carries over between classes. Students show up already knowing what to work on.',
  },
  {
    initial: 'S',
    name: 'Sarah Chen',
    role: 'Owner, Pacific Martial Arts',
    quote:
      'Our students are progressing noticeably faster since we started using Kaynos. They review footage between classes on their own, catch details they missed in the moment, and come back with better questions. It closed the gap between mat time and retention.',
  },
  {
    initial: 'J',
    name: 'James Okafor',
    role: 'Coach, Ironside Wrestling',
    quote:
      'I was worried about getting my older coaches on board with another platform, but Kaynos is dead simple. Upload, tag, share. Even the guys who still use flip phones for everything had it figured out in five minutes.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
      <div className="section-header">
        <span className="section-label">Trusted by Schools</span>
        <h2 className="section-title">What coaches are saying</h2>
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
