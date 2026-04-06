import { Star } from "lucide-react";

function Stars({ count = 5 }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

const featured = {
  initial: "M",
  name: "Marcus Rivera",
  role: "Head Coach, Apex Training",
  quote:
    "The pricing model is genius. My clients get real video feedback tools, and with 6 of them on paid plans I'm not paying a dime for the platform. It basically sells itself.",
};

const supporting = [
  {
    initial: "S",
    name: "Sarah Chen",
    role: "Owner, Pacific Coaching",
    quote:
      "Our clients are picking things up way faster now. They watch their footage between sessions, catch stuff they missed live, and come back with way better questions.",
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
    <section id="testimonials" className="section section--alt">
      <div className="container">
        <div className="section-header">
          <span className="section-label">From our users</span>
          <h2 className="section-title">Coaches are into it</h2>
        </div>

        <div className="testimonials-layout">
          <div className="testimonial-featured">
            <Stars />
            <p className="testimonial-quote">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{featured.initial}</div>
              <div>
                <div className="testimonial-name">{featured.name}</div>
                <div className="testimonial-role">{featured.role}</div>
              </div>
            </div>
          </div>

          <div className="testimonial-supporting">
            {supporting.map((t) => (
              <div key={t.name} className="testimonial-card">
                <Stars />
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
      </div>
    </section>
  );
}
