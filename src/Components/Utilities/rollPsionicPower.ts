import { psionicsData } from "../../Data/indexRefactor";

export const rollPsionicPower = () => {
  const roll = Math.floor(Math.random() * 100) + 1;
  const psionic = psionicsData
    .sort((a, b) => a.roll - b.roll)
    .find((p) => roll <= p.roll);
  return psionic ?? null;
};
