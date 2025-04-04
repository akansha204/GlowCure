import api from "./api";

export const getRemedies = async (searchQuery) => {
  try {
    const response = await api.get(`/get-remedies?search=${searchQuery}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching remedies:", error);
    throw error;
  }
};

export const likeRemedy = async (remedyId) => {
  try {
    const response = await api.post(`/remedy/${remedyId}/like`, null, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};

export const getLikedRemedies = async () => {
  try {
    const response = await api.get("/user/liked-remedies", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching liked remedies:", error);
    throw error;
  }
};
