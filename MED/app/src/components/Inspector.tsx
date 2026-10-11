import { getItem, getSystem, REGIONS, ITEMS } from '@/data/anatomy';
import { SYSTEM_COLORS } from './AnatomyModel';
import { X } from 'lucide-react';

interface Props {
  selectedId: string | null;
  onClose: () => void;
  onSelect: (id: string) => void;
}

export function Inspector({ selectedId, onClose, onSelect }: Props) {
  const item = selectedId ? getItem(selectedId) : undefined;

  if (!item) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
        <div className="mb-3 h-10 w-10 rounded-full border border-dashed border-[#d2d8d0]/25" />
        <p className="max-w-[240px] text-[13px] leading-relaxed text-[#d2d8d0]/55">
          Выберите структуру на модели или в списке — здесь появится подробное описание.
        </p>
      </div>
    );
  }

  const sys = getSystem(item.system);
  const region = REGIONS.find((r) => r.id === item.region);
  const related = ITEMS.filter((i) => i.region === item.region && i.id !== item.id).slice(0, 8);

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="border-b border-[#d2d8d0]/10 p-4">
        <div className="flex items-start justify-between gap-3">
          <div
            className="rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em]"
            style={{ backgroundColor: `${SYSTEM_COLORS[item.system]}22`, color: SYSTEM_COLORS[item.system] }}
          >
            {sys.nameRu} · {sys.nameLa}
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#d2d8d0]/60 transition-colors hover:bg-[#d2d8d0]/10 hover:text-[#f6f6f4]"
            aria-label="Закрыть"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <h2 className="mt-3 text-xl font-semibold leading-tight text-[#f6f6f4]">{item.nameRu}</h2>
        <p className="mt-0.5 font-mono text-[12px] italic text-[#4dd2ff]/90">{item.nameLa}</p>
        <p className="mt-2 text-[12px] text-[#d2d8d0]/55">
          Область: {region?.nameRu} <span className="font-mono text-[10px]">({region?.nameLa})</span>
        </p>
      </div>

      <div className="p-4">
        <p className="text-[13px] font-medium leading-snug text-[#d2d8d0]/90">{item.short}</p>
        <p className="mt-3 text-[13px] leading-relaxed text-[#d2d8d0]/70">{item.description}</p>

        <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d2d8d0]/50">
          Ключевые факты
        </div>
        <ul className="mt-2 space-y-2">
          {item.facts.map((f, idx) => (
            <li key={idx} className="flex gap-2.5 text-[12.5px] leading-relaxed text-[#d2d8d0]/75">
              <span
                className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: SYSTEM_COLORS[item.system] }}
              />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d2d8d0]/50">
          Также в области «{region?.nameRu}»
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {related.map((r) => (
            <button
              key={r.id}
              onClick={() => onSelect(r.id)}
              className="flex min-h-[36px] items-center gap-1.5 rounded-full border border-[#d2d8d0]/12 px-3 py-1.5 text-[12px] text-[#d2d8d0]/70 transition-colors hover:border-[#4dd2ff]/40 hover:text-[#4dd2ff]"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: SYSTEM_COLORS[r.system] }}
              />
              {r.nameRu}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
