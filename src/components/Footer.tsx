
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Github, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="text-xl font-medium tracking-tight">
              ecommerceaura
            </Link>
            <p className="mt-4 text-white/60 text-sm">
              Experience a new dimension of online shopping with our augmented reality technology.
            </p>
            <div className="mt-6 flex items-center space-x-4">
              <a 
                href="#" 
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Github"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-lg font-medium mb-5">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/products" 
                  className="text-white/60 hover:text-white transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/categories/furniture" 
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Furniture
                </Link>
              </li>
              <li>
                <Link 
                  to="/categories/lighting" 
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Lighting
                </Link>
              </li>
              <li>
                <Link 
                  to="/categories/kitchenware" 
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Kitchenware
                </Link>
              </li>
              <li>
                <Link 
                  to="/categories/electronics" 
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Electronics
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-medium mb-5">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-white/60 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-white/60 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium mb-5">Newsletter</h3>
            <p className="text-white/60 text-sm mb-4">
              Subscribe to our newsletter for the latest products and exclusive offers.
            </p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="rounded-l-md rounded-r-none border-white/20 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:border-white/30"
              />
              <Button 
                type="submit" 
                className="rounded-l-none"
              >
                Subscribe
              </Button>
            </div>
            <p className="mt-4 text-white/40 text-xs">
              By subscribing you agree to our Privacy Policy.
            </p>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/40 text-sm">
            &copy; {currentYear} ecommerceaura. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-6">
            <Link 
              to="/privacy" 
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              Terms
            </Link>
            <Link 
              to="/cookie-policy" 
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              Cookies
            </Link>
            <Link 
              to="/contact" 
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
