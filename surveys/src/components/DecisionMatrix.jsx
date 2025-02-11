import React, { useState } from "react";

const DecisionMatrix = () => {
  const [decision1, setDecision1] = useState("");
  const [decision2, setDecision2] = useState("");
  const [matrix, setMatrix] = useState(Array(5).fill(Array(8).fill("")));
  const [totals, setTotals] = useState({ decision1: 0, decision2: 0 });
  const [decision, setDecision] = useState("");
  const [formula, setFormula] = useState([]);

  const handleChange = (rowIndex, colIndex, value) => {
    const newMatrix = matrix.map((row, rIdx) =>
      rIdx === rowIndex
        ? row.map((cell, cIdx) => (cIdx === colIndex ? value : cell))
        : row
    );
    setMatrix(newMatrix);
  };

  const calculateTotals = () => {
    let sumDecision1 = 0;
    let sumDecision2 = 0;
    let criterion1 = 0;
    let criterion2 = 0;
    let criterion3 = 0;
    let criterion4 = 0;

    matrix.forEach((row) => {
      const adv1 = parseFloat(row[1]) || 0;
      const dis1 = parseFloat(row[3]) || 0;
      const adv2 = parseFloat(row[5]) || 0;
      const dis2 = parseFloat(row[7]) || 0;

      sumDecision1 += adv1 - dis1;
      sumDecision2 += adv2 - dis2;

      criterion1 += adv1 - dis1;
      criterion2 += adv2 - dis2;
      criterion3 += adv1 - adv2;
      criterion4 += dis2 - dis1;
    });

    setTotals({ decision1: sumDecision1, decision2: sumDecision2 });

    setFormula([
      `Criterion 1: ${criterion1} → (Sum of Advantages - Disadvantages for Decision 1)`,
      `Criterion 2: ${criterion2} → (Sum of Advantages - Disadvantages for Decision 2)`,
      `Criterion 3: ${criterion3} → (Sum of Advantages of Decision 1 - Advantages of Decision 2)`,
      `Criterion 4: ${criterion4} → (Sum of Disadvantages of Decision 2 - Disadvantages of Decision 1)`,
    ]);

    let agreeCount = 0;
    if (criterion1 > 0) agreeCount++;
    if (criterion2 > 0) agreeCount++;
    if (criterion3 > 0) agreeCount++;
    if (criterion4 > 0) agreeCount++;

    if (agreeCount >= 3) {
      setDecision("Decision 1 is preferable");
    } else if (agreeCount <= 1) {
      setDecision("Decision 2 is preferable");
    } else {
      setDecision("Both decisions have close values, reconsider inputs");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateTotals();
  };

  return (
    <div className="w-[90%] mx-auto">
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="font-semibold mb-4 text-blue-500 text-2xl text-center">
            Decision Matrix
          </h2>
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-blue-100 text-gray-800 text-center">
                <th colSpan="4" className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    value={decision1}
                    onChange={(e) => setDecision1(e.target.value)}
                    placeholder="Decision 1"
                    className="w-full bg-gray-100 text-gray-900 p-1 text-center border border-gray-300 rounded"
                  />
                </th>
                <th colSpan="4" className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    value={decision2}
                    onChange={(e) => setDecision2(e.target.value)}
                    placeholder="Decision 2"
                    className="w-full bg-gray-100 text-gray-900 p-1 text-center border border-gray-300 rounded"
                  />
                </th>
              </tr>
              <tr className="bg-blue-200 text-gray-800 text-center">
                <th className="border border-gray-300 px-4 py-2">Advantages</th>
                <th className="border border-gray-300 px-4 py-2">
                  Degree (1-4)
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Disadvantages
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Degree (1-4)
                </th>
                <th className="border border-gray-300 px-4 py-2">Advantages</th>
                <th className="border border-gray-300 px-4 py-2">
                  Degree (1-4)
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Disadvantages
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Degree (1-4)
                </th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {colIndex % 2 === 1 ? (
                        <select
                          value={cell}
                          onChange={(e) =>
                            handleChange(rowIndex, colIndex, e.target.value)
                          }
                          className="w-full bg-gray-100 text-gray-900 p-1 text-center border border-gray-300 rounded"
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) =>
                            handleChange(rowIndex, colIndex, e.target.value)
                          }
                          className="w-full bg-gray-100 text-gray-900 p-1 text-center border border-gray-300 rounded"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white px-8 py-4 rounded text-xl"
            type="submit"
          >
            Calculate
          </button>
        </div>
      </form>
      {decision && (
        <div className="text-center text-xl font-bold mt-4 bg-blue-100 p-3 border border-gray-300 rounded">
          {decision}
          <div className="mt-3 space-y-2 text-gray-700">
            {formula.map((line, index) => (
              <p key={index} className="text-lg">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DecisionMatrix;
