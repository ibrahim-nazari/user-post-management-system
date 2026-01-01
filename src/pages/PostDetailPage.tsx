import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import Button from "../components/ui/Button";

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: posts,
    isLoading,
    error,
  } = usePosts(1, 1, "", parseInt(id || "0"));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error || !posts || posts.posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="text-red-600">Post not found</div>
      </div>
    );
  }

  const post = posts.posts[0];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button onClick={() => navigate("/posts")} variant="outline">
            Back to Posts
          </Button>
          <Button onClick={() => navigate(`/posts/${id}/edit`)}>
            Edit Post
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-8">
              <span>By {post.author.name}</span>
              <span className="mx-2">•</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
