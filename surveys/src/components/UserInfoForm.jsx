import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserInfoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    age: "",
    gender: "",
    birthday: "",
    job: "",
    nationality: "",
    education: "",
    maritalStatus: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { userInfo, setUserInfo } = useUserStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setFormData(userInfo);
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("form data --> ", formData);
    try {
      const { token, ...filteredFormData } = formData; // Exclude token
      const res = await axios.post(
        "http://localhost:8080/api/auth/register",
        filteredFormData
      );

      setMessage(res.data.message);
      setUserInfo(formData);
      onSubmit(formData);
    } catch (error) {
      setMessage("Error submitting data: " + error.message);
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
    navigate("/");
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
        { label: "Password", name: "password", type: "password" },
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
          options: ["Single", "Married", "Divorced", "Widowed"],
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
