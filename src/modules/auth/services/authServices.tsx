import axios, { AxiosError } from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

interface LoginResponse {
  token: string;
  role: string;
  userName: string;
  email: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ApiError {
  message: string;
}

export const loginUser = async (
  loginData: LoginData
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, loginData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<ApiError>;
      throw new Error(
        err.response?.data.message ||
          "Failed to login. Please check your credentials."
      );
    } else {
      throw new Error("An unknown error occurred during login.");
    }
  }
};
