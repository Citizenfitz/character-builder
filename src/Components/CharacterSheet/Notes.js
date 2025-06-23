import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { QuestRexDialog } from "../Common/Dialog";

const Notes = ({ notes, setNotes }) => {
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [notesIndex, setNotesIndex] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleNotesModalOpen = (isOpen) => {
    setNotesModalOpen(isOpen);
    if (!isOpen) {
      setNotesIndex(null);
      setIsDeleting(false);
    }
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    const noteText = e.target.noteText.value;

    if (typeof notesIndex === "number") {
      const updatedNotes = [...notes];
      updatedNotes[notesIndex] = noteText;
      setNotes(updatedNotes);
    } else {
      setNotes((prev) => [...prev, noteText]);
    }
    toggleNotesModalOpen(false);
  };

  const editNote = (index) => {
    setNotesIndex(index);
    setIsDeleting(false);
    toggleNotesModalOpen(true);
  };

  const deleteNote = (index) => {
    setNotesIndex(index);
    setIsDeleting(true);
    toggleNotesModalOpen(true);
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
        setNotes((prev) => prev.filter((_, i) => i !== notesIndex));
        toggleNotesModalOpen(false);
      }}
    >
      Confirm Delete Note
    </button>
  ) : (
    <button
      className="char-sheet__button char-sheet__button--large"
      type="submit"
      value="Save"
      form="note-form"
    >
      Save
    </button>
  );

  return (
    <div className="char-sheet__notes">
      {/*  ------- User notes -------- */}
      <div className="ut-margin-bottom-xs">
        <button
          className="char-sheet__button"
          onClick={() => toggleNotesModalOpen(true)}
        >
          <i className="fas fa-plus"></i> Add Note
        </button>
      </div>
      <ul className="char-sheet__notes__list">
        {notes.map((note, i) => (
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
        onClose={() => toggleNotesModalOpen(false)}
        title={modalTitle}
        footerContent={modalFooterContent}
      >
        <form id="note-form" onSubmit={handleSaveNote}>
          <Dialog.Description className="sr-only">
            {isDeleting
              ? "Confirm deletion of the note."
              : "Add or edit your note in the text area below."}
          </Dialog.Description>
          <textarea
            id="noteText"
            className="notes__textarea qr-input--textarea"
            placeholder="add your note"
            defaultValue={
              typeof notesIndex === "number" ? notes[notesIndex] : ""
            }
          ></textarea>
        </form>
      </QuestRexDialog>
    </div>
  );
};

export default Notes;
