import React from "react";
import Layout from "../layout/Layout";
import Survey from "../components/Survey";
import { useUserStore } from "../store/useUserStore";

export default function SurveyForm() {
  return (
    <Layout>
      <Survey />
    </Layout>
  );
}
