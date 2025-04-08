import React, { useState } from "react";
import { sendPasswordResetEmail } from "../apis/AuthApi"; // Adjust path if needed

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setError({});
    setSuccessMessage("");

    if (!email) {
      setError({ general: "Email is required" });
      return;
    }

    const response = await sendPasswordResetEmail(email);
    if (response.success) {
      setSuccessMessage(response.message);
      setEmail(""); // Clear the input after success
    } else {
      setError({ general: response.message });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#CFE6D0] overflow-y-hidden">
        <div className="bg-[#E1F1E7] shadow-2xl rounded-xl p-8 w-[90%] max-w-md text-center">
          <p className="text-gray-600 text-sm mb-6">
            Enter your email to reset password
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2AA831] mb-3"
              required
            />

            {error.general && (
              <p className="text-red-500 text-sm mb-3">{error.general}</p>
            )}
            {successMessage && (
              <p className="text-green-600 text-sm mb-3">{successMessage}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#2AA831] hover:bg-[#5DA134] text-white font-semibold py-2 px-4 rounded-lg transition-all mb-3 cursor-pointer"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
