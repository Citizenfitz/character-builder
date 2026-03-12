import type { AspectName } from "../../types";
import { talentData } from "../../Data/indexRefactor";

export const calcTalentLevel = (
  characterAspect: AspectName,
  talentName: string,
): string => {
  if (talentName === "choose") return "-";

  const talent = talentData.find((x) => x.name === talentName);
  if (!talent) return "-";

  const talentAspect: AspectName = talent.aspect;

  if (talentAspect === "race") return "-";
  if (talentAspect === "common") return "Class (Full level)";
  if (talentAspect === characterAspect) return "Class (Full level)";

  if (
    (talentAspect === "fighter" && characterAspect === "wizard") ||
    (talentAspect === "wizard" && characterAspect === "fighter") ||
    (talentAspect === "priest" && characterAspect === "rogue") ||
    (talentAspect === "rogue" && characterAspect === "priest")
  ) {
    return "Opposing (1/4 level)";
  }

  return "Adjacent (1/2 level)";
};
