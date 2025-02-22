import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CharacterSheet } from "./Components";
import "./style.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <main className="main" id="main">
        <Routes>
          <Route path="/" element={<CharacterSheet />} />
        </Routes>
      </main>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
