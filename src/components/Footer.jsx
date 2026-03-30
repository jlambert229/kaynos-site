import React from 'react';
import KaynosLogo from './KaynosLogo';

const footerLinks = [
  { label: 'Privacy Policy', href: 'https://app.kaynos.net/privacy' },
  { label: 'Terms of Service', href: 'https://app.kaynos.net/terms' },
  { label: 'Support', href: 'mailto:support@kaynos.net' },
  { label: 'Help Center', href: 'https://docs.kaynos.net' },
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
          {footerLinks.map(({ label, href }) => (
            <a key={label} href={href} className="footer-link">
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
