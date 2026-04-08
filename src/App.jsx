import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataUsePolicy from "./pages/DataUsePolicy";
import GettingStartedLayout from "./pages/getting-started/GettingStartedLayout";
import GettingStartedPage from "./pages/getting-started/GettingStartedPage";
import { SupportChatProvider } from "./support/SupportChatContext";
import SupportChatWidget from "./support/SupportChatWidget";
import BackToTop from "./components/BackToTop";

/** Routes + chrome (used inside any router: Browser or Memory for prerender). */
export function AppRoutes() {
  return (
    <>
      <SupportChatWidget />
      <BackToTop />
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
        <Route path="*" element={<NotFound />} />
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
