import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const login = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/token`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        transformRequest: (data) => {
          return Object.keys(data)
            .map(
              (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`,
            )
            .join("&");
        },
      },
    );

    // Store token in localStorage
    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const registerUser = async (full_name, email, username, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      {
        full_name,
        username,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        transformRequest: (data) => {
          return Object.keys(data)
            .map(
              (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`,
            )
            .join("&");
        },
      },
    );

    // Store token in localStorage
    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};