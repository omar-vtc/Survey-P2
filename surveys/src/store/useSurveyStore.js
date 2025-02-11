import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSurveyStore = create(
  persist(
    (set, get) => ({
      answers: { A: [], B: [], C: [] }, // Initialize answers
      scores: { A: 0, B: 0, C: 0 }, // Store calculated scores
      showResult: false,

      setAnswer: (section, index, value) =>
        set((state) => {
          const updatedAnswers = { ...state.answers };
          updatedAnswers[section][index] = Number(value); // Convert to number

          return { answers: updatedAnswers };
        }),

      updateScores: () =>
        set((state) => {
          const calculateScore = (section) =>
            state.answers[section]?.reduce(
              (sum, score) => sum + (score || 0),
              0
            );

          return {
            scores: {
              A: calculateScore("A"),
              B: calculateScore("B"),
              C: calculateScore("C"),
            },
          };
        }),

      setShowResult: (value) => set({ showResult: value }),
    }),
    {
      name: "survey-storage", // Local Storage key
      getStorage: () => localStorage, // Use localStorage
    }
  )
);
