import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What types of coaching does this work for?",
    answer:
      "Kaynos works for any type of coaching where reviewing video helps people improve. Personal training, sports, movement, technique work - if you teach it, Kaynos fits.",
  },
  {
    question: "Do my clients need to download an app?",
    answer:
      "Nope. Everything runs in the browser. Clients just log in from their phone or computer.",
  },
  {
    question: "How many people can use it?",
    answer:
      "As many as you want. There's no limit on clients or coaches.",
  },
  {
    question: "Can clients see each other's private sessions?",
    answer:
      "No. Private sessions are only visible to the assigned client, the coach, and admins. Classes are visible to everyone in your account, great for group content and shared recordings.",
  },
  {
    question: "What happens after the trial?",
    answer:
      "It continues at $49/month or $490/year if you pick the annual plan. You can cancel anytime from your account. No contracts, no cancellation fees.",
  },
  {
    question: "What video formats work?",
    answer:
      "MP4, MOV, WebM, and MKV. Files up to 5 GB. You can also link Vimeo videos if you already host there.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section section--alt">
      <div className="container">
        <div className="section-header">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Questions we get a lot</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button className="faq-question" onClick={() => toggle(index)}>
                <span>{faq.question}</span>
                <ChevronDown
                  className={`faq-chevron${openIndex === index ? " open" : ""}`}
                  size={20}
                />
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
