import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import PostsTable from "../components/posts/PostsTable";
import Pagination from "../components/Pagination";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const PostsPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = usePosts(page, 10, search);
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
                  posts={data?.posts || []}
                  onPostClick={handlePostClick}
                  onEditClick={handleEditClick}
                />

                <Pagination
                  currentPage={page}
                  totalPages={data?.totalPages || 1}
                  onPageChange={setPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
