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
import Swal from "sweetalert2";
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
  className={`bg-gray-900 text-white flex flex-col p-4 h-screen fixed top-0 left-0 z-50 
    transform transition-all duration-300 ease-in-out
    ${isOpen ? "w-64" : "w-20"}
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0
  `}
>

{/* Logo */}
<Link
  to="/"
  className={`flex items-center ${isOpen ? "space-x-2" : "justify-center"} mb-8`}
>
  <div className="bg-red-600 p-2 rounded-full flex items-center justify-center">
     <UtensilsCrossedIcon className="h-6 w-6 text-white" />
  </div>
  {isOpen && (
    <h1 className="text-2xl font-bold text-white tracking-wider">
      BookMyBite
    </h1>
  )}
</Link>

{/* Nav Links */}
<nav className="flex flex-1 flex-col justify-between w-full">
  <div className="flex flex-col space-y-6">
    {navLinks.map(({ to, icon: Icon, label, end }) => (
      <NavLink
        key={to}
        to={to}
        end={end}
        className={({ isActive }) =>
          `flex items-center ${
            isOpen ? "gap-3" : "justify-center"
          } hover:text-red-400 transition-colors ${
            isActive ? "text-red-500 font-semibold" : ""
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
      isOpen ? "gap-2 px-4" : "justify-center"
    } bg-red-600 hover:bg-red-700 py-2 rounded-lg mt-8`}
  >
    <LogOut className="h-5 w-5" /> {isOpen && "Logout"}
  </button>
</nav>


        {/* Toggle Button (desktop only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full shadow-lg"
        >
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-md"
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
