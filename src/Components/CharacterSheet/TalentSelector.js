import React, { Fragment } from "react";
import { talentData, raceData } from "../../Data/";

const TalentSelector = (props) => {
  switch (props.type) {
    case "knaveSecond":
      return (
        <Fragment>
          <select
            onChange={props.handleSetCharTalents}
            id={props.id}
            value={props.character.talentKnave1}
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
                  disabled={props.talentDisabled[option.name]}
                >
                  {option.name}
                </option>
              ))}
          </select>
        </Fragment>
      );
      break;

      {
        /*  --------------- All talents except Races -------------- */
      }
    case "all":
      return (
        <Fragment>
          <select
            onChange={props.handleSetCharTalents}
            id={props.id}
            value={props.character[props.id]}
          >
            <option value="choose" disabled selected>
              Choose Talent
            </option>
            <option disabled>---- Common Talents ----</option>
            {talentData
              .filter((talent) => talent.aspect === "common")
              .map((option) => (
                <option
                  key={option.id}
                  value={option.name}
                  disabled={props.talentDisabled[option.name]}
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
                  disabled={props.talentDisabled[option.name]}
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
                  disabled={props.talentDisabled[option.name]}
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
                  disabled={props.talentDisabled[option.name]}
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
                  disabled={props.talentDisabled[option.name]}
                >
                  {option.name}
                </option>
              ))}
          </select>
        </Fragment>
      );
      break;

      {
        /*  --------------- All talents INCLUDING races -------------- */
      }
    default:
      return (
        <Fragment>
          <select
            onChange={props.handleSetCharTalents}
            id={props.id}
            value={props.character.talentLevel1}
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
                  disabled={props.talentDisabled[option.name]}
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
                  disabled={props.talentDisabled[option.name]}
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
                  disabled={props.talentDisabled[option.name]}
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
                  disabled={props.talentDisabled[option.name]}
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
                  disabled={props.talentDisabled[option.name]}
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
