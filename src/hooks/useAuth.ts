import { useState, useEffect } from "react";
import { authApi } from "../api/auth.api";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const profile = await authApi.getProfile();
      setUser(profile);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    localStorage.setItem("token", response.token);
    setUser(response.user);
    setIsAuthenticated(true);
  };

  const signup = async (name: string, email: string, password: string) => {
    const response = await authApi.signup({ name, email, password });
    localStorage.setItem("token", response.token);
    setUser(response.user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await authApi.logout();
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
  };
};
