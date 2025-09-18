import { useState, useCallback } from 'react';
import type { GameState, Player, DiceRoll } from '../types/game';

const createInitialPlayer = (id: string, name: string): Player => ({
  id,
  name,
  score: 0,
  lastRoll: undefined,
});

const createInitialGameState = (): GameState => ({
  players: [
    createInitialPlayer('player1', 'Player 1'),
    createInitialPlayer('player2', 'Player 2'),
  ],
  currentRound: 1,
  maxRounds: 5,
  gameStatus: 'waiting',
  winner: undefined,
  isRolling: false,
});

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());

  const rollDice = (): number => Math.floor(Math.random() * 6) + 1;

  const rollDiceForBothPlayers = useCallback(async (): Promise<[DiceRoll, DiceRoll]> => {
    return new Promise((resolve) => {
      // Simulate rolling animation delay
      setTimeout(() => {
        const roll1: DiceRoll = {
          playerId: 'player1',
          value: rollDice(),
          timestamp: Date.now(),
        };
        const roll2: DiceRoll = {
          playerId: 'player2',
          value: rollDice(),
          timestamp: Date.now(),
        };
        resolve([roll1, roll2]);
      }, 1500); // 1.5 second rolling animation
    });
  }, []);

  const handleRollDice = useCallback(async () => {
    if (gameState.isRolling || gameState.gameStatus === 'finished') return;

    // Start rolling animation
    setGameState(prev => ({
      ...prev,
      isRolling: true,
      gameStatus: 'rolling',
    }));

    try {
      const [roll1, roll2] = await rollDiceForBothPlayers();

      // Update game state with results
      setGameState(prev => {
        const newPlayers: [Player, Player] = [
          { ...prev.players[0], lastRoll: roll1.value },
          { ...prev.players[1], lastRoll: roll2.value },
        ];

        // Determine round winner and update scores
        let updatedPlayers = newPlayers;
        if (roll1.value > roll2.value) {
          updatedPlayers[0] = { ...updatedPlayers[0], score: updatedPlayers[0].score + 1 };
        } else if (roll2.value > roll1.value) {
          updatedPlayers[1] = { ...updatedPlayers[1], score: updatedPlayers[1].score + 1 };
        }
        // No score change for ties

        const newRound = prev.currentRound + 1;
        const isGameFinished = newRound > prev.maxRounds;
        
        // Determine game winner
        let winner: Player | undefined;
        if (isGameFinished) {
          if (updatedPlayers[0].score > updatedPlayers[1].score) {
            winner = updatedPlayers[0];
          } else if (updatedPlayers[1].score > updatedPlayers[0].score) {
            winner = updatedPlayers[1];
          }
          // No winner for ties
        }

        return {
          ...prev,
          players: updatedPlayers,
          currentRound: isGameFinished ? prev.maxRounds : newRound,
          gameStatus: isGameFinished ? 'finished' : 'waiting',
          winner,
          isRolling: false,
        };
      });
    } catch (error) {
      console.error('Error rolling dice:', error);
      setGameState(prev => ({
        ...prev,
        isRolling: false,
        gameStatus: 'waiting',
      }));
    }
  }, [gameState.isRolling, gameState.gameStatus, rollDiceForBothPlayers]);

  const resetGame = useCallback(() => {
    setGameState(createInitialGameState());
  }, []);

  return {
    gameState,
    handleRollDice,
    resetGame,
  };
}