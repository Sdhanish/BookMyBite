// backend/utils/stripeIntent.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const createPaymentIntent = async (amount, metadata = {}, currency = "inr") => {
  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // INR paise
    currency,
    metadata,
  });
};
