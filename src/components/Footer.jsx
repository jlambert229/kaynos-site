import KaynosLogo from "./KaynosLogo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Coach Demo", href: "https://demo.kaynos.net", external: true },
      { label: "Client Demo", href: "https://client.kaynos.net", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Getting Started", href: "/getting-started" },
      { label: "Changelog", href: "/changelog" },
      { label: "Contact", href: "/contact" },
      { label: "Help Center", href: "https://docs.kaynos.net", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Data Use Policy", href: "/data-use" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Terms of Service", href: "https://app.kaynos.net/terms", external: true },
    ],
  },
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
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <KaynosLogo size="md" />
              <span>kaynos</span>
            </div>
            <p className="footer-tagline">
              Keep your clients improving between sessions.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <div className="footer-col-links">
                {col.links.map(({ label, href, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
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
