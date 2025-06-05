import React from "react";
import { createRoot } from "react-dom/client";
import { CharacterSheet } from "./Components";
import "./style.css";

const QuestRexCharBuilder = ({ containerId }) => {
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

// Function to initialize the character builder
window.initQuestRexCharBuilder = (containerId) => {
  const container = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <QuestRexCharBuilder containerId={containerId} />
      </React.StrictMode>
    );
  }
};

// Auto-mount in development mode
if (process.env.NODE_ENV === "development") {
  const rootElement = document.getElementById("questrex-root");
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <QuestRexCharBuilder containerId="questrex-root" />
      </React.StrictMode>
    );
  } else {
    // Create root element if it doesn't exist
    const root = document.createElement("div");
    root.id = "questrex-root";
    root.className = "questrex-root";
    document.body.appendChild(root);
    const reactRoot = createRoot(root);
    reactRoot.render(
      <React.StrictMode>
        <QuestRexCharBuilder containerId="questrex-root" />
      </React.StrictMode>
    );
  }
}
