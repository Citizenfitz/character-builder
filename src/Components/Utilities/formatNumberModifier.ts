export const formatNumberModifier = (bonusValue: number = 0): string => {
  const val = bonusValue ?? 0;
  if (val > 0) {
    return "+" + val;
  }
  return String(val);
};
