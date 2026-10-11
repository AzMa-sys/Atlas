import { useState } from 'react';
import { BP_MODELS } from '@/data/bp3dData';
import { Search } from 'lucide-react';

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function BpList({ selectedId, onSelect }: Props) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const items = q
    ? BP_MODELS.filter((m) => m.label.toLowerCase().includes(q) || m.labelLa.toLowerCase().includes(q))
    : BP_MODELS;

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-[#d2d8d0]/10 p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#d2d8d0]/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск: liver, femur…"
            className="h-10 w-full rounded-lg border border-[#d2d8d0]/15 bg-[#d2d8d0]/5 pl-9 pr-3 text-[13px] text-[#f6f6f4] placeholder:text-[#d2d8d0]/35 focus:border-[#4dd2ff]/50 focus:outline-none"
          />
        </div>
      </div>

      <div className="border-b border-[#d2d8d0]/10 px-3 py-2">
        <p className="px-1 text-[11px] leading-snug text-[#d2d8d0]/50">
          Реальные 3D-модели из{' '}
          <span className="text-[#4dd2ff]/80">BodyParts3D</span> — 934 анатомических структуры по лицензии CC BY-SA 2.1 JP
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        <div className="px-2 pb-1 pt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d2d8d0]/50">
          Модели · {items.length}
        </div>
        {items.map((m) => {
          const active = selectedId === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onSelect(active ? '' : m.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-150 ${
                active ? 'bg-[#d2d8d0]/10' : 'hover:bg-[#d2d8d0]/5'
              }`}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: m.color }}
              />
              <span className="min-w-0">
                <span className={`block truncate text-[13px] ${active ? 'text-[#4dd2ff]' : 'text-[#f6f6f4]/90'}`}>
                  {m.label}
                </span>
                <span className="block truncate font-mono text-[10px] uppercase tracking-wide text-[#d2d8d0]/45">
                  {m.labelLa}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
