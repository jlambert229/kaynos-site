import { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";

export const faqs = [
  {
    question: "How does the client credit work?",
    answer: "Your first 3 clients are free. After that, each paid client earns you $10/month in credit toward your bill. At 8 total clients (5 paid), your credits cover the full $49/month. Annual plans earn $120/year per paid client instead.",
    linkText: "Try the calculator",
    linkHref: "#calculator",
  },
  {
    question: "What do clients pay?",
    answer: "Clients pay $49/month through a signup link you send them. Your first 3 clients are free. Annual billing saves 17%.",
    linkText: "See pricing details",
    linkHref: "#pricing",
  },
  {
    question: "Can my cost really go to $0?",
    answer: "Yes. At 5 paid clients (8 total, since your first 3 are free), your $50/month in credits covers the $49 coach plan.",
    linkText: "See the math",
    linkHref: "#calculator",
  },
  {
    question: "What types of coaching does this work for?",
    answer: "Any coaching where reviewing video helps. Personal training, martial arts, music lessons, sports technique — if you film it, Kaynos works.",
    linkText: "See use cases",
    linkHref: "#use-cases",
  },
  {
    question: "Do my clients need to download an app?",
    answer: "Nope. Everything runs in the browser. Clients just log in from their phone or computer using the link you send them.",
    linkText: "Try the client demo",
    linkHref: "https://client.kaynos.net",
    external: true,
  },
  {
    question: "Can clients see each other's private sessions?",
    answer: "No. Private sessions are only visible to the assigned client, the coach, and admins. Classes are visible to everyone in your account, great for group content and shared recordings.",
  },
  {
    question: "What happens after the trial?",
    answer: "Your coach plan continues at $49/month (or $488/year). Credits from paid clients are applied automatically each billing cycle. Cancel anytime from your account. No contracts, no cancellation fees.",
    linkText: "Start free trial",
    linkHref: "https://app.kaynos.net/signup",
    external: true,
  },
  {
    question: "What video formats work?",
    answer: "MP4, MOV, WebM, and MKV. Files up to 5 GB. You can also link Vimeo videos if you already host there.",
    linkText: "Try the coach demo",
    linkHref: "https://demo.kaynos.net",
    external: true,
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);
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
              placeholder="Search questions…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOpenIndex(null);
              }}
              aria-label="Filter frequently asked questions"
            />
          </div>

          {filtered.length === 0 ? (
            <p className="faq-no-results">
              No matching questions. Try a different search or{" "}
              <a href="mailto:support@kaynos.net">email us</a>.
            </p>
          ) : (
            filtered.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className="faq-item">
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
