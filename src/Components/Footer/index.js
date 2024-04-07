import React from "react";

const Footer = () => (
  <footer className="footer section-large" id="footer">
    <h2>
      QuestRex <span className="josefin-regular"> - A classic RPG</span>
    </h2>
    <p className="text-small">
      All content copyright &copy; 2022 Zentropolis, Inc.
    </p>
    <p className="text-small">
      Dice roller graciously provided by{" "}
      <a href="https://fantasticdice.games/" target="_blank" rel="noreferrer">
        Fantastic Dice <span className="fas fa-new-window"></span>.
      </a>
    </p>
  </footer>
);

export default Footer;
