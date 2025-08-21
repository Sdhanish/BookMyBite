import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useRecipes } from "../../hooks/useRecipes";
import { useCartActions } from "../../hooks/useCartActions";
import { usePagination } from "../../hooks/usePagination";
import RecipeCard from "../dashboard/receipe-card/RecipeCard";
import { useEffect, useState } from "react";

export default function DashboardHome() {
  const { data: recipes, isLoading: recipesLoading } = useRecipes();
  const { user } = useAuth();
  const { loadingId, handleAddToCart, recipesWithCartStatus } = useCartActions();

  const recipesData = recipesWithCartStatus(recipes) || [];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute itemsPerPage dynamically
  let itemsPerPage = 6; // default
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

  // Update hook's pageSize whenever itemsPerPage changes
  useEffect(() => {
    setPageSize(itemsPerPage);
    setCurrentPage(1); // reset to first page on screen size change
  }, [itemsPerPage]);

  if (recipesLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-10 w-10 text-red-600" />
      </div>
    );

  return (
    <div className="px-8">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-semibold mb-6"
      >
        Welcome {user?.name}, explore our latest recipes!
      </motion.h1>

      {/* Recipes Grid */}
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          {/* Prev */}
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            ‹
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg border transition ${
                currentPage === page
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

