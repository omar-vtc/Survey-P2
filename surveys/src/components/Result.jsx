import React from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { useSurveyStore } from "../store/useSurveyStore";
import { useUserStore } from "../store/useUserStore";
import { questions } from "../data/Questions";
import { options } from "../data/Questions"; // Ensure options are imported
import { interpretations } from "../data/Questions";
import { interpretScore } from "../services/Services";

const Result = () => {
  const { answers, scores } = useSurveyStore();
  const user = useUserStore((state) => state);
  const userInfo = user.userInfo;

  const generateWordFile = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Maslach Burnout Inventory (MBI) Results",
                  bold: true,
                  size: 32, // Increased font size
                }),
              ],
              spacing: { after: 300 }, // Increased spacing
            }),
            new Paragraph({ text: "" }),

            // User Info Section
            new Paragraph({
              children: [
                new TextRun({
                  text: "User Information:",
                  bold: true,
                  size: 28,
                }),
              ],
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `Name: ${userInfo.name}`, size: 24 }),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `Email: ${userInfo.email}`, size: 24 }),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `Age: ${userInfo.age}`, size: 24 }),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `Gender: ${userInfo.gender}`, size: 24 }),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Birthday: ${userInfo.birthday}`,
                  size: 24,
                }),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `Job: ${userInfo.job}`, size: 24 }),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Nationality: ${userInfo.nationality}`,
                  size: 24,
                }),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Education: ${userInfo.education}`,
                  size: 24,
                }),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Marital Status: ${userInfo.maritalStatus}`,
                  size: 24,
                }),
              ],
              spacing: { after: 300 },
            }),

            // Results Section
            new Paragraph({
              children: [
                new TextRun({ text: "Results:", bold: true, size: 28 }),
              ],
              spacing: { after: 200 },
            }),
            ...Object.entries(scores).map(
              ([section, score]) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `Section ${section}: ${score} (${interpretScore(
                        section,
                        score
                      )})`,
                      size: 22, // Increased font size
                    }),
                  ],
                  spacing: { after: 200 },
                })
            ),

            new Paragraph({ text: "" }),

            // Survey Questions and Answers
            new Paragraph({
              children: [
                new TextRun({
                  text: "Survey Questions and Answers:",
                  bold: true,
                  size: 28,
                }),
              ],
              spacing: { after: 200 },
            }),
            ...Object.entries(questions).flatMap(([section, qs]) =>
              qs.map((q, index) => {
                const answerValue = answers[section][index];
                const answerLabel =
                  options.find((option) => option.value === answerValue)
                    ?.label || "Not answered";

                return new Paragraph({
                  children: [
                    new TextRun({
                      text: `Section ${section}, Question ${index + 1}: ${q}`,
                      size: 22, // Increased font size
                    }),
                    new TextRun({
                      text: `\nAnswer: ${answerLabel}`,
                      italics: true,
                      size: 22, // Increased font size
                    }),
                  ],
                  spacing: { after: 200 }, // Increased spacing
                });
              })
            ),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "MBI_Results.docx");
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="font-bold text-lg mb-4">Results</h2>
      {Object.entries(scores).map(([section, score]) => (
        <p key={section}>
          Section {section}: {score} ({interpretScore(section, score)})
        </p>
      ))}
      <div className="flex space-x-4">
        <button
          className="mt-4 bg-blue-500 text-white px-8 py-4 rounded text-lg"
          onClick={generateWordFile}
        >
          Generate Word Report
        </button>
        {/* <button
          className="mt-4 bg-gray-500 text-white px-8 py-4 rounded text-lg"
          onClick={resetSurvey}
        >
          Restart Survey
        </button> */}
      </div>
    </div>
  );
};

export default Result;
