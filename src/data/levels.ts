import type { LevelConfig } from '../types/game';

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    level: 1,
    allowedKeys: ['a', 's', 'd', 'f'],
    wordPool: ['as', 'ad', 'sad', 'fad', 'add', 'sass'],
    wordSpeed: 1.0,
    spawnRate: 3000, // milliseconds between spawns
    wordsToComplete: 8,
    description: 'Learn the left home row: A, S, D, F'
  },
  {
    level: 2,
    allowedKeys: ['a', 's', 'd', 'f'],
    wordPool: ['fast', 'dad', 'adds', 'fade', 'sass', 'fads'],
    wordSpeed: 1.2,
    spawnRate: 2800,
    wordsToComplete: 10,
    description: 'Master left home row with longer words'
  },
  {
    level: 3,
    allowedKeys: ['j', 'k', 'l', ';'],
    wordPool: ['jk', 'kl', 'lll', 'jjj', 'kjl'],
    wordSpeed: 1.0,
    spawnRate: 3000,
    wordsToComplete: 8,
    description: 'Learn the right home row: J, K, L, ;'
  },
  {
    level: 4,
    allowedKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    wordPool: ['ask', 'fall', 'all', 'lads', 'flask', 'skull', 'jail'],
    wordSpeed: 1.3,
    spawnRate: 2500,
    wordsToComplete: 12,
    description: 'Combine both sides of home row'
  },
  {
    level: 5,
    allowedKeys: ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f'],
    wordPool: ['west', 'rest', 'fest', 'test', 'waste', 'water', 'sweat'],
    wordSpeed: 1.4,
    spawnRate: 2300,
    wordsToComplete: 15,
    description: 'Add top row letters: Q, W, E, R, T'
  }
];

export const getCurrentLevelConfig = (level: number): LevelConfig => {
  return LEVEL_CONFIGS[Math.min(level - 1, LEVEL_CONFIGS.length - 1)] || LEVEL_CONFIGS[0];
};