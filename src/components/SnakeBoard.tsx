import { useSnake } from '../hooks/useSnake';
import { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';

export function SnakeBoard() {
  const { snake, food, score, gameOver, isPaused, setIsPaused, resetGame } = useSnake();
  const [hasStarted, setHasStarted] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  // Focus the game board automatically so arrow keys work right away
  useEffect(() => {
    if (hasStarted && boardRef.current) {
      boardRef.current.focus();
    }
  }, [hasStarted]);

  const handleStart = () => {
    setHasStarted(true);
    resetGame();
  };

  const cells = [];
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 20; x++) {
      const isSnake = snake.some((s) => s.x === x && s.y === y);
      const isHead = snake[0].x === x && snake[0].y === y;
      const index = snake.findIndex((s) => s.x === x && s.y === y);
      const isFood = food.x === x && food.y === y;

      let blockClass = "w-full h-full rounded-none transition-colors duration-100 flex items-center justify-center ";
      let content = null;

      if (isHead) {
        content = <div className="w-[120%] h-[120%] bg-[#39ff14] shadow-[0_0_15px_#39ff14] z-10 relative"></div>;
      } else if (isSnake) {
        // Decrease opacity slightly based on index
        const opacity = Math.max(20, 100 - (index * 5));
        content = <div className="w-[110%] h-[110%] bg-[#39ff14]" style={{ opacity: `${opacity}%` }}></div>;
      } else if (isFood) {
        content = <div className="w-[80%] h-[80%] bg-[#ff007f] shadow-[0_0_10px_#ff007f] rounded-sm animate-pulse"></div>;
      }

      cells.push(
        <div key={`${x}-${y}`} className={blockClass}>
           {content}
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-[500px] mx-auto xl:mx-0 shrink-0">
      <div className="flex justify-between w-full px-2 items-baseline md:absolute md:top-8 md:right-12 md:max-w-[400px] z-20">
        <div className="text-left md:text-right">
          <p className="text-[10px] uppercase tracking-widest text-[#ff007f] mb-1">Current Score</p>
          <p className="text-3xl md:text-4xl font-mono leading-none">{String(score).padStart(5, '0')}</p>
        </div>
        <div className="text-right">
           <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Status</p>
           <p className={`text-xl md:text-4xl font-mono leading-none ${gameOver ? "text-[#ff007f]" : "text-slate-500"}`}>{gameOver ? 'FAIL' : 'ACTIVE'}</p>
        </div>
      </div>

      <div className="relative w-full aspect-square bg-[#0c0d16] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden group">
        <div className="absolute inset-0 opacity-20 snake-bg-grid pointer-events-none z-0"></div>
        <div className="absolute inset-0 border-[15px] md:border-[20px] border-transparent pointer-events-none group-hover:border-[#ff007f]/5 transition-all duration-700 z-20"></div>

        <div
          ref={boardRef}
          className="snake-grid w-full h-full outline-none relative z-10"
          tabIndex={0}
        >
          {cells}
        </div>

        {!hasStarted && (
          <div
            className="absolute inset-0 bg-[#05060a]/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-[#05060a]/60 group"
            onClick={handleStart}
          >
            <Play className="w-16 h-16 text-[#00f2ff] mb-6 drop-shadow-[0_0_15px_rgba(0,242,255,0.6)] group-hover:scale-110 transition-transform duration-300" />
            <span className="text-[#00f2ff] text-2xl md:text-3xl font-black tracking-[0.2em] animate-pulse uppercase">
              Initialize
            </span>
            <span className="text-slate-500 mt-4 font-mono text-sm uppercase tracking-widest">Click to Boot System</span>
          </div>
        )}

        {hasStarted && gameOver && (
          <div className="absolute inset-0 bg-[#0c0d16]/90 backdrop-blur-md z-30 flex flex-col items-center justify-center animate-in fade-in duration-300">
            <span className="text-[#ff007f] text-3xl md:text-5xl font-black tracking-widest mb-4 uppercase drop-shadow-[0_0_20px_rgba(255,0,127,0.8)]">
              Critical Error
            </span>
            <span className="text-slate-300 font-mono mb-8 text-lg md:text-xl uppercase tracking-widest">
              Final Payload: <span className="text-[#00f2ff] font-bold">{score}</span>
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetGame();
              }}
              className="flex items-center gap-3 px-8 py-4 border border-[#39ff14]/50 text-[#39ff14] hover:bg-[#39ff14]/10 hover:shadow-[0_0_20px_rgba(57,255,20,0.2)] uppercase tracking-widest font-black transition-all cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" /> Execute Reboot
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
