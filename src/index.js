import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Footer,
  Header,
  CharacterSheet,
  HomePage,
  PageTraits,
  PageMutations,
  PageSpells,
  PageTalents,
  PagePsionics,
  PageMonsters,
} from "./Components";
import "./style.css";

const QuestRexCharBuilder = ({ containerId }) => {
  return (
    <div id="questrex-char-builder-root">
      {/* Dice box container */}
      <div id="dice-box" />

      <main className="main" id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character" element={<CharacterSheet />} />
          <Route path="/traits" element={<PageTraits />} />
          <Route path="/mutations" element={<PageMutations />} />
          <Route path="/spells" element={<PageSpells />} />
          <Route path="/talents" element={<PageTalents />} />
          <Route path="/psionics" element={<PagePsionics />} />
          <Route path="/monsters" element={<PageMonsters />} />
        </Routes>
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
      <QuestRexCharBuilder containerId="questrex-root" />
    </React.StrictMode>
  );
}
