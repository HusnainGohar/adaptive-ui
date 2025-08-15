import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/`);
    return response.data;
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

export const getProductDetailsById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting product details:", error);
    throw error;
  }
};
