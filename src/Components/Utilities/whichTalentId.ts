import { talentData } from "../../Data/indexRefactor";

export const whichTalentId = (talentName: string): number => {
  return talentData.findIndex((x) => x.name === talentName);
};
