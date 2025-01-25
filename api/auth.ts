import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/auth";

export const register = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register/`, {
    username,
    email,
    password,
    confirm_password: password,
  });
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login/`, {
    username,
    password,
  });
  return response.data;
};
