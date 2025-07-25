import React, { useEffect, useState, useCallback } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import type { GameState, WordBomb, City, Missile, Particle } from '../types/game';
import { CANVAS_WIDTH, CANVAS_HEIGHT, GROUND_HEIGHT, CITY_COUNT } from '../types/game';
import { getCurrentLevelConfig } from '../data/levels';

const CITY_NAMES = ['Home', 'School', 'Park', 'Store', 'Library', 'Beach'];

const createInitialCities = (): City[] => {
  const cities: City[] = [];
  const cityWidth = 120;
  const citySpacing = (CANVAS_WIDTH - (CITY_COUNT * cityWidth)) / (CITY_COUNT + 1);
  
  for (let i = 0; i < CITY_COUNT; i++) {
    cities.push({
      id: `city-${i}`,
      name: CITY_NAMES[i],
      position: {
        x: citySpacing + i * (cityWidth + citySpacing),
        y: CANVAS_HEIGHT - GROUND_HEIGHT
      },
      width: cityWidth,
      height: 80,
      health: 3,
      maxHealth: 3,
      isDestroyed: false
    });
  }
  
  return cities;
};

const createInitialGameState = (): GameState => ({
  score: 0,
  level: 1,
  lives: 3,
  isPlaying: true,
  isPaused: false,
  gameOver: false,
  currentInput: '',
  activeWords: [],
  cities: createInitialCities(),
  missiles: [],
  particles: [],
  accuracy: 100,
  totalTyped: 0,
  correctlyTyped: 0
});

export const GameCanvas: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState);
  const [lastWordSpawn, setLastWordSpawn] = useState<number>(0);

  // Generate random word from current level
  const generateWord = useCallback((): WordBomb => {
    const levelConfig = getCurrentLevelConfig(gameState.level);
    const word = levelConfig.wordPool[Math.floor(Math.random() * levelConfig.wordPool.length)];
    const targetCityIndex = Math.floor(Math.random() * CITY_COUNT);
    
    return {
      id: `word-${Date.now()}-${Math.random()}`,
      word,
      position: {
        x: Math.random() * (CANVAS_WIDTH - 100),
        y: -50
      },
      speed: levelConfig.wordSpeed,
      targetCityIndex,
      currentLetterIndex: 0,
      isActive: true
    };
  }, [gameState.level]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!gameState.isPlaying || gameState.isPaused) return;
      
      const key = event.key.toLowerCase();
      const levelConfig = getCurrentLevelConfig(gameState.level);
      
      // Only accept keys from current level
      if (!levelConfig.allowedKeys.includes(key)) return;
      
      setGameState(prev => {
        const newState = { ...prev };
        
        // Find the first active word that matches the next expected letter
        const activeWord = newState.activeWords.find(word => 
          word.isActive && 
          word.word[word.currentLetterIndex] === key
        );
        
        if (activeWord) {
          // Correct letter typed
          activeWord.currentLetterIndex++;
          newState.correctlyTyped++;
          
          // Word completed
          if (activeWord.currentLetterIndex >= activeWord.word.length) {
            activeWord.isActive = false;
            newState.score += activeWord.word.length * 10;
            
            // Create missile
            const missile: Missile = {
              id: `missile-${Date.now()}`,
              startPosition: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - GROUND_HEIGHT },
              targetPosition: { ...activeWord.position },
              currentPosition: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - GROUND_HEIGHT },
              progress: 0,
              isActive: true
            };
            newState.missiles.push(missile);
          }
        }
        
        newState.totalTyped++;
        newState.accuracy = (newState.correctlyTyped / newState.totalTyped) * 100;
        
        return newState;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.isPlaying, gameState.isPaused, gameState.level]);

  // Game update loop
  const updateGame = useCallback((deltaTime: number) => {
    setGameState(prev => {
      const newState = { ...prev };
      const currentTime = Date.now();
      const levelConfig = getCurrentLevelConfig(newState.level);
      
      // Spawn new words
      if (currentTime - lastWordSpawn > levelConfig.spawnRate) {
        newState.activeWords.push(generateWord());
        setLastWordSpawn(currentTime);
      }
      
      // Update word positions
      newState.activeWords = newState.activeWords.map(word => {
        if (word.isActive) {
          word.position.y += word.speed * (deltaTime / 16); // Normalize to 60fps
          
          // Check if word hit ground
          if (word.position.y > CANVAS_HEIGHT - GROUND_HEIGHT - 50) {
            // Damage city
            const targetCity = newState.cities[word.targetCityIndex];
            if (targetCity && !targetCity.isDestroyed) {
              targetCity.health--;
              if (targetCity.health <= 0) {
                targetCity.isDestroyed = true;
                newState.lives--;
              }
            }
            word.isActive = false;
          }
        }
        return word;
      });
      
      // Update missiles
      newState.missiles = newState.missiles.map(missile => {
        if (missile.isActive) {
          missile.progress += deltaTime / 500; // 500ms flight time
          
          if (missile.progress >= 1) {
            missile.progress = 1;
            missile.isActive = false;
            
            // Create explosion particles
            for (let i = 0; i < 20; i++) {
              const particle: Particle = {
                id: `particle-${Date.now()}-${i}`,
                position: { ...missile.targetPosition },
                velocity: {
                  x: (Math.random() - 0.5) * 100,
                  y: (Math.random() - 0.5) * 100
                },
                life: 60,
                maxLife: 60,
                color: `hsl(${Math.random() * 60 + 15}, 100%, 50%)`, // Orange/yellow
                size: Math.random() * 4 + 2
              };
              newState.particles.push(particle);
            }
          } else {
            // Interpolate missile position
            const t = missile.progress;
            missile.currentPosition = {
              x: missile.startPosition.x + (missile.targetPosition.x - missile.startPosition.x) * t,
              y: missile.startPosition.y + (missile.targetPosition.y - missile.startPosition.y) * t
            };
          }
        }
        return missile;
      });
      
      // Update particles
      newState.particles = newState.particles.map(particle => {
        particle.position.x += particle.velocity.x * (deltaTime / 1000);
        particle.position.y += particle.velocity.y * (deltaTime / 1000);
        particle.life--;
        return particle;
      }).filter(particle => particle.life > 0);
      
      // Remove inactive elements
      newState.activeWords = newState.activeWords.filter(word => word.isActive || word.position.y < CANVAS_HEIGHT);
      newState.missiles = newState.missiles.filter(missile => missile.isActive);
      
      // Check game over
      const activeCities = newState.cities.filter(city => !city.isDestroyed);
      if (activeCities.length <= 2) {
        newState.gameOver = true;
        newState.isPlaying = false;
      }
      
      return newState;
    });
  }, [generateWord, lastWordSpawn]);

  // Render function
  const render = useCallback((ctx: CanvasRenderingContext2D) => {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#87CEEB'); // Sky blue
    gradient.addColorStop(1, '#98FB98'); // Pale green
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw ground
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, CANVAS_HEIGHT - GROUND_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);
    
    // Draw cities
    gameState.cities.forEach(city => {
      if (!city.isDestroyed) {
        // City building
        ctx.fillStyle = city.health === 3 ? '#4169E1' : city.health === 2 ? '#FF6347' : '#8B0000';
        ctx.fillRect(city.position.x, city.position.y - city.height, city.width, city.height);
        
        // City name
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(city.name, city.position.x + city.width / 2, city.position.y - city.height - 5);
        
        // Health dots
        ctx.fillStyle = '#00FF00';
        for (let i = 0; i < city.health; i++) {
          ctx.beginPath();
          ctx.arc(city.position.x + 10 + i * 15, city.position.y - city.height + 10, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
    
    // Draw missile launcher
    const launcherX = CANVAS_WIDTH / 2;
    const launcherY = CANVAS_HEIGHT - GROUND_HEIGHT;
    
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(launcherX - 15, launcherY - 30, 30, 30);
    ctx.fillStyle = '#FF4500';
    ctx.fillRect(launcherX - 5, launcherY - 40, 10, 15);
    
    // Draw words
    gameState.activeWords.forEach(word => {
      if (word.isActive) {
        // Word bubble background
        const textWidth = ctx.measureText(word.word).width;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(word.position.x - 10, word.position.y - 25, textWidth + 20, 35);
        ctx.strokeStyle = '#333';
        ctx.strokeRect(word.position.x - 10, word.position.y - 25, textWidth + 20, 35);
        
        // Draw word with color coding
        ctx.font = '20px monospace';
        let currentX = word.position.x;
        
        for (let i = 0; i < word.word.length; i++) {
          const letter = word.word[i];
          if (i < word.currentLetterIndex) {
            ctx.fillStyle = '#00FF00'; // Typed letters - green
          } else if (i === word.currentLetterIndex) {
            ctx.fillStyle = '#FFFF00'; // Current letter - yellow
          } else {
            ctx.fillStyle = '#333333'; // Untyped letters - dark
          }
          
          ctx.fillText(letter, currentX, word.position.y);
          currentX += ctx.measureText(letter).width;
        }
        
        // Trajectory line to target city
        const targetCity = gameState.cities[word.targetCityIndex];
        if (targetCity && !targetCity.isDestroyed) {
          ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(word.position.x + textWidth / 2, word.position.y + 10);
          ctx.lineTo(targetCity.position.x + targetCity.width / 2, targetCity.position.y - targetCity.height / 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
    });
    
    // Draw missiles
    gameState.missiles.forEach(missile => {
      if (missile.isActive) {
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.arc(missile.currentPosition.x, missile.currentPosition.y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Missile trail
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(missile.startPosition.x, missile.startPosition.y);
        ctx.lineTo(missile.currentPosition.x, missile.currentPosition.y);
        ctx.stroke();
      }
    });
    
    // Draw particles
    gameState.particles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('hsl', 'hsla');
      ctx.beginPath();
      ctx.arc(particle.position.x, particle.position.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw UI
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '24px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${gameState.score}`, 20, 40);
    ctx.fillText(`Level: ${gameState.level}`, 20, 70);
    ctx.fillText(`Lives: ${gameState.lives}`, 20, 100);
    ctx.fillText(`Accuracy: ${gameState.accuracy.toFixed(1)}%`, 20, 130);
    
    // Level description
    const levelConfig = getCurrentLevelConfig(gameState.level);
    ctx.font = '16px Arial';
    ctx.fillText(levelConfig.description, 20, CANVAS_HEIGHT - 20);
    
    // Game over screen
    if (gameState.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);
      
      ctx.font = '24px Arial';
      ctx.fillText(`Final Score: ${gameState.score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      ctx.fillText(`Accuracy: ${gameState.accuracy.toFixed(1)}%`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
      ctx.fillText('Press R to Restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 80);
    }
  }, [gameState]);
  
  // Handle restart
  useEffect(() => {
    const handleRestart = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'r' && gameState.gameOver) {
        setGameState(createInitialGameState());
        setLastWordSpawn(0);
      }
    };
    
    window.addEventListener('keydown', handleRestart);
    return () => window.removeEventListener('keydown', handleRestart);
  }, [gameState.gameOver]);

  const canvasRef = useGameLoop({
    gameState,
    updateGame,
    render
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#222' }}>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ border: '2px solid #444', borderRadius: '8px' }}
      />
    </div>
  );
};