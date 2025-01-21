import { useState } from "react";

// Add default export
export default function useSpells(character) {
  const [schoolLimit, setSchoolLimit] = useState();

  const handlePickSchool = (schools) => {
    return {
      ...character,
      wizardrySchools: schools,
    };
  };

  const setWizardSchool = (color, schoolIndex) => {
    let tempSchools = character.wizardrySchools.slice(0);
    tempSchools[schoolIndex] = color;
    return tempSchools;
  };

  const validateSpellCaster = (state) => {
    state.thaumaturgyStartLevel = findTalentLevelSlot(
      state.talents,
      "Thaumaturgy"
    );
    state.wizardry1StartLevel = findTalentLevelSlot(
      state.talents,
      "Wizardry 1"
    );
    state.wizardry2StartLevel = findTalentLevelSlot(
      state.talents,
      "Wizardry 2"
    );
    state.wizardry3StartLevel = findTalentLevelSlot(
      state.talents,
      "Wizardry 3"
    );

    if (state.wizardry2StartLevel === 0) {
      state.wizardrySchools.slice(0, 2);
    }

    if (state.wizardry2StartLevel === 0) {
      state.wizardrySchools[2] = "Choose";
      state.wizardry3StartLevel = 0;
      Object.entries(state.talents).forEach(([key, val]) => {
        if (val === "Wizardry 3") {
          state.talents[key] = "choose";
        }
      });
    }

    if (state.wizardry1StartLevel === 0) {
      state.wizardrySchools[1] = "Choose";
      state.wizardrySchools[2] = "Choose";
      state.wizardry2StartLevel = 0;
      state.wizardry3StartLevel = 0;

      Object.entries(state.talents).forEach(([key, val]) => {
        if (
          val === "Encumbered Casting" ||
          val === "Spell Refashionment" ||
          val === "Stealth Casting" ||
          val === "Wizardry 2" ||
          val === "Wizardry 3"
        ) {
          state.talents[key] = "choose";
        }
      });
    }

    return state;
  };

  return {
    schoolLimit,
    setSchoolLimit,
    handlePickSchool,
    setWizardSchool,
    validateSpellCaster,
  };
}

// Helper function
const findTalentLevelSlot = (talents, talentName) => {
  if (talents.talentLevel3 === talentName) return 3;
  if (talents.talentLevel5 === talentName) return 5;
  if (talents.talentLevel7 === talentName) return 7;
  if (talents.talentLevel9 === talentName) return 9;
  if (Object.values(talents).indexOf(talentName) > -1) return 1;
  return 0;
};
