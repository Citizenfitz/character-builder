import React from "react";

import { talentData } from "../../Data/";
import RenderTalent from "../Utilities/RenderTalent";

const PageTalents = () => {
  return (
    <div className="newstyle">
      <h1>Talents</h1>
      <div className="top-search grid-talent-list">
        <div>
          <h2 className="ut-color-common">Race Talents</h2>
          <ol>
            {talentData
              .filter((talent) => talent.aspect === "race")
              .map((talent) => (
                <li key={talent.id}>
                  <span
                    className={`aspect-icon aspect-icon--${talent.aspect}`}
                  ></span>{" "}
                  {talent.name}
                </li>
              ))}
          </ol>
        </div>
        <div>
          <h2 className="ut-color-common">Common Talents</h2>
          <ol>
            {talentData
              .filter((talent) => talent.aspect === "common")
              .map((talent) => (
                <li key={talent.id}>
                  <span
                    className={`aspect-icon aspect-icon--${talent.aspect}`}
                  ></span>{" "}
                  {talent.name}
                </li>
              ))}
          </ol>
        </div>
        <div>
          <h2 className="ut-color-common">Fighter Talents</h2>
          <ol>
            {talentData
              .filter((talent) => talent.aspect === "fighter")
              .map((talent) => (
                <li key={talent.id}>
                  <span
                    className={`aspect-icon aspect-icon--${talent.aspect}`}
                  ></span>{" "}
                  {talent.name}
                </li>
              ))}
          </ol>
        </div>
        <div>
          <h2 className="ut-color-common">Priest/Psychic Talents</h2>
          <ol>
            {talentData
              .filter((talent) => talent.aspect === "priest")
              .map((talent) => (
                <li key={talent.id}>
                  <span
                    className={`aspect-icon aspect-icon--${talent.aspect}`}
                  ></span>{" "}
                  {talent.name}
                </li>
              ))}
          </ol>
        </div>
        <div>
          <h2 className="ut-color-common">Wizard Talents</h2>
          <ol>
            {talentData
              .filter((talent) => talent.aspect === "wizard")
              .map((talent) => (
                <li key={talent.id}>
                  <span
                    className={`aspect-icon aspect-icon--${talent.aspect}`}
                  ></span>{" "}
                  {talent.name}
                </li>
              ))}
          </ol>
        </div>
        <div>
          <h2 className="ut-color-common">Knave Talents</h2>
          <ol>
            {talentData
              .filter((talent) => talent.aspect === "knave")
              .map((talent) => (
                <li key={talent.id}>
                  <span
                    className={`aspect-icon aspect-icon--${talent.aspect}`}
                  ></span>{" "}
                  {talent.name}
                </li>
              ))}
          </ol>
        </div>
      </div>
      {talentData.map((talent) => (
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
    </div>
  );
};

export default PageTalents;
