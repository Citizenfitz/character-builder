import React, { useEffect } from "react";
import { psionicsData } from "../../Data";
import RenderPsionic from "../Utilities/RenderPsionic";
import { calculateBonus, rollPsionicPower } from "../Utilities";

const WildPsionics = ({ character, setCharacter }) => {
  // Check if character has Wild Psionics talent in any slot
  const hasWildPsionics = Object.values(character.talents).some(
    (talent) => talent === "Wild Psionics"
  );

  // Calculate PSP based on number of Wild Psionics talents
  const wildPsionicCount = Object.values(character.talents).filter(
    (talent) => talent === "Wild Psionics"
  ).length;

  // Get positive bonuses from mental attributes (doubled)
  const intBonus = Math.max(
    0,
    calculateBonus(character.attributes.intelligence.total) * 2
  );
  const wisBonus = Math.max(
    0,
    calculateBonus(character.attributes.wisdom.total) * 2
  );
  const chaBonus = Math.max(
    0,
    calculateBonus(character.attributes.charisma.total) * 2
  );
  const attributeBonus = intBonus + wisBonus + chaBonus;

  // Update PSP whenever Wild Psionic count or attributes change
  useEffect(() => {
    setCharacter((prev) => ({
      ...prev,
      psionics: {
        ...prev.psionics,
        psp: wildPsionicCount * 15 + attributeBonus,
      },
    }));
  }, [wildPsionicCount, attributeBonus, setCharacter]);

  // Don't render anything if character doesn't have Wild Psionics
  if (!hasWildPsionics) return null;

  const handleRandomize = () => {
    const newPower = rollPsionicPower();
    if (newPower) {
      setCharacter((prev) => ({
        ...prev,
        psionics: {
          ...prev.psionics,
          wildPsionics: [...prev.psionics.wildPsionics, newPower],
        },
      }));
    }
  };

  return (
    <div className="char-sheet__wild-psionics">
      <table className="char-sheet__wild-psionics-table">
        <caption>Wild Psionics</caption>
        <thead>
          <tr>
            <th>Wild Psionic #</th>
            <th>Psionic Ability</th>
            <th>PSP</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(wildPsionicCount)].map((_, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <div className="char-sheet__wild-psionics-power">
                  {character.psionics.wildPsionics[index] ? (
                    <>
                      <button
                        className="char-sheet__button char-sheet__button--icon"
                        onClick={() => {
                          const newPower = rollPsionicPower();
                          if (newPower) {
                            setCharacter((prev) => {
                              const newWildPsionics = [
                                ...prev.psionics.wildPsionics,
                              ];
                              newWildPsionics[index] = newPower;
                              return {
                                ...prev,
                                psionics: {
                                  ...prev.psionics,
                                  wildPsionics: newWildPsionics,
                                },
                              };
                            });
                          }
                        }}
                        title="Reroll Wild Psionic Power"
                      >
                        <i className="fas fa-dice"></i>
                      </button>
                      <select
                        value={character.psionics.wildPsionics[index].name}
                        onChange={(e) => {
                          const selectedPower = psionicsData.find(
                            (p) => p.name === e.target.value
                          );
                          setCharacter((prev) => {
                            const newWildPsionics = [
                              ...prev.psionics.wildPsionics,
                            ];
                            newWildPsionics[index] = selectedPower;
                            return {
                              ...prev,
                              psionics: {
                                ...prev.psionics,
                                wildPsionics: newWildPsionics,
                              },
                            };
                          });
                        }}
                      >
                        {psionicsData
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((power) => (
                            <option key={power.id} value={power.name}>
                              {power.name}
                            </option>
                          ))}
                      </select>
                    </>
                  ) : (
                    <button
                      className="char-sheet__button"
                      onClick={() => {
                        const newPower = rollPsionicPower();
                        if (newPower) {
                          setCharacter((prev) => {
                            const newWildPsionics = [
                              ...prev.psionics.wildPsionics,
                            ];
                            newWildPsionics[index] = newPower;
                            return {
                              ...prev,
                              psionics: {
                                ...prev.psionics,
                                wildPsionics: newWildPsionics,
                              },
                            };
                          });
                        }
                      }}
                    >
                      <i className="fas fa-dice"></i> Roll Wild Psionic Power
                    </button>
                  )}
                </div>
              </td>
              <td>15</td>
            </tr>
          ))}
          <tr className="char-sheet__wild-psionics-table-total">
            <td
              colSpan={2}
              className="char-sheet__wild-psionics-table-total-label"
            >
              PSP Total (including attribute bonuses)
            </td>
            <td>{character.psionics.psp}</td>
          </tr>
        </tbody>
      </table>

      <div className="char-sheet__wild-psionics-details">
        {character.psionics.wildPsionics.map((psionic, index) => (
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
