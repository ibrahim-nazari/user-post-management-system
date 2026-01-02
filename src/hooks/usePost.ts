import { postsApi } from "@/api/posts.api";
import { Post } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

// Separate hook for single post only
export const usePost = (
  id: number | undefined,
  options?: {
    with?: string[];
    enabled?: boolean;
    initialData?: Post;
  }
) => {
  return useQuery({
    queryKey: ["post", id, options?.with],
    queryFn: () => postsApi.getPostById(id!, options),
    enabled: !!id && (options?.enabled ?? true),
    staleTime: 5 * 60 * 1000, // 5 minutes
    initialData: options?.initialData
      ? { data: options.initialData }
      : undefined,
  });
};
