// src/api/orderApi.js

import axiosInstance from "./axios";


export const fetchOrders = async () => {
  const { data } = await axiosInstance.get("/orders");
  return data;
};

export const createOrder = async (orderData) => {
  const { data } = await axiosInstance.post("/orders", orderData);
  return data;
};


// export const getOrderById = async (orderId) => {
//   const { data } = await axiosInstance.get(`/orders/${orderId}`);
//   console.log("Fetched order:", data); // add this to debug
//   return data;
// };


export const fetchOrderById = async (orderId) => {
  const { data } = await axiosInstance.get(`/orders/${orderId}`);
  return data;
};