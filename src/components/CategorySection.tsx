
import React from "react";
import { Link } from "react-router-dom";
import { Category } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium mb-3">Browse Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Explore our collections, carefully curated for your space
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category.id}
              to={`/categories/${category.id}`}
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
                    <span className="mr-1">View all</span>
                    <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
