import React from "react";
import {
  armorData,
  shieldData,
  meleeWeaponData,
  rangedWeaponData,
} from "../../../Data";

const Equipment = ({
  character,
  onArmorChange,
  onShieldChange,
  onMeleeWeaponChange,
  onRangedWeaponChange,
}) => {
  return (
    <div>
      <div>
        <label>
          <select
            name="armor"
            value={character.armorIndex}
            onChange={onArmorChange}
            className="ut-no-print"
          >
            {armorData.map((armor, i) => (
              <option key={`armor-${i}`} value={i}>
                {armor.armor} (+{armor.modifier})
              </option>
            ))}
          </select>
          <div className="ut-no-screen print-text-input">
            {armorData[character.armorIndex].name}
            {character.armorIndex > 0 && (
              <span>(+{armorData[character.armorIndex].modifier})</span>
            )}
          </div>
          <br />
          <span className="label">Armor</span>
        </label>
      </div>

      <div>
        <label>
          <select
            name="shield"
            value={character.shieldIndex}
            onChange={onShieldChange}
            className="ut-no-print"
          >
            {shieldData.map((shield, i) => (
              <option key={`shield-${i}`} value={i}>
                {shield.name} (+{shield.modifier})
              </option>
            ))}
          </select>
          <div className="ut-no-screen print-text-input">
            {shieldData[character.shieldIndex].name}
            {character.shieldIndex > 0 && (
              <span>(+{shieldData[character.shieldIndex].modifier})</span>
            )}
          </div>
          <br />
          <span className="label">Shield</span>
        </label>
      </div>

      <div>
        <label>
          <select
            name="meleeWeapon"
            value={character.meleeWeaponIndex}
            onChange={onMeleeWeaponChange}
            className="ut-no-print"
          >
            {meleeWeaponData.map((weapon, i) => (
              <option key={`melee-${i}`} value={i}>
                {weapon.name} ({weapon.damage})
              </option>
            ))}
          </select>
          <div className="ut-no-screen print-text-input">
            {meleeWeaponData[character.meleeWeaponIndex].name}
            {character.meleeWeaponIndex > 0 && (
              <span>
                ({meleeWeaponData[character.meleeWeaponIndex].damage})
              </span>
            )}
          </div>
          <br />
          <span className="label">Melee Weapon</span>
        </label>
      </div>

      <div>
        <label>
          <select
            name="rangedWeapon"
            value={character.rangedWeaponIndex}
            onChange={onRangedWeaponChange}
            className="ut-no-print"
          >
            {rangedWeaponData.map((weapon, i) => (
              <option key={`ranged-${i}`} value={i}>
                {weapon.name} ({weapon.damage})
              </option>
            ))}
          </select>
          <div className="ut-no-screen print-text-input">
            {rangedWeaponData[character.rangedWeaponIndex].name}
            {character.rangedWeaponIndex > 0 && (
              <span>
                ({rangedWeaponData[character.rangedWeaponIndex].damage})
              </span>
            )}
          </div>
          <br />
          <span className="label">Ranged Weapon</span>
        </label>
      </div>
    </div>
  );
};

export default Equipment;
