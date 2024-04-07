import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header role="banner" className="header" id="header">
    <div className="page__inner page__inner--header">
      <a href="./" className="header__h1-link">
        <h1>QuestRex</h1>
      </a>
      <nav role="navigation">
        <ul className="header__nav-list">
          <li className="header__nav-list-item">
            <Link to="./">About</Link>
          </li>
          <li className="header__nav-list-item">
            <a
              href="https://www.drivethrurpg.com/browse/pub/21114/EverLore-Games"
              target="_blank"
              rel="noreferrer"
            >
              Buy &amp; Free Downloads{" "}
              <span className="fas fa-new-window"></span>
            </a>
          </li>
          <li className="header__nav-list-item">
            <Link to="./character"> Character Builder</Link>
          </li>

          <li className="header__nav-list-item">
            <Link to="./talents">Talents</Link>
          </li>
          <li className="header__nav-list-item ">
            <Link to="./spells">Spells</Link>
          </li>
          <li className="header__nav-list-item ">
            <Link to="./mutations">Mutations</Link>
          </li>
          <li className="header__nav-list-item ">
            <Link to="./psionics">Psionics</Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
