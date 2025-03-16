
import React, { useState, useRef, Suspense } from "react";
import { CameraOff, Camera, Smartphone, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PresentationControls, useGLTF, Environment, Stage } from "@react-three/drei";

interface ARViewerProps {
  productName: string;
  arModelUrl?: string;
  className?: string;
}

// Placeholder 3D model component
const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
};

// Fallback model based on product type
const FallbackModel = ({ productType }: { productType: string }) => {
  let modelUrl = "";
  
  switch (productType.toLowerCase()) {
    case "lighting":
      modelUrl = "/models/lamp.glb";
      break;
    case "furniture":
      modelUrl = "/models/chair.glb";
      break;
    case "kitchenware":
      modelUrl = "/models/coffee.glb";
      break;
    case "electronics":
      modelUrl = "/models/headphones.glb";
      break;
    case "home decor":
      modelUrl = "/models/clock.glb";
      break;
    case "smart home":
      modelUrl = "/models/plantpot.glb";
      break;
    default:
      modelUrl = "/models/placeholder.glb";
  }
  
  return <Model url={modelUrl} />;
};

const ARViewer: React.FC<ARViewerProps> = ({ 
  productName, 
  arModelUrl, 
  className 
}) => {
  const [isARMode, setIsARMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [productType, setProductType] = useState("furniture");
  
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

  const toggleRotation = () => {
    setIsRotating(!isRotating);
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
        <div className="aspect-video relative bg-gradient-to-br from-gray-800 to-gray-900">
          {/* 3D model viewer */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleRotation}
              className="text-white border-white/30 hover:bg-white/10 rounded-full"
              title={isRotating ? "Stop rotation" : "Start rotation"}
            >
              <RotateCw className={cn("h-4 w-4", isRotating && "animate-spin")} />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={exitARMode}
              className="text-white border-white/30 hover:bg-white/10"
            >
              Exit
            </Button>
          </div>
          
          <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
            <Suspense fallback={null}>
              <Stage environment="city" intensity={0.6}>
                <PresentationControls
                  global
                  rotation={[0, isRotating ? Math.sin(Date.now() * 0.001) * 0.2 : 0, 0]}
                  polar={[-0.1, 0.1]}
                  azimuth={[-1, 1]}
                  config={{ mass: 2, tension: 400 }}
                  snap={{ mass: 4, tension: 400 }}
                >
                  {arModelUrl ? (
                    <Model url={arModelUrl} />
                  ) : (
                    <FallbackModel productType={productType} />
                  )}
                </PresentationControls>
              </Stage>
              <Environment preset="city" />
            </Suspense>
            <OrbitControls makeDefault autoRotate={isRotating} autoRotateSpeed={1} />
          </Canvas>
          
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="text-white/70 text-sm">
              Click and drag to rotate • Scroll to zoom
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Preload models to avoid load times during interaction
useGLTF.preload("/models/lamp.glb");
useGLTF.preload("/models/chair.glb");
useGLTF.preload("/models/coffee.glb");
useGLTF.preload("/models/headphones.glb");
useGLTF.preload("/models/clock.glb");
useGLTF.preload("/models/plantpot.glb");
// Preload new models
useGLTF.preload("/models/bookshelf.glb");
useGLTF.preload("/models/floorlamp.glb");
useGLTF.preload("/models/coffeetable.glb");
useGLTF.preload("/models/kitchenscale.glb");
useGLTF.preload("/models/deskpad.glb");
useGLTF.preload("/models/pendant.glb");

export default ARViewer;
