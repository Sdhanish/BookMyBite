import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, UtensilsCrossedIcon, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { handleLogout } from "../hooks/useLogout";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 py-2 ${
        isScrolled ? "backdrop-blur-md bg-white/40 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-full">
              <UtensilsCrossedIcon className="h-6 w-6 text-white" />
            </div>
            <div className="space-y-0">
              <h1
  className={`text-xl font-bold tracking-widest ${
    isScrolled
      ? "text-gray-900 bg-none" // solid black on scroll
      : "bg-clip-text text-transparent bg-gradient-to-b from-gray-50 via-gray-100 to-gray-300" // gradient when top
  }`}
>
  Book<span className="bg-clip-text text-transparent bg-gradient-to-b from-green-500 to-green-700">My</span>Bite
</h1>

              <p
                className={`text-xs -mt-1 ${
                  isScrolled ? "text-gray-600" : "text-gray-300"
                }`}
              >
                Delicious food delivered
              </p>
            </div>
          </Link>

          {/* Right Section */}
          {!user ? (
            <Link
              to="/login"
              className={`flex items-center gap-2 font-medium transition-colors duration-200 ${
                isScrolled
                  ? "text-gray-900 hover:text-green-600"
                  : "text-white hover:text-green-400"
              }`}
            >
              <User className="h-5 w-5" />
              <span>Login</span>
            </Link>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden md:flex items-center gap-6">
                {/* Dashboard */}
                <Link
                  to="/dashboard"
                  className={`flex gap-2 items-center ${
                    isScrolled
                      ? "text-gray-900 hover:text-green-600"
                      : "text-white hover:text-green-500"
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" /> Dashboard
                </Link>

                {/* Avatar + Logout */}
                <div className="flex items-center gap-5">
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic || "/fallback.jpg"}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/fallback.jpg";
                      }}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}

                  <button
                    onClick={() => handleLogout(logout, navigate)}
                    className={`flex items-center gap-2 ${
                      isScrolled
                        ? "text-gray-900 hover:text-green-600"
                        : "text-white hover:text-green-500"
                    }`}
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </div>

              {/* Mobile */}
              <div className="flex md:hidden items-center gap-4">
                <Link
                  className={`${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}
                  to="/dashboard"
                >
                  <LayoutDashboard className="h-6 w-6" />
                </Link>

                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <button
                  onClick={() => handleLogout(logout, navigate)}
                  className={`${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
