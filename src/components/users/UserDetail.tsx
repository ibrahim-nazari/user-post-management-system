interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UserDetailProps {
  user: User;
}

const UserDetail = ({ user }: UserDetailProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Role</h3>
          <p className="mt-1">
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
              {user.role}
            </span>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">User ID</h3>
          <p className="mt-1 text-gray-900">{user.id}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Created At</h3>
          <p className="mt-1 text-gray-900">
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
          <p className="mt-1 text-gray-900">
            {new Date(user.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
