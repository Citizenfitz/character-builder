import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="page">
    {/* ************* Masthead ************* */}
    <section className="section-large  masthead">
      <div className="page__inner masthead__inner">
        <div className="mastead__text">
          <h2 className="masthead__header text-giant">
            Practice Singing
            <br className="only-phone" />
            with Privacy
          </h2>
          <p className="masthead__copy text-medium">
            <b>QuestRex &nbsp;</b>
            is a table-top, fantasy role-playing game based on the most famous
            RPG from the 80s. It leverages the old-school RPG conventions
            everyone already knows but with streamlined modern game mechanics
            and a <b>unique Talent system</b>. Its rules are comprehensive
            enough to cover all the basics, yet spare enough to avoid bloat and
            encourage player interpretation.
          </p>
          <p className="only-desktop">
            <a href="buy.html">
              <button className="button">Buy on DriveThruRPG</button>
            </a>
          </p>
        </div>
        <div className="masthead__img-container">
          <img
            src="assets/images/QuestRex-table.jpeg"
            alt="QuestRex RPG"
            className="masthead__img"
          />
        </div>
        <p className="only-phone">
          <a href="buy.html">
            <button className="button">Buy on DriveThruRPG</button>
          </a>
        </p>
      </div>
    </section>
    {/* ************* Features ************* */}
    <section className="section-large  features">
      <div className="page__inner features__inner">
        <ul className="text-medium features__list">
          <li>
            <span className="features__icon fas fas-volume"></span>
            <b>Significantly Lowers the Voice's Volume</b>
            <br />
            Who's rolling their eyes next door as you practice singing? No one
            with LOW-VOX. Even the loudest singing is reduced to
            conversation-level speech. You're free to practice with privacy.
          </li>
          <li>
            <span className="features__icon fas fas-feather"></span>
            <b>Lightweight and Portable</b>
            <br />
            LOW-VOX weighs less than a pound and fits easily in bags. You can
            use it anywhere.
          </li>

          <li>
            <span className="features__icon fas fas-heart"></span>
            <b>Completely Safe</b>
            <br />
            Made of non-toxic foam, silicone, and plastic it's completely safe
            to use. LOW-VOX's generous airflow ensures you can sing and breathe
            naturally while using it.
          </li>
        </ul>
      </div>
    </section>

    {/* ************* Explain ************* */}
    <section className="section-large explain">
      <div className="explain__inner">
        <div className="explain__img-container only-desktop">
          <img
            src="img/low-vox-details.png"
            alt=" of LOW-VOX"
            className="explain__img"
          />
        </div>
        <div className="explain__copy">
          <p className="text-medium">
            To be a great singer or speaker you have to practice and warm up
            your voice but it's often embarrassing and inconsiderate to do with
            others around. Thin walls, late hours, or standing backstage can
            make it impossible to get the privacy you need to be your best.
            Large vocal booths are great, but they're expensive and not
            portable.
          </p>
          <div className="explain__img-container only-phone">
            <img
              src="img/low-vox-details.png"
              alt=" of Low Vox"
              className="explain__img"
            />
          </div>
          <p className="text-medium">
            Enter the <b>LOW-VOX voice silencer</b>. Made of safe, lightweight
            materials it's the portable solution you can use anywhere. It
            dramatically reduces the volume of your voice while still allowing
            for natural practice and breathing.
          </p>

          <p className="text-medium">
            <b>Dimensions</b>
          </p>
          <ul className="text-medium">
            <li>Weight: .8 lbs / .235 kg</li>
            <li>Height: 12.5 inches / 32 cm</li>
            <li>Diameter: 3 inches / 8 cm</li>
          </ul>

          <p className="text-medium">
            Don't let a lack of privacy keep your voice from being its best.
          </p>
          <p>
            <a href="buy.html">
              <button className="button">$59.00 Buy Now</button>
            </a>
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
