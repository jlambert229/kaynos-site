import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="This page doesn't exist." path="/404" />
      <Navbar />
      <main id="main-content" className="not-found-main">
        <div className="container">
          <div className="not-found-content">
            <span className="not-found-code">404</span>
            <h1 className="not-found-title">Page not found</h1>
            <p className="not-found-description">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn btn-primary">
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
