import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Banner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleOrderNow = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      Swal.fire({
        icon: "info",
        title: "Please Login First",
        text: "You need to login to place an order.",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  return (
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
  {/* Animated Background */}
<motion.div
  className="absolute inset-0 bg-cover bg-center will-change-transform"
  style={{
    backgroundImage: "url('/banner-image.jpeg')",
    backgroundColor: "black", // fallback if image fails
  }}
  initial={{ scale: 1.2 }}   // start zoomed in
  animate={{ scale: 1 }}     // zoom out to normal
  transition={{
    duration: 6,             // adjust speed (bigger = slower)
    ease: "easeOut",         // smooth slow-down
  }}
/>





      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Delicious Food
          <span className="text-red-500"> Delivered Fast</span>
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg lg:text-xl mb-8 text-gray-200 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        >
          Order from your favorite restaurants and get fresh, hot food delivered
          right to your doorstep in minutes.
        </motion.p>

        <button
          onClick={handleOrderNow}
          className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Order Now
        </button>
      </div>
    </section>
  );
};

export default Banner;
