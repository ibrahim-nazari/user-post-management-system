import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import PostForm from "../components/posts/PostForm";
import Button from "../components/ui/Button";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { createPost } = usePosts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      await createPost(formData);
      navigate("/posts");
    } catch (err) {
      console.error("Failed to create post:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Button onClick={() => navigate("/posts")} variant="outline">
            Back to Posts
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Create New Post
          </h2>
          <PostForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
