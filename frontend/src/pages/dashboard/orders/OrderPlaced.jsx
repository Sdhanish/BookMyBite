import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchOrderById } from "../../../api/orderApi";
import Loader from "./Loader";

export default function OrderPlaced() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const data = await fetchOrderById(orderId);
        setOrder(data);
      } catch (err) {
        console.error(err);
        toast.error("Order not found");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) getOrder();
  }, [orderId]);

  if (loading) return <Loader message="Fetching your order..." />;

  if (!order)
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-700">
        Order not found.{" "}
        <button
          onClick={() => navigate("/dashboard/orders")}
          className="ml-2 text-blue-600 underline hover:text-blue-700 transition"
        >
          Go to Orders
        </button>
      </div>
    );

  const orderDate = new Date(order.createdAt);
  const timeString = orderDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const dateString = orderDate.toLocaleDateString();

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 ">
        <div className="border rounded-2xl shadow-xl bg-white p-8 max-w-md w-full text-center space-y-6 transition-colors">
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
            🎉 Order Placed Successfully!
          </h2>
          <p className="">
            Your order has been confirmed.
          </p>

          <div className="text-left space-y-3">
            <p>
              <span className="font-semibold">Order ID:</span> {order._id}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {order.status === "paid" ? "completed" : order.status}
            </p>
            <p>
              <span className="font-semibold">Date:</span> {dateString}
            </p>
            <p>
              <span className="font-semibold">Time:</span> {timeString}
            </p>

            <div>
              <span className="font-semibold">Items:</span>
              <ul className="mt-2 space-y-2">
                {order.items.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center gap-3 p-2 rounded-lg transition"
                  >
                    {item.recipe?.image && (
                      <img
                        src={item.recipe.image}
                        alt={item.recipe.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                    )}
                    <span className="font-medium">
                      {item.recipe?.name} × {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="font-semibold text-lg mt-3">
              Total: <span className="text-green-600">₹{order.totalAmount}</span>
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard/orders")}
            className="mt-6 w-full bg-gradient-to-b from-green-400 via-green-500 to-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition font-semibold"
          >
            View All Orders
          </button>
        </div>
      </div>
    </>
  );
}
