import React, { useEffect, useState } from "react";
import { calculateBonus, formatNumberModifier } from "../Utilities";
import { getRollFunction } from "./index";

const Attributes = (props) => {
  const { onChange, attributes, onRoll } = props;
  const [pendingRoll, setPendingRoll] = useState("strength");
  const rollDice = getRollFunction();

  // update attribute from numerical input
  const updateAttribute = (e) => {
    e.preventDefault();
    let val = e.target.value;
    if (val) {
      val = parseInt(val);
    }
    const attr = e.target.id.replace("attrib__", "");

    const newState = { ...attributes };
    newState[attr].roll = val - newState[attr].bonus;
    newState[attr].total = val;
    newState[attr].mod = calculateBonus(val);
    onChange(newState);
  };

  // update attribute from dice roll
  const setAttributeFromRoll = (result) => {
    const newState = { ...attributes };
    if (result[0].rolls.length === 18 || pendingRoll === "all") {
      let counter = 0;
      Object.keys(newState).forEach((attr) => {
        const resultTotal =
          result[0].rolls[counter].value +
          result[0].rolls[counter + 1].value +
          result[0].rolls[counter + 2].value;
        newState[attr].roll = resultTotal - newState[attr].bonus;
        newState[attr].total = resultTotal;
        newState[attr].mod = calculateBonus(resultTotal);
        counter += 3;
      });
    } else {
      const resultTotal = result[0].value;
      newState[pendingRoll].roll = resultTotal - newState[pendingRoll].bonus;
      newState[pendingRoll].total = resultTotal;
      newState[pendingRoll].mod = calculateBonus(resultTotal);
    }
    onChange(newState);
  };

  // roll dice on button click
  const handleRollDice = (e) => {
    e.preventDefault();
    const attr = e.currentTarget.id.replace("roll-", "");
    // store which attribute we're rolling for
    setPendingRoll(attr);
    // roll 3d dice
    const result = rollDice("3d6");
    if (result) {
      setAttributeFromRoll(result);
    }
  };

  const handleRollAll = (e) => {
    // store which attribute we're rolling for
    setPendingRoll("all");
    // roll 18d6 (3d6 for each attribute)
    const result = rollDice("18d6");
    if (result) {
      setAttributeFromRoll(result);
    }
  };

  return (
    <div className="attrib">
      {Object.entries(attributes).map(([key, values]) => {
        return (
          <div className="attrib__group" key={key}>
            <div className="attrib__val">
              <input
                id={`attrib__${key}`}
                className="attrib__input"
                type="number"
                inputMode="numeric"
                min={values.min}
                max={values.max}
                value={values.total}
                onChange={updateAttribute}
              />
            </div>
            <div className="attrib__name">{values.name}</div>
            <div className="attrib__mod">
              Mod:<span>{formatNumberModifier(values.mod)}</span>
            </div>
            <button
              id={`roll-${key}`}
              onClick={handleRollDice}
              className="attrib__roll-button"
            >
              Roll
            </button>
          </div>
        );
      })}
      <button onClick={handleRollAll} className="attrib__roll-all-button">
        Roll All Attributes
      </button>
    </div>
  );
};

export default React.memo(Attributes);
