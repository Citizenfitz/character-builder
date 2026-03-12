import React from "react";
import { createRoot } from "react-dom/client";
import { CharacterProvider } from "./context/CharacterContext";
import { CharacterSheet } from "./Components";
import "./style.css";

interface QuestRexCharBuilderProps {
  containerId?: string;
}

const QuestRexCharBuilder = ({ containerId }: QuestRexCharBuilderProps) => {
  return (
    <div id="questrex-char-builder-root">
      {/* Dice box container */}
      <div id="dice-box" />

      <main className="main" id="main">
        <div id="char-app" className="char-app-container">
          <CharacterSheet />
        </div>
      </main>

      {/* Portal container for modals */}
      <div id="questrex-modal-container" style={{ position: "relative" }} />
    </div>
  );
};

const container = document.getElementById("questrex-root");

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <CharacterProvider>
        <QuestRexCharBuilder containerId="questrex-root" />
      </CharacterProvider>
    </React.StrictMode>,
  );
}
