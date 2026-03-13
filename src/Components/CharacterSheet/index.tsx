import React, { useCallback, useRef, useState, useEffect } from "react";
import DiceBox from "@3d-dice/dice-box";
import LevelsTable from "./LevelsTable";
import PresetsSelector from "./PresetsSelector";
import DisadSelector from "./DisadSelector";
import Attributes from "./Attributes";
import Aspects from "./Aspects";
import { QuestRexDialog } from "../Common/Dialog";
import {
  levelsData,
  armorData,
  meleeWeaponData,
  rangedWeaponData,
  shieldData,
} from "../../Data/indexRefactor";
import {
  calculateBonus,
  formatNumberModifier,
  formatNumberSuffix,
} from "../Utilities";
import PrayersSpells from "./PrayersSpells";
import WizardrySpells from "./WizardrySpells";
import TalentDetails from "./TalentDetails";
import DisadDetails from "./DisadDetails";
import MutationDetails from "./MutationDetails";
import WildPsionics from "./WildPsionics";
// @ts-expect-error diceRoller.js has no module export (CommonJS-style)
import diceRoller from "../Utilities/diceRoller";
import {
  rollAttributes as tempRollAttributes,
  rollHp as tempRollHp,
} from "../Utilities/";
import { useCharacter } from "../../context/CharacterContext";

/*  --------------- DICE BOX -------------- */
const rollDiceWithFallback = (box: any, diceNotation: string) => {
  const [count, sides] = diceNotation.split("d").map(Number);
  if (box) {
    try {
      box.show().roll(diceNotation);
      return null;
    } catch (error) {
      console.warn("Error rolling 3D dice:", error);
    }
  }
  const results = [];
  for (let i = 0; i < count; i++) {
    results.push({ value: diceRoller(1, sides, 0, false) });
  }
  return [
    {
      rolls: results,
      value: results.reduce((sum, roll) => sum + roll.value, 0),
    },
  ];
};

export const getRollFunction = () => rollDiceWithFallback;

// Custom hook for dice box initialization
const useDiceBox = (onRollComplete: (results: any) => void) => {
  const [box, setBox] = useState<any>(null);

  useEffect(() => {
    let Box: any;
    try {
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

      Box.init();
      Box.onRollComplete = onRollComplete;
      setBox(Box);

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
      return () => document.removeEventListener("mousedown", handleMouseDown);
    } catch (error) {
      console.warn("Error setting up dice box:", error);
    }
  }, [onRollComplete]);

  return box;
};

const CharacterSheet = () => {
  const { character, dispatch } = useCharacter();
  const componentRef = useRef<any>(null);

  const [diceGroup, setDiceGroup] = useState<string | null>(null);
  const [attributeDice, setAttributeDice] = useState<any>(null);
  const [raceModalOpen, setRaceModalOpen] = useState(false);

  const toggleRaceModal = () => setRaceModalOpen((prev) => !prev);

  const handleRollComplete = useCallback(
    (results: any) => {
      if (diceGroup === "attribute" || diceGroup === "all-attributes") {
        setAttributeDice(results);
      } else if (diceGroup === "hp") {
        setHpFromDice(results);
      }
    },
    [diceGroup],
  );

  const box = useDiceBox(handleRollComplete);

  const rollDice = (notation: string, group: string) => {
    setDiceGroup(group);
    return rollDiceWithFallback(box, notation);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    name: string,
  ) => {
    dispatch({
      type: "SET_INPUT_CHANGE",
      payload: { name, value: e.target.value },
    });
  };

  const handleCharLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SET_LEVEL", payload: Number(e.target.value) });
  };

  /*  --------------- ATTRIBUTES -------------- */
  const tempRollAttribDice = () => {
    const newRolls = tempRollAttributes();
    const newAttributes = { ...character.attributes };
    (Object.keys(newAttributes) as Array<keyof typeof newAttributes>).forEach(
      (key, index) => {
        newAttributes[key] = { ...newAttributes[key] };
        newAttributes[key].roll = newRolls[index];
        const newTotal = newRolls[index] + newAttributes[key].bonus;
        newAttributes[key].total = newTotal;
        newAttributes[key].mod = calculateBonus(newTotal);
      },
    );
    dispatch({ type: "UPDATE_ATTRIBUTES", payload: newAttributes });
  };

  /*  --------------- HIT POINTS -------------- */
  const setHpFromDice = (results: any) => {
    const rolls: number[] = [];
    const bonus: number[] = [];
    const hasDurability = character.hp.hasDurability;
    for (let index = 0; index < character.level; index++) {
      if (hasDurability !== false && index + 1 >= hasDurability) {
        rolls.push(
          Math.max(
            results[0].rolls[index].value,
            results[0].rolls[index + 1].value,
          ),
        );
      } else {
        rolls.push(results[0].rolls[index].value);
      }
      bonus.push(calculateBonus(character.attributes.constitution.total));
    }
    calcHpTotal({ rolls, bonus });
  };

  const calcHpTotal = (
    hp: {
      rolls?: number[];
      bonus?: number[];
      manual?: number;
    } = {},
  ) => {
    const newHp = { ...character.hp };

    if (hp.rolls) newHp.rolls = [...hp.rolls];
    if (hp.bonus) newHp.bonus = [...hp.bonus];
    if (hp.manual) newHp.manual += hp.manual;

    if (
      character.hp.hasDurability &&
      character.level >= character.hp.hasDurability
    ) {
      newHp.durabilityBonus = character.fighterLevel;
    }

    const rollsSum = newHp.rolls.reduce((a, b) => a + b, 0);
    const bonusSum = newHp.bonus.reduce((a, b) => a + b, 0);
    const total = rollsSum + bonusSum + newHp.manual + newHp.durabilityBonus;
    newHp.total = Math.max(1, total);

    dispatch({ type: "SET_HP", payload: newHp });
  };

  const manuallyUpdateHP = (e: React.ChangeEvent<HTMLInputElement>) => {
    calcHpTotal({ manual: Number(e.target.value) - character.hp.total });
  };

  const rollHP = () => {
    setDiceGroup("hp");
    const multiplier = character.hp.hasDurability ? 2 : 1;
    const dice = character.level * multiplier;
    const diceNotation = `${dice}d${character.hitDiceType}`;
    const result = rollDiceWithFallback(box, diceNotation);
    if (result) setHpFromDice(result);
  };

  const tempRollHP = () => {
    const results = tempRollHp(
      character.level,
      character.hitDiceType,
      character.hp.hasDurability !== false,
    );
    setHpFromDice(results);
  };

  return (
    <div id="char-sheet" className="char-sheet">
      <section className="char-sheet__section char-sheet__section--top">
        <h1 className="char-sheet__h1">QuestRex CharacterCrafter 1.2</h1>
        <p className="ut-no-print">
          <b>INSTRUCTIONS:</b> Play around with the form below till you get a
          character you like (it's often easiest to start with a preset). Then
          print the page to paper or a PDF. Simple! Desktop only for now.
        </p>
        <div className="char-sheet__toolbar ut-no-print">
          <div>
            <PresetsSelector />
          </div>
          <div>
            <button className="char-sheet__button" onClick={tempRollAttribDice}>
              <i className="fas fa-dice" aria-hidden="true" /> Roll Attributes
            </button>
          </div>
          <div>
            <button className="char-sheet__button" onClick={tempRollHP}>
              <i className="fas fa-dice" aria-hidden="true" /> Roll Hit Points
            </button>
          </div>
          <div>
            <button
              className="char-sheet__button"
              onClick={() => window.print()}
            >
              <i className="fas fa-print" aria-hidden="true" /> Print Sheet
            </button>
          </div>
        </div>

        <div className="char-sheet__grid">
          <div className="char-sheet__col char-sheet__col--basics">
            {/* Player Name */}
            <label>
              <input
                type="text"
                value={character.namePlayer}
                name="namePlayer"
                onChange={(e) => handleInputChange(e, "namePlayer")}
                className="ut-no-print qr-input--text"
                aria-label="Player Name"
              />
              <div className="ut-no-screen print-text-input">
                {character.namePlayer}&nbsp;
              </div>
              <br />
              <span className="label">Player Name</span>
            </label>

            {/* Character Name */}
            <label>
              <input
                type="text"
                value={character.nameCharacter}
                name="nameCharacter"
                className="ut-no-print qr-input--text"
                onChange={(e) => handleInputChange(e, "nameCharacter")}
                aria-label="Character Name"
              />
              <div className="ut-no-screen print-text-input">
                {character.nameCharacter}
              </div>
              <br className="ut-no-print" />
              <span className="label">Character Name</span>
            </label>

            <div className="flex-grid">
              <div className="ut-margin-left-xs ut-margin-right-sm-alt">
                {/* Level */}
                <label>
                  <select
                    onChange={handleCharLevel}
                    value={character.level}
                    className="ut-no-print"
                    aria-label="Character Level"
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
                  <br className="ut-no-print" />
                  <span className="label">Level</span>
                </label>
              </div>
              <div>
                {/* Gender */}
                <label>
                  <select
                    name="gender"
                    onChange={(e) => handleInputChange(e, "gender")}
                    value={character.gender}
                    className="ut-no-print"
                    aria-label="Gender"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="ut-no-screen print-text-input">
                    {character.gender}
                  </div>
                  <br className="ut-no-print" />
                  <span className="label">Sex</span>
                </label>
              </div>
            </div>

            <div className="flex-grid flex-grid--flex-start">
              <div className="ut-margin-left-xs ut-margin-right-sm-alt">
                {/* Race */}
                <label>
                  <button
                    type="button"
                    className="char-sheet__button--alt ut-no-print"
                    onClick={toggleRaceModal}
                    aria-haspopup="dialog"
                  >
                    {character.race}&nbsp;
                  </button>
                  <div className="ut-no-screen print-text-input">
                    {character.race}
                  </div>
                  <br className="ut-no-print" />
                  <span className="label">Race</span>
                </label>
              </div>
              <div>
                {/* Aspect / Class */}
                <Aspects />
              </div>
            </div>

            {/* Attributes */}
            <section>
              <Attributes />
            </section>
          </div>

          <div className="char-sheet__col char-sheet__col--stats">
            {/* Quick reference numbers */}
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
                    className="hp ut-no-print qr-input--number"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={999}
                    value={character.hp.total}
                    onChange={manuallyUpdateHP}
                    aria-label="Hit Points"
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

            {/* Saving Throw Mods */}
            <div className="char-sheet__quick-ref-item char-sheet__quick-ref--save-mods">
              <ul className="char-sheet__quick-ref-save-mods-list">
                <li className="char-sheet__quick-ref-save-mods-list-item">
                  <span className="fas fa-pointer" aria-hidden="true" />+
                  {levelsData[character.level - 1].saveBonus} to all{" "}
                  <span className="ut-text-explain">(for level)</span>
                </li>
                <li className="char-sheet__quick-ref-save-mods-list-item">
                  <div
                    className={`icon-aspect icon-aspect--${character.aspect}`}
                    aria-hidden="true"
                  />
                  {character.saveModsClass}
                </li>
              </ul>
              <h2 className="char-sheet__quick-ref-footer">
                Saving Throw Mods
              </h2>
            </div>

            <div className="flex-grid flex-grid--flex-start">
              <div className="ut-margin-left-xs ut-margin-right-sm-alt">
                {/* Armor */}
                <label>
                  <select
                    name="armor"
                    value={character.armorIndex}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_ARMOR",
                        payload: { armorIndex: Number(e.target.value) },
                      })
                    }
                    className="ut-no-print"
                    aria-label="Armor"
                  >
                    {armorData.map((armor, i) => (
                      <option key={armor.name} value={i}>
                        {armor.name} (+{armor.modifier})
                      </option>
                    ))}
                  </select>
                  <div className="ut-no-screen print-text-input">
                    {armorData[character.armorIndex].name}
                    {character.armorIndex > 0 && (
                      <span>(+{armorData[character.armorIndex].modifier})</span>
                    )}
                  </div>
                  <br className="ut-no-print" />
                  <span className="label">Armor</span>
                </label>
              </div>
              <div className="flex-grid__child flex-grid__child--auto">
                {/* Shield */}
                <label>
                  <select
                    name="shield"
                    value={character.shieldIndex}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_SHIELD",
                        payload: { shieldIndex: Number(e.target.value) },
                      })
                    }
                    className="ut-no-print"
                    aria-label="Shield"
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
                  <br className="ut-no-print" />
                  <span className="label">Shield</span>
                </label>
              </div>
            </div>

            {/* Melee Weapon */}
            <label>
              <select
                name="meleeWeapon"
                value={character.meleeWeaponIndex}
                onChange={(e) =>
                  dispatch({
                    type: "SET_MELEE_WEAPON",
                    payload: { meleeWeaponIndex: Number(e.target.value) },
                  })
                }
                className="ut-no-print"
                aria-label="Melee Weapon"
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
              <br className="ut-no-print" />
              <span className="label">Melee Weapon</span>
            </label>

            {/* Ranged Weapon */}
            <label>
              <select
                name="rangedWeapon"
                value={character.rangedWeaponIndex}
                onChange={(e) =>
                  dispatch({
                    type: "SET_RANGED_WEAPON",
                    payload: { rangedWeaponIndex: Number(e.target.value) },
                  })
                }
                className="ut-no-print"
                aria-label="Ranged Weapon"
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
              <br className="ut-no-print" />
              <span className="label">Ranged Weapon</span>
            </label>
          </div>

          <div className="char-sheet__col char-sheet__col--details">
            {/* Symbol / Sketch box */}
            <div className="char-sheet__quick-ref-item char-sheet__quick-ref--explain">
              <div className="char-sheet__quick-ref-text" />
              <h2 className="char-sheet__quick-ref-footer">
                Symbol or Character Sketch
              </h2>
            </div>

            {/* Alignment */}
            <label>
              <select
                name="alignment"
                onChange={(e) => handleInputChange(e, "alignment")}
                value={character.alignment}
                className="ut-no-print"
                aria-label="Alignment"
              >
                <option value="Lawful Good">Lawful Good</option>
                <option value="Neutral Good">Neutral Good</option>
                <option value="Chaotic Good">Chaotic Good</option>
                <option value="Lawful Neutral">Lawful Neutral</option>
                <option value="Neutral">Neutral</option>
                <option value="Chaotic Neutral">Chaotic Neutral</option>
                <option value="Lawful Evil">Lawful Evil</option>
                <option value="Neutral Evil">Neutral Evil</option>
                <option value="Chaotic Evil">Chaotic Evil</option>
              </select>
              <div className="ut-no-screen print-text-input">
                {character.alignment}
              </div>
              <br className="ut-no-print" />
              <span className="label">Alignment</span>
            </label>

            {/* Disads */}
            <label>
              <DisadSelector id="disad1" />
              <span className="label">
                Disad 1{" "}
                <span className="ut-text-explain ut-no-print">(optional)</span>
              </span>
            </label>
            <label>
              <DisadSelector id="disad2" />
              <span className="label">
                Disad 2{" "}
                <span className="ut-text-explain ut-no-print">(optional)</span>
              </span>
            </label>

            {/* XP */}
            <label>
              <input
                type="text"
                disabled
                className="ut-no-print qr-input--text"
                aria-label="XP/AP"
              />
              <div className="ut-no-screen print-text-input" />
              <br className="ut-no-print" />
              <span className="label">XP/AP</span>
            </label>
          </div>
        </div>
      </section>

      {/* Levels & Talent Picker */}
      <section className="char-sheet__section char-sheet__section--talents">
        <LevelsTable />
      </section>

      {/* Wizardry Spells */}
      {character.wizardry1StartLevel > 0 &&
        character.level >= character.wizardry1StartLevel && <WizardrySpells />}

      {/* Prayer Spells */}
      {character.prayersStartLevel > 0 &&
        character.level >= character.prayersStartLevel && <PrayersSpells />}

      {/* Wild Psionics */}
      {Object.values(character.talents).some(
        (talent) => talent === "Wild Psionics",
      ) && (
        <section className="char-sheet__section char-sheet__section--wild-psionics">
          <WildPsionics />
        </section>
      )}

      {/* Mutation Details */}
      {character.race === "Mutant" && (
        <section className="char-sheet__section char-sheet__section--mutation-details">
          <h2 className="char-sheet__h2">Mutation Details</h2>
          <MutationDetails />
        </section>
      )}

      {/* Disadvantage Details */}
      {(character.disad1 !== "none" || character.disad2 !== "none") && (
        <section className="char-sheet__section char-sheet__section--disad-details">
          <h2 className="char-sheet__h2">Disadvantage Details</h2>
          <DisadDetails />
        </section>
      )}

      {/* Talent Details */}
      <section className="char-sheet__section char-sheet__section--talent-details">
        <h2 className="char-sheet__h2">Talent Details</h2>
        <TalentDetails />
      </section>

      {/* Race Modal */}
      <QuestRexDialog
        isOpen={raceModalOpen}
        onClose={toggleRaceModal}
        title="Choose Race"
      >
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
          alt="QuestRex race picker"
        />
      </QuestRexDialog>

      <footer className="char-sheet__footer">
        QuestRex - A Fantasy Tabletop RPG
      </footer>
    </div>
  );
};

export default React.memo(CharacterSheet);
