import React from "react";

const PresetsSelector = ({ handlePreset, presetData }) => {
  return (
    <label className="preset-chooser">
      <span className="label label--inline">Optional Preset : </span>
      <select
        id="presetSelector"
        onChange={(e) => handlePreset(e.target.value)}
        defaultValue="choose"
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
