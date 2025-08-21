import React, { useEffect, useState } from "react";
import { Loader2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchPublicRecipes } from "../hooks/useRecipes";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


const Receipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchPublicRecipes();
        setRecipes(data);
      } catch (err) {
        setError("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  const handleExplore = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      Swal.fire({
        icon: "info",
        title: "Please Login First",
        text: "You need to login To Explore our Recipes.",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  if (loading) {
    return (
      <section className="py-16 flex justify-center items-center">
        <Loader2 className="animate-spin w-6 h-7" />
        <p className="ml-2 text-gray-600">Loading dishes...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // delay between cards
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
<motion.div
  className="text-center mb-12"
  initial={{ y: -30, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  viewport={{ once: true, amount: 0.2 }} 
>
  <h3 className="text-3xl sm:text-4xl font-bold text-black mb-4">
    Popular Dishes
  </h3>
  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
    Discover our most loved dishes, crafted with the finest ingredients
    and delivered with care.
  </p>
</motion.div>

{/* Recipes Grid */}
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>

   <div className="relative">
    {/* Custom Prev Button */}
    <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full hover:bg-red-600 hover:text-white transition">
      ‹
    </button>

    {/* Custom Next Button */}
    <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full hover:bg-red-600 hover:text-white transition">
      ›
    </button>

  <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={24}
      navigation={{
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      breakpoints={{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
    >
    {recipes.map((item) => (
      <SwiperSlide key={item._id}>
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
        >
          {/* Image & Rating */}
          <div className="relative overflow-hidden">
            <motion.img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1 shadow">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">
                {item.rating || "4.5"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg sm:text-xl font-bold text-black">
                {item.name}
              </h4>
              <span className="text-sm font-bold text-red-600">
                &#8377;{item.price}
              </span>
            </div>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
              {item.description}
            </p>

            {/* Actions */}
            <motion.button
              onClick={handleExplore}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore More
            </motion.button>
          </div>
        </motion.div>
      </SwiperSlide>
    ))}
  </Swiper>
   </div>

</motion.div>


      </div>
    </section>
  );
};

export default Receipes;
