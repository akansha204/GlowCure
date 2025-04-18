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
    const response = await api.post(`/user/like/${remedyId}`);
    return response.data;
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};

export const unlikeRemedy = async (remedyId) => {
  try {
    const response = await api.delete(`/user/unlike/${remedyId}`, null);
    return response.data;
  } catch (error) {
    console.error("Error unliking remedy:", error);
    throw error;
  }
};

export const getLikedRemedies = async () => {
  try {
    const response = await api.get(`/user/liked-remedies?page=1&limit=10`);
    return response.data;
  } catch (error) {
    console.error("Error fetching liked remedies:", error);
    throw error;
  }
};

export async function suggestedRemedy(remedyData) {
  // console.log("Sending data to API:", remedyData); // Debug log

  try {
    const response = await api.post("/user/suggestion", remedyData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    return {
      success: false,
      message:
        error.response?.data?.message || "Request failed. Please try again.",
    };
  }
}
