import { Loader2, Trash2 } from "lucide-react";

export default function CartItemCard({
  item,
  isUpdating,
  isRemoving,
  isCheckingOut,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) {
  return (
    <div
      key={item.recipe._id}
      className="flex flex-col sm:flex-row sm:justify-between sm:items-center border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
    >
      {/* Left side: image + info */}
      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
        <img
          src={item.recipe.image}
          alt={item.recipe.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div>
          <h4 className="font-semibold text-lg">{item.recipe.name}</h4>
          <p className="text-gray-500 text-sm">
            ₹{item.recipe.price} x {item.quantity}
          </p>
          <p className="font-bold text-green-600">
            ₹{item.recipe.price * item.quantity}
          </p>
        </div>
      </div>

      {/* Right side: actions */}
      <div className="flex flex-wrap gap-3 justify-end">
        {/* Quantity Controls */}
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            onClick={() =>
              onUpdateQuantity(item.recipe._id, item.quantity - 1)
            }
            disabled={item.quantity <= 1 || isUpdating}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "-"
            )}
          </button>
          <span className="px-4">{item.quantity}</span>
          <button
            onClick={() =>
              onUpdateQuantity(item.recipe._id, item.quantity + 1)
            }
            disabled={isUpdating}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "+"
            )}
          </button>
        </div>

        {/* Remove */}
        <button
          onClick={() => onRemoveItem(item.recipe._id)}
          disabled={isRemoving}
          className="p-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-600"
        >
          {isRemoving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </button>

        {/* Individual Checkout */}
        <button
          onClick={() => onCheckout([item])}
          disabled={isCheckingOut}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
        >
          {isCheckingOut ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Pay"
          )}
        </button>
      </div>
    </div>
  );
}
