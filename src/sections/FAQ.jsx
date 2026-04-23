import { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";
import { faqs } from "../data/faqs";
import { URLS } from "../config/urls";

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [search, setSearch] = useState("");
  const toggle = (question) => setOpenQuestion(openQuestion === question ? null : question);
  const headerRef = useScrollReveal();
  const listRef = useScrollReveal();

  const filtered = useMemo(() => {
    if (!search.trim()) return faqs;
    const q = search.toLowerCase();
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <section id="faq" className="section section--alt">
      <div className="container">
        <div ref={headerRef} className="reveal section-header">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Questions we get a lot</h2>
        </div>

        <div ref={listRef} className="reveal faq-list">
          <div className="faq-search-wrap">
            <Search size={16} className="faq-search-icon" aria-hidden="true" />
            <input
              type="text"
              className="faq-search"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOpenQuestion(null);
              }}
              aria-label="Filter frequently asked questions"
            />
          </div>

          {filtered.length === 0 ? (
            <p className="faq-no-results">
              No matching questions. Try a different search or{" "}
              <a href={URLS.support}>email us</a>.
            </p>
          ) : (
            filtered.map((faq, index) => {
              const isOpen = openQuestion === faq.question;
              return (
                <div key={faq.question} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => toggle(faq.question)}
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
                    className={`faq-answer${isOpen ? " faq-answer--open" : ""}`}
                  >
                    <p>
                      {faq.answer}
                      {faq.linkText && (
                        <>
                          {" "}
                          <a
                            href={faq.linkHref}
                            className="faq-inline-link"
                            {...(faq.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          >
                            {faq.linkText} &rarr;
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
