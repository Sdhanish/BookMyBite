// src/api/paymentApi.js
import axiosInstance from "./axios";

export const fetchPayments = async () => {
  const { data } = await axiosInstance.get("/payments");
  return data;
};

export const payForItems = async (items) => {
  const { data } = await axiosInstance.post("/payments/pay", { items });
  // returns { clientSecret, order, payment }
  return data;
};

export const confirmPayment = async ({ orderId, paymentId }) => {
  const { data } = await axiosInstance.post("/payments/confirm", { orderId, paymentId });
  return data;
};
