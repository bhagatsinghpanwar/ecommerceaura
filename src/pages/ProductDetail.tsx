
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "@/lib/data";
import { ArrowLeft, ShoppingCart, Star, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ARViewer from "@/components/ARViewer";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showARViewer, setShowARViewer] = useState(false);
  
  // Find product by id
  const product = products.find(p => p.id === id);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-medium mb-4">Product not found</h1>
        <Button asChild>
          <Link to="/">Go back home</Link>
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart`);
  };
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const toggleARViewer = () => {
    setShowARViewer(!showARViewer);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {showARViewer ? (
                <ARViewer 
                  productName={product.name}
                  arModelUrl={product.arModel}
                  className="aspect-square rounded-xl overflow-hidden bg-muted/30"
                />
              ) : (
                <div className="aspect-square rounded-xl overflow-hidden bg-muted/30">
                  <img 
                    src={product.images[selectedImage]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Image Thumbnails */}
              {!showARViewer && product.images.length > 1 && (
                <div className="flex gap-4 overflow-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative rounded-lg overflow-hidden w-20 h-20 flex-shrink-0 border-2 transition-all ${
                        selectedImage === index ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} - view ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
              
              {/* AR Viewer Button */}
              {product.arModel && (
                <div className="pt-2">
                  <Button 
                    variant={showARViewer ? "default" : "outline"} 
                    className="w-full"
                    onClick={toggleARViewer}
                  >
                    {showARViewer ? "View Photos" : "View in AR"}
                  </Button>
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-2xl font-medium">${product.price.toFixed(2)}</p>
                  <div className="text-sm text-muted-foreground">{product.stock > 0 ? "In Stock" : "Out of Stock"}</div>
                </div>
                
                {/* Ratings */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
                </div>
                
                <p className="text-muted-foreground">{product.description}</p>
              </div>
              
              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-3">Color</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === color.name ? "ring-2 ring-primary ring-offset-2" : "ring-0"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={`Select color: ${color.name}`}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-3">Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-16 px-4 py-2 rounded-md border ${
                          selectedSize === size 
                            ? "bg-primary text-primary-foreground border-primary" 
                            : "bg-background border-input hover:bg-muted/50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div>
                <h3 className="text-sm font-medium mb-3">Quantity</h3>
                <div className="flex items-center border border-input rounded-md w-32">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-50"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">{quantity}</div>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={handleAddToCart} 
                  className="flex-1"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="pt-8 border-t">
                  <h3 className="text-lg font-medium mb-4">Features</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-muted-foreground">{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
