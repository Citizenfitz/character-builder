import React from "react";
import { spellData } from "../../Data/";
import RenderSpell from "../Utilities/RenderSpell";

const PageSpells = () => {
  return (
    <div className="newstyle">
      <h1>Magic Spells</h1>
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
  );
};

export default PageSpells;
