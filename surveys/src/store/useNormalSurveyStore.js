import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculateBigFiveScores } from "../services/Services";

export const useNormalSurveyStore = create(
  persist(
    (set, get) => ({
      answers: {}, // Stores section-wise answers
      scores: {}, // Stores computed scores
      showResult: false,

      setAnswer: (section, index, value) =>
        set((state) => {
          const updatedAnswers = { ...state.answers };

          if (!updatedAnswers[section]) {
            updatedAnswers[section] = [];
          }

          updatedAnswers[section][index] = Number(value); // Convert to number
          return { answers: updatedAnswers };
        }),

      updateScores: () => {
        const allAnswers = get().answers.questions;
        console.log(allAnswers);

        if (allAnswers.length < 50) {
          console.error("Not all questions are answered:", allAnswers);
          return;
        }

        const scores = calculateBigFiveScores(allAnswers);
        console.log("SCORES -> ", scores);
        set({ scores });
      },

      setShowResult: (value) => set({ showResult: value }),
    }),
    {
      name: "Normal-survey-storage",
      getStorage: () => localStorage,
    }
  )
);
