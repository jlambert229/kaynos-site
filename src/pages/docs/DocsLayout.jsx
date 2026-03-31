import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const DOC_NAV = [
  { to: "/docs", label: "Introduction", end: true },
  { to: "/docs/getting-started", label: "Getting started" },
];

export default function DocsLayout() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Documentation | Kaynos";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="docs-main">
        <div className="container docs-layout">
          <aside className="docs-sidebar" aria-label="Documentation sections">
            <nav className="docs-nav">
              {DOC_NAV.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `docs-nav-link${isActive ? " docs-nav-link--active" : ""}`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </aside>
          <article className="docs-article">
            <Outlet />
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
