import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Maslach Burnout Inventory (MBI)
      </h1>
      <div className="flex-1">{children}</div>
      <footer className="mt-12 text-center text-sm text-gray-600">
        <p>
          C. Maslach, S.E. Jackson, M.P. Leiter (Eds.), Maslach Burnout
          Inventory manual (3rd ed.), Consulting Psychologists Press (1996)
        </p>
      </footer>
    </div>
  );
}
