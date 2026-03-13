import React, { useState } from "react";
import { calculateBonus, formatNumberModifier } from "../Utilities";
import { useCharacter } from "../../context/CharacterContext";
import type { Attributes as AttributesType } from "../../types";

// TODO: Frank's dicebox integration — reinstate when updated
// import { getRollFunction } from "./index";

interface RollResult {
  rolls: { value: number }[];
  value: number;
}

const Attributes = () => {
  const { character, dispatch } = useCharacter();
  const { attributes } = character;
  const [pendingRoll, setPendingRoll] = useState<string>("strength");

  // TODO: replace with Frank's dicebox integration when updated
  const rollDice = (notation: string): RollResult[] | null => {
    const [count, sides] = notation.split("d").map(Number);
    const results = Array.from({ length: count }, () => ({
      value: Math.floor(Math.random() * sides) + 1,
    }));
    return [
      {
        rolls: results,
        value: results.reduce((sum, r) => sum + r.value, 0),
      },
    ];
  };

  const updateAttribute = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const raw = e.target.value;
    if (!raw) return;

    const val = parseInt(raw);
    const attr = e.target.id.replace("attrib__", "") as keyof AttributesType;

    const newAttributes = { ...attributes };
    newAttributes[attr] = {
      ...newAttributes[attr],
      roll: val - newAttributes[attr].bonus,
      total: val,
      mod: calculateBonus(val),
    };

    dispatch({ type: "UPDATE_ATTRIBUTES", payload: newAttributes });
  };

  const setAttributeFromRoll = (result: RollResult[]) => {
    const newAttributes = { ...attributes };

    if (result[0].rolls.length === 18 || pendingRoll === "all") {
      let counter = 0;
      (Object.keys(newAttributes) as Array<keyof AttributesType>).forEach(
        (attr) => {
          const resultTotal =
            result[0].rolls[counter].value +
            result[0].rolls[counter + 1].value +
            result[0].rolls[counter + 2].value;
          newAttributes[attr] = {
            ...newAttributes[attr],
            roll: resultTotal - newAttributes[attr].bonus,
            total: resultTotal,
            mod: calculateBonus(resultTotal),
          };
          counter += 3;
        },
      );
    } else {
      const resultTotal = result[0].rolls.reduce((sum, r) => sum + r.value, 0);
      const attr = pendingRoll as keyof AttributesType;
      newAttributes[attr] = {
        ...newAttributes[attr],
        roll: resultTotal - newAttributes[attr].bonus,
        total: resultTotal,
        mod: calculateBonus(resultTotal),
      };
    }

    dispatch({ type: "UPDATE_ATTRIBUTES", payload: newAttributes });
  };

  const handleRollDice = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const attr = e.currentTarget.id.replace("roll-", "");
    setPendingRoll(attr);
    const result = rollDice("3d6");
    if (result) setAttributeFromRoll(result);
  };

  const handleRollAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPendingRoll("all");
    const result = rollDice("18d6");
    if (result) setAttributeFromRoll(result);
  };

  return (
    <div className="attrib" role="group" aria-label="Character Attributes">
      {(
        Object.entries(attributes) as Array<
          [keyof AttributesType, AttributesType[keyof AttributesType]]
        >
      ).map(([key, values]) => (
        <div className="attrib__group" key={key}>
          <div className="attrib__val">
            <label htmlFor={`attrib__${key}`} className="ut-only-sr">
              {values.name}
            </label>
            <input
              id={`attrib__${key}`}
              className="qr-input--attrib"
              type="number"
              inputMode="numeric"
              min={values.min}
              max={values.max}
              value={values.total}
              onChange={updateAttribute}
              aria-label={`${values.name} value`}
            />
          </div>
          <div className="attrib__name" aria-hidden="true">
            {values.name}
          </div>
          <div className="attrib__mod">
            Mod:
            <span aria-label={`${values.name} modifier`}>
              {formatNumberModifier(values.mod ?? 0)}
            </span>
          </div>
          <button
            id={`roll-${key}`}
            onClick={handleRollDice}
            className="attrib__roll-button"
            aria-label={`Roll ${values.name}`}
          >
            Roll
          </button>
        </div>
      ))}
      <button
        onClick={handleRollAll}
        className="attrib__roll-all-button"
        aria-label="Roll all attributes"
      >
        Roll All Attributes
      </button>
    </div>
  );
};

export default React.memo(Attributes);
