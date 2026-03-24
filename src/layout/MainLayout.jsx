import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useThemeStore from "../store/useThemeStore";
import useAuthStore from "../store/useAuthStore";
import { useLanguage } from "../context/LanguageContext";

const MainLayout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { theme, toggleTheme } = useThemeStore();
  const { language, toggleLanguage } = useLanguage();
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={theme === "dark" ? "bg-gray-900 min-h-screen text-white" : "bg-gray-50 min-h-screen text-gray-900"}>
      <nav className={`px-8 py-3 flex justify-between items-center sticky top-0 z-50 border-b ${
        theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}>
        <Link to="/" className="text-base font-semibold tracking-tight">
          Products App
        </Link>

        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <button onClick={toggleLanguage}
            className="text-sm px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 transition cursor-pointer">
            {language === "en" ? "العربية" : "English"}
          </button>

          <span className="text-sm font-medium">
            {language === "en" ? "Welcome" : "مرحباً"}
          </span>

          {/* Theme toggle */}
          <button onClick={toggleTheme}
            className="text-sm px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 transition cursor-pointer">
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* Cart */}
          <Link to="/cart" className="relative cursor-pointer">
            <span className="text-2xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Login / Logout */}
          {token ? (
            <button onClick={handleLogout}
              className="text-sm px-3 py-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition border-0 cursor-pointer">
              Logout
            </button>
          ) : (
            <Link to="/login"
              className="text-sm px-3 py-1 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition">
              Login
            </Link>
          )}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
