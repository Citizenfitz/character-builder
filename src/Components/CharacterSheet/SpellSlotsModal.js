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
        Spell Slots
      </button>
      <Modal
        id="modal--spellSlots"
        className="modal"
        overlayClassName="modal-overlay"
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Spell Slots"
      >
        <header className="modal__header">
          <h2 className="modal__h2">
            {props.header}
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
        </div>
      </Modal>
    </React.Fragment>
  )
}
