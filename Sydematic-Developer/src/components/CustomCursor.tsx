import { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'music' | 'film' | 'quantum' | 'project'>('default');

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('.cursor-music')) {
        setCursorType('music');
        setIsHovering(true);
      } else if (target.closest('.cursor-film')) {
        setCursorType('film');
        setIsHovering(true);
      } else if (target.closest('.cursor-quantum')) {
        setCursorType('quantum');
        setIsHovering(true);
      } else if (target.closest('.cursor-project')) {
        setCursorType('project');
        setIsHovering(true);
      } else if (target.closest('button, a, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
        setCursorType('default');
      }
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const getCursorContent = () => {
    switch (cursorType) {
      case 'music':
        return '🎵';
      case 'film':
        return '🎬';
      case 'quantum':
        return '⚛️';
      case 'project':
        return '✨';
      default:
        return '';
    }
  };

  const getCursorColor = () => {
    switch (cursorType) {
      case 'music':
        return 'border-primary bg-primary/20';
      case 'film':
        return 'border-accent bg-accent/20';
      case 'quantum':
        return 'border-quantum bg-quantum/20';
      case 'project':
        return 'border-aurora-pink bg-aurora-pink/20';
      default:
        return 'border-primary bg-primary/20';
    }
  };

  return (
    <>
      <div
        className={`fixed pointer-events-none z-50 mix-blend-screen transition-all duration-300 ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${getCursorColor()}`}>
          <div className="flex items-center justify-center w-full h-full text-xs">
            {getCursorContent()}
          </div>
        </div>
      </div>
      
      {/* Aurora trailing effect */}
      <div
        className="fixed pointer-events-none z-40 w-3 h-3 rounded-full bg-gradient-aurora opacity-30 mix-blend-screen transition-all duration-700"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Twinkling stars effect */}
      <div
        className="fixed pointer-events-none z-30 w-1 h-1 rounded-full bg-primary animate-twinkle transition-all duration-1000"
        style={{
          left: `${position.x + 15}px`,
          top: `${position.y - 10}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default CustomCursor;