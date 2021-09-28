import React, { useState } from "react";
import { aspectData } from "../../Data";

const Aspects = (props) => {
  return (
    <div className="attributes">
      {/*  ------- CLASS ------ */}
      {aspectData.map((i) => (
        <span key={i.name} className="checkbox-wrapper">
          <input
            type="radio"
            name="class"
            value={i.id}
            id={i.name}
            checked={props.character.aspect === i.name}
            onClick={props.handleCharAspect}
          ></input>
          <label htmlFor={i.name} className={i.name}>
            {i.name}
          </label>
        </span>
      ))}
    </div>
  );
};

export default Aspects;
