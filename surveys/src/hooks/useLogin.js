import { useState } from "react";
import axios from "axios";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { userInfo, setUserInfo } = useUserStore();
  const navigate = useNavigate();

  const login = async (formData) => {
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );
      const token = res.data.token;
      setMessage(res.data.message);
      setUserInfo({ ...res.data.user, token: token }); // Save user info

      const profile = await axios.get(
        "http://localhost:8080/api/auth/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { _id, createdAt, updatedAt, __v, ...userData } = profile.data;
      setUserInfo(userData);
      navigate("/personality");
    } catch (error) {
      setMessage(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, message };
};

export default useLogin;
