import React from 'react';
import KaynosLogo from './KaynosLogo';

const footerLinks = [
  { label: 'Instructor demo', href: 'https://demo.kaynos.net', external: true },
  { label: 'Student demo', href: 'https://student.kaynos.net', external: true },
  { label: 'Privacy Policy', href: 'https://app.kaynos.net/privacy', external: true },
  { label: 'Terms of Service', href: 'https://app.kaynos.net/terms', external: true },
  { label: 'Support', href: 'mailto:support@kaynos.net', external: false },
  { label: 'Help Center', href: 'https://docs.kaynos.net', external: true },
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
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Kaynos. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
