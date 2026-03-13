import React, { useState } from "react";
import { aspectData } from "../../Data/indexRefactor";
import { whichAspectDisplayName } from "../Utilities";
import { QuestRexDialog } from "../Common/Dialog";
import { useCharacter } from "../../context/CharacterContext";
import { AspectName } from "../../types";

const Aspects = () => {
  const { character, dispatch } = useCharacter();
  const [aspectModalOpen, setAspectModalOpen] = useState(false);

  // Derived — no useEffect needed
  const currentAspectIndex = Math.max(
    0,
    aspectData.findIndex((aspect) => aspect.name === character.aspect)
  );

  const toggleAspectModal = () => setAspectModalOpen((prev) => !prev);

  const handleCharAspect = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_ASPECT",
      payload: e.target.value as AspectName,
    });
    toggleAspectModal();
  };

  return (
    <div className="char-sheet__aspects">
      {/* ------- CLASS ------ */}
      <div>
        <button
          className="char-sheet__button--alt ut-no-print"
          onClick={toggleAspectModal}
          aria-haspopup="dialog"
          aria-expanded={aspectModalOpen}
        >
          <span
            className={`icon-aspect icon-aspect--in-button icon-aspect--${character.aspect}`}
            aria-hidden="true"
          />
          <span className="ut-display-inline-block">
            {whichAspectDisplayName(character.aspect)}
            &nbsp;&nbsp;
          </span>
        </button>
        <div className="ut-no-screen print-text-input">
          {whichAspectDisplayName(character.aspect)}
        </div>
        <span className="label">Class</span>
      </div>

      {/* ------- MODAL WITH CLASS PICKER ------ */}
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
          and poor in opposing ones (1/4 their level).
        </p>

        <div className="flex-grid">
          <div className="flex-grid__child--half">
            {/* ------- Fancy Radio Aspect Picker ------ */}
            <fieldset>
              <legend className="ut-only-sr">Choose a Class</legend>
              <ul className="aspect-radio-set" role="list">
                {aspectData.map((aspect) => (
                  <li key={aspect.name} className="aspect-radio-set__item">
                    <input
                      type="radio"
                      name="class"
                      value={aspect.id}
                      id={aspect.name}
                      checked={character.aspect === aspect.name}
                      onChange={handleCharAspect}
                      className="aspect-radio-button"
                    />
                    <label
                      htmlFor={aspect.name}
                      className={`aspect-radio-label aspect-radio-label--${aspect.name}`}
                    >
                      <span
                        className={`icon-aspect icon-aspect--in-button icon-aspect--${aspect.name}`}
                        aria-hidden="true"
                      />
                      {whichAspectDisplayName(aspect.name)}
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
            <p className="aspect-picker-desc__archetypes">
              <b className={`ut-color-${character.aspect}`}>
                {whichAspectDisplayName(character.aspect)} Archetypes:{" "}
              </b>
              {aspectData[currentAspectIndex].archetypes}
            </p>
          </div>
          <div className="flex-grid__child--half">
            {/* ------- Description based on selected aspect ------ */}
            <h2
              className={`aspect-picker-desc__header ut-color-${character.aspect}`}
            >
              <span
                className={`icon-aspect icon-aspect--medium icon-aspect--${character.aspect}`}
                aria-hidden="true"
              />
              {whichAspectDisplayName(character.aspect)}
            </h2>
            <p>{aspectData[currentAspectIndex].description}</p>
            <ul className="aspect-picker-desc__list">
              <li>
                <b className="ut-text-header">Starting talents:</b> Combat,{" "}
                {aspectData[currentAspectIndex].assignedTalent2}
              </li>
              <li>
                <b className="ut-text-header">Hit Dice:</b> d
                {aspectData[currentAspectIndex].hitDiceType}
              </li>
              <li>
                <b className="ut-text-header">Saving Throw Mods:</b>{" "}
                {aspectData[currentAspectIndex].saveModsClass}
              </li>
              <li>
                <b className="ut-text-header">Armor:</b>{" "}
                {aspectData[currentAspectIndex].armor}
              </li>
              <li>
                <b className="ut-text-header">Weapon:</b>{" "}
              </li>
            </ul>
          </div>
        </div>
      </QuestRexDialog>
    </div>
  );
};

export default Aspects;