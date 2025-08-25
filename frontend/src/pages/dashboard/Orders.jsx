import { useState } from "react";
import { BaggageClaim, ChevronsDown, Loader2, ShoppingBag } from "lucide-react";
import { useOrdersActions } from "../../hooks/useOrder";
import OrderCard from "./orders/OrderCard";

export default function Orders() {
 const { ordersQuery } = useOrdersActions();
  const { data: orders, isLoading, isError } = ordersQuery;

  const [visibleCount, setVisibleCount] = useState(4); // show first 4 orders initially
  const increment = 4; // number of orders to show per click

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
        Failed to load your orders. Please refresh.
      </div>
    );
  }

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const visibleOrders = sortedOrders.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + increment);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-6 flex gap-2"><ShoppingBag className="h-8 w-8 text-green-600" />Your Orders</h1>

      {sortedOrders?.length === 0 ? (
        <p className="text-gray-500">No orders yet. Go place one!</p>
      ) : (
        <>
          <div className="space-y-4">
            {visibleOrders.map(order => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>

          {visibleCount < sortedOrders.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleLoadMore}
                className="text-green-600 flex items-center"
              >
                Load More <ChevronsDown/>
              
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
