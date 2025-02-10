import React from "react";
import { talentData } from "../../Data";
import RenderTalent from "../Utilities/RenderTalent";

const TalentDetails = ({ character }) => {
  // Helper function to filter talents based on level requirements
  const getAvailableTalents = () => {
    const talents = { ...character.talents };

    // Remove talents that shouldn't be shown based on character level
    if (character.level < 3) delete talents.talentLevel3;
    if (character.level < 5) delete talents.talentLevel5;
    if (character.level < 7) delete talents.talentLevel7;
    if (character.level < 9) delete talents.talentLevel9;

    return Object.values(talents);
  };

  return (
    <div>
      {/* Talent Descriptions */}
      {getAvailableTalents()
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
