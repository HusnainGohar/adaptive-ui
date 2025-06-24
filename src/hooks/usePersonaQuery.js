import { useQuery, useQueryClient } from '@tanstack/react-query';
import { predictPersona } from '../api/person_api';

export const usePersonaQuery = (stats) => {
  const queryClient = useQueryClient();
  
  // Check if token exists and is valid
  const hasValidToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch (e) {
      return false;
    }
  };

  return useQuery({
    queryKey: ['persona', stats],
    queryFn: () => predictPersona(stats),
    enabled: !!stats && hasValidToken(), // Only enabled when stats and token are valid
    staleTime: 30 * 60 * 1000, // Cache for 30 minutes
    retry: 1, // Retry once on failure
    onError: (error) => {
      console.error('Persona prediction error:', error);
      if (error.response?.status === 401) {
        // If unauthorized, clear token and invalidate queries
        localStorage.removeItem('token');
        queryClient.invalidateQueries({ queryKey: ['user-query'] });
        queryClient.invalidateQueries({ queryKey: ['persona'] });
      }
      throw error;
    },
    select: (data) => ({
      persona: data,
      lastUpdated: new Date().toISOString()
    }),
    onInvalidate: () => {
      // Clear persona data when invalidated
      queryClient.setQueryData(['persona'], null);
    }
  });
};
