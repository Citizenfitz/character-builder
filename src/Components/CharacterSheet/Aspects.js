import React, { useState } from "react";
import { aspectData } from "../../Data";
import { whichAspectDisplayName } from "../Utilities";
import { QuestRexDialog } from "../Common/Dialog";

const Aspects = (props) => {
  const [aspectModalOpen, setAspectModalOpen] = useState(false);
  const toggleAspectModal = () => {
    setAspectModalOpen(!aspectModalOpen);
  };

  // const getAspectIndex = (aspectName) => {
  //   return 1;
  // };

  return (
    <div className="char-sheet__aspects">
      {/*  ------- CLASS ------ */}
      <label>
        <button
          className="char-sheet__button--alt  ut-no-print"
          onClick={toggleAspectModal}
        >
          <span
            className={`icon-aspect icon-aspect--in-button icon-aspect--${props.character.aspect}`}
          ></span>
          <span className="ut-display-inine-block">
            {whichAspectDisplayName(props.character.aspect)}
            &nbsp;&nbsp;
          </span>
        </button>
        <div className="ut-no-screen print-text-input">
          {whichAspectDisplayName(props.character.aspect)}
        </div>
        <br />
        <span className="label">Class</span>
      </label>

      {/*  ------- MODAL WITH CLASS PICKER ------ */}
      <QuestRexDialog
        isOpen={aspectModalOpen}
        onClose={toggleAspectModal}
        title="Choose a Class"
      >
        <p className="ut-margin-top-none">
          A character's main approach to challenges. There are four arranged
          such that each has two adjacent classes
          <i> (those to the left and right) </i> and one opposing class
          <i> (the one directly across)</i>. A character's talents are strongest
          within their class, middling in adjacent classes (1/2 their level),
          and poor in opposing ones (1/4 their level). Each class has one or
          more starting talents gains additional talents as they advance in
          level.
        </p>
        <div className="flex-grid">
          <div className="flex-grid__child--half">
            <ul className="aspect-radio-set">
              {aspectData.map((i) => (
                <li key={i.name} className="aspect-radio-set__item">
                  <input
                    type="radio"
                    name="class"
                    value={i.id}
                    id={i.name}
                    checked={props.character.aspect === i.name}
                    onChange={props.handleCharAspect}
                    className="aspect-radio-button"
                  ></input>
                  <label
                    htmlFor={i.name}
                    className={`aspect-radio-label aspect-radio-label--${i.name}`}
                  >
                    <span
                      className={`icon-aspect icon-aspect--in-button icon-aspect--${i.name}`}
                    ></span>
                    {whichAspectDisplayName(i.name)}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-grid__child--half">
            <h2
              className={`aspect-picker-desc__header ut-color-${props.character.aspect}`}
            >
              <span
                className={`icon-aspect icon-aspect--medium icon-aspect--${props.character.aspect}`}
              ></span>
              {whichAspectDisplayName(props.character.aspect)}
            </h2>
            <ul className="aspect-picker-desc__list">
              <li>
                <b className="ut-text-header">Description:</b> desc
              </li>
              <li>
                <b className="ut-text-header">Starting talents:</b>{" "}
                {props.character.talentAssigned1},{" "}
                {props.character.talentAssigned2}
              </li>
              <li>
                <b className="ut-text-header">Hit Dice:</b> d
                {props.character.hitDiceType}
              </li>
              <li>
                <b className="ut-text-header">Saving Throw Mods:</b>{" "}
                {props.character.saveModsClass}
              </li>
            </ul>
          </div>
        </div>
      </QuestRexDialog>
    </div>
  );
};

export default Aspects;
