import React, { useEffect, useState } from 'react'
import Modal from "react-modal"
import {spellData, spellSlots, wizardryList} from "../../Data";
import SpellSlotsModal from './SpellSlotsModal';

const defaultSpellList = [
  [],[],[],[],[],[],[]
]

Modal.setAppElement("#root");

export default function WizardrySpells(props) {
  const { level, intStat, schools, schoolLimit, onPickSchool, useLocalStorage } = props
  const spellCount = spellSlots[level - 1]
  const [spellList, setSpellList] = useState(defaultSpellList)
  const [isOpen, setOpen] = useState(false)
  const [spellLevel, setSpellLevel] = useState(0)
  const [spellSlot, setSpellSlot] = useState(0)
  const [manageSchool, setManageSchool] = useState(false)
  const [modalIsOpen_Schools, setIsOpen_Schools] = useState(false);
  const [schoolValidation, setSchoolValidation] = useState(null);
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    if(useLocalStorage){
      const localData = JSON.parse(localStorage.getItem("wizardrySpells"))
      if(localData){
        setSpellList(localData)
      }
    }
  }, [useLocalStorage]);

  useEffect(() => {
    if(useLocalStorage){
      localStorage.setItem("wizardrySpells", JSON.stringify(spellList));
    }
  }, [spellList, useLocalStorage]);

  useEffect(() => {
    if(schoolLimit){
      // setIsOpen_Schools(true)
      setManageSchool(true)
    }
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

  const manageSchools = (e) => {
    setIsOpen_Schools(true)
  }

  const handleSave_Schools = (e) => {
    e.preventDefault()
    const checked = Array.from(e.currentTarget.schools).filter(check => {
      return check.checked
    }).map(check => check.value)

    if(schoolLimit === checked.length) {
      setIsOpen_Schools(false)
      setSchoolValidation(null)
      setManageSchool(false)
      onPickSchool(checked)
    } else {
      const plural = schoolLimit === 1 ? "" : "s"
      setSchoolValidation(`You must select ${schoolLimit} school${plural}`)
    }
  }

  const toggleShowAll = () => {
    setShowAll(prev => !prev)
  }

  const renderEmptyRow = (i,j) => {
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
        <td></td>
      </tr>
    )
  }

  const renderSpellRow = (i,j) => {
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
        <td>{spellList[i][j].school.map(color => <div key={color} className={`school-${color}`} />)}</td>
        <td><input type="checkbox" id={`${i}_${j}`} defaultChecked /></td>
      </tr>
    )
  }

  const addBonusSpell = () => {
    if(spellList[0][spellCount[0]]) {
      return renderSpellRow(0,spellCount[0])
    } else {
      return renderEmptyRow(0,spellCount[0])
    }
  }

  return (
    <div className="spell spells--wizardry">
      <h2>
        Wizardry Spells
        <div className="knownSchools">
          {schools.map(color => <div key={color} className={`school-${color}`} />)}
        </div>
        <SpellSlotsModal level={level} header="Wizardry Spell Slots" />
      </h2>
      <div className="table-wrapper">
        {manageSchool &&
        <div id="cta-schools">
          <button onClick={manageSchools}>Select Your Wizardry Schools</button>
        </div>
        }
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
              <th>School</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {intStat >= 13 && addBonusSpell()}
            {spellCount.map((count,i) => {
              if(count === "-") return false
              // create empty array to map over - for loops doen't work here
              const index = Array.from(Array(count))
              return index.map((empty,j) => {
                // one bonus level one spell if wis is greater than 13
                if(spellList && spellList[i].length > 0) {
                  if(spellList[i][j]) {
                    return renderSpellRow(i,j)
                  } else {
                    return renderEmptyRow(i,j)
                  }
                } else {
                  return renderEmptyRow(i,j)
                }
              })
            })
          }
          </tbody>
        </table>
      </div>


      <Modal
        id="modal--wizardrySpells"
        className="modal"
        overlayClassName="modal-overlay"
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Spell Slots"
      >
        <header className="modal__header">
          <h2 className="modal__h2">
            Pick Your Spell
          </h2>
          <button
            className="button modal__header-button"
            aria-label="Close modal"
            onClick={closeModal}
          >
            X
          </button>
        </header>
        <div className="modal__body">
          <button className="showAll" onClick={toggleShowAll}>{showAll ? "Show Available Spells" : "Show All Spells"}</button>
          <table className="table spells--wizardry">
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
                <th>School</th>
              </tr>
            </thead>
            <tbody>
            {
              spellLevel && wizardryList[spellLevel - 1].forEach((spellName,i) => {
                const intersection = schools.filter(element => spellData[spellName].school.includes(element));
                // console.log(`intersection`, intersection, 'on', spellName)
                const hasSchool = intersection.length > 0
                if(showAll || hasSchool){
                  return <tr key={i} className={`clickable ${hasSchool ? "available" : "unavailable"}`} onClick={() => handleAssignSpell(spellName)}>
                    <td>{spellLevel}</td>
                    <td>{spellName}</td>
                    <td>{spellData[spellName].cast}</td>
                    <td>{spellData[spellName].duration}</td>
                    <td>{spellData[spellName].range}</td>
                    <td>{spellData[spellName].target}</td>
                    <td>{spellData[spellName].components}</td>
                    <td>{spellData[spellName].save}</td>
                    <td>{spellData[spellName].school.map(color => <div key={color} className={`school-${color}`} />)}</td>
                  </tr>
                }
              })
            }
            </tbody>
          </table>
        </div>

      </Modal>

      <Modal
        id="modal--schools"
        className="modal"
        overlayClassName="modal-overlay"
        isOpen={modalIsOpen_Schools}
        contentLabel="Wizard Schools"
      >
        <header className="modal__header">
          <h2 className="modal__h2">
            Schools of Magic
          </h2>
        </header>

        <div className="modal__body">
          <div className="schoolDescriptions">
            <ul>
              <li className="li-white"><span className="school-white">WHITE</span> - Life, light, healing, revelation, protection</li>
              <li className="li-black"><span className="school-black">BLACK</span> - Death, darkness, slumber, insanity, disease, demonology</li>
              <li className="li-green"><span className="school-green">GREEN</span> - Nature, weather, fecundity, water, air, ice</li>
              <li className="li-blue"><span className="school-blue">BLUE</span> - Illusion, transformation, charms, trickery</li>
              <li className="li-red"><span className="school-red">RED</span> - Fire, earth, destruction, raw power</li>
            </ul>
          </div>
          <form className="clearfix" onSubmit={handleSave_Schools}>
            <span>You are proficient in <b>{schoolLimit}</b> school{schoolLimit === 1 ? "" : "s"} of magic. Choose wisely.</span>
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
            <button
              className="button button--primary button--large"
              type="submit"
              value="Save"
            >
              Save
            </button>
          </form>
        </div>
      </Modal>
    </div>
  )
}
