import React, { useState } from "react";
import ReactModal from "react-modal";
import { aspectData } from "../../Data";
import { whichAspectDisplayName } from "../Utilities";

const Aspects = (props) => {
  const [aspectModalOpen, setAspectModalOpen] = useState(false);
  const toggleAspectModal = () => {
    setAspectModalOpen(!aspectModalOpen);
  };

  // const getAspectIndex = (aspectName) => {
  //   return 1;
  // };

  return (
    <div className="attributes">
      {/*  ------- CLASS ------ */}
      <label>
        <button
          className="button aspect__modal-open-button "
          onClick={toggleAspectModal}
        >
          <span
            className={`aspect-icon aspect-icon--in-button aspect-icon--${props.character.aspect}`}
          ></span>
          <span className="ut-display-inine-block">
            {whichAspectDisplayName(props.character.aspect)}
            &nbsp;&nbsp;
          </span>
        </button>
        <br />
        <span className="label">Class</span>
      </label>

      {/*  ------- MODAL WITH CLASS PICKER ------ */}
      <ReactModal
        isOpen={aspectModalOpen}
        onRequestClose={toggleAspectModal}
        contentLabel="Choose Class"
        className="modal"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <div className="modal__header">
          <h2 className="modal__h2">Choose a Class</h2>
          <button
            className="button modal__header-button"
            onClick={toggleAspectModal}
            aria-label="Close modal"
          >
            X
          </button>
        </div>
        <div className="modal__body">
          <p className="ut-margin-top-0">
            A character's main approach to challenges. There are four arranged
            such that each has two adjacent classes
            <i> (those to the left and right) </i> and one opposing class
            <i> (the one directly across)</i>. A character's talents are
            strongest within their class, middling in adjacent classes (1/2
            their level), and poor in opposing ones (1/4 their level). Each
            class has one or more starting talents gains additional talents as
            they advance in level.
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
                      onClick={props.handleCharAspect}
                      className="aspect-radio-button"
                    ></input>
                    <label
                      htmlFor={i.name}
                      className={`aspect-radio-label aspect-radio-label--${i.name}`}
                    >
                      <span
                        className={`aspect-icon aspect-icon--in-button aspect-icon--${i.name}`}
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
                  className={`aspect-icon aspect-icon--medium aspect-icon--${props.character.aspect}`}
                ></span>
                {whichAspectDisplayName(props.character.aspect)}
              </h2>
              <ul className="aspect-picker-desc__list">
                <li>
                  <b className="ut-text-greyhawk">Description:</b> desc
                </li>
                <li>
                  <b className="ut-text-greyhawk">Starting talents:</b>{" "}
                  {props.character.talentAssigned1},{" "}
                  {props.character.talentAssigned2}
                </li>
                <li>
                  <b className="ut-text-greyhawk">Hit Dice:</b> d
                  {props.character.hitDiceType}
                </li>
                <li>
                  <b className="ut-text-greyhawk">Saving Throw Mods:</b>{" "}
                  {props.character.saveModsClass}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="modal__footer">
          <button
            className="button button--primary button--large"
            onClick={toggleAspectModal}
          >
            close
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default Aspects;
