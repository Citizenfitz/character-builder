export const calculateBonus = (attributeValue: number = 0): number => {
  const bonusRange = [
    0, 0, 0, -3, -3, -2, -2, -1, -1, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5,
    6, 6,
  ];
  return bonusRange[attributeValue];
};
