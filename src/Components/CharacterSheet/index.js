import React, { useContext, useState } from "react";
import TalentList from "../TalentList";
import LevelsTable from "./LevelsTable";
import PresetsSelector from "./PresetsSelector";
import DisadSelector from "./DisadSelector";
import Attributes from "./Attributes";
import {
  aspectData,
  dataDisads,
  levelsData,
  presetData,
  talentData,
  raceData,
  armorData,
} from "../../Data";
import {
  calculateBonus,
  formatNumberModifier,
  formatNumberSuffix,
} from "../Utilities";
import { CharacterContext } from '../Context/Character.context'

const CharacterSheet = () => {
	const [characterData, dispatch] = useContext(CharacterContext)
  const [character, setCharacter] = useState({
    namePlayer: "",
    nameCharacter: "",
    level: 1,
    race: "Human",
    gender: "Male",
    aspect: aspectData[0].name,
    alignment: "Neutral",
    hitDiceType: aspectData[0].hitDiceType,
    attribStr: 10,
    attribDex: 10,
    attribInt: 10,
    attribWis: 10,
    attribCon: 10,
    attribCha: 10,
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
      "+2 vs petrification, polymorph, breath weapons, any entangling and grappling attacks. ",
    saveModsRace: "",
  });

  const [talentDisabled, setTalentDisabled] = useState({
    Alertness: false,
    "Attribute Increase": false,
    Medical: false,
    Riding: false,
    Stronghold: false,
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
    setCharacter((PrevState) => ({ ...PrevState, level: value }));
  };

	const handleArmor = (e) => {
		if(typeof e.target.selectedIndex === 'number') {
			const armor = armorData[e.target.selectedIndex]
			dispatch({
				type: 'updateArmor',
				data: armor
			})
		}
	}

  const handleCharAspect = (e) => {
    const newAspectId = e.target.value;
    // set the talent states for validation purposes
    const oldTalent = character.assignedTalent2;
    const newTalent = aspectData[newAspectId].assignedTalent2;
    setTalentStates(oldTalent, newTalent);

    // then adjust the character data
    let tempObject = character;
    tempObject.aspect = aspectData[newAspectId].name;
    tempObject.hitDiceType = aspectData[newAspectId].hitDiceType;
    tempObject.saveModsClass = aspectData[newAspectId].saveModsClass;
    tempObject.talentAssigned2 = aspectData[newAspectId].assignedTalent2;
    setCharacter(tempObject);
  };

  const handlePreset = (e) => {
    const { value } = e.target;
    setCharacter((PrevState) => ({
      ...PrevState,
      aspect: presetData[value].aspect,
      talentAssigned2: presetData[value].talentAssigned2,
      talentLevel1: presetData[value].talentLevel1,
      talentKnave1: presetData[value].talentKnave1,
      talentDisad1: presetData[value].talentKnave1,
      talentDisad2: presetData[value].talentKnave1,
      talentLevel3: presetData[value].talentLevel3,
      talentLevel5: presetData[value].talentLevel5,
      talentLevel7: presetData[value].talentLevel7,
      talentLevel9: presetData[value].talentLevel9,
      disad1: presetData[value].disad1,
      disad2: presetData[value].disad2,
    }));
  };

  const handleSetCharTalents = (e) => {
    let value = e.target.value;
    //  see if it's seetting a race, reversing race to human, or neither
    const talentType = value.substring(0, 2);
    const talentNoPrefix = value.substring(2);
    const talentBeingReplaced = character[e.target.id];

    switch (talentType) {
      // if it's setting a race
      case "r-":
        return (
          setCharacter((PrevState) => ({ ...PrevState, race: talentNoPrefix })),
          setCharacter((PrevState) => ({
            ...PrevState,
            [e.target.id]: talentNoPrefix,
          }))
        );
        break;
      // if it's choosing a talent and defaulting back to human
      case "h-":
        return (
          setCharacter((PrevState) => ({ ...PrevState, race: "Human" })),
          setCharacter((PrevState) => ({
            ...PrevState,
            [e.target.id]: talentNoPrefix,
          }))
        );
        break;
      // if it's nothing to do with race and just choosing a talent
      default:
        return (
          setCharacter((PrevState) => ({ ...PrevState, [e.target.id]: value })),
          setTalentStates(talentBeingReplaced, value)
        );
    }
  };

  const setTalentStates = (oldTalent, newTalent) => {
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

  const handleSetDisad = (e) => {
    const oldDisad = character[e.target.id];
    const newDisad = e.target.value;

    setCharacter((PrevState) => ({ ...PrevState, [e.target.id]: newDisad }));

    // enable old talent that was deleted
    setDisadDisabled((PrevState) => ({ ...PrevState, [oldDisad]: false }));
    // disable new talent that was chosen unless it is "None"
    if (newDisad !== "none") {
      setDisadDisabled((PrevState) => ({ ...PrevState, [newDisad]: true }));
    }
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
            <div className="flex-grid__child flex-grid__child--auto">
              {/*  ------- RACE ------ */}
              <label>
                <input type="text" value={character.race} disabled size="8" />
                <br />
                <span className="label">
                  Race{" "}
                  <span className="ut-text-explain">
                    (Change in Talents Below)
                  </span>
                </span>
              </label>
            </div>
          </div>

          {/*  ------- CLASS ------ */}
          {aspectData.map((i) => (
            <span key={i.name} className="checkbox-wrapper">
              <input
                type="radio"
                name="class"
                value={i.id}
                id={i.name}
                checked={character.aspect === i.name}
                onClick={handleCharAspect}
              ></input>
              <label htmlFor={i.name} className={i.name}>
                {i.name}
              </label>
            </span>
          ))}

          {/*  --------------- ATTRIBUTES -------------- */}
          <section>
            <Attributes />
          </section>
        </div>

        <div className="flex-grid__child">
          {/*  ------- 4 QUICK REFERENCE NUMBERS ------ */}
          <div className="flex-grid flex-grid--wrap">
            <div className="flex-grid__child data-display-box data-display-box--quick-values">
              <div className="data-display-box__text">{characterData.ac}</div>
              <h2 className="data-display-box__header">AC</h2>
            </div>
            <div className="flex-grid__child data-display-box data-display-box--quick-values">
              <div className="data-display-box__text">0</div>
              <h2 className="data-display-box__header">HP</h2>
            </div>
            <div className="flex-grid__child data-display-box data-display-box--quick-values">
              <div className="data-display-box__text">30'</div>
              <h2 className="data-display-box__header">Move</h2>
            </div>
            <div className="flex-grid__child data-display-box data-display-box--quick-values">
              <div className="data-display-box__text">10</div>
              <h2 className="data-display-box__header">Perc.</h2>
            </div>
          </div>
          {/*  ------- SAVING THROW MODS ------ */}
          <div className="data-display-box data-display-box--save-mods">
            <div className="data-display-box__text">
              {character.saveModsClass}
              <br />
              {character.saveModsRace}
            </div>
          </div>
          <span className="label">Saving Throw Mods</span>
          <br />
          <br />

          {/*  ------- ARMOR ------ */}
          <label>
            <select onChange={handleArmor}>
              {armorData.map((i) => (
                <option key={i.armor} value={i.armor}>
                  {i.armor} (+{i.ac})
                </option>
              ))}
            </select>
            <br />
            <span className="label">Armor</span>
          </label>

          {/*  ------- MELEE WEAPON ------ */}
          <label>
            <select>
              <option value="Lawful Good">Options</option>
            </select>
            <br />
            <span className="label">Melee Weapon</span>
          </label>

          {/*  ------- RANGED WEAPON ------ */}
          <label>
            <select>
              <option value="Lawful Good">Options</option>
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
              <option value="Neutral" selected>
                Neutral
              </option>
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
        <ul>
          <li>Item</li>
          <li>Item</li>
          <li>Item</li>
          <li>Item</li>
        </ul>
      </section>
    </div>
  );
};

export default CharacterSheet;
