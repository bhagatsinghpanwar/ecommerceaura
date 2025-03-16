
import React from "react";
import { Link } from "react-router-dom";
import { categories } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero section */}
      <div className="pt-32 pb-10 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-medium mb-4">Browse Categories</h1>
          <p className="text-muted-foreground max-w-2xl">
            Explore our wide range of categories to find exactly what you're looking for.
          </p>
        </div>
      </div>
      
      {/* Main content */}
      <main className="flex-grow py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link 
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group relative overflow-hidden rounded-xl aspect-[3/2] animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image background */}
                <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/30 transition-all duration-300">
                  {/* Overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
                />
                
                {/* Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-medium text-white mb-1">{category.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/80">{category.productCount} products</p>
                    <div className="flex items-center text-white/80 text-sm group-hover:text-white transition-colors">
                      <span className="mr-1">View products</span>
                      <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Featured Category Banner */}
          <div className="mt-20">
            <div className="relative overflow-hidden rounded-2xl h-80">
              <div className="absolute inset-0 bg-black/40 z-10">
                {/* Overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
              </div>
              
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="Featured Category"
                className="w-full h-full object-cover"
              />
              
              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center p-10">
                <div className="max-w-lg">
                  <h2 className="text-3xl font-medium text-white mb-4">Technology Collection</h2>
                  <p className="text-white/80 mb-6">
                    Discover our latest tech products with immersive AR experiences
                  </p>
                  <Link 
                    to="/products?category=tech"
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-foreground hover:bg-primary hover:text-white transition-colors"
                  >
                    Explore Collection
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
