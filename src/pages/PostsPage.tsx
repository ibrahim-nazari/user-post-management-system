import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import PostsTable from "../components/posts/PostsTable";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Pagination } from "@/components/Pagination";

const PostsPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 5;
  const {
    posts,
    isLoading,
    hasNextPage,
    hasPreviousPage,
    currentPage,
    totalPages,
    totalItems,
    pagination,
    error,
  } = usePosts(page, limit, search);
  const navigate = useNavigate();

  const handlePostClick = (id: number) => {
    navigate(`/posts/${id}`);
  };

  const handleEditClick = (id: number) => {
    navigate(`/posts/${id}/edit`);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="text-red-600">Error loading posts</div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
          <div className="space-x-4">
            <Button onClick={() => navigate("/users")} variant="outline">
              Go to Users
            </Button>
            <Button onClick={() => navigate("/posts/create")}>
              Create Post
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <Input
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
              />
            </div>

            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <>
                <PostsTable
                  posts={posts || []}
                  onPostClick={handlePostClick}
                  onEditClick={handleEditClick}
                />

                {/* Pagination */}
                <div className="border-t border-gray-200 dark:border-gray-800 px-6 py-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    pageSize={limit}
                    onPageChange={setPage}
                    className="mt-4"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
