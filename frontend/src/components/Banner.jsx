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
    <section className="relative h-[90vh] sm:h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.43, 0.13, 0.23, 0.96] }} // custom cubic-bezier easing

      />
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
       transition={{ duration: 1.8, delay: 0.2, ease: "easeInOut" }}

      />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}

        >
          Delicious Food
          <span className="text-red-500"> Delivered Fast</span>
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg lg:text-xl mb-8 text-gray-200 max-w-2xl mx-auto"
           initial={{ y: 30, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        >
          Order from your favorite restaurants and get fresh, hot food delivered
          right to your doorstep in minutes.
        </motion.p>

        <motion.button
          onClick={handleOrderNow}
          className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 1.0, delay: 0.8, type: "spring", stiffness: 90 }}
        >
          Order Now
        </motion.button>
      </div>
    </section>
  );
};

export default Banner;
