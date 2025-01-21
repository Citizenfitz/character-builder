import React from "react";
import DisadSelector from "../DisadSelector";

const CharacterDetails = ({ character, onAlignmentChange, onDisadChange }) => {
  const handleAlignmentChange = (e) => {
    console.log("Alignment change:", e.target.value);
    onAlignmentChange({
      target: {
        value: e.target.value,
      },
    });
  };

  const handleDisadChange = (e, id) => {
    console.log("Disad change:", { value: e.target.value, id });
    onDisadChange({
      target: {
        id: id,
        value: e.target.value,
      },
    });
  };

  const handleXPChange = (e) => {
    onDisadChange({
      target: {
        id: "xp",
        value: e.target.value,
      },
    });
  };

  return (
    <div>
      <div className="data-display-box data-display-box--explanations">
        <div className="data-display-box__text"></div>
        <h2 className="data-display-box__header">Symbol or Character Sketch</h2>
      </div>

      <label>
        <select
          name="alignment"
          onChange={handleAlignmentChange}
          value={character.alignment}
          className="ut-no-print"
        >
          <option value="Lawful Good">Lawful Good</option>
          <option value="Neutral Good">Neutral Good</option>
          <option value="Chaotic Good">Chaotic Good</option>
          <option value="Lawful Neutral">Lawful Neutral</option>
          <option value="Neutral">Neutral</option>
          <option value="Chaotic Neutral">Chaotic Neutral</option>
          <option value="Lawful Evil">Lawful Evil</option>
          <option value="Neutral Evil">Neutral Evil</option>
          <option value="Chaotic Evil">Chaotic Evil</option>
        </select>
        <div className="ut-no-screen print-text-input">
          {character.alignment}
        </div>
        <br />
        <span className="label">Alignment</span>
      </label>

      <label>
        <DisadSelector
          id="disad1"
          character={character}
          handleSetDisad={(e) => handleDisadChange(e, "disad1")}
        />
        <span className="label">
          Disad 1{" "}
          <span className="ut-text-explain ut-no-print">(optional)</span>
        </span>
      </label>

      <label>
        <DisadSelector
          id="disad2"
          character={character}
          handleSetDisad={(e) => handleDisadChange(e, "disad2")}
        />
        <span className="label">
          Disad 2{" "}
          <span className="ut-text-explain ut-no-print">(optional)</span>
        </span>
      </label>

      <label>
        <input
          type="text"
          value={character.xp}
          onChange={handleXPChange}
          className="ut-no-print"
        />
        <div className="ut-no-screen print-text-input">{character.xp}</div>
        <br />
        <span className="label">XP/AP</span>
      </label>
    </div>
  );
};

export default CharacterDetails;
