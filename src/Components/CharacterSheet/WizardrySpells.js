import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  spellData,
  spellSlots,
  wizardryList,
  magicSchoolsData,
} from "../../Data";
import { formatNumberSuffix } from "../Utilities";

const defaultSpellList = [[], [], [], [], [], [], []];

Modal.setAppElement("#root");

export default function WizardrySpells(props) {
  const {
    charLevel,
    wizLevel,
    intStat,
    wizardrySchools,
    wizardry2StartLevel,
    wizardry3StartLevel,
    setWizardSchool,
  } = props;
  const spellCount = spellSlots[wizLevel - 1];
  const [spellList, setSpellList] = useState(defaultSpellList);
  const [spellLevel, setSpellLevel] = useState(0);
  const [spellSlot, setSpellSlot] = useState(0);
  const [magicSchools, setMagicSchools] = useState(magicSchoolsData);
  // todo: remove setManageSchool when new one working

  const [wizardryNeedsToChooseSchool, setWizardryNeedsToChooseSchool] =
    useState(true);

  // listen for change in wizardrySchools and adjust dropdowns, selected spells, and CTA
  useEffect(() => {
    if (wizardrySchools) {
      // if nothing is choosen, set CTA to true
      // handle disabled dropdowns by setting chosen colors to disabled
      let needsSchooling = true;
      let tempArray = magicSchools;
      for (let index = 0; index < magicSchools.length; index++) {
        if (wizardrySchools.includes(magicSchools[index].name)) {
          needsSchooling = false;
          tempArray[index].isDisabled = true;
        } else {
          tempArray[index].isDisabled = false;
        }
      }
      setWizardryNeedsToChooseSchool(needsSchooling);
      setMagicSchools(tempArray);

      // TODO remove only spells that aren't in characters wizardrySchools
      // For now removes ALL spells
      setSpellList(defaultSpellList);
      console.log(JSON.stringify(spellList));
    }
  }, [wizardrySchools, spellList]);

  useEffect(() => {
    if (wizardry3StartLevel > 0 && charLevel >= wizardry3StartLevel) {
      // Initialize with all spells if wizardry three is active
      refreshSpellOptions([]);
    } else {
      refreshSpellOptions(wizardrySchools);
    }
  }, [wizardrySchools, wizardry3StartLevel, charLevel]);

  const selectSpell = (wizLevel, slot) => {
    setSpellLevel(wizLevel + 1);
    setSpellSlot(slot);
  };

  const handleAssignSpell = (spellName, wizLevel, slot) => {
    const newSpellList = [...spellList];
    if (spellName === "") {
      // If the spell is deselected, set the slot to undefined or an empty object
      newSpellList[wizLevel][slot] = undefined;
    } else {
      newSpellList[wizLevel][slot] = {
        name: spellName,
        ...spellData[spellName],
      };
    }
    setSpellList(newSpellList);
  };

  const handleSetSchool = (e, schoolIndex) => {
    let value = e.target.value;
    setWizardSchool(value, schoolIndex);

    // Trigger a refresh of the spell list based on the new school
    const updatedSchools = [...wizardrySchools];
    updatedSchools[schoolIndex] = value;
    refreshSpellOptions(updatedSchools);
  };

  const refreshSpellOptions = (schools) => {
    const isWizardryThreeActive =
      wizardry3StartLevel > 0 && charLevel >= wizardry3StartLevel;

    const newSpellList = wizardryList.map((levelList, levelIndex) => {
      return levelList
        .filter((spellName) => {
          if (isWizardryThreeActive) {
            return true; // Include all spells
          } else {
            const spellSchools = spellData[spellName].school;
            return schools.some((school) => spellSchools.includes(school));
          }
        })
        .map((spellName) => ({
          name: spellName,
          ...spellData[spellName],
        }));
    });
    setSpellList(newSpellList);
  };

  const renderEmptyRow = (i, j) => {
    return (
      <tr key={j}>
        <td className="char-sheet__table__cell char-sheet__table__cell--level">
          {formatNumberSuffix(i + 1)}
        </td>
        <td className="char-sheet__table__cell char-sheet__table__cell--name char-sheet__table__cell--spell-name">
          {/* sets state for which spell slot is to be changed then opens modal */}
          <button
            onClick={() => selectSpell(i, j)}
            className="button char-sheet__button"
          >
            <i className="fas fa-bolt"></i> Choose Spell
          </button>
        </td>
        <td className="char-sheet__table__cell"></td>
        <td className="char-sheet__table__cell"></td>
        <td className="char-sheet__table__cell"></td>
        <td className="char-sheet__table__cell"></td>
        <td className="char-sheet__table__cell"></td>
        <td className="char-sheet__table__cell"></td>
        <td className="char-sheet__table__cell"></td>
      </tr>
    );
  };

  const renderSpellRow = (i, j) => {
    // Check if wizardry three is active and character level is sufficient
    const isWizardryThreeActive =
      wizardry3StartLevel > 0 && charLevel >= wizardry3StartLevel;

    const availableSpells = wizardryList[i].filter((spellName) => {
      // If wizardry three is active, include all spells, otherwise filter by selected schools
      if (isWizardryThreeActive) {
        return true; // Include all spells
      } else {
        const intersection = wizardrySchools.filter((element) =>
          spellData[spellName].school.includes(element)
        );
        return intersection.length > 0;
      }
    });

    const spell = spellList[i] && spellList[i][j] ? spellList[i][j] : undefined;

    return (
      <tr key={j}>
        <td className="char-sheet__table__cell char-sheet__table__cell--level">
          {formatNumberSuffix(i + 1)}
        </td>
        <td className="char-sheet__table__cell char-sheet__table__cell--name char-sheet__table__cell--spell-name">
          <select
            value={spell ? spell.name : ""}
            onChange={(e) => handleAssignSpell(e.target.value, i, j)}
            className="char-sheet__select"
          >
            <option value="">Select Spell</option>
            {availableSpells.map((spellName) => (
              <option key={spellName} value={spellName}>
                {spellName}
              </option>
            ))}
          </select>
        </td>
        <td className="char-sheet__table__cell">{spell ? spell.cast : ""}</td>
        <td className="char-sheet__table__cell">
          {spell ? spell.duration : ""}
        </td>
        <td className="char-sheet__table__cell">{spell ? spell.range : ""}</td>
        <td className="char-sheet__table__cell">{spell ? spell.target : ""}</td>
        <td className="char-sheet__table__cell">
          {spell ? spell.components : ""}
        </td>
        <td className="char-sheet__table__cell">{spell ? spell.save : ""}</td>
        <td className="char-sheet__table__cell">
          {spell &&
            spell.school.map((color) => (
              <div key={color} className={`icon-school icon-school--${color}`}>
                <span className="ut-only-sr">{color} school of magic</span>
              </div>
            ))}
        </td>
      </tr>
    );
  };

  return (
    <section className="char-sheet__section char-sheet__section--spells">
      <div className="wizardry-school-selectors">
        {/* If they don't have Wizardry three or its above level, allow them to pick character wiz1 school */}
        {(wizardry3StartLevel === 0 || charLevel < wizardry3StartLevel) && (
          <label className="wizardry-school-selector">
            <span className="label label--inline">Wizardy 1 School: </span>
            <div className={`icon-school icon-school--${wizardrySchools[0]}`}>
              <span className="ut-only-sr">
                {wizardrySchools[0]} school of magic
              </span>
            </div>
            <select
              name="wizardry1school"
              value={wizardrySchools[0]}
              onChange={(e) => handleSetSchool(e, 0)}
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
        )}
        {/* If they don't have Wizardry three & wiz is within char's level, allow them to pick character wiz2 school */}
        {wizardry2StartLevel > 0 &&
          charLevel >= wizardry2StartLevel &&
          wizardry3StartLevel === 0 && (
            <label className="wizardry-school-selector">
              <span className="label label--inline">Wizardy 2 School: </span>
              <div className={`icon-school icon-school--${wizardrySchools[1]}`}>
                <span className="ut-only-sr">
                  {wizardrySchools[1]} school of magic
                </span>
              </div>
              <select
                name="wizardry2school"
                value={wizardrySchools[1]}
                onChange={(e) => handleSetSchool(e, 1)}
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
          )}
      </div>
      {/* If they have wiz3 &  wiz3 is within level, then just show all the schools */}
      {wizardry3StartLevel > 0 && charLevel >= wizardry3StartLevel && (
        <div>
          <span className="label label--inline">All Schools: </span>
          {magicSchools.map((school) => (
            <div className={`icon-school icon-school--${school.name}`}>
              <span className="ut-only-sr">{school.name} school of magic</span>
            </div>
          ))}
        </div>
      )}

      <div className="ut-position-relative">
        {/* show this if they need to choose at least one wizardry school */}
        {wizardryNeedsToChooseSchool && (
          <div className="char-sheet__table__cta">
            Select a Wizardry School before choosing spells
          </div>
        )}
        <table className="char-sheet__table char-sheet__table--wizardry">
          <caption className="char-sheet__table__caption char-sheet__table__caption--wizardry">
            Wizardry Spells
            <span className="ut-text-explain ut-margin-left-half-em">
              - At {formatNumberSuffix(wizLevel)} level
            </span>
          </caption>
          <thead>
            <tr>
              <th className="char-sheet__table__header char-sheet__table__header--wizardry">
                Level
              </th>
              <th className="char-sheet__table__header char-sheet__table__header--wizardry">
                Name
              </th>
              <th className="char-sheet__table__header char-sheet__table__header--wizardry">
                Cast
              </th>
              <th className="char-sheet__table__header char-sheet__table__header--wizardry">
                Duration
              </th>
              <th className="char-sheet__table__header char-sheet__table__header--wizardry">
                Range
              </th>
              <th className="char-sheet__table__header char-sheet__table__header--wizardry">
                Target
              </th>
              <th className="char-sheet__table__header char-sheet__table__header--wizardry">
                Components
              </th>
              <th className="char-sheet__table__header char-sheet__table__header--wizardry">
                Save
              </th>
              <th className="char-sheet__table__header char-sheet__table__header--wizardry">
                School
              </th>
            </tr>
          </thead>
          <tbody>
            {spellCount.map((count, i) => {
              if (count === "-") return false;
              return Array.from({ length: count }, (_, j) =>
                renderSpellRow(i, j)
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
