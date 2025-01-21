import { useCallback } from "react";
import { aspectData, raceData } from "../../../Data";

export const useRaceAspect = (character, updateCharacter) => {
  const handleAspectChange = useCallback(
    (e) => {
      const newAspect = aspectData.find((a) => a.name === e.target.value);
      updateCharacter({
        aspect: newAspect.name,
        hitDiceType: newAspect.hitDiceType,
        saveModsClass: newAspect.saveMods || "",
      });
    },
    [updateCharacter]
  );

  const handleRaceChange = useCallback(
    (e) => {
      const newRace = raceData.find((r) => r.name === e.target.value);
      updateCharacter({
        race: newRace.name,
        characteristicsRace: newRace.characteristics || [],
        saveModsRace: newRace.saveMods || [],
        movement: newRace.movement || 30,
      });
    },
    [updateCharacter]
  );

  const handleGenderChange = useCallback(
    (e) => {
      updateCharacter({
        gender: e.target.value,
      });
    },
    [updateCharacter]
  );

  return {
    handleAspectChange,
    handleRaceChange,
    handleGenderChange,
  };
};
