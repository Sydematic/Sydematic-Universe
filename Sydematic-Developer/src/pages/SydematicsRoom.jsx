// src/pages/SydematicsRoom.jsx
import React, { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sparkles } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

/**
 * GeometricMannequin
 * - Procedural mannequin built from simple 3D primitives (no model file).
 * - Neutral body proportions (gender-neutral / non-binary friendly).
 * - Smooth metallic lighting and subtle emissive tones.
 */
function ImportedMannequin() {
  const gltf = useLoader(GLTFLoader, '/modelgirl.glb');

  return (
    <primitive
      object={gltf.scene}
      scale= {[2.5, 2.5, 2.5]} // adjust if too big/small
      position={[0, 0, 0]}     // adjust vertically if needed
      rotation={[0, 0, 0]} // optional: face forward
    />
  );
}

function GeometricMannequin() {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
  });

  const materialProps = {
    color: "#c9b7ff",
    metalness: 0.6,
    roughness: 0.3,
    emissive: "#9b8cff",
    emissiveIntensity: 0.15,
  };

  return (
   <group ref={ref} position={[0, 0, 0]} scale={[0.4, 0.4, 0.4]}>

      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

    {/* Torso */}
<mesh position={[0, 0.75, 0]}>
  {/* narrower top + slightly shorter */}
  <cylinderGeometry args={[0.22, 0.28, 1.0, 32]} />
  <meshStandardMaterial {...materialProps} />
</mesh>

{/* Arms */}
<mesh position={[0.32, 1.0, 0]} rotation={[0, 0, -Math.PI / 14]}>
  <cylinderGeometry args={[0.06, 0.06, 0.85, 16]} />
  <meshStandardMaterial {...materialProps} />
</mesh>
<mesh position={[-0.32, 1.0, 0]} rotation={[0, 0, Math.PI / 14]}>
  <cylinderGeometry args={[0.06, 0.06, 0.85, 16]} />
  <meshStandardMaterial {...materialProps} />
</mesh>

{/* Hips */}
<mesh position={[0, 0.1, 0]}>
  {/* slimmer and smoother transition from torso */}
  <cylinderGeometry args={[0.18, 0.22, 0.35, 16]} />
  <meshStandardMaterial {...materialProps} />
</mesh>


      {/* Legs */}
      <mesh position={[0.15, -0.7, 0]} rotation={[0, 0, -0.03]}>
        <cylinderGeometry args={[0.1, 0.1, 1.2, 16]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <mesh position={[-0.15, -0.7, 0]} rotation={[0, 0, 0.03]}>
        <cylinderGeometry args={[0.1, 0.1, 1.2, 16]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    </group>
  );
}

/**
 * InnerScene
 * - Displays the imported 3D mannequin and background sparkles.
 * - Only the mannequin rotates on drag (not the room).
 */
function InnerScene() {
  const mannequinRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [rotationY, setRotationY] = useState(0);

  const handlePointerDown = () => setIsDragging(true);
  const handlePointerUp = () => setIsDragging(false);
  const handlePointerMove = (e) => {
    if (isDragging) {
      // Adjust drag sensitivity by multiplying movementX
      setRotationY((prev) => prev + e.movementX * 0.01);
    }
  };

  return (
    <group
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerUp}
    >
      {/* Lights */}
      <ambientLight intensity={5} />
      <directionalLight position={[3, 5, 2]} intensity={1} />

      <Suspense fallback={null}>
        {/* CLOSET ROOM */}
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

        {/* MANNEQUIN - Rotates on drag only */}
        <group
          ref={mannequinRef}
          position={[0, 0.5, 0]}
          scale={[1.5, 1.5, 1.5]}
          rotation={[0, rotationY, 0]}
        >
          <ImportedMannequin />
        </group>
      </Suspense>
    </group>
  );
}


/**
 * MannequinCanvas
 * - Canvas wrapper with optimized camera placement.
 */
function MannequinCanvas() {
  return (
    <Canvas camera={{ position: [0, 1.5, 7], fov: 40 }}>
      <InnerScene />
    </Canvas>
  );
}





export default function SydematicsRoom() {
  const navigate = useNavigate();

  const [activeOutfit, setActiveOutfit] = useState(null);
  const [activeAccessory, setActiveAccessory] = useState(null);
  const [downloadBusy, setDownloadBusy] = useState(false);

  const clothesData = useMemo(
    () => [
      {
        id: "neon",
        name: "Neon Streetwear",
        desc: "Cyber casual (transparent PNG)",
        src: "/outfits/neon-streetwear.png",
      },
      {
        id: "cozy",
        name: "Cozy Chic",
        desc: "Neutral comfy vibe",
        src: "/outfits/cozy-chic.png",
      },
      {
        id: "holo",
        name: "Holographic Fit",
        desc: "Reflective future look",
        src: "/outfits/holographic-fit.png",
      },
      {
        id: "mono",
        name: "Minimal Monochrome",
        desc: "Sleek all-black silhouette",
        src: "/outfits/minimal-monochrome.png",
      },
    ],
    []
  );

  const clearOutfits = () => {
    setActiveOutfit(null);
    setActiveAccessory(null);
  };

  const downloadScreenshot = async () => {
    try {
      setDownloadBusy(true);
      const el = document.getElementById("mannequin-stage");
      if (!el) return;
      const canvas = el.querySelector("canvas");
      if (!canvas) {
        alert("No WebGL canvas found — is the model still loading?");
        return;
      }

      const tmp = document.createElement("canvas");
      tmp.width = canvas.width;
      tmp.height = canvas.height;
      const ctx = tmp.getContext("2d");

      ctx.drawImage(canvas, 0, 0);

      const drawImg = async (src) => {
        if (!src) return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        await img.decode();
        ctx.drawImage(img, 0, 0, tmp.width, tmp.height);
      };

      if (activeOutfit) await drawImg(activeOutfit);
      if (activeAccessory) await drawImg(activeAccessory);

      const link = document.createElement("a");
      link.download = "sydematic-look.png";
      link.href = tmp.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error(err);
      alert("Could not create screenshot. Check console.");
    } finally {
      setDownloadBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10 text-foreground flex flex-col items-center pt-24 relative overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-primary/20 py-4 px-8 flex justify-between items-center">
        <button
          onClick={() => navigate("/universe")}
          className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          ← Back to Universe
        </button>
        <h1 className="text-3xl font-semibold bg-gradient-accent bg-clip-text text-transparent">
          Sydematic’s Room 👗
        </h1>
      </header>

      <div className="text-center mt-24 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Fashion, Aesthetics & Expression
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Click an outfit to try it on the starry mannequin. Layers stack and you
          can download your look.
        </p>
      </div>

<div
  id="mannequin-stage"
  className="relative mt-8 w-full h-screen bg-card/10 border border-primary/20 rounded-2xl overflow-hidden"
>
  <div className="absolute inset-0">
    <MannequinCanvas />
  </div>


        {activeOutfit && (
          <img
            src={activeOutfit}
            alt="active outfit"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
        )}
        {activeAccessory && (
          <img
            src={activeAccessory}
            alt="active accessory"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
        )}
      </div>

      <div className="mt-10 w-full max-w-6xl px-6">
        <h3 className="text-2xl font-semibold mb-4">Wardrobe — Click to Try On</h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {clothesData.map((c) => (
            <div
              key={c.id}
              className="cursor-pointer rounded-lg overflow-hidden border border-primary/20 bg-card/20 hover:scale-105 transition-transform"
              onClick={() => setActiveOutfit(c.src)}
            >
              <img src={c.src} alt={c.name} className="w-full h-44 object-cover" />
              <div className="p-3">
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-muted-foreground">{c.desc}</div>
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <button
              className="px-4 py-2 rounded-md border border-primary/30 bg-background/30"
              onClick={() => setActiveAccessory("/outfits/mini-accessory.png")}
            >
              Add Accessory
            </button>

            <button
              className="px-4 py-2 rounded-md border border-primary/30 bg-background/30"
              onClick={() => clearOutfits()}
            >
              Clear Outfit
            </button>

            <button
              className="px-4 py-2 rounded-md border border-primary/30 bg-background/30"
              onClick={() => downloadScreenshot()}
              disabled={downloadBusy}
            >
              {downloadBusy ? "Preparing..." : "Download Look"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
