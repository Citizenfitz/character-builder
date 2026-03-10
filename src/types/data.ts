import type { HitDiceType, AspectName, Talents } from "./common";

export interface RaceData {
  id: number;
  name: string;
  attributes: {
    [key: string]: {
      bonus: number;
      max: number;
    };
  };
  movement: number;
  characteristics: string[];
  saveModsRace: string[];
}

export interface LevelData {
  level: number;
  suffix: string;
  hitDice: number;
  hitDiceBonus: number | null;
  saveBonus: number;
  xp: number;
  getsTalent: boolean;
}

export interface AspectData {
  id: number;
  name: string;
  displayName: string;
  hitDiceType: HitDiceType;
  assignedTalent2: string;
  description: string;
  weapon: string;
  armor: string;
  archetypes: string;
  saveModsClass: string;
}

export interface DisadData {
  id: number;
  name: string;
}

// ***** GEAR *****

// TODO: change "armor:" to "name:"
export interface Armor {
  armor: string;
  modifier: number;
  penalty: string;
  encumbrance?: "none" | "light" | "medium" | "heavy" | "very heavy";
}

export interface Shield {
  name: string;
  modifier: number;
  cover?: "none" | "partial" | "mostly";
}

export interface MeleeWeapon {
  name: string;
  damage: string;
  notes: string;
  cost: string;
  range?: string;
  rangeClose?: boolean;
  twoHanded?: boolean;
  reach?: boolean;
  finesse?: boolean;
  armorDefeating?: boolean;
  heavy?: boolean;
}
export interface RangedWeapon {
  name: string;
  damage: string;
  range: string;
  rate: string;
  notes: string;
  cost: string;
  slowReload?: boolean;
}

export interface TalentData {
  idNum: number;
  id: string;
  aspect: AspectName;
  name: string;
  mod: string;
  isLeveling: boolean;
  isStacking: boolean;
  isRollable: boolean;
  preq: string; // might be used in future for auto preqs system
}

export interface PresetData {
  id: number;
  name: string;
  aspect: AspectName;
  subclass: boolean;
  disad1: string;
  disad2: string;
  talents: Talents;
}

// ***** MUTATIONS *****
export interface MutationData {
  id: number;
  roll: number;
  name: string;
}
export interface MutationDefectData {
  id: number;
  roll: number;
  name: string;
}

export interface MutationRollData {
  id: number;
  wt: number; // weighting for random roll probability
  roll: string; // display string e.g. "2-14"
  numberOfMutations: number;
  numberOfDefects: number;
}

// ***** PSIONICS *****
export interface PsionicsData {
  id: number;
  roll: number;
  name: string;
  discipline: string;
  psp: string;
  initiate: string;
  duration: string;
  range: string;
  visibility: "visible" | "invisible";
  save: string;
  target: string;
  rangeInf: boolean;
}
