"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  useLoginMutation,
  useUserQuery,
  useLogoutMutation,
} from "../hooks/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const userQuery = useUserQuery();

  useEffect(() => {
    if (!isLoading && !userQuery.isLoading) {
      setIsLoading(false);
    }
  }, [isLoading, userQuery.isLoading]);

  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  const signIn = async (username, password) => {
    try {
      await loginMutation.mutateAsync({ username, password });
      return userQuery.data;
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (username, password) => {
    // In a real application, this would call a registration API
    // For now, we'll treat sign up as a login since we have hardcoded users
    return signIn(username, password);
  };

  const signOut = () => {
    logoutMutation.mutate();
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user: userQuery.data,
        isLoading: isLoading || userQuery.isLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        isAuthenticated: !!userQuery.data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
