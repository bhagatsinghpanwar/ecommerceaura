
import React from "react";
import { Product } from "@/lib/data";
import ProductCard from "./ProductCard";

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  products,
  title = "Featured Products",
  subtitle = "Discover our carefully selected products"
}) => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium mb-3">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} priority={index < 3} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
