import { Outlet } from "react-router-dom";
import Seo from "../../components/Seo";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function GettingStartedLayout() {
  return (
    <>
      <Seo
        title="Getting started"
        description="Sign up, upload a video, add coach notes, invite your team. Quick checklist for Kaynos at app.kaynos.net; full guides in the Help Center."
        path="/getting-started"
      />
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
