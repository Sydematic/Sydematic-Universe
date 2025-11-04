// src/pages/SydematicsRoom.jsx
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SydematicsRoom = () => {
  const navigate = useNavigate();
  const mannequinRef = useRef(null);

  useEffect(() => {
    // Placeholder animation logic (later replaced by 3D Three.js mannequin)
    const mannequin = mannequinRef.current;
    let angle = 0;
    const rotate = () => {
      angle += 0.5;
      mannequin.style.transform = `rotateY(${angle}deg)`;
      requestAnimationFrame(rotate);
    };
    rotate();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10 text-foreground flex flex-col items-center pt-24 relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-primary/20 py-4 px-8 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          ← Back to Universe
        </button>
        <h1 className="text-3xl font-semibold bg-gradient-accent bg-clip-text text-transparent">
          Sydematic’s Room 👗
        </h1>
      </header>

      {/* Intro */}
      <div className="text-center mt-24 space-y-4">
        <h2 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
          Fashion, Aesthetics & Expression
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          A digital wardrobe inspired by creativity and personal style.
          Here you’ll find outfit inspirations, avatar looks, and future
          features like 3D mannequins and virtual try-ons.
        </p>
      </div>

      {/* Mannequin Placeholder */}
      <div className="mt-12 w-[250px] h-[400px] bg-card/30 border border-primary/30 rounded-2xl flex items-center justify-center backdrop-blur-lg shadow-lg hover:scale-105 transition-transform">
        <div
          ref={mannequinRef}
          className="w-24 h-64 bg-gradient-to-b from-primary/40 to-accent/40 rounded-full"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.5s ease",
          }}
        />
      </div>

      {/* Outfit Grid (Static Mockup for Now) */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 px-8 max-w-5xl">
        {[
          { title: "Avatar Look #1", desc: "Casual futuristic style" },
          { title: "Inspo Board", desc: "Neon core meets cozy vibes" },
          { title: "Style of the Day", desc: "Reflective and radiant" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-background/30 border border-primary/20 rounded-xl p-6 text-center hover:bg-primary/10 transition-all backdrop-blur-md"
          >
            <div className="w-full h-40 bg-gradient-to-tr from-accent/30 to-primary/30 rounded-lg mb-4" />
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex gap-4">
        <button className="bg-primary/20 border border-primary/40 px-6 py-3 rounded-lg font-medium hover:bg-primary/30 transition-all">
          Try On Feature (Coming Soon)
        </button>
        <button className="bg-accent/20 border border-accent/40 px-6 py-3 rounded-lg font-medium hover:bg-accent/30 transition-all">
          Create Outfit
        </button>
      </div>
    </div>
  );
};

export default SydematicsRoom;
