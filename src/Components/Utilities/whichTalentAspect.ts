import { talentData } from "../../Data/indexRefactor";

export const whichTalentAspect = (talentName: string): string => {
  const talent = talentData.find((x) => x.name === talentName);
  return talent?.aspect ?? "choose";
};
