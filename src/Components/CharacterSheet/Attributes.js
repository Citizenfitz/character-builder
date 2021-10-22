import React, { useEffect, useState } from "react";
import { calculateBonus, formatNumberModifier } from "../Utilities";

const Attributes = (props) => {
  const { onChange, attributes, onRoll, onRollResults } = props;
  const [pendingRoll, setPendingRoll] = useState("strength");

  // update attribute from numerical input
  const updateAttribute = (e) => {
    e.preventDefault();
    let val = e.target.value;
    if (val) {
      val = parseInt(val);
    }
    const attr = e.target.id.replace("attrib-", "");

    const newState = { ...attributes };
    newState[attr].roll = val - newState[attr].bonus;
    newState[attr].total = val;
    newState[attr].mod = calculateBonus(val);
    onChange(newState);
  };

  // update attribute from dice roll
  const setAttributeFromRoll = (result) => {
    const newState = { ...attributes };
    if(pendingRoll === 'all') {
      let counter = 0
      Object.keys(newState).forEach(attr => {
        const resultTotal = result[0].rolls[counter].result + result[0].rolls[counter+1].result + result[0].rolls[counter+2].result
        newState[attr].roll = resultTotal - newState[attr].bonus;
        newState[attr].total = resultTotal
        newState[attr].mod = calculateBonus(resultTotal);
        counter += 3;
      })
    } else {
      const resultTotal = result[0].value
      newState[pendingRoll].roll = resultTotal - newState[pendingRoll].bonus;
      newState[pendingRoll].total = resultTotal;
      newState[pendingRoll].mod = calculateBonus(resultTotal);
    }
    onChange(newState);
  };

  useEffect(()=>{
    if(onRollResults){
      setAttributeFromRoll(onRollResults)
    }
  },[onRollResults])

  // roll dice on button click
  const rollDice = (e) => {
    e.preventDefault();
    const attr = e.currentTarget.id.replace("roll-", "");
    // store which attribute we're rolling for
    setPendingRoll(attr);
    // roll 3d dice
    onRoll("3d6","attribute")
  };

  const rollAll = (e) => {
    // store which attribute we're rolling for
    setPendingRoll('all');
    // roll 3d dice
    onRoll("18d6","all-attributes")
  }

  return (
    <div className="attributes">
      <button
        className="button button--secondary attributes__die-button"
        aria-label="Roll Attributes Points"
        onClick={rollAll}
      >
        <span className="fas fa-die"></span>
      </button>
      {Object.entries(attributes).map(([key, values]) => {
        return (
          <div className="attrib-group" key={key}>
            <div className="attrib-val">
              <input
                id={`attrib-${key}`}
                className="attrib-input"
                type="number"
                inputMode="numeric"
                min={values.min}
                max={values.max}
                value={values.total}
                onChange={updateAttribute}
              />
            </div>
            <div className="attrib-name">
              <button
                className="button attribute__button"
                id={`roll-${key}`}
                onClick={rollDice}
              >
                {values.name}
              </button>
            </div>
            <div className="attrib-mod">
              Mod:{" "}
              <span>
                <input
                  type="text"
                  readOnly
                  value={formatNumberModifier(values.mod)}
                />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Attributes);
