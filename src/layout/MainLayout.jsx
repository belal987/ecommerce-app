import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useThemeStore from "../store/useThemeStore";
import useAuthStore from "../store/useAuthStore";
import { useLanguage } from "../context/LanguageContext";
import { ShoppingBag, User, Globe, Moon, Sun, LogOut } from "lucide-react";

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
    <div className={`min-h-screen transition-colors duration-500 ${theme === "dark" ? "bg-[#111] text-white" : "bg-[#FDFDFB] text-[#1A1A1A]"}`}>
      {/* Top Banner */}
      <div className={`text-center py-2 text-[10px] uppercase tracking-[0.2em] font-medium border-b ${theme === "dark" ? "bg-black border-white/10" : "bg-[#1A1A1A] text-white border-transparent"}`}>
        Free shipping over $150 • Sustainable Materials • 30 Day Returns
      </div>

      <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${theme === "dark" ? "bg-black/80 border-white/10" : "bg-white/80 border-black/5"} backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl serif tracking-tighter hover:opacity-70 transition-opacity">
            maison<span className="text-[var(--accent-color)]">.</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: "Shop All", path: "/shop" },
              { label: "Women", path: "/women" },
              { label: "Men", path: "/men" },
              { label: "Home", path: "/home-collection" },
              { label: "Sale", path: "/sale" },
            ].map((item) => (
              <Link key={item.label} to={item.path} className="text-[11px] uppercase tracking-widest font-semibold hover:text-[var(--accent-color)] transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button onClick={toggleLanguage} className="hover:opacity-60 transition-opacity">
              <Globe className="w-4 h-4" />
            </button>
            <button onClick={toggleTheme} className="hover:opacity-60 transition-opacity">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            {token ? (
              <button onClick={handleLogout} className="hover:text-red-500 transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <Link to="/login" className="hover:opacity-60 transition-opacity">
                <User className="w-4 h-4" />
              </Link>
            )}

            <Link to="/cart" className="relative group">
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[var(--accent-color)] text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100-300px)]">
        <Outlet />
      </main>

      <footer className={`pt-24 pb-12 border-t mt-20 ${theme === "dark" ? "bg-black border-white/10" : "bg-[#F7F6F2] border-black/5"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <h3 className="serif text-xl">maison</h3>
              <p className="text-xs leading-relaxed text-[#6B6B6B] max-w-xs">
                Timeless fashion made from sustainable materials. Designed with intention, crafted with care.
              </p>
            </div>
            
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8">Shop</h4>
              <ul className="space-y-4 text-xs text-[#6B6B6B]">
                {["Women", "Men", "Home", "Accessories", "Sale"].map(l => <li key={l}><Link to="/" className="hover:text-black transition-colors">{l}</Link></li>)}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8">Company</h4>
              <ul className="space-y-4 text-xs text-[#6B6B6B]">
                {["Our Story", "Sustainability", "Careers", "Press"].map(l => <li key={l}><Link to="/" className="hover:text-black transition-colors">{l}</Link></li>)}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8">Help</h4>
              <ul className="space-y-4 text-xs text-[#6B6B6B]">
                {["Shipping", "Returns", "Sizing Guide", "Contact Us"].map(l => <li key={l}><Link to="/" className="hover:text-black transition-colors">{l}</Link></li>)}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-black/5 flex flex-col md:row justify-between items-center gap-4 text-[10px] text-[#999] uppercase tracking-widest font-medium">
            <p>© 2026 Maison App. All rights reserved.</p>
            <div className="flex gap-8">
              <Link to="/" className="hover:text-black transition-colors">Instagram</Link>
              <Link to="/" className="hover:text-black transition-colors">Pinterest</Link>
              <Link to="/" className="hover:text-black transition-colors">Twitter</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
