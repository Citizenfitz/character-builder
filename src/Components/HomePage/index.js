import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="homepage">
    <div className="flex-grid">
      <div className="flex-grid__child--half">
        <img
          src="assets/images/everlore-core-rules.png"
          alt="QuestRex Core Rules Cover"
          className="homepage__cover"
        />
      </div>
      <div className="flex-grid__child--half">
        <h2 className="homepage__h2">
          Your Flexible, Old-School, Fantasy RPG!
        </h2>
        <p className="homepage__p">
          <b>
            QuestRex<span className="ut_tm">®</span>&nbsp;
          </b>
          is a table-top, fantasy role-playing game based on the most famous RPG
          from the 80s. It leverages the old-school RPG conventions everyone
          already knows but with streamlined modern game mechanics and a{" "}
          <b>unique Talent system</b>. Its rules are comprehensive enough to
          cover all the basics, yet spare enough to avoid bloat and encourage
          player interpretation.
        </p>

        <ul className="homepage__p homepage__ul">
          <li>
            <b>Familiar Old-School Gaming</b> - Simple, powerful rules that most
            players already know. Get games up and running quickly with minimum
            fuss.
          </li>
          <li>
            <b>Powerful Talent System</b> - Quickly and easily build the
            characters you want without dozens of classes or all characters
            becoming the same.&nbsp;
            <Link to="./character">
              <button className="button button--primary homepage__btn-try">
                Try it <span className="fas fa-pointer"></span>
              </button>
            </Link>
          </li>
          <li>
            <b>Themed Magic</b> - Add flavor to your mages with simple, built-in
            schools of magic.
          </li>
        </ul>
        <p className="ut-align-center">
          <a
            href="https://www.drivethrurpg.com/product/398899/EverLore-Core-Rules"
            target="_blank"
            rel="noreferrer"
          >
            <button className="button button--primary button--large homepage__cta">
              Buy on DriveThruRPG
            </button>
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default HomePage;
