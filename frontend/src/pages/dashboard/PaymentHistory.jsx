// src/components/payments/PaymentHistory.jsx
import React from "react";
import { usePayments } from "../../hooks/usePayments";
import { Loader2, Wallet2Icon } from "lucide-react";

export default function PaymentHistory() {
  const { data, isLoading, isError } = usePayments();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Failed to load payment history. Please try again.
      </div>
    );
  }

  const payments = data?.payments || [];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 flex gap-2">
       <Wallet2Icon className="h-8 w-8 text-red-600" /> Payment History
      </h1>

      {payments.length === 0 ? (
        <p className="text-gray-500">No payment records found.</p>
      ) : (
        <div className="space-y-4">
          {payments.map((p, idx) => {
            const order = p.order;
            const date = new Date(p.createdAt);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <div
                key={idx}
                className="p-4 border rounded-lg bg-white shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  {/* Left side */}
                  <div className="space-y-1 text-sm">
                    {order?._id && (
                      <p className="text-gray-600">
                        <span className="font-medium">Order ID:</span> #{order._id}
                      </p>
                    )}
                    <p className="text-gray-600">
                      <span className="font-medium">Date:</span> {formattedDate}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Time:</span> {formattedTime}
                    </p>
                  </div>

                  {/* Status */}
                  <span
                    className={` text-sm sm:text-xs px-3 py-1 rounded-full w-fit
                      ${
                        p.status === "success"
                          ? "bg-green-50 text-green-700"
                          : p.status === "pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-green-50 text-green-700"
                      }`}
                  >
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
