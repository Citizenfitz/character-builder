// Import from character.ts (source) to avoid circular dependency with index.ts.
// All types are re-exported from index.ts for consumers outside this folder.
import type { AspectName, Attributes, RaceName, Talents } from "./index";

type SetLevelAction = {
  type: "SET_LEVEL";
  payload: number;
};

type SetAspectAction = {
  type: "SET_ASPECT";
  payload: AspectName;
};

type SetDisadAction = {
  type: "SET_DISAD";
  payload: {
    slot: "disad1" | "disad2";
    value: string;
  };
};

type SetTalentsAction = {
  type: "SET_TALENTS";
  payload: {
    talents: Talents;
  };
};

type SetHPAction = {
  type: "SET_HP";
  payload: {
    rolls?: number[];
    bonus?: number[];
    manual?: number;
    hasDurability?: number | false;
    durabilityBonus?: number;
    total?: number;
  };
};

type SetUpdateAttributesAction = {
  type: "UPDATE_ATTRIBUTES";
  payload: Attributes;
};

type SetPresetAction = {
  type: "SET_PRESET";
  payload: {
    preset: string | "choose";
  };
};

type SetRaceAction = {
  type: "SET_RACE";
  payload: {
    race: RaceName;
  };
};

//  ******** Equipment ********
type SetArmorAction = {
  type: "SET_ARMOR";
  payload: {
    armorIndex: number;
  };
};
type SetShieldAction = {
  type: "SET_SHIELD";
  payload: {
    shieldIndex: number;
  };
};
type SetMeleeWeaponAction = {
  type: "SET_MELEE_WEAPON";
  payload: {
    meleeWeaponIndex: number;
  };
};
type SetRangedWeaponAction = {
  type: "SET_RANGED_WEAPON";
  payload: {
    rangedWeaponIndex: number;
  };
};

// ******** Catch All Action ********
// Generic setter for simple, independent string fields that trigger no derived state
// (namePlayer, nameCharacter, gender, alignment, etc.)
// Uses keyof to ensure only valid Character fields are accepted at the call site
type SetInputChangeAction = {
  type: "SET_INPUT_CHANGE";
  payload: {
    name: string; // tighten to keyof Character later if needed
    value: string;
  };
};

// the union - the reducer's action parameter will be this type
export type CharacterAction =
  | SetLevelAction
  | SetAspectAction
  | SetDisadAction
  | SetTalentsAction
  | SetHPAction
  | SetUpdateAttributesAction
  | SetPresetAction
  | SetRaceAction
  | SetArmorAction
  | SetShieldAction
  | SetMeleeWeaponAction
  | SetRangedWeaponAction
  | SetInputChangeAction;
