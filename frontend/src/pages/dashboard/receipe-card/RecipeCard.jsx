import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function RecipeCard({ item, inCart, onAddToCart, loadingId }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden group">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <span className="absolute top-3 left-3 bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded-full shadow">
          ⭐ {item.rating || "4.5"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
          <span className="text-sm font-bold text-green-600">
            ₹{item.price}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg disabled:opacity-70 transition"
          onClick={() => onAddToCart(item)}
          disabled={loadingId === item._id || inCart}
        >
          {loadingId === item._id ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : inCart ? (
            "Added"
          ) : (
            "Add to Cart"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
