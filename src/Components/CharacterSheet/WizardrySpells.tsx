import React from "react";
import {
  spellData,
  spellSlots,
  wizardryList,
  magicSchoolsData,
} from "../../Data/indexRefactor";
import { formatNumberSuffix } from "../Utilities";
import { useCharacter } from "../../context/CharacterContext";
import type { SpellSelection } from "../../types";

const WizardrySpells = () => {
  const { character, dispatch } = useCharacter();
  const {
    level,
    wizardLevel,
    wizardrySchools,
    wizardry2StartLevel,
    wizardry3StartLevel,
    wizardrySpells,
  } = character;

  const spellCount = spellSlots[wizardLevel - 1];
  const isWizardryThreeActive =
    wizardry3StartLevel > 0 && level >= wizardry3StartLevel;

  // Derived — no local state needed
  // magicSchools with isDisabled computed from wizardrySchools
  const magicSchools = magicSchoolsData.map((school) => ({
    ...school,
    isDisabled: wizardrySchools.includes(school.name) && !isWizardryThreeActive,
  }));

  const wizardryNeedsToChooseSchool =
    !isWizardryThreeActive &&
    !wizardrySchools.some((s) => s !== "Choose" && s !== "");

  const handleSetSchool = (
    e: React.ChangeEvent<HTMLSelectElement>,
    schoolIndex: number,
  ) => {
    const newSchools: [string, string] = [...wizardrySchools] as [
      string,
      string,
    ];
    newSchools[schoolIndex] = e.target.value;
    dispatch({
      type: "SET_INPUT_CHANGE",
      payload: {
        name: "wizardrySchools",
        value: newSchools as unknown as string,
      },
    });
  };

  const handleAssignSpell = (
    spellName: string,
    levelIndex: number,
    slotIndex: number,
  ) => {
    if (spellName === "") {
      dispatch({
        type: "SET_WIZARDRY_SPELL",
        payload: { levelIndex, slotIndex, spell: null },
      });
      return;
    }

    const data = spellData[spellName];
    if (!data) return;

    const spell: SpellSelection = {
      name: spellName,
      cast: data.cast,
      range: data.range,
      target: data.target,
      duration: data.duration,
      school: data.school,
      components: data.components,
      save: data.save,
    };

    dispatch({
      type: "SET_WIZARDRY_SPELL",
      payload: { levelIndex, slotIndex, spell },
    });
  };

  const getAvailableSpells = (levelIndex: number): string[] => {
    return wizardryList[levelIndex].filter((spellName) => {
      if (isWizardryThreeActive) return true;
      const school = spellData[spellName]?.school;
      if (!school) return false;
      return wizardrySchools.some((s) => school.includes(s));
    });
  };

  const renderSpellRow = (levelIndex: number, slotIndex: number) => {
    const availableSpells = getAvailableSpells(levelIndex);
    const spell = wizardrySpells[levelIndex]?.[slotIndex] ?? null;

    return (
      <tr key={`${levelIndex}-${slotIndex}`} className="char-sheet__table__row">
        <td className="char-sheet__table__cell char-sheet__table__cell--level">
          {formatNumberSuffix(levelIndex + 1)}
        </td>
        <td className="char-sheet__table__cell char-sheet__table__cell--name char-sheet__table__cell--spell-name">
          <select
            value={spell ? spell.name : ""}
            onChange={(e) =>
              handleAssignSpell(e.target.value, levelIndex, slotIndex)
            }
            className="char-sheet__select"
            aria-label={`Choose spell for level ${levelIndex + 1} slot ${slotIndex + 1}`}
          >
            <option value="">Select Spell</option>
            {availableSpells.map((spellName) => (
              <option key={spellName} value={spellName}>
                {spellName}
              </option>
            ))}
          </select>
        </td>
        <td className="char-sheet__table__cell">{spell?.cast ?? ""}</td>
        <td className="char-sheet__table__cell">{spell?.duration ?? ""}</td>
        <td className="char-sheet__table__cell">{spell?.range ?? ""}</td>
        <td className="char-sheet__table__cell">{spell?.target ?? ""}</td>
        <td className="char-sheet__table__cell">{spell?.components ?? ""}</td>
        <td className="char-sheet__table__cell">{spell?.save ?? ""}</td>
        <td className="char-sheet__table__cell">
          {spell?.school?.map((color) => (
            <div key={color} className={`icon-school icon-school--${color}`}>
              <span className="ut-only-sr">{color} school of magic</span>
            </div>
          ))}
        </td>
      </tr>
    );
  };

  const renderSchoolSelector = (index: 0 | 1, label: string) => (
    <label className="wizardry-school-selector">
      <span className="label label--inline">{label}: </span>
      <div
        className={`icon-school icon-school--${wizardrySchools[index]}`}
        aria-hidden="true"
      >
        <span className="ut-only-sr">
          {wizardrySchools[index]} school of magic
        </span>
      </div>
      <select
        name={`wizardry${index + 1}school`}
        value={wizardrySchools[index]}
        onChange={(e) => handleSetSchool(e, index)}
        aria-label={label}
      >
        <option value="">Choose</option>
        {magicSchools.map((school) => (
          <option
            key={school.id}
            value={school.name}
            disabled={school.isDisabled}
          >
            {school.name}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <section className="char-sheet__section char-sheet__section--spells">
      <div className="wizardry-school-selectors">
        {/* Wizardry 1 school — hidden if Wizardry 3 is active */}
        {!isWizardryThreeActive && renderSchoolSelector(0, "Wizardry 1 School")}

        {/* Wizardry 2 school — only if Wizardry 2 talent taken and Wizardry 3 not active */}
        {wizardry2StartLevel > 0 &&
          level >= wizardry2StartLevel &&
          !isWizardryThreeActive &&
          renderSchoolSelector(1, "Wizardry 2 School")}
      </div>

      {/* Wizardry 3 — show all schools */}
      {isWizardryThreeActive && (
        <div>
          <span className="label label--inline">All Schools: </span>
          {magicSchoolsData.map((school) => (
            <div
              key={school.id}
              className={`icon-school icon-school--${school.name}`}
              aria-hidden="true"
            >
              <span className="ut-only-sr">{school.name} school of magic</span>
            </div>
          ))}
        </div>
      )}

      <div className="ut-position-relative">
        {wizardryNeedsToChooseSchool && (
          <div
            className="char-sheet__table__cta"
            role="status"
            aria-live="polite"
          >
            Select a Wizardry School before choosing spells
          </div>
        )}
        <table className="char-sheet__table char-sheet__table--wizardry">
          <caption className="char-sheet__table__caption char-sheet__table__caption--wizardry">
            Wizardry Spells
            <span className="ut-text-primary ut-margin-left-xs">
              - At {formatNumberSuffix(wizardLevel)} level
            </span>
          </caption>
          <thead>
            <tr>
              <th
                className="char-sheet__table__header char-sheet__table__header--wizardry"
                scope="col"
              >
                Level
              </th>
              <th
                className="char-sheet__table__header char-sheet__table__header--wizardry"
                scope="col"
              >
                Name
              </th>
              <th
                className="char-sheet__table__header char-sheet__table__header--wizardry"
                scope="col"
              >
                Cast
              </th>
              <th
                className="char-sheet__table__header char-sheet__table__header--wizardry"
                scope="col"
              >
                Duration
              </th>
              <th
                className="char-sheet__table__header char-sheet__table__header--wizardry"
                scope="col"
              >
                Range
              </th>
              <th
                className="char-sheet__table__header char-sheet__table__header--wizardry"
                scope="col"
              >
                Target
              </th>
              <th
                className="char-sheet__table__header char-sheet__table__header--wizardry"
                scope="col"
              >
                Components
              </th>
              <th
                className="char-sheet__table__header char-sheet__table__header--wizardry"
                scope="col"
              >
                Save
              </th>
              <th
                className="char-sheet__table__header char-sheet__table__header--wizardry"
                scope="col"
              >
                School
              </th>
            </tr>
          </thead>
          <tbody>
            {spellCount.map((count, i) => {
              if (count === "-") return null;
              return Array.from({ length: count as number }, (_, j) =>
                renderSpellRow(i, j),
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default WizardrySpells;
