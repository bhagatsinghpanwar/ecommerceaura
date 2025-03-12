
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || !imageRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the container
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      
      // Subtle parallax effect (max 15px movement)
      const moveX = (x - 0.5) * 15;
      const moveY = (y - 0.5) * 15;
      
      // Apply transform with perspective
      imageRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.05)`;
    };
    
    const handleMouseLeave = () => {
      if (imageRef.current) {
        // Smooth reset when mouse leaves
        imageRef.current.style.transform = 'translate3d(0, 0, 0) scale(1)';
      }
    };
    
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      heroElement.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
        heroElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Background image with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2670&auto=format&fit=crop"
          alt="Modern interior"
          className="w-full h-full object-cover transition-transform duration-300 ease-out"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center">
        <div className="animate-fade-in-up">
          <p className="text-white/80 text-sm uppercase tracking-wider mb-3">
            Design meets innovation
          </p>
          <h1 className="text-white font-medium mb-6">
            Experience your space <br />
            before you commit
          </h1>
          <p className="text-white/80 max-w-xl mx-auto mb-8 text-balance">
            Our augmented reality technology allows you to visualize products in your space before purchasing. 
            Experience a new dimension of online shopping.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="rounded-full px-8 bg-white text-black hover:bg-white/90 transition-all duration-300 group">
              <Link to="/products">
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8 border-white text-white hover:bg-white/10 transition-all duration-300">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-fade-in">
        <p className="text-white/60 text-sm mb-2">Scroll to explore</p>
        <div className="h-12 w-0.5 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-white animate-[pulse_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
