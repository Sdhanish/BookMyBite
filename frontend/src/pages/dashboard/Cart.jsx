import { useCart, useRemoveFromCart, useUpdateCart } from "../../hooks/useCart";
import { Loader2, ShoppingCart } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CartItemCard from "./card-items/CartItemsCard";

export default function CartPage() {
  const { data, isLoading } = useCart();
  const updateCartMutation = useUpdateCart();
  const removeCartMutation = useRemoveFromCart();
  const navigate = useNavigate();

  const [updatingId, setUpdatingId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [checkingOutId, setCheckingOutId] = useState(null);

  const handleUpdateQuantity = (recipeId, newQuantity) => {
    setUpdatingId(recipeId);
    updateCartMutation.mutate(
      { recipeId, quantity: newQuantity },
      { onSettled: () => setUpdatingId(null) }
    );
  };

  const handleRemoveItem = (recipeId) => {
    setRemovingId(recipeId);
    removeCartMutation.mutate(recipeId, {
      onSettled: () => setRemovingId(null),
    });
  };

  const handleCheckout = (items) => {
    navigate("/dashboard/payments", { state: { items } });
  };

  // Safe defaults
  const { cart = { items: [] } } = data || {};

  // Filter only valid items
  const validItems = useMemo(() => cart.items.filter(item => item.recipe), [cart.items]);

  // Calculate total price only for valid items
  const totalPrice = useMemo(
    () => validItems.reduce((sum, item) => sum + item.quantity * item.recipe.price, 0),
    [validItems]
  );

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <ShoppingCart className="h-8 w-8 text-green-600" />
        Your Cart
      </h1>

      {/* Loader */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin h-10 w-10 text-green-600" />
        </div>
      ) : validItems.length === 0 ? (
        // Empty state
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        // Cart items
        <div className="space-y-6">
          {validItems.map(item => (
            <CartItemCard
              key={item.recipe._id}
              item={item}
              isUpdating={updatingId === item.recipe._id}
              isRemoving={removingId === item.recipe._id}
              isCheckingOut={checkingOutId === item.recipe._id}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />
          ))}

          {/* Checkout All */}
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center border-t pt-4 gap-4">
            <h2 className="text-xl font-bold">
              Total: <span className="text-green-600">₹{totalPrice}</span>
            </h2>
            <button
              onClick={() => handleCheckout(validItems)}
              disabled={checkingOutId === "all"}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-md font-semibold"
            >
              {checkingOutId === "all" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Checkout All"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
