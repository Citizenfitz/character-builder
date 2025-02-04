import React, { useState } from "react";
import ReactModal from "react-modal";

const Notes = (props) => {
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const toggleNotesModalOpen = () => {
    if (notesModalOpen) {
      props.setNotesIndex(false);
    }
    setNotesModalOpen(!notesModalOpen);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    const noteText = e.target.noteText.value;
    if (typeof notesIndex === "number") {
      // replace the indexed item
      const tempNotes = props.notes;
      tempNotes[props.notesIndex] = noteText;
      props.setNotes(tempNotes);
      props.setNotesIndex(false);
    } else {
      // adding a new note
      props.setNotes((prev) => [...prev, noteText]);
    }
    toggleNotesModalOpen();
  };

  const editNote = (index) => {
    props.setNotesIndex(index);
    toggleNotesModalOpen();
  };

  const deleteNote = (index) => {
    const newNoteList = [...props.notes];
    newNoteList.splice(index, 1);
    props.setNotes(newNoteList);
  };

  return (
    <div className="notes">
      {/*  ------- Race nates -------- */}
      {props.character.characteristicsRace &&
        props.character.characteristicsRace.length > 0 && (
          <div>
            <b className="label">Racial Abilities ({props.character.race}): </b>
            <ul className="notes__list">
              {props.character.characteristicsRace.map((note, i) => (
                <li className="notes__list-item" key={i}>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

      {/*  ------- User nates -------- */}
      <div className="ut-margin-bottom-half-em">
        <button className="char-sheet__button" onClick={toggleNotesModalOpen}>
          <i className="fas fa-plus"></i> Add Note
        </button>
      </div>
      <ul className="notes__list">
        {props.notes.map((note, i) => (
          <li className="notes__list-item" key={i}>
            <div className="note--text">{note}</div>
            <div className="notes__buttons">
              <button
                className="button button--secondary"
                onClick={() => editNote(i)}
                aria-label="edit note"
              >
                <span className="fas fa-edit"></span>
              </button>
              <button
                className="button button--secondary"
                aria-label="delete note"
                onClick={() => deleteNote(i)}
              >
                <span className="fas fa-trash"></span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <ReactModal
        id="note--modal"
        isOpen={notesModalOpen}
        onRequestClose={toggleNotesModalOpen}
        className="modal"
        overlayClassName="modal-overlay"
        contentLabel="Add a note"
      >
        <div className="modal__header">
          <h2 className="modal__h2">
            {typeof notesIndex === "number" ? "Edit" : "Add"} Note
          </h2>
          <button
            className="button modal__header-button"
            aria-label="Close modal"
            onClick={toggleNotesModalOpen}
          >
            X
          </button>
        </div>
        <form onSubmit={handleSaveNote}>
          <div className="modal__body">
            <textarea
              id="noteText"
              className="notes__textarea"
              placeholder="add your note"
              defaultValue={
                typeof notesIndex === "number"
                  ? props.notes[props.notesIndex]
                  : ""
              }
            ></textarea>
          </div>
          <div className="modal__footer">
            <button
              className="button button--primary button--large"
              type="submit"
              value="Save"
            >
              Save
            </button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
};

export default Notes;
