import React from "react";
import { aspectData, raceData } from "../../../Data";

const RaceAspect = ({
  character,
  onAspectChange,
  onRaceChange,
  onGenderChange,
  onRaceModalOpen,
}) => {
  return (
    <div className="flex-grid__child">
      <label>
        <select
          name="aspect"
          value={character.aspect}
          onChange={onAspectChange}
          className="ut-no-print"
        >
          {aspectData.map((aspect) => (
            <option key={aspect.name} value={aspect.name}>
              {aspect.name}
            </option>
          ))}
        </select>
        <div className="ut-no-screen print-text-input">{character.aspect}</div>
        <br />
        <span className="label">Aspect</span>
      </label>

      <label>
        <select
          name="race"
          value={character.race}
          onChange={onRaceChange}
          className="ut-no-print"
        >
          {raceData.map((race) => (
            <option key={race.name} value={race.name}>
              {race.name}
            </option>
          ))}
        </select>
        <div className="ut-no-screen print-text-input">{character.race}</div>
        <br />
        <span className="label">
          Race{" "}
          <button
            className="button button--help"
            onClick={onRaceModalOpen}
            aria-label="Race help"
          >
            <span className="fas fa-question-circle"></span>
          </button>
        </span>
      </label>

      <label>
        <select
          name="gender"
          value={character.gender}
          onChange={onGenderChange}
          className="ut-no-print"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <div className="ut-no-screen print-text-input">{character.gender}</div>
        <br />
        <span className="label">Gender</span>
      </label>
    </div>
  );
};

export default RaceAspect;
