/**
 * Central type definitions for the Character entity in QuestRex CharacterCrafter.
 *
 * This file defines the shape of a character object.
 * All components, utilities, and (later) Redux slices should import types from here.
 *
 * Goal: Replace the current loose object in useState with strongly typed Character.
 *
 * Conventions used in this file:
 * - Use `interface` for object shapes (especially ones we might extend later)
 * - Use `type` for unions, primitives, or complex composed types
 * - Keep names descriptive but concise
 * - Export everything so we can import selectively or via barrel later
 */

import type {
  HitDiceType,
  AspectName,
  Talents,
  SpellSelection,
} from "./common";
import type { Armor, MeleeWeapon, RangedWeapon, PsionicPower } from "./data";
import { raceData } from "../Data/dataRaces";

export type RaceName = (typeof raceData)[number]["name"];

export type Gender = "Male" | "Female" | "other";

export type Alignment =
  | "Lawful Good"
  | "Neutral Good"
  | "Chaotic Good"
  | "Lawful Neutral"
  | "Neutral"
  | "Chaotic Neutral"
  | "Lawful Evil"
  | "Neutral Evil"
  | "Chaotic Evil";

export interface Attribute {
  /** The raw 3d6 (or other) roll result */
  roll: number;
  /** Racial or other bonuses to the raw roll */
  bonus: number;
  /** The total value of the attribute after bonuses are applied */
  total: number;
  /** The minimum value the attribute can be */
  min: number;
  /** The maximum value the attribute can be */
  max: number;
  /** The modifier the attrib has to other dice rolls.  i.e. +1 in combat */
  mod: number;
  /** The full name of the attribute */
  name: string;
  /** The abbreviated name of the attribute */
  abbr: string;
}

export interface Attributes {
  strength: Attribute;
  dexterity: Attribute;
  constitution: Attribute;
  intelligence: Attribute;
  wisdom: Attribute;
  charisma: Attribute;
}

export interface HitPoints {
  /** One roll per level (or per 2 if Durability active) */
  rolls: number[];
  /** CON modifier applied per level (can change if CON increases) */
  bonus: number[];
  /** Level when "Durability" talent was taken (false if not taken) */
  hasDurability: number | false;
  /** Fighter level bonus if Durability active */
  durabilityBonus: number;
  /** Player-entered manual adjustment (positive or negative) */
  manual: number;
  /** Computed final HP: sum(rolls) + sum(bonus) + manual + durabilityBonus */
  total: number;
}

export interface Mutations {
  numMutations: number;
  numDefects: number;
  mutation1: string;
  mutation2: string;
  mutation3: string;
  mutation4: string;
  mutation5: string;
  defect1: string;
  defect2: string;
  defect3: string;
}

export interface Psionics {
  psp: number;
  wildPsionics: PsionicPower[];
}

export interface Character {
  // Identity & basics
  namePlayer: string;
  nameCharacter: string;
  gender: Gender;
  alignment: Alignment;

  // Progression & class
  level: number;
  fighterLevel: number;
  priestLevel: number;
  wizardLevel: number;
  rogueLevel: number;
  aspect: AspectName;
  race: RaceName;
  hitDiceType: HitDiceType;

  // Core stats
  attributes: Attributes;
  attributesUpdates: number | false; // Trigger for re-renders (Date.now())

  ac: number;
  hp: HitPoints;
  perception: number;
  movement: number;

  // Disadvantages
  disad1: string; // "none" | disadvantage name
  disad2: string;

  // Talents
  talents: Talents;
  talentsUpdated: number | false; // Another trigger

  // Saving throws
  saveModsClass: string;
  saveModsRace: string[];

  // Gear (currently using data arrays directly)
  armor: Armor;
  shield: number;
  shieldIndex: number;
  armorIndex: number;
  meleeWeapon: MeleeWeapon;
  meleeWeaponIndex: number;
  rangedWeapon: RangedWeapon;
  rangedWeaponIndex: number;

  // Racial / temp
  attributesRace: string[]; // Characteristics list?

  // Magic casting
  wizardrySchools: [string, string]; // Fixed length 2: ["Choose", "Choose"] etc.
  prayersStartLevel: number;
  wizardry1StartLevel: number;
  wizardry2StartLevel: number;
  wizardry3StartLevel: number;
  psionicsStartLevel?: number;

  // Spells Selected
  prayerSpells: (SpellSelection | null)[][];
  wizardrySpells: (SpellSelection | null)[][];

  // Optional systems
  mutations: Mutations;
  psionics: Psionics;
}
