import React from "react";
import { psionicsData } from "../../Data/";
import RenderPsionic from "../Utilities/RenderPsionic";

const PagePsionics = () => {
  return (
    <div className="newstyle">
      <h1 className="ut-color-psionic-glow">Psionic Powers</h1>
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
    </div>
  );
};

export default PagePsionics;
