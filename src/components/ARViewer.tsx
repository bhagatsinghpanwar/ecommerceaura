
import React, { useState } from "react";
import { CameraOff, Camera, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ARViewerProps {
  productName: string;
  arModelUrl?: string;
  className?: string;
}

const ARViewer: React.FC<ARViewerProps> = ({ 
  productName, 
  arModelUrl, 
  className 
}) => {
  const [isARMode, setIsARMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const startARExperience = () => {
    setIsLoading(true);
    // Simulating AR loading
    setTimeout(() => {
      setIsARMode(true);
      setIsLoading(false);
    }, 1500);
  };
  
  const exitARMode = () => {
    setIsARMode(false);
  };

  if (!arModelUrl) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center p-6 text-center rounded-lg border border-dashed",
        className
      )}>
        <CameraOff className="h-10 w-10 text-muted-foreground mb-3" />
        <p className="text-muted-foreground">
          AR view is not available for this product.
        </p>
      </div>
    );
  }

  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg bg-black",
      className
    )}>
      {!isARMode ? (
        <div className="aspect-video relative flex flex-col items-center justify-center p-6 text-center">
          <img 
            src="https://images.unsplash.com/photo-1586024486164-ce9b3d87e09f?q=80&w=2576&auto=format&fit=crop" 
            alt="AR preview"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          
          <div className="relative z-10">
            <Smartphone className="h-12 w-12 text-white mx-auto mb-4" />
            <h3 className="text-white text-xl font-medium mb-2">View in your space</h3>
            <p className="text-white/70 max-w-md mx-auto mb-6">
              Use augmented reality to see {productName} in your environment
            </p>
            
            <Button
              onClick={startARExperience}
              className="rounded-full bg-white text-black hover:bg-white/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                  Initializing AR...
                </>
              ) : (
                <>
                  <Camera className="mr-2 h-4 w-4" />
                  Launch AR Experience
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="aspect-video relative bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          {/* This would be replaced with actual AR implementation */}
          <div className="text-center p-6 max-w-md">
            <div className="mb-4 animate-float">
              <img 
                src="https://images.unsplash.com/photo-1586024486164-ce9b3d87e09f?q=80&w=2576&auto=format&fit=crop"
                alt="AR simulation"
                className="max-h-48 mx-auto rounded-lg"
              />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">AR Mode</h3>
            <p className="text-white/70 mb-4">
              This is a placeholder for the AR experience. In a real implementation, 
              you would see the product in your actual environment.
            </p>
            <Button 
              variant="outline" 
              onClick={exitARMode}
              className="text-white border-white/30 hover:bg-white/10"
            >
              Exit AR Mode
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARViewer;
