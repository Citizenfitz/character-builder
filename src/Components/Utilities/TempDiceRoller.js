// A temporary, non-graphical dice roller to substitute the main one.

/**
 * Simulates rolling 4 6-sided dice and dropping the lowest score.
 * @returns {number} The sum of the three highest dice.
 */
const roll4d6DropLowest = () => {
  const rolls = [];
  for (let i = 0; i < 4; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1);
  }
  rolls.sort((a, b) => b - a); // Sort in descending order
  rolls.pop(); // Drop the lowest
  return rolls.reduce((sum, current) => sum + current, 0);
};

/**
 * Generates scores for all six attributes.
 * @returns {Array<number>} An array of six attribute scores.
 */
export const rollAttributes = () => {
  const attributes = [];
  for (let i = 0; i < 6; i++) {
    attributes.push(roll4d6DropLowest());
  }
  return attributes;
};

/**
 * Rolls hit points for a character.
 * @param {number} level - The character's level.
 * @param {string} hitDiceType - The type of hit die (e.g., "d8").
 * @param {boolean} hasDurability - Whether the character has the Durability talent.
 * @returns {Array<object>} An array of roll results, compatible with the existing structure.
 */
export const rollHp = (level, hitDiceType, hasDurability) => {
  const sides = hitDiceType;
  const rolls = [];
  const numDice = level * (hasDurability ? 2 : 1);

  for (let i = 0; i < numDice; i++) {
    rolls.push({ value: Math.floor(Math.random() * sides) + 1 });
  }

  // The structure needs to match what onRollComplete expects
  return [{ rolls }];
};
