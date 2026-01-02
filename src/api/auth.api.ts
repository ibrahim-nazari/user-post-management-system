import apiClient from "../lib/apiClient";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post("/login", credentials);
    return response.data;
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await apiClient.post("/register", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/logout");
  },

  getProfile: async (): Promise<AuthResponse["user"]> => {
    const response = await apiClient.get("/me");
    return response.data;
  },
};
