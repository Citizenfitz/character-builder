import React, { useState } from "react";
import { QuestRexDialog } from "../Common/Dialog";

const Notes = (props) => {
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [notesIndex, setNotesIndex] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleNotesModalOpen = () => {
    if (notesModalOpen) {
      // Only reset when closing the modal
      setNotesIndex(null);
      setIsDeleting(false);
    }
    setNotesModalOpen(!notesModalOpen);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    const noteText = e.target.noteText.value;

    if (typeof notesIndex === "number") {
      // Correctly create a new array for immutability
      const updatedNotes = [...props.notes];
      updatedNotes[notesIndex] = noteText;
      props.setNotes(updatedNotes);
      setNotesIndex(null); // Reset index to null or another default value
    } else {
      // Adding a new note
      props.setNotes((prev) => [...prev, noteText]);
    }
    toggleNotesModalOpen();
  };

  const editNote = (index) => {
    setNotesIndex(index);
    setIsDeleting(false);
    setNotesModalOpen(true);
  };

  const deleteNote = (index) => {
    setNotesIndex(index);
    setIsDeleting(true);
    setNotesModalOpen(true);
  };

  const modalTitle = isDeleting
    ? "Confirm Delete"
    : typeof notesIndex === "number"
    ? "Edit Note"
    : "Add Note";

  const modalFooterContent = isDeleting ? (
    <button
      className="char-sheet__button char-sheet__button--large"
      type="button"
      onClick={() => {
        props.setNotes((prev) => prev.filter((_, i) => i !== notesIndex));
        toggleNotesModalOpen();
      }}
    >
      Confirm Delete Note
    </button>
  ) : (
    <button
      className="char-sheet__button char-sheet__button--large"
      type="submit"
      value="Save"
    >
      Save
    </button>
  );

  return (
    <div className="char-sheet__notes">
      {/*  ------- User notes -------- */}
      <div className="ut-margin-bottom-xs">
        <button className="char-sheet__button" onClick={toggleNotesModalOpen}>
          <i className="fas fa-plus"></i> Add Note
        </button>
      </div>
      <ul className="char-sheet__notes__list">
        {props.notes.map((note, i) => (
          <li className="char-sheet__notes__list-item" key={i}>
            <div className="char-sheet__notes__text">{note}</div>
            <div className="char-sheet__notes__buttons">
              <button
                className="char-sheet__button char-sheet__notes__button"
                onClick={() => editNote(i)}
                aria-label="edit note"
              >
                <span className="fas fa-edit"></span>
              </button>
              <button
                className="char-sheet__button char-sheet__notes__button"
                aria-label="delete note"
                onClick={() => deleteNote(i)}
              >
                <span className="fas fa-trash"></span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <QuestRexDialog
        isOpen={notesModalOpen}
        onClose={toggleNotesModalOpen}
        title={modalTitle}
        footerContent={modalFooterContent}
      >
        <form onSubmit={handleSaveNote}>
          <textarea
            id="noteText"
            className="notes__textarea"
            placeholder="add your note"
            defaultValue={
              typeof notesIndex === "number" ? props.notes[notesIndex] : ""
            }
          ></textarea>
        </form>
      </QuestRexDialog>
    </div>
  );
};

export default Notes;
