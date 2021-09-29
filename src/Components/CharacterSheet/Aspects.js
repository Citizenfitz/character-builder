import React, { useState } from "react";
import ReactModal from "react-modal";
import { aspectData } from "../../Data";

const Aspects = (props) => {
  const [aspectModalOpen, setAspectModalOpen] = useState(false);
  const toggleAspectModal = () => {
    setAspectModalOpen(!aspectModalOpen);
  };

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
            {props.character.aspect}&nbsp;&nbsp;
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
            A character's class is their main "mode" or approach to challenges.
            There are four arranged such that each has two adjacent classes
            <i> (those to the left and right) </i> and one opposing class
            <i> (the one directly across)</i>. A character's talents are
            strongest within their class, middling in adjacent classes (1/2
            their level), and poor in opposing ones (1/4 their level). Each
            class has one or more starting talents gains additional talents as
            they advance in level.
          </p>
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
                  {i.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="modal__footer">
          <button
            className="button button--secondary button--large"
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
