import { PaginatedResponse, Post } from "@/types/api";
import apiClient from "../lib/apiClient";

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
export interface GetPostsParams {
  page?: number;
  limit?: number;
  search?: string;
  id?: number;
  category_id?: number;
  author_id?: number;
  status?: string;
  sort_by?: "created_at" | "updated_at" | "published_at" | "title";
  sort_order?: "asc" | "desc";
  start_date?: string;
  end_date?: string;
  tag_id?: number;
  featured?: boolean;
  with?: string[]; // e.g., ['author', 'category', 'tags']
}
export const postsApi = {
  /**
   * Get paginated list of posts with optional filtering
   */
  getPosts: async (
    params: GetPostsParams = {}
  ): Promise<PaginatedResponse<Post>> => {
    const {
      page = 1,
      limit = 5,
      search = "",
      id,
      category_id,
      author_id,
      status,
      sort_by = "created_at",
      sort_order = "desc",
      start_date,
      end_date,
      tag_id,
      featured,
      with: withRelations = [],
    } = params;

    const queryParams: Record<string, any> = {
      page,
      per_page: limit,
    };

    // Add optional filters
    if (search) queryParams.search = search;
    if (id) queryParams.id = id;
    if (category_id) queryParams.category_id = category_id;
    if (author_id) queryParams.author_id = author_id;
    if (status) queryParams.status = status;
    if (sort_by) queryParams.sort_by = sort_by;
    if (sort_order) queryParams.sort_order = sort_order;
    if (start_date) queryParams.start_date = start_date;
    if (end_date) queryParams.end_date = end_date;
    if (tag_id) queryParams.tag_id = tag_id;
    if (featured !== undefined) queryParams.featured = featured;
    if (withRelations.length > 0) queryParams.with = withRelations.join(",");

    // Remove undefined/null values
    Object.keys(queryParams).forEach((key) => {
      if (queryParams[key] === undefined || queryParams[key] === null) {
        delete queryParams[key];
      }
    });

    const response = await apiClient.get("/posts", {
      params: queryParams,
      paramsSerializer: {
        indexes: null, // Better array serialization
      },
    });

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
  /**
   * Get single post by ID (separate endpoint)
   */
  getPostById: async (
    id: number,
    params: { with?: string[] } = {}
  ): Promise<{ data: Post }> => {
    const queryParams: Record<string, any> = {};
    if (params.with?.length) {
      queryParams.with = params.with.join(",");
    }

    const response = await apiClient.get(`/posts/${id}`, {
      params: queryParams,
    });
    return response.data;
  },
};
