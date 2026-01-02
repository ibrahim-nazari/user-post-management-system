import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postsApi,
  CreatePostData,
  UpdatePostData,
  Post,
} from "../api/posts.api";
import { PaginatedResponse } from "@/types/api";

export const usePosts = (page = 1, limit = 5, search = "", id?: number) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<PaginatedResponse<Post>>({
    queryKey: ["posts", page, limit, search, id],
    queryFn: () => postsApi.getPosts({ page, limit, search, id }),
  });

  const createPostMutation = useMutation({
    mutationFn: (data: CreatePostData) => postsApi.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePostData }) =>
      postsApi.updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (id: number) => postsApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // Extract posts from the response data
  const posts = data?.data || [];

  // Extract pagination metadata
  const pagination = data?.meta || {};

  // Extract pagination links
  const links = data?.links || {};

  return {
    isLoading,
    error,
    createPost: createPostMutation.mutateAsync,
    updatePost: updatePostMutation.mutateAsync,
    deletePost: deletePostMutation.mutateAsync,
    posts, // The actual posts array
    pagination, // Pagination metadata (current_page, total, etc.)
    links, // Navigation links (first, last, prev, next)
    // Helper methods for pagination
    hasNextPage: !!data?.links?.next,
    hasPreviousPage: !!data?.links?.prev,
    currentPage: data?.meta?.current_page || 1,
    totalPages: data?.meta?.last_page || 1,
    totalItems: data?.meta?.total || 0,
  };
};
