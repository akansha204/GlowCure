import { useState } from "react";
import useAuthStore from "../contexts/store/authStore";
import useLikedStore from "../contexts/store/userLikedStore";

import RemedyCard from "../components/RemedyCard";
import { Navigate } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Liked() {
  const { user, loading } = useAuthStore();

  const {
    likedRemedies,
    loading: isLoading,
    error,
    fetchLikedRemedies,
  } = useLikedStore();

  if (loading || isLoading) {
    return (
      <div className="bg-[#CFE6D0] min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const welcomeMessages = [
    `Welcome back, ${user.firstName}! 🌿`,
    `Glad to see you again, ${user.firstName}! 😊`,
    `Your favorite remedies await, ${user.firstName}! ✨`,
    `Hello ${user.firstName}, let's explore some skincare secrets! 🌟`,
  ];

  const randomMessage =
    welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  return (
    <div className="bg-[#CFE6D0] min-h-screen p-6">
      <h2 className="text-2xl font-semibold text-green-700 text-center mb-6">
        {randomMessage}
      </h2>

      {error && (
        <p className="text-red-600 text-center mb-4 bg-red-100 p-3 rounded-lg">
          {error}
        </p>
      )}

      <div className="max-w-6xl mx-auto">
        {likedRemedies.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">
              You haven't liked any remedies yet. Explore our collection and
              save your favorites! 💚
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedRemedies.map((remedy) => (
              <RemedyCard key={remedy._id} remedy={remedy} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
