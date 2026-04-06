import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import KaynosLogo from "./KaynosLogo";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Demos", href: "#demos" },
];

function scrollToHash(hash) {
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    return true;
  }
  return false;
}

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const menu = document.querySelector('.mobile-menu.open');
    if (!menu) return;
    const focusable = menu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
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
    first.focus();
    return () => {
      menu.removeEventListener('keydown', trap);
      window.removeEventListener('keydown', onEsc);
    };
  }, [mobileOpen]);

  const handleSectionClick = useCallback(
    (e, hash) => {
      e.preventDefault();
      if (pathname === "/") {
        scrollToHash(hash);
      } else {
        navigate("/" + hash);
        requestAnimationFrame(() => {
          setTimeout(() => scrollToHash(hash), 100);
        });
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
          {navLinks.map(({ label, href, external }) =>
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
          <a href="https://app.kaynos.net" className="nav-login">
            Log In
          </a>
          <a href="https://app.kaynos.net/signup" className="btn btn-primary">
            Start Free Trial
          </a>
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        <button className="mobile-close" onClick={closeMobile} aria-label="Close menu">
          <X size={24} />
        </button>
        {navLinks.map(({ label, href, external }) =>
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
        <a href="https://app.kaynos.net" onClick={closeMobile}>Log In</a>
        <a href="https://app.kaynos.net/signup" className="btn btn-primary" onClick={closeMobile}>
          Start Free Trial
        </a>
      </div>
    </nav>
  );
}
