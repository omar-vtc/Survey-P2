import { interpretations } from "../data/Questions";
export const interpretScore = (section, score) => {
  if (section === "A" && score <= 17) return interpretations.A[0];
  if (section === "A" && score <= 29) return interpretations.A[1];
  if (section === "A") return interpretations.A[2];
  if (section === "B" && score <= 5) return interpretations.B[0];
  if (section === "B" && score <= 11) return interpretations.B[1];
  if (section === "B") return interpretations.B[2];
  if (section === "C" && score >= 40) return interpretations.C[2];
  if (section === "C" && score >= 34) return interpretations.C[1];
  return interpretations.C[2];
};

// Function to calculate Big Five scores
export const calculateBigFiveScores = (answers) => {
  const flip = (score) => 6 - score;

  return {
    E:
      20 +
      answers[0] -
      flip(answers[5]) +
      answers[10] -
      flip(answers[15]) +
      answers[20] -
      flip(answers[25]) +
      answers[30] -
      flip(answers[35]) +
      answers[40] -
      flip(answers[45]),
    A:
      14 -
      flip(answers[1]) +
      answers[6] -
      flip(answers[11]) +
      answers[16] -
      flip(answers[21]) +
      answers[26] -
      flip(answers[31]) +
      answers[36] +
      answers[41] +
      answers[46],
    C:
      14 +
      answers[2] -
      flip(answers[7]) +
      answers[12] -
      flip(answers[17]) +
      answers[22] -
      flip(answers[27]) +
      answers[32] -
      flip(answers[37]) +
      answers[42] +
      answers[47],
    N:
      38 -
      flip(answers[3]) +
      answers[8] -
      flip(answers[13]) +
      answers[18] -
      flip(answers[23]) -
      flip(answers[28]) -
      flip(answers[33]) -
      flip(answers[38]) -
      flip(answers[43]) -
      flip(answers[48]),
    O:
      8 +
      answers[4] -
      flip(answers[9]) +
      answers[14] -
      flip(answers[19]) +
      answers[24] -
      flip(answers[29]) +
      answers[34] +
      answers[39] +
      answers[44] +
      answers[49],
  };
};
