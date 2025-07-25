import { useEffect, useRef, useCallback } from 'react';
import type { GameState } from '../types/game';

interface UseGameLoopProps {
  gameState: GameState;
  updateGame: (deltaTime: number) => void;
  render: (ctx: CanvasRenderingContext2D) => void;
}

export const useGameLoop = ({ gameState, updateGame, render }: UseGameLoopProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  const gameLoop = useCallback((currentTime: number) => {
    if (!canvasRef.current) return;

    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    // Update game state
    if (gameState.isPlaying && !gameState.isPaused) {
      updateGame(deltaTime);
    }

    // Render frame
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      render(ctx);
    }

    // Continue loop
    animationFrameRef.current = requestAnimationFrame((time) => gameLoop(time));
  }, [gameState.isPlaying, gameState.isPaused, updateGame, render]);

  useEffect(() => {
    const startLoop = () => {
      const loop = (time: number) => {
        gameLoop(time);
      };
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    
    startLoop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameLoop]);

  return canvasRef;
};