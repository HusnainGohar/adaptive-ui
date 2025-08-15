import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const predictPersona = async (userFeatures) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/predict_persona/`,
      userFeatures,
    );
    return response.data.persona;
  } catch (error) {
    console.error("Error predicting persona:", error);
    throw error;
  }
};
