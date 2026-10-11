import { useState } from 'react';
import { SYSTEMS, REGIONS, itemsBySystem, ITEMS, getItem } from '@/data/anatomy';
import { SYSTEM_COLORS } from './AnatomyModel';
import type { SystemId, RegionId } from '@/types/anatomy';
import { Bone, Dumbbell, HeartPulse, Workflow, Waypoints, Search } from 'lucide-react';

const ICONS: Record<SystemId, React.ReactNode> = {
  bones: <Bone className="h-4 w-4" />,
  muscles: <Dumbbell className="h-4 w-4" />,
  organs: <HeartPulse className="h-4 w-4" />,
  vessels: <Workflow className="h-4 w-4" />,
  nerves: <Waypoints className="h-4 w-4" />,
};

interface Props {
  soloSystem: SystemId | null;
  selectedId: string | null;
  regionFilter: RegionId | null;
  onSystem: (s: SystemId | null) => void;
  onRegion: (r: RegionId | null) => void;
  onSelect: (id: string) => void;
}

export function Sidebar({ soloSystem, selectedId, regionFilter, onSystem, onRegion, onSelect }: Props) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  const items = searching
    ? ITEMS.filter(
        (i) =>
          (i.nameRu.toLowerCase().includes(q) || i.nameLa.toLowerCase().includes(q)) &&
          (regionFilter === null || i.region === regionFilter)
      )
    : itemsBySystem(soloSystem ?? (selectedId ? getItem(selectedId)?.system : undefined) ?? 'bones').filter(
        (i) => regionFilter === null || i.region === regionFilter
      );

  return (
    <div className="flex h-full flex-col">
      {/* Поиск */}
      <div className="border-b border-[#d2d8d0]/10 p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#d2d8d0]/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск: femur, сердце…"
            className="h-10 w-full rounded-lg border border-[#d2d8d0]/15 bg-[#d2d8d0]/5 pl-9 pr-3 text-[13px] text-[#f6f6f4] placeholder:text-[#d2d8d0]/35 focus:border-[#4dd2ff]/50 focus:outline-none"
          />
        </div>
      </div>

      {/* Системы */}
      <div className="border-b border-[#d2d8d0]/10 p-3">
        <div className="mb-2 px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d2d8d0]/50">
          Система органов
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SYSTEMS.map((s) => {
            const active = soloSystem === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSystem(active ? null : s.id)}
                className={`flex min-h-[44px] items-center gap-2 rounded-lg border px-3 py-2 text-[13px] transition-all duration-200 ${
                  active
                    ? 'border-transparent text-[#0b0f0c]'
                    : 'border-[#d2d8d0]/15 bg-[#d2d8d0]/5 text-[#f6f6f4]/80 hover:border-[#d2d8d0]/30 hover:text-[#f6f6f4]'
                }`}
                style={active ? { backgroundColor: s.color } : undefined}
              >
                {ICONS[s.id]}
                {s.nameRu}
              </button>
            );
          })}
        </div>
        {soloSystem && (
          <p className="mt-2 px-1 text-[11px] leading-snug text-[#d2d8d0]/60">
            {SYSTEMS.find((s) => s.id === soloSystem)?.description}
          </p>
        )}
      </div>

      {/* Области */}
      <div className="border-b border-[#d2d8d0]/10 p-3">
        <div className="mb-2 px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d2d8d0]/50">
          Область тела
        </div>
        <div className="flex flex-wrap gap-1.5">
          {REGIONS.map((r) => {
            const active = regionFilter === r.id;
            return (
              <button
                key={r.id}
                onClick={() => onRegion(active ? null : r.id)}
                className={`min-h-[36px] rounded-full border px-3 py-1.5 text-[12px] transition-all duration-200 ${
                  active
                    ? 'border-[#4dd2ff]/70 bg-[#4dd2ff]/10 text-[#4dd2ff]'
                    : 'border-[#d2d8d0]/15 text-[#d2d8d0]/70 hover:border-[#d2d8d0]/35 hover:text-[#f6f6f4]'
                }`}
              >
                {r.nameRu}
              </button>
            );
          })}
        </div>
      </div>

      {/* Список структур */}
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        <div className="px-2 pb-1 pt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d2d8d0]/50">
          {searching ? `Найдено · ${items.length}` : `Структуры · ${items.length}`}
        </div>
        {items.length === 0 && (
          <p className="px-2 py-4 text-[12px] text-[#d2d8d0]/50">
            В этой области нет структур выбранной системы.
          </p>
        )}
        {items.map((i) => {
          const active = selectedId === i.id;
          return (
            <button
              key={i.id}
              onClick={() => onSelect(active ? '' : i.id)}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-150 ${
                active ? 'bg-[#d2d8d0]/10' : 'hover:bg-[#d2d8d0]/5'
              }`}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: SYSTEM_COLORS[i.system] }}
              />
              <span className="min-w-0">
                <span className={`block truncate text-[13px] ${active ? 'text-[#4dd2ff]' : 'text-[#f6f6f4]/90'}`}>
                  {i.nameRu}
                </span>
                <span className="block truncate font-mono text-[10px] uppercase tracking-wide text-[#d2d8d0]/45">
                  {i.nameLa}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
