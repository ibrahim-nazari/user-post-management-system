import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import UsersTable from "../components/users/UsersTable";
import Pagination from "../components/Pagination";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useUsers(page, 10, search);
  const navigate = useNavigate();

  const handleUserClick = (id: number) => {
    navigate(`/users/${id}`);
  };

  const handleEditClick = (id: number) => {
    navigate(`/users/${id}/edit`);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="text-red-600">Error loading users</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <Button onClick={() => navigate("/posts")}>Go to Posts</Button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
              />
            </div>

            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <>
                <UsersTable
                  users={data?.users || []}
                  onUserClick={handleUserClick}
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

export default UsersPage;
