import React from "react";
import { mutationsData, mutationDefectsData } from "../../Data/";
import RenderMutation from "../Utilities/RenderMutation";
import RenderDefect from "../Utilities/RenderDefect";
const PageMutations = () => {
  return (
    <div className="newstyle">
      <section>
        <h1>Mutations</h1>

        <div className="top-search">
          <table className="table-mutations">
            <thead>
              <tr>
                <th>d100 Roll</th>
                <th>Mutation</th>
              </tr>
            </thead>
            <tbody>
              {mutationsData.map((mutation) => (
                <tr key={mutation.id}>
                  <td>{mutation.roll}</td>
                  <td>{mutation.name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="table-defects">
            <thead>
              <tr>
                <th>d100 Roll</th>
                <th>Defect</th>
              </tr>
            </thead>
            <tbody>
              {mutationDefectsData.map((defect) => (
                <tr key={defect.id}>
                  <td>{defect.roll}</td>
                  <td>{defect.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
    </div>
  );
};

export default PageMutations;
