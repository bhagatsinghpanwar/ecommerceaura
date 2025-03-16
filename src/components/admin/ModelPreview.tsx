
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PresentationControls, useGLTF, Environment, Stage } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

interface ModelPreviewProps {
  modelUrl: string;
}

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
};

const ModelPreview: React.FC<ModelPreviewProps> = ({ modelUrl }) => {
  const [isRotating, setIsRotating] = React.useState(true);
  
  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 right-4 z-10">
        <Button 
          variant="outline" 
          size="icon"
          onClick={toggleRotation}
          className="text-white border-white/30 hover:bg-white/10 rounded-full"
          title={isRotating ? "Stop rotation" : "Start rotation"}
        >
          <RotateCw className={`h-4 w-4 ${isRotating ? 'animate-spin' : ''}`} />
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
              <Model url={modelUrl} />
            </PresentationControls>
          </Stage>
          <Environment preset="city" />
        </Suspense>
        <OrbitControls makeDefault autoRotate={isRotating} autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
};

export default ModelPreview;
