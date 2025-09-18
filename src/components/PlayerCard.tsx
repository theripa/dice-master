import type { Player } from '../types/game';
import { Dice } from './Dice';
import { PixelCharacter } from './PixelCharacter';

interface PlayerCardProps {
  player: Player;
  isRolling: boolean;
  isWinner?: boolean;
  position: 'left' | 'right';
}

export function PlayerCard({ player, isRolling, isWinner, position }: PlayerCardProps) {
  return (
    <div
      className={`
        bg-gradient-to-b from-amber-100 via-yellow-50 to-amber-100
        text-amber-900
        fantasy-card
        p-4
        transform
        transition-all
        duration-300
        ${isWinner ? 'scale-105' : ''}
        flex
        flex-col
        items-center
        space-y-2
        min-w-[180px]
        relative
      `}
    >
      {/* Pixel Character */}
      <PixelCharacter 
        type={position === 'left' ? 'knight' : 'mage'} 
        isWinner={isWinner}
      />
      
      <div className="text-center">
        <h3 className="chibi-text chibi-medium font-bold mb-1 fantasy-glow">{player.name}</h3>
        <p className="chibi-text chibi-small text-amber-700">wins: {player.score}</p>
      </div>
      
      <Dice value={player.lastRoll} isRolling={isRolling} size="medium" />
      
      {player.lastRoll && (
        <div className="text-center">
          <p className="chibi-text chibi-small font-bold text-amber-800">rolled: {player.lastRoll}</p>
        </div>
      )}
      
      {isWinner && (
        <div className="absolute -top-1 -right-1 text-yellow-400 text-lg animate-bounce fantasy-card bg-yellow-600 w-8 h-8 flex items-center justify-center">
          <span className="text-xs">👑</span>
        </div>
      )}
    </div>
  );
}