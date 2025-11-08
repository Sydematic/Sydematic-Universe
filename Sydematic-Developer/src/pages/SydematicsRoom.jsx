// src/pages/SydematicsRoom.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MannequinCanvas from "../components/MannequinCanvas";

export default function SydematicsRoom() {
  const navigate = useNavigate();
  const [activeOutfit, setActiveOutfit] = useState(null);
  const [activeAccessory, setActiveAccessory] = useState(null);
  const [downloadBusy, setDownloadBusy] = useState(false);

  const clothesData = useMemo(
    () => [
      { id: "neon", name: "Neon Streetwear", desc: "Cyber casual (transparent PNG)", src: "/outfits/neon-streetwear.png" },
      { id: "cozy", name: "Cozy Chic", desc: "Neutral comfy vibe", src: "/outfits/cozy-chic.png" },
      { id: "holo", name: "Holographic Fit", desc: "Reflective future look", src: "/outfits/holographic-fit.png" },
      { id: "mono", name: "Minimal Monochrome", desc: "Sleek all-black silhouette", src: "/outfits/minimal-monochrome.png" },
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
      {/* Header */}
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

      {/* Title */}
      <div className="text-center mt-24 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Fashion, Aesthetics & Expression
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Click an outfit to try it on the starry mannequin. Layers stack and you can download your look.
        </p>
      </div>

      {/* Mannequin Stage */}
      <div
        id="mannequin-stage"
        className="relative mt-8 w-full h-[600px] md:h-[700px] bg-card/10 border border-primary/20 rounded-2xl overflow-hidden"
      >
        <MannequinCanvas />

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

      {/* Wardrobe */}
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
              onClick={clearOutfits}
            >
              Clear Outfit
            </button>
            <button
              className="px-4 py-2 rounded-md border border-primary/30 bg-background/30"
              onClick={downloadScreenshot}
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
