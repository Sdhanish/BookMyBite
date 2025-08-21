import { useState } from "react";
import { useRecipes } from "../hooks/useRecipes";
import { useAuth } from "../context/AuthContext";
import { Star, Home, ShoppingBag, ShoppingCart, CreditCard, LogOut } from "lucide-react";

export default function Dashboard() {
  const { data: recipes, isLoading } = useRecipes();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("recipes"); // tracks active content

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (fixed) */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6 fixed h-screen">
        <h2 className="text-2xl font-bold mb-8">FoodHub</h2>
        <nav className="flex-1 space-y-4">
          <button
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-3 hover:text-red-400 w-full text-left"
          >
            <Home className="h-5 w-5" /> Home
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className="flex items-center gap-3 hover:text-red-400 w-full text-left"
          >
            <ShoppingBag className="h-5 w-5" /> My Orders
          </button>
          <button
            onClick={() => setActiveTab("cart")}
            className="flex items-center gap-3 hover:text-red-400 w-full text-left"
          >
            <ShoppingCart className="h-5 w-5" /> Cart
          </button>
          {/* <button
            onClick={() => setActiveTab("payments")}
            className="flex items-center gap-3 hover:text-red-400 w-full text-left"
          >
            <CreditCard className="h-5 w-5" /> Payments
          </button> */}
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg mt-4"
        >
          <LogOut className="h-5 w-5" /> Logout
        </button>
      </aside>

      {/* Main Content (scrollable) */}
      <main className="flex-1 ml-64 p-8 bg-gray-50 overflow-y-auto">
        {/* {activeTab === "home" && (
          <h1 className="text-3xl font-bold">Welcome to FoodHub Dashboard</h1>
        )} */}

        {activeTab === "orders" && (
          <h1 className="text-3xl font-bold">Your Orders</h1>
        )}

        {activeTab === "cart" && (
          <h1 className="text-3xl font-bold">Your Cart</h1>
        )}

        {activeTab === "payments" && (
          <h1 className="text-3xl font-bold">Payments</h1>
        )}

        {activeTab === "home" && (
          <>
            <h1 className="text-3xl font-bold mb-6">All Recipes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {recipes?.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between">
                      <h4 className="text-xl font-bold text-black mb-2">
                        {item.name}
                      </h4>
                      <span className="text-xl font-bold text-red-600">
                        ₹{item.price}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {item.description}
                    </p>
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
