import React from 'react';

interface LoadingScreenProps {
  onStartGame: () => void;
}

export function LoadingScreen({ onStartGame }: LoadingScreenProps) {
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
      
      <div className="bg-gradient-to-b from-amber-100 via-yellow-50 to-amber-100 fantasy-card p-8 max-w-md w-full relative z-10 text-center">
        {/* Title */}
        <h1 className="chibi-text chibi-large font-bold text-amber-900 mb-6 fantasy-glow">
          ⚔️ dice master ⚔️
        </h1>
        
        {/* Subtitle */}
        <p className="chibi-text chibi-medium text-amber-800 mb-8">
          prepare for battle!
        </p>
        
        {/* Game Description */}
        <div className="bg-gradient-to-b from-amber-200 to-amber-300 fantasy-card p-4 mb-8">
          <p className="chibi-text chibi-small text-amber-900 mb-2">
            🎲 roll the dice
          </p>
          <p className="chibi-text chibi-small text-amber-900 mb-2">
            ⚔️ defeat your opponent
          </p>
          <p className="chibi-text chibi-small text-amber-900">
            👑 become the champion
          </p>
        </div>
        
        {/* Characters Preview */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="text-center">
            <div className="w-16 h-20 fantasy-card flex items-center justify-center bg-gradient-to-b from-blue-400 to-blue-600 mb-2">
              <div className="text-2xl">🛡️</div>
            </div>
            <p className="chibi-text chibi-small text-blue-800">knight</p>
          </div>
          
          <div className="chibi-text chibi-medium text-amber-800 flex items-center">
            vs
          </div>
          
          <div className="text-center">
            <div className="w-16 h-20 fantasy-card flex items-center justify-center bg-gradient-to-b from-red-400 to-red-600 mb-2">
              <div className="text-2xl">🔮</div>
            </div>
            <p className="chibi-text chibi-small text-red-800">mage</p>
          </div>
        </div>
        
        {/* Start Button */}
        <button
          onClick={onStartGame}
          className="px-8 py-4 chibi-text chibi-medium font-bold fantasy-button text-amber-900 transform hover:scale-105 transition-all duration-200"
        >
          🗡️ new quest 🗡️
        </button>
      </div>
    </div>
  );
}