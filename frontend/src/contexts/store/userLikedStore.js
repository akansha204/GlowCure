import { create } from "zustand";
import {
  likeRemedy,
  unlikeRemedy,
  getLikedRemedies,
} from "../../apis/RemedyApis";

const useLikedStore = create((set, get) => ({
  likedRemedies: [],
  isLoading: false,
  error: null,

  // Fetch from backend
  fetchLikedRemedies: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getLikedRemedies();
      const remedies = data.likedRemedies.map((item) => item.remedyId);
      set({ likedRemedies: remedies, isLoading: false });
    } catch (error) {
      console.error("Error fetching liked remedies", error);
      set({
        error: error.message || "Failed to fetch liked remedies",
        isLoading: false,
      });
    }
  },

  // Like remedy and update local state
  likeRemedy: async (remedy) => {
    try {
      await likeRemedy(remedy._id);
      const current = get().likedRemedies;
      const alreadyLiked = current.find((r) => r._id === remedy._id);
      if (!alreadyLiked) {
        set({ likedRemedies: [...current, remedy] });
      }
    } catch (error) {
      console.error("Error liking remedy:", error);
    }
  },

  // Unlike remedy and update local state
  unlikeRemedy: async (remedyId) => {
    try {
      await unlikeRemedy(remedyId);
      const filtered = get().likedRemedies.filter((r) => r._id !== remedyId);
      set({ likedRemedies: filtered });
    } catch (error) {
      console.error("Error unliking remedy:", error);
    }
  },

  // Utility to check if remedy is liked
  isRemedyLiked: (remedyId) => {
    return !!get().likedRemedies.find((r) => r._id === remedyId);
  },
}));

export default useLikedStore;
