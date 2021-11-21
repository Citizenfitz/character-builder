import React from "react";

const Header = () => (
  <header role="banner" className="header" id="header">
    <div className="flex-grid flex-grid--space-evenly  flex-grid--align-items-end">
      <div className="aspect-icon  aspect-icon--large aspect-icon--fighter"></div>
      <div className="aspect-icon  aspect-icon--large aspect-icon--priest"></div>
      <h1 className="flex-grid flex-grid--flex-start">
        <span className="header__dropcap">E</span>
        <div>
          <span className="ut-only-sr">E</span>verLore
          <span className="subheader">Character Generator</span>
        </div>
      </h1>
      <div className="aspect-icon  aspect-icon--large aspect-icon--wizard"></div>
      <div className="aspect-icon  aspect-icon--large aspect-icon--knave"></div>
    </div>
    <div className="header__bottom-border"></div>
    <div className="header__system-banner">
      Bottled Lightning
      <br />
      Game System
    </div>
  </header>
);

export default Header;
