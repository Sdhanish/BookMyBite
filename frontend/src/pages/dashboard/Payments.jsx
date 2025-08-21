// src/pages/dashboard/Payments.jsx
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { usePayForItems } from "../../hooks/usePayments";
import { useCart } from "../../hooks/useCart";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Loader2 } from "lucide-react";

import CheckoutForm from "./payments/CheckoutForm";
import CartItems from "./payments/CartItems";
import EmptyCart from "./payments/EmptyCart";
import BackButton from "./payments/BackButton";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function PaymentsPage() {
  const navigate = useNavigate();
  const { data: cartData, isLoading } = useCart();
  const { mutateAsync: payForItems, isPending } = usePayForItems();

  const [clientSecret, setClientSecret] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [paymentId, setPaymentId] = useState(null);

  const items = cartData?.cart?.items || [];

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.recipe.price * item.quantity, 0),
    [items]
  );

  const startPayment = async () => {
    try {
      const res = await payForItems(items);
      // Save everything we need for the payment step
      setClientSecret(res.clientSecret);
      setOrderId(res.order._id);
      setPaymentId(res.payment._id);
    } catch (err) {
      console.error(err);
      alert("Failed to start payment.");
    }
  };

  if (isLoading) return <p>Loading cart...</p>;
  if (!items.length && !clientSecret) return <EmptyCart navigate={navigate} />;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <BackButton navigate={navigate} />
      <h1 className="text-3xl font-bold mb-6">Review & Pay</h1>

      {/* Show cart only before we've created the PaymentIntent */}
      {!clientSecret && <CartItems items={items} />}

      {!clientSecret ? (
        <div className="mt-8 p-4 border-t flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Total: <span className="text-red-600">₹{totalAmount}</span>
          </h2>
          <button
            disabled={isPending}
            onClick={startPayment}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-xl text-lg font-semibold shadow-md disabled:opacity-50 text"
          >
            <CreditCard className="h-5 w-5" />
            {isPending ? <Loader2 className="h-6 w-6 animate-spin text-green-600" /> : "Pay Now"}
          </button>
        </div>
      ) : (
        // Mount Elements AFTER we have clientSecret
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            orderId={orderId}
            paymentId={paymentId}
            navigate={navigate}
          />
        </Elements>
      )}
    </div>
  );
}
