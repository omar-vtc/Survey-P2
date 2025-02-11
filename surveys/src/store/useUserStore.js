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
        age: "",
        gender: "",
        birthday: "",
        job: "",
        nationality: "",
        education: "",
        maritalStatus: "",
      },
      setUserInfo: (data) => set({ userInfo: data }),
    }),
    {
      name: "user-info-storage", // Key for localStorage
    }
  )
);
