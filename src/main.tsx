import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.tsx";
import "./styles/components.css";
import { SignalBoardProvider } from "./context/SignalBoardContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SignalBoardProvider>
      <App />
    </SignalBoardProvider>
  </StrictMode>,
);
