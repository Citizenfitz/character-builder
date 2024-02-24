import React from "react";
import { mutationsData, mutationDefectsData } from "../../Data/";
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
    </div>
  );
};

export default PageMutations;
