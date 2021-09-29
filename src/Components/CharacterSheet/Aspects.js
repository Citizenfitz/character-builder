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
        <button className="button" onClick={toggleAspectModal}>
          Class
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
          <button
            className="button modal__header-button"
            onClick={toggleAspectModal}
          >
            close
          </button>
        </div>

        <div className="modal__body">
          <h2>Choose Class</h2>
          {aspectData.map((i) => (
            <span key={i.name} className="checkbox-wrapper">
              <input
                type="radio"
                name="class"
                value={i.id}
                id={i.name}
                checked={props.character.aspect === i.name}
                onClick={props.handleCharAspect}
              ></input>
              <label htmlFor={i.name} className={i.name}>
                {i.name}
              </label>
            </span>
          ))}
        </div>
        <div className="modal__footer">
          <button
            className="button modal__header-button"
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
