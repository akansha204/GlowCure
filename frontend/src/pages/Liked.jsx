import { useEffect, useState } from "react";
import useAuthStore from "../contexts/store/authStore";
import RemedyCard from "../components/RemedyCard";
import { Navigate } from "react-router";
import { getLikedRemedies } from "../apis/RemedyApis";

export default function Liked() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const [remedies, setRemedies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikedRemedies = async () => {
      if (!user) return;
      try {
        setIsLoading(true);
        const data = await getLikedRemedies();
        setRemedies(data.remedies || []);
      } catch (err) {
        setError("Failed to fetch liked remedies. Please try again later.");
        console.error("Error fetching liked remedies:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedRemedies();
  }, [user]);

  if (loading || isLoading) {
    return (
      <div className="bg-[#CFE6D0] min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading...</p>
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
        {remedies.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">
              You haven't liked any remedies yet. Explore our collection and
              save your favorites! 💚
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remedies.map((remedy) => (
              <RemedyCard key={remedy._id} remedy={remedy} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
