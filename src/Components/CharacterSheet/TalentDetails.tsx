import React from "react";
import { talentData } from "../../Data/indexRefactor";
import RenderTalent from "../MarkdownRender/RenderTalent";
import { useCharacter } from "../../context/CharacterContext";
import type { Talents } from "../../types";

const LEVEL_GATED_SLOTS: { slot: keyof Talents; minLevel: number }[] = [
  { slot: "talentLevel3", minLevel: 3 },
  { slot: "talentLevel5", minLevel: 5 },
  { slot: "talentLevel7", minLevel: 7 },
  { slot: "talentLevel9", minLevel: 9 },
];

const TalentDetails = () => {
  const { character } = useCharacter();
  const { talents, level } = character;

  const getAvailableTalents = (): string[] => {
    const gatedSlots = LEVEL_GATED_SLOTS.filter((g) => level < g.minLevel).map(
      (g) => g.slot,
    );

    return (Object.keys(talents) as Array<keyof Talents>)
      .filter((slot) => !gatedSlots.includes(slot))
      .map((slot) => talents[slot]);
  };

  return (
    <div>
      {getAvailableTalents()
        .filter((talentName) => talentName !== "choose")
        .map((talentName) => {
          const talent = talentData.find((t) => t.name === talentName);
          if (!talent) return null;
          return (
            <div key={talent.name} id={talent.name}>
              <RenderTalent name={talent.name} aspect={talent.aspect} />
            </div>
          );
        })}
    </div>
  );
};

export default TalentDetails;
