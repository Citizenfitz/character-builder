import React, { useState } from "react";
import { mutationsData } from "../../Data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MUTATION_OPTIONS = [
  "Acid Attack",
  "Alacrity",
  "Aquatic adaptation",
  "Bioluminescence",
  "Chameleon Ability",
  "Clinging",
  "Compressible Form",
  "Darksight",
  "Dual Heads",
  "Dwarfism",
  "Echolocation",
  "Electrogenic attack",
  "Extra Arms",
  "Extra Legs",
  "Gas Attack",
  "Gas Bags",
  "Gigantism",
  "Hyper Hearing",
  "Hyper Immune System",
  "Hyper Smell",
  "Hyper Vision",
  "Metamorphosis",
  "Natural Armor",
  "Natural Weaponry",
  "Pheromonic Influence",
  "Prehensile Tail",
  "Radiant Gaze",
  "Regeneration",
  "Resistance",
  "Sonic Attack",
  "Spines, Thorns, or Quills",
  "Symbiotic Domination",
  "Thanatosis",
  "Venom",
  "Web generation",
  "Wings",
];

const DEFECT_OPTIONS = [
  "Allergy",
  "Allurement Odor",
  "Amnesia, Memory Limit",
  "Amnesia, Periodic",
  "Antagonistic Dual Brain",
  "Dependence, light",
  "Dependence, water",
  "Frailty",
  "Hyper Metabolism",
  "Impaired Attribute, Constitution",
  "Impaired Attribute, Dexterity",
  "Impaired Attribute, Strength",
  "Impaired Mobility",
  "Impaired Sense, Hearing",
  "Impaired Sense, Photophobia",
  "Impaired Sense, Smell",
  "Impaired Sense, Touch",
  "Impaired Sense, Vision",
  "Insanity, Berserkism",
  "Insanity, Mental Block",
  "Insanity, Phobia",
  "Monstrous Appearance",
  "Reduced Endurance",
  "Touch Aversion",
  "Vulnerability",
  "Weak Willed",
];

const MUTATION_COMBINATIONS = [
  { label: "1 / 0", mutations: 1, defects: 0 },
  { label: "2 / 1", mutations: 2, defects: 1 },
  { label: "3 / 1", mutations: 3, defects: 1 },
  { label: "4 / 2", mutations: 4, defects: 2 },
  { label: "4 / 3", mutations: 4, defects: 3 },
];

const getMutationFromRoll = (roll) => {
  if (roll <= 3) return "Acid Attack";
  if (roll <= 5) return "Alacrity";
  if (roll <= 7) return "Aquatic adaptation";
  if (roll <= 10) return "Bioluminescence";
  if (roll <= 13) return "Chameleon Ability";
  if (roll <= 16) return "Clinging";
  if (roll <= 19) return "Compressible Form";
  if (roll <= 22) return "Darksight";
  if (roll <= 24) return "Dual Heads";
  if (roll <= 27) return "Dwarfism";
  if (roll <= 30) return "Echolocation";
  if (roll <= 33) return "Electrogenic attack";
  if (roll <= 36) return "Extra Arms";
  if (roll <= 39) return "Extra Legs";
  if (roll <= 42) return "Gas Attack";
  if (roll <= 43) return "Gas Bags";
  if (roll <= 46) return "Gigantism";
  if (roll <= 49) return "Hyper Hearing";
  if (roll <= 52) return "Hyper Immune System";
  if (roll <= 55) return "Hyper Smell";
  if (roll <= 58) return "Hyper Vision";
  if (roll <= 59) return "Metamorphosis";
  if (roll <= 62) return "Natural Armor";
  if (roll <= 65) return "Natural Weaponry";
  if (roll <= 66) return "Pheromonic Influence";
  if (roll <= 69) return "Prehensile Tail";
  if (roll <= 72) return "Radiant Gaze";
  if (roll <= 75) return "Regeneration";
  if (roll <= 78) return "Resistance";
  if (roll <= 81) return "Sonic Attack";
  if (roll <= 84) return "Spines, Thorns, or Quills";
  if (roll <= 86) return "Symbiotic Domination";
  if (roll <= 89) return "Thanatosis";
  if (roll <= 91) return "Venom";
  if (roll <= 94) return "Web generation";
  if (roll <= 97) return "Wings";
  return "none"; // Player's Choice (98-100)
};

const getDefectFromRoll = (roll) => {
  if (roll <= 9) return "Allergy";
  if (roll <= 12) return "Allurement Odor";
  if (roll <= 15) return "Amnesia, Memory Limit";
  if (roll <= 18) return "Amnesia, Periodic";
  if (roll <= 21) return "Antagonistic Dual Brain";
  if (roll <= 24) return "Dependence, light";
  if (roll <= 27) return "Dependence, water";
  if (roll <= 30) return "Frailty";
  if (roll <= 33) return "Hyper Metabolism";
  if (roll <= 36) return "Impaired Attribute, Constitution";
  if (roll <= 39) return "Impaired Attribute, Dexterity";
  if (roll <= 42) return "Impaired Attribute, Strength";
  if (roll <= 45) return "Impaired Mobility";
  if (roll <= 48) return "Impaired Sense, Hearing";
  if (roll <= 51) return "Impaired Sense, Photophobia";
  if (roll <= 54) return "Impaired Sense, Smell";
  if (roll <= 57) return "Impaired Sense, Touch";
  if (roll <= 60) return "Impaired Sense, Vision";
  if (roll <= 63) return "Insanity, Berserkism";
  if (roll <= 66) return "Insanity, Mental Block";
  if (roll <= 69) return "Insanity, Phobia";
  if (roll <= 72) return "Monstrous Appearance";
  if (roll <= 75) return "Reduced Endurance";
  if (roll <= 79) return "Touch Aversion";
  if (roll <= 93) return "Vulnerability";
  if (roll <= 96) return "Weak Willed";
  return "none"; // Player's Choice (97-100)
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

      <table className="char-sheet__mutations-table">
        <thead>
          <tr>
            <th>Mutations</th>
            <th>Defects</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((num) => (
            <tr key={num}>
              <td>
                {num <= character.mutations.numMutations ? (
                  <select
                    className="char-sheet__select"
                    value={character.mutations[`mutation${num}`]}
                    onChange={(e) => handleMutationChange(num, e.target.value)}
                  >
                    <option value="none">Select Mutation {num}</option>
                    {MUTATION_OPTIONS.map((mutation) => (
                      <option key={mutation} value={mutation}>
                        {mutation}
                      </option>
                    ))}
                  </select>
                ) : (
                  <>&nbsp;</>
                )}
              </td>
              <td>
                {num <= character.mutations.numDefects ? (
                  <select
                    className="char-sheet__select"
                    value={character.mutations[`defect${num}`]}
                    onChange={(e) => handleDefectChange(num, e.target.value)}
                  >
                    <option value="none">Select Defect {num}</option>
                    {DEFECT_OPTIONS.map((defect) => (
                      <option key={defect} value={defect}>
                        {defect}
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
    </div>
  );
};

export default MutationDetails;
