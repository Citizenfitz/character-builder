import React from "react";
import { formatNumberModifier } from "../../Utilities";

const QuickStats = ({
  ac,
  hp,
  movement,
  perception,
  wisdomMod,
  onHPChange,
  onRollHP,
}) => {
  return (
    <div className="flex-grid flex-grid--wrap">
      <div className="flex-grid__child data-display-box data-display-box--quick-values">
        <div className="data-display-box__text">{ac}</div>
        <h2 className="data-display-box__header">AC</h2>
      </div>

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
            value={hp}
            onChange={onHPChange}
          />
        </div>
        <h2 className="data-display-box__header">HP</h2>
      </div>

      <div className="flex-grid__child data-display-box data-display-box--quick-values">
        <div className="data-display-box__text">{movement}'</div>
        <h2 className="data-display-box__header">Move</h2>
      </div>

      <div className="flex-grid__child data-display-box data-display-box--quick-values data-display-box--perception">
        <div className="data-display-box__text">
          <span className="label">Roll Mod: </span>
          {formatNumberModifier(wisdomMod)}
          <br />
          <span className="label">Passive:</span> {perception}
        </div>
        <h2 className="data-display-box__header">Perc.</h2>
      </div>
    </div>
  );
};

export default QuickStats;
