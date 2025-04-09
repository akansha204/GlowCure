import { create } from "zustand";
import {
  loginUser,
  signupUser,
  checkAuthStatus,
  logoutUser,
} from "../../apis/AuthApi";

const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  googleLogin: () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  },

  checkAuth: async () => {
    try {
      const authData = await checkAuthStatus();
      // console.log("checkAuthStatus Response:", authData);

      if (authData?.isAuthenticated && authData?.user) {
        set((state) => {
          if (JSON.stringify(state.user) !== JSON.stringify(authData.user)) {
            return {
              user: authData.user,
              loading: false,
              isAuthenticated: true,
            };
          }
          return state;
        });
      } else {
        set({
          user: null,
          loading: false,
          isAuthenticated: false,
          error: authData?.error || "Unknown error",
        });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      set({
        user: null,
        loading: false,
        isAuthenticated: false,
        error: "Auth check failed",
      });
    }
  },

  signup: async (firstName, lastName, email, password) => {
    try {
      if (!firstName || !lastName || !email || !password) {
        throw new Error("Missing signup credentials");
      }

      const response = await signupUser({
        firstName,
        lastName,
        email,
        password,
      });
      // console.log("Signup API Response:", response);

      if (!response.success) {
        // console.log("Validation Errors Received:", response.errors);
        return response;
      }

      if (response.user) {
        set((state) => ({
          user: response.user,
        }));
      }

      return response;
    } catch (error) {
      // console.error("Signup Error:", error.message);
      return { message: "Signup failed" };
    }
  },

  login: async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error("Missing login credentials");
      }

      const response = await loginUser(email, password);
      // console.log("Login API Response:", response);

      if (!response.success) {
        // console.log("Validation Errors Received:", response.errors);
        return response;
      }

      set((state) => ({
        isAuthenticated: true,
        user: response.user || {},
      }));

      return response;
    } catch (error) {
      console.error("Login Error:", error.message);
      return { success: false, message: "Login failed" };
    }
  },

  logout: async () => {
    await logoutUser();
    set({ user: null });
  },
}));

export default useAuthStore;
