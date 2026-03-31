import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function DocsLayout() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Getting started | Kaynos";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="docs-main">
        <div className="container docs-layout docs-layout--single">
          <article className="docs-article">
            <Outlet />
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
