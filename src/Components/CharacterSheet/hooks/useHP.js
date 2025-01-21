import { useCallback } from "react";

export const useHP = (character, updateCharacter, diceBox) => {
  const calculateTotalHP = useCallback((char) => {
    const baseHP = char.hp.rolls.reduce((sum, roll) => sum + roll, 0);
    const conBonus = char.attributes.constitution.mod * char.level;
    const durabilityBonus = char.hp.hasDurability ? char.hp.durabilityBonus : 0;
    const manualBonus = char.hp.manual || 0;

    return baseHP + conBonus + durabilityBonus + manualBonus;
  }, []);

  const handleHPChange = useCallback(
    (e) => {
      const newManual = parseInt(e.target.value) - calculateTotalHP(character);
      updateCharacter({
        hp: {
          ...character.hp,
          manual: newManual,
          total: parseInt(e.target.value),
        },
      });
    },
    [character, calculateTotalHP, updateCharacter]
  );

  const handleHPRoll = useCallback(() => {
    const multiplier = character.hp.hasDurability ? 2 : 1;
    const dice = character.level * multiplier;
    diceBox.rollDice(`${dice}d${character.hitDiceType}`, "hp");
  }, [
    character.level,
    character.hitDiceType,
    character.hp.hasDurability,
    diceBox,
  ]);

  const setHPFromDice = useCallback(
    (results) => {
      const rolls = results.map((die) => die.value);
      const total = rolls.reduce((sum, roll) => sum + roll, 0);
      const conBonus = character.attributes.constitution.mod * character.level;
      const durabilityBonus = character.hp.hasDurability
        ? character.hp.durabilityBonus
        : 0;

      updateCharacter({
        hp: {
          ...character.hp,
          rolls,
          total: total + conBonus + durabilityBonus,
          manual: 0,
        },
      });
    },
    [character, updateCharacter]
  );

  return {
    calculateTotalHP,
    handleHPChange,
    handleHPRoll,
    setHPFromDice,
  };
};
