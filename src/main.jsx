import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
// Inter font subsets are loaded via @font-face declarations at the top of
// styles.css — limited to latin + latin-ext (English content) instead of
// the seven subsets `@fontsource-variable/inter` ships by default.
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
