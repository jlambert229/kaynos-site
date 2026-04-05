import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataUsePolicy from "./pages/DataUsePolicy";
import GettingStartedLayout from "./pages/getting-started/GettingStartedLayout";
import GettingStartedPage from "./pages/getting-started/GettingStartedPage";
import { SupportChatProvider } from "./support/SupportChatContext";
import SupportChatWidget from "./support/SupportChatWidget";

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/** Routes + chrome (used inside any router: Browser or Memory for prerender). */
export function AppRoutes() {
  useScrollReveal();
  return (
    <>
      <SupportChatWidget />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/data-use" element={<DataUsePolicy />} />
        <Route path="/getting-started" element={<GettingStartedLayout />}>
          <Route index element={<GettingStartedPage />} />
        </Route>
        <Route path="/docs" element={<Navigate to="/getting-started" replace />} />
        <Route
          path="/docs/getting-started"
          element={<Navigate to="/getting-started" replace />}
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SupportChatProvider>
        <AppRoutes />
      </SupportChatProvider>
    </BrowserRouter>
  );
}
