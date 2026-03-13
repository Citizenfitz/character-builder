export type AspectName =
  | "fighter"
  | "priest"
  | "wizard"
  | "rogue"
  | "common"
  | "race";

export type HitDiceType = 4 | 6 | 8;

export interface Talents {
  talentAssigned1: string;
  talentAssigned2: string;
  talentLevel1: string;
  talentRogue1: string;
  talentDisad1: string;
  talentDisad2: string;
  talentLevel3: string;
  talentLevel5: string;
  talentLevel7: string;
  talentLevel9: string;
}
export interface SpellSelection {
  name: string;
  cast: string;
  duration: string;
  range: string;
  target: string;
  components: string;
  save: string;
  school: string[] | null;
}
