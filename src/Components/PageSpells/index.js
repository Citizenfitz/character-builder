import React from "react";
import { spellData } from "../../Data/";
import RenderSpell from "../Utilities/RenderSpell";

const PageSpells = () => {
  return (
    <div className="newstyle layou__page layout__page--aside">
      <aside className="content-aside">
        <fieldset>
          <legend>Show:</legend>
          <br />
          <input
            type="radio"
            id="spellFilterAll"
            name="spellFilter"
            value="spellFilterAll"
            checked
          />
          <label for="spellFilterAll"> All Spells Alphabetically</label>
          <br />
          <input
            type="radio"
            id="spellFilterPriest"
            name="spellFilter"
            value="spellFilterPriest"
          />
          <label for="spellFilterPriest"> Priest Spells by Level</label>
          <br />
          <input
            type="radio"
            id="spellFilterWizard"
            name="spellFilter"
            value="spellFilterWizard"
          />
          <label for="spellFilterWizard">Wizard Spells by Level</label>
          <br />
          <input
            type="radio"
            id="spellFilterBlack"
            name="spellFilter"
            value="spellFilterBlack"
          />
          <label for="spellFilterBlack">
            <span className="fas fa-spell-dot fa-spell-dot--black"></span> Black
            Spells Alphabetically
          </label>
          <br />
          <input
            type="radio"
            id="spellFilterBlue"
            name="spellFilter"
            value="spellFilterBlue"
          />
          <label for="spellFilterBlue">
            <span className="fas fa-spell-dot fa-spell-dot--blue"></span> Blue
            Spells Alphabetically
          </label>
          <br />
          <input
            type="radio"
            id="spellFilterGreen"
            name="spellFilter"
            value="spellFilterGreen"
          />
          <label for="spellFilterGreen">
            <span className="fas fa-spell-dot fa-spell-dot--green"></span> Green
            Spells Alphabetically
          </label>
          <br />
          <input
            type="radio"
            id="spellFilterRed"
            name="spellFilter"
            value="spellFilterRed"
          />
          <label for="spellFilterRed">
            <span className="fas fa-spell-dot fa-spell-dot--red"></span> Red
            Spells Alphabetically
          </label>
          <br />
          <input
            type="radio"
            id="spellFilterWhite"
            name="spellFilter"
            value="spellFilterWhite"
          />
          <label for="spellFilterWhite">
            <span className="fas fa-spell-dot fa-spell-dot--white"></span> White
            Spells Alphabetically
          </label>
          <br />
        </fieldset>
        <hr />
        <ul>
          {Object.entries(spellData).map(([spellName, spell]) => (
            <li key={spell.id}>{spellName}</li>
          ))}
        </ul>
      </aside>
      <div className="content-main">
        <h1>Magic Spells - All Alphabetically</h1>
        {Object.entries(spellData).map(([spellName, spell]) => (
          <div key={spell.id}>
            <RenderSpell
              name={spellName}
              cast={spell.cast}
              components={spell.components}
              duration={spell.duration}
              range={spell.range}
              save={spell.save}
              target={spell.target}
              school={spell.school}
              wizLvl={spell.wizLvl}
              priestLvl={spell.priestLvl}
            ></RenderSpell>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageSpells;
