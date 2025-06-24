import { useMutation, useQuery } from "@tanstack/react-query";
import { login, getCurrentUser, logout } from "../api/auth_api";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async ({ username, password }) => {
      return await login(username, password);
    },
    onError: (error) => {
      console.error('Login error:', error);
      throw error;
    },
    onSuccess: (data) => {
      console.log('Login successful:', data);
    }
  });
};

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['user-query'],
    queryFn: () => getCurrentUser(),
    enabled: () => typeof window !== 'undefined' && localStorage.getItem('token') !== null,
    onError: (error) => {
      console.error('User query error:', error);
      throw error;
    },
    onSuccess: (data) => {
      console.log('User data loaded:', data);
    }
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      logout();
      return true;
    },
    onSuccess: () => {
      console.log('Logout successful');
    }
  });
};
