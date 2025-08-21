import { fetchCart, addToCart, updateCartItem, removeFromCart } from "../api/cartApi";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation, useApiQuery } from "./useApi";

// Query to fetch cart
export const useCart = () => useApiQuery("cart", fetchCart);

// Add item
export const useAddToCart = () => useApiMutation("cart", addToCart);

// Update quantity with optimistic update
export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  return useApiMutation("cart", updateCartItem, {
    onMutate: async (updatedItem) => {
      await queryClient.cancelQueries("cart");
      const prevCart = queryClient.getQueryData("cart");

      queryClient.setQueryData("cart", (old) => {
        if (!old) return old;
        return {
          ...old,
          cart: {
            ...old.cart,
            items: old.cart.items.map((item) =>
              item.recipe._id === updatedItem.recipeId
                ? { ...item, quantity: updatedItem.quantity }
                : item
            ),
          },
        };
      });

      return { prevCart };
    },
    onError: (_err, _newItem, context) => {
      queryClient.setQueryData("cart", context.prevCart);
    },
    onSettled: () => queryClient.invalidateQueries("cart"),
  });
};

// Remove item with optimistic update
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useApiMutation("cart", removeFromCart, {
    onMutate: async (recipeId) => {
      await queryClient.cancelQueries("cart");
      const prevCart = queryClient.getQueryData("cart");

      queryClient.setQueryData("cart", (old) => {
        if (!old) return old;
        return {
          ...old,
          cart: {
            ...old.cart,
            items: old.cart.items.filter((item) => item.recipe._id !== recipeId),
          },
        };
      });

      return { prevCart };
    },
    onError: (_err, _recipeId, context) => {
      queryClient.setQueryData("cart", context.prevCart);
    },
    onSettled: () => queryClient.invalidateQueries("cart"),
  });
};
