import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DataUsePolicy from "./pages/DataUsePolicy";
import DocsLayout from "./pages/docs/DocsLayout";
import DocsIntro from "./pages/docs/DocsIntro";
import DocsGettingStarted from "./pages/docs/DocsGettingStarted";
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
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<DocsIntro />} />
            <Route path="getting-started" element={<DocsGettingStarted />} />
          </Route>
        </Routes>
      </SupportChatProvider>
    </BrowserRouter>
  );
}
