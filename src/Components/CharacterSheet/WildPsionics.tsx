import React from "react";
import { psionicsData } from "../../Data/indexRefactor";
import RenderPsionic from "../MarkdownRender/RenderPsionic";
import { calculateBonus, rollPsionicPower } from "../Utilities";
import { useCharacter } from "../../context/CharacterContext";
import type { PsionicPower } from "../../types/data";

const WildPsionics = () => {
  const { character, dispatch } = useCharacter();
  const { talents, attributes, psionics } = character;

  const wildPsionicCount = Object.values(talents).filter(
    (talent) => talent === "Wild Psionics",
  ).length;

  if (wildPsionicCount === 0) return null;

  // PSP is fully derived — no need to store in character state
  const intBonus = Math.max(
    0,
    calculateBonus(attributes.intelligence.total) * 2,
  );
  const wisBonus = Math.max(0, calculateBonus(attributes.wisdom.total) * 2);
  const chaBonus = Math.max(0, calculateBonus(attributes.charisma.total) * 2);
  const pspTotal = wildPsionicCount * 15 + intBonus + wisBonus + chaBonus;

  const dispatchPower = (newWildPsionics: PsionicPower[]) => {
    dispatch({
      type: "SET_PSIONICS",
      payload: { wildPsionics: newWildPsionics },
    });
  };

  const handleRollPower = (index: number) => {
    const newPower = rollPsionicPower();
    if (!newPower) return;
    const updated = [...psionics.wildPsionics];
    updated[index] = newPower;
    dispatchPower(updated);
  };

  const handleSelectPower = (index: number, name: string) => {
    const selectedPower = psionicsData.find((p) => p.name === name);
    if (!selectedPower) return;
    const updated = [...psionics.wildPsionics];
    updated[index] = selectedPower;
    dispatchPower(updated);
  };

  return (
    <div className="char-sheet__wild-psionics">
      <table className="char-sheet__table">
        <caption className="char-sheet__table__caption">Wild Psionics</caption>
        <thead>
          <tr>
            <th
              className="char-sheet__table__header char-sheet__wild-psionics__psionic-no"
              scope="col"
            >
              Wild Psionic No.
            </th>
            <th className="char-sheet__table__header" scope="col">
              Psionic Ability
            </th>
            <th className="char-sheet__table__header" scope="col">
              PSP
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: wildPsionicCount }, (_, index) => {
            const power = psionics.wildPsionics[index] ?? null;
            return (
              <tr key={index}>
                <td className="char-sheet__table__cell">{index + 1}</td>
                <td className="char-sheet__table__cell">
                  <div className="char-sheet__wild-psionics__power">
                    {power ? (
                      <>
                        <button
                          className="char-sheet__button char-sheet__button--icon char-sheet__wild-psionics__button"
                          onClick={() => handleRollPower(index)}
                          title="Reroll Wild Psionic Power"
                          aria-label="Reroll Wild Psionic Power"
                        >
                          <i className="fas fa-dice" aria-hidden="true" />
                        </button>
                        <select
                          value={power.name}
                          onChange={(e) =>
                            handleSelectPower(index, e.target.value)
                          }
                          aria-label={`Wild Psionic power ${index + 1}`}
                        >
                          {psionicsData
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((p) => (
                              <option key={p.id} value={p.name}>
                                {p.name}
                              </option>
                            ))}
                        </select>
                      </>
                    ) : (
                      <button
                        className="char-sheet__button"
                        onClick={() => handleRollPower(index)}
                      >
                        <i className="fas fa-dice" aria-hidden="true" /> Roll
                        Wild Psionic Power
                      </button>
                    )}
                  </div>
                </td>
                <td className="char-sheet__table__cell">15</td>
              </tr>
            );
          })}
          <tr className="char-sheet__wild-psionics-table__total">
            <td
              colSpan={2}
              className="char-sheet__table__cell char-sheet__wild-psionics__total-label"
            >
              <b>PSP Total (including attribute bonuses)</b>
            </td>
            <td className="char-sheet__table__cell">
              <b>{pspTotal}</b>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="char-sheet__wild-psionics-details">
        {psionics.wildPsionics.map((psionic, index) => (
          <RenderPsionic
            key={index}
            id={psionic.id}
            name={psionic.name}
            discipline={psionic.discipline}
            psp={psionic.psp}
            initiate={psionic.initiate}
            duration={psionic.duration}
            range={psionic.range}
            visibility={psionic.visibility}
            save={psionic.save}
            target={psionic.target}
            rangeInf={psionic.rangeInf}
          />
        ))}
      </div>
    </div>
  );
};

export default WildPsionics;
