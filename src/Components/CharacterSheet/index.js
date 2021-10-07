import React, { useEffect, useState, useCallback } from "react";
// import Modal from "react-modal";
// import ReactModal from "react-modal";
// import TalentList from "../TalentList";
import LevelsTable from "./LevelsTable";
import PresetsSelector from "./PresetsSelector";
import DisadSelector from "./DisadSelector";
import Attributes from "./Attributes";
import Aspects from "./Aspects";
import Notes from "./Notes";
import {
  aspectData,
  dataDisads,
  levelsData,
  presetData,
  // talentData,
  raceData,
  armorData,
  meleeWeaponData,
  rangedWeaponData,
  dataAttributes,
} from "../../Data";
import {
  // calculateBonus,
  // formatNumberModifier,
  formatNumberSuffix,
  whichTalentId,
  whichAspectId,
} from "../Utilities";
import ThaumaturgySpells from "./ThaumaturgySpells";
import WizardrySpells from "./WizardrySpells";

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
  perception: 10,
  movement: 30,
  disad1: "none",
  disad2: "none",
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
  talentAssigned1Type: "Core",
  talentAssigned2Type: "Core",
  talentLevel1Type: "Core",
  talentKnave1Type: "Core",
  talentDisad1Type: "Core",
  talentDisad2Type: "Core",
  talentLevel3Type: "Core",
  talentLevel5Type: "Core",
  talentLevel7Type: "Core",
  talentLevel9Type: "Core",
  saveModsClass:
    "+2 vs petrification, polymorph, breath weapons, entangling and grappling attacks. ",
  saveModsRace: [],
  armor: armorData[0],
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

const CharacterSheet = () => {
  const defaultCharacterData = characterData || characterDefaults;
  const [character, setCharacter] = useState(defaultCharacterData);
  const defaultNotesData = notesData || [];
  const [notes, setNotes] = useState(defaultNotesData);
  const [notesIndex, setNotesIndex] = useState(false);
  const [modalIsOpen_Notes, setIsOpen_Notes] = useState(false);
  const [schoolLimit, setSchoolLimit] = useState();

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

  const [talentDisabled, setTalentDisabled] = useState({
    Alertness: false,
    "Attribute Increase": false,
    Medical: false,
    Riding: false,
    Stronghold: true,
    "Survival & Tracking": false,
    Berserk: false,
    "Blind Fighting": false,
    Bravery: false,
    Combat: true,
    "Combat Specialization": false,
    Durability: false,
    "Multi-Attack": true,
    "Missle Deflection": false,
    Abjuration: false,
    "Bestow Blessing": false,
    Thaurmaturgy: false,
    "Divine Attunement": false,
    Incorruptibility: false,
    "Psychic Sensitivity": false,
    "Scholarly Knowledge": false,
    Sermonize: false,
    Acrobatics: false,
    Assassination: false,
    Backstabbing: false,
    Beguilement: false,
    Inspiration: false,
    Burglary: false,
    Climbing: false,
    Disguise: false,
    Escapology: false,
    Fraud: false,
    "Lore & Read Magic": false,
    "Sleight of hand": false,
    Stealth: false,
    "Arcane Knowledge": false,
    "Arcane Sensitivity": false,
    "Encumbered Casting": true,
    "Spell Refashionment": true,
    "Stealth Casting": true,
    "Wizardry 1": false,
    "Wizardry 2": true,
    "Wizardry 3": true,
  });

  const [disadDisabled, setDisadDisabled] = useState({
    none: false,
    Disfigured: false,
    Uneducated: false,
    "Lowered Attribute(s)": false,
    Lame: false,
    "Missing an Arm or Hand": false,
    "Weak Ears": false,
    "Weak Eyes": false,
    "Vow of Chivalry": false,
    "Vow of Modesty": false,
    "Vow of Nature": false,
  });

  // ----------------------- EVENT HANDLERS -------------------
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

  const handleCharLevel = (e) => {
    const { value } = e.target;
    VASLevel(value);
  };

  const handleSetDisad = (e) => {
    const whichDisad = e.target.id;
    const oldDisad = character[e.target.id];
    const newDisad = e.target.value;
    VASDisad(whichDisad, oldDisad, newDisad);
  };

  const handleCharAspect = (e) => {
    const newAspectId = e.target.value;
    VASCharAspect(newAspectId);
  };

  const handleArmorChange = (e) => {
    const armor = armorData[e.target.value];
    setCharacter((prev) => {
      const ac = 10 + prev.attributes.dexterity.mod + armor.ac;
      return {
        ...prev,
        ac,
        armorIndex: e.target.value,
        armor,
      };
    });
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

  // save schools that were picked in the WizardySpells component to the character data
  const handlePickSchool = (schools) => {
    setCharacter((prev) => ({
      ...prev,
      wizardrySchools: schools,
    }));
  };

  const handlePreset = (e) => {
    const { value } = e.target;
    // find out what aspect it is and set it
    const newAspectId = whichAspectId(presetData[value].aspect);
    VASCharAspect(newAspectId);

    // then set disads
    setCharacter((PrevState) => ({
      ...PrevState,
      disad1: presetData[value].disad1,
      disad2: presetData[value].disad2,
    }));

    // then set talents senquentially via the validation-laden setTalents function

    let presetValues = {
      ...character,
      //   aspect: presetData[value].aspect,
      //   talentAssigned2: presetData[value].talentAssigned2,
      talentLevel1: presetData[value].talentLevel1,
      talentKnave1: presetData[value].talentKnave1,
      talentDisad1: presetData[value].talentDisad1,
      talentDisad2: presetData[value].talentDisad2,
      talentLevel3: presetData[value].talentLevel3,
      talentLevel5: presetData[value].talentLevel5,
      talentLevel7: presetData[value].talentLevel7,
      talentLevel9: presetData[value].talentLevel9,
    };
    // check if any of the talents are spell casting talents
    presetValues = validateSpellCaster(presetValues);
    // setCharacter(presetValues);
  };

  const handleSetCharTalents = (e) => {
    let value = e.target.value;
    const talentBeingReplaced = character[e.target.id];
    let newState = { ...character };

    function adjustRaceBonus(race, add = true) {
      const data = raceData.filter((el) => el.name === race)[0];
      if (Object.keys(data.attributes).length > 0) {
        Object.entries(data.attributes).forEach(([key, val]) => {
          if (add) {
            newState.attributes[key].bonus += val.bonus;
          } else {
            newState.attributes[key].bonus -= val.bonus;
          }
          // set the racial max - min is always 3
          newState.attributes[key].max = val.max;
          const newTotal =
            newState.attributes[key].roll + newState.attributes[key].bonus;
          // get the min/max value for the total
          newState.attributes[key].total = Math.max(
            Math.min(newTotal, newState.attributes[key].max),
            newState.attributes[key].min
          );
          newState.attributesUpdates = Date.now();
        });
      }
      newState.movement = data.movement;
      newState.saveModsRace = data.saveModsRace;
      newState.characteristicsRace = data.characteristics;
    }

    // alias to adjustRaceBonus
    function removeRaceBonus(race) {
      adjustRaceBonus(race, false);
    }

    // alias to adjustRaceBonus
    function addRaceBonus(race) {
      adjustRaceBonus(race);
    }

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
          removeRaceBonus(character.race);
        }

        // add attribute bonus from currently selected race
        addRaceBonus(value);

        newState.race = value;
        newState[e.target.id] = value;

        // check if any of the talents are spell casting talents
        newState = validateSpellCaster(newState);

        return setCharacter(() => newState);
      // if it's nothing to do with race and just choosing a talent
      default:
        // race can only be selected in talentLevel1 - if none is picked then you're human
        newState[e.target.id] = value;
        if (e.target.id === "talentLevel1" && character.race !== "Human") {
          removeRaceBonus(character.race);
          newState.race = "Human";
          newState.movement = 30;
          newState.saveModsRace = [];
          newState.characteristicsRace = [];
        }

        // check if any of the talents are spell casting talents
        newState = validateSpellCaster(newState);
        // const race = e.target.id === "talentLevel1" ? "Human" : character.race;
        return (
          setCharacter(() => newState),
          VASTalentStates(talentBeingReplaced, value)
        );
    }
  };

  const clearTalentSlots = (talentToRemove) => {
    const talentSlotName = [
      "talentAssigned1",
      "talentAssigned2",
      "talentLevel1",
      "talentKnave1",
      "talentDisad1",
      "talentDisad2",
      "talentLevel3",
      "talentLevel5",
      "talentLevel7",
      "talentLevel9",
    ];

    for (let i = 0; i < talentSlotName.length; i++) {
      let talentSlot = talentSlotName[i];
      if (character[talentSlot] === talentToRemove) {
        setCharacter((PrevState) => ({ ...PrevState, [talentSlot]: "" }));
      }
    }
  };

  const updateAttributes = useCallback((attributes) => {
    setCharacter((prev) => {
      const ac = 10 + attributes.dexterity.mod + prev.armor.ac;
      const perception = 10 + attributes.wisdom.mod;
      return {
        ...prev,
        ac,
        attributes,
        perception,
      };
    });
  }, []);

  // ----------------------- VAS - Validate and Save Functions for all character data -------------------

  // set character level and performs validation for Stronghold talent
  const VASLevel = (value) => {
    let fighterLevel, priestLevel, wizardLevel, knaveLevel;
    switch (character.aspect) {
      case "fighter":
        fighterLevel = value;
        priestLevel = Math.max(1, Math.floor(value / 2));
        wizardLevel = Math.max(1, Math.floor(value / 2));
        knaveLevel = Math.max(1, Math.floor(value / 4));
        break;
      case "priest":
        priestLevel = value;
        fighterLevel = Math.max(1, Math.floor(value / 2));
        knaveLevel = Math.max(1, Math.floor(value / 2));
        wizardLevel = Math.max(1, Math.floor(value / 4));
        break;
      case "wizard":
        wizardLevel = value;
        fighterLevel = Math.max(1, Math.floor(value / 2));
        knaveLevel = Math.max(1, Math.floor(value / 2));
        priestLevel = Math.max(1, Math.floor(value / 4));
        break;
      case "knave":
        knaveLevel = value;
        priestLevel = Math.max(1, Math.floor(value / 2));
        wizardLevel = Math.max(1, Math.floor(value / 2));
        fighterLevel = Math.max(1, Math.floor(value / 4));
        break;

      default:
        console.error("could not find aspect name");
        break;
    }
    setCharacter((PrevState) => ({
      ...PrevState,
      level: value,
      fighterLevel,
      priestLevel,
      wizardLevel,
      knaveLevel,
    }));

    // stronghold validation
    if (value >= 9 && character.talentLevel9Type !== "Stronghold") {
      setTalentDisabled((PrevState) => ({
        ...PrevState,
        Stronghold: false,
      }));
    } else {
      setTalentDisabled((PrevState) => ({
        ...PrevState,
        Stronghold: true,
      }));
    }
  };

  // set char disads and enable/disable them from selector
  const VASDisad = (whichDisad, oldDisad, newDisad) => {
    // actually set the disad on the character
    setCharacter((PrevState) => ({ ...PrevState, [whichDisad]: newDisad }));
    // enable old talent that was deleted
    setDisadDisabled((PrevState) => ({ ...PrevState, [oldDisad]: false }));
    // disable new talent that was chosen unless it is "None"
    if (newDisad !== "none") {
      setDisadDisabled((PrevState) => ({ ...PrevState, [newDisad]: true }));
    }
  };

  // set the new char aspect/class and all that entails.
  const VASCharAspect = (newAspectId) => {
    // set the talent states for validation purposes
    const oldTalent = character.assignedTalent2;
    const newTalent = aspectData[newAspectId].assignedTalent2;
    VASTalentStates(oldTalent, newTalent);

    // then adjust the character data
    let tempObject = character;
    tempObject.aspect = aspectData[newAspectId].name;
    tempObject.hitDiceType = aspectData[newAspectId].hitDiceType;
    tempObject.saveModsClass = aspectData[newAspectId].saveModsClass;
    tempObject.talentAssigned2 = aspectData[newAspectId].assignedTalent2;

    // check if any of the talents are spell casting talents
    tempObject = validateSpellCaster(tempObject);
    setCharacter(tempObject);
  };

  const VASTalentStates = (oldTalent, newTalent) => {
    // enable old talent that was delected
    setTalentDisabled((PrevState) => ({ ...PrevState, [oldTalent]: false }));
    // disable new talent that was chosen
    setTalentDisabled((PrevState) => ({ ...PrevState, [newTalent]: true }));
    // if new talent was Attribute Increase then re-enable it
    if (newTalent === "Attribute Increase") {
      setTalentDisabled((PrevState) => ({ ...PrevState, [newTalent]: false }));
    }
    // if Wizardry 1 is chosen enable all other wizard talents except Wizardry 3
    if (newTalent === "Wizardry 1") {
      setTalentDisabled((PrevState) => ({ ...PrevState, "Wizardry 2": false }));
      setTalentDisabled((PrevState) => ({
        ...PrevState,
        "Encumbered Casting": false,
      }));
      setTalentDisabled((PrevState) => ({
        ...PrevState,
        "Spell Refashionment": false,
      }));
      setTalentDisabled((PrevState) => ({
        ...PrevState,
        "Stealth Casting": false,
      }));
    }
    // if Wizardry 1 is deslected disable all other sub-talents
    // also check to see if user has already chosen other sub-talents and if so, remove them
    if (oldTalent === "Wizardry 1") {
      setTalentDisabled((PrevState) => ({ ...PrevState, "Wizardry 2": true }));
      setTalentDisabled((PrevState) => ({
        ...PrevState,
        "Encumbered Casting": true,
      }));
      setTalentDisabled((PrevState) => ({
        ...PrevState,
        "Spell Refashionment": true,
      }));
      setTalentDisabled((PrevState) => ({
        ...PrevState,
        "Stealth Casting": true,
      }));
      clearTalentSlots("Wizardry 2");
      clearTalentSlots("Encumbered Casting");
      clearTalentSlots("Spell Refashionment");
      clearTalentSlots("Stealth Casting");
    }
    // if Wizardry 2 is chosen, enable Wizardry 3
    if (newTalent === "Wizardry 2") {
      setTalentDisabled((PrevState) => ({ ...PrevState, "Wizardry 3": false }));
    }
    // if Wizardry 2 is deslected, disable Wizardry 3
    // also check to see if user has already chosen Wizardry 3 and if so, remove it
    if (oldTalent === "Wizardry 2") {
      setTalentDisabled((PrevState) => ({ ...PrevState, "Wizardry 3": true }));
      clearTalentSlots("Wizardry 3");
    }
  };

  // this will show/hide Thaumaturgy and Wizardry Spell Lists. It runs when any talent has changed.
  const validateSpellCaster = (state) => {
    const talents = [
      state.talentAssigned2,
      state.talentLevel1,
      state.talentKnave1,
      state.talentLevel3,
      state.talentLevel5,
      state.talentLevel7,
      state.talentLevel9,
    ];

    // check all talent values for 'Wizardry' and 'Thaurmaturgy'
    const wizardryRegEx = /Wizardry/g;
    state.hasWizardry = talents.some((e) => wizardryRegEx.test(e));
    state.hasThaumaturgy = talents.includes("Thaumaturgy");

    // check that Wiz school has been selected
    if (state.hasWizardry) {
      let schoolCount = [1, 2, 5];
      let level = 0;
      level += talents.includes("Wizardry 2") ? 1 : 0;
      level += talents.includes("Wizardry 3") ? 1 : 0;
      // if the school count allowed does not match our character's school count, then show the "Schools of Magic" modal for editing
      if (schoolCount[level] !== character.wizardrySchools.length) {
        setSchoolLimit(schoolCount[level]);
      }
    }
    return state;
  };

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

          <div className="flex-grid flex-grid--flex-start">
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
              >
                <span className="fas fa-die"></span>
              </button>
              <div className="data-display-box__text">0</div>
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
              hover-over or other explaination text will go here
            </div>
            <h2 className="data-display-box__header">Explanations</h2>
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
              dataDisads={dataDisads}
              character={character}
              disadDisabled={disadDisabled}
              handleSetDisad={handleSetDisad}
            />
            <span className="label">
              Disad 1 <span className="ut-text-explain">(optional)</span>
            </span>
          </label>

          <label>
            <DisadSelector
              id="disad2"
              dataDisads={dataDisads}
              character={character}
              disadDisabled={disadDisabled}
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
          talentDisabled={talentDisabled}
          handleSetCharTalents={handleSetCharTalents}
        />
      </section>

      {/*  --------------- READ-ONLY SPECIAL ABILITIES & NOTES -------------- */}
      <section>
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
