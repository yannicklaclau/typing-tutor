// Game types and interfaces
export interface Position {
  x: number;
  y: number;
}

export interface WordBomb {
  id: string;
  word: string;
  position: Position;
  speed: number;
  targetCityIndex: number;
  currentLetterIndex: number;
  isActive: boolean;
}

export interface City {
  id: string;
  name: string;
  position: Position;
  width: number;
  height: number;
  health: number;
  maxHealth: number;
  isDestroyed: boolean;
}

export interface Missile {
  id: string;
  startPosition: Position;
  targetPosition: Position;
  currentPosition: Position;
  progress: number;
  isActive: boolean;
}

export interface Particle {
  id: string;
  position: Position;
  velocity: Position;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export interface GameState {
  score: number;
  level: number;
  lives: number;
  isPlaying: boolean;
  isPaused: boolean;
  gameOver: boolean;
  currentInput: string;
  activeWords: WordBomb[];
  cities: City[];
  missiles: Missile[];
  particles: Particle[];
  accuracy: number;
  totalTyped: number;
  correctlyTyped: number;
}

export interface LevelConfig {
  level: number;
  allowedKeys: string[];
  wordPool: string[];
  wordSpeed: number;
  spawnRate: number;
  wordsToComplete: number;
  description: string;
}

export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 800;
export const GROUND_HEIGHT = 120;
export const CITY_COUNT = 6;
export const FPS = 60;