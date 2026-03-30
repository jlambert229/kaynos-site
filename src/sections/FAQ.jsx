import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What martial arts does Kaynos work for?',
    answer:
      'Kaynos is built with BJJ in mind, but works for any discipline that benefits from video review \u2014 wrestling, judo, MMA, Muay Thai, and more.',
  },
  {
    question: 'Do I need to install anything?',
    answer:
      'No. Kaynos runs entirely in your browser. Students and instructors just need a web browser on any device.',
  },
  {
    question: 'How many people can use my account?',
    answer:
      'There is no limit. Add as many instructors and students as your school needs.',
  },
  {
    question: "Can students see each other's private sessions?",
    answer:
      'No. Private sessions are only visible to the assigned student, the instructor, and school admins. Classes are shared with everyone.',
  },
  {
    question: 'What happens after the free trial?',
    answer:
      'Your plan continues at $49/month. You can cancel anytime from your account or by contacting support. No long-term contracts.',
  },
  {
    question: 'How do I get my videos into Kaynos?',
    answer:
      'Upload directly from your browser \u2014 drag and drop, or browse your files. We support MP4, MOV, WebM, and MKV up to 5 GB per video. You can also link Vimeo videos.',
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
          <h2 className="section-title">Common questions</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button className="faq-question" onClick={() => toggle(index)}>
                <span>{faq.question}</span>
                <ChevronDown
                  className={`faq-chevron${openIndex === index ? ' open' : ''}`}
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
