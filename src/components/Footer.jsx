import React from "react";
import KaynosLogo from "./KaynosLogo";

const footerLinks = [
  { label: "Instructor demo", href: "https://demo.kaynos.net", external: true },
  { label: "Student demo", href: "https://student.kaynos.net", external: true },
  { label: "Getting started", href: "/getting-started", external: false },
  { label: "Help Center", href: "https://docs.kaynos.net", external: true },
  { label: "Privacy Policy", href: "/privacy", external: false },
  { label: "Data Use Policy", href: "/data-use", external: false },
  { label: "Terms of Service", href: "https://app.kaynos.net/terms", external: true },
  { label: "Support", href: "mailto:support@kaynos.net", external: false },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/kaynos.net",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/kaynos.net",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/kaynos_net",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <KaynosLogo size="md" />
          <span className="footer-brand-text">kaynos</span>
        </div>

        <div className="footer-links">
          {footerLinks.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              className="footer-link"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-socials">
            {socials.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                className="footer-social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
              >
                {icon}
              </a>
            ))}
          </div>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} Kaynos. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
