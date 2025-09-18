export interface Player {
  id: string;
  name: string;
  score: number;
  lastRoll?: number;
}

export interface GameState {
  players: [Player, Player];
  currentRound: number;
  maxRounds: number;
  gameStatus: 'waiting' | 'rolling' | 'finished';
  winner?: Player;
  isRolling: boolean;
}

export interface DiceRoll {
  playerId: string;
  value: number;
  timestamp: number;
}