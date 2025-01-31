import React, { Fragment } from "react";
import { levelsData, talentData } from "../../Data";
import TalentSelector from "./TalentSelector";
import {
  // calculateBonus,
  // formatNumberModifier,
  formatNumberSuffix,
  calcTalentLevel,
  calcTalentLevelNumber,
} from "../Utilities";

const LevelsTable = (props) => {
  // returns formated data for Roll Mod column
  const getTalentMod = (talentName) => {
    let levelMod = calcTalentLevelNumber(
      props.character.aspect,
      talentName,
      props.character.level
    );
    let talentMod = "";
    // if it's unchosen return dash
    if (talentName === "choose") {
      return "-";
    }
    // get the talent's index in the data of talents. if that fails return nothing
    const whichTalentId = talentData.findIndex((x) => x.name === talentName);
    if (whichTalentId < 0) {
      return "-";
    }

    // if it has no roll (e.g. race talent), also return dash
    if (whichTalentId >= 0 && talentData[whichTalentId].isRollable === false) {
      return "-";
    }

    // else calc what it shoud be and send back
    if (talentData[whichTalentId].mod === "none") {
      talentMod = "";
    } else {
      talentMod = " and " + talentData[whichTalentId].mod;
    }
    return "+ " + levelMod + talentMod;
  };

  const getTalentAspect = (talentName) => {
    if (talentName === "choose") {
      return "-";
    }
    const whichTalentId = talentData.findIndex((x) => x.name === talentName);
    if (whichTalentId >= 0) {
      return talentData[whichTalentId].aspect;
    }
  };

  return (
    <div>
      <table
        className={`talent-table talent-table__level talent-table__level--${props.character.level}`}
      >
        <thead>
          <tr>
            <th className="talent-table__th">Level</th>
            <th className="talent-table__th">HD</th>
            <th className="talent-table__th">Talent</th>
            <th className="talent-table__th">Talent Roll Mod</th>
            <th className="talent-table__th">Class/Adj/Opp</th>
          </tr>
        </thead>
        <tbody>
          {/*  --------------- 1st Level - always Combat talent -------------- */}
          <tr
            className={
              props.character.level === 1
                ? "talent-table__level--lvl1 table-row--highlight"
                : "talent-table__level--lvl1"
            }
          >
            <td
              rowSpan={props.character.aspect === "knave" ? 4 : 3}
              className="ut-align-center ut-text-greyhawk talent-table__td"
            >
              1st
            </td>
            <td
              rowSpan={props.character.aspect === "knave" ? 4 : 3}
              className="ut-align-center talent-table__td"
            >
              1d{props.character.hitDiceType}
            </td>
            <td className="talent-table__td talent-table__level--talent">
              <div className="aspect-icon aspect-icon--fighter"></div>
              <span className="talentAssigned">
                {props.character.talents.talentAssigned1}
              </span>
            </td>
            <td className="talent-table__td ut-align-center">
              {getTalentMod(props.character.talents.talentAssigned1)}
            </td>
            <td className="talent-table__td ut-align-center">
              {calcTalentLevel(
                props.character.aspect,
                props.character.talents.talentAssigned1
              )}
            </td>
          </tr>
          {/*  --------------- 1st Level - Assigned based on class (aspect) -------------- */}
          <tr className="talent-table__level--lvl1">
            <td className="talent-table__td talent-table__level--talent">
              <div
                className={`aspect-icon aspect-icon--${getTalentAspect(
                  props.character.talents.talentAssigned2
                )}`}
              ></div>
              <span className="talentAssigned">
                {props.character.talents.talentAssigned2}
              </span>
            </td>
            <td className="talent-table__td ut-align-center">
              {getTalentMod(props.character.talents.talentAssigned2)}
            </td>
            <td className="talent-table__td ut-align-center">
              {calcTalentLevel(
                props.character.aspect,
                props.character.talents.talentAssigned2
              )}
            </td>
          </tr>
          {/*  --------------- 1st Level - Choose a race or any talent -------------- */}
          <tr className="talent-table__level--lvl1">
            <td className="talent-table__td talent-table__level--talent">
              <div
                className={`aspect-icon aspect-icon--${getTalentAspect(
                  props.character.talents.talentLevel1
                )}`}
              ></div>
              <div className="ut-display-inine-block ">
                <TalentSelector
                  type="race"
                  id="talentLevel1"
                  handleSetCharTalents={props.handleSetCharTalents}
                  talents={props.character.talents}
                  value={props.character.talents.talentLevel1}
                />
              </div>
            </td>
            <td className="talent-table__td">
              {getTalentMod(props.character.talents.talentLevel1)}
            </td>
            <td className="talent-table__td ut-align-center">
              {calcTalentLevel(
                props.character.aspect,
                props.character.talents.talentLevel1
              )}
            </td>
          </tr>
          {/*  --------------- 1st Level - If they're a Knave they get an extra talent -------------- */}
          {props.character.aspect === "knave" && (
            <tr className="talent-table__level--lvl1">
              <td className="talent-table__td talent-table__level--talent">
                <div
                  className={`aspect-icon aspect-icon--${getTalentAspect(
                    props.character.talents.talentKnave1
                  )}`}
                ></div>
                <TalentSelector
                  type="knaveSecond"
                  id="talentKnave1"
                  handleSetCharTalents={props.handleSetCharTalents}
                  talents={props.character.talents}
                  value={props.character.talents.talentKnave1}
                />
              </td>
              <td className="talent-table__td ut-align-center">
                {getTalentMod(props.character.talents.talentKnave1)}
              </td>
              <td className="talent-table__td ut-align-center">
                {calcTalentLevel(
                  props.character.aspect,
                  props.character.talents.talentKnave1
                )}
              </td>
            </tr>
          )}
          {/*  --------------- 1st Level - If they have a disad they get an extra talent  -------------- */}
          {props.character.disad1 !== "none" && (
            <tr className="talent-table__level--lvl1">
              <td className="talent-table__td">Disad 1</td>
              <td></td>
              <td className="talent-table__td talent-table__level--talent">
                <div
                  className={`aspect-icon aspect-icon--${getTalentAspect(
                    props.character.talents.talentDisad1
                  )}`}
                ></div>
                <TalentSelector
                  type="all"
                  id="talentDisad1"
                  talents={props.character.talents}
                  handleSetCharTalents={props.handleSetCharTalents}
                  value={props.character.talents.talentDisad1}
                />
              </td>
              <td className="talent-table__td ut-align-center">
                {getTalentMod(props.character.talents.talentDisad1)}
              </td>
              <td className="talent-table__td ut-align-center">
                {calcTalentLevel(
                  props.character.aspect,
                  props.character.talents.talentDisad1
                )}
              </td>
            </tr>
          )}
          {/*  --------------- 1st Level - If they have a second disad they get a seconmd extra talent  -------------- */}
          {props.character.disad2 !== "none" && (
            <tr className="talent-table__level--lvl1">
              <td className="talent-table__td ut-align-center">Disad 2</td>
              <td></td>
              <td className="talent-table__td talent-table__level--talent">
                <div
                  className={`aspect-icon aspect-icon--${getTalentAspect(
                    props.character.talents.talentDisad2
                  )}`}
                ></div>
                <TalentSelector
                  type="all"
                  id="talentDisad2"
                  talents={props.character.talents}
                  handleSetCharTalents={props.handleSetCharTalents}
                  value={props.character.talents.talentDisad2}
                />
              </td>
              <td className="talent-table__td ut-align-center">
                {getTalentMod(props.character.talents.talentDisad2)}
              </td>
              <td className="talent-table__td ut-align-center">
                {calcTalentLevel(
                  props.character.aspect,
                  props.character.talents.talentDisad2
                )}
              </td>
            </tr>
          )}

          {/*  --------------- All the other levels   -------------- */}
          {levelsData
            .filter((i) => i.level > 1)
            .map((i) => (
              <tr
                key={i.level}
                className={
                  i.level % 2 === 0
                    ? `talent-table__tr--zebra-gray  talent-table__level--lvl${i.level}`
                    : `talent-table__tr--zebra-white  talent-table__level--lvl${i.level}`
                }
              >
                <td className="talent-table__td">
                  {formatNumberSuffix(i.level)}
                </td>
                <td className="talent-table__td">
                  {i.hitDice}d{props.character.hitDiceType}
                  {i.hitDiceBonus && <span>+{i.hitDiceBonus}</span>}
                </td>

                {i.getsTalent ? (
                  <Fragment>
                    <td className="talent-table__td talent-table__level--talent">
                      <div
                        className={`aspect-icon aspect-icon--${getTalentAspect(
                          props.character.talents[`talentLevel${i.level}`]
                        )}`}
                      ></div>
                      <TalentSelector
                        type="all"
                        id={`talentLevel${i.level}`}
                        talents={props.character.talents}
                        handleSetCharTalents={props.handleSetCharTalents}
                        value={props.character.talents[`talentLevel${i.level}`]}
                      />
                    </td>
                    <td className="talent-table__td ut-align-center">
                      {getTalentMod(
                        props.character.talents[`talentLevel${i.level}`]
                      )}
                    </td>
                    <td className="talent-table__td ut-align-center">
                      {calcTalentLevel(
                        props.character.aspect,
                        props.character.talents[`talentLevel${i.level}`]
                      )}
                    </td>
                  </Fragment>
                ) : (
                  <Fragment>
                    <td className="talent-table__td">&nbsp;</td>
                    <td className="talent-table__td">&nbsp;</td>
                    <td className="talent-table__td">&nbsp;</td>
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
