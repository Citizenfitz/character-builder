import type { Talents } from "../../types/common";

// Finds at what level a character has a given talent.
// Pass it the talents object and any talent name string.
// Returns the level slot the talent was taken at (1, 3, 5, 7, or 9)
// Returns 0 if the character doesn't have the talent at all.
export const findTalentLevelSlot = (
  talents: Talents,
  talentName: string,
): number => {
  if (talents.talentLevel3 === talentName) return 3;
  if (talents.talentLevel5 === talentName) return 5;
  if (talents.talentLevel7 === talentName) return 7;
  if (talents.talentLevel9 === talentName) return 9;
  if (Object.values(talents).indexOf(talentName) > -1) return 1;
  return 0;
};
