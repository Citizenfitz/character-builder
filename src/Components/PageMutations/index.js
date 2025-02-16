import React from "react";
import { mutationsData, mutationDefectsData } from "../../Data/";
import RenderMutation from "../Utilities/RenderMutation";
import RenderDefect from "../Utilities/RenderDefect";

const getRollRange = (currentRoll, prevRoll = 0) => {
  const start = prevRoll + 1;
  return start === currentRoll ? start : `${start}-${currentRoll}`;
};

const PageMutations = () => {
  // Sort data by roll value to ensure correct ranges
  const sortedMutations = [...mutationsData].sort((a, b) => a.roll - b.roll);
  const sortedDefects = [...mutationDefectsData].sort(
    (a, b) => a.roll - b.roll
  );

  return (
    <div className="newstyle layou__page layout__page--aside">
      <aside className="content-aside">
        <h2 className="ut-align-center">Mutations</h2>
        <table className="table-mutations">
          <thead>
            <tr>
              <th>d100&nbsp;Roll</th>
              <th>Mutation</th>
            </tr>
          </thead>
          <tbody>
            {sortedMutations.map((mutation, index) => (
              <tr key={mutation.id}>
                <td className="ut-align-center">
                  {getRollRange(
                    mutation.roll,
                    index > 0 ? sortedMutations[index - 1].roll : 0
                  )}
                </td>
                <td>
                  <a href={`#${mutation.name}`} className="aside__link">
                    {mutation.name}
                  </a>
                </td>
              </tr>
            ))}
            <tr>
              <td className="ut-align-center">98-100</td>
              <td>Player Choice</td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <h2 className="ut-align-center">Defects</h2>
        <table className="table-defects">
          <thead>
            <tr>
              <th>d100&nbsp;Roll</th>
              <th>Defect</th>
            </tr>
          </thead>
          <tbody>
            {sortedDefects.map((defect, index) => (
              <tr key={defect.id}>
                <td className="ut-align-center">
                  {getRollRange(
                    defect.roll,
                    index > 0 ? sortedDefects[index - 1].roll : 0
                  )}
                </td>
                <td>
                  <a href={`#${defect.name}`} className="aside__link">
                    {defect.name}
                  </a>
                </td>
              </tr>
            ))}
            <tr>
              <td className="ut-align-center">97-100</td>
              <td>Player Choice</td>
            </tr>
          </tbody>
        </table>
      </aside>

      <div className="content-main">
        <h1>Mutations</h1>
        {sortedMutations.map((mutation) => (
          <div key={mutation.name} id={mutation.name}>
            <RenderMutation name={mutation.name}></RenderMutation>
          </div>
        ))}

        <hr />

        <h1>Mutation Defects</h1>
        {sortedDefects.map((defect) => (
          <div key={defect.name} id={defect.name}>
            <RenderDefect name={defect.name}></RenderDefect>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageMutations;
