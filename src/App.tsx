import React from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { GameBoard } from './components/GameBoard';
import { useGameLogic } from './hooks/useGameLogic';

function App() {
  const { gameState, handleRollDice, resetGame } = useGameLogic();
  const [gameStarted, setGameStarted] = React.useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleResetGame = () => {
    resetGame();
    setGameStarted(false);
  };

  if (!gameStarted) {
    return <LoadingScreen onStartGame={handleStartGame} />;
  }

  return (
    <GameBoard
      gameState={gameState}
      onRollDice={handleRollDice}
      onResetGame={handleResetGame}
    />
  );
}

export default App;
