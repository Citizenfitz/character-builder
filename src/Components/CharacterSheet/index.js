import React, { useEffect, useState, useCallback, useRef } from "react";
import DiceBox from "@3d-dice/dice-box";
import LevelsTable from "./LevelsTable";
import PresetsSelector from "./PresetsSelector";
import DisadSelector from "./DisadSelector";
import Attributes from "./Attributes";
import Aspects from "./Aspects";
import Notes from "./Notes";
import { QuestRexDialog } from "../Common/Dialog";
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
import DisadDetails from "./DisadDetails";
import MutationDetails from "./MutationDetails";
import WildPsionics from "./WildPsionics";
import diceRoller from "../Utilities/diceRoller";

/*  --------------- DICE BOX -------------- */
// Function to roll dice with fallback
const rollDiceWithFallback = (box, diceNotation) => {
  // Parse dice notation (e.g. "3d6")
  const [count, sides] = diceNotation.split("d").map(Number);

  if (box) {
    try {
      box.show().roll(diceNotation);
      return null; // Return null since result will come through onRollComplete
    } catch (error) {
      console.warn("Error rolling 3D dice:", error);
    }
  }

  // Fallback to basic dice roller
  const results = [];
  for (let i = 0; i < count; i++) {
    results.push({
      value: diceRoller(1, sides, 0, false),
    });
  }

  return [
    {
      rolls: results,
      value: results.reduce((sum, roll) => sum + roll.value, 0),
    },
  ];
};

// Export rollDiceWithFallback for use in other components
export const getRollFunction = () => rollDiceWithFallback;

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

// Custom hook for dice box initialization
const useDiceBox = (onRollComplete) => {
  const [box, setBox] = useState(null);

  useEffect(() => {
    let Box;
    try {
      // Check for WebGL support
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

      if (!gl) {
        console.warn("WebGL not supported - 3D dice rolling will be disabled");
        return;
      }

      Box = new DiceBox("#dice-box", {
        id: "dice-canvas",
        assetPath: "/assets/dice-box/",
        themeColor: "#883c8d",
        startingHeight: 12,
        throwForce: 6,
        gravity: 2,
      });

      // Initialize DiceBox
      Box.init();
      // Set up the roll complete handler
      Box.onRollComplete = onRollComplete;
      setBox(Box);

      // clear dice on click anywhere on the screen
      const handleMouseDown = () => {
        try {
          const diceBoxCanvas = document.getElementById("dice-canvas");
          if (
            diceBoxCanvas &&
            window.getComputedStyle(diceBoxCanvas).display !== "none" &&
            Box
          ) {
            Box.hide().clear();
          }
        } catch (error) {
          console.warn("Error clearing dice:", error);
        }
      };

      document.addEventListener("mousedown", handleMouseDown);

      // Cleanup
      return () => {
        document.removeEventListener("mousedown", handleMouseDown);
      };
    } catch (error) {
      console.warn("Error setting up dice box:", error);
    }
  }, [onRollComplete]); // Only re-run if onRollComplete changes

  return box;
};

const CharacterSheet = () => {
  const componentRef = useRef();

  const defaultCharacterData = characterData || characterDefaults;
  const [character, setCharacter] = useState(defaultCharacterData);
  const defaultNotesData = notesData || [];
  const [notes, setNotes] = useState(defaultNotesData);
  const [notesIndex, setNotesIndex] = useState(false);
  const [schoolLimit, setSchoolLimit] = useState();
  const [diceGroup, setDiceGroup] = useState();
  const [attributeDice, setAttributeDice] = useState();
  const [autoSave, setAutoSave] = useState(useLocalStorage);

  const handleRollComplete = useCallback(
    (results) => {
      if (diceGroup === "attribute" || diceGroup === "all-attributes") {
        setAttributeDice(results);
      } else if (diceGroup === "hp") {
        setHpFromDice(results);
      }
    },
    [diceGroup]
  );

  const box = useDiceBox(handleRollComplete);

  // Update the rollDice function to use rollDiceWithFallback
  const rollDice = (notation, group) => {
    setDiceGroup(group);
    return rollDiceWithFallback(box, notation);
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
      handlePreset("choose");
    }
  };

  const handlePreset = (e) => {
    // Handle both direct preset ID and event cases
    const presetId = e.target ? e.target.value : e;

    // Early return if "choose" is selected
    if (presetId === "choose") {
      setCharacter((prev) => ({
        ...prev,
        talents: {
          ...characterDefaults.talents,
        },
        disad1: characterDefaults.disad1,
        disad2: characterDefaults.disad2,
        talentsUpdated: Date.now(),
      }));
      return;
    }

    // Find the preset
    const preset = presetData[presetId]; // Changed from find to direct index access
    if (!preset) return;

    // Create new character with preset data
    let presetValues = {
      ...character,
      aspect: preset.aspect,
      talents: {
        ...characterDefaults.talents,
        ...preset.talents,
      },
      disad1: preset.disad1,
      disad2: preset.disad2,
      talentsUpdated: Date.now(),
    };

    // check if any of the talents are spell casting talents
    presetValues = validateSpellCaster(presetValues);

    const hadRaceTalent =
      whichTalentAspect(character.talents.talentLevel1) === "race";
    const hasRaceTalent =
      whichTalentAspect(presetValues.talents.talentLevel1) === "race";

    if (hadRaceTalent) {
      presetValues = removeRaceBonus(presetValues, character.race);
      presetValues.race = "Human";
    }
    if (hasRaceTalent) {
      presetValues = addRaceBonus(
        presetValues,
        presetValues.talents.talentLevel1
      );
    }

    const aspectLevels = calcAspectLevel(character.level, preset.aspect);

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
    const diceNotation = `${dice}d${character.hitDiceType}`;
    const result = rollDiceWithFallback(box, diceNotation);
    if (result) {
      // If we got an immediate result (fallback was used)
      setHpFromDice(result);
    }
  };

  const [raceModalOpen, setRaceModalOpen] = useState(false);
  const toggleRaceModal = () => {
    setRaceModalOpen(!raceModalOpen);
  };

  const handleCharRace = (e) => {
    const newRace = e.target.value;
    setCharacter((prevChar) => {
      const newChar = { ...prevChar, race: newRace };
      // Remove bonuses from old race and add bonuses from new race
      const withoutOldRace = removeRaceBonus(newChar, prevChar.race);
      const withNewRace = addRaceBonus(withoutOldRace, newRace);
      return withNewRace;
    });
    toggleRaceModal();
  };

  return (
    <div id="char-sheet" className="char-sheet">
      <section className="char-sheet__section char-sheet__section--top">
        <h1 className="char-sheet__h1">QuestRex Character Builder</h1>
        <p className="ut-no-print">
          <b>INSTRUCTIONS:</b> Play around with the form below till you get a
          character you like (it's often easiest to start with a preset). <br />
          Then print the page to paper or a PDF. Simple! Desktop-only for now.
        </p>
        <div className="char-sheet__toolbar ut-no-print">
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
          <div>
            <button
              className="char-sheet__button"
              onClick={() => window.print()}
            >
              <i className="fas fa-print"></i> Print Sheet
            </button>
          </div>
        </div>

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
              <div className="ut-no-screen print-text-input">
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
              <div className="ut-no-screen print-text-input">
                {character.nameCharacter}
              </div>
              <br />
              <span className="label">Character Name</span>
            </label>

            <div className="flex-grid">
              <div className="ut-margin-left-xs ut-margin-right-sm-alt">
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
              <div>
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
            <div className="flex-grid flex-grid--flex-start ">
              <div className="ut-margin-left-xs ut-margin-right-sm-alt">
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
                  <div className="ut-no-screen print-text-input">
                    {character.race}
                  </div>
                  <br />
                  <span className="label">Race</span>
                </label>
              </div>
              <div>
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
                    className="hp  ut-no-print"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={999}
                    value={character.hp.total}
                    onChange={manuallyUpdateHP}
                  />
                  <b className="ut-no-screen">{character.hp.total}</b>
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
                  <span className="label label--inline">Roll Mod: </span>
                  <b>{formatNumberModifier(character.attributes.wisdom.mod)}</b>
                  <br />
                  <span className="label label--inline">Passive:</span>{" "}
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
                    className={`icon-aspect icon-aspect--${character.aspect}`}
                  ></div>{" "}
                  {character.saveModsClass}
                </li>
                {/* Remove the race saving throw mods for now 
                  {character.saveModsRace.map((note, i) => (
                    <li
                      className="char-sheet__quick-ref-save-mods-list-item"
                      key={i}
                    >
                      <div className="icon-aspect icon-aspect--race"></div>
                      {note}
                    </li>
                  ))}
                     */}
              </ul>
              <h2 className="char-sheet__quick-ref-footer">
                Saving Throw Mods
              </h2>
            </div>

            <div className="flex-grid  flex-grid--flex-start">
              <div className="ut-margin-left-xs ut-margin-right-sm-alt">
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
      </section>

      {/*  --------------- BIG TABLE WITH LEVELS & TALENT PICKER -------------- */}
      <section className="char-sheet__section char-sheet__section--talents">
        <LevelsTable
          character={character}
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

      {/* --------- Wild Psionics section --------- */}
      {Object.values(character.talents).some(
        (talent) => talent === "Wild Psionics"
      ) && (
        <section className="char-sheet__section char-sheet__section--wild-psionics">
          <WildPsionics character={character} setCharacter={setCharacter} />
        </section>
      )}

      {/* --------- Mutation Details section --------- */}
      {character.race === "Mutant" && (
        <section className="char-sheet__section char-sheet__section--mutation-details">
          <h2 className="char-sheet__h2">Mutation Details</h2>
          <MutationDetails character={character} setCharacter={setCharacter} />
        </section>
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

      {/* Disadvantage Details section */}
      {(character.disad1 !== "none" || character.disad2 !== "none") && (
        <section className="char-sheet__section char-sheet__section--disad-details">
          <h2 className="char-sheet__h2">Disadvantage Details</h2>
          <DisadDetails character={character} />
        </section>
      )}

      {/*  --------------- TALENT DETAILS -------------- */}
      <section className="char-sheet__section char-sheet__section--talent-details">
        <h2 className="char-sheet__h2">Talent Details</h2>
        <TalentDetails character={character} />
      </section>

      {/*  ------- MODALS ------ */}
      <QuestRexDialog
        isOpen={raceModalOpen}
        onClose={toggleRaceModal}
        title="Choose Race"
      >
        <div className="flex-grid">
          <div className="flex-grid__child--half">
            <ul className="race-radio-set">
              {raceData.map((i) => (
                <li key={i.name} className="race-radio-set__item">
                  <input
                    type="radio"
                    name="race"
                    value={i.name}
                    id={i.name}
                    checked={character.race === i.name}
                    onChange={handleCharRace}
                    className="race-radio-button"
                  ></input>
                  <label
                    htmlFor={i.name}
                    className={`race-radio-label race-radio-label--${i.name}`}
                  >
                    {i.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-grid__child--half">
            <h2 className="race-picker-desc__header">{character.race}</h2>
            <ul className="race-picker-desc__list">
              <li>
                <b className="ut-text-header">Description:</b> desc
              </li>
              <li>
                <b className="ut-text-header">Characteristics:</b>{" "}
                {character.characteristicsRace.join(", ")}
              </li>
              <li>
                <b className="ut-text-header">Saving Throw Mods:</b>{" "}
                {character.saveModsRace.join(", ")}
              </li>
            </ul>
          </div>
        </div>
      </QuestRexDialog>
      <footer className="char-sheet__footer">
        QuestRex - A Fantasy Tabletop RPG
      </footer>
    </div>
  );
};

export default React.memo(CharacterSheet);
