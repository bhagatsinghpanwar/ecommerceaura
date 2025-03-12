
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import { products } from "@/lib/data";
import { ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get featured products (first 6)
  const featuredProducts = products.slice(0, 6);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products */}
      <FeaturedProducts 
        products={featuredProducts} 
        title="Curated Collection"
        subtitle="Discover our selection of premium products, ready to be visualized in your space"
      />
      
      {/* AR Feature Highlight */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <div className="max-w-md space-y-6">
                <div className="inline-block bg-primary/10 px-4 py-1.5 rounded-full text-primary text-sm font-medium">
                  Augmented Reality
                </div>
                
                <h2 className="text-3xl font-medium">
                  See products in your space before you buy
                </h2>
                
                <p className="text-muted-foreground">
                  Our augmented reality technology lets you visualize how products will look 
                  and fit in your own environment, giving you confidence in your purchase decisions.
                </p>
                
                <Button asChild className="rounded-full group">
                  <Link to="/products">
                    Try AR Experience
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -left-3 -top-3 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                <div className="absolute -right-3 -bottom-3 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
                
                <img 
                  src="https://images.unsplash.com/photo-1633414704928-12f3cc5d1801?q=80&w=2574&auto=format&fit=crop" 
                  alt="AR Demo" 
                  className="rounded-xl shadow-2xl relative z-10"
                />
                
                <div className="absolute top-5 right-5 transform rotate-6 bg-white p-3 rounded-lg shadow-lg z-20 animate-float">
                  <img 
                    src="https://images.unsplash.com/photo-1592078615290-033ee584dd43?q=80&w=2160&auto=format&fit=crop" 
                    alt="Chair preview" 
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium mb-3">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing an exceptional shopping experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-muted/30">
              <div className="bg-primary/10 p-4 rounded-full mb-6">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Free Shipping</h3>
              <p className="text-muted-foreground">
                Enjoy free shipping on all orders over $50. We deliver to doorsteps nationwide.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-muted/30">
              <div className="bg-primary/10 p-4 rounded-full mb-6">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Secure Payments</h3>
              <p className="text-muted-foreground">
                Shop with confidence using our secure payment gateway and data encryption.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-muted/30">
              <div className="bg-primary/10 p-4 rounded-full mb-6">
                <RotateCcw className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Easy Returns</h3>
              <p className="text-muted-foreground">
                Not satisfied? Return within 30 days for a full refund, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-medium mb-3">Join Our Newsletter</h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter and be the first to know about new products, 
            exclusive offers, and AR innovations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
            />
            <Button className="rounded-full">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
