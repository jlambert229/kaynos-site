import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const faqs = [
  {
    question: "How does the client credit work?",
    answer:
      "Your first 3 clients are free. After that, every paid client earns you $10/month in recurring credit toward your coach bill. With 8 total clients (5 of them paid), that's $50/month in credits against your $50 coach plan. Annual plans earn $120/year per paid client, applied when your account renews.",
  },
  {
    question: "What do clients pay?",
    answer:
      "Clients pay $50/month via a signup link you send them. Your first 3 clients per coach are completely free. Annual billing saves them 17%.",
  },
  {
    question: "Can my cost really go to $0?",
    answer:
      "Yes. There is no floor on your coach bill. Once you have 5 paid clients (8 total, since your first 3 are free), your $50/month in credits covers the $50 coach plan entirely.",
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
      "Your coach plan continues at $50/month (or $498/year). Credits from paid clients are applied automatically each billing cycle. Cancel anytime from your account. No contracts, no cancellation fees.",
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
