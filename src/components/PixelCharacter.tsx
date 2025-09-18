import React from 'react';

interface PixelCharacterProps {
  type: 'knight' | 'mage';
  isWinner?: boolean;
}

export function PixelCharacter({ type, isWinner }: PixelCharacterProps) {
  const [frame, setFrame] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % 4);
    }, 800); // Change frame every 800ms for slow idle animation

    return () => clearInterval(interval);
  }, []);

  const getCharacterSprite = () => {
    if (type === 'knight') {
      // Knight character frames (blue armor)
      const frames = [
        // Frame 0 - Base pose
        `
          ████████████
          ██░░░░░░░░██
          ██░░██░░██░░██
          ██░░░░░░░░██
          ██░░████░░██
          ████████████
          ██████████████
          ████░░░░░░████
          ████░░░░░░████
          ████░░░░░░████
          ██████████████
          ████░░░░░░████
          ████░░░░░░████
          ████░░░░░░████
          ██████████████
          ████████████
        `,
        // Frame 1 - Slight movement
        `
          ████████████
          ██░░░░░░░░██
          ██░░██░░██░░██
          ██░░░░░░░░██
          ██░░████░░██
          ████████████
          ██████████████
          ████░░░░░░████
          ████░░░░░░████
          ████░░░░░░████
          ██████████████
          ████░░░░░░████
          ████░░░░░░████
          ████░░░░░░████
          ██████████████
          ████████████
        `,
        // Frame 2 - Back to base
        `
          ████████████
          ██░░░░░░░░██
          ██░░██░░██░░██
          ██░░░░░░░░██
          ██░░████░░██
          ████████████
          ██████████████
          ████░░░░░░████
          ████░░░░░░████
          ████░░░░░░████
          ██████████████
          ████░░░░░░████
          ████░░░░░░████
          ████░░░░░░████
          ██████████████
          ████████████
        `,
        // Frame 3 - Slight movement other way
        `
          ████████████
          ██░░░░░░░░██
          ██░░██░░██░░██
          ██░░░░░░░░██
          ██░░████░░██
          ████████████
          ██████████████
          ████░░░░░░████
          ████░░░░░░████
          ████░░░░░░████
          ██████████████
          ████░░░░░░████
          ████░░░░░░████
          ████░░░░░░████
          ██████████████
          ████████████
        `
      ];
      return frames[frame];
    } else {
      // Mage character frames (red robes)
      const frames = [
        // Frame 0 - Base pose
        `
          ████████████
          ██░░░░░░░░██
          ██░░██░░██░░██
          ██░░░░░░░░██
          ██░░████░░██
          ████████████
          ██████████████
          ████░░░░░░████
          ████░░░░░░████
          ████░░░░░░████
          ██████████████
          ████░░░░░░████
          ████░░░░░░████
          ████░░░░░░████
          ██████████████
          ████████████
        `,
        // Frame 1 - Slight movement
        `
          ████████████
          ██░░░░░░░░██
          ██░░██░░██░░██
          ██░░░░░░░░██
          ██░░████░░██
          ████████████
          ██████████████
          ████░░░░░░████
          ████░░░░░░████
          ████░░░░░░████
          ██████████████
          ████░░░░░░████
          ████░░░░░░████
          ████░░░░░░████
          ██████████████
          ████████████
        `,
        // Frame 2 - Back to base
        `
          ████████████
          ██░░░░░░░░██
          ██░░██░░██░░██
          ██░░░░░░░░██
          ██░░████░░██
          ████████████
          ██████████████
          ████░░░░░░████
          ████░░░░░░████
          ████░░░░░░████
          ██████████████
          ████░░░░░░████
          ████░░░░░░████
          ████░░░░░░████
          ██████████████
          ████████████
        `,
        // Frame 3 - Slight movement other way
        `
          ████████████
          ██░░░░░░░░██
          ██░░██░░██░░██
          ██░░░░░░░░██
          ██░░████░░██
          ████████████
          ██████████████
          ████░░░░░░████
          ████░░░░░░████
          ████░░░░░░████
          ██████████████
          ████░░░░░░████
          ████░░░░░░████
          ████░░░░░░████
          ██████████████
          ████████████
        `
      ];
      return frames[frame];
    }
  };

  return (
    <div className={`
      w-16 h-20 
      fantasy-card 
      flex items-center justify-center 
      ${type === 'knight' ? 'bg-gradient-to-b from-blue-400 to-blue-600' : 'bg-gradient-to-b from-red-400 to-red-600'}
      ${isWinner ? 'animate-bounce' : ''}
      relative
      pixel-character
    `}>
      {/* Simple pixel character representation */}
      <div className="text-2xl">
        {type === 'knight' ? '🛡️' : '🔮'}
      </div>
      
      {isWinner && (
        <div className="absolute -top-1 -right-1 text-yellow-400 text-xs animate-pulse">
          ✨
        </div>
      )}
    </div>
  );
}