import React from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { GameBoard } from './components/GameBoard';
import { useGameLogic } from './hooks/useGameLogic';

function App() {
  const { gameState, handleRollDice, resetGame } = useGameLogic();
  const [gameStarted, setGameStarted] = React.useState(false);

  // Return to loading screen when game is finished
  React.useEffect(() => {
    if (gameState.gameStatus === 'finished') {
      const timer = setTimeout(() => {
        setGameStarted(false);
        resetGame();
      }, 3000); // Wait 3 seconds to show the victory message
      
      return () => clearTimeout(timer);
    }
  }, [gameState.gameStatus, resetGame]);

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
