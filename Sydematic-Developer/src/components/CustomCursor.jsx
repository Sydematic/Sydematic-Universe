import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const mainCursor = useRef(null);
  const trailRefs = useRef([]);
  const [cursorType, setCursorType] = useState("default");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const trailCount = 6;
    trailRefs.current = Array(trailCount)
      .fill()
      .map((_, i) => trailRefs.current[i] || null);

    let mouseX = 0;
    let mouseY = 0;
    let positions = Array(trailCount).fill({ x: 0, y: 0 });

    const updateCursor = () => {
      // Update main cursor
      if (mainCursor.current) {
        const mx = positions[0].x + (mouseX - positions[0].x) * 0.25;
        const my = positions[0].y + (mouseY - positions[0].y) * 0.25;
        positions[0] = { x: mx, y: my };
        mainCursor.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }

      // Update trailing dots
      for (let i = 1; i < trailCount; i++) {
        const mx = positions[i].x + (positions[i - 1].x - positions[i].x) * 0.2;
        const my = positions[i].y + (positions[i - 1].y - positions[i].y) * 0.2;
        positions[i] = { x: mx, y: my };
        if (trailRefs.current[i]) {
          trailRefs.current[i].style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
        }
      }

      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest(".cursor-music")) setCursorType("music");
      else if (target.closest(".cursor-film")) setCursorType("film");
      else if (target.closest(".cursor-quantum")) setCursorType("quantum");
      else if (target.closest(".cursor-project")) setCursorType("project");
      else setCursorType("default");

      setIsHovering(
        target.closest(
          ".cursor-music, .cursor-film, .cursor-quantum, .cursor-project, button, a, [role='button']"
        ) !== null
      );
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    requestAnimationFrame(updateCursor);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const getCursorContent = () => {
    switch (cursorType) {
      case "music":
        return "🎵";
      case "film":
        return "🎬";
      case "quantum":
        return "⚛️";
      case "project":
        return "✨";
      default:
        return "";
    }
  };

  const getCursorColor = () => {
    switch (cursorType) {
      case "music":
        return "border-primary bg-primary/20";
      case "film":
        return "border-accent bg-accent/20";
      case "quantum":
        return "border-quantum bg-quantum/20";
      case "project":
        return "border-aurora-pink bg-aurora-pink/20";
      default:
        return "border-primary bg-primary/20";
    }
  };

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={mainCursor}
        className={`fixed pointer-events-none z-50 mix-blend-screen transition-all duration-300 ${
          isHovering ? "scale-150" : "scale-100"
        }`}
        style={{ width: "24px", height: "24px" }}
      >
        <div
          className={`w-full h-full rounded-full border-2 flex items-center justify-center text-xs ${getCursorColor()}`}
        >
          {getCursorContent()}
        </div>
      </div>

      {/* Trailing aurora dots */}
      {Array(6)
        .fill()
        .map((_, i) => (
          <div
            key={i}
            ref={(el) => (trailRefs.current[i] = el)}
            className="fixed pointer-events-none z-40 w-3 h-3 rounded-full bg-gradient-aurora opacity-30 mix-blend-screen"
            style={{ transform: "translate3d(0,0,0) translate(-50%, -50%)" }}
          />
        ))}
    </>
  );
};

export default CustomCursor;
