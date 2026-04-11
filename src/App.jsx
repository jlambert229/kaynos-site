import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataUsePolicy from "./pages/DataUsePolicy";
import GettingStartedLayout from "./pages/getting-started/GettingStartedLayout";
import GettingStartedPage from "./pages/getting-started/GettingStartedPage";
import Contact from "./pages/Contact";
import Changelog from "./pages/Changelog";
import Accessibility from "./pages/Accessibility";
import ForStudents from "./pages/ForStudents";
const ForCoaches = lazy(() => import("./pages/ForCoaches"));
import Security from "./pages/Security";
import Processors from "./pages/Processors";
import Terms from "./pages/Terms";
import About from "./pages/About";
import BackToTop from "./components/BackToTop";


/** Routes + chrome (used inside any router: Browser or Memory for prerender). */
export function AppRoutes() {
  return (
    <>
      <BackToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/data-use" element={<DataUsePolicy />} />
        <Route path="/getting-started" element={<GettingStartedLayout />}>
          <Route index element={<GettingStartedPage />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/for/students" element={<ForStudents />} />
        <Route path="/for/coaches" element={<Suspense fallback={null}><ForCoaches /></Suspense>} />
        <Route path="/security" element={<Security />} />
        <Route path="/processors" element={<Processors />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/docs" element={<Navigate to="/getting-started" replace />} />
        <Route
          path="/docs/getting-started"
          element={<Navigate to="/getting-started" replace />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
