import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { spellData, spellSlots, thaumaturgyList } from "../../Data";
import { formatNumberSuffix } from "../Utilities";
import SpellSlotsModal from "./SpellSlotsModal";

const defaultSpellList = [[], [], [], [], [], [], []];

Modal.setAppElement("#root");

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

  const handleAssignSpell = (spellName) => {
    const newSpellList = { ...spellList };
    newSpellList[spellLevel - 1][spellSlot] = {
      name: spellName,
      ...spellData[spellName],
    };
    setSpellList(newSpellList);
    setOpen(false);
  };

  const renderEmptyRow = (i, j) => {
    return (
      <tr key={j} className="spell-table__row">
        <td className="spell-table__cell spell-table__cell--level">
          {formatNumberSuffix(i + 1)}
        </td>
        <td className="spell-table__cell spell-table__cell--name">
          <button
            onClick={() => selectSpell(i, j)}
            className="char-sheet__button button"
          >
            <i className="fas fa-bolt"></i> Choose Spell
          </button>
        </td>
        <td className="spell-table__cell"></td>
        <td className="spell-table__cell"></td>
        <td className="spell-table__cell"></td>
        <td className="spell-table__cell"></td>
        <td className="spell-table__cell"></td>
        <td className="spell-table__cell"></td>
      </tr>
    );
  };

  const renderSpellRow = (i, j) => {
    return (
      <tr key={j} className="spell-table__row">
        <td className="spell-table__cell spell-table__cell--level">
          {formatNumberSuffix(i + 1)}
        </td>
        <td
          className="spell-table__cell spell-table__cell--name ut-clickable"
          onClick={() => selectSpell(i, j)}
        >
          {spellList[i][j].name}
        </td>
        <td className="spell-table__cell">{spellList[i][j].cast}</td>
        <td className="spell-table__cell">{spellList[i][j].duration}</td>
        <td className="spell-table__cell">{spellList[i][j].range}</td>
        <td className="spell-table__cell">{spellList[i][j].target}</td>
        <td className="spell-table__cell">{spellList[i][j].components}</td>
        <td className="spell-table__cell">{spellList[i][j].save}</td>
      </tr>
    );
  };

  const addBonusSpell = (i, j) => {
    if (spellList[0][spellCount[0]]) {
      return renderSpellRow(0, spellCount[0]);
    } else {
      return renderEmptyRow(0, spellCount[0]);
    }
  };

  return (
    <section className="char-sheet__section char-sheet__section--spells">
      <h2 className="char-sheet__h2">
        Thaumaturgy Spells
        <span className="ut-text-explain ut-margin-left-half-em">
          - At {formatNumberSuffix(level)} level
          {wisStat > 12 && (
            <span> plus one extra 1st level spell for 13+ WIS</span>
          )}
        </span>
      </h2>
      <table className="spell-table">
        <thead>
          <tr>
            <th className="spell-table__header spell-table__header--thaumaturgy">
              Level
            </th>
            {/* <th>School</th> */}
            <th className="spell-table__header spell-table__header--thaumaturgy">
              Name
            </th>
            <th className="spell-table__header spell-table__header--thaumaturgy">
              Cast
            </th>
            <th className="spell-table__header spell-table__header--thaumaturgy">
              Duration
            </th>
            <th className="spell-table__header spell-table__header--thaumaturgy">
              Range
            </th>
            <th className="spell-table__header spell-table__header--thaumaturgy">
              Target
            </th>
            <th className="spell-table__header spell-table__header--thaumaturgy">
              Components
            </th>
            <th className="spell-table__header spell-table__header--thaumaturgy">
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
                  row = renderEmptyRow(i, j);
                }
              } else {
                row = renderEmptyRow(i, j);
              }
              return row;
            });
          })}
        </tbody>
      </table>
      <Modal
        id="modal--thaumaturgySpells"
        className="modal"
        overlayClassName="modal-overlay"
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Spell Slots"
      >
        <header className="modal__header">
          <h2 className="modal__h2">Choose Your Spell</h2>
          <button
            className="char-sheet__button modal__header-button"
            aria-label="Close modal"
            onClick={closeModal}
          >
            X
          </button>
        </header>
        <div className="modal__body">
          <table className="table spells--thaumaturgy">
            <thead>
              <tr>
                <th>Level</th>
                <th style={{ minWidth: "58px" }}>Name</th>
                {/* <th>School</th> */}
                <th>Cast</th>
                <th>Duration</th>
                <th>Range</th>
                <th>Target</th>
                <th>Components</th>
                <th>Save</th>
              </tr>
            </thead>
            <tbody>
              {spellLevel &&
                thaumaturgyList[spellLevel - 1].map((spellName, i) => {
                  return (
                    <tr
                      key={i}
                      className="ut-clickable"
                      onClick={() => handleAssignSpell(spellName)}
                    >
                      <td>{spellLevel}</td>
                      <td>{spellName}</td>
                      <td>{spellData[spellName].cast}</td>
                      <td>{spellData[spellName].duration}</td>
                      <td>{spellData[spellName].range}</td>
                      <td>{spellData[spellName].target}</td>
                      <td>{spellData[spellName].components}</td>
                      <td>{spellData[spellName].save}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Modal>
    </section>
  );
}
