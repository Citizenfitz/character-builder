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
import { useCharacter } from "./hooks/useCharacter";
import { useDiceBox } from "./hooks/useDiceBox";
import { useEquipment } from "./hooks/useEquipment";
import { useRaceAspect } from "./hooks/useRaceAspect";
import { useHP } from "./hooks/useHP";
import useSpells from "./hooks/useSpells";
import CharacterBasics from "./components/CharacterBasics";
import RaceAspect from "./components/RaceAspect";
import Equipment from "./components/Equipment";
import HPManager from "./components/HPManager";
import QuickStats from "./components/QuickStats";
import CharacterDetails from "./components/CharacterDetails";
import LevelSelector from "./components/LevelSelector";

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
  xp: "",
};

const CharacterSheet = () => {
  // Move these up before any state initialization
  const useLocalStorage = JSON.parse(localStorage.getItem("autosave"));
  const defaultCharacterData = useLocalStorage
    ? JSON.parse(localStorage.getItem("character"))
    : characterDefaults;
  const defaultNotesData = useLocalStorage
    ? JSON.parse(localStorage.getItem("notes"))
    : [];

  // Initialize hooks
  const { character, updateCharacter, resetCharacter, autoSave, setAutoSave } =
    useCharacter(defaultCharacterData);

  const diceBox = useDiceBox();
  const equipment = useEquipment(character, updateCharacter);
  const raceAspect = useRaceAspect(character, updateCharacter);
  const hp = useHP(character, updateCharacter, diceBox);
  const spells = useSpells(character);

  // Other state
  const [notes, setNotes] = useState(defaultNotesData);
  const [notesIndex, setNotesIndex] = useState(false);
  const [schoolLimit, setSchoolLimit] = useState();
  const [diceGroup, setDiceGroup] = useState();
  const [attributeDice, setAttributeDice] = useState();
  const [raceModalOpen, setRaceModalOpen] = useState(false);

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

  const handleInputChange = (e, field) => {
    console.log("handleInputChange called with:", {
      value: e.target.value,
      field,
    });

    // Create the update explicitly
    const update = {
      ...character,
      [field]: e.target.value,
    };

    console.log("About to update character with:", update);
    updateCharacter(update);
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
    const newLevel = parseInt(e.target.value);
    const aspectLevels = calcAspectLevel(newLevel, character.aspect);

    // Create new state object with all required updates
    const newState = {
      ...character,
      level: newLevel,
      fighterLevel: aspectLevels.fighterLevel,
      priestLevel: aspectLevels.priestLevel,
      wizardLevel: aspectLevels.wizardLevel,
      knaveLevel: aspectLevels.knaveLevel,
    };

    // Handle HP adjustments for level change
    if (newLevel < character.level) {
      const rolls = [...character.hp.rolls];
      const bonus = [...character.hp.bonus];
      for (let index = character.level; index > newLevel; index--) {
        rolls.pop();
        bonus.pop();
      }
      newState.hp = {
        ...character.hp,
        rolls,
        bonus,
      };
      calcHpTotal(newState.hp);
    }

    // Update character with all changes
    updateCharacter(newState);
  };

  const handleCharAspect = (e) => {
    const newAspectIndex = parseInt(e.target.value);
    const newAspectInfo = aspectData[newAspectIndex];

    // adjust the character data
    let tempObject = { ...character };
    tempObject.aspect = newAspectInfo.name;
    tempObject.hitDiceType = newAspectInfo.hitDiceType;
    tempObject.saveModsClass = newAspectInfo.saveModsClass;
    tempObject.talents.talentAssigned2 = newAspectInfo.assignedTalent2;

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

    updateCharacter({
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
    const value = e.target.value;
    if (value === "choose") return;

    let presetValues = {
      ...character,
      ...presetData[value],
      attributes: {
        ...dataAttributes,
        ...(presetData[value].attributes || {}),
      },
    };

    // First, remove any existing race bonuses
    if (character.race !== "Human") {
      presetValues = removeRaceBonus(presetValues, character.race);
    }

    // Reset to human by default
    presetValues.race = "Human";
    presetValues.saveModsRace = [];
    presetValues.characteristicsRace = [];
    presetValues.movement = 30;

    // Then check for and apply new race if present
    const raceTalent = Object.entries(presetValues.talents).find(([key, val]) =>
      [
        "Dwarf",
        "Elf",
        "Gnome",
        "Half-Elf",
        "Half-Orc",
        "Halfling",
        "Mutant",
      ].includes(val)
    );

    if (raceTalent) {
      const newRace = raceTalent[1];
      presetValues = addRaceBonus(presetValues, newRace);
      presetValues.race = newRace;
    }

    // Handle other talent effects
    presetValues = validateSpellCaster(presetValues);

    const aspectLevels = calcAspectLevel(character.level, presetValues.aspect);
    updateCharacter({
      ...presetValues,
      ...aspectLevels,
    });
  };

  // save schools that were picked in the WizardySpells component to the character data
  const handlePickSchool = (schools) => {
    updateCharacter((prev) => ({
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
    updateCharacter((prev) => ({
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

    // First handle race changes
    if (
      [
        "Dwarf",
        "Elf",
        "Gnome",
        "Half-Elf",
        "Half-Orc",
        "Halfling",
        "Mutant",
      ].includes(value)
    ) {
      // Remove old race bonuses if any
      if (character.race !== "Human") {
        newState = removeRaceBonus(newState, character.race);
      }

      // Apply new race
      newState = addRaceBonus(newState, value);
      newState.race = value;
      newState.talents[talentSlot] = value;
    } else {
      // If changing talentLevel1 and it was a race talent, reset to human
      if (
        talentSlot === "talentLevel1" &&
        [
          "Dwarf",
          "Elf",
          "Gnome",
          "Half-Elf",
          "Half-Orc",
          "Halfling",
          "Mutant",
        ].includes(character.talents[talentSlot])
      ) {
        newState = removeRaceBonus(newState, character.race);
        newState.race = "Human";
        newState.saveModsRace = [];
        newState.characteristicsRace = [];
        newState.movement = 30;
      }

      // Handle other talents
      if (value === "Durability") {
        let level = 1;
        if (talentSlot.match("talentLevel")) {
          level = parseInt(talentSlot.replace("talentLevel", ""));
        }
        newState.hp.hasDurability = level;
      } else if (character.talents[talentSlot] === "Durability") {
        newState.hp.hasDurability = false;
      }

      newState.talents[talentSlot] = value;
    }

    newState = validateSpellCaster(newState);
    newState.talentsUpdated = Date.now();

    updateCharacter(newState);
  };

  const handleSetDisad = (e) => {
    console.log("Handling disad change:", e.target);
    const { id, value } = e.target;
    updateCharacter((prev) => ({
      ...prev,
      [id]: value,
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
    updateCharacter((prev) => {
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

    updateCharacter((prev) => ({
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

  const toggleRaceModal = () => {
    setRaceModalOpen(!raceModalOpen);
  };

  const handleAlignmentChange = (e) => {
    console.log("Handling alignment change:", e.target.value);
    const update = {
      ...character,
      alignment: e.target.value,
    };
    console.log("About to update character with:", update);
    updateCharacter(update);
  };

  const handleDisadChange = (e) => {
    console.log("Handling disad change:", e.target);
    const { id, value } = e.target;
    const update = {
      ...character,
      [id]: value,
    };
    console.log("About to update character with:", update);
    updateCharacter(update);
  };

  return (
    <div className="char-bldr">
      <h2 className="char-bldr__h2">
        QuestRex<span className="ut_tm">®</span> Character Builder
      </h2>
      <p className="ut-text-explain ut-no-print">
        <b>Instructions:</b> Play around with the form below till you get a
        character you like (it's often easiest to start with a preset). <br />
        Then print the page to paper or a PDFs. Simple! Desktop-only for now.
      </p>
      <div className="char-bldr__toolbar flex-grid flex-grid--flex-start">
        {/*  ------- TOOLBAR ------ */}
        <div>
          {" "}
          <PresetsSelector
            presetData={presetData}
            handlePreset={handlePreset}
          />{" "}
        </div>
        <div>
          <button onClick={rollAttribDice}>Roll Attributes</button>
        </div>
        <div>
          <button onClick={rollHP}>Roll Hit Points</button>
        </div>
      </div>
      <div className="char-bldr__bottom-border ut-no-screen"></div>
      <div className="char-sheet-grid">
        {/* Left Column */}
        <div className="char-sheet-grid__basics">
          <CharacterBasics
            character={character}
            onNameChange={handleInputChange}
            onLevelChange={handleCharLevel}
            onRaceClick={toggleRaceModal}
            onAspectChange={handleCharAspect}
            aspectData={aspectData}
          />

          <section className="char-sheet-grid__attributes">
            <Attributes
              onChange={updateAttributes}
              attributes={character.attributes}
              updated={character.attributesUpdates}
              onRollResults={attributeDice}
              onRoll={rollDice}
            />
          </section>
        </div>

        {/* Middle Column */}
        <div className="char-sheet-grid__stats">
          <QuickStats character={character} onHPChange={manuallyUpdateHP} />

          <div className="data-display-box data-display-box--save-mods">
            <div className="data-display-box__text">
              <ul className="data-display-box__save-mods-list">
                <li className="data-display-box__save-mods-list-item">
                  <span className="fas fa-pointer ut-color-royal"></span>+
                  {levelsData[character.level - 1].saveBonus} to all{" "}
                  <span className="ut-text-explain"> (for level)</span>
                </li>
                <li className="data-display-box__save-mods-list-item">
                  <div
                    className={`aspect-icon aspect-icon--${character.aspect}`}
                  ></div>{" "}
                  {character.saveModsClass}
                </li>
                {character.saveModsRace.map((note, i) => (
                  <li className="data-display-box__save-mods-list-item" key={i}>
                    <div className="aspect-icon aspect-icon--race"></div>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
            <h2 className="data-display-box__header">Saving Throw Mods</h2>
          </div>

          <Equipment
            character={character}
            onArmorChange={equipment.handleArmorChange}
            onShieldChange={equipment.handleShieldChange}
            onMeleeWeaponChange={equipment.handleMeleeWeaponChange}
            onRangedWeaponChange={equipment.handleRangedWeaponChange}
          />
        </div>

        {/* Right Column */}
        <div className="char-sheet-grid__details">
          <CharacterDetails
            character={character}
            onAlignmentChange={handleAlignmentChange}
            onDisadChange={handleDisadChange}
          />
        </div>
      </div>
      {/*  --------------- BIG TABLE WITH LEVELS & TALENT PICKER -------------- */}
      <section>
        <LevelsTable
          character={character}
          // talentDisabled={talentDisabled}
          handleSetCharTalents={handleSetCharTalents}
        />
      </section>
      {/*  --------------- READ-ONLY SPECIAL ABILITIES & NOTES -------------- */}
      <section className="section--notes">
        <h2>Special Abilites &amp; Notes</h2>
        <Notes
          notes={notes}
          setNotes={setNotes}
          notesIndex={notesIndex}
          setNotesIndex={setNotesIndex}
          character={character}
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
      <div className="autosave">
        <label>
          <input
            type="checkbox"
            checked={autoSave}
            value="autosave"
            onChange={() => setAutoSave(!autoSave)}
          />
          <span>Auto save</span>
        </label>
      </div>
      <div className="char-bldr__bottom-border char-bldr__bottom-border--flip ut-no-screen"></div>
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
            className="button button--primary button--large"
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
