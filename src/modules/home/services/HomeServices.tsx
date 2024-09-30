import axios, { AxiosError } from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

interface EntityData {
  id?: number;
  name: string;
  description: string;
  address: string;
  email: string;
  phone?: string;
}

interface EmployeeData {
  id: number;
  firstName: string;
  lastName: string;
  position?: string;
  email: string;
  phone?: string;
}

export interface EntityResponse {
  id: number;
  name: string;
  description: string;
  address: string;
  email: string;
  phone?: string;
  employees?: EmployeeData[];
}

interface ApiError {
  message: string;
}

const getAuthToken = () => {
  const authState = localStorage.getItem("authState");
  if (authState) {
    const parsedState = JSON.parse(authState);
    return parsedState?.token;
  }
  return null;
};

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

export const createEntity = async (
  entityData: EntityData
): Promise<EntityResponse> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/entity/create`,
      entityData,
      authHeaders()
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<ApiError>;
      throw new Error(err.response?.data.message || "Error creating entity.");
    } else {
      throw new Error("Unknown error.");
    }
  }
};

export const editEntity = async (
  id: number,
  entityData: EntityData
): Promise<EntityResponse> => {
  try {
    const response = await axios.put(
      `${BASE_URL}/entity/${id}`,
      entityData,
      authHeaders()
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<ApiError>;
      throw new Error(err.response?.data.message || "Error editing entity.");
    } else {
      throw new Error("Unknown error.");
    }
  }
};

export const deleteEntity = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/entity/delete/${id}`, authHeaders());
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<ApiError>;
      throw new Error(err.response?.data.message || "Error deleting entity.");
    } else {
      throw new Error("Unknown error.");
    }
  }
};

export const getEntityById = async (id: number): Promise<EntityResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/entity/${id}`, authHeaders());
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<ApiError>;
      throw new Error(err.response?.data.message || "Error fetching entity.");
    } else {
      throw new Error("Unknown error.");
    }
  }
};

export const getAllEntities = async (): Promise<EntityResponse[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/entity/all`, authHeaders());
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<ApiError>;
      throw new Error(err.response?.data.message || "Error fetching entities.");
    } else {
      throw new Error("Unknown error.");
    }
  }
};
