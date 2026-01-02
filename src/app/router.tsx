import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import UsersPage from "../pages/UsersPage";
import UserDetailPage from "../pages/UserDetailPage";
import EditUserPage from "../pages/EditUserPage";
import PostsPage from "../pages/PostsPage";
import PostDetailPage from "../pages/PostDetailPage";
import CreatePostPage from "../pages/CreatePostPage";
import EditPostPage from "../pages/EditPostPage";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Show loading spinner or skeleton while checking authentication
    return <div>Loading...</div>; // Or your preferred loading component
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<Navigate to="/posts" />} />

      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UsersPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/users/:id"
        element={
          <PrivateRoute>
            <UserDetailPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/users/:id/edit"
        element={
          <PrivateRoute>
            <EditUserPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/posts"
        element={
          <PrivateRoute>
            <PostsPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/posts/:id"
        element={
          <PrivateRoute>
            <PostDetailPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/posts/create"
        element={
          <PrivateRoute>
            <CreatePostPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/posts/:id/edit"
        element={
          <PrivateRoute>
            <EditPostPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default Router;
