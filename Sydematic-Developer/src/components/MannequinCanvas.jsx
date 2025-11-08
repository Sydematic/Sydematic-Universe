// src/components/MannequinCanvas.jsx
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

/* ────────────────────────────────
   ImportedMannequin — Loads GLB model dynamically
──────────────────────────────── */
function ImportedMannequin({ modelPath }) {
  const gltf = useLoader(GLTFLoader, modelPath);
  return <primitive object={gltf.scene} scale={[2.5, 2.5, 2.5]} position={[0, 0, 0]} />;
}

/* ────────────────────────────────
   InnerScene — Closet Room + Mannequin Logic
──────────────────────────────── */
function InnerScene({ modelPath, isAutoRotating }) {
  const mannequinRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [rotationY, setRotationY] = useState(0);
  const lastX = useRef(0);

  // Manual drag / touch rotation handler
  const handlePointerDown = (e) => {
    setIsDragging(true);
    lastX.current = e.clientX || e.touches?.[0]?.clientX || 0;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX || e.touches?.[0]?.clientX || 0;
    const deltaX = x - lastX.current;
    lastX.current = x;
    setRotationY((prev) => prev + deltaX * 0.01); // manual rotation speed
  };

  // Automatic rotation (if enabled)
  useFrame((_, delta) => {
    if (isAutoRotating && !isDragging) {
      setRotationY((prev) => prev + delta * 0.8);
    }
    if (mannequinRef.current) {
      mannequinRef.current.rotation.y = rotationY;
    }
  });

  return (
    <group
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      {/* Lights */}
      <ambientLight intensity={4.5} />
      <directionalLight position={[3, 5, 2]} intensity={1.2} />

      <Suspense fallback={null}>
        {/* Closet Environment */}
        <group>
          {/* Floor */}
          <mesh position={[0, -1.5, 0]}>
            <boxGeometry args={[6, 0.1, 4]} />
            <meshStandardMaterial color="#d6d6d6" metalness={0.3} roughness={0.6} />
          </mesh>
          {/* Back Wall */}
          <mesh position={[0, 1, -2]}>
            <boxGeometry args={[6, 4, 0.1]} />
            <meshStandardMaterial color="#efefef" metalness={0.2} roughness={0.8} />
          </mesh>
          {/* Left Wall */}
          <mesh position={[-3, 1, 0]}>
            <boxGeometry args={[0.1, 4, 4]} />
            <meshStandardMaterial color="#f3f3f3" />
          </mesh>
          {/* Right Wall */}
          <mesh position={[3, 1, 0]}>
            <boxGeometry args={[0.1, 4, 4]} />
            <meshStandardMaterial color="#f3f3f3" />
          </mesh>
        </group>

        {/* Mannequin (this is what rotates) */}
        <group ref={mannequinRef} position={[0, 0.5, 0]} scale={[1.5, 1.5, 1.5]}>
          <ImportedMannequin modelPath={modelPath} />
        </group>
      </Suspense>
    </group>
  );
}

/* ────────────────────────────────
   MannequinCanvas — Canvas Container + Controls
──────────────────────────────── */
export default function MannequinCanvas() {
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [modelPath, setModelPath] = useState("/modelgirl.glb");

  const toggleAutoRotate = () => setIsAutoRotating((p) => !p);
  const toggleModel = () =>
    setModelPath((p) => (p === "/modelgirl.glb" ? "/modelboy.glb" : "/modelgirl.glb"));

  return (
    <div className="relative w-full h-[600px] sm:h-[80vh] bg-card/10 border border-primary/20 rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [0, 1.8, 7], fov: 40 }}>
        <InnerScene modelPath={modelPath} isAutoRotating={isAutoRotating} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>

      {/* UI Buttons (top-right corner) */}
      <div className="absolute top-3 right-3 flex flex-col sm:flex-row gap-2 sm:gap-3 z-10">
        <button
          onClick={toggleAutoRotate}
          className="bg-primary/70 hover:bg-primary/90 text-white px-3 py-2 rounded-lg text-xs sm:text-sm shadow-md transition"
        >
          {isAutoRotating ? "Stop Rotate" : "Auto Rotate"}
        </button>

        <button
          onClick={toggleModel}
          className="bg-secondary/70 hover:bg-secondary/90 text-white px-3 py-2 rounded-lg text-xs sm:text-sm shadow-md transition"
        >
          Change Body
        </button>
      </div>
    </div>
  );
}
