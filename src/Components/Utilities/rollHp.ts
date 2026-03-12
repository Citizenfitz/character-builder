/**
 * Rolls hit points for a character.
 * @param level - The character's level.
 * @param hitDiceType - The number of sides on the hit die (e.g., 8 for d8).
 * @param hasDurability - Whether the character has the Durability talent.
 * @returns Array of roll results compatible with the existing structure.
 * TEMPORARY until I can get Frank's dice roller working.
 */
export const rollHp = (
  level: number,
  hitDiceType: number,
  hasDurability: boolean,
): { rolls: { value: number }[] }[] => {
  const numDice = level * (hasDurability ? 2 : 1);
  const rolls: { value: number }[] = [];

  for (let i = 0; i < numDice; i++) {
    rolls.push({ value: Math.floor(Math.random() * hitDiceType) + 1 });
  }

  return [{ rolls }];
};
