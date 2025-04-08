import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Layout({ children }) {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <LanguageSwitcher />
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
        {t("The Big Five Personality Test")}
      </h2>
      <div className="flex-1">{children}</div>
      <footer className="mt-12 text-center text-sm text-gray-600">
        <p>Dr. Mohamed Saad</p>
      </footer>
    </div>
  );
}
