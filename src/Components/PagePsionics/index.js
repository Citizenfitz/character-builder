import React from "react";
import { psionicsData } from "../../Data/";
import RenderPsionic from "../Utilities/RenderPsionic";

const getRollRange = (currentRoll, prevRoll = 0) => {
  const start = prevRoll + 1;
  return start === currentRoll ? start : `${start}-${currentRoll}`;
};

const PagePsionics = () => {
  // Sort data by roll value to ensure correct ranges
  const sortedPsionics = [...psionicsData].sort((a, b) => a.roll - b.roll);

  return (
    <div className="newstyle layou__page layout__page--aside">
      <aside className="content-aside">
        <h2 className="ut-align-center">Random Roll Table</h2>
        <table className="table-psionics">
          <thead>
            <tr>
              <th>d100&nbsp;Roll</th>
              <th>Power</th>
            </tr>
          </thead>
          <tbody>
            {sortedPsionics.map((psionic, index) => (
              <tr key={psionic.id}>
                <td className="ut-align-center">
                  {getRollRange(
                    psionic.roll,
                    index > 0 ? sortedPsionics[index - 1].roll : 0
                  )}
                </td>
                <td>
                  <a href={`#${psionic.name}`} className="aside__link">
                    {psionic.name}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        <br />

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

        {sortedPsionics.map((psionic) => (
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
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagePsionics;
