import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import PostForm from "../components/posts/PostForm";
import Button from "../components/ui/Button";

const EditPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: posts,
    isLoading,
    error,
    updatePost,
  } = usePosts(1, 1, "", parseInt(id || "0"));
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (error) {
      navigate("/posts");
    }
  }, [error, navigate]);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      await updatePost(parseInt(id || "0"), formData);
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error("Failed to update post:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!posts || posts.posts.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Button onClick={() => navigate(`/posts/${id}`)} variant="outline">
            Back to Post
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Post</h2>
          <PostForm
            initialData={posts.posts[0]}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
