// external types/interfaces
import type {
  Armor,
  AspectData,
  DisadData,
  LevelData,
  MeleeWeapon,
  MutationData,
  MutationDefectData,
  MutationRollData,
  PresetData,
  PsionicsData,
  RaceData,
  RangedWeapon,
  Shield,
  TalentData,
  SpellData,
  MagicSchoolData,
  SpellSlots,
  SpellList,
  SpellDataRecord,
} from "../types";

// raw data files are created in Google Sheets
// So we import, cast, and export to be used in the app
// TODO: add interfaces for these as we build them out
// internal data
import { armorData as rawArmorData } from "./dataArmor";
import { aspectData as rawAspectData } from "./dataAspects";
import { dataAttributes } from "./dataAttributes";
import { dataDisads as rawDisadData } from "./dataDisads";
import { levelsData as rawLevelsData } from "./dataLevels";
import {
  meleeWeaponData as rawMeleeWeaponData,
  rangedWeaponData as rawRangedWeaponData,
} from "./dataWeapons";
import { mutationDefectData as rawMutationDefectData } from "./dataMutationDefects";
import { mutationsData as rawMutationsData } from "./dataMutations";
import { mutationsRollData as rawMutationsRollData } from "./dataMutationsRoll";
import { presetData as rawPresetData } from "./dataPresets";
import { raceData as rawRaceData } from "./dataRaces";
import { shieldData as rawShieldData } from "./dataShield";
import { talentData as rawTalentData } from "./dataTalents";
import { psionicsData as rawPsionicsData } from "./dataPsionics";
import {
  prayersList as rawPrayersList,
  wizardryList as rawWizardryList,
  spellData as rawSpellData,
  spellSlots as rawSpellSlots,
  magicSchoolsData as rawMagicSchoolsData,
} from "./dataSpells";

// Cast the imported data to the correct types
const prayersList = rawPrayersList as unknown as SpellList;
const wizardryList = rawWizardryList as unknown as SpellList;
const spellData = rawSpellData as unknown as SpellDataRecord;
const spellSlots = rawSpellSlots as unknown as SpellSlots;
const magicSchoolsData = rawMagicSchoolsData as unknown as MagicSchoolData[];
const armorData = rawArmorData as unknown as Armor[];
const aspectData = rawAspectData as unknown as AspectData[];
const disadData = rawDisadData as unknown as DisadData[];
const levelsData = rawLevelsData as unknown as LevelData[];
const meleeWeaponData = rawMeleeWeaponData as unknown as MeleeWeapon[];
const mutationDefectData =
  rawMutationDefectData as unknown as MutationDefectData[];
const mutationsData = rawMutationsData as unknown as MutationData[];
const mutationsRollData = rawMutationsRollData as unknown as MutationRollData[];
const presetData = rawPresetData as unknown as PresetData[];
const psionicsData = rawPsionicsData as unknown as PsionicsData[];
const raceData = rawRaceData as unknown as RaceData[];
const rangedWeaponData = rawRangedWeaponData as unknown as RangedWeapon[];
const shieldData = rawShieldData as unknown as Shield[];
const talentData = rawTalentData as unknown as TalentData[];

export {
  armorData,
  aspectData,
  dataAttributes,
  disadData,
  levelsData,
  magicSchoolsData,
  meleeWeaponData,
  mutationDefectData,
  mutationsData,
  mutationsRollData,
  prayersList,
  presetData,
  psionicsData,
  raceData,
  rangedWeaponData,
  shieldData,
  spellData,
  spellSlots,
  talentData,
  wizardryList,
};
