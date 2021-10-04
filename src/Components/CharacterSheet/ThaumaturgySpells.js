import React, { useEffect, useState } from 'react'
import Modal from "react-modal"
import {spellData, spellSlots, thaumaturgyList} from "../../Data";
import SpellSlotsModal from './SpellSlotsModal';

const defaultSpellList = [
  [],[],[],[],[],[],[]
]

export default function ThaumaturgySpells(props) {
  const { level, wisStat, useLocalStorage } = props
  const spellCount = spellSlots[level - 1]
  const [spellList, setSpellList] = useState(defaultSpellList)
  const [isOpen, setOpen] = useState(false)
  const [spellLevel, setSpellLevel] = useState(0)
  const [spellSlot, setSpellSlot] = useState(0)

  useEffect(() => {
    if(useLocalStorage){
      setSpellList(JSON.parse(localStorage.getItem("thaumaturgySpells")))
    }
  }, []);
  useEffect(() => {
    if(useLocalStorage){
      localStorage.setItem("thaumaturgySpells", JSON.stringify(spellList));
    }
  }, [spellList]);

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  const selectSpell = (level,slot) => {
    setOpen(true)
    setSpellLevel(level+1)
    setSpellSlot(slot)
  }

  const handleAssignSpell = (spellName) => {
    console.log(`spellName`, spellName)
    const newSpellList = {...spellList}
    newSpellList[spellLevel - 1][spellSlot] = {
      name: spellName,
      ...spellData[spellName]
    }
    setSpellList(newSpellList)
    setOpen(false)
  }

  return (
    <div className="spell spells--thaumaturgy">
      <h2>
        Thaumaturgy Spells
        <SpellSlotsModal level={level} />
      </h2>
      <table className="table spells--table">
        <thead>
          <tr>
            <th style={{ minWidth: "58px" }}>Level</th>
            {/* <th>School</th> */}
            <th>Name</th>
            <th>Cast</th>
            <th>Duration</th>
            <th>Range</th>
            <th>Target</th>
            <th>Components</th>
            <th>Save</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {spellCount.map((count,i) => {
            if(count === "-") return
            // create empty array to map over - for loops doen't work here
            const index = Array.from(Array(count))
            return index.map((empty,j) => {
              // TODO: one bonus level one spell if wis is greater than 13
              if(spellList[i].length > 0) {
                if(spellList[i][j]) {
                  return (
                    <tr key={j}>
                      <td>{i + 1}</td>
                      <td className="clickable" onClick={() => selectSpell(i,j)}>{spellList[i][j].name}</td>
                      <td>{spellList[i][j].cast}</td>
                      <td>{spellList[i][j].duration}</td>
                      <td>{spellList[i][j].range}</td>
                      <td>{spellList[i][j].target}</td>
                      <td>{spellList[i][j].components}</td>
                      <td>{spellList[i][j].save}</td>
                      <td><input type="checkbox" id={`${i}_${j}`} defaultChecked /></td>
                    </tr>
                  )
                } else {
                  return (
                    <tr key={j}>
                      <td>{i+1}</td>
                      <td>
                        <button onClick={() => selectSpell(i,j)}>Pick a spell</button>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  )
                }
              } else {
                return (
                  <tr key={j}>
                    <td>{i+1}</td>
                    <td>
                      <button onClick={() => selectSpell(i,j)}>Pick a spell</button>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )
              }
            })
          })
        }
        </tbody>
      </table>
      <Modal
        id="modal--spellList"
        className="modal--react"
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Spell Slots"
      >
        <h2>Pick a spell</h2>
        <button className="button--modalClose" onClick={closeModal}>
          x
        </button>
        <table className="table table--spells">
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
        {
          spellLevel && thaumaturgyList[spellLevel - 1].map((spellName,i) => {
            return <tr key={i} className="clickable" onClick={() => handleAssignSpell(spellName)}>
              <td>{spellLevel}</td>
              <td>{spellName}</td>
              <td>{spellData[spellName].cast}</td>
              <td>{spellData[spellName].duration}</td>
              <td>{spellData[spellName].range}</td>
              <td>{spellData[spellName].target}</td>
              <td>{spellData[spellName].components}</td>
              <td>{spellData[spellName].save}</td>
            </tr>
          })
        }
        </tbody>
      </table>

      </Modal>
    </div>
  )
}
