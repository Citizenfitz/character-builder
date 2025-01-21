import { useState, useEffect } from "react";
import { characterDefaults } from "../../../Data";

export const useCharacter = (initialData = characterDefaults) => {
  const [character, setCharacter] = useState(() => {
    const savedChar = localStorage.getItem("character");
    return savedChar ? JSON.parse(savedChar) : initialData;
  });

  const [autoSave, setAutoSave] = useState(() => {
    return JSON.parse(localStorage.getItem("autosave") || "false");
  });

  useEffect(() => {
    localStorage.setItem("autosave", JSON.stringify(autoSave));
  }, [autoSave]);

  useEffect(() => {
    if (autoSave) {
      localStorage.setItem("character", JSON.stringify(character));
    }
  }, [character, autoSave]);

  const updateCharacter = (updates) => {
    setCharacter((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const resetCharacter = () => {
    setCharacter(initialData);
  };

  return {
    character,
    updateCharacter,
    resetCharacter,
    autoSave,
    setAutoSave,
  };
};
