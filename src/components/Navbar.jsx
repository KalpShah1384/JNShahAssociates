import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LayoutDashboard } from "lucide-react";
import { supabase } from "../lib/supabase";
import Logo from "../assets/CA_logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Pages that have a dark background at the top
  // Booking uses a light background, so keep normal light-theme navbar there
  const isDarkPage = ["/knowledge-hub"].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      // Don't treat recovery sessions as "logged in" for the Navbar
      const isRecovery = session?.user?.amr?.some(
        (m) => m.method === "recovery",
      );
      setUser(isRecovery ? null : (session?.user ?? null));
    };

    checkSession();

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const isRecovery = session?.user?.amr?.some(
        (m) => m.method === "recovery",
      );
      setUser(isRecovery ? null : (session?.user ?? null));
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const textColorClass =
    !scrolled && isDarkPage ? "text-white" : "text-brand-navy";
  const logoColorClass =
    !scrolled && isDarkPage ? "text-white" : "text-brand-navy";
  const activeIconClass =
    !scrolled && isDarkPage ? "text-brand-ice" : "text-brand-primary";

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-xl py-2 border-b border-brand-ice shadow-sm" : "bg-transparent py-4 md:py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center min-h-[4rem] gap-y-4">
          <div className="flex items-center shrink-0">
            <Link
              to="/"
              className="flex flex-wrap items-center gap-2 sm:gap-3 group py-2 min-w-0"
            >
              <img
                src={Logo}
                alt="JN Shah Associates Logo"
                className="h-8 sm:h-10 md:h-12 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
              />
              <span
                style={{ fontFamily: "var(--font-trajan)" }}
                className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight flex flex-wrap items-center break-words min-w-0 transition-colors ${logoColorClass}`}
              >
                JN
                <span
                  className={`ml-1 transition-colors ${activeIconClass}`}
                >
                  Shah Associates
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <Link
              to="/"
              className={`${textColorClass} font-extrabold text-sm uppercase tracking-widest hover:text-brand-primary transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${textColorClass} font-extrabold text-sm uppercase tracking-widest hover:text-brand-primary transition-colors`}
            >
              About
            </Link>
            <Link
              to="/services"
              className={`${textColorClass} font-extrabold text-sm uppercase tracking-widest hover:text-brand-primary transition-colors`}
            >
              Services
            </Link>
            <Link
              to="/book"
              className="bg-brand-navy hover:bg-brand-primary text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 shadow-brand-navy/20"
            >
              Free Consultation
            </Link>
            <Link
              to={user ? "/dashboard" : "/login"}
              className={`flex items-center space-x-2 ${textColorClass} hover:text-brand-primary font-extrabold text-sm uppercase tracking-widest transition-colors`}
            >
              {user ? (
                <LayoutDashboard className="w-5 h-5" />
              ) : (
                <User className="w-5 h-5" />
              )}
              <span>{user ? "Dashboard" : "Login / Sign Up"}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${textColorClass} hover:text-brand-primary p-2 transition-colors`}
            >
              {isOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass absolute top-full left-0 w-full border-t border-brand-ice shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-6 pt-6 pb-10 space-y-4 bg-white/95 backdrop-blur-2xl">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-4 text-brand-navy font-black text-sm uppercase tracking-widest hover:bg-brand-ice/30 rounded-2xl transition-all"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-4 text-brand-navy font-black text-sm uppercase tracking-widest hover:bg-brand-ice/30 rounded-2xl transition-all"
            >
              About
            </Link>
            <Link
              to="/services"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-4 text-brand-navy font-black text-sm uppercase tracking-widest hover:bg-brand-ice/30 rounded-2xl transition-all"
            >
              Services
            </Link>
            <Link
              to="/book"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-5 bg-brand-primary text-white font-black text-center text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-brand-primary/20"
            >
              Free Consultation
            </Link>
            <Link
              to={user ? "/dashboard" : "/login"}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center space-x-2 px-4 py-4 text-brand-navy font-black text-sm uppercase tracking-widest hover:bg-brand-ice/30 rounded-2xl transition-all"
            >
              {user ? (
                <LayoutDashboard className="w-5 h-5" />
              ) : (
                <User className="w-5 h-5" />
              )}
              <span>{user ? "Dashboard" : "Login / Sign Up"}</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
