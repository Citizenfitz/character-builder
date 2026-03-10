import React from "react";
import "../../style.css";
import PresetsSelector from "./PresetsSelector";
import { presetData } from "../../Data";

export default {
  title: "CharacterSheet/PresetsSelector",
  component: PresetsSelector,
  parameters: {
    layout: "centered",
  },
};

export const Default = {
  args: {
    presetData,
    handlePreset: () => {},
  },
};

export const WithSelectionHandler = {
  render: function WithSelectionHandler() {
    const [selected, setSelected] = React.useState("choose");
    return (
      <div>
        <PresetsSelector
          presetData={presetData}
          handlePreset={(value) => setSelected(value)}
        />
        {selected !== "choose" && (
          <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
            Selected preset ID: {selected}
          </p>
        )}
      </div>
    );
  },
};
