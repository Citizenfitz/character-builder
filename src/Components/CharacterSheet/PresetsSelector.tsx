import React from "react";
import { presetData } from "../../Data/indexRefactor";
import { useCharacter } from "../../context/CharacterContext";

const PresetsSelector = () => {
  const { dispatch } = useCharacter();

  const handlePreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch({
      type: "SET_PRESET",
      payload: value === "choose" ? "choose" : Number(value),
    });
  };

  return (
    <label className="preset-chooser">
      <span className="label label--inline">Optional Preset: </span>
      <select
        id="presetSelector"
        onChange={handlePreset}
        defaultValue="choose"
        aria-label="Optional character preset"
      >
        <option value="choose">Choose</option>
        {presetData.map((preset) => (
          <option key={preset.id} value={preset.id}>
            {preset.subclass && "---"}
            {preset.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default PresetsSelector;