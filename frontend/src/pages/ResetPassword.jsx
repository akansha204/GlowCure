import React, { useState, useEffect } from "react";
import { resetPassword } from "../apis/AuthApi";
import { useParams, useNavigate } from "react-router";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setError({ general: "Invalid or missing token." });
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setSuccessMessage("");

    if (!newPassword || !confirmPassword) {
      setError({ general: "Both fields are required." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setError({ general: "Passwords do not match." });
      return;
    }

    const response = await resetPassword(token, newPassword);
    if (response.success) {
      setSuccessMessage(response.message);
      setTimeout(() => {
        navigate("/login"); // Redirect to login after success
      }, 2000);
    } else {
      setError({ general: response.message });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#CFE6D0] overflow-y-hidden">
        <div className="bg-[#E1F1E7] shadow-2xl rounded-xl p-8 w-[90%] max-w-md text-center">
          <h2 className="text-xl font-bold mb-6">Reset Password</h2>
          <p className="text-gray-600 text-sm mb-6">
            Password must be at least 8 characters long and include at least one
            uppercase letter, one lowercase letter, one number, and one special
            character (@$!%*?&).
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2AA831] mb-3"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2AA831] mb-3"
              required
            />

            {error.general && (
              <p className="text-red-500 text-sm mb-3">{error.general}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm mb-3">{successMessage}</p>
            )}

            <button className="w-full bg-[#2AA831] hover:bg-[#5DA134] text-white font-semibold py-2 px-4 rounded-lg transition-all cursor-pointer">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
