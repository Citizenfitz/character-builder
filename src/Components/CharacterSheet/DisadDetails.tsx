import React from "react";
import { disadData } from "../../Data/indexRefactor";
import RenderDisad from "../MarkdownRender/RenderDisad";
import { useCharacter } from "../../context/CharacterContext";

const DisadDetails = () => {
  const { character } = useCharacter();

  const activeDisads = [character.disad1, character.disad2].filter(
    (disad) => disad !== "none",
  );

  if (activeDisads.length === 0) return null;

  return (
    <div>
      {activeDisads.map((disadName) => {
        const disad = disadData.find((d) => d.name === disadName);
        if (!disad) return null;

        return (
          <div key={disad.name} id={disad.name}>
            <RenderDisad name={disad.name} />
          </div>
        );
      })}
    </div>
  );
};

export default DisadDetails;
