import { useMemo } from 'react';
import * as THREE from 'three';
import type { SystemId } from '@/types/anatomy';

export const SYSTEM_COLORS: Record<SystemId, string> = {
  bones: '#e9e2d0',
  muscles: '#d96a5a',
  organs: '#c98a5e',
  vessels: '#6f9fd8',
  nerves: '#e5c76b',
};

const ARTERY = '#c65a5a';
const VEIN = '#5f83c9';

interface ModelProps {
  soloSystem: SystemId | null;
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
}

type V3 = [number, number, number];

function Part({
  item, sys, pos = [0, 0, 0], rot = [0, 0, 0], scale = 1,
  geometry, selectedId, hoveredId, onSelect, onHover, soloSystem, color,
}: {
  item: string; sys: SystemId; pos?: V3; rot?: V3; scale?: number | V3;
  geometry: React.ReactNode; color?: string;
} & Omit<ModelProps, 'soloSystem'> & { soloSystem: SystemId | null }) {
  const visible = soloSystem === null || soloSystem === sys;
  const isSel = selectedId === item;
  const isHov = hoveredId === item;
  const base = color ?? SYSTEM_COLORS[sys];
  return (
    <mesh
      position={pos} rotation={rot} scale={scale} visible={visible}
      onClick={(e) => { e.stopPropagation(); onSelect(isSel ? null : item); }}
      onPointerOver={(e) => { e.stopPropagation(); onHover(item); }}
      onPointerOut={() => onHover(null)}
    >
      {geometry}
      <meshStandardMaterial
        color={base}
        emissive={isSel ? '#4dd2ff' : isHov ? '#2b7a94' : '#000000'}
        emissiveIntensity={isSel ? 0.55 : isHov ? 0.3 : 0}
        roughness={0.55} metalness={0.08}
        transparent={soloSystem !== null && !visible}
        opacity={soloSystem !== null && !visible ? 0 : 1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Tube({
  item, sys, points, radius, color,
  selectedId, hoveredId, onSelect, onHover, soloSystem,
}: {
  item: string; sys: SystemId; points: V3[]; radius: number; color?: string;
} & ModelProps) {
  const geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
    return new THREE.TubeGeometry(curve, 32, radius, 8, false);
  }, [points, radius]);
  const visible = soloSystem === null || soloSystem === sys;
  const isSel = selectedId === item;
  const isHov = hoveredId === item;
  return (
    <mesh
      geometry={geo} visible={visible}
      onClick={(e) => { e.stopPropagation(); onSelect(isSel ? null : item); }}
      onPointerOver={(e) => { e.stopPropagation(); onHover(item); }}
      onPointerOut={() => onHover(null)}
    >
      <meshStandardMaterial
        color={color ?? SYSTEM_COLORS[sys]}
        emissive={isSel ? '#4dd2ff' : isHov ? '#2b7a94' : '#000000'}
        emissiveIntensity={isSel ? 0.55 : isHov ? 0.3 : 0}
        roughness={0.5} metalness={0.05}
      />
    </mesh>
  );
}

/** Полупрозрачный силуэт тела для ориентации, когда включён фильтр системы */
function GhostBody({ soloSystem }: { soloSystem: SystemId | null }) {
  if (soloSystem === null) return null;
  const mat = (
    <meshStandardMaterial color="#243026" transparent opacity={0.28} roughness={0.9} depthWrite={false} />
  );
  return (
    <group>
      <mesh position={[0, 3.28, 0]}>{<sphereGeometry args={[0.3, 24, 24]} />}{mat}</mesh>
      <mesh position={[0, 2.35, 0]} scale={[0.62, 0.85, 0.4]}>{<sphereGeometry args={[1, 24, 24]} />}{mat}</mesh>
      <mesh position={[0, 1.5, 0]} scale={[0.55, 0.35, 0.38]}>{<sphereGeometry args={[1, 24, 24]} />}{mat}</mesh>
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.85, 2.5, 0]} rotation={[0, 0, s * 0.15]} scale={[0.16, 0.55, 0.16]}>
            {<capsuleGeometry args={[1, 1, 8, 16]} />}{mat}
          </mesh>
          <mesh position={[s * 0.95, 1.95, 0]} scale={[0.13, 0.5, 0.13]}>
            {<capsuleGeometry args={[1, 1, 8, 16]} />}{mat}
          </mesh>
          <mesh position={[s * 0.3, 0.75, 0]} scale={[0.2, 0.8, 0.2]}>
            {<capsuleGeometry args={[1, 1, 8, 16]} />}{mat}
          </mesh>
          <mesh position={[s * 0.32, 0.0, 0]} scale={[0.15, 0.75, 0.15]}>
            {<capsuleGeometry args={[1, 1, 8, 16]} />}{mat}
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function AnatomyModel(props: ModelProps) {
  const { soloSystem, selectedId, hoveredId, onSelect, onHover } = props;
  const p = { soloSystem, selectedId, hoveredId, onSelect, onHover };

  return (
    <group>
      <GhostBody soloSystem={soloSystem} />

      {/* ── СКЕЛЕТ ─────────────────────────────────── */}
      {/* Череп */}
      <Part {...p} item="skull" sys="bones" pos={[0, 3.3, 0]} geometry={<sphereGeometry args={[0.28, 28, 28]} />} scale={[0.92, 1.05, 0.98]} />
      <Part {...p} item="skull" sys="bones" pos={[0, 3.08, 0.1]} geometry={<sphereGeometry args={[0.15, 20, 20]} />} scale={[1, 0.55, 0.9]} />
      {/* Позвоночник */}
      {Array.from({ length: 14 }).map((_, i) => (
        <Part key={i} {...p} item="spine" sys="bones"
          pos={[0, 1.62 + i * 0.105, -0.02 - Math.sin((i / 13) * Math.PI) * 0.05]}
          geometry={<cylinderGeometry args={[0.055, 0.055, 0.085, 12]} />} />
      ))}
      {/* Рёбра — полукольца */}
      {Array.from({ length: 9 }).map((_, i) => {
        const y = 2.62 - i * 0.115;
        const r = 0.42 - Math.abs(i - 3) * 0.028;
        return [1, -1].map((s) => (
          <Part key={`${i}${s}`} {...p} item="ribs" sys="bones" pos={[0, y, 0]}
            rot={[0, 0, s > 0 ? 0 : Math.PI]}
            geometry={<torusGeometry args={[r, 0.032, 10, 28, Math.PI]} />}
            scale={[1, 0.75, 1]} />
        ));
      })}
      {/* Грудинa */}
      <Part {...p} item="sternum" sys="bones" pos={[0, 2.5, 0.31]} geometry={<boxGeometry args={[0.07, 0.42, 0.04]} />} />
      <Part {...p} item="sternum" sys="bones" pos={[0, 2.78, 0.3]} geometry={<sphereGeometry args={[0.05, 12, 12]} />} />
      {/* Таз */}
      <Part {...p} item="pelvis" sys="bones" pos={[0.24, 1.42, 0]} rot={[0, 0, -0.35]} geometry={<sphereGeometry args={[0.2, 20, 20]} />} scale={[1, 0.72, 0.85]} />
      <Part {...p} item="pelvis" sys="bones" pos={[-0.24, 1.42, 0]} rot={[0, 0, 0.35]} geometry={<sphereGeometry args={[0.2, 20, 20]} />} scale={[1, 0.72, 0.85]} />
      <Part {...p} item="pelvis" sys="bones" pos={[0, 1.42, -0.08]} geometry={<sphereGeometry args={[0.13, 16, 16]} />} scale={[1, 1.15, 0.7]} />
      {/* Ключицы */}
      <Part {...p} item="clavicle" sys="bones" pos={[0.24, 2.86, 0.08]} rot={[0, 0, -1.25]} geometry={<capsuleGeometry args={[0.03, 0.34, 6, 10]} />} />
      <Part {...p} item="clavicle" sys="bones" pos={[-0.24, 2.86, 0.08]} rot={[0, 0, 1.25]} geometry={<capsuleGeometry args={[0.03, 0.34, 6, 10]} />} />
      {/* Руки: плечевая кость */}
      <Part {...p} item="humerus" sys="bones" pos={[0.88, 2.42, 0]} rot={[0, 0, 0.12]} geometry={<capsuleGeometry args={[0.055, 0.5, 8, 14]} />} />
      <Part {...p} item="humerus" sys="bones" pos={[-0.88, 2.42, 0]} rot={[0, 0, -0.12]} geometry={<capsuleGeometry args={[0.055, 0.5, 8, 14]} />} />
      {/* Лучевая и локтевая */}
      <Part {...p} item="radius_ulna" sys="bones" pos={[0.95, 1.9, 0.04]} rot={[0.15, 0, 0.05]} geometry={<capsuleGeometry args={[0.032, 0.46, 6, 12]} />} />
      <Part {...p} item="radius_ulna" sys="bones" pos={[0.95, 1.9, -0.04]} rot={[-0.15, 0, 0.05]} geometry={<capsuleGeometry args={[0.032, 0.46, 6, 12]} />} />
      <Part {...p} item="radius_ulna" sys="bones" pos={[-0.95, 1.9, 0.04]} rot={[0.15, 0, -0.05]} geometry={<capsuleGeometry args={[0.032, 0.46, 6, 12]} />} />
      <Part {...p} item="radius_ulna" sys="bones" pos={[-0.95, 1.9, -0.04]} rot={[-0.15, 0, -0.05]} geometry={<capsuleGeometry args={[0.032, 0.46, 6, 12]} />} />
      {/* Кисти */}
      <Part {...p} item="hand_bones" sys="bones" pos={[0.97, 1.56, 0]} geometry={<boxGeometry args={[0.09, 0.16, 0.05]} />} />
      <Part {...p} item="hand_bones" sys="bones" pos={[-0.97, 1.56, 0]} geometry={<boxGeometry args={[0.09, 0.16, 0.05]} />} />
      {/* Бедренная кость */}
      <Part {...p} item="femur" sys="bones" pos={[0.28, 0.85, 0]} rot={[0, 0, 0.06]} geometry={<capsuleGeometry args={[0.07, 0.72, 8, 14]} />} />
      <Part {...p} item="femur" sys="bones" pos={[-0.28, 0.85, 0]} rot={[0, 0, -0.06]} geometry={<capsuleGeometry args={[0.07, 0.72, 8, 14]} />} />
      {/* Большеберцовая и малоберцовая */}
      <Part {...p} item="tibia_fibula" sys="bones" pos={[0.29, 0.05, 0.05]} rot={[0.06, 0, 0]} geometry={<capsuleGeometry args={[0.045, 0.6, 6, 12]} />} />
      <Part {...p} item="tibia_fibula" sys="bones" pos={[0.33, 0.05, -0.06]} rot={[-0.06, 0, 0]} geometry={<capsuleGeometry args={[0.028, 0.58, 6, 12]} />} />
      <Part {...p} item="tibia_fibula" sys="bones" pos={[-0.29, 0.05, 0.05]} rot={[0.06, 0, 0]} geometry={<capsuleGeometry args={[0.045, 0.6, 6, 12]} />} />
      <Part {...p} item="tibia_fibula" sys="bones" pos={[-0.33, 0.05, -0.06]} rot={[-0.06, 0, 0]} geometry={<capsuleGeometry args={[0.028, 0.58, 6, 12]} />} />
      {/* Ступни */}
      <Part {...p} item="foot_bones" sys="bones" pos={[0.3, -0.42, 0.1]} geometry={<boxGeometry args={[0.12, 0.07, 0.28]} />} />
      <Part {...p} item="foot_bones" sys="bones" pos={[-0.3, -0.42, 0.1]} geometry={<boxGeometry args={[0.12, 0.07, 0.28]} />} />

      {/* ── МЫШЦЫ ─────────────────────────────────── */}
      {/* Дельтовидные */}
      <Part {...p} item="deltoid" sys="muscles" pos={[0.82, 2.72, 0]} geometry={<sphereGeometry args={[0.16, 20, 20]} />} scale={[1, 1.15, 1]} />
      <Part {...p} item="deltoid" sys="muscles" pos={[-0.82, 2.72, 0]} geometry={<sphereGeometry args={[0.16, 20, 20]} />} scale={[1, 1.15, 1]} />
      {/* Бицепс / трицепс */}
      <Part {...p} item="biceps" sys="muscles" pos={[0.86, 2.48, 0.12]} rot={[0.5, 0, 0.1]} geometry={<capsuleGeometry args={[0.075, 0.4, 8, 14]} />} />
      <Part {...p} item="biceps" sys="muscles" pos={[-0.86, 2.48, 0.12]} rot={[0.5, 0, -0.1]} geometry={<capsuleGeometry args={[0.075, 0.4, 8, 14]} />} />
      <Part {...p} item="triceps" sys="muscles" pos={[0.9, 2.48, -0.1]} rot={[-0.5, 0, 0.1]} geometry={<capsuleGeometry args={[0.08, 0.42, 8, 14]} />} />
      <Part {...p} item="triceps" sys="muscles" pos={[-0.9, 2.48, -0.1]} rot={[-0.5, 0, -0.1]} geometry={<capsuleGeometry args={[0.08, 0.42, 8, 14]} />} />
      <Part {...p} item="triceps" sys="muscles" pos={[0.96, 2.0, -0.05]} geometry={<capsuleGeometry args={[0.05, 0.4, 8, 12]} />} />
      <Part {...p} item="triceps" sys="muscles" pos={[-0.96, 2.0, -0.05]} geometry={<capsuleGeometry args={[0.05, 0.4, 8, 12]} />} />
      {/* Большая грудная */}
      <Part {...p} item="pectoralis" sys="muscles" pos={[0.19, 2.6, 0.28]} rot={[0, -0.2, 0]} geometry={<sphereGeometry args={[0.2, 20, 20]} />} scale={[1.15, 0.85, 0.55]} />
      <Part {...p} item="pectoralis" sys="muscles" pos={[-0.19, 2.6, 0.28]} rot={[0, 0.2, 0]} geometry={<sphereGeometry args={[0.2, 20, 20]} />} scale={[1.15, 0.85, 0.55]} />
      {/* Прямая мышца живота */}
      {Array.from({ length: 4 }).map((_, i) => (
        <Part key={i} {...p} item="abs" sys="muscles" pos={[0.085 * (i % 2 === 0 ? 1 : 1), 2.2 - i * 0.16, 0.27]}
          geometry={<boxGeometry args={[0.16, 0.13, 0.06]} />} />
      ))}
      <Part {...p} item="abs" sys="muscles" pos={[-0.085, 2.2, 0.27]} geometry={<boxGeometry args={[0.16, 0.13, 0.06]} />} />
      <Part {...p} item="abs" sys="muscles" pos={[-0.085, 2.04, 0.27]} geometry={<boxGeometry args={[0.16, 0.13, 0.06]} />} />
      <Part {...p} item="abs" sys="muscles" pos={[0, 2.37, 0.26]} geometry={<boxGeometry args={[0.34, 0.1, 0.06]} />} />
      {/* Ягодицы */}
      <Part {...p} item="gluteus" sys="muscles" pos={[0.19, 1.42, -0.16]} geometry={<sphereGeometry args={[0.19, 20, 20]} />} scale={[1, 0.95, 1]} />
      <Part {...p} item="gluteus" sys="muscles" pos={[-0.19, 1.42, -0.16]} geometry={<sphereGeometry args={[0.19, 20, 20]} />} scale={[1, 0.95, 1]} />
      {/* Четырёхглавая */}
      <Part {...p} item="quadriceps" sys="muscles" pos={[0.29, 0.92, 0.14]} rot={[0.25, 0, 0]} geometry={<capsuleGeometry args={[0.11, 0.62, 8, 14]} />} />
      <Part {...p} item="quadriceps" sys="muscles" pos={[-0.29, 0.92, 0.14]} rot={[0.25, 0, 0]} geometry={<capsuleGeometry args={[0.11, 0.62, 8, 14]} />} />
      <Part {...p} item="quadriceps" sys="muscles" pos={[0.28, 0.45, 0.12]} geometry={<sphereGeometry args={[0.1, 16, 16]} />} scale={[1, 1.2, 1]} />
      <Part {...p} item="quadriceps" sys="muscles" pos={[-0.28, 0.45, 0.12]} geometry={<sphereGeometry args={[0.1, 16, 16]} />} scale={[1, 1.2, 1]} />
      {/* Икроножные */}
      <Part {...p} item="gastrocnemius" sys="muscles" pos={[0.3, -0.05, -0.12]} rot={[-0.3, 0, 0]} geometry={<capsuleGeometry args={[0.075, 0.34, 8, 12]} />} />
      <Part {...p} item="gastrocnemius" sys="muscles" pos={[-0.3, -0.05, -0.12]} rot={[-0.3, 0, 0]} geometry={<capsuleGeometry args={[0.075, 0.34, 8, 12]} />} />

      {/* ── ОРГАНЫ ─────────────────────────────────── */}
      <Part {...p} item="brain" sys="organs" pos={[0, 3.32, 0]} geometry={<sphereGeometry args={[0.22, 24, 24]} />} scale={[0.95, 0.85, 1]} color="#c9a191" />
      <Part {...p} item="heart" sys="organs" pos={[0.12, 2.42, 0.1]} rot={[0.2, 0, -0.25]} geometry={<sphereGeometry args={[0.12, 20, 20]} />} scale={[0.9, 1.15, 0.85]} color="#b85454" />
      <Part {...p} item="lungs" sys="organs" pos={[0.2, 2.42, -0.02]} rot={[0, 0, -0.12]} geometry={<sphereGeometry args={[0.17, 20, 20]} />} scale={[0.85, 1.35, 0.6]} color="#c9937f" />
      <Part {...p} item="lungs" sys="organs" pos={[-0.2, 2.42, -0.02]} rot={[0, 0, 0.12]} geometry={<sphereGeometry args={[0.17, 20, 20]} />} scale={[0.85, 1.35, 0.6]} color="#c9937f" />
      <Part {...p} item="liver" sys="organs" pos={[0.16, 2.02, 0.05]} rot={[0, 0, -0.15]} geometry={<sphereGeometry args={[0.17, 20, 20]} />} scale={[1.3, 0.6, 0.8]} color="#7a4b3a" />
      <Part {...p} item="stomach" sys="organs" pos={[-0.17, 1.98, 0.04]} rot={[0, 0, 0.5]} geometry={<sphereGeometry args={[0.12, 18, 18]} />} scale={[1.2, 0.75, 0.7]} color="#d9a08a" />
      <Part {...p} item="kidneys" sys="organs" pos={[0.14, 1.9, -0.18]} geometry={<sphereGeometry args={[0.065, 14, 14]} />} scale={[0.8, 1.2, 0.6]} color="#8a5a48" />
      <Part {...p} item="kidneys" sys="organs" pos={[-0.14, 1.9, -0.18]} geometry={<sphereGeometry args={[0.065, 14, 14]} />} scale={[0.8, 1.2, 0.6]} color="#8a5a48" />
      <Part {...p} item="intestines" sys="organs" pos={[0, 1.68, 0.02]} geometry={<torusKnotGeometry args={[0.16, 0.07, 48, 8]} />} scale={[1.15, 0.75, 0.7]} color="#c98a6e" />

      {/* ── СОСУДЫ ─────────────────────────────────── */}
      <Tube {...p} item="aorta" sys="vessels" color={ARTERY} radius={0.035}
        points={[[0, 2.45, -0.12], [0, 2.1, -0.14], [0, 1.6, -0.13], [0, 1.15, -0.1], [0, 0.9, -0.08]]} />
      <Tube {...p} item="vena_cava" sys="vessels" color={VEIN} radius={0.04}
        points={[[0.06, 2.5, -0.16], [0.06, 2.0, -0.18], [0.05, 1.5, -0.17], [0.04, 1.05, -0.13]]} />
      <Tube {...p} item="carotid" sys="vessels" color={ARTERY} radius={0.02}
        points={[[0.06, 2.95, 0.05], [0.07, 3.15, 0.05], [0.06, 3.28, 0.05]]} />
      <Tube {...p} item="carotid" sys="vessels" color={ARTERY} radius={0.02}
        points={[[-0.06, 2.95, 0.05], [-0.07, 3.15, 0.05], [-0.06, 3.28, 0.05]]} />
      <Tube {...p} item="jugular" sys="vessels" color={VEIN} radius={0.022}
        points={[[0.12, 3.26, 0.02], [0.14, 3.05, 0.02], [0.16, 2.9, 0.02]]} />
      <Tube {...p} item="jugular" sys="vessels" color={VEIN} radius={0.022}
        points={[[-0.12, 3.26, 0.02], [-0.14, 3.05, 0.02], [-0.16, 2.9, 0.02]]} />
      <Tube {...p} item="femoral_artery" sys="vessels" color={ARTERY} radius={0.024}
        points={[[0.05, 1.1, -0.06], [0.22, 0.95, 0.02], [0.28, 0.55, 0.05], [0.29, 0.15, 0.05], [0.28, -0.25, 0]]} />
      <Tube {...p} item="femoral_artery" sys="vessels" color={ARTERY} radius={0.024}
        points={[[-0.05, 1.1, -0.06], [-0.22, 0.95, 0.02], [-0.28, 0.55, 0.05], [-0.29, 0.15, 0.05], [-0.28, -0.25, 0]]} />
      <Tube {...p} item="subclavian" sys="vessels" color={ARTERY} radius={0.02}
        points={[[0, 2.75, -0.05], [0.4, 2.78, 0.02], [0.75, 2.7, 0.03], [0.88, 2.55, 0.03]]} />
      <Tube {...p} item="subclavian" sys="vessels" color={ARTERY} radius={0.02}
        points={[[0, 2.75, -0.05], [-0.4, 2.78, 0.02], [-0.75, 2.7, 0.03], [-0.88, 2.55, 0.03]]} />

      {/* ── НЕРВЫ ─────────────────────────────────── */}
      <Tube {...p} item="spinal_cord" sys="nerves" radius={0.028}
        points={[[0, 2.95, -0.05], [0, 2.4, -0.09], [0, 1.9, -0.09], [0, 1.45, -0.08]]} />
      <Part {...p} item="brainstem" sys="nerves" pos={[0, 3.02, -0.06]} geometry={<cylinderGeometry args={[0.05, 0.04, 0.14, 12]} />} />
      <Tube {...p} item="vagus" sys="nerves" radius={0.014}
        points={[[0, 3.0, -0.05], [0.04, 2.7, -0.1], [0.03, 2.3, -0.14], [0.02, 1.9, -0.16], [0.01, 1.5, -0.14]]} />
      <Tube {...p} item="brachial_plexus" sys="nerves" radius={0.014}
        points={[[0.03, 2.85, -0.06], [0.5, 2.75, 0.0], [0.85, 2.6, 0.04], [0.9, 2.35, 0.06], [0.95, 2.05, 0.05]]} />
      <Tube {...p} item="brachial_plexus" sys="nerves" radius={0.014}
        points={[[-0.03, 2.85, -0.06], [-0.5, 2.75, 0.0], [-0.85, 2.6, 0.04], [-0.9, 2.35, 0.06], [-0.95, 2.05, 0.05]]} />
      <Tube {...p} item="sciatic" sys="nerves" radius={0.016}
        points={[[0, 1.42, -0.1], [0.1, 1.3, -0.18], [0.2, 1.05, -0.2], [0.26, 0.6, -0.16], [0.28, 0.15, -0.12], [0.28, -0.2, -0.08]]} />
      <Tube {...p} item="sciatic" sys="nerves" radius={0.016}
        points={[[0, 1.42, -0.1], [-0.1, 1.3, -0.18], [-0.2, 1.05, -0.2], [-0.26, 0.6, -0.16], [-0.28, 0.15, -0.12], [-0.28, -0.2, -0.08]]} />
      <Tube {...p} item="femoral_nerve" sys="nerves" radius={0.012}
        points={[[0.02, 1.4, -0.06], [0.15, 1.15, 0.0], [0.26, 0.85, 0.1], [0.28, 0.5, 0.12]]} />
      <Tube {...p} item="femoral_nerve" sys="nerves" radius={0.012}
        points={[[-0.02, 1.4, -0.06], [-0.15, 1.15, 0.0], [-0.26, 0.85, 0.1], [-0.28, 0.5, 0.12]]} />

      {/* ═══ ДОПОЛНИТЕЛЬНЫЙ СКЕЛЕТ ═══ */}
      {/* Лопатки */}
      <Part {...p} item="scapula" sys="bones" pos={[0.42, 2.55, -0.14]} rot={[0.1, 0.35, 0.15]} geometry={<boxGeometry args={[0.2, 0.26, 0.03]} />} />
      <Part {...p} item="scapula" sys="bones" pos={[-0.42, 2.55, -0.14]} rot={[0.1, -0.35, -0.15]} geometry={<boxGeometry args={[0.2, 0.26, 0.03]} />} />
      {/* Крестец */}
      <Part {...p} item="sacrum" sys="bones" pos={[0, 1.46, -0.1]} geometry={<sphereGeometry args={[0.12, 16, 16]} />} scale={[1.05, 1.35, 0.55]} />
      {/* Надколенники */}
      <Part {...p} item="patella" sys="bones" pos={[0.28, 0.44, 0.2]} geometry={<sphereGeometry args={[0.045, 12, 12]} />} scale={[1, 1.2, 0.6]} />
      <Part {...p} item="patella" sys="bones" pos={[-0.28, 0.44, 0.2]} geometry={<sphereGeometry args={[0.045, 12, 12]} />} scale={[1, 1.2, 0.6]} />
      {/* Подъязычная кость */}
      <Part {...p} item="hyoid" sys="bones" pos={[0, 2.96, 0.05]} rot={[Math.PI / 2, 0, 0]} geometry={<torusGeometry args={[0.035, 0.008, 8, 16]} />} />

      {/* ═══ ДОПОЛНИТЕЛЬНЫЕ МЫШЦЫ ═══ */}
      {/* Трапеция */}
      <Part {...p} item="trapezius" sys="muscles" pos={[0, 2.68, -0.18]} geometry={<sphereGeometry args={[0.24, 20, 20]} />} scale={[1.9, 0.85, 0.35]} />
      {/* Широчайшая */}
      <Part {...p} item="latissimus" sys="muscles" pos={[0.3, 2.2, -0.18]} rot={[0, 0, -0.2]} geometry={<sphereGeometry args={[0.18, 18, 18]} />} scale={[0.8, 1.7, 0.35]} />
      <Part {...p} item="latissimus" sys="muscles" pos={[-0.3, 2.2, -0.18]} rot={[0, 0, 0.2]} geometry={<sphereGeometry args={[0.18, 18, 18]} />} scale={[0.8, 1.7, 0.35]} />
      {/* СКС-мышца */}
      <Part {...p} item="scm" sys="muscles" pos={[0.09, 2.87, 0.05]} rot={[0, 0, 0.35]} geometry={<capsuleGeometry args={[0.025, 0.2, 6, 10]} />} />
      <Part {...p} item="scm" sys="muscles" pos={[-0.09, 2.87, 0.05]} rot={[0, 0, -0.35]} geometry={<capsuleGeometry args={[0.025, 0.2, 6, 10]} />} />
      {/* Мышцы предплечья */}
      <Part {...p} item="forearm_muscles" sys="muscles" pos={[0.96, 1.92, 0]} geometry={<capsuleGeometry args={[0.06, 0.42, 8, 14]} />} />
      <Part {...p} item="forearm_muscles" sys="muscles" pos={[-0.96, 1.92, 0]} geometry={<capsuleGeometry args={[0.06, 0.42, 8, 14]} />} />
      {/* Задняя группа бедра */}
      <Part {...p} item="hamstrings" sys="muscles" pos={[0.27, 0.75, -0.16]} rot={[-0.15, 0, 0]} geometry={<capsuleGeometry args={[0.09, 0.6, 8, 14]} />} />
      <Part {...p} item="hamstrings" sys="muscles" pos={[-0.27, 0.75, -0.16]} rot={[-0.15, 0, 0]} geometry={<capsuleGeometry args={[0.09, 0.6, 8, 14]} />} />
      {/* Камбаловидная */}
      <Part {...p} item="soleus" sys="muscles" pos={[0.3, -0.18, -0.03]} geometry={<capsuleGeometry args={[0.07, 0.3, 8, 12]} />} />
      <Part {...p} item="soleus" sys="muscles" pos={[-0.3, -0.18, -0.03]} geometry={<capsuleGeometry args={[0.07, 0.3, 8, 12]} />} />
      {/* Диафрагма */}
      <Part {...p} item="diaphragm" sys="muscles" pos={[0, 2.32, 0]} geometry={<sphereGeometry args={[0.36, 20, 20]} />} scale={[1.05, 0.16, 0.72]} color="#b5604e" />
      {/* Жевательная */}
      <Part {...p} item="masseter" sys="muscles" pos={[0.2, 3.1, 0.1]} geometry={<sphereGeometry args={[0.05, 12, 12]} />} scale={[0.8, 1.2, 1]} />
      <Part {...p} item="masseter" sys="muscles" pos={[-0.2, 3.1, 0.1]} geometry={<sphereGeometry args={[0.05, 12, 12]} />} scale={[0.8, 1.2, 1]} />

      {/* ═══ ДОПОЛНИТЕЛЬНЫЕ ОРГАНЫ ═══ */}
      <Part {...p} item="spleen" sys="organs" pos={[-0.28, 2.08, -0.06]} geometry={<sphereGeometry args={[0.08, 14, 14]} />} scale={[0.7, 1.2, 0.5]} color="#8a4a44" />
      <Part {...p} item="pancreas" sys="organs" pos={[0.02, 1.92, -0.04]} rot={[0, 0, 0.08]} geometry={<capsuleGeometry args={[0.045, 0.24, 8, 12]} />} scale={[1, 1, 0.7]} color="#d9b08a" />
      <Part {...p} item="bladder" sys="organs" pos={[0, 1.3, 0.1]} geometry={<sphereGeometry args={[0.08, 14, 14]} />} scale={[1, 0.9, 0.8]} color="#c9a08a" />
      <Part {...p} item="thyroid" sys="organs" pos={[0.04, 2.9, 0.07]} geometry={<sphereGeometry args={[0.035, 12, 12]} />} scale={[0.8, 1.1, 0.7]} color="#b5764e" />
      <Part {...p} item="thyroid" sys="organs" pos={[-0.04, 2.9, 0.07]} geometry={<sphereGeometry args={[0.035, 12, 12]} />} scale={[0.8, 1.1, 0.7]} color="#b5764e" />
      <Part {...p} item="gallbladder" sys="organs" pos={[0.3, 1.94, 0.08]} geometry={<sphereGeometry args={[0.045, 12, 12]} />} scale={[0.8, 1.2, 0.7]} color="#5a7a3a" />

      {/* ═══ ДОПОЛНИТЕЛЬНЫЕ СОСУДЫ ═══ */}
      {/* Лёгочные */}
      <Tube {...p} item="pulmonary" sys="vessels" color={ARTERY} radius={0.022}
        points={[[0.08, 2.48, 0.02], [0.16, 2.46, 0.0], [0.2, 2.5, -0.02]]} />
      <Tube {...p} item="pulmonary" sys="vessels" color={VEIN} radius={0.02}
        points={[[0.16, 2.46, -0.03], [0.06, 2.44, -0.08]]} />
      <Tube {...p} item="pulmonary" sys="vessels" color={VEIN} radius={0.02}
        points={[[0.16, 2.46, -0.03], [0.24, 2.44, -0.08]]} />
      {/* Венечные */}
      <Part {...p} item="coronary" sys="vessels" pos={[0.12, 2.42, 0.1]} rot={[0.3, 0.3, 0]} geometry={<torusGeometry args={[0.085, 0.012, 8, 20]} />} scale={[1, 1.2, 1]} color={ARTERY} />
      {/* Плечевая артерия */}
      <Tube {...p} item="brachial_artery" sys="vessels" color={ARTERY} radius={0.018}
        points={[[0.87, 2.58, 0.06], [0.9, 2.3, 0.08], [0.93, 2.05, 0.07]]} />
      <Tube {...p} item="brachial_artery" sys="vessels" color={ARTERY} radius={0.018}
        points={[[-0.87, 2.58, 0.06], [-0.9, 2.3, 0.08], [-0.93, 2.05, 0.07]]} />
      {/* Сосуды предплечья */}
      <Tube {...p} item="forearm_vessels" sys="vessels" color={ARTERY} radius={0.014}
        points={[[0.93, 2.02, 0.07], [0.96, 1.8, 0.06], [0.97, 1.6, 0.05]]} />
      <Tube {...p} item="forearm_vessels" sys="vessels" color={VEIN} radius={0.016}
        points={[[0.92, 2.02, 0.04], [0.94, 1.78, 0.03], [0.95, 1.58, 0.02]]} />
      <Tube {...p} item="forearm_vessels" sys="vessels" color={ARTERY} radius={0.014}
        points={[[-0.93, 2.02, 0.07], [-0.96, 1.8, 0.06], [-0.97, 1.6, 0.05]]} />
      <Tube {...p} item="forearm_vessels" sys="vessels" color={VEIN} radius={0.016}
        points={[[-0.92, 2.02, 0.04], [-0.94, 1.78, 0.03], [-0.95, 1.58, 0.02]]} />
      {/* Большая подкожная вена */}
      <Tube {...p} item="saphenous" sys="vessels" color={VEIN} radius={0.016}
        points={[[0.2, 1.1, 0.05], [0.2, 0.7, 0.12], [0.22, 0.2, 0.1], [0.24, -0.3, 0.08]]} />
      <Tube {...p} item="saphenous" sys="vessels" color={VEIN} radius={0.016}
        points={[[-0.2, 1.1, 0.05], [-0.2, 0.7, 0.12], [-0.22, 0.2, 0.1], [-0.24, -0.3, 0.08]]} />
      {/* Позвоночная артерия */}
      <Tube {...p} item="vertebral_artery" sys="vessels" color={ARTERY} radius={0.013}
        points={[[0.05, 2.8, -0.02], [0.05, 2.98, -0.03], [0.04, 3.12, -0.02]]} />
      <Tube {...p} item="vertebral_artery" sys="vessels" color={ARTERY} radius={0.013}
        points={[[-0.05, 2.8, -0.02], [-0.05, 2.98, -0.03], [-0.04, 3.12, -0.02]]} />
      {/* Воротная вена */}
      <Tube {...p} item="portal_vein" sys="vessels" color={VEIN} radius={0.02}
        points={[[0, 1.72, -0.05], [0.06, 1.88, -0.04], [0.12, 2.0, 0.0]]} />

      {/* ═══ ДОПОЛНИТЕЛЬНЫЕ НЕРВЫ ═══ */}
      {/* Нервы кисти */}
      <Tube {...p} item="hand_nerves" sys="nerves" radius={0.01}
        points={[[0.93, 2.05, 0.08], [0.95, 1.85, 0.08], [0.96, 1.65, 0.06], [0.97, 1.56, 0.04]]} />
      <Tube {...p} item="hand_nerves" sys="nerves" radius={0.01}
        points={[[-0.93, 2.05, 0.08], [-0.95, 1.85, 0.08], [-0.96, 1.65, 0.06], [-0.97, 1.56, 0.04]]} />
      {/* Большеберцовый нерв */}
      <Tube {...p} item="tibial_nerve" sys="nerves" radius={0.011}
        points={[[0.28, -0.18, -0.08], [0.29, -0.3, -0.06], [0.29, -0.42, -0.04]]} />
      <Tube {...p} item="tibial_nerve" sys="nerves" radius={0.011}
        points={[[-0.28, -0.18, -0.08], [-0.29, -0.3, -0.06], [-0.29, -0.42, -0.04]]} />
      {/* Лицевой нерв */}
      <Tube {...p} item="facial" sys="nerves" radius={0.01}
        points={[[0, 3.05, -0.02], [0.1, 3.08, 0.02], [0.17, 3.06, 0.06]]} />
      <Tube {...p} item="facial" sys="nerves" radius={0.01}
        points={[[0, 3.05, -0.02], [-0.1, 3.08, 0.02], [-0.17, 3.06, 0.06]]} />
      {/* Зрительный нерв */}
      <Tube {...p} item="optic" sys="nerves" radius={0.012}
        points={[[0.07, 3.28, 0.12], [0.05, 3.28, 0.02], [0.02, 3.29, -0.05]]} />
      <Tube {...p} item="optic" sys="nerves" radius={0.012}
        points={[[-0.07, 3.28, 0.12], [-0.05, 3.28, 0.02], [-0.02, 3.29, -0.05]]} />
      {/* Диафрагмальный нерв */}
      <Tube {...p} item="phrenic" sys="nerves" radius={0.01}
        points={[[0.06, 2.7, 0.02], [0.07, 2.5, 0.05], [0.08, 2.35, 0.06]]} />
      <Tube {...p} item="phrenic" sys="nerves" radius={0.01}
        points={[[-0.06, 2.7, 0.02], [-0.07, 2.5, 0.05], [-0.08, 2.35, 0.06]]} />
      {/* Симпатический ствол */}
      <Tube {...p} item="sympathetic" sys="nerves" radius={0.009}
        points={[[0.07, 2.75, -0.12], [0.07, 2.3, -0.14], [0.07, 1.85, -0.13], [0.07, 1.5, -0.11]]} />
      <Tube {...p} item="sympathetic" sys="nerves" radius={0.009}
        points={[[-0.07, 2.75, -0.12], [-0.07, 2.3, -0.14], [-0.07, 1.85, -0.13], [-0.07, 1.5, -0.11]]} />
      {/* Тройничный нерв */}
      <Tube {...p} item="trigeminal" sys="nerves" radius={0.012}
        points={[[0.02, 3.16, 0.02], [0.12, 3.14, 0.06], [0.2, 3.08, 0.1]]} />
      <Tube {...p} item="trigeminal" sys="nerves" radius={0.012}
        points={[[-0.02, 3.16, 0.02], [-0.12, 3.14, 0.06], [-0.2, 3.08, 0.1]]} />
    </group>
  );
}
