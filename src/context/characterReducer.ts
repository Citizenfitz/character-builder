// external types/interfaces
import type {
  AspectName,
  Character,
  CharacterAction,
  HitPoints,
  RaceName,
  Talents,
} from "../types";

// internal utilities
import { findTalentLevelSlot, findTalentAspect } from "../Components/Utilities";

// internal data
import {
  armorData,
  aspectData,
  meleeWeaponData,
  presetData,
  raceData,
  rangedWeaponData,
  shieldData,
  dataAttributes,
} from "../Data/indexRefactor";

/// ****** Character Defaults ******
export const characterDefaults: Character = {
  namePlayer: "",
  nameCharacter: "",
  level: 1,
  fighterLevel: 1,
  priestLevel: 1,
  wizardLevel: 1,
  rogueLevel: 1,
  race: "Human",
  gender: "Male",
  aspect: aspectData[0].name as AspectName,
  alignment: "Neutral",
  hitDiceType: aspectData[0].hitDiceType,
  attributes: dataAttributes,
  attributesUpdates: false, // need a shallow state prop to trigger component update TODO: remove once context added
  ac: 10,
  hp: {
    rolls: [], // hit dice rolls per level
    bonus: [], // attribute bonus per level, may change if CON attribute increases
    hasDurability: false, // talent bonus, if not false then set the level durability was obtained
    durabilityBonus: 0, // equal to fighter level
    manual: 0, // manual bonus from input
    total: 0, // total value
  },
  perception: 10,
  movement: 30,
  disad1: "none",
  disad2: "none",
  talents: {
    talentAssigned1: "Combat",
    talentAssigned2: "Multi-Attack",
    talentLevel1: "choose",
    talentRogue1: "choose",
    talentDisad1: "choose",
    talentDisad2: "choose",
    talentLevel3: "choose",
    talentLevel5: "choose",
    talentLevel7: "choose",
    talentLevel9: "choose",
  },
  talentsUpdated: false, // need a shallow state prop to trigger component update TODO: remove once context added
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
  attributesRace: [],
  //hasWizardry: false,
  wizardrySchools: ["Choose", "Choose"],
  prayersStartLevel: 0,
  wizardry1StartLevel: 0,
  wizardry2StartLevel: 0,
  wizardry3StartLevel: 0,
  prayerSpells: [[], [], [], [], [], [], []],
  wizardrySpells: [[], [], [], [], [], [], []],
  mutations: {
    numMutations: 1,
    numDefects: 0,
    mutation1: "none",
    mutation2: "none",
    mutation3: "none",
    mutation4: "none",
    mutation5: "none",
    defect1: "none",
    defect2: "none",
    defect3: "none",
  },
  psionics: {
    psp: 0,
    wildPsionics: [],
  },
};

/// ****** Talent Switcher  ******
interface TalentDiff {
  slot: keyof Talents;
  previousValue: string;
  newValue: string;
}

type TalentDiffSet = TalentDiff[];

// Simple function that just returns what changed between to talent objects.
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

// TODO: implement full talent reconciliation.
// Handles prerequisite checks for talents and the like
const reconcileTalents = (state: Character): Character => {
  return validateSpellCaster(state);
  // Future: cascadeRemovals, reconcileWizardrySchools, etc.
};

/// ****** Helper Functions ******

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

const handleRaceChange = (state: Character, newRace: string): Character => {
  const raceEntry = raceData.find((r) => r.name === newRace);
  if (!raceEntry) return state;
  return {
    ...state,
    race: newRace as RaceName,
    movement: raceEntry.movement,
    saveModsRace: raceEntry.saveModsRace,
    attributesRace: raceEntry.characteristics,
    // TODO: if newRace === "Mutant" → show mutations panel
    // TODO: if previousRace === "Mutant" → reset mutations
  };
};

const handleDurabilityChange = (
  state: Character,
  hasDurability: number | true | false,
): Character => {
  // TODO: implement durability bonus calculation
  // gaining = true → add durability bonus based on fighterLevel
  // gaining = false → remove durability bonus, reset durabilityBonus to 0
  return state;
};

// zero out hit points if the character changes aspect or level.
//TODO: implement flag of "You need to roll hit points" in the UI somehow.
const emptyHitPoints = (currentHp: HitPoints): HitPoints => ({
  rolls: [],
  bonus: [],
  hasDurability: currentHp.hasDurability,
  durabilityBonus: currentHp.durabilityBonus,
  manual: 0,
  total: 0,
});

// Applies a new talents object, diffs against previous, applies side effects, reconciles
const applyTalentChange = (
  state: Character,
  newTalents: Talents,
): Character => {
  // newTalents already built by caller
  const diffs = getTalentDiff(state.talents, newTalents);

  // Route to handlers based on diff
  let newState: Character = { ...state, talents: newTalents };
  diffs.forEach((diff) => {
    // RACE CHECKS
    // If the prev value was a race, reset to human
    if (findTalentAspect(diff.previousValue) === "race") {
      newState = handleRaceChange(newState, "Human");
    }
    // If the new value is a race, apply the new race
    if (findTalentAspect(diff.newValue) === "race") {
      newState = handleRaceChange(newState, diff.newValue);
    }
    //DURABILITY CHECKS
    // If they lose durability remove the bonuses
    if (diff.previousValue === "Durability") {
      newState = handleDurabilityChange(newState, false);
    }
    // If they gain durability recalc and add the bonuses
    if (diff.newValue === "Durability") {
      newState = handleDurabilityChange(newState, true);
    }
  });

  // Always reconcile at the end
  return reconcileTalents(newState);
};

export const characterReducer = (
  state: Character,
  action: CharacterAction,
): Character => {
  switch (action.type) {
    case "SET_LEVEL": {
      const newState = {
        ...state,
        ...calcAspectLevel(action.payload, state.aspect),
        hp: emptyHitPoints(state.hp),
      };
      return reconcileTalents(newState);
    }

    case "SET_ASPECT": {
      const aspectEntry = aspectData.find((a) => a.name === action.payload);
      const aspectState = {
        ...state,
        ...calcAspectLevel(state.level, action.payload),
        aspect: action.payload,
        hitDiceType: aspectEntry?.hitDiceType ?? state.hitDiceType,
        saveModsClass: aspectEntry?.saveModsClass ?? state.saveModsClass,
        talents: {
          ...state.talents,
          talentAssigned2:
            aspectEntry?.assignedTalent2 ?? state.talents.talentAssigned2,
        },
        hp: emptyHitPoints(state.hp),
      };
      return reconcileTalents(aspectState);
    }

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

    //HIT POINTS
    case "SET_HP": {
      return {
        ...state,
        hp: { ...state.hp, ...action.payload },
      };
    }

    // TALENTS
    case "SET_TALENTS": {
      return applyTalentChange(state, action.payload.talents);
    }

    // MUTATIONS
    case "SET_MUTATIONS": {
      return {
        ...state,
        mutations: { ...state.mutations, ...action.payload },
      };
    }

    // PRESETS
    case "SET_PRESET": {
      if (action.payload === "choose") {
        return applyTalentChange(
          { ...state, disad1: "none", disad2: "none" },
          characterDefaults.talents,
        );
      }

      const preset = presetData.find((p) => p.id === action.payload);
      if (!preset) return state;

      const newState = {
        ...state,
        aspect: preset.aspect,
        disad1: preset.disad1,
        disad2: preset.disad2,
        ...calcAspectLevel(state.level, preset.aspect),
        hp: emptyHitPoints(state.hp),
      };

      const newTalents: Talents = {
        ...characterDefaults.talents,
        ...preset.talents,
      };

      return applyTalentChange(newState, newTalents);
    }

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
    case "SET_SHIELD": {
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
    }
    case "SET_MELEE_WEAPON": {
      const meleeWeapon = meleeWeaponData[action.payload.meleeWeaponIndex];
      return {
        ...state,
        meleeWeapon,
        meleeWeaponIndex: action.payload.meleeWeaponIndex,
      };
    }
    case "SET_RANGED_WEAPON": {
      const rangedWeapon = rangedWeaponData[action.payload.rangedWeaponIndex];
      return {
        ...state,
        rangedWeapon,
        rangedWeaponIndex: action.payload.rangedWeaponIndex,
      };
    }

    // PRAYER SPELLS
    case "SET_PRAYER_SPELL": {
      const { levelIndex, slotIndex, spell } = action.payload;
      const newPrayerSpells = state.prayerSpells.map((level, i) =>
        i === levelIndex
          ? level.map((s, j) => (j === slotIndex ? spell : s))
          : level,
      );
      return { ...state, prayerSpells: newPrayerSpells };
    }

    // WIZARDRY SPELLS
    case "SET_WIZARDRY_SPELL": {
      const { levelIndex, slotIndex, spell } = action.payload;
      const newWizardrySpells = state.wizardrySpells.map((level, i) =>
        i === levelIndex
          ? level.map((s, j) => (j === slotIndex ? spell : s))
          : level,
      );
      return { ...state, wizardrySpells: newWizardrySpells };
    }

    case "SET_PSIONICS": {
      return {
        ...state,
        psionics: { ...state.psionics, ...action.payload },
      };
    }

    // CATCH ALL FOR THE OTHER INPUTS
    case "SET_INPUT_CHANGE":
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};
