import { Outlet } from "react-router-dom";
import Seo from "../../components/Seo";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function GettingStartedLayout() {
  return (
    <>
      <Seo
        title="Getting started"
        description="Start using Kaynos for your school: create an account, upload class footage, add coach notes on the timeline, and invite students to review sessions at app.kaynos.net."
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
