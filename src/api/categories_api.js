import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories/`);
    return response.data;
  } catch (error) {
    console.error("Error getting Categories:", error);
    throw error;
  }
};

export const getCategoryDetailsById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting category details:", error);
    throw error;
  }
};
