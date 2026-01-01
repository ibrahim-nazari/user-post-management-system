import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import UserForm from "../components/users/UserForm";
import Button from "../components/ui/Button";

const EditUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    error,
    updateUser,
  } = useUsers(1, 1, "", parseInt(id || "0"));
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (error) {
      navigate("/users");
    }
  }, [error, navigate]);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      await updateUser(parseInt(id || "0"), formData);
      navigate(`/users/${id}`);
    } catch (err) {
      console.error("Failed to update user:", err);
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Button onClick={() => navigate(`/users/${id}`)} variant="outline">
            Back to User
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit User</h2>
          <UserForm
            initialData={user.users[0]}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
