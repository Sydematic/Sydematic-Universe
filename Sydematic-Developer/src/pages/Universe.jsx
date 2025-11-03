// src/pages/Universe.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Universe = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground">
      {/* Aurora Background Animation */}
      <div className="absolute inset-0 bg-gradient-aurora opacity-20 animate-aurora-dance" />
      
      {/* Floating Orbs / Stars */}
      <div className="absolute top-10 left-20 w-24 h-24 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-10 right-32 w-16 h-16 rounded-full bg-accent/10 blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Header / DVD Navigator */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-primary/20 py-4 px-8 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          Sydematic
        </button>
        <nav className="flex gap-6 text-sm font-medium">
          <button className="hover:text-primary transition-colors">Closet</button>
          <button className="hover:text-primary transition-colors">Game Room</button>
          <button className="hover:text-primary transition-colors">Car Shop</button>
          <button className="hover:text-primary transition-colors">Movie Room</button>
          <button className="hover:text-primary transition-colors">Math Room</button>
        </nav>
      </header>

      {/* Main Universe Container */}
      <main className="pt-32 flex flex-col items-center justify-center text-center space-y-10 relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-slide-up">
          Welcome to Sydematic Universe 🌌
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Customize your avatar, explore cosmic rooms, and experience the worlds that inspire Sydematic.
        </p>

        {/* Avatar Section Placeholder */}
        <div className="w-[300px] h-[400px] bg-card/20 border border-primary/30 rounded-2xl backdrop-blur-lg flex items-center justify-center text-muted-foreground">
          <p>👩🏽‍🚀 Avatar Customizer Coming Soon...</p>
        </div>

        {/* DVD Navigator UI */}
        <div className="mt-12 bg-card/30 border border-primary/30 rounded-xl p-6 backdrop-blur-lg w-[90%] max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-accent bg-clip-text text-transparent">
            Select Your Destination
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {["Play Preview", "Sydematic’s Closet", "Game Room", "Car Shop", "Movie Room", "Math Room"].map((item) => (
              <button
                key={item}
                className="bg-background/40 border border-primary/30 rounded-lg py-3 px-4 text-sm font-medium hover:bg-primary/10 hover:scale-105 transition-all cursor-project"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Universe;
