import { useState } from "react";
import { Eye } from "lucide-react";

export default function OrderCard({ order }) {
  const [isOpen, setIsOpen] = useState(false);

  const orderDate = new Date(order.createdAt);
  const timeString = orderDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const dateString = orderDate.toLocaleDateString();

  const statusColors = {
    paid: "text-green-600",
    completed: "text-green-600",
    pending: "text-yellow-600",
    failed: "text-red-600",
  };

  const displayStatus =
    order.status === "paid" || order.status === "completed"
      ? "Completed"
      : order.status;

  const maxHeaderItems = 3;
  const headerItems = order.items.slice(0, maxHeaderItems);

  return (
    <div className="border rounded-xl shadow-md bg-white overflow-hidden transition hover:shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-2">
        <div className="flex flex-col">
          <span className="text-xs sm:text-sm text-gray-500 break-all">
            Order ID: #{order._id}
          </span>
          <span
            className={`text-sm sm:text-base font-semibold ${statusColors[order.status]}`}
          >
            Status: {displayStatus}
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 flex items-center gap-1 text-blue-700 text-sm sm:text-base hover:bg-gray-100 rounded-lg transition"
          title={isOpen ? "Hide details" : "View details"}
        >
          {isOpen ? "Hide" : "View more"}
          <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </button>
      </div>

      {/* Header Items - preview (hidden if details open) */}
      {!isOpen && (
        <div className="flex flex-wrap items-center gap-3 p-4 border-t">
          {headerItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              {item.recipe?.image && (
                <img
                  src={item.recipe.image}
                  alt={item.recipe.name}
                  className="w-10 h-10 rounded object-cover flex-shrink-0"
                />
              )}
              <span className="text-sm sm:text-base font-medium truncate max-w-[120px] sm:max-w-none">
                {item.recipe?.name}
              </span>
            </div>
          ))}

          {order.items.length > maxHeaderItems && (
            <span className="text-sm text-gray-500 ml-1">
              +{order.items.length - maxHeaderItems} more
            </span>
          )}
        </div>
      )}

      {/* Expanded Details */}
      {isOpen && (
        <div className="p-4 bg-gray-50 space-y-3 border-t">
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-700 gap-2"
              >
                <div className="flex items-center gap-2">
                  {item.recipe?.image && (
                    <img
                      src={item.recipe.image}
                      alt={item.recipe.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                  )}
                  <span>{item.recipe?.name}</span>
                </div>
                <span className="text-gray-800">
                  {item.quantity} × ₹{item.recipe?.price}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-3 flex flex-col sm:flex-row sm:justify-between sm:items-center font-semibold text-gray-900 gap-1">
            <span>Total Amount</span>
            <span>₹{order.totalAmount}</span>
          </div>

          {/* Order Meta */}
          <div className="mt-3 text-xs sm:text-sm text-gray-500 space-y-1">
            <p>Order ID: {order._id}</p>
            <p>Status: {displayStatus}</p>
            <p>Date: {dateString}</p>
            <p>Time: {timeString}</p>
          </div>
        </div>
      )}
    </div>
  );
}
