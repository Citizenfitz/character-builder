import { useCallback } from "react";
import {
  armorData,
  meleeWeaponData,
  rangedWeaponData,
  shieldData,
} from "../../../Data";

export const useEquipment = (character, updateCharacter) => {
  const handleArmorChange = useCallback(
    (e) => {
      const armorIndex = parseInt(e.target.value);
      const armor = armorData[armorIndex];
      const newCharacter = {
        ...character,
        armorIndex,
        armor,
        ac:
          10 +
          character.attributes.dexterity.mod +
          armor.modifier +
          character.shield,
      };
      updateCharacter(newCharacter);
    },
    [character, updateCharacter]
  );

  const handleShieldChange = useCallback(
    (e) => {
      const shieldIndex = parseInt(e.target.value);
      const shield = shieldData[shieldIndex].modifier;
      const newCharacter = {
        ...character,
        shieldIndex,
        shield,
        ac:
          10 +
          character.attributes.dexterity.mod +
          character.armor.modifier +
          shield,
      };
      updateCharacter(newCharacter);
    },
    [character, updateCharacter]
  );

  const handleMeleeWeaponChange = useCallback(
    (e) => {
      const meleeWeaponIndex = parseInt(e.target.value);
      const meleeWeapon = meleeWeaponData[meleeWeaponIndex];
      const newCharacter = {
        ...character,
        meleeWeaponIndex,
        meleeWeapon,
      };
      updateCharacter(newCharacter);
    },
    [character, updateCharacter]
  );

  const handleRangedWeaponChange = useCallback(
    (e) => {
      const rangedWeaponIndex = parseInt(e.target.value);
      const rangedWeapon = rangedWeaponData[rangedWeaponIndex];
      const newCharacter = {
        ...character,
        rangedWeaponIndex,
        rangedWeapon,
      };
      updateCharacter(newCharacter);
    },
    [character, updateCharacter]
  );

  return {
    handleArmorChange,
    handleShieldChange,
    handleMeleeWeaponChange,
    handleRangedWeaponChange,
  };
};
