import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./Style/Style.css";
import { LangProvider } from "./context/LanguageContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
);
