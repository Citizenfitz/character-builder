import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header role="banner" className="header" id="header">
    <div className="flex-grid  flex-grid--align-items-center">
      <a href="./" className="header__h1-link">
        <h1 className="flex-grid flex-grid--flex-start">
          <span className="header__dropcap">Q</span>
          <div>
            <span className="ut-only-sr">Q</span>uestRex
            <span className="subheader">
              &nbsp;&nbsp;&nbsp;A Classic Fantasy RPG
            </span>
          </div>
        </h1>
      </a>

      <div className="header__card-icons">
        <div className="flex-grid flex-grid--align-items-end">
          <div className="aspect-icon  aspect-icon--large aspect-icon--fighter"></div>
          <div className="aspect-icon  aspect-icon--large aspect-icon--priest"></div>
          <div className="aspect-icon  aspect-icon--large aspect-icon--wizard"></div>
          <div className="aspect-icon  aspect-icon--large aspect-icon--knave"></div>
        </div>
      </div>
    </div>

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
            Buy &amp; Free Downloads <span className="fas fa-new-window"></span>
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
  </header>
);

export default Header;
