import React from "react";
import { talentData } from "../../Data";
import RenderTalent from "../Utilities/RenderTalent";

const TalentDetails = ({ character }) => {
  return (
    <div>
      {/* Talent Descriptions */}
      {Object.values(character.talents)
        .filter((talent) => talent !== "choose")
        .map((talentName) => {
          const talent = talentData.find((t) => t.name === talentName);
          if (!talent) return null;

          return (
            <div key={talent.name} id={talent.name}>
              <RenderTalent
                name={talent.name}
                mod={talent.mod}
                aspect={talent.aspect}
                preq={talent.preq}
                bonus={talent.bonus}
                img={talent.img}
              />
            </div>
          );
        })}
    </div>
  );
};

export default TalentDetails;
