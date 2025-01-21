import React from "react";
import LevelSelector from "./LevelSelector";

const CharacterBasics = ({
  character,
  onNameChange,
  onLevelChange,
  onRaceClick,
  onAspectChange,
  aspectData,
}) => {
  console.log("CharacterBasics render:", { character });

  const handleNameChange = (e, field) => {
    console.log("handleNameChange called with:", {
      value: e.target.value,
      field,
    });
    onNameChange(e, field);
  };

  return (
    <div className="char-basics">
      {/* Name inputs */}
      <div className="char-basics__name-inputs">
        <label>
          <input
            type="text"
            value={character.namePlayer}
            name="namePlayer"
            onChange={(e) => handleNameChange(e, "namePlayer")}
            className="ut-no-print"
          />
          <div className="ut-no-screen print-text-input ut-text-cursive">
            {character.namePlayer}&nbsp;
          </div>
          <br />
          <span className="label">Player Name</span>
        </label>

        <label>
          <input
            type="text"
            value={character.nameCharacter}
            name="nameCharacter"
            onChange={(e) => handleNameChange(e, "nameCharacter")}
            className="ut-no-print"
          />
          <div className="ut-no-screen print-text-input ut-text-cursive">
            {character.nameCharacter}
          </div>
          <br />
          <span className="label">Character Name</span>
        </label>
      </div>

      {/* Level, Race, Class inputs */}
      <div className="char-basics__inputs">
        {/* Level Selector */}
        <LevelSelector
          level={character?.level || 1}
          onChange={(e) => onLevelChange(e)}
        />

        {/* Race Selector */}
        <label>
          <button
            type="button"
            onClick={onRaceClick}
            className="aspect__modal-open-button ut-no-print"
          >
            {character.race}
          </button>
          <div className="ut-no-screen print-text-input">{character.race}</div>
          <br />
          <span className="label">Race</span>
        </label>

        {/* Aspect/Class Selector */}
        <label>
          <select
            name="aspect"
            value={
              aspectData?.findIndex((a) => a.name === character.aspect) || 0
            }
            onChange={onAspectChange}
            className="ut-no-print"
          >
            {aspectData?.map((aspect, index) => (
              <option key={index} value={index}>
                {aspect.name}
              </option>
            ))}
          </select>
          <div className="ut-no-screen print-text-input">
            {character.aspect}
          </div>
          <br />
          <span className="label">Class</span>
        </label>
      </div>
    </div>
  );
};

export default CharacterBasics;
