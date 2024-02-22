import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  mutationsData,
  mutationDefectsData,
  talentData,
  talentData2,
  spellData,
  psionicsData,
} from "../../Data/";
import RenderMutation from "../Utilities/RenderMutation";
import RenderDefect from "../Utilities/RenderDefect";
import RenderTalent from "../Utilities/RenderTalent";
import RenderSpell from "../Utilities/RenderSpell";
import RenderPsionic from "../Utilities/RenderPsionic";

const PageMutations = () => {
  return (
    <div className="newstyle">
      <h1>Magic Spells</h1>
      <section>
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
      </section>
      <hr />

      <h1>Spells</h1>
      <h2>
        Dispel Magic
        <span className="fas fa-spell-dot fa-spell-dot--black"></span>
        <span className="fas fa-spell-dot fa-spell-dot--blue"></span>
        <span className="fas fa-spell-dot fa-spell-dot--green"></span>
        <span className="fas fa-spell-dot fa-spell-dot--red"></span>
        <span className="fas fa-spell-dot fa-spell-dot--white"></span>
      </h2>
      <ul className="desc__list desc__list--spell">
        <li>Casting: 1 action</li>
        <li>School: All</li>
        <li>Components: V,S</li>
        <li>Duration: instant</li>
        <li>Range: 120'</li>
        <li>Save: none</li>
        <li>Target: 1 spell or 20' cube</li>
      </ul>
      <p>
        This spell instantaneously ends either all spells within its area of
        effect or a single spell of the caster's choice. It affects enchantments
        on creatures and magically summoned creatures (they're dismissed to
        whence they came), but not magic items. The caster may dispel:
      </p>
      <ul>
        <li>Their own spells automatically</li>
        <li>Third level or below spells automatically</li>
        <li>
          4th level or higher spells with an Wizardry or Thaumaturgy talent roll
          against a DC of 5 + the level of the spell to be dispelled.{" "}
        </li>
      </ul>

      <hr />
      <h1>Talents</h1>
      <h2>Alertness</h2>
      <ul className="spell-desc">
        <li>Type: Common</li>
        <li>Modifier: none</li>
        <li>Prerequisite: none</li>
      </ul>
      <p>
        The character is incredibly aware and gains +3 to all perception rolls,
        is only surprised on a roll of 1 on d12, and makes such rolls without
        penalty even while distracted or asleep.
      </p>

      <section>
        <h1>Mutations</h1>
        {mutationsData.map((mutation) => (
          <div key={mutation.id}>
            <RenderMutation name={mutation.name}></RenderMutation>
          </div>
        ))}
      </section>
      <hr />

      <section>
        <h1>Mutation Defects</h1>
        {mutationDefectsData.map((defect) => (
          <div key={defect.id}>
            <RenderDefect name={defect.name}></RenderDefect>
          </div>
        ))}
      </section>
      <hr />

      <h1>Talents</h1>
      <section>
        {talentData2.map((talent) => (
          <div key={talent.id}>
            <RenderTalent
              name={talent.name}
              mod={talent.mod}
              aspect={talent.aspect}
              preq={talent.preq}
              bonus={talent.bonus}
            ></RenderTalent>
          </div>
        ))}
      </section>
      <hr />

      <h1 className="ut-color-psionic-glow">Psionic Powers</h1>
      <section>
        {psionicsData.map((psionic) => (
          <div key={psionic.id}>
            <RenderPsionic
              name={psionic.name}
              discipline={psionic.discipline}
              psp={psionic.psp}
              initiate={psionic.initiate}
              duration={psionic.duration}
              range={psionic.range}
              visibility={psionic.visibility}
              save={psionic.save}
              target={psionic.target}
              rangeInf={psionic.rangeInf}
            ></RenderPsionic>
          </div>
        ))}
      </section>
      <hr />
    </div>
  );
};

export default PageMutations;
