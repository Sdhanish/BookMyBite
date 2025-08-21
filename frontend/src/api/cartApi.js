// src/api/cartApi.js

import axiosInstance from "./axios";


export const fetchCart = async () => {
  const { data } = await axiosInstance.get("/carts");
  return data;
};

export const addToCart = async (recipeId) => {
  const { data } = await axiosInstance.post("/carts/add", { recipeId });
  return data;
};

export const updateCartItem = async ({ recipeId, quantity }) => {
  const { data } = await axiosInstance.put("/carts/update", { recipeId, quantity });
  return data;
};

export const removeFromCart = async (recipeId) => {
  const { data } = await axiosInstance.delete(`/carts/remove/${recipeId}`);
  return data;
};
