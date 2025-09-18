import React from 'react';

interface DiceProps {
  value?: number;
  isRolling: boolean;
  size?: 'small' | 'medium' | 'large';
}

const getDiceFace = (value: number): string => {
  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  return faces[value - 1] || '⚀';
};

const getRandomDiceFace = (): string => {
  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  return faces[Math.floor(Math.random() * 6)];
};

export function Dice({ value, isRolling, size = 'medium' }: DiceProps) {
  const [rollingFace, setRollingFace] = React.useState('⚀');

  React.useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setRollingFace(getRandomDiceFace());
      }, 100); // Change face every 100ms during rolling

      return () => clearInterval(interval);
    }
  }, [isRolling]);

  const sizeClasses = {
    small: 'w-16 h-16 sm:w-20 sm:h-20 text-2xl sm:text-4xl',
    medium: 'w-24 h-24 sm:w-32 sm:h-32 text-4xl sm:text-7xl',
    large: 'w-32 h-32 sm:w-48 sm:h-48 text-6xl sm:text-9xl'
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        fantasy-dice
        flex
        items-center
        justify-center
        font-bold
        transition-all
        duration-300
        ${isRolling ? 'animate-bounce scale-110' : 'hover:scale-105'}
        ${value ? 'text-amber-900' : 'text-amber-700'}
        font-mono
        cursor-default
      `}
    >
      {isRolling ? rollingFace : (value ? getDiceFace(value) : '?')}
    </div>
  );
}