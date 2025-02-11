import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

const UserInfoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    birthday: "",
    job: "",
    nationality: "",
    education: "",
    maritalStatus: "",
  });

  const { userInfo, setUserInfo } = useUserStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setFormData(userInfo);
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserInfo(formData);
    onSubmit(formData);
    navigate("/home");
  };

  return (
    <form
      className="space-y-6 bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
        Enter Your Information
      </h2>
      {[
        { label: "Name", name: "name", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Phone Number", name: "phone", type: "tel" },
        { label: "Age", name: "age", type: "number" },
        { label: "Birthday", name: "birthday", type: "date" },
        { label: "Job", name: "job", type: "text" },
        { label: "Nationality", name: "nationality", type: "text" },
      ].map(({ label, name, type }) => (
        <div key={name}>
          <label className="block text-lg font-medium mb-2 text-gray-700">
            {label}
          </label>
          <input
            type={type}
            name={name}
            className="w-full rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={formData[name]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      {[
        {
          label: "Gender",
          name: "gender",
          options: ["Male", "Female", "Other"],
        },
        {
          label: "Education Level",
          name: "education",
          options: ["High School", "Undergraduate", "Graduate", "Postgraduate"],
        },
        {
          label: "Marital Status",
          name: "maritalStatus",
          options: ["Single", "Married"],
        },
      ].map(({ label, name, options }) => (
        <div key={name}>
          <label className="block text-lg font-medium mb-2 text-gray-700">
            {label}
          </label>
          <select
            name={name}
            className="w-full rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={formData[name]}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
        >
          Continue to Survey
        </button>
      </div>
    </form>
  );
};

export default UserInfoForm;
