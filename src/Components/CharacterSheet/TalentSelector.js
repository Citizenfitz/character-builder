import React, { Fragment } from "react";
import { talentData, raceData } from "../../Data/";

const TalentSelector = (props) => {
  const hasWizardry1 = Object.values(props.talents).includes("Wizardry 1");
  const hasWizardry2 = Object.values(props.talents).includes("Wizardry 2");

  const isDisabled = (talentName, talentId) => {
    // if talent is "Attribute Increase" then it should remain selectable
    if (talentName === "Attribute Increase" || talentName === "Wild Psionics") {
      return false;
    }

    // if talentSlot is not talentLevel9 then stronghold is disabled
    if (talentName === "Stronghold") {
      return talentId !== "talentLevel9";
    }

    // if Wizardry 1 (hasWizardry1) then enable "Encumbered Casting", "Spell Refashionment", "Stealth Casting", "Wizardry 2"
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

    // if Wizardry 2 (hasWizardry2) is chosen, enable Wizardry 3
    if (!hasWizardry2) {
      if (talentName === "Wizardry 3") {
        return true;
      }
    }

    // check if this talent is in the character's talents
    let isTalentSelected = !!Object.values(props.talents).filter(
      (val) => val === talentName
    ).length;
    return isTalentSelected;
  };

  switch (props.type) {
    case "knaveSecond":
      return (
        <Fragment>
          <select
            onChange={props.handleSetCharTalents}
            id={props.id}
            value={props.value}
          >
            <option value="choose" disabled>
              Choose Any Knave Talent
            </option>
            {talentData
              .filter((talent) => talent.aspect === "knave")
              .map((option) => (
                <option
                  key={option.id}
                  value={option.name}
                  disabled={isDisabled(option.name)}
                >
                  {option.name}
                </option>
              ))}
          </select>
        </Fragment>
      );

    /*  --------------- All talents except Races -------------- */

    case "all":
      return (
        <Fragment>
          <select
            onChange={props.handleSetCharTalents}
            id={props.id}
            value={props.value}
          >
            <option value="choose" disabled>
              Choose Talent
            </option>
            <option disabled>---- Common Talents ----</option>
            {talentData
              .filter((talent) => talent.aspect === "common")
              .map((option) => (
                <option
                  key={option.id}
                  value={option.name}
                  disabled={isDisabled(option.name, props.id)}
                >
                  {option.name}
                </option>
              ))}
            <option disabled>---- Fighter Talents ----</option>
            {talentData
              .filter((talent) => talent.aspect === "fighter")
              .map((option) => (
                <option
                  key={option.id}
                  value={option.name}
                  disabled={isDisabled(option.name)}
                >
                  {option.name}
                </option>
              ))}
            <option disabled>---- Priest Talents ----</option>
            {talentData
              .filter((talent) => talent.aspect === "priest")
              .map((option) => (
                <option
                  key={option.id}
                  value={option.name}
                  disabled={isDisabled(option.name)}
                >
                  {option.name}
                </option>
              ))}
            <option disabled>---- Magic User Talents ----</option>
            {talentData
              .filter((talent) => talent.aspect === "wizard")
              .map((option) => (
                <option
                  key={option.id}
                  value={option.name}
                  disabled={isDisabled(option.name)}
                >
                  {option.name}
                </option>
              ))}
            <option disabled>---- Knave Talents ----</option>
            {talentData
              .filter((talent) => talent.aspect === "knave")
              .map((option) => (
                <option
                  key={option.id}
                  value={option.name}
                  disabled={isDisabled(option.name)}
                >
                  {option.name}
                </option>
              ))}
          </select>
        </Fragment>
      );

    /*  --------------- All talents INCLUDING races -------------- */
    default:
      return (
        <Fragment>
          <span className="label label--inline">Choose Talent or Race</span>
          <br />
          <select
            onChange={props.handleSetCharTalents}
            id={props.id}
            value={props.value}
          >
            <option value="choose" disabled>
              Choose Any Talent (Including a Race)
            </option>
            <option disabled>---- Races ----</option>
            {raceData.map((option) => (
              <option key={option.id} value={option.name}>
                Race: {option.name}
              </option>
            ))}
            <option disabled>---- Common Talents ----</option>
            {talentData
              .filter((talent) => talent.aspect === "common")
              .map((option) => (
                <option
                  key={option.id}
                  value={option.name}
                  disabled={isDisabled(option.name, props.id)}
                >
                  {option.name}
                </option>
              ))}
            <option disabled>---- Fighter Talents ----</option>
            {talentData
              .filter((talent) => talent.aspect === "fighter")
              .map((option) => (
                <option
                  key={option.id}
                  value={option.name}
                  disabled={isDisabled(option.name)}
                >
                  {option.name}
                </option>
              ))}
            <option disabled>---- Priest Talents ----</option>
            {talentData
              .filter((talent) => talent.aspect === "priest")
              .map((option) => (
                <option
                  key={option.id}
                  value={option.name}
                  disabled={isDisabled(option.name)}
                >
                  {option.name}
                </option>
              ))}
            <option disabled>---- Magic User Talents ----</option>
            {talentData
              .filter((talent) => talent.aspect === "wizard")
              .map((option) => (
                <option
                  key={option.id}
                  value={option.name}
                  disabled={isDisabled(option.name)}
                >
                  {option.name}
                </option>
              ))}
            <option disabled>---- Knave Talents ----</option>
            {talentData
              .filter((talent) => talent.aspect === "knave")
              .map((option) => (
                <option
                  key={option.id}
                  value={option.name}
                  disabled={isDisabled(option.name)}
                >
                  {option.name}
                </option>
              ))}
          </select>
        </Fragment>
      );
  }
};

export default TalentSelector;
