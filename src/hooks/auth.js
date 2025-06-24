import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, getCurrentUser, logout } from "../api/auth_api";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username, password }) => {
      return await login(username, password);
    },
    onError: (error) => {
      console.error('Login error:', error);
      throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-query'],
        refetchType: 'all',
      })
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      logout();
      return true;
    },
    onSuccess: () => {
      console.log('User logged out');
      queryClient.invalidateQueries({
        queryKey:  ['user-query'],
        refetchType: 'all',
      })
    }
  });
};
