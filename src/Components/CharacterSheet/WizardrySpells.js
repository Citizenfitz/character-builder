import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  spellData,
  spellSlots,
  wizardryList,
  magicSchoolsData,
} from "../../Data";
import { formatNumberSuffix } from "../Utilities";
import SpellSlotsModal from "./SpellSlotsModal";

const defaultSpellList = [[], [], [], [], [], [], []];

Modal.setAppElement("#root");

export default function WizardrySpells(props) {
  const {
    charLevel,
    wizLevel,
    intStat,
    wizardrySchools,
    useLocalStorage,
    wizardry2StartLevel,
    wizardry3StartLevel,
    setWizardSchool,
  } = props;
  const spellCount = spellSlots[wizLevel - 1];
  const [spellList, setSpellList] = useState(defaultSpellList);
  const [isOpen, setOpen] = useState(false);
  const [spellLevel, setSpellLevel] = useState(0);
  const [spellSlot, setSpellSlot] = useState(0);
  const [magicSchools, setMagicSchools] = useState(magicSchoolsData);
  // todo: remove setManageSchool when new one working

  const [showAll, setShowAll] = useState(false);
  const [wizardryNeedsToChooseSchool, setWizardryNeedsToChooseSchool] =
    useState(true);

  useEffect(() => {
    if (useLocalStorage) {
      const localData = JSON.parse(localStorage.getItem("wizardrySpells"));
      if (localData) {
        setSpellList(localData);
      }
    }
  }, [useLocalStorage]);

  useEffect(() => {
    if (useLocalStorage) {
      localStorage.setItem("wizardrySpells", JSON.stringify(spellList));
    }
  }, [spellList, useLocalStorage]);

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

  // const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false);

  const selectSpell = (wizLevel, slot) => {
    setOpen(true);
    setSpellLevel(wizLevel + 1);
    setSpellSlot(slot);
  };

  const handleAssignSpell = (spellName) => {
    const newSpellList = { ...spellList };
    newSpellList[spellLevel - 1][spellSlot] = {
      name: spellName,
      ...spellData[spellName],
    };
    setSpellList(newSpellList);
    setOpen(false);
  };

  const handleSetSchool = (e, schoolIndex) => {
    let value;
    if (e.target) {
      value = e.target.value;
    }
    setWizardSchool(value, schoolIndex);
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
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
    return (
      <tr key={j}>
        <td className="char-sheet__table__cell char-sheet__table__cell--level">
          {formatNumberSuffix(i + 1)}
        </td>
        <td className="char-sheet__table__cell char-sheet__table__cell--name char-sheet__table__cell--spell-name">
          <button
            onClick={() => selectSpell(i, j)}
            className="char-sheet__button char-sheet__button--spell"
          >
            {spellList[i][j].name}
          </button>
        </td>
        <td className="char-sheet__table__cell">{spellList[i][j].cast}</td>
        <td className="char-sheet__table__cell">{spellList[i][j].duration}</td>
        <td className="char-sheet__table__cell">{spellList[i][j].range}</td>
        <td className="char-sheet__table__cell">{spellList[i][j].target}</td>
        <td className="char-sheet__table__cell">
          {spellList[i][j].components}
        </td>
        <td className="char-sheet__table__cell">{spellList[i][j].save}</td>
        <td className="char-sheet__table__cell">
          {spellList[i][j].school.map((color) => (
            <div key={color} className={`icon-school icon-school--${color}`}>
              <span className="ut-only-sr">{color} school of magic</span>
            </div>
          ))}
        </td>
      </tr>
    );
  };

  const addBonusSpell = () => {
    if (spellList[0][spellCount[0]]) {
      return renderSpellRow(0, spellCount[0]);
    } else {
      return renderEmptyRow(0, spellCount[0]);
    }
  };

  return (
    <section className="char-sheet__section char-sheet__section--spells">
      {/*<h2 className="char-sheet__h2">
        Wizardry Spells
        <span className="ut-text-explain ut-margin-left-half-em">
          - At {formatNumberSuffix(wizLevel)} level
          {intStat > 12 && (
            <span> plus one extra 1st level spell for 13+ INT</span>
          )}
        </span>
      </h2>*/}
      {/* If they don't have Wizardry three or its above level,  allow them to pick character wiz1 school */}
      {(wizardry3StartLevel === 0 || charLevel < wizardry3StartLevel) && (
        <label className="ut-display-inine-block ut-margin-right-2em ut-no-print">
          <span className="label">Wizardy 1 School: </span>
          <div
            className={`ut-margin-right-half-em icon-school icon-school--${wizardrySchools[0]}`}
          >
            <span className="ut-only-sr">
              {wizardrySchools[0]} school of magic
            </span>
          </div>
          <select
            name="wizardry1school"
            className="ut-no-print"
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
          <div className="ut-no-screen print-text-input">
            {wizardrySchools[0]}
          </div>
        </label>
      )}
      {/* If they don't have Wizardry three & wiz is within char's level, allow them to pick character wiz2 school */}
      {wizardry2StartLevel > 0 &&
        charLevel >= wizardry2StartLevel &&
        wizardry3StartLevel === 0 && (
          <label className="ut-display-inine-block ut-no-print">
            <span className="label">Wizardy 2 School: </span>
            <div
              className={`ut-margin-right-half-em  icon-school icon-school--${wizardrySchools[1]}`}
            >
              <span className="ut-only-sr">
                {wizardrySchools[1]} school of magic
              </span>
            </div>
            <select
              name="wizardry2school"
              className="ut-no-print"
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
            <div className="ut-no-screen print-text-input">
              {wizardrySchools[1]}
            </div>
          </label>
        )}
      {/* If they have wiz3 &  wiz3 is within level, then just show all the schools */}
      {wizardry3StartLevel > 0 && charLevel >= wizardry3StartLevel && (
        <div>
          <span className="label">All Schools: </span>
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
        <table className="char-sheet__table">
          <caption className="char-sheet__table__caption char-sheet__table__caption--wizardry">
            Wizardry Spells
            <span className="ut-text-explain ut-margin-left-half-em">
              - At {formatNumberSuffix(wizLevel)} level
              {intStat > 12 && (
                <span> plus one extra 1st level spell for 13+ INT</span>
              )}
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
            {intStat >= 13 && addBonusSpell()}
            {spellCount.map((count, i) => {
              if (count === "-") return false;
              // create empty array to map over - for loops doen't work here
              const index = Array.from(Array(count));
              return index.map((empty, j) => {
                // one bonus level one spell if wis is greater than 13
                if (spellList && spellList[i].length > 0) {
                  if (spellList[i][j]) {
                    return renderSpellRow(i, j);
                  } else {
                    return renderEmptyRow(i, j);
                  }
                } else {
                  return renderEmptyRow(i, j);
                }
              });
            })}
          </tbody>
        </table>
      </div>
      {/*  The modal for choosing spells */}
      <Modal
        id="modal--wizardrySpells"
        className="modal ut-no-print"
        overlayClassName="modal-overlay"
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Spell Slots"
      >
        <header className="modal__header">
          <h2 className="modal__h2">Choose Your Spell</h2>
          <button
            className="modal__header-button char-sheet__button"
            aria-label="Close modal"
            onClick={closeModal}
          >
            X
          </button>
        </header>
        <div className="modal__body">
          {/*  If they have Wiz 3 don't show toggle all button */}
          {(wizardry3StartLevel === 0 || charLevel < wizardry3StartLevel) && (
            <button
              className="showAll char-sheet__button"
              onClick={toggleShowAll}
            >
              {showAll ? "Show Available Spells" : "Show All Spells"}
            </button>
          )}
          <table className="char-sheet__table">
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
              {spellLevel &&
                wizardryList[spellLevel - 1].map((spellName, i) => {
                  const intersection = wizardrySchools.filter((element) =>
                    spellData[spellName].school.includes(element)
                  );
                  // console.log(`intersection`, intersection, 'on', spellName)
                  const hasSchool = intersection.length > 0;
                  if (showAll || hasSchool) {
                    return (
                      <tr
                        key={i}
                        className={`char-sheet__table__row ${
                          !hasSchool
                            ? "char-sheet__table__row--unavailable"
                            : ""
                        }`}
                      >
                        <td className="char-sheet__table__cell char-sheet__table__cell--level">
                          {spellLevel}
                        </td>
                        <td className="char-sheet__table__cell char-sheet__table__cell--name char-sheet__table__cell--spell-name">
                          <button
                            className="showAll char-sheet__button"
                            onClick={() => handleAssignSpell(spellName)}
                          >
                            {spellName}
                          </button>
                        </td>
                        <td className="char-sheet__table__cell">
                          {spellData[spellName].cast}
                        </td>
                        <td className="char-sheet__table__cell">
                          {spellData[spellName].duration}
                        </td>
                        <td className="char-sheet__table__cell">
                          {spellData[spellName].range}
                        </td>
                        <td className="char-sheet__table__cell">
                          {spellData[spellName].target}
                        </td>
                        <td className="char-sheet__table__cell">
                          {spellData[spellName].components}
                        </td>
                        <td className="char-sheet__table__cell">
                          {spellData[spellName].save}
                        </td>
                        <td className="char-sheet__table__cell">
                          {spellData[spellName].school.map((color) => (
                            <div
                              key={color}
                              className={`icon-school icon-school--${color}`}
                            >
                              <span className="ut-only-sr">
                                {color} school of magic
                              </span>
                            </div>
                          ))}
                        </td>
                      </tr>
                    );
                  }
                  return false;
                })}
            </tbody>
          </table>
        </div>
      </Modal>
    </section>
  );
}
