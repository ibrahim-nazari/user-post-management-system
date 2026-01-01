import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi, CreatePostData, UpdatePostData } from "../api/posts.api";

export const usePosts = (page = 1, limit = 10, search = "", id?: number) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", page, limit, search, id],
    queryFn: () => postsApi.getPosts(page, limit, search, id),
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

  return {
    data,
    isLoading,
    error,
    createPost: createPostMutation.mutateAsync,
    updatePost: updatePostMutation.mutateAsync,
    deletePost: deletePostMutation.mutateAsync,
  };
};
