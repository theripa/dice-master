import React from 'react';
import type { GameState } from '../types/game';
import { PlayerCard } from './PlayerCard';

interface GameBoardProps {
  gameState: GameState;
  onRollDice: () => void;
  onResetGame: () => void;
}

export function GameBoard({ gameState, onRollDice, onResetGame }: GameBoardProps) {
  const { players, currentRound, maxRounds, gameStatus, winner, isRolling } = gameState;
  const [player1, player2] = players;
  const [showVictoryMessage, setShowVictoryMessage] = React.useState<string | null>(null);

  const getRoundWinner = () => {
    if (!player1.lastRoll || !player2.lastRoll) return null;
    if (player1.lastRoll > player2.lastRoll) return player1;
    if (player2.lastRoll > player1.lastRoll) return player2;
    return null; // Tie
  };

  const roundWinner = getRoundWinner();

  // Show victory message when round ends
  React.useEffect(() => {
    if (roundWinner && gameStatus !== 'rolling') {
      setShowVictoryMessage(`${roundWinner.name.toUpperCase()} SURVIVED!`);
      const timer = setTimeout(() => {
        setShowVictoryMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [roundWinner, gameStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fantasy stone texture background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(139,69,19,0.5) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgba(160,82,45,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 40px 40px'
        }}></div>
      </div>
      
      <div className="bg-gradient-to-b from-amber-100 via-yellow-50 to-amber-100 fantasy-card p-6 max-w-5xl w-full relative z-10 max-h-screen overflow-hidden">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="chibi-text chibi-large font-bold text-amber-900 mb-2 fantasy-glow">
            ⚔️ DICE MASTER ⚔️
          </h1>
          <p className="chibi-text chibi-small text-amber-800 font-bold fantasy-text-shadow">
            battle {currentRound} of {maxRounds}
          </p>
        </div>

        {/* Main Game Area - Horizontal Layout */}
        <div className="flex items-center justify-between space-x-4 mb-4">
          {/* Player 1 */}
          <PlayerCard
            player={player1}
            isRolling={isRolling}
            isWinner={roundWinner?.id === player1.id}
            position="left"
          />
          
          {/* Center Area */}
          <div className="flex-1 flex flex-col items-center space-y-3">
            {/* VS Text */}
            <div className="chibi-text chibi-medium text-red-700 font-bold fantasy-glow animate-pulse">
              VS
            </div>
            
            {/* Victory/Status Messages */}
            {gameStatus === 'finished' && winner && (
              <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 fantasy-card p-3">
                <h2 className="chibi-text chibi-medium font-bold text-amber-900 fantasy-glow">
                  👑 {winner.name} wins! 👑
                </h2>
                <p className="chibi-text chibi-small text-amber-900 mt-1">
                  final: {winner.score} - {winner.id === player1.id ? player2.score : player1.score}
                </p>
              </div>
            )}
            
            {showVictoryMessage && (
              <div className="bg-gradient-to-b from-green-500 to-green-700 fantasy-card p-3 animate-pulse">
                <p className="chibi-text chibi-medium text-yellow-100 font-bold fantasy-glow">
                  {showVictoryMessage}
                </p>
              </div>
            )}
            
            {roundWinner && gameStatus !== 'rolling' && !showVictoryMessage && (
              <div className="bg-gradient-to-b from-green-600 to-green-800 fantasy-card p-3">
                <p className="chibi-text chibi-small text-yellow-200 font-bold">
                  {roundWinner.name} wins battle!
                </p>
                <p className="chibi-text chibi-small text-green-200 mt-1">
                  {roundWinner.lastRoll} beats {roundWinner.id === player1.id ? player2.lastRoll : player1.lastRoll}
                </p>
              </div>
            )}
            
            {player1.lastRoll === player2.lastRoll && player1.lastRoll && gameStatus !== 'rolling' && !showVictoryMessage && (
              <div className="bg-gradient-to-b from-orange-500 to-orange-700 fantasy-card p-3">
                <p className="chibi-text chibi-small text-yellow-100 font-bold">
                  draw! both rolled {player1.lastRoll}
                </p>
              </div>
            )}
            
            {/* Controls */}
            <div className="space-y-2">
              {gameStatus !== 'finished' && (
                <button
                  onClick={onRollDice}
                  disabled={isRolling}
                  className={`
                    px-6 py-3 chibi-text chibi-small font-bold
                    transition-all duration-300 transform
                    fantasy-button
                    ${isRolling ? 'opacity-50 cursor-not-allowed' : ''}
                    text-amber-900
                  `}
                >
                  {isRolling ? 'casting...' : 'cast dice!'}
                </button>
              )}
              
              <div>
                <button
                  onClick={onResetGame}
                  className="px-4 py-2 text-amber-900 chibi-text chibi-small font-bold fantasy-button"
                >
                  new quest
                </button>
              </div>
            </div>
          </div>
          
          {/* Player 2 */}
          <PlayerCard
            player={player2}
            isRolling={isRolling}
            isWinner={roundWinner?.id === player2.id}
            position="right"
          />
        </div>

        {/* Quest Progress - Horizontal */}
        <div className="bg-gradient-to-b from-amber-200 to-amber-300 fantasy-card p-3">
          <h3 className="chibi-text chibi-small text-amber-900 font-bold mb-2 text-center fantasy-glow">quest progress</h3>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="chibi-text chibi-small text-blue-800 font-bold">{player1.name}</p>
              <div className="w-24 bg-amber-800 fantasy-progress h-3 mt-1">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 transition-all duration-500"
                  style={{ width: `${(player1.score / maxRounds) * 100}%` }}
                ></div>
              </div>
              <p className="chibi-text chibi-small text-blue-700 mt-1 font-bold">{player1.score}/{maxRounds}</p>
            </div>
            
            <div className="text-center">
              <p className="chibi-text chibi-small text-red-800 font-bold">{player2.name}</p>
              <div className="w-24 bg-amber-800 fantasy-progress h-3 mt-1">
                <div
                  className="bg-gradient-to-r from-red-500 to-red-600 h-3 transition-all duration-500"
                  style={{ width: `${(player2.score / maxRounds) * 100}%` }}
                ></div>
              </div>
              <p className="chibi-text chibi-small text-red-700 mt-1 font-bold">{player2.score}/{maxRounds}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}