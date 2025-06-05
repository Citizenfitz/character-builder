import React, { useEffect, useState } from "react";
import { spellData, spellSlots, thaumaturgyList } from "../../Data";
import { formatNumberSuffix } from "../Utilities";

const defaultSpellList = [[], [], [], [], [], [], []];

export default function ThaumaturgySpells(props) {
  const { level, wisStat, useLocalStorage } = props;
  const spellCount = spellSlots[level - 1];
  const [spellList, setSpellList] = useState(defaultSpellList);
  const [isOpen, setOpen] = useState(false);
  const [spellLevel, setSpellLevel] = useState(0);
  const [spellSlot, setSpellSlot] = useState(0);

  useEffect(() => {
    if (useLocalStorage) {
      const localData = JSON.parse(localStorage.getItem("thaumaturgySpells"));
      if (localData) {
        setSpellList(localData);
      }
    }
  }, [useLocalStorage]);

  useEffect(() => {
    if (useLocalStorage) {
      localStorage.setItem("thaumaturgySpells", JSON.stringify(spellList));
    }
  }, [spellList, useLocalStorage]);

  // const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false);

  const selectSpell = (level, slot) => {
    setOpen(true);
    setSpellLevel(level + 1);
    setSpellSlot(slot);
  };

  const handleAssignSpell = (spellName, levelIndex, slotIndex) => {
    const newSpellList = [...spellList];
    if (spellName === "") {
      newSpellList[levelIndex][slotIndex] = undefined;
    } else {
      newSpellList[levelIndex][slotIndex] = {
        name: spellName,
        ...spellData[spellName],
      };
    }
    setSpellList(newSpellList);
  };

  const renderSpellRow = (levelIndex, slotIndex) => {
    const availableSpells = thaumaturgyList[levelIndex];
    const spell =
      spellList[levelIndex] && spellList[levelIndex][slotIndex]
        ? spellList[levelIndex][slotIndex]
        : undefined;

    return (
      <tr key={slotIndex} className="char-sheet__table__row">
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
      </tr>
    );
  };

  const addBonusSpell = (i, j) => {
    if (spellList[0][spellCount[0]]) {
      return renderSpellRow(0, spellCount[0]);
    } else {
      return renderSpellRow(0, spellCount[0]);
    }
  };

  return (
    <section className="char-sheet__section char-sheet__section--spells">
      {/*<h2 className="char-sheet__h2">
        Thaumaturgy Spells
        <span className="ut-text-explain ut-margin-left-half-em">
          - At {formatNumberSuffix(level)} level
          {wisStat > 12 && (
            <span> plus one extra 1st level spell for 13+ WIS</span>
          )}
        </span>
      </h2>*/}
      <table className="char-sheet__table char-sheet__table--thaumaturgy">
        <caption className="char-sheet__table__caption char-sheet__table__caption--thaumaturgy">
          Thaumaturgy Spells
          <span className="ut-text-primary ut-margin-left-xs">
            - At {formatNumberSuffix(level)} level
            {wisStat > 12 && (
              <span> plus one extra 1st level spell for 13+ WIS</span>
            )}
          </span>
        </caption>
        <thead>
          <tr>
            <th className="char-sheet__table__header char-sheet__table__header--thaumaturgy">
              Level
            </th>
            {/* <th>School</th> */}
            <th className="char-sheet__table__header char-sheet__table__header--thaumaturgy">
              Name
            </th>
            <th className="char-sheet__table__header char-sheet__table__header--thaumaturgy">
              Cast
            </th>
            <th className="char-sheet__table__header char-sheet__table__header--thaumaturgy">
              Duration
            </th>
            <th className="char-sheet__table__header char-sheet__table__header--thaumaturgy">
              Range
            </th>
            <th className="char-sheet__table__header char-sheet__table__header--thaumaturgy">
              Target
            </th>
            <th className="char-sheet__table__header char-sheet__table__header--thaumaturgy">
              Components
            </th>
            <th className="char-sheet__table__header char-sheet__table__header--thaumaturgy">
              Save
            </th>
          </tr>
        </thead>
        <tbody>
          {wisStat >= 13 && addBonusSpell()}
          {spellCount.map((count, i) => {
            if (count === "-") return false;
            // create empty array to map over - for loops doen't work here
            const index = Array.from(Array(count));
            return index.map((empty, j) => {
              // one bonus level one spell if wis is greater than 13
              let row;
              if (spellList && spellList[i].length > 0) {
                if (spellList[i][j]) {
                  row = renderSpellRow(i, j);
                } else {
                  row = renderSpellRow(i, j);
                }
              } else {
                row = renderSpellRow(i, j);
              }
              return row;
            });
          })}
        </tbody>
      </table>
    </section>
  );
}
