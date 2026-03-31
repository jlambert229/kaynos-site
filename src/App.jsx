import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataUsePolicy from "./pages/DataUsePolicy";
import DocsLayout from "./pages/docs/DocsLayout";
import GettingStartedPage from "./pages/getting-started/GettingStartedPage";
import { SupportChatProvider } from "./support/SupportChatContext";
import SupportChatWidget from "./support/SupportChatWidget";

export default function App() {
  return (
    <BrowserRouter>
      <SupportChatProvider>
        <SupportChatWidget />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/data-use" element={<DataUsePolicy />} />
          <Route path="/getting-started" element={<DocsLayout />}>
            <Route index element={<GettingStartedPage />} />
          </Route>
          <Route path="/docs" element={<Navigate to="/getting-started" replace />} />
          <Route
            path="/docs/getting-started"
            element={<Navigate to="/getting-started" replace />}
          />
        </Routes>
      </SupportChatProvider>
    </BrowserRouter>
  );
}
