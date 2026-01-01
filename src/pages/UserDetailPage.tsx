import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import Button from "../components/ui/Button";
import UserDetail from "@/components/users/UserDetail";

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    error,
  } = useUsers(1, 1, "", parseInt(id || "0"));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="text-red-600">User not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button onClick={() => navigate("/users")} variant="outline">
            Back to Users
          </Button>
          <Button onClick={() => navigate(`/users/${id}/edit`)}>
            Edit User
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <UserDetail user={user.users[0]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
