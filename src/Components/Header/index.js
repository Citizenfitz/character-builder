import React from "react";

const Header = () => (
  <header
    role="banner"
    className="header flex-grid flex-grid--space-evenly  flex-grid--align-items-end"
    id="header"
  >
    <div className="aspect-icon  aspect-icon--large aspect-icon--fighter"></div>
    <div className="aspect-icon  aspect-icon--large aspect-icon--priest"></div>
    <h1>
      Bottled Lighting <span className="subheader">Character Generator</span>
    </h1>
    <div className="aspect-icon  aspect-icon--large aspect-icon--wizard"></div>
    <div className="aspect-icon  aspect-icon--large aspect-icon--knave"></div>
  </header>
);

export default Header;
