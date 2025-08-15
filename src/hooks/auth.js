import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, getCurrentUser, logout } from "../api/auth_api";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username, password }) => {
      const response = await login(username, password);
      return response;
    },
    onError: (error) => {
      console.error("Login error:", error);
      throw error;
    },
    onSuccess: () => {
      console.log("Login successful, invalidating queries...");
      // Invalidate and reset user query
      queryClient.invalidateQueries({ queryKey: ["user-query"] });
      queryClient.setQueryData(["user-query"], null);

      // Invalidate and reset persona query
      queryClient.invalidateQueries({ queryKey: ["persona"] });
      queryClient.setQueryData(["persona"], null);

      // Force refetch of user data
      queryClient.refetchQueries({ queryKey: ["user-query"] });
      queryClient.refetchQueries({ queryKey: ["persona"] });
    },
  });
};

export const useUserQuery = () => {
  const queryClient = useQueryClient();

  // Check if token exists and is valid
  const hasValidToken = () => {
    if (typeof window === "undefined") return false;
    const token = localStorage?.getItem("token");
    if (!token) {
      // Clear any stale data
      queryClient.setQueryData(["user-query"], null);
      return false;
    }
    try {
      // Try to parse token to check if it's valid
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp <= Date.now() / 1000) {
        // Token expired
        localStorage?.removeItem("token");
        localStorage?.removeItem("user");
        queryClient?.setQueryData(["user-query"], null);
        return false;
      }
      return true;
    } catch (e) {
      // Invalid token format
      localStorage?.removeItem("token");
      localStorage?.removeItem("user");
      queryClient.setQueryData(["user-query"], null);
      return false;
    }
  };

  return useQuery({
    queryKey: ["user-query"],
    queryFn: () => getCurrentUser(),
    enabled: hasValidToken(),
    retry: 1, // Retry once on failure
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    onError: (error) => {
      console.error("User query error:", error);
      // Clear token and data on auth error
      if (
        error.message.includes("Unauthorized") ||
        error.message.includes("Invalid token")
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        queryClient.setQueryData(["user-query"], null);
      }
      throw error;
    },
    onSuccess: (data) => {
      console.log("User data loaded:", data);
      // Update localStorage with fresh user data
      localStorage.setItem("user", JSON.stringify(data));
    },
    onInvalidate: () => {
      // Clear local storage when query is invalidated
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Clear localStorage items
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return logout();
    },
    onSuccess: () => {
      console.log("User logged out");
      // Invalidate user query and persona query
      queryClient.invalidateQueries({ queryKey: ["user-query"] });
      queryClient.invalidateQueries({ queryKey: ["persona"] });
      // Reset all auth-related data
      queryClient.setQueryData(["user-query"], null);
      queryClient.setQueryData(["persona"], null);
    },
  });
};
