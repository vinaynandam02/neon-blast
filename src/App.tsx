/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SnakeBoard } from './components/SnakeBoard';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  return (
    <div className="bg-[#05060a] text-slate-200 min-h-screen w-full overflow-hidden relative font-sans select-none border-8 border-[#0c0d16] flex flex-col">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none dot-bg"></div>
      
      <header className="relative xl:absolute mt-8 mx-8 xl:mt-0 xl:mx-0 xl:top-8 xl:left-12 flex flex-col sm:flex-row justify-between items-baseline z-20 gap-4">
        <div className="flex flex-col">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] to-[#ff007f] leading-none mb-2">
            SYNTH<br className="hidden sm:block" />SNAKE
          </h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#00f2ff]/60">Neural Interface v2.04</p>
        </div>
      </header>

      <main className="flex-1 flex flex-col xl:flex-row h-full w-full xl:min-h-screen pt-8 xl:pt-44 px-4 sm:px-12 pb-12 gap-12 xl:gap-8 relative z-10 items-center xl:items-stretch overflow-y-auto">
        {/* Left column: Music Player */}
        <aside className="w-full xl:w-64 flex flex-col justify-between py-4 order-2 xl:order-1 relative z-20 shrink-0">
          <div className="w-full h-full">
            <MusicPlayer />
          </div>
        </aside>

        {/* Center column: Game */}
        <section className="flex-1 flex flex-col items-center justify-center order-1 xl:order-2 w-full z-20 pointer-events-auto shrink-0 max-h-[80vh]">
          <SnakeBoard />
        </section>

        {/* Right column: Extra visuals */}
        <aside className="w-16 hidden xl:flex flex-col items-center justify-center gap-12 border-l border-white/5 order-3 relative z-20 shrink-0">
          <div className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.5em] text-slate-500 whitespace-nowrap">Difficulty Scale: Extreme</div>
          <div className="flex flex-col gap-4">
            <div className="w-2 h-2 rounded-full bg-[#39ff14] shadow-[0_0_8px_#39ff14]"></div>
            <div className="w-2 h-2 rounded-full bg-slate-800"></div>
            <div className="w-2 h-2 rounded-full bg-slate-800"></div>
          </div>
        </aside>
      </main>

      <footer className="hidden md:flex absolute bottom-8 right-12 text-[10px] font-mono items-center gap-4 text-slate-600 z-20">
        <span>SYSTEM_STABLE</span>
        <div className="w-24 h-[1px] bg-slate-800"></div>
        <span>BITRATE_320KBPS</span>
        <div className="w-24 h-[1px] bg-slate-800"></div>
        <span>FPS_120</span>
      </footer>
    </div>
  );
}
