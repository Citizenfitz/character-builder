import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  mutationsData,
  mutationDefectsData,
  talentData,
  spellData,
} from "../../Data/";
import RenderMutation from "../Utilities/RenderMutation";
import RenderDefect from "../Utilities/RenderDefect";

const PageMutations = () => {
  return (
    <div className="newstyle">
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
        {talentData.map((talent) => (
          <div key={talent.id}>
            <h2>{talent.name}</h2>
            <ul className="spell-desc">
              <li>Type: {talent.aspect}</li>
              <li>Modifier: {talent.mod}</li>
              <li>Prerequisite: none</li>
            </ul>
            <p>{talent.desc}</p>
          </div>
        ))}
      </section>
      <hr />

      <h1>Psionic Powers</h1>
      <h2>Blink</h2>
      <ul className="spell-desc">
        <li>PSP: 2 (stacking)</li>
        <li>Initiate: 1 action</li>
        <li>Discipline: Psychokinesis</li>
        <li>Duration: instant</li>
        <li>Range: 120' </li>
        <li>Visibility: invisible</li>
        <li>Save: negate </li>
        <li>Target: user + 1 other creature </li>
      </ul>
      <p>
        This power instantly teleports the user to any spot within the power's
        range. Blink is unfailingly accurate and the destination may be a place
        the user can see, one they're familiar with, or specified with
        directions and distance (i.e. "20 feet down"). The user may bring along
        one other creature weighing no more than 500lb. Unwilling creatures are
        allowed a saving throw to avoid the effect. If a solid object occupies
        the destination the power fails and the user and any creature traveling
        with them suffer 4d6 points of damage.
      </p>
      <ul>
        <li>
          <b>x2 Stacking:</b> Range of 240' and can take up to two creatures
          1000 lbs or less
        </li>
        <li>
          <b>x3 Stacking:</b> Range of 480' and can take up to four creatures of
          2000 lbs or less
        </li>
      </ul>
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
      <ul className="spell-desc">
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
    </div>
  );
};

export default PageMutations;
