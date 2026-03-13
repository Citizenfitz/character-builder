import React from "react";
import { spellData, spellSlots, prayersList } from "../../Data/indexRefactor";
import { formatNumberSuffix } from "../Utilities";
import { useCharacter } from "../../context/CharacterContext";
import type { SpellSelection } from "../../types";

const PrayersSpells = () => {
  const { character, dispatch } = useCharacter();
  const { priestLevel, prayerSpells, attributes } = character;
  const wisStat = attributes.wisdom.total;
  const spellCount = spellSlots[priestLevel - 1];

  const handleAssignSpell = (
    spellName: string,
    levelIndex: number,
    slotIndex: number,
  ) => {
    if (spellName === "") {
      dispatch({
        type: "SET_PRAYER_SPELL",
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
      type: "SET_PRAYER_SPELL",
      payload: { levelIndex, slotIndex, spell },
    });
  };

  const renderSpellRow = (levelIndex: number, slotIndex: number) => {
    const availableSpells = prayersList[levelIndex];
    const spell = prayerSpells[levelIndex]?.[slotIndex] ?? null;

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
      </tr>
    );
  };

  return (
    <section className="char-sheet__section char-sheet__section--spells">
      <table className="char-sheet__table char-sheet__table--prayers">
        <caption className="char-sheet__table__caption char-sheet__table__caption--prayers">
          Prayers Spells
          <span className="ut-text-primary ut-margin-left-xs">
            - At {formatNumberSuffix(priestLevel)} level
            {wisStat > 12 && (
              <span> plus one extra 1st level spell for 13+ WIS</span>
            )}
          </span>
        </caption>
        <thead>
          <tr>
            <th
              className="char-sheet__table__header char-sheet__table__header--prayers"
              scope="col"
            >
              Level
            </th>
            <th
              className="char-sheet__table__header char-sheet__table__header--prayers"
              scope="col"
            >
              Name
            </th>
            <th
              className="char-sheet__table__header char-sheet__table__header--prayers"
              scope="col"
            >
              Cast
            </th>
            <th
              className="char-sheet__table__header char-sheet__table__header--prayers"
              scope="col"
            >
              Duration
            </th>
            <th
              className="char-sheet__table__header char-sheet__table__header--prayers"
              scope="col"
            >
              Range
            </th>
            <th
              className="char-sheet__table__header char-sheet__table__header--prayers"
              scope="col"
            >
              Target
            </th>
            <th
              className="char-sheet__table__header char-sheet__table__header--prayers"
              scope="col"
            >
              Components
            </th>
            <th
              className="char-sheet__table__header char-sheet__table__header--prayers"
              scope="col"
            >
              Save
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Bonus spell for WIS 13+ */}
          {wisStat >= 13 && renderSpellRow(0, spellCount[0] as number)}
          {spellCount.map((count, i) => {
            if (count === "-") return null;
            return Array.from({ length: count as number }, (_, j) =>
              renderSpellRow(i, j),
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default PrayersSpells;
