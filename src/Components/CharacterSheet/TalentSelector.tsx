import React from "react";
import { talentData, raceData } from "../../Data/indexRefactor";
import { useCharacter } from "../../context/CharacterContext";
import type { Talents } from "../../types";

// TODO: move all talent rules to Utilities/talentRules.ts in rules revision
// Rules currently here: Stronghold (level 9 only), Wizardry prerequisites,
// duplicate talent prevention, Attribute Increase/Wild Psionics exceptions

interface TalentSelectorProps {
  type: "race" | "all" | "rogueSecond";
  id: keyof Talents;
}

const TalentSelector = ({ type, id }: TalentSelectorProps) => {
  const { character, dispatch } = useCharacter();
  const { talents } = character;

  const hasWizardry1 = Object.values(talents).includes("Wizardry 1");
  const hasWizardry2 = Object.values(talents).includes("Wizardry 2");

  const handleSetCharTalents = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "SET_TALENTS",
      payload: {
        talents: {
          ...talents,
          [id]: e.target.value,
        },
      },
    });
  };

  const isDisabled = (talentName: string, talentId: keyof Talents): boolean => {
    // Attribute Increase and Wild Psionics are always selectable
    if (talentName === "Attribute Increase" || talentName === "Wild Psionics") {
      return false;
    }

    // Stronghold only available in level 9 slot
    if (talentName === "Stronghold") {
      return talentId !== "talentLevel9";
    }

    // Wizardry spell enhancement talents require Wizardry 1
    if (!hasWizardry1) {
      if (
        talentName === "Encumbered Casting" ||
        talentName === "Spell Refashionment" ||
        talentName === "Stealth Casting" ||
        talentName === "Wizardry 2" ||
        talentName === "Wizardry 3"
      ) {
        return true;
      }
    }

    // Wizardry 3 requires Wizardry 2
    if (!hasWizardry2 && talentName === "Wizardry 3") {
      return true;
    }

    // Prevent duplicate talents
    return Object.values(talents).some((val) => val === talentName);
  };

  const renderTalentOptions = (aspect: string) => (
    <optgroup
      label={`${aspect.charAt(0).toUpperCase() + aspect.slice(1)} Talents`}
    >
      {talentData
        .filter((talent) => talent.aspect === aspect)
        .map((option) => (
          <option
            key={option.id}
            value={option.name}
            disabled={isDisabled(option.name, id)}
          >
            {option.name}
          </option>
        ))}
    </optgroup>
  );

  if (type === "rogueSecond") {
    return (
      <select
        onChange={handleSetCharTalents}
        id={id}
        value={talents[id]}
        aria-label="Choose a Rogue Talent"
      >
        <option value="choose" disabled>
          Choose Any Rogue Talent
        </option>
        {talentData
          .filter((talent) => talent.aspect === "rogue")
          .map((option) => (
            <option
              key={option.id}
              value={option.name}
              disabled={isDisabled(option.name, id)}
            >
              {option.name}
            </option>
          ))}
      </select>
    );
  }

  return (
    <>
      {type === "race" && (
        <span className="label label--inline">Choose Talent or Race</span>
      )}
      <select
        onChange={handleSetCharTalents}
        id={id}
        value={talents[id]}
        aria-label={
          type === "race" ? "Choose a Talent or Race" : "Choose a Talent"
        }
      >
        <option value="choose" disabled>
          {type === "race"
            ? "Choose Any Talent (Including a Race)"
            : "Choose Talent"}
        </option>
        {type === "race" && (
          <optgroup label="Races">
            {raceData.map((option) => (
              <option key={option.id} value={option.name}>
                Race: {option.name}
              </option>
            ))}
          </optgroup>
        )}
        {renderTalentOptions("common")}
        {renderTalentOptions("fighter")}
        {renderTalentOptions("priest")}
        {renderTalentOptions("wizard")}
        {renderTalentOptions("rogue")}
      </select>
    </>
  );
};

export default TalentSelector;
