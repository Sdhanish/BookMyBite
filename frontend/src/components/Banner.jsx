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
      {/* Animated Background */}
<motion.div
  className="absolute inset-0 bg-cover bg-center will-change-transform"
  style={{
    backgroundImage: "url('/banner-2.jpg')",
  }}
  initial={{ scale: 1.2 }}   // start zoomed in
  animate={{ scale: 1 }}     // slowly zoom out to normal
  transition={{
    duration: 6,             // adjust speed
    ease: "easeOut",         // smooth slow-down
  }}
/>


      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-green-600 to-green-700"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Delicious <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-200 to-gray-500">Food</span> Delivered <span className="bg-clip-text text-transparent bg-gradient-to-l from-gray-100 via-gray-200 to-gray-500">Fast</span>
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

        <motion.button
          onClick={handleOrderNow}
          className="px-8 py-3 rounded-lg font-semibold text-white shadow-lg transform transition-all duration-300 hover:scale-105 bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        >
          Order Now
        </motion.button>
      </div>
    </section>
  );
};

export default Banner;
