import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Home,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossedIcon,
} from "lucide-react";
import { useState } from "react";
import { handleLogout } from "../hooks/useLogout";

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true); // Sidebar open/close
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile sidebar

  const navLinks = [
    { to: "/dashboard", icon: Home, label: "Home", end: true },
    { to: "/dashboard/orders", icon: ShoppingBag, label: "Orders" },
    { to: "/dashboard/cart", icon: ShoppingCart, label: "Cart" },
    { to: "/dashboard/payment-history", icon: CreditCard, label: "Payment History" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-green-800 to-slate-900

 text-white flex flex-col p-4 h-screen fixed top-0 left-0 z-50 
          transform transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-20"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <Link
          to="/"
          className={`flex items-center ${
            isOpen ? "space-x-3" : "justify-center"
          } mb-10`}
        >
          <div className="bg-gradient-to-tr from-green-500 to-green-700 p-2 rounded-xl shadow-md flex items-center justify-center">
            <UtensilsCrossedIcon className="h-5 w-5 text-white" />
          </div>
          {isOpen && (
            <h1 className="text-xl font-bold text-white tracking-wide">
                Book<span className="bg-clip-text text-transparent bg-gradient-to-b from-green-300 to-green-900">My</span>Bite
            </h1>
          )}
        </Link>

        {/* Nav Links */}
        <nav className="flex flex-1 flex-col justify-between w-full">
          <div className="flex flex-col space-y-3">
            {navLinks.map(({ to, icon: Icon, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center ${
                    isOpen ? "gap-3 px-4 py-2" : "justify-center p-2"
                  } rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-green-600 text-white font-semibold shadow-md"
                      : "hover:bg-green-700/60 text-gray-300 hover:text-white"
                  }`
                }
                onClick={() => setIsMobileOpen(false)}
              >
                <Icon className="h-5 w-5" />
                {isOpen && <span>{label}</span>}
              </NavLink>
            ))}
          </div>

          {/* Logout */}
          <button
            onClick={() => handleLogout(logout, navigate)}
            className={`flex items-center ${
              isOpen ? "gap-2 px-4 py-2" : "justify-center p-2"
            } bg-gradient-to-r from-green-600 to-green-700 hover:opacity-90 
              rounded-lg font-medium shadow-md transition-all`}
          >
            <LogOut className="h-5 w-5" /> {isOpen && "Logout"}
          </button>
        </nav>

        {/* Toggle Button (desktop only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 
            bg-gray-800 text-white p-1 rounded-full shadow-lg hover:bg-gray-700 transition"
        >
          {isOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-md shadow-lg"
      >
        <UtensilsCrossedIcon className="h-6 w-6 text-white" />
      </button>

      {/* Main Content */}
      <main
        className={`flex-1 p-8 bg-gray-50 overflow-y-auto transition-all duration-300 
          ${isOpen ? "md:ml-64" : "md:ml-20"}`}
      >
        <Outlet />
      </main>
    </div>
  );
}
