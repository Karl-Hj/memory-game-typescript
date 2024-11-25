import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameDisplay } from "./GameDisplay";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameDisplay />
  </StrictMode>
);
