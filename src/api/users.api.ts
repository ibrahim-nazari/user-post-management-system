import apiClient from "../lib/apiClient";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  totalPages: number;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: string;
}

export const usersApi = {
  getUsers: async (
    page = 1,
    limit = 10,
    search = "",
    id?: number
  ): Promise<UsersResponse> => {
    const params: any = { page, limit };
    if (search) params.search = search;
    if (id) params.id = id;

    const response = await apiClient.get("/users", { params });
    return response.data;
  },

  getUser: async (id: number): Promise<User> => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  createUser: async (data: CreateUserData): Promise<User> => {
    const response = await apiClient.post("/users", data);
    return response.data;
  },

  updateUser: async (id: number, data: UpdateUserData): Promise<User> => {
    const response = await apiClient.put(`/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};
