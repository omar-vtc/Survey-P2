import React from "react";
import { useNormalSurveyStore } from "../store/useNormalSurveyStore"; // Updated import
import { interpretScore } from "../services/Services";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Personality trait descriptions
const traitDescriptions = {
  E: "Extroversion (E) is the personality trait of seeking fulfillment from sources outside the self or in community. High scorers tend to be very social, while low scorers prefer to work on their projects alone.",
  A: "Agreeableness (A) reflects how much individuals adjust their behavior to suit others. High scorers are typically polite and like people. Low scorers tend to 'tell it like it is'.",
  C: "Conscientiousness (C) is the personality trait of being honest and hardworking. High scorers tend to follow rules and prefer clean homes. Low scorers may be messy and cheat others.",
  N: "Neuroticism (N) is the personality trait of being emotional.",
  O: "Openness to Experience (O) is the personality trait of seeking new experiences and intellectual pursuits. High scorers may daydream a lot. Low scorers may be very down-to-earth.",
};

const Result = () => {
  const { scores } = useNormalSurveyStore(); // Use the correct store
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="font-bold text-lg mb-4">{t("Results")}</h2>
      {Object.entries(scores).map(([section, score]) => (
        <div key={section} className="mb-4 p-4 border rounded">
          <p className="text-gray-700">
            {t("Score")}: <span className="font-semibold">{score}</span>
          </p>
          <p className="text-gray-600 italic">
            {t(traitDescriptions[section])}
          </p>
        </div>
      ))}
      <div className="flex space-x-4"></div>
    </div>
  );
};

export default Result;
