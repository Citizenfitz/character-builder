import React, { useState } from "react";
import { mutationsData, mutationDefectData } from "../../Data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RenderMutation from "../MarkdownRender/RenderMutation";
import RenderDefect from "../MarkdownRender/RenderDefect";

const MUTATION_COMBINATIONS = [
  { label: "1 / 0", mutations: 1, defects: 0 },
  { label: "2 / 1", mutations: 2, defects: 1 },
  { label: "3 / 1", mutations: 3, defects: 1 },
  { label: "4 / 2", mutations: 4, defects: 2 },
  { label: "4 / 3", mutations: 4, defects: 3 },
];

const getMutationFromRoll = (roll) => {
  // Find the first mutation where the roll is less than or equal to its roll value
  const mutation = mutationsData
    .sort((a, b) => a.roll - b.roll)
    .find((m) => roll <= m.roll);

  // Return "none" for Player's Choice or if no mutation found
  return mutation && mutation.name !== "Player's Choice"
    ? mutation.name
    : "none";
};

const getDefectFromRoll = (roll) => {
  // Find the first defect where the roll is less than or equal to its roll value
  const defect = mutationDefectData
    .sort((a, b) => a.roll - b.roll)
    .find((d) => roll <= d.roll);

  // Return "none" for Player's Choice or if no defect found
  return defect && defect.name !== "Player's Choice" ? defect.name : "none";
};

const MutationDetails = ({ character, setCharacter }) => {
  const handleCombinedChange = (value) => {
    const [mutations, defects] = value
      .split("/")
      .map((num) => Number(num.trim()));
    setCharacter((prev) => ({
      ...prev,
      mutations: {
        ...prev.mutations,
        numMutations: mutations,
        numDefects: defects,
      },
    }));
  };

  // Add back the mutation and defect handlers
  const handleMutationChange = (num, value) => {
    setCharacter((prev) => ({
      ...prev,
      mutations: {
        ...prev.mutations,
        [`mutation${num}`]: value,
      },
    }));
  };

  const handleDefectChange = (num, value) => {
    setCharacter((prev) => ({
      ...prev,
      mutations: {
        ...prev.mutations,
        [`defect${num}`]: value,
      },
    }));
  };

  // Get current combination value for select
  const getCurrentCombo = () => {
    const { numMutations, numDefects } = character.mutations;
    return `${numMutations} / ${numDefects}`;
  };

  const handleRandomize = () => {
    const roll = Math.floor(Math.random() * 20) + 1;

    let numMutations = 1;
    let numDefects = 0;

    if (roll >= 2 && roll <= 14) {
      numMutations = 2;
      numDefects = 1;
    } else if (roll >= 15 && roll <= 17) {
      numMutations = 3;
      numDefects = 1;
    } else if (roll >= 18 && roll <= 19) {
      numMutations = 4;
      numDefects = 2;
    } else if (roll === 20) {
      numMutations = 4;
      numDefects = 3;
    }

    // Generate random mutations
    const mutations = {};
    for (let i = 1; i <= numMutations; i++) {
      const mutationRoll = Math.floor(Math.random() * 100) + 1;
      mutations[`mutation${i}`] = getMutationFromRoll(mutationRoll);
    }

    // Reset unused mutation slots
    for (let i = numMutations + 1; i <= 4; i++) {
      mutations[`mutation${i}`] = "none";
    }

    // Generate random defects
    for (let i = 1; i <= numDefects; i++) {
      const defectRoll = Math.floor(Math.random() * 100) + 1;
      mutations[`defect${i}`] = getDefectFromRoll(defectRoll);
    }

    // Reset unused defect slots
    for (let i = numDefects + 1; i <= 3; i++) {
      mutations[`defect${i}`] = "none";
    }

    setCharacter((prev) => ({
      ...prev,
      mutations: {
        ...prev.mutations,
        ...mutations,
        numMutations,
        numDefects,
      },
    }));
  };

  return (
    <div className="char-sheet__mutations">
      <div className="char-sheet__mutations-controls">
        <button className="char-sheet__button" onClick={handleRandomize}>
          <i className="fas fa-dice"></i> Randomize Mutations
        </button>

        <label className="char-sheet__mutations-control">
          Number of Mutations/Defects:
          <select
            className="char-sheet__select"
            value={getCurrentCombo()}
            onChange={(e) => handleCombinedChange(e.target.value)}
          >
            {MUTATION_COMBINATIONS.map((combo) => (
              <option key={combo.label} value={combo.label}>
                {combo.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <table className="char-sheet__table char-sheet__table--mutations">
        <thead>
          <tr>
            <th className="char-sheet__table__header">Mutations</th>
            <th className="char-sheet__table__header">Defects</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((num) => (
            <tr key={num}>
              <td className="char-sheet__table__cell">
                {num <= character.mutations.numMutations ? (
                  <select
                    className="char-sheet__select"
                    value={character.mutations[`mutation${num}`]}
                    onChange={(e) => handleMutationChange(num, e.target.value)}
                  >
                    <option value="none">
                      Player's Choice: Select Mutation {num}
                    </option>
                    {mutationsData
                      .filter((mutation) => mutation.name !== "Player's Choice")
                      .map((mutation) => (
                        <option key={mutation.name} value={mutation.name}>
                          {mutation.name}
                        </option>
                      ))}
                  </select>
                ) : (
                  <>&nbsp;</>
                )}
              </td>
              <td className="char-sheet__table__cell">
                {num <= character.mutations.numDefects ? (
                  <select
                    className="char-sheet__select"
                    value={character.mutations[`defect${num}`]}
                    onChange={(e) => handleDefectChange(num, e.target.value)}
                  >
                    <option value="none">
                      Player's Choice: Select Defect {num}
                    </option>
                    {mutationDefectData
                      .filter((defect) => defect.name !== "Player's Choice")
                      .map((defect) => (
                        <option key={defect.name} value={defect.name}>
                          {defect.name}
                        </option>
                      ))}
                  </select>
                ) : (
                  <>&nbsp;</>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="char-sheet__mutations-details">
        {[1, 2, 3, 4].map((num) => {
          const mutation = character.mutations[`mutation${num}`];
          return mutation && mutation !== "none" ? (
            <RenderMutation key={`mutation-${num}`} name={mutation} />
          ) : null;
        })}

        {[1, 2, 3].map((num) => {
          const defect = character.mutations[`defect${num}`];
          return defect && defect !== "none" ? (
            <RenderDefect key={`defect-${num}`} name={defect} />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default MutationDetails;
