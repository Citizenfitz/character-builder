import React from "react";

const PresetsSelector = (props) => {
  return (
    <label className="preset-chooser">
      <span className="label">Optional Preset </span>:&nbsp;
      <select
        id="presetSelector"
        onChange={props.handlePreset}
        defaultValue="choose"
      >
        <option value="choose">Choose</option>
        {props.presetData.map((i) => (
          <option key={i.id} value={i.id}>
            {i.subclass && "---"}
            {i.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default PresetsSelector;
