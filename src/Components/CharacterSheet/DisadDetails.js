import React from "react";
import { dataDisads } from "../../Data";
import RenderDisad from "../Utilities/RenderDisad";

const DisadDetails = ({ character }) => {
  // Helper function to get available disads
  const getAvailableDisads = () => {
    const disads = [];
    if (character.disad1 !== "none") {
      disads.push(character.disad1);
    }
    if (character.disad2 !== "none") {
      disads.push(character.disad2);
    }
    return disads;
  };

  return (
    <div>
      {/* Disadvantage Descriptions */}
      {getAvailableDisads().map((disadName) => {
        const disad = dataDisads.find((d) => d.name === disadName);
        if (!disad) return null;

        // Import markdown content
        const markdownContent = require(`../../markdown/disad-${disad.name
          .toLowerCase()
          .replace(/ /g, "-")}.md`);

        return (
          <div key={disad.name} id={disad.name}>
            <RenderDisad
              name={disad.name}
              description={markdownContent}
              bonus={disad.bonus}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DisadDetails;
