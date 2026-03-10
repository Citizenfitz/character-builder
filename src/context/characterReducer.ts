// external types/interfaces
import type {
  Character,
  CharacterAction,
  HitPoints,
  AspectName,
  Talents,
} from "../types";

// internal utilities
import { findTalentLevelSlot } from "../Components/Utilities/findTalentSlot";

// internal data
import {
  armorData,
  shieldData,
  meleeWeaponData,
  rangedWeaponData,
  raceData,
} from "../Data/indexRefactor";

/// ****** Race Validator ******
const RACE_NAMES = raceData.map((race) => race.name);

const isRace = (value: string): boolean => {
  return RACE_NAMES.includes(value);
};
// TODO: if newRace === "Mutant" → show mutations panel
// if previousRace === "Mutant" → hide/reset mutations panel

/// ****** Talent Switcher  ******
interface TalentDiff {
  slot: keyof Talents;
  previousValue: string;
  newValue: string;
}

type TalentDiffSet = TalentDiff[];

const getTalentDiff = (prev: Talents, next: Talents): TalentDiffSet => {
  const diffs: TalentDiffSet = [];
  (Object.keys(prev) as Array<keyof Talents>).forEach((key) => {
    if (prev[key] !== next[key]) {
      diffs.push({
        slot: key,
        previousValue: prev[key],
        newValue: next[key],
      });
    }
  });
  return diffs;
};

const validateSpellCaster = (state: Character): Character => {
  return {
    ...state,
    prayersStartLevel: findTalentLevelSlot(state.talents, "Prayers"),
    wizardry1StartLevel: findTalentLevelSlot(state.talents, "Wizardry 1"),
    wizardry2StartLevel: findTalentLevelSlot(state.talents, "Wizardry 2"),
    wizardry3StartLevel: findTalentLevelSlot(state.talents, "Wizardry 3"),
    psionicsStartLevel: findTalentLevelSlot(state.talents, "Wild Psionics"),
  };
};

// TODO: implement full talent reconciliation
const reconcileTalents = (state: Character): Character => {
  return validateSpellCaster(state);
  // Future: cascadeRemovals, reconcileWizardrySchools, etc.
};

/// ****** Helper Functions ******

const calcHpTotal = (
  currentHp: HitPoints,
  incoming: Partial<HitPoints>,
  fighterLevel: number,
  characterLevel: number,
): HitPoints => {
  // TODO: implement proper HP calculation
  // Complex logic involving rolls, bonuses, durability talent etc.
  // For now returning stub value
  return { ...currentHp, total: 40 };
};

const calcAspectLevel = (
  level: number,
  aspect: AspectName,
): Partial<Character> => {
  let fighterLevel = 1,
    priestLevel = 1,
    wizardLevel = 1,
    rogueLevel = 1;
  switch (aspect) {
    case "fighter":
      fighterLevel = level;
      priestLevel = Math.max(1, Math.floor(level / 2));
      rogueLevel = Math.max(1, Math.floor(level / 2));
      wizardLevel = Math.max(1, Math.floor(level / 4));
      break;
    case "priest":
      priestLevel = level;
      fighterLevel = Math.max(1, Math.floor(level / 2));
      wizardLevel = Math.max(1, Math.floor(level / 2));
      rogueLevel = Math.max(1, Math.floor(level / 4));
      break;
    case "wizard":
      wizardLevel = level;
      rogueLevel = Math.max(1, Math.floor(level / 2));
      priestLevel = Math.max(1, Math.floor(level / 2));
      fighterLevel = Math.max(1, Math.floor(level / 4));
      break;
    case "rogue":
      rogueLevel = level;
      wizardLevel = Math.max(1, Math.floor(level / 2));
      fighterLevel = Math.max(1, Math.floor(level / 2));
      priestLevel = Math.max(1, Math.floor(level / 4));
      break;
  }
  return {
    level,
    fighterLevel,
    priestLevel,
    wizardLevel,
    rogueLevel,
  };
};

export const characterReducer = (
  state: Character,
  action: CharacterAction,
): Character => {
  switch (action.type) {
    case "SET_LEVEL":
      return { ...state, level: action.payload };

    //TALENTS AND DISADS
    case "SET_DISAD":
      return { ...state, [action.payload.slot]: action.payload.value };

    // ATTRIBUTES
    case "UPDATE_ATTRIBUTES":
      return {
        ...state,
        attributes: action.payload,
        ac:
          10 +
          action.payload.dexterity.mod +
          state.armor.modifier +
          state.shield,
        perception: 10 + action.payload.wisdom.mod,
      };

    // EQUIPMENT
    case "SET_ARMOR": {
      const armor = armorData[action.payload.armorIndex];
      return {
        ...state,
        armor,
        armorIndex: action.payload.armorIndex,
        ac: 10 + state.attributes.dexterity.mod + armor.modifier + state.shield,
      };
    }
    case "SET_SHIELD":
      const shield = shieldData[action.payload.shieldIndex];
      return {
        ...state,
        shield: shield.modifier,
        shieldIndex: action.payload.shieldIndex,
        ac:
          10 +
          state.attributes.dexterity.mod +
          state.armor.modifier +
          shield.modifier,
      };
    case "SET_MELEE_WEAPON":
      const meleeWeapon = meleeWeaponData[action.payload.meleeWeaponIndex];
      return {
        ...state,
        meleeWeapon,
        meleeWeaponIndex: action.payload.meleeWeaponIndex,
      };
    case "SET_RANGED_WEAPON":
      const rangedWeapon = rangedWeaponData[action.payload.rangedWeaponIndex];
      return {
        ...state,
        rangedWeapon,
        rangedWeaponIndex: action.payload.rangedWeaponIndex,
      };

    // CATCH ALL FOR THE OTHER INPUTS
    case "SET_INPUT_CHANGE":
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};
