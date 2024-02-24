import React from "react";

import { talentData2 } from "../../Data/";
import RenderTalent from "../Utilities/RenderTalent";

const PageTalents = () => {
  return (
    <div className="newstyle">
      <h1>Talents</h1>
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
    </div>
  );
};

export default PageTalents;
