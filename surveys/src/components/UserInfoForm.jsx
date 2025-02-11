import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

const UserInfoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // Added phone field
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
    setFormData(userInfo); // Load from Zustand on mount
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserInfo(formData); // Store in Zustand and localStorage
    onSubmit(formData);
    navigate("/survey");
  };

  return (
    <form
      className="space-y-6 bg-white p-6 rounded shadow w-[85%] mx-auto"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-lg font-medium mb-2">Name</label>
        <input
          type="text"
          name="name"
          className="w-full rounded p-3 border"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-lg font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          className="w-full rounded p-3 border"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-lg font-medium mb-2">Phone Number</label>
        <input
          type="tel"
          name="phone"
          className="w-full rounded p-3 border"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-lg font-medium mb-2">Age</label>
        <input
          type="number"
          name="age"
          className="w-full rounded p-3 border"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-lg font-medium mb-2">Gender</label>
        <select
          name="gender"
          className="w-full rounded p-3 border"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-lg font-medium mb-2">Birthday</label>
        <input
          type="date"
          name="birthday"
          className="w-full rounded p-3 border"
          value={formData.birthday}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-lg font-medium mb-2">Job</label>
        <input
          type="text"
          name="job"
          className="w-full rounded p-3 border"
          value={formData.job}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-lg font-medium mb-2">Nationality</label>
        <input
          type="text"
          name="nationality"
          className="w-full rounded p-3 border"
          value={formData.nationality}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-lg font-medium mb-2">
          Education Level
        </label>
        <select
          name="education"
          className="w-full rounded p-3 border"
          value={formData.education}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="High School">High School</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Graduate">Graduate</option>
          <option value="Postgraduate">Postgraduate</option>
        </select>
      </div>
      <div>
        <label className="block text-lg font-medium mb-2">Marital Status</label>
        <select
          name="maritalStatus"
          className="w-full rounded p-3 border"
          value={formData.maritalStatus}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
        </select>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-8 py-4 rounded text-xl"
        >
          Continue to Survey
        </button>
      </div>
    </form>
  );
};

export default UserInfoForm;
