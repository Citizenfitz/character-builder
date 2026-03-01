import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { CharacterSheet } from "./Components";
import { store } from "./store";
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
      <Provider store={store}>
        <QuestRexCharBuilder containerId="questrex-root" />
      </Provider>
    </React.StrictMode>
  );
}
