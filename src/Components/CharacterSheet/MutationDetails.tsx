import React from "react";
import { mutationsData, mutationDefectData } from "../../Data/indexRefactor";
import RenderMutation from "../MarkdownRender/RenderMutation";
import RenderDefect from "../MarkdownRender/RenderDefect";
import { useCharacter } from "../../context/CharacterContext";
import type { Mutations } from "../../types";

// TODO: move mutation rules to Utilities/talentRules.ts in rules revision
const MUTATION_COMBINATIONS = [
  { label: "1 / 0", mutations: 1, defects: 0 },
  { label: "2 / 1", mutations: 2, defects: 1 },
  { label: "3 / 1", mutations: 3, defects: 1 },
  { label: "4 / 2", mutations: 4, defects: 2 },
  { label: "4 / 3", mutations: 4, defects: 3 },
];

const getMutationFromRoll = (roll: number): string => {
  const mutation = mutationsData
    .sort((a, b) => a.roll - b.roll)
    .find((m) => roll <= m.roll);
  return mutation && mutation.name !== "Player's Choice"
    ? mutation.name
    : "none";
};

const getDefectFromRoll = (roll: number): string => {
  const defect = mutationDefectData
    .sort((a, b) => a.roll - b.roll)
    .find((d) => roll <= d.roll);
  return defect && defect.name !== "Player's Choice" ? defect.name : "none";
};

const MutationDetails = () => {
  const { character, dispatch } = useCharacter();
  const { mutations } = character;

  const dispatchMutations = (payload: Partial<Mutations>) => {
    dispatch({ type: "SET_MUTATIONS", payload });
  };

  const handleCombinedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [numMutations, numDefects] = e.target.value
      .split("/")
      .map((n) => Number(n.trim()));
    dispatchMutations({ numMutations, numDefects });
  };

  const handleMutationChange = (
    num: number,
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatchMutations({
      [`mutation${num}`]: e.target.value,
    } as Partial<Mutations>);
  };

  const handleDefectChange = (
    num: number,
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatchMutations({
      [`defect${num}`]: e.target.value,
    } as Partial<Mutations>);
  };

  const getCurrentCombo = (): string =>
    `${mutations.numMutations} / ${mutations.numDefects}`;

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

    const newMutations: Partial<Record<keyof Mutations, string | number>> = {
      numMutations,
      numDefects,
    };

    for (let i = 1; i <= 4; i++) {
      const key = `mutation${i}` as keyof Mutations;
      newMutations[key] =
        i <= numMutations
          ? getMutationFromRoll(Math.floor(Math.random() * 100) + 1)
          : "none";
    }

    for (let i = 1; i <= 3; i++) {
      const key = `defect${i}` as keyof Mutations;
      newMutations[key] =
        i <= numDefects
          ? getDefectFromRoll(Math.floor(Math.random() * 100) + 1)
          : "none";
    }

    dispatchMutations(newMutations as Partial<Mutations>);
  };

  return (
    <div className="char-sheet__mutations">
      <div className="char-sheet__mutations-controls">
        <button
          className="char-sheet__button"
          onClick={handleRandomize}
          aria-label="Randomize all mutations and defects"
        >
          <i className="fas fa-dice" aria-hidden="true" /> Randomize Mutations
        </button>

        <label className="char-sheet__mutations-control">
          Number of Mutations/Defects:
          <select
            className="char-sheet__select"
            value={getCurrentCombo()}
            onChange={handleCombinedChange}
            aria-label="Select number of mutations and defects"
          >
            {MUTATION_COMBINATIONS.map((combo) => (
              <option key={combo.label} value={combo.label}>
                {combo.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <table
        className="char-sheet__table char-sheet__table--mutations"
        aria-label="Mutations and Defects"
      >
        <thead>
          <tr>
            <th className="char-sheet__table__header" scope="col">
              Mutations
            </th>
            <th className="char-sheet__table__header" scope="col">
              Defects
            </th>
          </tr>
        </thead>
        <tbody>
          {([1, 2, 3, 4] as const).map((num) => (
            <tr key={num}>
              <td className="char-sheet__table__cell">
                {num <= mutations.numMutations ? (
                  <select
                    className="char-sheet__select"
                    value={
                      mutations[`mutation${num}` as keyof Mutations] as string
                    }
                    onChange={(e) => handleMutationChange(num, e)}
                    aria-label={`Mutation ${num}`}
                  >
                    <option value="none">
                      Player's Choice: Select Mutation {num}
                    </option>
                    {mutationsData
                      .filter((m) => m.name !== "Player's Choice")
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
                {num <= mutations.numDefects ? (
                  <select
                    className="char-sheet__select"
                    value={
                      mutations[`defect${num}` as keyof Mutations] as string
                    }
                    onChange={(e) => handleDefectChange(num, e)}
                    aria-label={`Defect ${num}`}
                  >
                    <option value="none">
                      Player's Choice: Select Defect {num}
                    </option>
                    {mutationDefectData
                      .filter((d) => d.name !== "Player's Choice")
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
        {([1, 2, 3, 4] as const).map((num) => {
          const mutation = mutations[
            `mutation${num}` as keyof Mutations
          ] as string;
          return mutation && mutation !== "none" ? (
            <RenderMutation key={`mutation-${num}`} name={mutation} />
          ) : null;
        })}
        {([1, 2, 3] as const).map((num) => {
          const defect = mutations[`defect${num}` as keyof Mutations] as string;
          return defect && defect !== "none" ? (
            <RenderDefect key={`defect-${num}`} name={defect} />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default MutationDetails;
