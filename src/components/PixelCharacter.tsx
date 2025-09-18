interface PixelCharacterProps {
  type: 'knight' | 'mage';
  isWinner?: boolean;
}

export function PixelCharacter({ type, isWinner }: PixelCharacterProps) {
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