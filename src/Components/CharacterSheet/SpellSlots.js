import React from "react";

const SpellSlots = (props) => {
  console.log("ss = " + props.character.armor[0]);
  return (
    <div className="flex-grid flex-grid--flex-start">
      {/*  --------------- MAGIC-USER SPELL SLOTS -------------- */}
      {props.character.wizardryLevel !== 0 && (
        <div className="flex-grid__child">
          <table className="table table--spell-slots">
            <caption className="ut-color-wizard">
              <span className="aspect-icon aspect-icon--wizard"></span>
              <span className="table__caption-text">Wizardry Spell Slots</span>
            </caption>
            <thead>
              <tr>
                <th>1st</th>
                <th>2nd</th>
                <th>3rd</th>
                <th>4th</th>
                <th>5th</th>
                <th>6th</th>
                <th>7th</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {props.spellSlotsData[props.character.wizardryLevel].slots.map(
                  (i) => (
                    <td key={i}>{i}</td>
                  )
                )}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/*  --------------- PRIEST SPELL SLOTS -------------- */}
      {props.character.thaurmaturgyLevel !== 0 && (
        <div className="flex-grid__child">
          <table className="table table--spell-slots">
            <caption className="ut-color-priest">
              <span className="aspect-icon aspect-icon--priest"></span>
              <span className="table__caption-text">
                Thaumaturgy Spell Slots
              </span>
            </caption>
            <thead>
              <tr>
                <th>1st</th>
                <th>2nd</th>
                <th>3rd</th>
                <th>4th</th>
                <th>5th</th>
                <th>6th</th>
                <th>7th</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {props.spellSlotsData[
                  props.character.thaurmaturgyLevel
                ].slots.map((i) => (
                  <td key={i}>{i}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SpellSlots;
