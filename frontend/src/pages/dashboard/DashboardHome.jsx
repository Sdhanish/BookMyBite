import { Loader2, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useRecipes } from "../../hooks/useRecipes";
import { useCartActions } from "../../hooks/useCartActions";
import { usePagination } from "../../hooks/usePagination";
import RecipeCard from "../dashboard/receipe-card/RecipeCard";
import { useEffect, useState } from "react";
import { fetchOrders } from "../../api/orderApi"; // fetch all orders for user

export default function DashboardHome() {
  const { data: recipes, isLoading: recipesLoading } = useRecipes();
  const { user } = useAuth();
  const { loadingId, handleAddToCart, recipesWithCartStatus } = useCartActions();

  const recipesData = recipesWithCartStatus(recipes) || [];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch orders for logged-in user
  useEffect(() => {
    const getOrders = async () => {
      if (!user) return;

      try {
        const allOrders = await fetchOrders(); // returns all orders
        // Filter orders for this user
        const userOrders = allOrders.filter((order) => order.userId === user._id);
        setOrders(userOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setOrdersLoading(false);
      }
    };

    getOrders();
  }, [user]);

  // responsive page size
  let itemsPerPage = 6;
  if (windowWidth >= 1280) itemsPerPage = 8;
  else if (windowWidth >= 1024) itemsPerPage = 6;
  else if (windowWidth >= 640) itemsPerPage = 4;
  else itemsPerPage = 2;

  const {
    currentItems,
    currentPage,
    totalPages,
    setCurrentPage,
    prevPage,
    nextPage,
    setPageSize,
  } = usePagination(recipesData, itemsPerPage);

  useEffect(() => {
    setPageSize(itemsPerPage);
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Loading state for recipes or orders
  if (recipesLoading || ordersLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-10 w-10 text-green-600" />
      </div>
    );

  return (
    <div className="px-8 py-6 space-y-8">
      {/* ✅ Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between bg-green-50 border border-green-200 p-6 rounded-2xl shadow-sm"
      >
        <div>
          <h1 className="text-xl font-semibold text-green-800">
            Welcome back, {user?.name || "Guest"} 👋
          </h1>
          <p className="text-sm text-gray-600">
            Here’s what’s new today — explore recipes and add them to your cart!
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <User className="text-green-600" />
        </div>
      </motion.div>

      {/* ✅ Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-lg font-bold text-green-700">{recipesData.length}</h2>
          <p className="text-sm text-gray-500">Recipes Available</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-lg font-bold text-green-700">
            {recipesData.filter((r) => r.inCart).length}
          </h2>
          <p className="text-sm text-gray-500">Items in Cart</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-lg font-bold text-green-700">{orders.length}</h2>
          <p className="text-sm text-gray-500">Orders Made</p>
        </div>
      </div>

      {/* ✅ Recipes Grid */}
      <motion.div
        className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {currentItems.map((item) => (
          <RecipeCard
            key={item._id}
            item={item}
            inCart={item.inCart}
            loadingId={loadingId}
            onAddToCart={handleAddToCart}
          />
        ))}
      </motion.div>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg text-gray-700 hover:bg-green-100 disabled:opacity-50"
          >
            ‹
          </button>
          <span className="px-3 py-1 rounded-lg text-xs border bg-green-100 text-green-600">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg text-gray-700 hover:bg-green-100 disabled:opacity-50"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
