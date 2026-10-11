import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export default function App() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#070b08] text-[#f6f6f4]">
      {/* фоновое свечение */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(60,90,66,0.28), transparent 70%)' }}
      />

      {/* Вьюпорт */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 flex flex-col bg-[#f2f3f3]">
          <iframe
            key={resetKey}
            src="atlas/index.html"
            title="Полный атлас тела — 2234 структуры"
            className="min-h-0 w-full flex-1 border-0"
          />
          <div className="border-t border-[#d2d8d0]/15 bg-[#0b110c]/85 px-3 py-1.5 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-[#d2d8d0]/45">
            Полный атлас: 2234 структуры, 15 систем · BodyParts3D 4.0 © DBCLS, CC BY 4.0 · код обозревателя — MIT (github.com/ashemag/human-atlas)
          </div>
        </div>
      </div>

      {/* Шапка */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-2 border-b border-[#d2d8d0]/10 bg-[#0b110c]/75 px-3 py-2 backdrop-blur-md sm:px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="shrink-0">
            <circle cx="13" cy="13" r="11" stroke="#d2d8d0" strokeWidth="1.4" />
            <path d="M13 5v16M7 10h12M8.5 17h9" stroke="#4dd2ff" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <div className="min-w-0">
            <div className="truncate text-[14px] font-semibold leading-tight">Атлас анатомии</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#d2d8d0]/50">
              Corpus humanum · 3D
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setResetKey((k) => k + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d2d8d0]/12 text-[#d2d8d0]/55 transition-colors hover:text-[#f6f6f4]"
            aria-label="Перезагрузить атлас"
            title="Перезагрузить атлас"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </header>
    </div>
  );
}
