import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import useAuthStore from "../contexts/store/authStore";
import useLikedStore from "../contexts/store/userLikedStore";

export default function RemedyCard({ remedy }) {
  const { user } = useAuthStore();
  const { isRemedyLiked, likeRemedy, unlikeRemedy } = useLikedStore();

  const liked = useLikedStore((state) => state.isRemedyLiked(remedy._id));

  const handleLike = async () => {
    if (!user) return alert("Please log in to like remedies.");
    liked ? unlikeRemedy(remedy._id) : likeRemedy(remedy);
  };

  return (
    <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden p-4 relative mx-auto hover:shadow-xl transition-shadow duration-300 min-h-[280px] flex flex-col justify-between">
      {/* Like Button */}
      <button
        onClick={handleLike}
        className="absolute top-4 right-4 text-xl text-[#2AA831] hover:scale-110 transition-transform duration-200"
        aria-label={liked ? "Unlike remedy" : "Like remedy"}
      >
        {liked ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* Content Section */}
      <div>
        <h2 className="text-lg font-semibold text-[#143117] mb-2 pr-8">
          {remedy.title}
        </h2>

        {/* Products */}
        {remedy.products && remedy.products.length > 0 && (
          <div className="mb-2">
            <h3 className="font-medium text-sm text-[#5DA134]">Products:</h3>
            <ul className="list-disc list-inside text-xs text-gray-700">
              {remedy.products.map((product, index) => (
                <li key={index}>
                  {product.name}: {product.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits */}
        {remedy.benefits && (
          <div className="mb-2">
            <h3 className="font-medium text-sm text-[#5DA134]">Benefits:</h3>
            <p className="text-xs text-gray-700">{remedy.benefits}</p>
          </div>
        )}

        {/* Directions */}
        {remedy.directions && (
          <div className="mb-2">
            <h3 className="font-medium text-sm text-[#5DA134]">Directions:</h3>
            <p className="text-xs text-gray-700">{remedy.directions}</p>
          </div>
        )}

        {/* Skip Item */}
        {remedy.skipItem && (
          <div className="mb-2">
            <h3 className="font-medium text-sm text-[#5DA134]">Skip Item:</h3>
            <p className="text-xs text-gray-700">{remedy.skipItem}</p>
          </div>
        )}

        {/* Notes */}
        {remedy.notes && (
          <div className="mb-2">
            <h3 className="font-medium text-sm text-[#5DA134]">Notes:</h3>
            <p className="text-xs text-gray-700">{remedy.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
