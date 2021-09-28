import React, { Fragment } from "react";
import { levelsData, talentData } from "../../Data";
import TalentSelector from "./TalentSelector";
import {
  // calculateBonus,
  // formatNumberModifier,
  formatNumberSuffix,
} from "../Utilities";

const LevelsTable = (props) => {
  const getTalentMod = (talentName) => {
    if (talentName === "choose") {
      return "-";
    }
    const whichTalentId = talentData.findIndex((x) => x.name === talentName);
    return talentData[whichTalentId].mod;
  };

  const getTalentAspect = (talentName) => {
    if (talentName === "choose") {
      return "-";
    }
    const whichTalentId = talentData.findIndex((x) => x.name === talentName);
    return talentData[whichTalentId].aspect;
  };

  const calcTalentLevel = (talentName) => {
    if (talentName === "choose") {
      return "-";
    }
    const whichTalentId = talentData.findIndex((x) => x.name === talentName);
    const talentAspect = talentData[whichTalentId].aspect;
    if (talentAspect === "race") {
      return "-";
    }
    if (talentAspect === "common") {
      return "Class (Full level)";
    }
    // if this is their class it's full level
    if (talentAspect === props.character.aspect) {
      return "Class (Full level)";
    }
    // if it's opposing it's quarter level
    if (talentAspect === "fighter" && props.character.aspect === "wizard") {
      return "Opposing (1/4 level)";
    }
    if (talentAspect === "wizard" && props.character.aspect === "fighter") {
      return "Opposing (1/4 level)";
    }
    if (talentAspect === "priest" && props.character.aspect === "knave") {
      return "Opposing (1/4 level)";
    }
    if (talentAspect === "knave" && props.character.aspect === "priest") {
      return "Opposing (1/4 level)";
    }
    return "Adjacent (1/2 level)";
  };

  return (
    <div>
      <table className="table table-levels">
        <thead>
          <tr>
            <th style={{ minWidth: "58px" }}>Level</th>
            <th>HD</th>
            <th>Save Bonus</th>
            <th>Talents</th>
            <th>Attrib. Mod</th>
            <th>Class/Adj/Opp</th>
          </tr>
        </thead>
        <tbody>
          {/*  --------------- 1st Level - always Combat talent -------------- */}
          <tr
            className={
              props.character.level === 1 ? "table-row--highlight" : ""
            }
          >
            <td
              rowSpan={props.character.aspect === "knave" ? 4 : 3}
              className="ut-align-center ut-text-greyhawk"
            >
              1st
            </td>
            <td
              rowSpan={props.character.aspect === "knave" ? 4 : 3}
              className="ut-align-center"
            >
              1d{props.character.hitDiceType}
            </td>
            <td
              rowSpan={props.character.aspect === "knave" ? 4 : 3}
              className="ut-align-center"
            >
              +0
            </td>
            <td>
              <div className="aspect-icon aspect-icon--fighter"></div>
              {props.character.talentAssigned1}
            </td>
            <td>{getTalentMod(props.character.talentAssigned1)}</td>
            <td>{calcTalentLevel(props.character.talentAssigned1)}</td>
          </tr>
          {/*  --------------- 1st Level - Assigned based on class (aspect) -------------- */}
          <tr>
            <td>
              <div
                className={`aspect-icon aspect-icon--${getTalentAspect(
                  props.character.talentAssigned2
                )}`}
              ></div>
              {props.character.talentAssigned2}
            </td>
            <td>{getTalentMod(props.character.talentAssigned2)}</td>
            <td>{calcTalentLevel(props.character.talentAssigned2)}</td>
          </tr>
          {/*  --------------- 1st Level - Choose a race or any talent -------------- */}
          <tr>
            <td>
              <div
                className={`aspect-icon aspect-icon--${getTalentAspect(
                  props.character.talentLevel1
                )}`}
              ></div>
              <div className="ut-display-inine-block ">
                <TalentSelector
                  type="race"
                  id="talentLevel1"
                  handleSetCharTalents={props.handleSetCharTalents}
                  talentDisabled={props.talentDisabled}
                  character={props.character}
                />
              </div>
            </td>
            <td>{getTalentMod(props.character.talentLevel1)}</td>
            <td>{calcTalentLevel(props.character.talentLevel1)}</td>
          </tr>
          {/*  --------------- 1st Level - If they're a Knave they get an extra talent -------------- */}
          {props.character.aspect === "knave" && (
            <tr>
              <td>
                <div
                  className={`aspect-icon aspect-icon--${getTalentAspect(
                    props.character.talentKnave1
                  )}`}
                ></div>
                <TalentSelector
                  type="knaveSecond"
                  id="talentKnave1"
                  handleSetCharTalents={props.handleSetCharTalents}
                  talentDisabled={props.talentDisabled}
                  character={props.character}
                />
              </td>
              <td>{getTalentMod(props.character.talentKnave1)}</td>
              <td>{calcTalentLevel(props.character.talentKnave1)}</td>
            </tr>
          )}
          {/*  --------------- 1st Level - If they have a disad they get an extra talent  -------------- */}
          {props.character.disad1 !== "none" && (
            <tr>
              <td className="ut-align-center">Disad 1</td>
              <td></td>
              <td></td>
              <td>
                <div
                  className={`aspect-icon aspect-icon--${getTalentAspect(
                    props.character.talentDisad1
                  )}`}
                ></div>
                <TalentSelector
                  type="all"
                  id="talentDisad1"
                  talentDisabled={props.talentDisabled}
                  handleSetCharTalents={props.handleSetCharTalents}
                  character={props.character}
                />
              </td>
              <td>{getTalentMod(props.character.talentDisad1)}</td>
              <td>{calcTalentLevel(props.character.talentDisad1)}</td>
            </tr>
          )}
          {/*  --------------- 1st Level - If they have a second disad they get a seconmd extra talent  -------------- */}
          {props.character.disad2 !== "none" && (
            <tr>
              <td className="ut-align-center">Disad 2</td>
              <td></td>
              <td></td>
              <td>
                <div
                  className={`aspect-icon aspect-icon--${getTalentAspect(
                    props.character.talentDisad2
                  )}`}
                ></div>
                <TalentSelector
                  type="all"
                  id="talentDisad2"
                  talentDisabled={props.talentDisabled}
                  handleSetCharTalents={props.handleSetCharTalents}
                  character={props.character}
                />
              </td>
              <td>{getTalentMod(props.character.talentDisad2)}</td>
              <td>{calcTalentLevel(props.character.talentDisad2)}</td>
            </tr>
          )}

          {/*  --------------- All the other levels   -------------- */}
          {levelsData
            .filter((i) => i.level > 1)
            .map((i) => (
              <tr
                key={i.level}
                className={
                  i.level % 2 === 0 ? "ut-zebra-gray" : "ut-zebra-white"
                }
              >
                <td className="ut-align-center ut-text-greyhawk">
                  {formatNumberSuffix(i.level)}
                </td>
                <td className="ut-align-center">
                  {i.hitDice}d{props.character.hitDiceType}
                  {i.hitDiceBonus && <span>+{i.hitDiceBonus}</span>}
                </td>
                <td className="ut-align-center">
                  {i.saveBonus > 0 && <span>+</span>}
                  {i.saveBonus}
                </td>

                {i.getsTalent ? (
                  <Fragment>
                    <td>
                      <div
                        className={`aspect-icon aspect-icon--${getTalentAspect(
                          props.character[`talentLevel${i.level}`]
                        )}`}
                      ></div>
                      <TalentSelector
                        type="all"
                        id={`talentLevel${i.level}`}
                        talentDisabled={props.talentDisabled}
                        handleSetCharTalents={props.handleSetCharTalents}
                        character={props.character}
                      />
                    </td>
                    <td>
                      {getTalentMod(props.character[`talentLevel${i.level}`])}
                    </td>
                    <td>
                      {calcTalentLevel(
                        props.character[`talentLevel${i.level}`]
                      )}
                    </td>
                  </Fragment>
                ) : (
                  <Fragment>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </Fragment>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LevelsTable;
