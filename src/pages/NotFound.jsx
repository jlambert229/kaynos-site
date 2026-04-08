import { Link } from "react-router-dom";
import { Search, ArrowLeft, MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";

const suggestions = [
  { label: "Home", to: "/", desc: "Back to the main page" },
  { label: "Pricing", to: "/#pricing", desc: "Plans and credit system" },
  { label: "Getting Started", to: "/getting-started", desc: "Setup guide" },
  { label: "Contact", to: "/contact", desc: "Get in touch" },
];

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
              The page you're looking for doesn't exist or has been moved. Here are some helpful links:
            </p>
            <div className="not-found-links">
              {suggestions.map((s) => (
                <Link key={s.to} to={s.to} className="not-found-link-card">
                  <span className="not-found-link-label">{s.label}</span>
                  <span className="not-found-link-desc">{s.desc}</span>
                </Link>
              ))}
            </div>
            <div className="not-found-actions">
              <Link to="/" className="btn btn-primary">
                <ArrowLeft size={16} /> Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
