import React from "react";
import { formatNumberModifier } from "../../Utilities";

const HPManager = ({ character, onHPChange, onRollHP, totalHP, conBonus }) => {
  return (
    <div className="flex-grid__child data-display-box data-display-box--quick-values">
      <button
        className="button button--secondary data-display-box__button"
        aria-label="Roll Hit Points"
        onClick={onRollHP}
      >
        <span className="fas fa-die"></span>
      </button>
      <div className="data-display-box__text">
        <input
          className="hp"
          type="number"
          inputMode="numeric"
          min={0}
          max={999}
          value={totalHP}
          onChange={onHPChange}
        />
        <div className="ut-text-explain">
          <span className="label">Base: </span>
          {character.hp.rolls.join(" + ")}
          <br />
          <span className="label">CON: </span>
          {formatNumberModifier(conBonus)} × {character.level}
          <br />
          {character.hp.hasDurability && (
            <>
              <span className="label">Durability: </span>+
              {character.hp.durabilityBonus}
              <br />
            </>
          )}
          {character.hp.manual !== 0 && (
            <>
              <span className="label">Manual: </span>
              {formatNumberModifier(character.hp.manual)}
            </>
          )}
        </div>
      </div>
      <h2 className="data-display-box__header">HP</h2>
    </div>
  );
};

export default HPManager;
