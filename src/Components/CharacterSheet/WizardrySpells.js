import React, { useEffect, useState } from 'react'
import Modal from "react-modal"
import {spellData, spellSlots, wizardryList} from "../../Data";
import SpellSlotsModal from './SpellSlotsModal';

const defaultSpellList = [
  [],[],[],[],[],[],[]
]

export default function WizardrySpells(props) {
  const { level, intStat, schools, schoolLimit, onPickSchool, useLocalStorage } = props
  const spellCount = spellSlots[level - 1]
  const [spellList, setSpellList] = useState(defaultSpellList)
  const [isOpen, setOpen] = useState(false)
  const [spellLevel, setSpellLevel] = useState(0)
  const [spellSlot, setSpellSlot] = useState(0)
  const [modalIsOpen_Schools, setIsOpen_Schools] = useState(false);
  const [schoolValidation, setSchoolValidation] = useState(null);

  useEffect(() => {
    if(useLocalStorage){
      setSpellList(JSON.parse(localStorage.getItem("wizardrySpells")))
    }
  }, []);

  useEffect(() => {
    if(useLocalStorage){
      localStorage.setItem("wizardrySpells", JSON.stringify(spellList));
    }
  }, [spellList]);

  useEffect(() => {
    setIsOpen_Schools(true)
  },[schoolLimit])

  // const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  const selectSpell = (level,slot) => {
    setOpen(true)
    setSpellLevel(level+1)
    setSpellSlot(slot)
  }

  const handleAssignSpell = (spellName) => {
    const newSpellList = {...spellList}
    newSpellList[spellLevel - 1][spellSlot] = {
      name: spellName,
      ...spellData[spellName]
    }
    setSpellList(newSpellList)
    setOpen(false)
  }

  const handleSave_Schools = (e) => {
    e.preventDefault()
    const checked = Array.from(e.currentTarget.schools).filter(check => {
      return check.checked
    }).map(check => check.value)

    if(schoolLimit === checked.length) {
      setIsOpen_Schools(false)
      setSchoolValidation(null)
      onPickSchool(checked)
    } else {
      const plural = schoolLimit === 1 ? "" : "s"
      setSchoolValidation(`You must select only ${schoolLimit} school${plural}`)
    }
  }

  return (
    <div className="spell spells--wizardry">
      <h2>
        Wizardry Spells
        {schools.map(color => <div key={color} className={`school-${color}`} />)}
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
                  // console.log(`spellList[i][j]`, spellList[i][j])
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
        id="modal--wizardrySpells"
        className="modal--react spells--wizardry"
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Spell Slots"
      >
        <h2>Pick a spell</h2>
        <button className="button--modalClose" onClick={closeModal}>
          x
        </button>
        <div className="table-wrapper">
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
              spellLevel && wizardryList[spellLevel - 1].map((spellName,i) => {
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
        </div>

      </Modal>

      <Modal
        id="modal--schools"
        className="modal--react"
        isOpen={modalIsOpen_Schools}
        contentLabel="Wizard Schools"
      >
        <h2>Schools of Magic</h2>
        <span>You are proficient in {schoolLimit} school{schoolLimit === 1 ? "" : "s"} of magic. Choose wisely.</span>
        <form className="clearfix" onSubmit={handleSave_Schools}>
          <fieldset>
            <div className="school-white">
              <input id="chk-white" type="checkbox" name="schools" value="white" defaultChecked={schools.includes("white")} />
              <label htmlFor="chk-white">White</label>
            </div>
            <div className="school-black">
              <input id="chk-black" type="checkbox" name="schools" value="black" defaultChecked={schools.includes("black")} />
              <label htmlFor="chk-black">Black</label>
            </div>
            <div className="school-green">
              <input id="chk-green" type="checkbox" name="schools" value="green" defaultChecked={schools.includes("green")} />
              <label htmlFor="chk-green">Green</label>
            </div>
            <div className="school-blue">
              <input id="chk-blue" type="checkbox" name="schools" value="blue" defaultChecked={schools.includes("blue")} />
              <label htmlFor="chk-blue">Blue</label>
            </div>
            <div className="school-red">
              <input id="chk-red" type="checkbox" name="schools" value="red" defaultChecked={schools.includes("red")} />
              <label htmlFor="chk-red">Red</label>
            </div>
          </fieldset>
          {schoolValidation &&
            <div className="validation--error">{schoolValidation}</div>
          }
          <input className="button--modalSave" type="submit" value="Save" />
        </form>
      </Modal>
    </div>
  )
}
