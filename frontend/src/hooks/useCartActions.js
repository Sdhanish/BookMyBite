import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAddToCart, useCart } from "./useCart";

export const useCartActions = () => {
  const { data: cartData } = useCart();
  const addToCartMutation = useAddToCart();
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();

  const cartItems = cartData?.cart?.items || [];

const validCartItems = cartItems.filter(c => c.recipe?._id);

const recipesWithCartStatus = (recipes) =>
  recipes?.map((r) => ({
    ...r,
    inCart: validCartItems.some((c) => c.recipe._id === r._id),
  }));

  const handleAddToCart = (item) => {
    setLoadingId(item._id);

    addToCartMutation.mutate(item._id, {
      onSuccess: () => {
        toast.success(`${item.name} added to cart!`);
        navigate("/dashboard/cart");
      },
      onError: (error) => {
        const msg = error?.response?.data?.message || "Failed to add to cart";
        toast.error(msg.includes("Added") ? "This item is already in your cart!" : msg);
      },
      onSettled: () => setLoadingId(null),
    });
  };

  return { loadingId, handleAddToCart, recipesWithCartStatus };
};
