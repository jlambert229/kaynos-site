import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const faqs = [
  {
    question: "How does the client credit work?",
    answer:
      "For every active client on a paid plan, you earn $10/month in recurring credit toward your coach bill. Your first 3 clients per coach are free. Once you have 5 paid clients, that's $50/month in credits, which covers your entire $49 coach plan. Annual plans get $120/year credit per client, applied when your account renews.",
  },
  {
    question: "What do clients pay?",
    answer:
      "Clients pay $49/month (or $41/month billed annually at $488/year). You send them a signup link specific to your account. The first 3 clients per coach are completely free.",
  },
  {
    question: "Can my cost really go to $0?",
    answer:
      "Yes. There's no floor. With 5 paid clients you're earning $50/month in credits against your $49 coach plan. The more clients you enroll, the less you pay.",
  },
  {
    question: "What types of coaching does this work for?",
    answer:
      "Kaynos works for any type of coaching where reviewing video helps people improve. Personal training, sports, movement, technique work - if you teach it, Kaynos fits.",
  },
  {
    question: "Do my clients need to download an app?",
    answer:
      "Nope. Everything runs in the browser. Clients just log in from their phone or computer using the link you send them.",
  },
  {
    question: "Can clients see each other's private sessions?",
    answer:
      "No. Private sessions are only visible to the assigned client, the coach, and admins. Classes are visible to everyone in your account, great for group content and shared recordings.",
  },
  {
    question: "What happens after the trial?",
    answer:
      "Coach plans continue at $49/month (or $488/year). Client plans are the same. Your client credits are applied automatically. Cancel anytime from your account. No contracts, no cancellation fees.",
  },
  {
    question: "What video formats work?",
    answer:
      "MP4, MOV, WebM, and MKV. Files up to 5 GB. You can also link Vimeo videos if you already host there.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section id="faq" className="section section--alt">
      <div className="container">
        <div className="section-header">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Questions we get a lot</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`faq-chevron${isOpen ? " open" : ""}`}
                    size={20}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  className={`faq-answer${isOpen ? " faq-answer--open" : ""}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
