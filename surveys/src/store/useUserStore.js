import { create } from "zustand";
import { persist } from "zustand/middleware";

// Zustand store for user info
export const useUserStore = create(
  persist(
    (set) => ({
      userInfo: {
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
        token: null,
      },
      setUserInfo: (data) =>
        set((state) => ({ userInfo: { ...state.userInfo, ...data } })), // Merges new data
      setToken: (token) =>
        set((state) => ({ userInfo: { ...state.userInfo, token } })),
    }),
    {
      name: "user-info-storage",
    }
  )
);
