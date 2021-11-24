import React from "react";
import { dataDisads } from "../../Data/";

const DisadSelector = (props) => (
  <div>
    <select
      onChange={props.handleSetDisad}
      value={props.character[props.id]}
      id={props.id}
      className="ut-no-print"
    >
      {dataDisads.map((option) => (
        <option
          key={option.id}
          value={option.name}
          disabled={
            (option.name === props.character.disad1 &&
              props.id !== "disad1" &&
              option.name !== "none") ||
            (option.name === props.character.disad2 &&
              props.id !== "disad2" &&
              option.name !== "none")
          }
        >
          {option.name}
        </option>
      ))}
    </select>
    <div className="ut-no-screen print-text-input">
      {props.character[props.id]}
    </div>
  </div>
);

export default DisadSelector;
