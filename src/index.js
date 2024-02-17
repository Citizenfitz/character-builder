import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Footer,
  Header,
  CharacterSheet,
  HomePage,
  Traits,
  PageMutations,
} from "./Components";
import "./style.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character" element={<CharacterSheet />} />
          <Route path="/traits" element={<Traits />} />
          <Route path="/mutations" element={<PageMutations />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
