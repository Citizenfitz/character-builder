import React, { useState } from "react";
import "../../style.css";
import Attributes from "./Attributes";
import { dataAttributes } from "../../Data";

export default {
  title: "CharacterSheet/Attributes",
  component: Attributes,
  parameters: {
    layout: "centered",
  },
};

function AttributesInteractive() {
  const [attributes, setAttributes] = useState(() =>
    JSON.parse(JSON.stringify(dataAttributes))
  );
  return (
    <Attributes
      attributes={attributes}
      onChange={setAttributes}
      onRoll={() => {}}
    />
  );
}

export const Default = {
  render: () => <AttributesInteractive />,
};

export const WithCustomValues = {
  render: () => {
    const custom = JSON.parse(JSON.stringify(dataAttributes));
    custom.strength.total = 16;
    custom.strength.roll = 16;
    custom.strength.mod = 3;
    custom.dexterity.total = 14;
    custom.dexterity.roll = 14;
    custom.dexterity.mod = 2;
    return (
      <Attributes
        attributes={custom}
        onChange={() => {}}
        onRoll={() => {}}
      />
    );
  },
};
