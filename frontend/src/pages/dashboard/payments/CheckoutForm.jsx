import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useConfirmPayment } from "../../../hooks/usePayments";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ orderId, paymentId }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { mutateAsync: confirmPayment } = useConfirmPayment();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message || "Payment failed");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      const toastId = toast.loading("Confirming payment...");
      try {
        await confirmPayment({ orderId, paymentId });
        toast.dismiss(toastId);
        toast.success("Payment successful 🎉");
        // Use orderId here instead of undefined order prop
        navigate(`/dashboard/order-placed/${orderId}`);
      } catch (e) {
        toast.dismiss(toastId);
        console.error(e);
        toast.error("Payment succeeded, but server confirmation failed.");
      }
    }

    setLoading(false);
  };

  return (
    <>
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="mt-8 p-6 border rounded-xl shadow-md max-w-md mx-auto"
      >
        <PaymentElement />
        <button
          disabled={!stripe || loading}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg flex justify-center items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Confirm Payment"}
        </button>
      </form>
    </>
  );
}
