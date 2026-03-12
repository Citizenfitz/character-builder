import { calcTalentLevel } from "./calcTalentLevel";
import type { AspectName } from "../../types";

export const calcTalentLevelNumber = (
  characterAspect: AspectName,
  talentName: string,
  characterLevel: number,
): number => {
  let talentLevel = characterLevel;
  const talentRef = calcTalentLevel(characterAspect, talentName);

  switch (talentRef) {
    case "Opposing (1/4 level)":
      talentLevel = Math.floor(talentLevel / 4);
      break;
    case "Adjacent (1/2 level)":
      talentLevel = Math.floor(talentLevel / 2);
      break;
  }

  return Math.max(1, talentLevel);
};
