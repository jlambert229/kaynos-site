import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import ForCoaches from "./pages/ForCoaches";
import Security from "./pages/Security";
import Processors from "./pages/Processors";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Status from "./pages/Status";
import BackToTop from "./components/BackToTop";
import ErrorBoundary from "./components/ErrorBoundary";

/** Remove the build-time head tags once the client app has rendered its own.
 *  prerender.jsx stamps every prerendered meta/link/JSON-LD tag with
 *  data-prerendered; React 19 hoists Helmet's client copies into <head>
 *  during the first commit (before effects), so by the time this runs the
 *  stamped originals are pure duplicates. Without JS this never runs and
 *  crawlers keep the prerendered tags. */
function PrerenderedHeadCleanup() {
  useEffect(() => {
    document.head
      .querySelectorAll("[data-prerendered]")
      .forEach((el) => el.remove());
  }, []);
  return null;
}

/** Reset scroll position and move focus to the page's main landmark when the
 *  route changes. Without this, navigating from the bottom of a long page
 *  lands mid-page on the new route with focus stranded on the removed link.
 *  Hash navigations (e.g. /#pricing) are left to the Navbar's hash scrolling. */
function RouteChangeReset() {
  const { pathname, hash } = useLocation();
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (hash) return;
    window.scrollTo(0, 0);
    const main = document.getElementById("main-content");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return null;
}

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
        <Route path="/for/coaches" element={<ForCoaches />} />
        <Route path="/security" element={<Security />} />
        <Route path="/processors" element={<Processors />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/status" element={<Status />} />
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
    // Root boundary: pages outside Home's per-section boundaries (and the
    // chrome itself) otherwise blank the whole app on a render crash.
    // prerender.jsx deliberately renders AppRoutes without it so build-time
    // errors fail the build instead of prerendering the fallback.
    <ErrorBoundary>
      <BrowserRouter>
        <PrerenderedHeadCleanup />
        <RouteChangeReset />
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
