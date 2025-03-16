
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Eye, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative rounded-xl overflow-hidden bg-muted/30 aspect-[4/5] transition-all duration-300 ease-out">
          <div className={cn(
            "absolute inset-0 bg-muted/10 z-10 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <div className="absolute bottom-4 right-4 z-20 flex gap-2">
              <Button 
                onClick={handleAddToCart}
                size="icon"
                variant="secondary"
                className="rounded-full size-10 shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out"
                aria-label="Add to cart"
              >
                <ShoppingCart className="size-4" />
              </Button>
              <Button 
                size="icon"
                variant="secondary"
                className="rounded-full size-10 shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out delay-75"
                aria-label="Quick view"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Link to={`/product/${product.id}`} onClick={(e) => e.stopPropagation()}>
                  <Eye className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Product Image with lazy loading */}
          <div className="relative w-full h-full">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              </div>
            )}
            <img
              src={product.images[0]}
              alt={product.name}
              loading={priority ? "eager" : "lazy"}
              onLoad={() => setImageLoaded(true)}
              className={cn(
                "w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform",
                isHovered ? "scale-110" : "scale-100",
                !imageLoaded && "opacity-0"
              )}
            />
          </div>
          
          {/* AR indicator */}
          {product.arModel && (
            <div className="absolute top-4 left-4 z-20">
              <div className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                AR View
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium truncate">{product.name}</h3>
            <p className="font-medium">${product.price.toFixed(2)}</p>
          </div>
          <p className="text-sm text-muted-foreground truncate">{product.category}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
