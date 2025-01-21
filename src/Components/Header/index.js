import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header role="banner" className="header" id="header">
      <div className="flex-grid  flex-grid--align-items-center">
        <NavLink to="/" className="header__h1-link">
          <h1 className="flex-grid flex-grid--flex-start">
            <span className="header__dropcap">Q</span>
            <div>
              <span className="ut-only-sr">Q</span>uestRex
              <span className="subheader">
                &nbsp;&nbsp;&nbsp;A Classic Fantasy RPG
              </span>
            </div>
          </h1>
        </NavLink>
      </div>

      <button
        className="header__menu-button"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="fas fa-bars fa-menu"></span>
      </button>

      <nav
        role="navigation"
        className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}
      >
        <ul className="header__nav-list">
          <li className="header__nav-list-item">
            <NavLink to="/about" onClick={toggleMenu}>
              About
            </NavLink>
          </li>
          <li className="header__nav-list-item">
            <NavLink to="/products" onClick={toggleMenu}>
              Products
            </NavLink>
          </li>
          <li className="header__nav-list-item">
            <NavLink to="/character" onClick={toggleMenu}>
              Character Builder
            </NavLink>
          </li>
          <li className="header__nav-list-item">
            <NavLink to="/spells" onClick={toggleMenu}>
              Spells
            </NavLink>
          </li>
        </ul>
      </nav>

      <a
        href="https://www.drivethrurpg.com/browse/pub/21114/EverLore-Games"
        target="_blank"
        rel="noreferrer"
        className="header__cta"
        onClick={toggleMenu}
      >
        Buy Online
      </a>
    </header>
  );
};

export default Header;
