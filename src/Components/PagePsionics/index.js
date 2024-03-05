import React from "react";
import { psionicsData } from "../../Data/";
import RenderPsionic from "../Utilities/RenderPsionic";

const PagePsionics = () => {
  return (
    <div className="newstyle layou__page layout__page--aside">
      <aside className="content-aside">
        <div>
          <h2>Aura Disciplines</h2>
          <ol>
            {psionicsData
              .filter((psionic) => psionic.discipline === "Aura")
              .map((psionic) => (
                <li key={psionic.id}>
                  <a href={`#${psionic.name}`} className="aside__link">
                    {psionic.name}
                  </a>
                </li>
              ))}
          </ol>
        </div>

        <div>
          <h2>Omniscience Disciplines</h2>
          <ol>
            {psionicsData
              .filter((psionic) => psionic.discipline === "Omniscience")
              .map((psionic) => (
                <li key={psionic.id}>
                  <a href={`#${psionic.name}`} className="aside__link">
                    {psionic.name}
                  </a>
                </li>
              ))}
          </ol>
        </div>

        <div>
          <h2>Psychokinesis Disciplines</h2>
          <ol>
            {psionicsData
              .filter((psionic) => psionic.discipline === "Psychokinesis")
              .map((psionic) => (
                <li key={psionic.id}>
                  <a href={`#${psionic.name}`} className="aside__link">
                    {psionic.name}
                  </a>
                </li>
              ))}
          </ol>
        </div>

        <div>
          <h2>Telepathy Disciplines</h2>
          <ol>
            {psionicsData
              .filter((psionic) => psionic.discipline === "Telepathy")
              .map((psionic) => (
                <li key={psionic.id}>
                  <a href={`#${psionic.name}`} className="aside__link">
                    {psionic.name}
                  </a>
                </li>
              ))}
          </ol>
        </div>
      </aside>

      <div className="content-main">
        <h1 className="ut-color-psionic-glow">Psionic Powers</h1>

        {psionicsData.map((psionic) => (
          <div key={psionic.name} id={psionic.name}>
            <RenderPsionic
              id={psionic.id}
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
      </div>
    </div>
  );
};

export default PagePsionics;
