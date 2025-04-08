import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSurveyStore } from "../store/useSurveyStore";
import { useUserStore } from "../store/useUserStore";
import axios from "axios";
import { interpretScore } from "../services/Services";
import { useNormalSurveyStore } from "../store/useNormalSurveyStore";
import { useTranslation } from "react-i18next";

const Survey = ({ questions, options }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { t, i18n } = useTranslation();

  // Determine which store to use based on the route
  const isPersonalitySurvey = location.pathname.includes("personality");
  const {
    answers,
    setAnswer,
    showResult,
    setShowResult,
    scores,
    updateScores,
    phone,
    setPhone,
  } = useNormalSurveyStore();
  console.log({ answers, scores, phone });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPhone(userInfo.phone);
    updateScores(); // Compute and store scores before submitting
    setLoading(true);
    try {
      const response = await axios.post(
        "https://survey-backend.up.railway.app/api/bigfive",
        {
          answers,
          scores,
          phone,
        }
      );
      // try {
      //   const response = await axios.post("http://localhost:8080/api/bigfive", {
      //     answers,
      //     scores,
      //     phone,
      //   });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error submitting data: " + error.message);
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }

    navigate("/report");
  };

  const isSectioned =
    typeof questions === "object" && !Array.isArray(questions);
  const formattedQuestions = isSectioned ? questions : { General: questions };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <form className="space-y-8" onSubmit={handleSubmit}>
        {Object.entries(formattedQuestions).map(([section, qs]) => (
          <div key={section} className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              {isSectioned ? `Section: ${section}` : "Questions"}
            </h2>
            <table className="w-full border-collapse border border-gray-300 text-left">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 px-4 py-3">
                    {t("Question")}
                  </th>
                  {options.map((option) => (
                    <th
                      key={option.value}
                      className="border border-gray-300 px-4 py-3 text-center"
                    >
                      {t(option.label)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {qs.map((q, index) => {
                  const questionIndex = index + 1; // Start index from 1
                  return (
                    <tr key={questionIndex} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-3">
                        {t(q)}
                      </td>
                      {options.map((option) => (
                        <td
                          key={option.value}
                          className="border border-gray-300 px-4 py-3 text-center"
                        >
                          <input
                            type="radio"
                            name={`section-${section}-question-${questionIndex}`}
                            value={option.value}
                            checked={
                              answers?.[section]?.[questionIndex] ===
                              option.value
                            }
                            onChange={(e) =>
                              setAnswer(section, questionIndex, e.target.value)
                            }
                            required
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
      {message && <p className="text-center mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default Survey;
