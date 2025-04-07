import React from "react";

export default function LoadingSpinner({
  size = 12,
  color = "green-500",
  message = "Loading...",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div
        className={`w-${size} h-${size} border-4 border-${color} border-t-transparent rounded-full animate-spin`}
      ></div>
      <p className="mt-4 text-gray-700 text-lg">{message}</p>
    </div>
  );
}
