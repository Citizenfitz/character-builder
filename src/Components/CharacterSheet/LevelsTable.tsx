import React, { Fragment } from "react";
import { levelsData, talentData } from "../../Data/indexRefactor";
import TalentSelector from "./TalentSelector";
import {
  formatNumberSuffix,
  calcTalentLevel,
  calcTalentLevelNumber,
} from "../Utilities";
import { useCharacter } from "../../context/CharacterContext";
import type { Talents } from "../../types";

const LevelsTable = () => {
  const { character } = useCharacter();
  const { aspect, level, hitDiceType, talents, disad1, disad2 } = character;

  const getTalentMod = (talentName: string): string => {
    if (talentName === "choose") return "-";

    const talentIndex = talentData.findIndex((x) => x.name === talentName);
    if (talentIndex < 0) return "-";

    const talent = talentData[talentIndex];
    if (talent.isRollable === false) return "-";

    const levelMod = calcTalentLevelNumber(aspect, talentName, level);
    const talentMod = talent.mod === "none" ? "" : ` and ${talent.mod}`;
    return `+ ${levelMod}${talentMod}`;
  };

  const getTalentAspect = (talentName: string): string => {
    if (talentName === "choose") return "-";
    const talent = talentData.find((x) => x.name === talentName);
    return talent?.aspect ?? "-";
  };

  const talentKey = (lvl: number) => `talentLevel${lvl}` as keyof Talents;

  return (
    <div>
      <table className={`char-sheet__table char-sheet__table__level--${level}`}>
        <caption className="char-sheet__table__caption">
          Character Levels
        </caption>
        <thead>
          <tr>
            <th className="char-sheet__table__header" scope="col">
              Level
            </th>
            <th className="char-sheet__table__header" scope="col">
              HD
            </th>
            <th
              className="char-sheet__table__header char-sheet__table__header--talent"
              scope="col"
            >
              Talent
            </th>
            <th className="char-sheet__table__header" scope="col">
              Talent Roll Mod
            </th>
            <th className="char-sheet__table__header" scope="col">
              Class/Adj/Opp
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 1st Level - Combat talent (always) */}
          <tr
            className={
              level === 1
                ? "char-sheet__table__row table-row--highlight"
                : "char-sheet__table__row"
            }
          >
            <td
              rowSpan={aspect === "rogue" ? 4 : 3}
              className="char-sheet__table__cell"
            >
              1st
            </td>
            <td
              rowSpan={aspect === "rogue" ? 4 : 3}
              className="char-sheet__table__cell"
            >
              1d{hitDiceType}
            </td>
            <td className="char-sheet__table__cell char-sheet__table__cell--talent">
              <div
                className="icon-aspect icon-aspect--fighter"
                aria-hidden="true"
              />
              <span className="talentAssigned">{talents.talentAssigned1}</span>
            </td>
            <td className="char-sheet__table__cell">
              {getTalentMod(talents.talentAssigned1)}
            </td>
            <td className="char-sheet__table__cell">
              {calcTalentLevel(aspect, talents.talentAssigned1)}
            </td>
          </tr>

          {/* 1st Level - Assigned based on class */}
          <tr className="char-sheet__table__row char-sheet__table__level--lvl1">
            <td className="char-sheet__table__cell char-sheet__table__cell--talent">
              <div
                className={`icon-aspect icon-aspect--${getTalentAspect(talents.talentAssigned2)}`}
                aria-hidden="true"
              />
              <span className="talentAssigned">{talents.talentAssigned2}</span>
            </td>
            <td className="char-sheet__table__cell ut-align-center">
              {getTalentMod(talents.talentAssigned2)}
            </td>
            <td className="char-sheet__table__cell ut-align-center">
              {calcTalentLevel(aspect, talents.talentAssigned2)}
            </td>
          </tr>

          {/* 1st Level - Choose race or any talent */}
          <tr className="char-sheet__table__row char-sheet__table__level--lvl1">
            <td className="char-sheet__table__cell char-sheet__table__cell--talent">
              <div className="char-sheet__table__cell--talent-all-wrapper">
                <div
                  className={`icon-aspect icon-aspect--${getTalentAspect(talents.talentLevel1)}`}
                  aria-hidden="true"
                />
                <TalentSelector type="race" id="talentLevel1" />
              </div>
            </td>
            <td className="char-sheet__table__cell">
              {getTalentMod(talents.talentLevel1)}
            </td>
            <td className="char-sheet__table__cell ut-align-center">
              {calcTalentLevel(aspect, talents.talentLevel1)}
            </td>
          </tr>

          {/* 1st Level - Rogue bonus talent */}
          {aspect === "rogue" && (
            <tr className="char-sheet__table__row char-sheet__table__level--lvl1">
              <td className="char-sheet__table__cell char-sheet__table__cell--talent">
                <div
                  className={`icon-aspect icon-aspect--${getTalentAspect(talents.talentRogue1)}`}
                  aria-hidden="true"
                />
                <TalentSelector type="rogueSecond" id="talentRogue1" />
              </td>
              <td className="char-sheet__table__cell ut-align-center">
                {getTalentMod(talents.talentRogue1)}
              </td>
              <td className="char-sheet__table__cell ut-align-center">
                {calcTalentLevel(aspect, talents.talentRogue1)}
              </td>
            </tr>
          )}

          {/* Disad 1 bonus talent */}
          {disad1 !== "none" && (
            <tr className="char-sheet__table__row char-sheet__table__level--lvl1">
              <td className="char-sheet__table__cell">Disad 1</td>
              <td />
              <td className="char-sheet__table__cell char-sheet__table__cell--talent">
                <div
                  className={`icon-aspect icon-aspect--${getTalentAspect(talents.talentDisad1)}`}
                  aria-hidden="true"
                />
                <TalentSelector type="all" id="talentDisad1" />
              </td>
              <td className="char-sheet__table__cell ut-align-center">
                {getTalentMod(talents.talentDisad1)}
              </td>
              <td className="char-sheet__table__cell ut-align-center">
                {calcTalentLevel(aspect, talents.talentDisad1)}
              </td>
            </tr>
          )}

          {/* Disad 2 bonus talent */}
          {disad2 !== "none" && (
            <tr className="char-sheet__table__row char-sheet__table__level--lvl1">
              <td className="char-sheet__table__cell ut-align-center">
                Disad 2
              </td>
              <td />
              <td className="char-sheet__table__cell char-sheet__table__cell--talent">
                <div
                  className={`icon-aspect icon-aspect--${getTalentAspect(talents.talentDisad2)}`}
                  aria-hidden="true"
                />
                <TalentSelector type="all" id="talentDisad2" />
              </td>
              <td className="char-sheet__table__cell ut-align-center">
                {getTalentMod(talents.talentDisad2)}
              </td>
              <td className="char-sheet__table__cell ut-align-center">
                {calcTalentLevel(aspect, talents.talentDisad2)}
              </td>
            </tr>
          )}

          {/* All other levels */}
          {levelsData
            .filter((i) => i.level > 1)
            .map((i) => (
              <tr
                key={i.level}
                className={
                  i.level % 2 === 0
                    ? `char-sheet__table__row char-sheet__table__row--zebra char-sheet__table__level--lvl${i.level}`
                    : `char-sheet__table__level--lvl${i.level}`
                }
              >
                <td className="char-sheet__table__cell">
                  {formatNumberSuffix(i.level)}
                </td>
                <td className="char-sheet__table__cell">
                  {i.hitDice}d{hitDiceType}
                  {i.hitDiceBonus && <span>+{i.hitDiceBonus}</span>}
                </td>
                {i.getsTalent ? (
                  <>
                    <td className="char-sheet__table__cell char-sheet__table__cell--talent">
                      <div
                        className={`icon-aspect icon-aspect--${getTalentAspect(talents[talentKey(i.level)])}`}
                        aria-hidden="true"
                      />
                      <TalentSelector type="all" id={talentKey(i.level)} />
                    </td>
                    <td className="char-sheet__table__cell ut-align-center">
                      {getTalentMod(talents[talentKey(i.level)])}
                    </td>
                    <td className="char-sheet__table__cell ut-align-center">
                      {calcTalentLevel(aspect, talents[talentKey(i.level)])}
                    </td>
                  </>
                ) : (
                  <>
                    <td className="char-sheet__table__cell">&nbsp;</td>
                    <td className="char-sheet__table__cell">&nbsp;</td>
                    <td className="char-sheet__table__cell">&nbsp;</td>
                  </>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LevelsTable;
