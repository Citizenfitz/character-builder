import React from "react";

const Footer = () => (
  <footer className="footer" id="footer">
    <div className="footer__top-border"></div>
    QuestRex and content copyright
    <span className="ut_tm"> © </span>
    2022 Zentropolis, Inc. <br />
    Some content distributed under the terms of the Open Game License version
    1.0a.
    <p>
      Dice roller graciously provided by{" "}
      <a href="https://fantasticdice.games/" target="_blank" rel="noreferrer">
        Fantastic Dice <span className="fas fa-new-window"></span>
      </a>
      .
    </p>
    <img
      src="assets/images/logo-questrex-mono.svg"
      alt="QuestRex Logo"
      width="25%"
    />
  </footer>
);

export default Footer;
