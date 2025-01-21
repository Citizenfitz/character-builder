import { useState } from "react";
import DiceBox from "@3d-dice/dice-box";

export const useDiceBox = () => {
  const [diceGroup, setDiceGroup] = useState();
  const [attributeDice, setAttributeDice] = useState();

  // Initialize DiceBox
  const Box = new DiceBox("#dice-box", {
    id: "dice-canvas",
    assetPath: "/assets/dice-box/",
    themeColor: "#883c8d",
    startingHeight: 12,
    throwForce: 6,
    gravity: 2,
  });

  const rollDice = (notation, group) => {
    setDiceGroup(group);
    Box.show().roll(notation);
  };

  const rollAttribDice = () => {
    rollDice("18d6", "all-attributes");
  };

  const rollHP = (hitDiceType, level, hasDurability) => {
    setDiceGroup("hp");
    const multiplier = hasDurability ? 2 : 1;
    let dice = level * multiplier;
    Box.show().roll(`${dice}d${hitDiceType}`);
  };

  return {
    Box,
    diceGroup,
    attributeDice,
    setAttributeDice,
    rollDice,
    rollAttribDice,
    rollHP,
  };
};
