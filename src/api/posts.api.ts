import apiClient from "../lib/apiClient";

export interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  totalPages: number;
}

export interface CreatePostData {
  title: string;
  content: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
}

export const postsApi = {
  getPosts: async (
    page = 1,
    limit = 10,
    search = "",
    id?: number
  ): Promise<PostsResponse> => {
    const params: any = { page, limit };
    if (search) params.search = search;
    if (id) params.id = id;

    const response = await apiClient.get("/posts", { params });
    return response.data;
  },

  getPost: async (id: number): Promise<Post> => {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  },

  createPost: async (data: CreatePostData): Promise<Post> => {
    const response = await apiClient.post("/posts", data);
    return response.data;
  },

  updatePost: async (id: number, data: UpdatePostData): Promise<Post> => {
    const response = await apiClient.put(`/posts/${id}`, data);
    return response.data;
  },

  deletePost: async (id: number): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
  },
};
