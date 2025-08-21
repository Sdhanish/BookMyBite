// src/hooks/usePayments.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPayments, payForItems, confirmPayment } from "../api/paymentApi";

export const usePayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: fetchPayments,
  });
};

export const usePayForItems = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: payForItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};

export const useConfirmPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmPayment,
    onSuccess: () => {
      // After success we can refresh everything
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
