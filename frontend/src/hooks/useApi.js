// src/hooks/useApi.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useApiQuery = (queryKey, fetchFn, options = {}) =>
  useQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: fetchFn,
    ...options,
  });

export const useApiMutation = (queryKey, mutateFn, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutateFn,
    onSuccess: (data, variables, context) => {
      if (options.onSuccess) options.onSuccess(data, variables, context);
      if (queryKey) queryClient.invalidateQueries(queryKey);
    },
    onError: options.onError,
    onMutate: options.onMutate,
  });
};
