import React, { createContext, useContext, useReducer } from "react";
import type { Character, CharacterAction } from "../types";
import { characterReducer, characterDefaults } from "./characterReducer";

interface CharacterContextType {
  character: Character;
  dispatch: React.Dispatch<CharacterAction>;
}

const CharacterContext = createContext<CharacterContextType | null>(null);

export const CharacterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [character, dispatch] = useReducer(characterReducer, characterDefaults);

  return (
    <CharacterContext.Provider value={{ character, dispatch }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return context;
};
