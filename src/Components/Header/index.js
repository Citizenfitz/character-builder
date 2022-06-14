import React from "react";

const Header = () => (
  <header role="banner" className="header" id="header">
    <div className="flex-grid  flex-grid--align-items-center">
      <a href="./" className="header__h1-link">
        <h1 className="flex-grid flex-grid--flex-start">
          <span className="header__dropcap">E</span>
          <div>
            <span className="ut-only-sr">E</span>verLore
            <span className="subheader">A Classic Fantasy RPG</span>
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
          <a href="./"> About </a>
        </li>
        <li className="header__nav-list-item">
          <a
            href="https://www.drivethrurpg.com/browse/pub/21114/EverLore-Games"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Buy & Free Downloads <span className="fas fa-new-window"></span>
          </a>
        </li>
        <li className="header__nav-list-item">
          <a href="./character"> Character Builder </a>
        </li>

        <li className="header__nav-list-item ut-hidden">
          <a href="./traits"> Character Traits </a>
        </li>

        <li className="header__nav-list-item ut-hidden">
          <a href="#"> Coming Soon </a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
