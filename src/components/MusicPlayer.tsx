import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const TRACKS = [
  { title: "Neon Drive", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Cyberpunk Synth", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Digital Horizon", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
];

export function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Playback prevented", e));
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentTrack((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch((e) => {
        console.error("Audio playback error:", e);
        setIsPlaying(false);
      });
    }
  }, [currentTrack]);

  const handleEnded = () => {
    playNext();
  };

  return (
    <div className="flex flex-col gap-10 w-full max-w-sm mx-auto xl:mx-0 h-full">
      <audio
        ref={audioRef}
        src={TRACKS[currentTrack].url}
        onEnded={handleEnded}
        autoPlay={false}
      />

      {/* Now Playing Area */}
      <div className="group">
        <p className="text-[10px] uppercase tracking-widest text-[#00f2ff] mb-4 flex items-center gap-2">
          {isPlaying ? (
            <span className="w-2 h-2 rounded-full bg-[#00f2ff] animate-pulse"></span>
          ) : (
            <span className="w-2 h-2 rounded-full bg-slate-700"></span>
          )}
          Now Playing
        </p>
        <div className="relative p-4 border-l-2 border-[#00f2ff] bg-gradient-to-r from-[#00f2ff]/5 to-transparent flex items-center gap-4">
          <div className="flex flex-col min-w-0">
             <h3 className="text-lg font-bold italic truncate text-white">
               {TRACKS[currentTrack].title}
             </h3>
             <p className="text-xs opacity-50 mt-1">Synth-X AI</p>
          </div>
        </div>
      </div>

      {/* Queue Area */}
      <div className="space-y-4 hidden sm:block">
         <p className="text-[10px] uppercase tracking-widest text-slate-500">Queue</p>
         <div className="space-y-3 opacity-40">
            <div className="flex justify-between items-center text-sm">
                <span className="truncate">{TRACKS[(currentTrack + 1) % TRACKS.length].title}</span>
                <span className="text-[10px] font-mono shrink-0">--:--</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="truncate">{TRACKS[(currentTrack + 2) % TRACKS.length].title}</span>
                <span className="text-[10px] font-mono shrink-0">--:--</span>
            </div>
         </div>
      </div>

      {/* Controls */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-md mt-auto">
        <div className="flex justify-center gap-8 items-center mb-6">
          <button 
            onClick={playPrev} 
            className="text-slate-400 hover:text-[#ff007f] transition-colors cursor-pointer active:scale-95"
            aria-label="Previous Track"
          >
             <SkipBack className="w-6 h-6 fill-current" />
          </button>

          <button
            onClick={togglePlay}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer group ${
              isPlaying ? "border-[#39ff14] text-[#39ff14] shadow-[0_0_15px_rgba(57,255,20,0.3)]" : "border-slate-600 text-slate-400 hover:border-[#00f2ff] hover:text-[#00f2ff]"
            }`}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 ml-1 fill-current" />
            )}
          </button>

          <button 
            onClick={playNext} 
            className="text-slate-400 hover:text-[#ff007f] transition-colors cursor-pointer active:scale-95"
            aria-label="Next Track"
          >
             <SkipForward className="w-6 h-6 fill-current" />
          </button>
        </div>

        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
           {/* Fake progress bar styling matching the design */}
           <div className={`h-full bg-gradient-to-r from-[#00f2ff] to-[#39ff14] transition-all duration-[200ms] ease-linear`} style={{ width: isPlaying ? '64%' : '0%' }}></div>
        </div>
      </div>
    </div>
  );
}
