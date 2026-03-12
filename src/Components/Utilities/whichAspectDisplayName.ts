import { aspectData } from "../../Data/indexRefactor";

export const whichAspectDisplayName = (aspectName: string): string => {
  const aspect = aspectData.find((x) => x.name === aspectName);
  return aspect?.displayName ?? aspectName;
};
