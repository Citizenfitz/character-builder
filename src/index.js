import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Header, CharacterSheet, HomePage } from "./Components";
import "./style.css";

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <main id="main">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character" element={<CharacterSheet />} />
        </Routes>
      </BrowserRouter>
    </main>
    <Footer />
  </React.StrictMode>,
  document.getElementById("root")
);
