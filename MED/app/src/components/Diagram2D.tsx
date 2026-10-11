import type { SystemId } from '@/types/anatomy';
import { SYSTEM_COLORS } from './AnatomyModel';

const ARTERY = '#c65a5a';
const VEIN = '#5f83c9';

interface Props {
  soloSystem: SystemId | null;
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
}

function G({
  item, sys, children, p,
}: {
  item: string; sys: SystemId; fill: string; children: React.ReactNode; p: Props;
}) {
  const visible = p.soloSystem === null || p.soloSystem === sys;
  const isSel = p.selectedId === item;
  const isHov = p.hoveredId === item;
  const dim = p.selectedId !== null && !isSel;
  return (
    <g
      style={{
        cursor: 'pointer',
        opacity: !visible ? 0 : dim ? 0.28 : 1,
        transition: 'opacity .25s ease',
        filter: isSel ? 'drop-shadow(0 0 7px rgba(77,210,255,.95))' : isHov ? 'drop-shadow(0 0 4px rgba(77,210,255,.55))' : 'none',
      }}
      onClick={(e) => { e.stopPropagation(); p.onSelect(isSel ? null : item); }}
      onPointerOver={(e) => { e.stopPropagation(); p.onHover(item); }}
      onPointerOut={() => p.onHover(null)}
    >
      {children}
      <style>{``}</style>
    </g>
  );
}

const Sh = ({ d, f, s = 'none', sw = 0 }: { d: string; f: string; s?: string; sw?: number }) => (
  <path d={d} fill={f} stroke={s} strokeWidth={sw} strokeLinecap="round" />
);
const Ci = ({ cx, cy, r, f, s = 'none', sw = 0 }: { cx: number; cy: number; r: number; f: string; s?: string; sw?: number }) => (
  <circle cx={cx} cy={cy} r={r} fill={f} stroke={s} strokeWidth={sw} />
);
const El = ({ cx, cy, rx, ry, f, rot = 0 }: { cx: number; cy: number; rx: number; ry: number; f: string; rot?: number }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={f} transform={rot ? `rotate(${rot} ${cx} ${cy})` : undefined} />
);
const Rr = ({ x, y, w, h, rx = 3, f, rot = 0 }: { x: number; y: number; w: number; h: number; rx?: number; f: string; rot?: number }) => (
  <rect x={x} y={y} width={w} height={h} rx={rx} fill={f} transform={rot ? `rotate(${rot} ${x + w / 2} ${y + h / 2})` : undefined} />
);

export function Diagram2D(p: Props) {
  const outline = '#1e2a20';
  const cx = 200;

  return (
    <svg
      viewBox="0 0 400 760"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      onClick={() => p.onSelect(null)}
    >
      {/* силуэт */}
      <g fill={outline} stroke="#2e3d30" strokeWidth="1.5">
        <circle cx={cx} cy={72} r={36} />
        <path d={`M ${cx - 14} 106 L ${cx + 14} 106 L ${cx + 18} 140 L ${cx - 18} 140 Z`} />
        <path d={`M ${cx - 52} 138 C ${cx - 62} 180, ${cx - 58} 250, ${cx - 46} 330 C ${cx - 40} 370, ${cx - 42} 400, ${cx - 30} 420
                   L ${cx + 30} 420 C ${cx + 42} 400, ${cx + 40} 370, ${cx + 46} 330 C ${cx + 58} 250, ${cx + 62} 180, ${cx + 52} 138 Z`} />
        {([1, -1] as const).map((s) => (
          <path key={s} d={`M ${cx + s * 55} 142 C ${cx + s * 72} 160, ${cx + s * 76} 230, ${cx + s * 70} 300
            C ${cx + s * 66} 360, ${cx + s * 66} 420, ${cx + s * 68} 452 L ${cx + s * 54} 452
            C ${cx + s * 52} 400, ${cx + s * 50} 340, ${cx + s * 48} 280 C ${cx + s * 46} 220, ${cx + s * 44} 170, ${cx + s * 40} 148 Z`} />
        ))}
        {([1, -1] as const).map((s) => (
          <path key={s} d={`M ${cx + s * 26} 424 C ${cx + s * 34} 470, ${cx + s * 32} 540, ${cx + s * 30} 610
            L ${cx + s * 46} 700 L ${cx + s * 42} 716 L ${cx + s * 14} 716
            C ${cx + s * 12} 660, ${cx + s * 8} 560, ${cx + s * 4} 470 L ${cx + s * 2} 428 Z`} />
        ))}
      </g>

      {/* ── КОСТИ ── */}
      <G item="skull" sys="bones" fill={SYSTEM_COLORS.bones} p={p}>
        <Ci cx={cx} cy={70} r={30} f={SYSTEM_COLORS.bones} s="#0b0f0c" sw={1.5} />
        <El cx={cx} cy={92} rx={16} ry={7} f="#d8d0bc" />
        <Sh d={`M ${cx - 12} 55 Q ${cx} 48 ${cx + 12} 55`} f="none" s="#0b0f0c" sw={2} />
      </G>
      <G item="spine" sys="bones" fill={SYSTEM_COLORS.bones} p={p}>
        {Array.from({ length: 15 }).map((_, i) => (
          <Rr key={i} x={cx - 6} y={132 + i * 14.5} w={12} h={9} rx={3} f={SYSTEM_COLORS.bones} />
        ))}
      </G>
      <G item="ribs" sys="bones" fill={SYSTEM_COLORS.bones} p={p}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const y = 160 + i * 22;
          const w = 40 - i * 2.5;
          return (
            <Sh key={i}
              d={`M ${cx - 6} ${y} C ${cx - w} ${y - 2}, ${cx - w - 4} ${y + 16}, ${cx - w + 2} ${y + 26}
                 M ${cx + 6} ${y} C ${cx + w} ${y - 2}, ${cx + w + 4} ${y + 16}, ${cx + w - 2} ${y + 26}`}
              f="none" s={SYSTEM_COLORS.bones} sw={4.5} />
          );
        })}
      </G>
      <G item="sternum" sys="bones" fill={SYSTEM_COLORS.bones} p={p}>
        <Rr x={cx - 5} y={158} w={10} h={88} rx={4} f={SYSTEM_COLORS.bones} />
        <Ci cx={cx - 26} cy={152} r={4} f={SYSTEM_COLORS.bones} />
        <Ci cx={cx + 26} cy={152} r={4} f={SYSTEM_COLORS.bones} />
      </G>
      <G item="clavicle" sys="bones" fill={SYSTEM_COLORS.bones} p={p}>
        <Sh d={`M ${cx - 40} 150 L ${cx - 8} 154 M ${cx + 40} 150 L ${cx + 8} 154`} f="none" s={SYSTEM_COLORS.bones} sw={4} />
      </G>
      <G item="pelvis" sys="bones" fill={SYSTEM_COLORS.bones} p={p}>
        <Sh d={`M ${cx - 34} 402 C ${cx - 46} 418, ${cx - 40} 442, ${cx - 20} 446 L ${cx - 10} 432 L ${cx - 10} 410 Z
                 M ${cx + 34} 402 C ${cx + 46} 418, ${cx + 40} 442, ${cx + 20} 446 L ${cx + 10} 432 L ${cx + 10} 410 Z`}
          f={SYSTEM_COLORS.bones} s="#0b0f0c" sw={1} />
        <Sh d={`M ${cx - 10} 414 L ${cx + 10} 414 L ${cx + 8} 434 Q ${cx} 440 ${cx - 8} 434 Z`} f="#d8d0bc" />
      </G>
      <G item="humerus" sys="bones" fill={SYSTEM_COLORS.bones} p={p}>
        <Sh d={`M ${cx - 58} 168 L ${cx - 66} 292 M ${cx + 58} 168 L ${cx + 66} 292`} f="none" s={SYSTEM_COLORS.bones} sw={7} />
        <Ci cx={cx - 58} cy={166} r={7} f={SYSTEM_COLORS.bones} />
        <Ci cx={cx + 58} cy={166} r={7} f={SYSTEM_COLORS.bones} />
      </G>
      <G item="radius_ulna" sys="bones" fill={SYSTEM_COLORS.bones} p={p}>
        <Sh d={`M ${cx - 63} 300 L ${cx - 64} 430 M ${cx - 70} 300 L ${cx - 72} 428
                 M ${cx + 63} 300 L ${cx + 64} 430 M ${cx + 70} 300 L ${cx + 72} 428`} f="none" s={SYSTEM_COLORS.bones} sw={4} />
      </G>
      <G item="hand_bones" sys="bones" fill={SYSTEM_COLORS.bones} p={p}>
        <Rr x={cx - 76} y={436} w={20} h={26} rx={6} f={SYSTEM_COLORS.bones} />
        <Rr x={cx + 56} y={436} w={20} h={26} rx={6} f={SYSTEM_COLORS.bones} />
      </G>
      <G item="femur" sys="bones" fill={SYSTEM_COLORS.bones} p={p}>
        <Sh d={`M ${cx - 24} 452 L ${cx - 30} 596 M ${cx + 24} 452 L ${cx + 30} 596`} f="none" s={SYSTEM_COLORS.bones} sw={8} />
        <Ci cx={cx - 24} cy={452} r={7} f={SYSTEM_COLORS.bones} />
        <Ci cx={cx + 24} cy={452} r={7} f={SYSTEM_COLORS.bones} />
      </G>
      <G item="tibia_fibula" sys="bones" fill={SYSTEM_COLORS.bones} p={p}>
        <Sh d={`M ${cx - 28} 604 L ${cx - 32} 700 M ${cx - 38} 606 L ${cx - 44} 698
                 M ${cx + 28} 604 L ${cx + 32} 700 M ${cx + 38} 606 L ${cx + 44} 698`} f="none" s={SYSTEM_COLORS.bones} sw={4.5} />
      </G>
      <G item="foot_bones" sys="bones" fill={SYSTEM_COLORS.bones} p={p}>
        <Sh d={`M ${cx - 50} 706 L ${cx - 12} 706 L ${cx - 12} 716 L ${cx - 46} 716 Z
                 M ${cx + 50} 706 L ${cx + 12} 706 L ${cx + 12} 716 L ${cx + 46} 716 Z`} f={SYSTEM_COLORS.bones} />
      </G>

      {/* ── МЫШЦЫ ── */}
      <G item="deltoid" sys="muscles" fill={SYSTEM_COLORS.muscles} p={p}>
        <Ci cx={cx - 55} cy={158} r={15} f={SYSTEM_COLORS.muscles} />
        <Ci cx={cx + 55} cy={158} r={15} f={SYSTEM_COLORS.muscles} />
      </G>
      <G item="biceps" sys="muscles" fill={SYSTEM_COLORS.muscles} p={p}>
        <El cx={cx - 60} cy={215} rx={10} ry={32} f={SYSTEM_COLORS.muscles} rot={4} />
        <El cx={cx + 60} cy={215} rx={10} ry={32} f={SYSTEM_COLORS.muscles} rot={-4} />
      </G>
      <G item="triceps" sys="muscles" fill="#c25a4c" p={p}>
        <El cx={cx - 72} cy={220} rx={8} ry={34} f="#c25a4c" rot={-4} />
        <El cx={cx + 72} cy={220} rx={8} ry={34} f="#c25a4c" rot={4} />
      </G>
      <G item="pectoralis" sys="muscles" fill={SYSTEM_COLORS.muscles} p={p}>
        <Sh d={`M ${cx - 6} 160 C ${cx - 30} 156, ${cx - 44} 170, ${cx - 40} 192 C ${cx - 30} 202, ${cx - 10} 200, ${cx - 5} 190 Z
                 M ${cx + 6} 160 C ${cx + 30} 156, ${cx + 44} 170, ${cx + 40} 192 C ${cx + 30} 202, ${cx + 10} 200, ${cx + 5} 190 Z`}
          f={SYSTEM_COLORS.muscles} />
      </G>
      <G item="abs" sys="muscles" fill={SYSTEM_COLORS.muscles} p={p}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Rr x={cx - 17} y={250 + i * 26} w={14} h={20} rx={4} f={SYSTEM_COLORS.muscles} />
            <Rr x={cx + 3} y={250 + i * 26} w={14} h={20} rx={4} f={SYSTEM_COLORS.muscles} />
          </g>
        ))}
      </G>
      <G item="gluteus" sys="muscles" fill={SYSTEM_COLORS.muscles} p={p}>
        <Sh d={`M ${cx - 12} 424 C ${cx - 34} 428, ${cx - 38} 452, ${cx - 18} 458 C ${cx - 8} 452, ${cx - 6} 436, ${cx - 12} 424 Z
                 M ${cx + 12} 424 C ${cx + 34} 428, ${cx + 38} 452, ${cx + 18} 458 C ${cx + 8} 452, ${cx + 6} 436, ${cx + 12} 424 Z`}
          f={SYSTEM_COLORS.muscles} />
      </G>
      <G item="quadriceps" sys="muscles" fill={SYSTEM_COLORS.muscles} p={p}>
        <El cx={cx - 24} cy={500} rx={13} ry={48} f={SYSTEM_COLORS.muscles} rot={3} />
        <El cx={cx + 24} cy={500} rx={13} ry={48} f={SYSTEM_COLORS.muscles} rot={-3} />
        <Ci cx={cx - 25} cy={556} r={10} f={SYSTEM_COLORS.muscles} />
        <Ci cx={cx + 25} cy={556} r={10} f={SYSTEM_COLORS.muscles} />
      </G>
      <G item="gastrocnemius" sys="muscles" fill={SYSTEM_COLORS.muscles} p={p}>
        <El cx={cx - 33} cy={640} rx={9} ry={30} f={SYSTEM_COLORS.muscles} rot={-4} />
        <El cx={cx + 33} cy={640} rx={9} ry={30} f={SYSTEM_COLORS.muscles} rot={4} />
      </G>

      {/* ── ОРГАНЫ ── */}
      <G item="brain" sys="organs" fill="#c9a191" p={p}>
        <Sh d={`M ${cx - 22} 62 Q ${cx - 24} 44 ${cx - 8} 42 Q ${cx} 36 ${cx + 8} 42 Q ${cx + 24} 44 ${cx + 22} 62
                 Q ${cx + 20} 78 ${cx} 80 Q ${cx - 20} 78 ${cx - 22} 62 Z`} f="#c9a191" s="#0b0f0c" sw={1.5} />
        <Sh d={`M ${cx - 14} 56 Q ${cx} 50 ${cx + 14} 56 M ${cx} 44 L ${cx} 78`} f="none" s="#0b0f0c" sw={1.2} />
      </G>
      <G item="heart" sys="organs" fill="#b85454" p={p}>
        <Sh d={`M ${cx + 8} 236 C ${cx + 2} 228, ${cx - 6} 232, ${cx - 6} 240 C ${cx - 6} 250, ${cx + 4} 258, ${cx + 8} 262
                 C ${cx + 12} 258, ${cx + 22} 250, ${cx + 22} 240 C ${cx + 22} 232, ${cx + 14} 228, ${cx + 8} 236 Z`}
          f="#b85454" s="#0b0f0c" sw={1} />
      </G>
      <G item="lungs" sys="organs" fill="#c9937f" p={p}>
        <Sh d={`M ${cx - 10} 170 C ${cx - 28} 168, ${cx - 36} 186, ${cx - 34} 214 C ${cx - 32} 238, ${cx - 18} 244, ${cx - 11} 238
                 C ${cx - 8} 220, ${cx - 8} 190, ${cx - 10} 170 Z
                 M ${cx + 10} 170 C ${cx + 28} 168, ${cx + 36} 186, ${cx + 34} 214 C ${cx + 32} 238, ${cx + 18} 244, ${cx + 11} 238
                 C ${cx + 8} 220, ${cx + 8} 190, ${cx + 10} 170 Z`}
          f="#c9937f" s="#0b0f0c" sw={1} />
      </G>
      <G item="liver" sys="organs" fill="#7a4b3a" p={p}>
        <Sh d={`M ${cx - 4} 252 C ${cx + 12} 246, ${cx + 30} 250, ${cx + 32} 262 C ${cx + 30} 274, ${cx + 12} 278, ${cx - 2} 274 C ${cx - 6} 266, ${cx - 6} 258, ${cx - 4} 252 Z`}
          f="#7a4b3a" />
      </G>
      <G item="stomach" sys="organs" fill="#d9a08a" p={p}>
        <Sh d={`M ${cx - 10} 258 C ${cx - 24} 256, ${cx - 30} 268, ${cx - 26} 280 C ${cx - 20} 290, ${cx - 8} 288, ${cx - 6} 278 C ${cx - 5} 268, ${cx - 6} 262, ${cx - 10} 258 Z`}
          f="#d9a08a" />
      </G>
      <G item="kidneys" sys="organs" fill="#8a5a48" p={p}>
        <El cx={cx - 13} cy={292} rx={6} ry={10} f="#8a5a48" rot={-15} />
        <El cx={cx + 13} cy={292} rx={6} ry={10} f="#8a5a48" rot={15} />
      </G>
      <G item="intestines" sys="organs" fill="#c98a6e" p={p}>
        <Sh d={`M ${cx - 22} 300 C ${cx - 26} 316, ${cx - 20} 336, ${cx} 340 C ${cx + 20} 336, ${cx + 26} 316, ${cx + 22} 300
                 C ${cx + 12} 308, ${cx - 12} 308, ${cx - 22} 300 Z
                 M ${cx - 16} 314 Q ${cx} 322 ${cx + 16} 314 M ${cx - 12} 328 Q ${cx} 336 ${cx + 12} 328`}
          f="#c98a6e" s="#0b0f0c" sw={1} />
      </G>

      {/* ── СОСУДЫ ── */}
      <G item="aorta" sys="vessels" fill={ARTERY} p={p}>
        <Sh d={`M ${cx + 2} 240 C ${cx} 268, ${cx} 300, ${cx} 330 C ${cx} 360, ${cx} 390, ${cx} 416`} f="none" s={ARTERY} sw={5} />
        <Sh d={`M ${cx + 1} 258 C ${cx - 14} 250, ${cx - 24} 244, ${cx - 30} 238 M ${cx + 1} 258 C ${cx + 14} 250, ${cx + 22} 246, ${cx + 28} 240`}
          f="none" s={ARTERY} sw={3.5} />
      </G>
      <G item="vena_cava" sys="vessels" fill={VEIN} p={p}>
        <Sh d={`M ${cx - 4} 242 C ${cx - 5} 270, ${cx - 5} 300, ${cx - 4} 330 C ${cx - 3} 360, ${cx - 2} 390, ${cx - 2} 414`}
          f="none" s={VEIN} sw={5.5} />
      </G>
      <G item="carotid" sys="vessels" fill={ARTERY} p={p}>
        <Sh d={`M ${cx - 4} 112 L ${cx - 6} 60 M ${cx + 4} 112 L ${cx + 6} 60`} f="none" s={ARTERY} sw={3} />
      </G>
      <G item="jugular" sys="vessels" fill={VEIN} p={p}>
        <Sh d={`M ${cx - 10} 110 L ${cx - 12} 64 M ${cx + 10} 110 L ${cx + 12} 64`} f="none" s={VEIN} sw={3} />
      </G>
      <G item="femoral_artery" sys="vessels" fill={ARTERY} p={p}>
        <Sh d={`M ${cx} 420 C ${cx - 14} 440, ${cx - 22} 470, ${cx - 26} 510 C ${cx - 29} 560, ${cx - 30} 640, ${cx - 31} 700
                 M ${cx} 420 C ${cx + 14} 440, ${cx + 22} 470, ${cx + 26} 510 C ${cx + 29} 560, ${cx + 30} 640, ${cx + 31} 700`}
          f="none" s={ARTERY} sw={3} />
      </G>
      <G item="subclavian" sys="vessels" fill={ARTERY} p={p}>
        <Sh d={`M ${cx} 152 C ${cx - 26} 148, ${cx - 44} 152, ${cx - 56} 164 M ${cx} 152 C ${cx + 26} 148, ${cx + 44} 152, ${cx + 56} 164`}
          f="none" s={ARTERY} sw={3} />
      </G>

      {/* ── НЕРВЫ ── */}
      <G item="brainstem" sys="nerves" fill={SYSTEM_COLORS.nerves} p={p}>
        <Rr x={cx - 4} y={94} w={8} h={16} rx={3} f={SYSTEM_COLORS.nerves} />
      </G>
      <G item="spinal_cord" sys="nerves" fill={SYSTEM_COLORS.nerves} p={p}>
        <Sh d={`M ${cx} 112 L ${cx} 414`} f="none" s={SYSTEM_COLORS.nerves} sw={3.5} />
        {Array.from({ length: 8 }).map((_, i) => (
          <Sh key={i} d={`M ${cx} ${140 + i * 34} L ${cx - 12} ${146 + i * 34} M ${cx} ${140 + i * 34} L ${cx + 12} ${146 + i * 34}`}
            f="none" s={SYSTEM_COLORS.nerves} sw={1.5} />
        ))}
      </G>
      <G item="vagus" sys="nerves" fill={SYSTEM_COLORS.nerves} p={p}>
        <Sh d={`M ${cx + 3} 110 C ${cx + 6} 160, ${cx + 5} 220, ${cx + 4} 280 C ${cx + 3} 340, ${cx + 2} 380, ${cx + 1} 412`}
          f="none" s={SYSTEM_COLORS.nerves} sw={2} />
      </G>
      <G item="brachial_plexus" sys="nerves" fill={SYSTEM_COLORS.nerves} p={p}>
        <Sh d={`M ${cx - 3} 142 C ${cx - 30} 146, ${cx - 48} 156, ${cx - 58} 180 C ${cx - 64} 230, ${cx - 66} 300, ${cx - 66} 400
                 M ${cx + 3} 142 C ${cx + 30} 146, ${cx + 48} 156, ${cx + 58} 180 C ${cx + 64} 230, ${cx + 66} 300, ${cx + 66} 400`}
          f="none" s={SYSTEM_COLORS.nerves} sw={2} />
      </G>
      <G item="sciatic" sys="nerves" fill={SYSTEM_COLORS.nerves} p={p}>
        <Sh d={`M ${cx - 4} 416 C ${cx - 20} 440, ${cx - 26} 480, ${cx - 28} 540 C ${cx - 30} 600, ${cx - 30} 660, ${cx - 30} 700
                 M ${cx + 4} 416 C ${cx + 20} 440, ${cx + 26} 480, ${cx + 28} 540 C ${cx + 30} 600, ${cx + 30} 660, ${cx + 30} 700`}
          f="none" s={SYSTEM_COLORS.nerves} sw={2} />
      </G>
      <G item="femoral_nerve" sys="nerves" fill={SYSTEM_COLORS.nerves} p={p}>
        <Sh d={`M ${cx - 1} 416 C ${cx - 10} 440, ${cx - 18} 470, ${cx - 22} 520 M ${cx + 1} 416 C ${cx + 10} 440, ${cx + 18} 470, ${cx + 22} 520`}
          f="none" s={SYSTEM_COLORS.nerves} sw={2} />
      </G>

      {/* ═══ ДОПОЛНИТЕЛЬНЫЙ СКЕЛЕТ ═══ */}
      <G item="scapula" sys="bones" fill={SYSTEM_COLORS.bones} p={p}>
        <Sh d={`M ${cx - 48} 158 L ${cx - 34} 196 M ${cx + 48} 158 L ${cx + 34} 196`} f="none" s={SYSTEM_COLORS.bones} sw={7} />
      </G>
      <G item="sacrum" sys="bones" fill={SYSTEM_COLORS.bones} p={p}>
        <Sh d={`M ${cx - 10} 414 L ${cx + 10} 414 L ${cx + 7} 440 Q ${cx} 446 ${cx - 7} 440 Z`} f={SYSTEM_COLORS.bones} s="#0b0f0c" sw={1} />
      </G>
      <G item="patella" sys="bones" fill={SYSTEM_COLORS.bones} p={p}>
        <Ci cx={cx - 25} cy={550} r={5} f={SYSTEM_COLORS.bones} s="#0b0f0c" sw={1} />
        <Ci cx={cx + 25} cy={550} r={5} f={SYSTEM_COLORS.bones} s="#0b0f0c" sw={1} />
      </G>
      <G item="hyoid" sys="bones" fill={SYSTEM_COLORS.bones} p={p}>
        <Ci cx={cx} cy={108} r={4} f={SYSTEM_COLORS.bones} />
      </G>

      {/* ═══ ДОПОЛНИТЕЛЬНЫЕ МЫШЦЫ ═══ */}
      <G item="trapezius" sys="muscles" fill={SYSTEM_COLORS.muscles} p={p}>
        <Sh d={`M ${cx - 14} 108 L ${cx - 52} 148 M ${cx + 14} 108 L ${cx + 52} 148 M ${cx - 14} 108 L ${cx + 14} 108`} f="none" s={SYSTEM_COLORS.muscles} sw={9} />
      </G>
      <G item="latissimus" sys="muscles" fill={SYSTEM_COLORS.muscles} p={p}>
        <El cx={cx - 42} cy={215} rx={7} ry={38} f={SYSTEM_COLORS.muscles} rot={8} />
        <El cx={cx + 42} cy={215} rx={7} ry={38} f={SYSTEM_COLORS.muscles} rot={-8} />
      </G>
      <G item="scm" sys="muscles" fill={SYSTEM_COLORS.muscles} p={p}>
        <Sh d={`M ${cx - 4} 136 L ${cx - 12} 110 M ${cx + 4} 136 L ${cx + 12} 110`} f="none" s={SYSTEM_COLORS.muscles} sw={4} />
      </G>
      <G item="forearm_muscles" sys="muscles" fill={SYSTEM_COLORS.muscles} p={p}>
        <El cx={cx - 65} cy={365} rx={10} ry={45} f={SYSTEM_COLORS.muscles} />
        <El cx={cx + 65} cy={365} rx={10} ry={45} f={SYSTEM_COLORS.muscles} />
      </G>
      <G item="hamstrings" sys="muscles" fill="#c25a4c" p={p}>
        <El cx={cx - 33} cy={510} rx={8} ry={42} f="#c25a4c" rot={-3} />
        <El cx={cx + 33} cy={510} rx={8} ry={42} f="#c25a4c" rot={3} />
      </G>
      <G item="soleus" sys="muscles" fill="#c25a4c" p={p}>
        <El cx={cx - 34} cy={676} rx={7} ry={24} f="#c25a4c" />
        <El cx={cx + 34} cy={676} rx={7} ry={24} f="#c25a4c" />
      </G>
      <G item="diaphragm" sys="muscles" fill="#b5604e" p={p}>
        <Sh d={`M ${cx - 32} 248 Q ${cx} 232 ${cx + 32} 248`} f="none" s="#b5604e" sw={5} />
      </G>
      <G item="masseter" sys="muscles" fill={SYSTEM_COLORS.muscles} p={p}>
        <El cx={cx - 16} cy={90} rx={4} ry={9} f={SYSTEM_COLORS.muscles} />
        <El cx={cx + 16} cy={90} rx={4} ry={9} f={SYSTEM_COLORS.muscles} />
      </G>

      {/* ═══ ДОПОЛНИТЕЛЬНЫЕ ОРГАНЫ ═══ */}
      <G item="spleen" sys="organs" fill="#8a4a44" p={p}>
        <El cx={cx - 26} cy={272} rx={6} ry={11} f="#8a4a44" rot={15} />
      </G>
      <G item="pancreas" sys="organs" fill="#d9b08a" p={p}>
        <El cx={cx} cy={284} rx={13} ry={4} f="#d9b08a" />
      </G>
      <G item="bladder" sys="organs" fill="#c9a08a" p={p}>
        <Ci cx={cx} cy={392} r={8} f="#c9a08a" />
      </G>
      <G item="thyroid" sys="organs" fill="#b5764e" p={p}>
        <Ci cx={cx - 5} cy={114} r={4} f="#b5764e" />
        <Ci cx={cx + 5} cy={114} r={4} f="#b5764e" />
      </G>
      <G item="gallbladder" sys="organs" fill="#5a7a3a" p={p}>
        <Ci cx={cx + 27} cy={264} r={4.5} f="#5a7a3a" />
      </G>

      {/* ═══ ДОПОЛНИТЕЛЬНЫЕ СОСУДЫ ═══ */}
      <G item="pulmonary" sys="vessels" fill={ARTERY} p={p}>
        <Sh d={`M ${cx + 8} 240 L ${cx + 14} 236 M ${cx + 8} 240 L ${cx + 14} 246`} f="none" s={ARTERY} sw={3} />
        <Sh d={`M ${cx + 14} 236 L ${cx + 18} 234 M ${cx + 14} 246 L ${cx + 18} 248`} f="none" s={VEIN} sw={2.5} />
      </G>
      <G item="coronary" sys="vessels" fill={ARTERY} p={p}>
        <Sh d={`M ${cx} 234 Q ${cx + 8} 232 ${cx + 16} 236`} f="none" s={ARTERY} sw={2} />
      </G>
      <G item="brachial_artery" sys="vessels" fill={ARTERY} p={p}>
        <Sh d={`M ${cx - 56} 172 L ${cx - 62} 288 M ${cx + 56} 172 L ${cx + 62} 288`} f="none" s={ARTERY} sw={2.5} />
      </G>
      <G item="forearm_vessels" sys="vessels" fill={ARTERY} p={p}>
        <Sh d={`M ${cx - 62} 296 L ${cx - 66} 428 M ${cx + 62} 296 L ${cx + 66} 428`} f="none" s={ARTERY} sw={1.8} />
      </G>
      <G item="saphenous" sys="vessels" fill={VEIN} p={p}>
        <Sh d={`M ${cx - 18} 460 C ${cx - 20} 520, ${cx - 20} 620, ${cx - 20} 700
                 M ${cx + 18} 460 C ${cx + 20} 520, ${cx + 20} 620, ${cx + 20} 700`} f="none" s={VEIN} sw={2} />
      </G>
      <G item="vertebral_artery" sys="vessels" fill={ARTERY} p={p}>
        <Sh d={`M ${cx - 2} 116 L ${cx - 3} 66 M ${cx + 2} 116 L ${cx + 3} 66`} f="none" s={ARTERY} sw={2} />
      </G>
      <G item="portal_vein" sys="vessels" fill={VEIN} p={p}>
        <Sh d={`M ${cx - 2} 292 L ${cx + 8} 276 L ${cx + 18} 266`} f="none" s={VEIN} sw={3} />
      </G>

      {/* ═══ ДОПОЛНИТЕЛЬНЫЕ НЕРВЫ ═══ */}
      <G item="hand_nerves" sys="nerves" fill={SYSTEM_COLORS.nerves} p={p}>
        <Sh d={`M ${cx - 60} 300 C ${cx - 62} 340, ${cx - 63} 400, ${cx - 63} 448
                 M ${cx + 60} 300 C ${cx + 62} 340, ${cx + 63} 400, ${cx + 63} 448`} f="none" s={SYSTEM_COLORS.nerves} sw={1.5} />
      </G>
      <G item="tibial_nerve" sys="nerves" fill={SYSTEM_COLORS.nerves} p={p}>
        <Sh d={`M ${cx - 29} 560 L ${cx - 30} 700 M ${cx + 29} 560 L ${cx + 30} 700`} f="none" s={SYSTEM_COLORS.nerves} sw={1.5} />
      </G>
      <G item="facial" sys="nerves" fill={SYSTEM_COLORS.nerves} p={p}>
        <Sh d={`M ${cx} 96 L ${cx - 12} 84 M ${cx} 96 L ${cx + 12} 84 M ${cx} 96 L ${cx} 80`} f="none" s={SYSTEM_COLORS.nerves} sw={1.5} />
      </G>
      <G item="optic" sys="nerves" fill={SYSTEM_COLORS.nerves} p={p}>
        <Sh d={`M ${cx - 8} 72 L ${cx - 2} 70 M ${cx + 8} 72 L ${cx + 2} 70`} f="none" s={SYSTEM_COLORS.nerves} sw={1.5} />
      </G>
      <G item="phrenic" sys="nerves" fill={SYSTEM_COLORS.nerves} p={p}>
        <Sh d={`M ${cx - 6} 150 L ${cx - 8} 246 M ${cx + 6} 150 L ${cx + 8} 246`} f="none" s={SYSTEM_COLORS.nerves} sw={1.5} />
      </G>
      <G item="sympathetic" sys="nerves" fill={SYSTEM_COLORS.nerves} p={p}>
        <Sh d={`M ${cx - 9} 122 L ${cx - 9} 408 M ${cx + 9} 122 L ${cx + 9} 408`} f="none" s={SYSTEM_COLORS.nerves} sw={1.2} />
        {Array.from({ length: 6 }).map((_, i) => (
          <Sh key={i} d={`M ${cx - 11} ${140 + i * 46} L ${cx - 7} ${140 + i * 46} M ${cx + 7} ${140 + i * 46} L ${cx + 11} ${140 + i * 46}`}
            f="none" s={SYSTEM_COLORS.nerves} sw={1.2} />
        ))}
      </G>
      <G item="trigeminal" sys="nerves" fill={SYSTEM_COLORS.nerves} p={p}>
        <Sh d={`M ${cx} 88 L ${cx - 16} 78 M ${cx} 88 L ${cx + 16} 78 M ${cx} 88 L ${cx - 10} 92 M ${cx} 88 L ${cx + 10} 92`}
          f="none" s={SYSTEM_COLORS.nerves} sw={1.5} />
      </G>
    </svg>
  );
}
