
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-6 pt-32 pb-20">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="size-16 rounded-full bg-muted/30 flex items-center justify-center">
              <AlertCircle className="size-8 text-muted-foreground" />
            </div>
          </div>
          
          <h1 className="text-4xl font-medium mb-4">Page not found</h1>
          
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. The page might have been removed,
            renamed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/" className="flex items-center gap-2">
                <Home className="size-4" />
                Back to Home
              </Link>
            </Button>
            
            <Button variant="outline" asChild>
              <Link to="/products" className="flex items-center gap-2">
                <Search className="size-4" />
                Browse Products
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
