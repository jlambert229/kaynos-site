import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function GettingStartedLayout() {
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
      <main className="getting-started-main">
        <div className="container">
          <article className="getting-started-article">
            <Outlet />
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
