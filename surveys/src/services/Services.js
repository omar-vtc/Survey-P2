import { interpretations } from "../data/Questions";
export const interpretScore = (section, score) => {
  if (section === "A" && score <= 17) return interpretations.A[0];
  if (section === "A" && score <= 29) return interpretations.A[1];
  if (section === "A") return interpretations.A[2];
  if (section === "B" && score <= 5) return interpretations.B[0];
  if (section === "B" && score <= 11) return interpretations.B[1];
  if (section === "B") return interpretations.B[2];
  if (section === "C" && score >= 40) return interpretations.C[0];
  if (section === "C" && score >= 34) return interpretations.C[1];
  return interpretations.C[2];
};
