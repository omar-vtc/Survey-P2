import React, { useState } from "react";
import Result from "./Result";
import { questions } from "../data/Questions";
import { options } from "../data/Questions";
import { useSurveyStore } from "../store/useSurveyStore";
import { useNavigate } from "react-router-dom";
import { interpretations } from "../data/Questions";
import { interpretScore } from "../services/Services";
import { useUserStore } from "../store/useUserStore";
import axios from "axios";

const Survey = () => {
  const {
    answers,
    setAnswer,
    showResult,
    setShowResult,
    scores,
    updateScores,
  } = useSurveyStore();
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  //create an object of scores and intrepretation for the backend
  const scoresWithInterpretations = Object.entries(scores).reduce(
    (acc, [section, score]) => {
      acc[section] = {
        score,
        interpretation: interpretScore(section, score),
      };
      return acc;
    },
    {}
  );

  const userInfoWithScores = {
    ...userInfo,
    scoresWithInterpretations: Object.entries(scores).reduce(
      (acc, [section, score]) => {
        acc[section] = {
          score,
          interpretation: interpretScore(section, score),
        };
        return acc;
      },
      {}
    ),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateScores(); // Update scores before showing the result
    console.log("Scores + Interpretation: ", scoresWithInterpretations);
    console.log(userInfoWithScores);
    try {
      const response = await axios.post(
        "http://localhost:5000/submit",
        userInfoWithScores
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error submitting data: " + error.message);
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
    navigate("/report");
  };

  return (
    <div className="w-[85%] mx-auto">
      <form className="space-y-8" onSubmit={handleSubmit}>
        {Object.entries(questions).map(([section, qs]) => (
          <div key={section} className="p-4 bg-white shadow rounded">
            <h2 className="font-semibold mb-4 text-blue-500 text-2xl">
              Section {section}
            </h2>
            <table className="w-full border-collapse border border-gray-300 text-left">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Question</th>
                  {options.map((option) => (
                    <th
                      key={option.value}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {option.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {qs.map((q, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{q}</td>
                    {options.map((option) => (
                      <td
                        key={option.value}
                        className="border border-gray-300 px-4 py-2 text-center"
                      >
                        <input
                          type="radio"
                          name={`section-${section}-question-${index}`}
                          value={option.value}
                          checked={answers[section][index] === option.value}
                          onChange={(e) =>
                            setAnswer(section, index, e.target.value)
                          }
                          required
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white px-8 py-4 rounded text-xl"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Survey;
