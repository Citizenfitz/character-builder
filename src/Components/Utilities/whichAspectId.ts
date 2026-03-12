import { aspectData } from "../../Data/indexRefactor";

export const whichAspectId = (aspectName: string): number => {
  return aspectData.findIndex((x) => x.name === aspectName);
};
