import React from "react";

const LevelSelector = ({ level, onChange }) => {
  return (
    <label>
      <select
        name="level"
        value={level}
        onChange={onChange}
        className="ut-no-print"
      >
        {[...Array(13)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <div className="ut-no-screen print-text-input">{level}</div>
      <br />
      <span className="label">Level</span>
    </label>
  );
};

export default LevelSelector;
