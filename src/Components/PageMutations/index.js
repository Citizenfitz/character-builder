import React from "react";
import { mutationsData, mutationDefectsData } from "../../Data/";
import RenderMutation from "../Utilities/RenderMutation";
import RenderDefect from "../Utilities/RenderDefect";
const PageMutations = () => {
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
            {mutationsData.map((mutation) => (
              <tr key={mutation.id}>
                <td className="ut-align-center">{mutation.roll}</td>
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
            {mutationDefectsData.map((defect) => (
              <tr key={defect.id}>
                <td className="ut-align-center">{defect.roll}</td>
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
        {mutationsData.map((mutation) => (
          <div key={mutation.name} id={mutation.name}>
            <RenderMutation name={mutation.name}></RenderMutation>
          </div>
        ))}

        <hr />

        <h1>Mutation Defects</h1>
        {mutationDefectsData.map((defect) => (
          <div key={defect.name} id={defect.name}>
            <RenderDefect name={defect.name}></RenderDefect>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageMutations;
