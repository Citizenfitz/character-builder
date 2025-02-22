import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CharacterSheet } from "./Components";
import "./style.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <main className="main" id="main">
        <div id="char-app" className="char-app-container">
          <Routes>
            <Route path="/" element={<CharacterSheet />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
