import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import PageAbout from "./Components/PageAbout";
import PageProducts from "./Components/PageProducts";
import PageSpells from "./Components/PageSpells";
import "./styles/style.scss";

const App = () => {
  return (
    <div className="root">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<PageAbout />} />
          <Route path="/products" element={<PageProducts />} />
          <Route path="/spells" element={<PageSpells />} />
        </Routes>
      </main>
      <footer className="footer">{/* Footer content */}</footer>
    </div>
  );
};

export default App;
