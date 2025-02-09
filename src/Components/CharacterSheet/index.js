import React, { useEffect, useState, useCallback } from "react";
import ReactModal from "react-modal";
import DiceBox from "@3d-dice/dice-box";
import LevelsTable from "./LevelsTable";
import PresetsSelector from "./PresetsSelector";
import DisadSelector from "./DisadSelector";
import Attributes from "./Attributes";
import Aspects from "./Aspects";
import Notes from "./Notes";
import {
  aspectData,
  levelsData,
  presetData,
  raceData,
  armorData,
  meleeWeaponData,
  rangedWeaponData,
  dataAttributes,
  shieldData,
} from "../../Data";
import {
  calculateBonus,
  formatNumberModifier,
  whichTalentAspect,
  formatNumberSuffix,
} from "../Utilities";
import ThaumaturgySpells from "./ThaumaturgySpells";
import WizardrySpells from "./WizardrySpells";
import TalentDetails from "./TalentDetails";

/*  --------------- DICE BOX -------------- */
// create new DiceBox class
const Box = new DiceBox("#dice-box", {
  id: "dice-canvas",
  assetPath: "/assets/dice-box/",
  themeColor: "#883c8d",
  startingHeight: 12,
  throwForce: 6,
  gravity: 2,
});

// initalize DiceBox onDomReady so canvas can be properly measured
document.addEventListener("DOMContentLoaded", () => {
  // set the onRollComplete function
  Box.init();
});

// clear dice on click anywhere on the screen
document.addEventListener("mousedown", () => {
  const diceBoxCanvas = document.getElementById("dice-canvas");
  if (
    diceBoxCanvas &&
    window.getComputedStyle(diceBoxCanvas).display !== "none"
  ) {
    Box.hide().clear();
  }
});

/*  --------------- DEFAULTS -------------- */
const characterDefaults = {
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
  attributesUpdates: false, // need a shallow state prop to trigger component update
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
    talentKnave1: "choose",
    talentDisad1: "choose",
    talentDisad2: "choose",
    talentLevel3: "choose",
    talentLevel5: "choose",
    talentLevel7: "choose",
    talentLevel9: "choose",
  },
  talentsUpdated: false, // need a shallow state prop to trigger component update
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
  //hasWizardry: false,
  wizardrySchools: ["Choose", "Choose"],
  thaumaturgyStartLevel: 0,
  wizardry1StartLevel: 0,
  wizardry2StartLevel: 0,
  wizardry3StartLevel: 0,
};

const useLocalStorage = JSON.parse(localStorage.getItem("autosave"));
let characterData;
let notesData;

if (useLocalStorage) {
  characterData = JSON.parse(localStorage.getItem("character"));
  notesData = JSON.parse(localStorage.getItem("notes"));
}

/**
 * TODO:
 * - Lowered Attributes / Attribute Increase modal to add to bonus
 * - clear spells (of specific color) when schools change
 * - armor and weapons for presets
 * - spells for presets
 * - add disability description to notes
 */

const CharacterSheet = () => {
  const defaultCharacterData = characterData || characterDefaults;
  const [character, setCharacter] = useState(defaultCharacterData);
  const defaultNotesData = notesData || [];
  const [notes, setNotes] = useState(defaultNotesData);
  const [notesIndex, setNotesIndex] = useState(false);
  const [schoolLimit, setSchoolLimit] = useState();
  const [diceGroup, setDiceGroup] = useState();
  const [attributeDice, setAttributeDice] = useState();
  const [autoSave, setAutoSave] = useState(useLocalStorage);

  Box.onRollComplete = (results) => {
    if (diceGroup === "attribute" || diceGroup === "all-attributes") {
      setAttributeDice(results);
    } else if (diceGroup === "hp") {
      setHpFromDice(results);
    }
  };

  useEffect(() => {
    localStorage.setItem("autosave", JSON.stringify(autoSave));
  }, [autoSave]);

  useEffect(() => {
    if (autoSave) {
      localStorage.setItem("character", JSON.stringify(character));
    }
  }, [character, autoSave]);

  useEffect(() => {
    if (autoSave) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes, autoSave]);

  const handleInputChange = (e, name) => {
    let value;
    if (e.target) {
      value = e.target.value;
    }
    setCharacter((PrevState) => ({
      ...PrevState,
      [name]: value,
    }));
  };

  const calcAspectLevel = (level, aspect) => {
    if (typeof level === "string") {
      level = parseInt(level);
    }
    let fighterLevel, priestLevel, wizardLevel, knaveLevel;
    switch (aspect) {
      case "fighter":
        fighterLevel = level;
        priestLevel = Math.max(1, Math.floor(level / 2));
        knaveLevel = Math.max(1, Math.floor(level / 2));
        wizardLevel = Math.max(1, Math.floor(level / 4));
        break;
      case "priest":
        priestLevel = level;
        fighterLevel = Math.max(1, Math.floor(level / 2));
        wizardLevel = Math.max(1, Math.floor(level / 2));
        knaveLevel = Math.max(1, Math.floor(level / 4));
        break;
      case "wizard":
        wizardLevel = level;
        knaveLevel = Math.max(1, Math.floor(level / 2));
        priestLevel = Math.max(1, Math.floor(level / 2));
        fighterLevel = Math.max(1, Math.floor(level / 4));
        break;
      case "knave":
        knaveLevel = level;
        wizardLevel = Math.max(1, Math.floor(level / 2));
        fighterLevel = Math.max(1, Math.floor(level / 2));
        priestLevel = Math.max(1, Math.floor(level / 4));
        break;

      default:
        console.error("could not find aspect name");
        break;
    }
    return {
      level,
      fighterLevel,
      priestLevel,
      wizardLevel,
      knaveLevel,
    };
  };

  const handleCharLevel = (e) => {
    const aspectLevels = calcAspectLevel(e.target.value, character.aspect);

    // adjust hp when down leveling
    if (aspectLevels.level < character.level) {
      const rolls = [...character.hp.rolls];
      const bonus = [...character.hp.bonus];
      for (let index = character.level; index > aspectLevels.level; index--) {
        rolls.splice(index, 1);
        bonus.splice(index, 1);
      }
      calcHpTotal({ rolls, bonus });
    }

    setCharacter((PrevState) => ({
      ...PrevState,
      ...aspectLevels,
    }));
  };

  const handleCharAspect = (e) => {
    const newAspectId = e.target.value;

    // adjust the character data
    let tempObject = { ...character };
    tempObject.aspect = aspectData[newAspectId].name;
    tempObject.hitDiceType = aspectData[newAspectId].hitDiceType;
    tempObject.saveModsClass = aspectData[newAspectId].saveModsClass;
    tempObject.talents.talentAssigned2 =
      aspectData[newAspectId].assignedTalent2;

    // check if any of the talents are spell casting talents
    tempObject = validateSpellCaster(tempObject);
    const aspectLevels = calcAspectLevel(tempObject.level, tempObject.aspect);

    //clear HP rolls
    tempObject.hp = {
      ...tempObject.hp,
      rolls: [],
      bonus: [],
      manual: 0,
      total: 0,
    };

    setCharacter({
      ...tempObject,
      ...aspectLevels,
    });

    // reset the optional presets picker
    const preset = document.getElementById("presetSelector");
    if (preset.value !== "choose") {
      preset.value = "choose";
      handlePreset({ target: { value: "choose" } });
    }
  };

  const handlePreset = (e) => {
    const { value } = e.target;
    let presetValues = {};
    if (value === "choose") {
      presetValues = {
        ...character,
        talents: {
          talentAssigned1: characterDefaults.talents.talentAssigned1,
          talentAssigned2: characterDefaults.talents.talentAssigned2,
          talentLevel1: characterDefaults.talents.talentLevel1,
          talentKnave1: characterDefaults.talents.talentKnave1,
          talentDisad1: characterDefaults.talents.talentDisad1,
          talentDisad2: characterDefaults.talents.talentDisad2,
          talentLevel3: characterDefaults.talents.talentLevel3,
          talentLevel5: characterDefaults.talents.talentLevel5,
          talentLevel7: characterDefaults.talents.talentLevel7,
          talentLevel9: characterDefaults.talents.talentLevel9,
        },
        disad1: characterDefaults.disad1,
        disad2: characterDefaults.disad2,
        talentsUpdated: Date.now(),
      };
    } else {
      presetValues = {
        ...character,
        aspect: presetData[value].aspect,
        talents: {
          talentAssigned1: presetData[value].talents.talentAssigned1,
          talentAssigned2: presetData[value].talents.talentAssigned2,
          talentLevel1: presetData[value].talents.talentLevel1,
          talentKnave1: presetData[value].talents.talentKnave1,
          talentDisad1: presetData[value].talents.talentDisad1,
          talentDisad2: presetData[value].talents.talentDisad2,
          talentLevel3: presetData[value].talents.talentLevel3,
          talentLevel5: presetData[value].talents.talentLevel5,
          talentLevel7: presetData[value].talents.talentLevel7,
          talentLevel9: presetData[value].talents.talentLevel9,
        },
        disad1: presetData[value].disad1,
        disad2: presetData[value].disad2,
        talentsUpdated: Date.now(),
      };
    }

    // check if any of the talents are spell casting talents
    presetValues = validateSpellCaster(presetValues);

    const hadRaceTalent =
      whichTalentAspect(character.talents.talentLevel1) === "race";
    const hasRaceTalent =
      whichTalentAspect(presetValues.talents.talentLevel1) === "race";

    if (hadRaceTalent) {
      // remove attribute bonus from previous race
      presetValues = removeRaceBonus(presetValues, character.race);
      presetValues.race = "Human";
    }
    if (hasRaceTalent) {
      // add attribute bonus from currently selected race
      presetValues = addRaceBonus(
        presetValues,
        presetValues.talents.talentLevel1
      );
    }

    const hasDurabilityTalent = Object.entries(
      presetData[value].talents
    ).filter(([key, val]) => val === "Durability")[0];

    if (hasDurabilityTalent) {
      let level = 1;
      if (hasDurabilityTalent[0].match("talentLevel")) {
        level = parseInt(hasDurabilityTalent[0].replace("talentLevel", ""));
      }
      presetValues.hp.hasDurability = level;
    }

    const aspectLevels = calcAspectLevel(
      character.level,
      presetData[value].aspect
    );

    setCharacter({
      ...presetValues,
      ...aspectLevels,
    });
  };

  // save schools that were picked in the WizardySpells component to the character data
  const handlePickSchool = (schools) => {
    setCharacter((prev) => ({
      ...prev,
      wizardrySchools: schools,
    }));
  };

  // this tells you at what level a character took a talent - needed for Wizardry schools & thaurmaturgy
  // pass it the object of the current char talents
  // returns zero if not taken at all
  const findTalentLevelSlot = (talents, talentName) => {
    if (talents.talentLevel3 === talentName) {
      return 3;
    }
    if (talents.talentLevel5 === talentName) {
      return 5;
    }
    if (talents.talentLevel7 === talentName) {
      return 7;
    }
    if (talents.talentLevel9 === talentName) {
      return 9;
    }
    if (Object.values(talents).indexOf(talentName) > -1) {
      return 1;
    }
    return 0;
  };

  // sets an index of a wizard school.
  const setWizardSchool = (color, schoolIndex) => {
    let tempObject = character.wizardrySchools.slice(0);
    // console.log("tempObject = " + tempObject);
    tempObject[schoolIndex] = color;
    // console.log("tempObject = " + tempObject);
    setCharacter((prev) => ({
      ...prev,
      wizardrySchools: tempObject,
    }));
  };

  // const fillInExtraWizSchools = () => {
  //   // if they DO have wizardry 3 then fill in the other three school slots with colors not chosen
  //   let tempObject = character.wizardrySchools.slice(0);
  //   for (let index = 0; index < magicSchools.length; index++) {
  //     if (!tempObject.includes(magicSchools[index].name)) {
  //       character.wizardrySchools.push(magicSchools[index].name);
  //     }
  //   }
  // };

  // cleans up the e wizadrySchool array and sets the wizardryNeedsToChooseSchool var
  // const wizardrySchoolCleanUp = () => {
  //   // finally, see if wizadrySchool contains a single string from the magic schools. If it does, wizardryNeedsToChooseSchool is false
  //   let needsSchool = true;
  //   for (let index = 0; index < magicSchools.level; index++) {
  //     if (character.wizardrySchools.includes(magicSchools[index].name)) {
  //       needsSchool = false;
  //     }
  //   }
  //   setCharacter((prev) => ({
  //     ...prev,
  //     wizardryNeedsToChooseSchool: needsSchool,
  //   }));
  // };

  // this will show/hide Thaumaturgy and Wizardry Spell Lists. It runs when any talent has changed.
  const validateSpellCaster = (state) => {
    //const talents = Object.values(state.talents);

    // find out at what level, if any, character has spellcasting talents
    state.thaumaturgyStartLevel = findTalentLevelSlot(
      state.talents,
      "Thaumaturgy"
    );
    state.wizardry1StartLevel = findTalentLevelSlot(
      state.talents,
      "Wizardry 1"
    );
    state.wizardry2StartLevel = findTalentLevelSlot(
      state.talents,
      "Wizardry 2"
    );
    state.wizardry3StartLevel = findTalentLevelSlot(
      state.talents,
      "Wizardry 3"
    );

    // check all talent values for 'Wizardry' and 'Thaurmaturgy'
    // const wizardryRegEx = /Wizardry/g;
    // state.hasWizardry = talents.some((e) => wizardryRegEx.test(e));

    // let hasWizardry1 = talents.includes("Wizardry 1");
    // let hasWizardry2 = talents.includes("Wizardry 2");
    // let hasWizardry3 = talents.includes("Wizardry 3");

    // if they don't have wizardry 3, dump any extra schools
    if (state.wizardry2StartLevel === 0) {
      state.wizardrySchools.slice(0, 2);
    }

    // if they don't have wizardry 2, dump  wizardry 3  & set second school to "Choose"
    if (state.wizardry2StartLevel === 0) {
      state.wizardrySchools[2] = "Choose";
      state.wizardry3StartLevel = 0;
      // hasWizardry3 = false;
      Object.entries(state.talents).forEach(([key, val]) => {
        if (val === "Wizardry 3") {
          state.talents[key] = "choose";
        }
      });
    }

    // if they don't have wizardry 1, dump any wizardry-related talents
    if (state.wizardry1StartLevel === 0) {
      state.wizardrySchools[1] = "Choose";
      state.wizardrySchools[2] = "Choose";

      state.wizardry2StartLevel = 0;
      state.wizardry3StartLevel = 0;
      // state.hasWizardry = false;

      Object.entries(state.talents).forEach(([key, val]) => {
        if (
          val === "Encumbered Casting" ||
          val === "Spell Refashionment" ||
          val === "Stealth Casting" ||
          val === "Wizardry 2" ||
          val === "Wizardry 3"
        ) {
          state.talents[key] = "choose";
        }
      });
    }

    return state;
  };

  const adjustRaceBonus = (state, race = "human", add = true) => {
    const data = raceData.filter((el) => el.name === race)[0];
    if (Object.keys(data.attributes).length > 0) {
      Object.entries(data.attributes).forEach(([key, val]) => {
        if (add) {
          state.attributes[key].bonus += val.bonus;
        } else {
          state.attributes[key].bonus -= val.bonus;
        }
        // set the racial max - min is always 3
        state.attributes[key].max = val.max;
        const newTotal =
          state.attributes[key].roll + state.attributes[key].bonus;
        // get the min/max value for the total
        state.attributes[key].total = Math.max(
          Math.min(newTotal, state.attributes[key].max),
          state.attributes[key].min
        );
        state.attributesUpdates = Date.now();
      });
    }
    state.race = race;
    state.movement = data.movement;
    state.saveModsRace = data.saveModsRace;
    state.characteristicsRace = data.characteristics;
    return state;
  };

  // alias to adjustRaceBonus
  const removeRaceBonus = (state, race) => {
    return adjustRaceBonus(state, race, false);
  };

  // alias to adjustRaceBonus
  const addRaceBonus = (state, race) => {
    return adjustRaceBonus(state, race);
  };

  const handleSetCharTalents = (e) => {
    const value = e.target.value;
    const talentSlot = e.target.id;

    let newState = { ...character };

    switch (value) {
      // if it's setting a race
      case "Dwarf":
      case "Elf":
      case "Gnome":
      case "Half-Elf":
      case "Half-Orc":
      case "Halfling":
      case "Mutant":
        if (character.race !== "Human") {
          // remove attribute bonus from previous race
          newState = removeRaceBonus(newState, character.race);
        }

        // add attribute bonus from currently selected race
        newState = addRaceBonus(newState, value);
        newState.talents[talentSlot] = value;

        // check if any of the talents are spell casting talents
        newState = validateSpellCaster(newState);

        return setCharacter(() => newState);
      // if it's nothing to do with race and just choosing a talent

      default:
        // race can only be selected in talentLevel1 - if none is picked then you're human
        if (talentSlot === "talentLevel1" && character.race !== "Human") {
          newState = removeRaceBonus(newState, character.race);
          newState.race = "Human";
          newState.movement = 30;
          newState.saveModsRace = [];
          newState.characteristicsRace = [];
        }
        // save the level "Durability" was obtained for HP calculation
        if (value === "Durability") {
          let level = 1;
          if (talentSlot.match("talentLevel")) {
            level = parseInt(talentSlot.replace("talentLevel", ""));
          }
          newState.hp.hasDurability = level;
        }
        // mark durability as being unselected
        if (character.talents[talentSlot] === "Durability") {
          newState.hp.hasDurability = false;
        }

        // save this talent to state
        newState.talents[talentSlot] = value;

        // check if any of the talents are spell casting talents
        newState = validateSpellCaster(newState);
        newState.talentsUpdated = Date.now();
        return setCharacter(() => newState);
    }
  };

  const handleSetDisad = (e) => {
    setCharacter((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const rollDice = (notation, group) => {
    setDiceGroup(group);
    Box.show().roll(notation);
  };

  const rollAttribDice = () => {
    rollDice("18d6", "all-attributes");
  };

  const updateAttributes = useCallback((attributes) => {
    setCharacter((prev) => {
      const ac =
        10 + attributes.dexterity.mod + prev.armor.modifier + prev.shield;
      const perception = 10 + attributes.wisdom.mod;
      return {
        ...prev,
        ac,
        attributes,
        perception,
      };
    });
  }, []);

  const handleArmorChange = (e) => {
    const armor = armorData[e.target.value];
    setCharacter((prev) => {
      const ac =
        10 + prev.attributes.dexterity.mod + armor.modifier + character.shield;
      return {
        ...prev,
        ac,
        armorIndex: e.target.value,
        armor,
      };
    });
  };

  const handleShieldChange = (e) => {
    const shieldBonus = parseInt(e.target.value);
    const ArmorBonus = armorData[character.armorIndex].modifier;
    const newAc =
      10 + character.attributes.dexterity.mod + ArmorBonus + shieldBonus;
    setCharacter((prev) => ({
      ...prev,
      ac: newAc,
      shield: shieldBonus,
    }));
  };

  const handleMeleeWeaponChange = (e) => {
    const index = e.target.value;
    const meleeWeapon = meleeWeaponData[index];
    setCharacter((prev) => ({
      ...prev,
      meleeWeapon,
      meleeWeaponIndex: index,
    }));
  };

  const handleRangedWeaponChange = (e) => {
    const index = e.target.value;
    const rangedWeapon = rangedWeaponData[index];
    setCharacter((prev) => ({
      ...prev,
      rangedWeapon,
      rangedWeaponIndex: index,
    }));
  };

  const setHpFromDice = (results) => {
    const rolls = [];
    const bonus = [];
    // for each character level
    // let resultIndex = 0;
    for (let index = 0; index < character.level; index++) {
      // does the character have durability for this level
      if (
        character.hp.hasDurability &&
        index + 1 >= character.hp.hasDurability
      ) {
        // pick the highest of the two dice roll results
        rolls.push(
          Math.max(
            results[0].rolls[index].value,
            results[0].rolls[index + 1].value
          )
        );
      } else {
        // store the roll result
        rolls.push(results[0].rolls[index].value);
      }
      // resultIndex++;
      bonus.push(calculateBonus(character.attributes.constitution.total));
    }

    calcHpTotal({
      rolls,
      bonus,
    });
  };

  // expects hp object
  const calcHpTotal = (hp = {}) => {
    // create new state for HP
    const newHp = { ...character.hp };

    // add new rolls
    if (hp.rolls) {
      newHp.rolls = [...hp.rolls];
    }
    // add new bonuses
    if (hp.bonus) {
      newHp.bonus = [...hp.bonus];
    }
    // add manual adjustments
    if (hp.manual) {
      newHp.manual += hp.manual;
    }
    // add durability talent level
    if (
      character.hp.hasDurability &&
      character.level >= character.hp.hasDurability
    ) {
      newHp.durabilityBonus = character.fighterLevel;
    }

    // console.log(`newHp`, newHp)

    // sum rolls
    const rollsSum = newHp.rolls.reduce((a, b) => a + b, 0);
    // sum bonus
    const bonusSum = newHp.bonus.reduce((a, b) => a + b, 0);

    const total = rollsSum + bonusSum + newHp.manual + newHp.durabilityBonus;

    // set a min value of 1 - don't want 0 or negative HP due to poor CON modifier
    newHp.total = Math.max(1, total);

    setCharacter((prev) => ({
      ...prev,
      hp: { ...newHp },
    }));
  };

  const manuallyUpdateHP = (e) => {
    calcHpTotal({ manual: e.target.value - character.hp.total });
  };

  const rollHP = () => {
    setDiceGroup("hp");
    const multiplier = character.hp.hasDurability ? 2 : 1;
    let dice = character.level * multiplier;
    Box.show().roll(`${dice}d${character.hitDiceType}`);
  };

  const [raceModalOpen, setRaceModalOpen] = useState(false);
  const toggleRaceModal = () => {
    setRaceModalOpen(!raceModalOpen);
  };

  return (
    <div className="char-sheet">
      <h1 className="char-sheet__h1">QuestRex Character Builder</h1>
      <p className="ut-no-print">
        <b>INSTRUCTIONS:</b> Play around with the form below till you get a
        character you like (it's often easiest to start with a preset). <br />
        Then print the page to paper or a PDFs. Simple! Desktop-only for now.
      </p>
      <div className="char-sheet__toolbar">
        {/*  ------- TOOLBAR ------ */}
        <div>
          {" "}
          <PresetsSelector
            presetData={presetData}
            handlePreset={handlePreset}
          />{" "}
        </div>
        <div>
          <button className="char-sheet__button" onClick={rollAttribDice}>
            <i className="fas fa-dice"></i> Roll Attributes
          </button>
        </div>
        <div>
          <button className="char-sheet__button" onClick={rollHP}>
            <i className="fas fa-dice"></i> Roll Hit Points
          </button>
        </div>
      </div>
      <div className="char-sheet__bottom-border ut-no-screen"></div>
      <div className="char-sheet__grid">
        <div className="char-sheet__col char-sheet__col--basics">
          {/*  ------- NAMEs ------ */}
          <label>
            <input
              type="text"
              value={character.namePlayer}
              name="namePlayer"
              onChange={(e) => handleInputChange(e, "namePlayer")}
              className="ut-no-print"
            />
            <div className="ut-no-screen print-text-input ut-text-cursive ">
              {character.namePlayer}&nbsp;
            </div>
            <br />
            <span className="label">Player Name</span>
          </label>

          <label>
            <input
              type="text"
              value={character.nameCharacter}
              name="namePlayer"
              className="ut-no-print"
              onChange={(e) => handleInputChange(e, "nameCharacter")}
            />
            <div className="ut-no-screen print-text-input ut-text-cursive ">
              {character.nameCharacter}
            </div>
            <br />
            <span className="label">Character Name</span>
          </label>

          <div className="flex-grid flex-grid--flex-start character-lrc">
            <div className="flex-grid__child flex-grid__child--auto ut-margin-right-1em">
              {/*  ------- LEVEL ------ */}
              <label>
                <select
                  onChange={handleCharLevel}
                  value={character.level}
                  className="ut-no-print"
                >
                  {levelsData.map((i) => (
                    <option key={i.level} value={i.level}>
                      {formatNumberSuffix(i.level)}
                    </option>
                  ))}
                </select>
                <div className="ut-no-screen print-text-input">
                  {formatNumberSuffix(character.level)}
                </div>
                <br />
                <span className="label">Level</span>
              </label>
            </div>
            <div className="flex-grid__child flex-grid__child--auto ut-margin-right-1em">
              {/*  ------- SEX ------ */}
              <label>
                <select
                  name="gender"
                  onChange={(e) => handleInputChange(e, "gender")}
                  value={character.gender}
                  className="ut-no-print"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female </option>
                  <option value="other">Other </option>
                </select>
                <div className="ut-no-screen print-text-input">
                  {character.gender}
                </div>
                <br />
                <span className="label">Sex</span>
              </label>
            </div>
          </div>
          <div className="flex-grid flex-grid--flex-start character-lrc">
            <div className="flex-grid__child flex-grid__child--auto  ut-margin-right-1em">
              {/*  ------- RACE ------ */}
              <label>
                <button
                  type="text"
                  size="8"
                  className="char-sheet__button--alt ut-no-print"
                  onClick={toggleRaceModal}
                >
                  {character.race}&nbsp;
                </button>
                <br />
                <span className="label">Race</span>
              </label>
            </div>
            <div className="flex-grid__child flex-grid__child--auto">
              {/*  ------- CLASS / "Aspects" ------ */}
              <Aspects
                character={character}
                handleCharAspect={handleCharAspect}
              ></Aspects>
            </div>
          </div>

          {/*  --------------- ATTRIBUTES -------------- */}
          <section>
            <Attributes
              onChange={updateAttributes}
              attributes={character.attributes}
              updated={character.attributesUpdates}
              onRollResults={attributeDice}
              onRoll={rollDice}
            />
          </section>
        </div>

        <div className="char-sheet__col char-sheet__col--stats">
          {/*  ------- 4 QUICK REFERENCE NUMBERS ------ */}
          <div className="char-sheet__quick-ref">
            <div className="char-sheet__quick-ref-item">
              <div className="char-sheet__quick-ref-text">
                <b>{character.ac}</b>
              </div>
              <h2 className="char-sheet__quick-ref-footer">AC</h2>
            </div>
            <div className="char-sheet__quick-ref-item">
              <div className="char-sheet__quick-ref-text">
                <input
                  className="hp"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={999}
                  value={character.hp.total}
                  onChange={manuallyUpdateHP}
                />
              </div>
              <h2 className="char-sheet__quick-ref-footer">HP</h2>
            </div>
            <div className="char-sheet__quick-ref-item">
              <div className="char-sheet__quick-ref-text">
                <b>{character.movement}'</b>
              </div>
              <h2 className="char-sheet__quick-ref-footer">Move</h2>
            </div>
            <div className="char-sheet__quick-ref-item">
              <div className="char-sheet__quick-ref-text">
                <span className="label">Roll Mod: </span>
                <b>{formatNumberModifier(character.attributes.wisdom.mod)}</b>
                <br />
                <span className="label">Passive:</span>{" "}
                <b>{character.perception}</b>
              </div>
              <h2 className="char-sheet__quick-ref-footer">Perc.</h2>
            </div>
          </div>
          {/*  ------- SAVING THROW MODS ------ */}

          <div className="char-sheet__quick-ref-item char-sheet__quick-ref--save-mods">
            <ul className="char-sheet__quick-ref-save-mods-list">
              <li className="char-sheet__quick-ref-save-mods-list-item">
                <span className="fas fa-pointer"></span>+
                {levelsData[character.level - 1].saveBonus} to all{" "}
                <span className="ut-text-explain"> (for level)</span>
              </li>
              <li className="char-sheet__quick-ref-save-mods-list-item">
                <div
                  className={`aspect-icon aspect-icon--${character.aspect}`}
                ></div>{" "}
                {character.saveModsClass}
              </li>
              {/* Remove the race saving throw mods for now 
              {character.saveModsRace.map((note, i) => (
                <li
                  className="char-sheet__quick-ref-save-mods-list-item"
                  key={i}
                >
                  <div className="aspect-icon aspect-icon--race"></div>
                  {note}
                </li>
              ))}
                 */}
            </ul>
            <h2 className="char-sheet__quick-ref-footer">Saving Throw Mods</h2>
          </div>

          <div className="flex-grid  flex-grid--flex-start">
            <div className="flex-grid__child flex-grid__child--auto ut-margin-right-1em">
              {/*  ------- ARMOR ------ */}
              <label>
                <select
                  name="armor"
                  value={character.armorIndex}
                  onChange={handleArmorChange}
                  className="ut-no-print"
                >
                  {armorData.map((armor, i) => (
                    <option key={armor.armor} value={i}>
                      {armor.armor} (+{armor.modifier})
                    </option>
                  ))}
                </select>
                <div className="ut-no-screen print-text-input">
                  {armorData[character.armorIndex].armor}{" "}
                  {character.armorIndex > 0 && (
                    <span>(+{armorData[character.armorIndex].modifier})</span>
                  )}
                </div>
                <br />
                <span className="label">Armor</span>
              </label>
            </div>
            <div className="flex-grid__child flex-grid__child--auto">
              {/*  ------- SHIELD ------ */}
              {/*  TODO: create data for shield as opposed to putting directly into form element */}
              <label>
                <select
                  name="shield"
                  value={character.shield}
                  onChange={(e) => handleShieldChange(e)}
                  className="ut-no-print"
                >
                  {shieldData.map((shield, i) => (
                    <option key={shield.name} value={i}>
                      {shield.name} (+{shield.modifier})
                    </option>
                  ))}
                </select>
                <div className="ut-no-screen print-text-input">
                  {character.shield}
                </div>
                <br />
                <span className="label">Shield</span>
              </label>
            </div>
          </div>
          {/*  ------- MELEE WEAPON ------ */}
          <label>
            <select
              name="meleeWeapon"
              value={character.meleeWeaponIndex}
              onChange={handleMeleeWeaponChange}
              className="ut-no-print"
            >
              {meleeWeaponData.map((weapon, i) => (
                <option key={weapon.name} value={i}>
                  {weapon.name} ({weapon.damage})
                </option>
              ))}
            </select>
            <div className="ut-no-screen print-text-input">
              {meleeWeaponData[character.meleeWeaponIndex].name}
              {character.meleeWeaponIndex > 0 && (
                <span>
                  ({meleeWeaponData[character.meleeWeaponIndex].damage})
                </span>
              )}
            </div>
            <br />
            <span className="label">Melee Weapon</span>
          </label>

          {/*  ------- RANGED WEAPON ------ */}
          <label>
            <select
              name="rangedWeapon"
              value={character.rangedWeaponIndex}
              onChange={handleRangedWeaponChange}
              className="ut-no-print"
            >
              {rangedWeaponData.map((weapon, i) => (
                <option key={weapon.name} value={i}>
                  {weapon.name} ({weapon.damage})
                </option>
              ))}
            </select>
            <div className="ut-no-screen print-text-input">
              {rangedWeaponData[character.rangedWeaponIndex].name}
              {character.rangedWeaponIndex > 0 && (
                <span>
                  ({rangedWeaponData[character.rangedWeaponIndex].damage})
                </span>
              )}
            </div>
            <br />
            <span className="label">Ranged Weapon</span>
          </label>
        </div>

        <div className="char-sheet__col char-sheet__col--details">
          {/*  ------- EXPLAINER BOX ------ */}
          <div className="char-sheet__quick-ref-item  char-sheet__quick-ref--explain">
            <div className="char-sheet__quick-ref-text"></div>
            <h2 className="char-sheet__quick-ref-footer">
              Symbol or Character Sketch
            </h2>
          </div>

          {/*  ------- ALIGNMENT ------ */}
          <label>
            <select
              name="alignment"
              onChange={(e) => handleInputChange(e, "alignment")}
              value={character.alignment}
              className="ut-no-print"
            >
              <option value="Lawful Good">Lawful Good </option>
              <option value="Neutral Good">Neutral Good </option>
              <option value="Chaotic Good">Chaotic Good </option>
              <option value="Lawful Neutral">Lawful Neutral </option>
              <option value="Neutral">Neutral</option>
              <option value="Chaotic Neutral">Chaotic Neutral </option>
              <option value="Lawful Evil">Lawful Evil </option>
              <option value="Neutral Evil">Neutral Evil</option>
              <option value="Chaotic Evil">Chaotic Evil </option>
            </select>
            <div className="ut-no-screen print-text-input">
              {character.alignment}
            </div>
            <br />
            <span className="label">Alignment</span>
          </label>

          {/*  ------- DISADS ------ */}
          <label>
            <DisadSelector
              id="disad1"
              character={character}
              handleSetDisad={handleSetDisad}
            />
            <span className="label">
              Disad 1{" "}
              <span className="ut-text-explain ut-no-print">(optional)</span>
            </span>
          </label>

          <label>
            <DisadSelector
              id="disad2"
              character={character}
              handleSetDisad={handleSetDisad}
            />
            <span className="label">
              Disad 2{" "}
              <span className="ut-text-explain ut-no-print">(optional)</span>
            </span>
          </label>

          {/*  ------- XP ------ */}
          <label>
            <input type="text" disabled className="ut-no-print" />
            <div className="ut-no-screen print-text-input"></div>
            <br />
            <span className="label">XP/AP</span>
          </label>
        </div>
      </div>
      {/*  --------------- BIG TABLE WITH LEVELS & TALENT PICKER -------------- */}
      <section className="char-sheet__section char-sheet__section--talents">
        <LevelsTable
          character={character}
          // talentDisabled={talentDisabled}
          handleSetCharTalents={handleSetCharTalents}
        />
      </section>

      {/*  --------------- SPELLS -------------- */}
      {character.wizardry1StartLevel > 0 &&
        character.level >= character.wizardry1StartLevel && (
          <WizardrySpells
            charLevel={character.level}
            wizLevel={character.wizardLevel}
            intStat={character.attributes.intelligence.total}
            wizardrySchools={character.wizardrySchools}
            // schoolLimit={schoolLimit}
            onPickSchool={handlePickSchool}
            setWizardSchool={setWizardSchool}
            wizardry1StartLevel={character.wizardry1StartLevel}
            wizardry2StartLevel={character.wizardry2StartLevel}
            wizardry3StartLevel={character.wizardry3StartLevel}
            useLocalStorage={useLocalStorage}
          />
        )}
      {character.thaumaturgyStartLevel > 0 &&
        character.level >= character.thaumaturgyStartLevel && (
          <ThaumaturgySpells
            level={character.priestLevel}
            wisStat={character.attributes.wisdom.total}
            useLocalStorage={useLocalStorage}
          />
        )}

      {/*  --------------- NOTES -------------- */}
      <section className="char-sheet__section char-sheet__section--notes">
        <h2 className="char-sheet__h2">Notes</h2>
        <Notes
          notes={notes}
          setNotes={setNotes}
          notesIndex={notesIndex}
          setNotesIndex={setNotesIndex}
          character={character}
        />
      </section>

      {/*  --------------- TALENT DETAILS -------------- */}
      <section className="char-sheet__section char-sheet__section--notes">
        <h2 className="char-sheet__h2">Talent Details</h2>
        <TalentDetails character={character} />
      </section>

      <div className="char-sheet__bottom-border char-sheet__bottom-border--flip ut-no-screen"></div>
      {/*  ------- MODAL WITH CLASS PICKER ------ */}
      <ReactModal
        isOpen={raceModalOpen}
        onRequestClose={toggleRaceModal}
        contentLabel="Choose Class"
        className="modal"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <div className="modal__header">
          <h2 className="modal__h2">Choosing a Race</h2>
          <button
            className="button modal__header-button"
            onClick={toggleRaceModal}
            aria-label="Close modal"
          >
            X
          </button>
        </div>
        <div className="modal__body">
          <p className="ut-margin-top-0">
            To be any race other than human costs one talent slot. This can only
            be chosen when a character is first created, it never changes, and
            only ONE race talent may ever be taken.
          </p>
          <p>
            Choose in the <b>talents section below</b> and it will be reflected
            here as well.
          </p>
          <img
            src="assets/images/race-choose-screenshot.png"
            alt="QuestRex race picker "
          />
        </div>
        <div className="modal__footer">
          <button
            className="char-sheet__button char-sheet__button--large"
            onClick={toggleRaceModal}
          >
            Close
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default React.memo(CharacterSheet);
