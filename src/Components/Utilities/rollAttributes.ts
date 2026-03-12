/**
 * Generates scores for all six attributes by rolling 3d6 for each.
 * @returns Array of six attribute scores
 * TEMPORARY until I can get Frank's dice roller working.
 */
export const rollAttributes = (): number[] => {
  const attributes: number[] = [];
  for (let i = 0; i < 6; i++) {
    let rollsTotal = 0;
    for (let j = 0; j < 3; j++) {
      rollsTotal += Math.floor(Math.random() * 6) + 1;
    }
    attributes.push(rollsTotal);
  }
  return attributes;
};
