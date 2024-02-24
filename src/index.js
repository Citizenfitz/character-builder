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
} from "./Components";
import "./style.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <main className="main" id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character" element={<CharacterSheet />} />
          <Route path="/traits" element={<PageTraits />} />
          <Route path="/mutations" element={<PageMutations />} />
          <Route path="/spells" element={<PageSpells />} />
          <Route path="/talents" element={<PageTalents />} />
          <Route path="/psionics" element={<PagePsionics />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
