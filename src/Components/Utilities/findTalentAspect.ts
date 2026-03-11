import { talentData } from "../../Data/indexRefactor";

// Returns the aspect/category of a talent (race, fighter, priest, wizard, rogue, common)
export const findTalentAspect = (talentName: string): string => {
  const talent = talentData.find((t) => t.name === talentName);
  return talent?.aspect ?? "choose";
};
