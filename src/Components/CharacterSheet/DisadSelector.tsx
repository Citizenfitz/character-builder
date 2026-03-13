import React from "react";
import { disadData } from "../../Data/indexRefactor";
import { useCharacter } from "../../context/CharacterContext";

interface DisadSelectorProps {
  id: "disad1" | "disad2";
}

const DisadSelector = ({ id }: DisadSelectorProps) => {
  const { character, dispatch } = useCharacter();

  const handleSetDisad = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "SET_DISAD",
      payload: { slot: id, value: e.target.value },
    });
  };

  const currentValue = character[id];

  return (
    <div>
      <label htmlFor={id} className="ut-only-sr">
        {id === "disad1" ? "Disadvantage 1" : "Disadvantage 2"}
      </label>
      <select
        id={id}
        onChange={handleSetDisad}
        value={currentValue}
        className="ut-no-print"
        aria-label={id === "disad1" ? "Disadvantage 1" : "Disadvantage 2"}
      >
        {disadData.map((option) => (
          <option
            key={option.id}
            value={option.name}
            disabled={
              (option.name === character.disad1 &&
                id !== "disad1" &&
                option.name !== "none") ||
              (option.name === character.disad2 &&
                id !== "disad2" &&
                option.name !== "none")
            }
          >
            {option.name}
          </option>
        ))}
      </select>
      <div className="ut-no-screen print-text-input" aria-hidden="true">
        {currentValue}
      </div>
    </div>
  );
};

export default DisadSelector;
