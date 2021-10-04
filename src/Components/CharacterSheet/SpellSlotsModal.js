import React, {useState} from 'react'
import Modal from "react-modal";
import { spellSlots } from "../../Data";

export default function SpellSlotsModal(props) {
  const [isOpen, setOpen] = useState(false)
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  return (
    <React.Fragment>
      <button className="button-showSpellSlots" onClick={openModal}>
        Spell Slots Table
      </button>
      <Modal
        id="modal--spellSlots"
        className="modal--react"
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Spell Slots"
      >
        <h2>Spell Slots Per Level Table</h2>
        <button className="button--modalClose" onClick={closeModal}>
          x
        </button>
        <table>
          <thead>
            <tr>
              <th rowSpan="2">
                Level<br />
                with Talent
              </th>
              <th colSpan="7">
                Spell Level
              </th>
            </tr>
            <tr>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
            </tr>
          </thead>
          <tbody>
            {spellSlots.map((level,i) => (
              <tr key={level} className={props.level == i + 1 ? 'active' : ''}>
                <th>{i+1}</th>
                <td>{level[0]}</td>
                <td>{level[1]}</td>
                <td>{level[2]}</td>
                <td>{level[3]}</td>
                <td>{level[4]}</td>
                <td>{level[5]}</td>
                <td>{level[6]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </React.Fragment>
  )
}
