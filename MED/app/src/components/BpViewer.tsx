import { Suspense, useEffect, useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { BP_MODELS, getBpModel, type BpModel } from '@/data/bp3dData';

type BpSystem = BpModel['system'];

const SYSTEM_LABELS: Record<BpSystem, string> = {
  bones: 'Кости',
  muscles: 'Мышцы',
  organs: 'Органы',
  vessels: 'Сосуды',
  nerves: 'Нервы',
  respiratory: 'Дыхание',
};

/** Плоскости срезов (мировые координаты): оставляют точки normal·p + constant >= 0 */
interface ClipPlanes {
  sag: THREE.Plane; // сбоку: x <= c
  hor: THREE.Plane; // сверху: y <= c
  fro: THREE.Plane; // спереди: z <= c
}

/** Запасной диапазон срезов до загрузки моделей (уточняется по реальным границам) */
const CLIP_FALLBACK = { sag: 1.6, hor: 7.5, fro: 1.6 };
const CLIP_MIN_FALLBACK = { sag: 0.05, hor: -8.8, fro: 0.05 };

/** Загрузка GLB с нормализацией: центрирование и масштаб */
function ModelPart({
  model, selected, dimmed, visible, explode, planes, alpha, onSelect, onBounds,
}: {
  model: BpModel;
  selected: boolean;
  dimmed: boolean;
  visible: boolean;
  explode: number;
  planes: ClipPlanes;
  /** прозрачность 0..0.9 (0 — непрозрачно) */
  alpha: number;
  onSelect: (id: string) => void;
  onBounds: (id: string, box: THREE.Box3) => void;
}) {
  const { scene } = useGLTF(`/models/bp3d/${model.file}`);
  const [clonedScene, setClonedScene] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const c = scene.clone(true);
    c.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.material = new THREE.MeshStandardMaterial({
          color: model.color,
          roughness: 0.55,
          metalness: 0.05,
          transparent: dimmed || alpha > 0.001,
          opacity: dimmed ? 0.15 : 1 - alpha,
          depthWrite: !(dimmed || alpha > 0.001),
          emissive: selected ? '#4dd2ff' : '#000000',
          emissiveIntensity: selected ? 0.35 : 0,
          side: THREE.DoubleSide,
          clippingPlanes: [planes.sag, planes.hor, planes.fro],
        });
      }
    });
    // Центрируем
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    c.position.set(
      model.pos[0] - center.x,
      model.pos[1] - center.y,
      model.pos[2] - center.z
    );
    setClonedScene(c);
    // Сообщаем родителю мировые границы (позиция части + общее смещение сцены -0.4 по Y)
    const worldBox = box.clone().translate(c.position).translate(new THREE.Vector3(0, -0.4, 0));
    onBounds(model.id, worldBox);
  }, [scene, model, selected, dimmed, planes, alpha]);

  // Взрыв-схема: разносим структуры от центра тела
  const explodeOffset = useMemo(() => {
    const dir = new THREE.Vector3(model.pos[0], model.pos[1] + 0.5, model.pos[2]);
    if (dir.lengthSq() < 0.01) dir.set(0, 1, 0);
    dir.normalize();
    return dir.multiplyScalar(explode * 8);
  }, [model, explode]);

  if (!visible || !clonedScene) return null;

  return (
    <group position={explodeOffset}>
      <group
        onClick={(e) => { e.stopPropagation(); onSelect(model.id); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

function SlowSpin({ children, spinning }: { children: React.ReactNode; spinning: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (spinning && ref.current) ref.current.rotation.y += delta * 0.08;
  });
  return <group ref={ref}>{children}</group>;
}

function SelectedTag({ id }: { id: string | null }) {
  const model = id ? getBpModel(id) : undefined;
  if (!model) return null;
  return (
    <Html position={[0, 7.4, 0]} center distanceFactor={9} zIndexRange={[10, 0]}>
      <div className="pointer-events-none whitespace-nowrap rounded-md border border-[#d2d8d0]/30 bg-[#101a0e]/90 px-3 py-1.5 backdrop-blur-sm">
        <div className="text-[13px] font-medium text-[#f6f6f4]">{model.label}</div>
        <div className="font-mono text-[10px] uppercase tracking-wide text-[#d2d8d0]/70">{model.labelLa}</div>
      </div>
    </Html>
  );
}

interface Props {
  selectedId: string | null;
  autoRotate: boolean;
  onSelect: (id: string | null) => void;
}

export function BpViewer({ selectedId, autoRotate, onSelect }: Props) {
  const narrow = typeof window !== 'undefined' && window.innerWidth < 640;
  const [loaded, setLoaded] = useState(false);
  const [hiddenSystems, setHiddenSystems] = useState<Set<BpSystem>>(new Set());
  const [explode, setExplode] = useState(0);
  const [alpha, setAlpha] = useState(0); // прозрачность слоёв 0..0.9
  const [bounds, setBounds] = useState<THREE.Box3 | null>(null);
  const boxesRef = useRef<Map<string, THREE.Box3>>(new Map());
  const [clip, setClip] = useState({ ...CLIP_FALLBACK });

  const clipMax = useMemo(() => bounds
    ? { sag: bounds.max.x + 0.3, hor: bounds.max.y + 0.3, fro: bounds.max.z + 0.3 }
    : { ...CLIP_FALLBACK }, [bounds]);
  const clipMin = useMemo(() => bounds
    ? { sag: bounds.min.x - 0.3, hor: bounds.min.y - 0.3, fro: bounds.min.z - 0.3 }
    : { ...CLIP_MIN_FALLBACK }, [bounds]);

  // Когда загружены все модели — вычисляем общие границы и убираем стартовый срез
  const handleBounds = (id: string, box: THREE.Box3) => {
    boxesRef.current.set(id, box);
    if (!bounds && boxesRef.current.size >= BP_MODELS.length) {
      const union = new THREE.Box3();
      boxesRef.current.forEach((b) => union.union(b));
      setBounds(union.clone());
      setClip({ sag: union.max.x + 0.3, hor: union.max.y + 0.3, fro: union.max.z + 0.3 });
    }
  };

  const planes = useMemo<ClipPlanes>(() => ({
    sag: new THREE.Plane(new THREE.Vector3(-1, 0, 0), CLIP_FALLBACK.sag),
    hor: new THREE.Plane(new THREE.Vector3(0, -1, 0), CLIP_FALLBACK.hor),
    fro: new THREE.Plane(new THREE.Vector3(0, 0, -1), CLIP_FALLBACK.fro),
  }), []);

  // Обновляем константы плоскостей при движении слайдеров
  useEffect(() => {
    planes.sag.constant = clip.sag;
    planes.hor.constant = clip.hor;
    planes.fro.constant = clip.fro;
  }, [clip, planes]);

  const systems = Object.keys(SYSTEM_LABELS) as BpSystem[];

  const toggleSystem = (s: BpSystem) => {
    setHiddenSystems((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s); else next.add(s);
      return next;
    });
  };

  const setClipValue = (key: 'sag' | 'hor' | 'fro', v: number) =>
    setClip((c) => ({ ...c, [key]: v }));

  return (
    <div className="relative h-full w-full">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4dd2ff]/30 border-t-[#4dd2ff]" />
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#d2d8d0]/50">
            Загрузка 3D-моделей…
          </p>
        </div>
      )}
      <Canvas
        camera={{ position: [0, -0.3, narrow ? 33 : 26.5], fov: narrow ? 42 : 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onPointerMissed={() => onSelect(null)}
        onCreated={({ gl }) => { gl.localClippingEnabled = true; setLoaded(true); }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 6]} intensity={1.1} color="#fdf6e8" />
          <directionalLight position={[-5, 4, -5]} intensity={0.5} color="#9db8e8" />
          <pointLight position={[0, 4, 4]} intensity={0.35} color="#cfe8d8" />
          <SlowSpin spinning={autoRotate}>
            <group position={[0, -0.4, 0]}>
              {BP_MODELS.map((m) => (
                <ModelPart
                  key={m.id}
                  model={m}
                  selected={selectedId === m.id}
                  dimmed={selectedId !== null && selectedId !== m.id}
                  visible={!hiddenSystems.has(m.system)}
                  explode={explode}
                  planes={planes}
                  alpha={alpha}
                  onSelect={(id) => onSelect(selectedId === id ? null : id)}
                  onBounds={handleBounds}
                />
              ))}
              <SelectedTag id={selectedId} />
            </group>
          </SlowSpin>
          <ContactShadows position={[0, -8.65, 0]} opacity={0.4} scale={14} blur={2.8} far={4} color="#000000" />
          <OrbitControls
            makeDefault
            enablePan={false}
            minDistance={4}
            maxDistance={40}
            minPolarAngle={0.15}
            maxPolarAngle={Math.PI - 0.25}
            target={[0, -0.3, 0]}
          />
        </Suspense>
      </Canvas>

      {/* Панель инструментов: системы, взрыв, срезы */}
      <div className="pointer-events-auto absolute bottom-3 left-1/2 z-10 max-h-[46vh] w-[min(560px,calc(100%-24px))] -translate-x-1/2 overflow-y-auto rounded-xl border border-[#d2d8d0]/12 bg-[#0e150f]/85 px-3 py-2 backdrop-blur-md">
        {/* Системы */}
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[#d2d8d0]/45">Системы:</span>
          {systems.map((s) => (
            <button
              key={s}
              onClick={() => toggleSystem(s)}
              className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                hiddenSystems.has(s)
                  ? 'border-[#d2d8d0]/12 text-[#d2d8d0]/40'
                  : 'border-[#4dd2ff]/35 bg-[#4dd2ff]/10 text-[#4dd2ff]'
              }`}
            >
              {SYSTEM_LABELS[s]}
            </button>
          ))}
          <button
            onClick={() => setHiddenSystems(new Set())}
            className="ml-auto rounded-full border border-[#d2d8d0]/12 px-2.5 py-1 text-[11px] text-[#d2d8d0]/55 hover:text-[#f6f6f4]"
          >
            Все
          </button>
        </div>

        {/* Взрыв-схема */}
        <div className="mb-2 flex items-center gap-3">
          <span className="w-28 shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-[#d2d8d0]/45">
            Разнесение
          </span>
          <input
            type="range" min={0} max={100} value={Math.round(explode * 100)}
            onChange={(e) => setExplode(Number(e.target.value) / 100)}
            className="h-1 flex-1 cursor-ew-resize accent-[#4dd2ff]"
            aria-label="Разнесение структур"
          />
          <span className="w-10 text-right font-mono text-[10px] text-[#d2d8d0]/60">{Math.round(explode * 100)}%</span>
        </div>

        {/* Прозрачность слоёв */}
        <div className="mb-2 flex items-center gap-3">
          <span className="w-28 shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-[#d2d8d0]/45">
            Прозрачность
          </span>
          <input
            type="range" min={0} max={90} value={Math.round(alpha * 100)}
            onChange={(e) => setAlpha(Number(e.target.value) / 100)}
            className="h-1 flex-1 cursor-ew-resize accent-[#4dd2ff]"
            aria-label="Прозрачность слоёв"
          />
          <span className="w-10 text-right font-mono text-[10px] text-[#d2d8d0]/60">{Math.round(alpha * 100)}%</span>
        </div>

        {/* Срезы */}
        {([
          ['sag', 'Срез сбоку', clipMin.sag, clipMax.sag],
          ['hor', 'Срез сверху', clipMin.hor, clipMax.hor],
          ['fro', 'Срез спереди', clipMin.fro, clipMax.fro],
        ] as const).map(([key, label, min, max]) => (
          <div key={key} className="mb-2 flex items-center gap-3 last:mb-0">
            <span className="w-28 shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-[#d2d8d0]/45">
              {label}
            </span>
            <input
              type="range" min={Math.round(min * 100)} max={Math.round(max * 100)} value={Math.min(Math.round(clip[key] * 100), Math.round(max * 100))}
              onChange={(e) => setClipValue(key, Number(e.target.value) / 100)}
              className="h-1 flex-1 cursor-ew-resize accent-[#d2d8d0]"
              aria-label={label}
            />
            <button
              onClick={() => setClipValue(key, max)}
              className="w-10 rounded border border-[#d2d8d0]/12 px-1 py-0.5 text-[9px] text-[#d2d8d0]/55 hover:text-[#f6f6f4]"
              title="Убрать срез"
            >
              {clip[key] >= max - 0.001 ? 'выкл' : 'сброс'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
