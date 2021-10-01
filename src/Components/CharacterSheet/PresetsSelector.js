import React from "react";

const PresetsSelector = (props) => {
  return (
    <label className="preset-chooser">
      <select
        id="presetSelector"
        onChange={props.handlePreset}
        defaultValue="choose"
      >
        <option disabled value="choose">
          Choose
        </option>
        {props.presetData.map((i) => (
          <option key={i.id} value={i.id}>
            {i.subclass && "---"}
            {i.name}
          </option>
        ))}
      </select>
      <br />
      <span className="label">Optional Preset </span>
    </label>
  );
};

export default PresetsSelector;
