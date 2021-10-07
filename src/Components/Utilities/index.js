import { talentData, aspectData } from "../../Data";

const calculateBonus = (attributeValue = 0) => {
  const bonusRange = [
    0, 0, 0, -3, -3, -2, -2, -1, -1, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5,
    6, 6,
  ];
  return bonusRange[attributeValue];
};

// adds + or - to front of bonus for display
const formatNumberModifier = (bonusValue = 0) => {
  if (bonusValue > 0) {
    bonusValue = "+" + bonusValue;
  }
  return bonusValue;
};

const formatNumberSuffix = (number) => {
  switch (number) {
    case 1:
      return number + "st";
    case 2:
      return number + "nd";
    case 3:
      return number + "rd";
    default:
      return number + "th";
  }
};

// returns level of a talent a character has as a descriptive string (i.e. 1/4 of level).
const calcTalentLevel = (characterAspect, talentName) => {
  if (talentName === "choose") {
    return "-";
  }
  const whichTalentId = talentData.findIndex((x) => x.name === talentName);
  let talentAspect;
  if (whichTalentId >= 0) {
    talentAspect = talentData[whichTalentId].aspect;
  }
  if (talentAspect === "race") {
    return "-";
  }
  if (talentAspect === "common") {
    return "Class (Full level)";
  }
  // if this is their class it's full level
  if (talentAspect === characterAspect) {
    return "Class (Full level)";
  }
  // if it's opposing it's quarter level
  if (talentAspect === "fighter" && characterAspect === "wizard") {
    return "Opposing (1/4 level)";
  }
  if (talentAspect === "wizard" && characterAspect === "fighter") {
    return "Opposing (1/4 level)";
  }
  if (talentAspect === "priest" && characterAspect === "knave") {
    return "Opposing (1/4 level)";
  }
  if (talentAspect === "knave" && characterAspect === "priest") {
    return "Opposing (1/4 level)";
  }
  return "Adjacent (1/2 level)";
};

// returns numeric value of talent level for a character
const calcTalentLevelNumber = (characterAspect, talentName, characterLevel) => {
  let talentLevel = characterLevel;
  const talentRef = calcTalentLevel(characterAspect, talentName);
  switch (talentRef) {
    case "Opposing (1/4 level)":
      talentLevel = Math.floor(talentLevel / 4);
      break;
    case "Adjacent (1/2 level)":
      talentLevel = Math.floor(talentLevel / 2);
      break;
    default:
    // code block
  }
  if (talentLevel < 1) {
    talentLevel = 1;
  }
  return talentLevel;
};

// these functions return a property of a named talent or aspect
const whichTalentId = (talentName) => {
  return talentData.findIndex((x) => x.name === talentName);
};

const whichAspectId = (talentName) => {
  return aspectData.findIndex((x) => x.name === talentName);
};

const whichAspectDisplayName = (aspectName) => {
  const aspectId = aspectData.findIndex((x) => x.name === aspectName);
  return aspectData[aspectId].displayName;
};

export {
  calculateBonus,
  formatNumberModifier,
  formatNumberSuffix,
  calcTalentLevel,
  calcTalentLevelNumber,
  whichTalentId,
  whichAspectId,
  whichAspectDisplayName,
};
