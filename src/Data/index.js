import { armorData } from "./dataArmor";
import { aspectData } from "./dataAspects";
import { dataAttributes } from "./dataAttributes";
import { dataDisads } from "./dataDisads";
import { levelsData } from "./dataLevels";
import { meleeWeaponData, rangedWeaponData } from "./dataWeapons";
import { mutationDefectsData } from "./dataMutationDefects";
import { monstersData } from "./dataMonsters";
import { mutationsData } from "./dataMutations";
import { mutationsRollData } from "./dataMutationsRoll";
import { presetData } from "./dataPresets";
import { raceData } from "./dataRaces";
import { shieldData } from "./dataShield";
import { talentData } from "./dataTalents";
import { psionicsData } from "./dataPsionics";
import {
  thaumaturgyList,
  wizardryList,
  spellData,
  spellSlots,
  magicSchoolsData,
} from "./dataSpells";

export {
  armorData,
  aspectData,
  dataAttributes,
  dataDisads,
  levelsData,
  magicSchoolsData,
  meleeWeaponData,
  monstersData,
  mutationDefectsData,
  mutationsData,
  mutationsRollData,
  presetData,
  psionicsData,
  raceData,
  rangedWeaponData,
  shieldData,
  spellData,
  spellSlots,
  talentData,
  thaumaturgyList,
  wizardryList,
};

export const characterDefaults = {
  namePlayer: "",
  nameCharacter: "",
  level: 1,
  fighterLevel: 1,
  priestLevel: 1,
  wizardLevel: 1,
  knaveLevel: 1,
  race: "Human",
  gender: "Male",
  aspect: aspectData[0].name,
  alignment: "Neutral",
  hitDiceType: aspectData[0].hitDiceType,
  attributes: dataAttributes,
  attributesUpdates: false,
  ac: 10,
  hp: {
    rolls: [],
    bonus: [],
    hasDurability: false,
    durabilityBonus: 0,
    manual: 0,
    total: 0,
  },
  perception: 10,
  movement: 30,
  disad1: "none",
  disad2: "none",
  talents: {
    talentAssigned1: "Combat",
    talentAssigned2: "Multi-Attack",
    talentLevel1: "choose",
    talentKnave1: "choose",
    talentDisad1: "choose",
    talentDisad2: "choose",
    talentLevel3: "choose",
    talentLevel5: "choose",
    talentLevel7: "choose",
    talentLevel9: "choose",
  },
  talentsUpdated: false,
  saveModsClass:
    "+2 vs petrification, polymorph, breath weapons, entangling and grappling attacks. ",
  saveModsRace: [],
  armor: armorData[0],
  shield: 0,
  shieldIndex: 0,
  armorIndex: 0,
  meleeWeapon: meleeWeaponData[0],
  meleeWeaponIndex: 0,
  rangedWeapon: rangedWeaponData[0],
  rangedWeaponIndex: 0,
  characteristicsRace: [],
  wizardrySchools: ["Choose", "Choose"],
  thaumaturgyStartLevel: 0,
  wizardry1StartLevel: 0,
  wizardry2StartLevel: 0,
  wizardry3StartLevel: 0,
};
