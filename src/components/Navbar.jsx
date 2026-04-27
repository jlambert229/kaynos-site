import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import KaynosLogo from "./KaynosLogo";
import { URLS } from "../config/urls";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Demos", href: "#demos" },
  { label: "For Coaches", href: "/for/coaches", page: true },
  { label: "Contact", href: "/contact", page: true },
];

function scrollToHash(hash) {
  const el = document.querySelector(hash);
  if (el) {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
    return true;
  }
  return false;
}

export default function Navbar() {
  const location = useLocation();
  const { pathname, hash } = location;
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // When the route changes to a path with a hash, scroll to the anchor after React has
  // rendered the destination page. Replaces a brittle rAF + setTimeout(100) hack.
  useEffect(() => {
    if (hash) scrollToHash(hash);
  }, [pathname, hash]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const menu = mobileMenuRef.current;
    if (!menu) return;
    const focusable = menu.querySelectorAll('a, button');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const onEsc = (e) => { if (e.key === 'Escape') closeMobile(); };
    menu.addEventListener('keydown', trap);
    window.addEventListener('keydown', onEsc);
    requestAnimationFrame(() => first?.focus());
    return () => {
      menu.removeEventListener('keydown', trap);
      window.removeEventListener('keydown', onEsc);
    };
  }, [mobileOpen, closeMobile]);

  const handleSectionClick = useCallback(
    (e, targetHash) => {
      e.preventDefault();
      if (pathname === "/") {
        scrollToHash(targetHash);
      } else {
        // Navigate to the home page at the anchor; the effect on [pathname, hash]
        // will scroll once React renders the destination.
        navigate("/" + targetHash);
      }
    },
    [pathname, navigate]
  );

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <KaynosLogo size="nav" />
          <span className="navbar-brand-text">kaynos</span>
        </Link>

        <div className="navbar-links">
          {navLinks.map(({ label, href, external, page }) =>
            external ? (
              <a
                key={href}
                href={href}
                className="navbar-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            ) : page ? (
              <Link
                key={href}
                to={href}
                className="navbar-link"
              >
                {label}
              </Link>
            ) : (
              <a
                key={href}
                href={pathname === "/" ? href : `/${href}`}
                className="navbar-link"
                onClick={(e) => handleSectionClick(e, href)}
              >
                {label}
              </a>
            )
          )}
        </div>

        <div className="navbar-cta">
          <a href={URLS.login} className="nav-login">
            Log In
          </a>
          <a href={URLS.signup} className="btn btn-primary">
            Start 14-Day Trial
          </a>
        </div>

        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div id="mobile-menu" ref={mobileMenuRef} className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        <button type="button" className="mobile-close" onClick={closeMobile} aria-label="Close menu">
          <X size={24} />
        </button>
        {navLinks.map(({ label, href, external, page }) =>
          external ? (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
            >
              {label}
            </a>
          ) : page ? (
            <Link
              key={href}
              to={href}
              onClick={closeMobile}
            >
              {label}
            </Link>
          ) : (
            <a
              key={href}
              href={pathname === "/" ? href : `/${href}`}
              onClick={(e) => {
                handleSectionClick(e, href);
                closeMobile();
              }}
            >
              {label}
            </a>
          )
        )}
        <a href={URLS.login} onClick={closeMobile}>Log In</a>
        <a href={URLS.signup} className="btn btn-primary" onClick={closeMobile}>
          Start 14-Day Trial
        </a>
      </div>
    </nav>
  );
}
