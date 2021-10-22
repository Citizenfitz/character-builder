import React, { useEffect, useState, useCallback } from "react";
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
} from "../../Data";
import {
  calculateBonus,
  // formatNumberModifier,
  whichTalentAspect,
  whichAspectId,
  formatNumberSuffix,
} from "../Utilities";
import ThaumaturgySpells from "./ThaumaturgySpells";
import WizardrySpells from "./WizardrySpells";

/*  --------------- DICE BOX -------------- */
// create new DiceBox class
const Box = new DiceBox("#dice-box", {
  theme: "purpleRock",
  assetPath: "/assets/dice-box/",
});

// initalize DiceBox onDomReady so canvas can be properly measured
document.addEventListener("DOMContentLoaded", () => {
  // set the onRollComplete function
  Box.init();
});

// clear dice on click anywhere on the screen
document.addEventListener("mousedown", () => {
  const diceBoxCanvas = document.getElementById("dice-canvas");
  if (window.getComputedStyle(diceBoxCanvas).display !== "none") {
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
    total: 0 // total value
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
  armorIndex: 0,
  meleeWeapon: meleeWeaponData[0],
  meleeWeaponIndex: 0,
  rangedWeapon: rangedWeaponData[0],
  rangedWeaponIndex: 0,
  characteristicsRace: [],
  hasWizardry: false,
  hasThaumaturgy: false,
  wizardrySchools: [],
};

const useLocalStorage = false;
let characterData;
let notesData;

if (useLocalStorage) {
  characterData = JSON.parse(localStorage.getItem("character"));
  notesData = JSON.parse(localStorage.getItem("notes"));
}

/**
 * TODO:
 * - only show spell tables if talent is at level. e.g.: 3rd level talent but character is only on 1st level
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
  const [diceGroup, setDiceGroup] = useState()
  const [attributeDice, setAttributeDice] = useState();

  Box.onRollComplete = (results) => {
    if(diceGroup === "attribute" || diceGroup === "all-attributes") {
      setAttributeDice(results)
    } else if(diceGroup === "hp") {
      setHpFromDice(results)
    }
  };

  useEffect(() => {
    if (useLocalStorage) {
      localStorage.setItem("character", JSON.stringify(character));
    }
  }, [character]);

  useEffect(() => {
    if (useLocalStorage) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

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
    if(aspectLevels.level < character.level) {
      const rolls = [...character.hp.rolls]
      const bonus = [...character.hp.bonus]
      for (let index = character.level; index > aspectLevels.level; index--) {
        rolls.splice(index,1)
        bonus.splice(index,1)
      }
      calcHpTotal({rolls,bonus})
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
      total: 0
    }

    setCharacter({
      ...tempObject,
      ...aspectLevels,
    });

    // reset the optional presets picker
    const preset = document.getElementById("presetSelector")
    if(preset.value !== "choose") {
      preset.value = "choose"
      handlePreset({target:{value:"choose"}})
    }
  };

  const handlePreset = (e) => {
    const { value } = e.target;
    let presetValues = {}
    if(value === "choose"){
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
      }
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
      }
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

    const hasDurabilityTalent = Object.entries(presetData[value].talents).filter(([key,val]) => val === "Durability")[0]

    if(hasDurabilityTalent){
      let level = 1
      if(hasDurabilityTalent[0].match('talentLevel')){
        level = parseInt(hasDurabilityTalent[0].replace('talentLevel',''))
      }
      presetValues.hp.hasDurability = level
    }

    setCharacter(presetValues);
  };

  // save schools that were picked in the WizardySpells component to the character data
  const handlePickSchool = (schools) => {
    setCharacter((prev) => ({
      ...prev,
      wizardrySchools: schools,
    }));
  };

  // this will show/hide Thaumaturgy and Wizardry Spell Lists. It runs when any talent has changed.
  const validateSpellCaster = (state) => {
    const talents = Object.values(state.talents);

    // check all talent values for 'Wizardry' and 'Thaurmaturgy'
    const wizardryRegEx = /Wizardry/g;
    state.hasWizardry = talents.some((e) => wizardryRegEx.test(e));
    state.hasThaumaturgy = talents.includes("Thaumaturgy");

    let hasWizardry1 = talents.includes("Wizardry 1");
    let hasWizardry2 = talents.includes("Wizardry 2");
    let hasWizardry3 = talents.includes("Wizardry 3");

    if (!hasWizardry2) {
      Object.entries(state.talents).forEach(([key, val]) => {
        if (val === "Wizardry 3") {
          state.talents[key] = "choose";
          hasWizardry3 = false;
        }
      });
    }

    if (!hasWizardry1) {
      state.hasWizardry = false;
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
      hasWizardry2 = false;
      hasWizardry3 = false;
    }

    // check that Wiz school has been selected
    if (state.hasWizardry) {
      let schoolCount = [1, 2, 5];
      let level = 0;
      level += hasWizardry2 ? 1 : 0;
      level += hasWizardry3 ? 1 : 0;
      // if the school count allowed does not match our character's school count, then show the "Schools of Magic" modal for editing
      if (schoolCount[level] !== character.wizardrySchools.length) {
        setSchoolLimit(schoolCount[level]);
      }
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
        if(value === 'Durability'){
          let level = 1
          if(talentSlot.match('talentLevel')){
            level = parseInt(talentSlot.replace('talentLevel',''))
          }
          newState.hp.hasDurability = level
        }
        // mark durability as being unselected
        if(character.talents[talentSlot] === 'Durability') {
          newState.hp.hasDurability = false
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
    setDiceGroup(group)
    Box.show().roll(notation)
  }

  const updateAttributes = useCallback((attributes) => {
    setCharacter((prev) => {
      const ac = 10 + attributes.dexterity.mod + prev.armor.ac + prev.shield;
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
        10 + prev.attributes.dexterity.mod + armor.ac + character.shield;
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
    const ArmorBonus = armorData[character.armorIndex].ac;
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
    const rolls = []
    const bonus = []
    // for each character level
    let resultIndex = 0
    for (let index = 0; index < character.level; index++) {
      // does the character have durability for this level
      if(character.hp.hasDurability && index+1 >= character.hp.hasDurability) {
        // pick the highest of the two dice roll results
        rolls.push(Math.max(results[resultIndex].rolls[0].result,results[resultIndex].rolls[1].result))
      } else {
        // store the roll result
        rolls.push(results[resultIndex].rolls[0].result)
      }
      resultIndex++
      bonus.push(calculateBonus(character.attributes.constitution.total))
    }

    calcHpTotal({
      rolls,
      bonus
    })
  }

  // expects hp object
  const calcHpTotal = (hp = {}) => {

    // create new state for HP
    const newHp = {...character.hp}

    // add new rolls
    if(hp.rolls){
      newHp.rolls = [...hp.rolls]
    }
    // add new bonuses
    if(hp.bonus){
      newHp.bonus = [...hp.bonus]
    }
    // add manual adjustments
    if(hp.manual){
      newHp.manual += hp.manual
    }
    // add durability talent level
    if(character.hp.hasDurability && character.level >= character.hp.hasDurability) {
      newHp.durabilityBonus = character.fighterLevel
    }

    console.log(`newHp`, newHp)

    // sum rolls
    const rollsSum = newHp.rolls.reduce((a, b) => a + b, 0)
    // sum bonus
    const bonusSum = newHp.bonus.reduce((a, b) => a + b, 0)

    newHp.total = rollsSum + bonusSum + newHp.manual + newHp.durabilityBonus

    setCharacter((prev) => ({
      ...prev,
      hp: {...newHp}
    }));
    
  }

  const manuallyUpdateHP = (e) => {
    calcHpTotal({manual: e.target.value - character.hp.total})
  };

  const rollHP = () => {
    setDiceGroup("hp")
    for (let index = 0; index < character.level; index++) {
      let dice = 1
      // advantage die for durability
      if(character.hp.hasDurability && index+1 >= character.hp.hasDurability) {
        dice = 2
      }
      Box.show().add(`${dice}d${character.hitDiceType}`)
    }
  }

  return (
    <div>
      <div className="flex-grid">
        <div className="flex-grid__child">
          {/*  ------- NAMEs ------ */}
          <label>
            <input
              type="text"
              value={character.namePlayer}
              name="namePlayer"
              onChange={(e) => handleInputChange(e, "namePlayer")}
            />
            <br />
            <span className="label">Player Name</span>
          </label>
          <label>
            <input
              type="text"
              value={character.nameCharacter}
              name="namePlayer"
              onChange={(e) => handleInputChange(e, "nameCharacter")}
            />
            <br />
            <span className="label">Character Name</span>
          </label>

          <div className="flex-grid flex-grid--flex-start character-lrc">
            <div className="flex-grid__child flex-grid__child--auto ut-margin-right-1em">
              {/*  ------- LEVEL ------ */}
              <label>
                <select onChange={handleCharLevel}>
                  {levelsData.map((i) => (
                    <option key={i.level} value={i.level}>
                      {formatNumberSuffix(i.level)}
                    </option>
                  ))}
                </select>
                <br />
                <span className="label">Level</span>
              </label>
            </div>
            <div className="flex-grid__child flex-grid__child--auto ut-margin-right-1em">
              {/*  ------- RACE ------ */}
              <label>
                <input type="text" value={character.race} disabled size="8" />
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

        <div className="flex-grid__child">
          {/*  ------- 4 QUICK REFERENCE NUMBERS ------ */}
          <div className="flex-grid flex-grid--wrap">
            <div className="flex-grid__child data-display-box data-display-box--quick-values">
              <div className="data-display-box__text">{character.ac}</div>
              <h2 className="data-display-box__header">AC</h2>
            </div>
            <div className="flex-grid__child data-display-box data-display-box--quick-values">
              <button
                className="button button--secondary data-display-box__button"
                aria-label="Roll Hit Points"
                onClick={rollHP}
              >
                <span className="fas fa-die"></span>
              </button>
              <div className="data-display-box__text">
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
              <h2 className="data-display-box__header">HP</h2>
            </div>
            <div className="flex-grid__child data-display-box data-display-box--quick-values">
              <div className="data-display-box__text">
                {character.movement}'
              </div>
              <h2 className="data-display-box__header">Move</h2>
            </div>
            <div className="flex-grid__child data-display-box data-display-box--quick-values">
              <div className="data-display-box__text">
                {character.perception}
              </div>
              <h2 className="data-display-box__header">Perc.</h2>
            </div>
          </div>
          {/*  ------- SAVING THROW MODS ------ */}
          <div className="data-display-box data-display-box--save-mods">
            <div className="data-display-box__text">
              <ul className="data-display-box__save-mods-list">
                <li className="data-display-box__save-mods-list-item">
                  <div
                    className={`aspect-icon aspect-icon--${character.aspect}`}
                  ></div>
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
          </div>
          <span className="label">Saving Throw Mods</span>
          <br />
          <br />
          <div className="flex-grid  flex-grid--flex-start">
            <div className="flex-grid__child flex-grid__child--auto ut-margin-right-1em">
              {/*  ------- ARMOR ------ */}
              <label>
                <select
                  name="armor"
                  value={character.armorIndex}
                  onChange={handleArmorChange}
                >
                  {armorData.map((armor, i) => (
                    <option key={armor.armor} value={i}>
                      {armor.armor} (+{armor.ac})
                    </option>
                  ))}
                </select>
                <br />
                <span className="label">Armor</span>
              </label>
            </div>
            <div className="flex-grid__child flex-grid__child--auto">
              {/*  ------- SHIELD ------ */}
              <label>
                <select
                  name="shield"
                  value={character.shield}
                  onChange={(e) => handleShieldChange(e)}
                >
                  <option value="0">none (+0)</option>
                  <option value="1">Small (+1)</option>
                  <option value="2">Large (+2)</option>
                </select>
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
            >
              {meleeWeaponData.map((weapon, i) => (
                <option key={weapon.name} value={i}>
                  {weapon.name} ({weapon.damage})
                </option>
              ))}
            </select>
            <br />
            <span className="label">Melee Weapon</span>
          </label>

          {/*  ------- RANGED WEAPON ------ */}
          <label>
            <select
              name="rangedWeapon"
              value={character.rangedWeaponIndex}
              onChange={handleRangedWeaponChange}
            >
              {rangedWeaponData.map((weapon, i) => (
                <option key={weapon.name} value={i}>
                  {weapon.name} ({weapon.damage})
                </option>
              ))}
            </select>
            <br />
            <span className="label">Ranged Weapon</span>
          </label>
        </div>

        <div className="flex-grid__child">
          {/*  ------ OPTIONAL PRESETS ---- */}
          <PresetsSelector
            presetData={presetData}
            handlePreset={handlePreset}
          />
          {/*  ------- EXPLAINER BOX ------ */}
          <div className="data-display-box  data-display-box--explanations">
            <div className="data-display-box__text">
              <ul className="list-downloads">
                <li className="list-downloads__item">
                  <a
                    href="assets/pdfs/BLRPG - no art - web.pdf"
                    className="list-downloads__link"
                    target="_blank"
                  >
                    Game Rules - beta, no art PDF
                  </a>
                </li>
                <li className="list-downloads__item" target="_blank">
                  <a
                    href="assets/pdfs/BLRPG  - Character Sheets.pdf"
                    className="list-downloads__link"
                    target="_blank"
                  >
                    Character Sheet PDF
                  </a>
                </li>
                <li className="list-downloads__item">
                  <a
                    href="assets/pdfs/BLRGP - Refence Sheets.pdf"
                    className="list-downloads__link"
                    target="_blank"
                  >
                    Quick Reference Rules PDF
                  </a>
                </li>
              </ul>
            </div>
            <h2 className="data-display-box__header">Downloads</h2>
          </div>

          {/*  ------- ALIGNMENT ------ */}
          <label>
            <select
              name="alignment"
              onChange={(e) => handleInputChange(e, "alignment")}
              value={character.alignment}
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
              Disad 1 <span className="ut-text-explain">(optional)</span>
            </span>
          </label>

          <label>
            <DisadSelector
              id="disad2"
              character={character}
              handleSetDisad={handleSetDisad}
            />
            <span className="label">
              Disad 2 <span className="ut-text-explain">(optional)</span>
            </span>
          </label>

          {/*  ------- XP ------ */}
          <label>
            <input type="text" disabled />
            <br />
            <span className="label">XP/AP</span>
          </label>
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
      {character.hasWizardry && (
        <WizardrySpells
          level={character.wizardLevel}
          intStat={character.attributes.intelligence.total}
          schools={character.wizardrySchools}
          schoolLimit={schoolLimit}
          onPickSchool={handlePickSchool}
          useLocalStorage={useLocalStorage}
        />
      )}
      {character.hasThaumaturgy && (
        <ThaumaturgySpells
          level={character.priestLevel}
          wisStat={character.attributes.wisdom.total}
          useLocalStorage={useLocalStorage}
        />
      )}
    </div>
  );
};

export default React.memo(CharacterSheet);
