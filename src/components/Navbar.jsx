import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import KaynosLogo from "./KaynosLogo";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Our Story", href: "#story" },
  { label: "Demos", href: "#demos" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const demoDirectLinks = [
  { label: "Instructor", href: "https://demo.kaynos.net" },
  { label: "Student", href: "https://student.kaynos.net" },
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

  const closeMobile = () => setMobileOpen(false);

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
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <KaynosLogo size="nav" />
          <span className="navbar-brand-text">kaynos</span>
        </Link>

        <div className="navbar-links">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={pathname === "/" ? href : `/${href}`}
              className="navbar-link"
              onClick={(e) => handleSectionClick(e, href)}
            >
              {label}
            </a>
          ))}
          <span className="navbar-demo-pipe" aria-hidden>
            |
          </span>
          {demoDirectLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="navbar-link navbar-link--demo"
              target="_blank"
              rel="noopener noreferrer"
              title={`Open ${label.toLowerCase()} demo in a new tab`}
            >
              {label}
            </a>
          ))}
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
        {navLinks.map(({ label, href }) => (
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
        ))}
        {demoDirectLinks.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
          >
            {label} demo
          </a>
        ))}
        <a href="https://app.kaynos.net" onClick={closeMobile}>Log In</a>
        <a href="https://app.kaynos.net/signup" className="btn btn-primary" onClick={closeMobile}>
          Start Free Trial
        </a>
      </div>
    </nav>
  );
}
