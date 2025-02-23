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
      {/*  ------- User notes -------- */}
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
                className="char-sheet__button"
                onClick={() => editNote(i)}
                aria-label="edit note"
              >
                <span className="fas fa-edit"></span>
              </button>
              <button
                className="char-sheet__button"
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
        className="modal ut-no-print"
        overlayClassName="modal__overlay"
        contentLabel="Add a note"
      >
        <div className="modal__container">
          <div className="modal__header">
            <h2 className="modal__h2">
              {typeof notesIndex === "number" ? "Edit" : "Add"} Note
            </h2>
            <button
              className="char-sheet__button modal__header-button"
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
                className="char-sheet__button char-sheet__button--large"
                type="submit"
                value="Save"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </ReactModal>
    </div>
  );
};

export default Notes;
