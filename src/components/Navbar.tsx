import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6",
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-medium tracking-tight transition-opacity hover:opacity-80"
          aria-label="EcommerceAura Home"
        >
          ecommerceaura
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/products" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname.includes('/products') ? "text-primary" : "text-foreground"
            )}
          >
            Shop
          </Link>
          <Link 
            to="/categories" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === '/categories' ? "text-primary" : "text-foreground"
            )}
          >
            Categories
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSearch}
            className="w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          <Link 
            to="/cart" 
            className="w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors relative"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          <Link 
            to="/account" 
            className="hidden md:flex w-10 h-10 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label="User account"
          >
            <User size={20} />
          </Link>
          
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      <div 
        className={cn(
          "absolute top-full left-0 w-full bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden",
          isSearchOpen ? "h-16 opacity-100" : "h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 border-b border-muted focus:border-primary focus:outline-none transition-colors"
              autoFocus={isSearchOpen}
            />
          </div>
        </div>
      </div>
      
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out pt-20",
          isMobileMenuOpen ? "transform translate-y-0" : "transform -translate-y-full"
        )}
      >
        <nav className="container mx-auto px-6 py-8 flex flex-col space-y-6">
          <Link 
            to="/products" 
            className="text-2xl font-medium hover:text-primary transition-colors"
          >
            Shop
          </Link>
          <Link 
            to="/categories" 
            className="text-2xl font-medium hover:text-primary transition-colors"
          >
            Categories
          </Link>
          <Link 
            to="/account" 
            className="text-2xl font-medium hover:text-primary transition-colors"
          >
            Account
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
