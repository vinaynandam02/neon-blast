import { useState, useEffect, useCallback, useRef } from 'react';

export type Point = { x: number; y: number };

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export function useSnake() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 15, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const directionRef = useRef(direction);
  const lastMoveRef = useRef(direction);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Prevent food from spawning exactly ON the snake body
      const isOnSnake = currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!isOnSnake) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    lastMoveRef.current = INITIAL_DIRECTION;
    setScore(0);
    setGameOver(false);
    setFood(generateFood(INITIAL_SNAKE));
    setIsPaused(false);
  }, [generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keys if we are focused on an input element somewhere else etc
      if (document.activeElement?.tagName === 'INPUT') return;

      if (['ArrowUp', 'w', 'W'].includes(e.key) && lastMoveRef.current.y === 0) {
        e.preventDefault();
        setDirection({ x: 0, y: -1 });
      }
      if (['ArrowDown', 's', 'S'].includes(e.key) && lastMoveRef.current.y === 0) {
        e.preventDefault();
        setDirection({ x: 0, y: 1 });
      }
      if (['ArrowLeft', 'a', 'A'].includes(e.key) && lastMoveRef.current.x === 0) {
        e.preventDefault();
        setDirection({ x: -1, y: 0 });
      }
      if (['ArrowRight', 'd', 'D'].includes(e.key) && lastMoveRef.current.x === 0) {
        e.preventDefault();
        setDirection({ x: 1, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake((prev) => {
        const head = prev[0];
        const currentDir = directionRef.current;
        const newHead = { x: head.x + currentDir.x, y: head.y + currentDir.y };

        lastMoveRef.current = currentDir;

        // Collision with walls
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prev;
        }

        // Collision with self
        if (
          prev.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
          )
        ) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        // Collision with food
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop(); // Remove tail
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, 130);
    return () => clearInterval(intervalId);
  }, [food, gameOver, isPaused, generateFood]);

  return {
    snake,
    food,
    score,
    gameOver,
    isPaused,
    setIsPaused,
    resetGame,
  };
}
