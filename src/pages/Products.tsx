
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Products = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState("featured");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Filter and sort products
  const filteredProducts = products
    .filter(product => selectedCategory ? product.category === selectedCategory : true)
    .filter(product => product.price >= priceRange[0] && product.price <= priceRange[1])
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0; // featured - keep original order
      }
    });
    
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };
    
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Page header */}
      <div className="pt-32 pb-10 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-medium mb-4">Shop All Products</h1>
          <p className="text-muted-foreground max-w-2xl">
            Browse our collection of premium products, with AR visualization available for selected items.
          </p>
        </div>
      </div>
      
      <div className="flex-1 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32 space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Categories</h3>
                  <div className="space-y-2">
                    <button 
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md transition-colors",
                        selectedCategory === null ? "bg-primary text-white" : "hover:bg-muted"
                      )}
                      onClick={() => setSelectedCategory(null)}
                    >
                      All Products
                    </button>
                    
                    {categories.map(category => (
                      <button 
                        key={category.id}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md transition-colors",
                          selectedCategory === category.id ? "bg-primary text-white" : "hover:bg-muted"
                        )}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Price Range</h3>
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-6"
                  />
                  <div className="flex items-center justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Sort By</h3>
                  <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </aside>
            
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} products
              </p>
              
              <button 
                onClick={toggleMobileFilter}
                className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-md"
              >
                <Filter size={16} />
                <span>Filters</span>
              </button>
            </div>
            
            {/* Mobile Filters */}
            <div 
              className={cn(
                "fixed inset-0 z-50 lg:hidden bg-white transform transition-transform duration-300 ease-in-out",
                isMobileFilterOpen ? "translate-x-0" : "translate-x-full"
              )}
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-lg font-medium">Filters</h2>
                <button 
                  onClick={toggleMobileFilter}
                  className="p-2 rounded-full hover:bg-muted"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-80px)]">
                <div>
                  <h3 className="text-lg font-medium mb-4">Categories</h3>
                  <div className="space-y-2">
                    <button 
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md transition-colors",
                        selectedCategory === null ? "bg-primary text-white" : "hover:bg-muted"
                      )}
                      onClick={() => setSelectedCategory(null)}
                    >
                      All Products
                    </button>
                    
                    {categories.map(category => (
                      <button 
                        key={category.id}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md transition-colors",
                          selectedCategory === category.id ? "bg-primary text-white" : "hover:bg-muted"
                        )}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Price Range</h3>
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-6"
                  />
                  <div className="flex items-center justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Sort By</h3>
                  <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <button 
                    onClick={() => {
                      setSelectedCategory(null);
                      setPriceRange([0, 1000]);
                    }}
                    className="text-primary hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
