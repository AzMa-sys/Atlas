import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { AnatomyModel } from './AnatomyModel';
import { getItem } from '@/data/anatomy';
import type { SystemId } from '@/types/anatomy';

function SlowSpin({ children, spinning }: { children: React.ReactNode; spinning: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (spinning && ref.current) ref.current.rotation.y += delta * 0.12;
  });
  return <group ref={ref}>{children}</group>;
}

function SelectedLabel({ id }: { id: string | null }) {
  const item = id ? getItem(id) : undefined;
  if (!item) return null;
  return (
    <Html position={[0, 3.85, 0]} center distanceFactor={8} zIndexRange={[10, 0]}>
      <div className="pointer-events-none whitespace-nowrap rounded-md border border-[#d2d8d0]/30 bg-[#101a0e]/90 px-3 py-1.5 backdrop-blur-sm">
        <div className="text-[13px] font-medium text-[#f6f6f4]">{item.nameRu}</div>
        <div className="font-mono text-[10px] uppercase tracking-wide text-[#d2d8d0]/70">{item.nameLa}</div>
      </div>
    </Html>
  );
}

interface Props {
  soloSystem: SystemId | null;
  selectedId: string | null;
  hoveredId: string | null;
  autoRotate: boolean;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
}

export function Viewer3D({ soloSystem, selectedId, hoveredId, autoRotate, onSelect, onHover }: Props) {
  const narrow = typeof window !== 'undefined' && window.innerWidth < 640;
  return (
    <Canvas
      camera={{ position: [0, 2.1, narrow ? 9.4 : 6.4], fov: narrow ? 40 : 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      onPointerMissed={() => onSelect(null)}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 5]} intensity={1.1} color="#fdf6e8" />
        <directionalLight position={[-5, 3, -4]} intensity={0.5} color="#9db8e8" />
        <pointLight position={[0, 3.4, 3]} intensity={0.4} color="#cfe8d8" />
        <SlowSpin spinning={autoRotate}>
          <group position={[0, -1.65, 0]}>
            <AnatomyModel
              soloSystem={soloSystem}
              selectedId={selectedId}
              hoveredId={hoveredId}
              onSelect={onSelect}
              onHover={onHover}
            />
            <SelectedLabel id={selectedId} />
          </group>
        </SlowSpin>
        <ContactShadows position={[0, -1.72, 0]} opacity={0.45} scale={9} blur={2.6} far={3.4} color="#000000" />
        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={2.6}
          maxDistance={10}
          minPolarAngle={0.35}
          maxPolarAngle={Math.PI - 0.45}
          target={[0, 0.1, 0]}
        />
      </Suspense>
    </Canvas>
  );
}
