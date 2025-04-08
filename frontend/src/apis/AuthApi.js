import api from "./api";

export async function signupUser(userData) {
  console.log("📤 Sending data to API:", userData); // Debug log

  try {
    const response = await api.post("/user/signup", userData, {
      withCredentials: true,
    });

    console.log("✅ Signup Successful:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Signup Error:", error.response?.data || error.message);

    if (error.response?.status === 400 && error.response?.data?.errors) {
      console.log("🛑 Zod Validation Errors:", error.response.data.errors); // Debug log
      return { success: false, errors: error.response.data.errors };
    }

    return {
      success: false,
      message:
        error.response?.data?.message || "Signup failed. Please try again.",
    };
  }
}

// Login API

export const loginUser = async (email, password) => {
  try {
    const response = await api.post(
      `/user/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    console.log("✅ Login Successful:", response.data);
    return { success: true, message: "Login successful" };
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Something went wrong. Please try again.",
    };
  }
};

// Check if user is logged in
export const checkAuthStatus = async () => {
  try {
    const response = await api.get("/user/auth-status", {
      withCredentials: true, // Ensures cookies/sessions are sent
    });

    console.log("✅ Auth Check Success:", response.data);
    return { user: response.data.user, isAuthenticated: true };
  } catch (error) {
    console.error(
      "❌ Auth Check Error:",
      error.response?.data?.message || error.message
    );

    return {
      user: null,
      isAuthenticated: false,
      error: "Not logged in or session expired",
    };
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/user/logout");
    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    console.error("Logout Error:", error);
    return { success: false, message: "Logout failed" };
  }
};

export const getGoogleUser = async () => {
  try {
    const response = await api.get("/user/auth-status"); // This now handles both Google & JWT users
    return { success: true, user: response.data.user };
  } catch (error) {
    console.error("Google Auth Error:", error);
    return {
      success: false,
      user: null,
      error: error.response?.data?.message || "Failed to fetch user",
    };
  }
};

export const sendPasswordResetEmail = async (email) => {
  try {
    const response = await api.post("/user/forget-password", { email });
    console.log("✅ Password Reset Email Sent:", response.data);
    return { success: true, message: "Password reset email sent" };
  } catch (error) {
    console.error(
      "❌ Password Reset Error:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to send password reset email",
    };
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post("/user/reset-password", {
      token,
      newPassword,
    });
    console.log("✅ Password Reset Successful:", response.data);
    return { success: true, message: "Password reset successful" };
  } catch (error) {
    console.error(
      "❌ Password Reset Error:",
      error.response?.data || error.message
    );
    return {
      success: false,
      message: error.response?.data?.message || "Failed to reset password",
    };
  }
};
