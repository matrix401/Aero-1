// src/components/aeromind/scenes/Scenes.tsx
import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useEntry(active: boolean, duration = 1.2) {
  const t = useRef(0);
  const startedAt = useRef<number | null>(null);
  useEffect(() => {
    if (active && startedAt.current === null) startedAt.current = performance.now();
    if (!active) {
      startedAt.current = null;
      t.current = 0;
    }
  }, [active]);
  useFrame(() => {
    if (startedAt.current === null) return;
    const e = Math.min(1, (performance.now() - startedAt.current) / (duration * 1000));
    t.current = 1 - Math.pow(1 - e, 3);
  });
  return t;
}

function SceneShell({
  children,
  bloom = false,
  className = "",
  cameraZ = 6,
}: {
  children: ReactNode;
  bloom?: boolean;
  className?: string;
  cameraZ?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.05);
  return (
    <div ref={ref} className={`absolute inset-0 pointer-events-none ${className}`}>
      {inView && (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, cameraZ], fov: 38, near: 0.1, far: 100 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.5} color="#b8d7ff" />
          <directionalLight position={[4, 6, 5]} intensity={1.35} color="#d8f3ff" />
          <directionalLight position={[-5, -2, 3]} intensity={0.75} color="#38f8b3" />
          <pointLight position={[0, 2, 3]} intensity={1.2} color="#38f8b3" />
          <Suspense fallback={null}>
            {children}
            {bloom && (
              <EffectComposer multisampling={0}>
                <Bloom intensity={0.7} luminanceThreshold={0.3} luminanceSmoothing={0.9} mipmapBlur />
              </EffectComposer>
            )}
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}

export function GenesisBeacon() {
  const group = useRef<THREE.Group>(null);
  const seam = useRef<THREE.MeshStandardMaterial>(null);
  const entry = useEntry(true, 1.6);
  useFrame((state) => {
    if (!group.current) return;
    const e = entry.current;
    group.current.scale.setScalar(0.6 + e * 0.4);
    group.current.rotation.y = state.clock.elapsedTime * 0.12;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.04;
    if (seam.current) {
      const breath = 0.6 + Math.sin(state.clock.elapsedTime * 1.4) * 0.4;
      seam.current.emissiveIntensity = e * (0.6 + breath * 0.4);
      seam.current.opacity = e * 0.12;
    }
  });
  return (
    <group ref={group}>
      <mesh castShadow>
        <boxGeometry args={[0.9, 3.0, 0.45]} />
        <meshStandardMaterial color="#091018" metalness={0.92} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0, 0.231]}>
        <planeGeometry args={[0.08, 2.6]} />
        <meshStandardMaterial
          ref={seam}
          color="#38f8b3"
          emissive="#38f8b3"
          emissiveIntensity={0.8}
          transparent
          opacity={0.12}
        />
      </mesh>
      <mesh position={[0, -1.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.0, 64]} />
        <meshBasicMaterial color="#38f8b3" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function SignalSwarm() {
  const group = useRef<THREE.Group>(null);
  const sats = useRef<(THREE.Mesh | null)[]>([]);
  const entry = useEntry(true, 1.6);
  const positions = useMemo(
    () => Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * Math.PI * 2;
      const tilt = (i % 2 ? 0.25 : -0.25);
      return new THREE.Vector3(Math.cos(a) * 1.8, Math.sin(a) * 0.9 + tilt, Math.sin(a) * 1.5);
    }),
    [],
  );
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.18;
    sats.current.forEach((m, i) => {
      if (!m) return;
      const delay = i * 0.12;
      const local = Math.max(0, Math.min(1, (entry.current - delay) / (1 - delay)));
      const target = positions[i];
      m.position.lerpVectors(new THREE.Vector3(0, 0, 0), target, local);
      const pulse = 0.7 + Math.sin(t * 2 + i) * 0.3;
      m.scale.setScalar(0.12 * pulse * local);
    });
  });
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color="#0d1117" metalness={0.9} roughness={0.4} emissive="#1a2030" emissiveIntensity={0.2} />
      </mesh>
      {positions.map((_, i) => (
        <mesh key={i} ref={(el) => { sats.current[i] = el; }}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#ffb547" emissive="#ffb547" emissiveIntensity={0.4} transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

export function FragmentShards() {
  const group = useRef<THREE.Group>(null);
  const plates = useRef<(THREE.Mesh | null)[]>([]);
  const entry = useEntry(true, 1.4);
  useFrame((state) => {
    if (!group.current) return;
    const e = entry.current;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.1;
    group.current.rotation.x = -0.35 + Math.sin(t * 0.3) * 0.04;
    plates.current.forEach((m, i) => {
      if (!m) return;
      const offset = (i - 2) * 0.55 * e;
      m.position.y = offset + Math.sin(t * 0.6 + i) * 0.03;
      m.rotation.z = Math.sin(t * 0.4 + i * 0.7) * 0.05 * e;
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.08 + e * 0.06;
    });
  });
  const colors = ["#6df1ff", "#38f8b3", "#ffb547", "#9ab3c9", "#38f8b3"];
  return (
    <group ref={group}>
      {colors.map((c, i) => (
        <mesh key={i} ref={(el) => { plates.current[i] = el; }}>
          <boxGeometry args={[2.2 - i * 0.15, 0.04, 2.2 - i * 0.15]} />
          <meshStandardMaterial
            color="#0d1117"
            emissive={c}
            emissiveIntensity={0.12}
            metalness={0.85}
            roughness={0.35}
            transparent
            opacity={0.12}
          />
        </mesh>
      ))}
    </group>
  );
}

export function LatticeWeave() {
  const group = useRef<THREE.Group>(null);
  const entry = useEntry(true, 1.8);
  useFrame((state) => {
    if (!group.current) return;
    const e = entry.current;
    const t = state.clock.elapsedTime;
    group.current.scale.setScalar(0.3 + e * 0.9);
    group.current.rotation.y = t * 0.25;
    group.current.rotation.x = t * 0.15;
  });
  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="#04060a" transparent opacity={0.0} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(2, 2, 2)]} />
        <lineBasicMaterial color="#6df1ff" transparent opacity={0.06} />
      </lineSegments>
      <lineSegments>
        <edgesGeometry args={[new THREE.OctahedronGeometry(1.2, 0)]} />
        <lineBasicMaterial color="#38f8b3" transparent opacity={0.05} />
      </lineSegments>
      <mesh>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial color="#38f8b3" emissive="#38f8b3" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

export function DistressMeter() {
  const needle = useRef<THREE.Mesh>(null);
  const bar = useRef<THREE.Mesh>(null);
  const entry = useEntry(true, 1.4);
  const TARGET = 0.62;
  useFrame((state) => {
    const e = entry.current;
    const t = state.clock.elapsedTime;
    const fill = e * TARGET;
    if (needle.current) {
      needle.current.rotation.z = -Math.PI / 2 + fill * Math.PI + Math.sin(t * 3) * 0.005 * e;
    }
    if (bar.current) {
      bar.current.scale.y = Math.max(0.001, fill * 2.4);
      bar.current.position.y = -1.2 + fill * 1.2;
    }
  });
  return (
    <group rotation={[0, 0, 0]}>
      <mesh>
        <torusGeometry args={[1.4, 0.018, 12, 96, Math.PI]} />
        <meshStandardMaterial color="#9ab3c9" emissive="#6df1ff" emissiveIntensity={0.08} transparent opacity={0.05} />
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1.4, 0.035, 14, 96, Math.PI]} />
        <meshStandardMaterial color="#38f8b3" emissive="#38f8b3" emissiveIntensity={0.2} transparent opacity={0.0} />
      </mesh>
      <mesh ref={needle} position={[0, 0, 0.02]}>
        <boxGeometry args={[1.2, 0.025, 0.02]} />
        <meshStandardMaterial color="#38f8b3" emissive="#38f8b3" emissiveIntensity={0.8} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.09, 0.09, 0.05, 24]} />
        <meshStandardMaterial color="#0d1117" metalness={0.9} roughness={0.3} emissive="#38f8b3" emissiveIntensity={0.2} />
      </mesh>
      <mesh ref={bar} position={[2.2, -1.2, 0]}>
        <boxGeometry args={[0.18, 1, 0.05]} />
        <meshStandardMaterial color="#38f8b3" emissive="#38f8b3" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[2.2, 0, 0]}>
        <boxGeometry args={[0.22, 2.5, 0.01]} />
        <meshBasicMaterial color="#6df1ff" transparent opacity={0.03} />
      </mesh>
    </group>
  );
}

export function HexNetwork() {
  const group = useRef<THREE.Group>(null);
  const hexes = useRef<(THREE.Mesh | null)[]>([]);
  const packet = useRef<THREE.Mesh>(null);
  const entry = useEntry(true, 1.6);
  const positions = useMemo(
    () => Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * 1.7, 0, Math.sin(a) * 1.7);
    }),
    [],
  );
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const e = entry.current;
    group.current.rotation.y = t * 0.12;
    group.current.rotation.x = -0.35;
    hexes.current.forEach((m, i) => {
      if (!m) return;
      const delay = i * 0.09;
      const local = Math.max(0, Math.min(1, (e - delay) / (1 - delay)));
      m.position.y = -1.5 + local * 1.5;
      m.scale.y = 0.3 + local * 0.7;
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.1 + local * 0.2;
    });
    if (packet.current && e > 0.9) {
      const idx = (t * 0.6) % 6;
      const a = positions[Math.floor(idx)];
      const b = positions[(Math.floor(idx) + 1) % 6];
      packet.current.position.lerpVectors(a, b, idx - Math.floor(idx));
      packet.current.visible = true;
    } else if (packet.current) {
      packet.current.visible = false;
    }
  });
  return (
    <group ref={group}>
      {positions.map((p, i) => (
        <mesh key={i} position={p} ref={(el) => { hexes.current[i] = el; }}>
          <cylinderGeometry args={[0.42, 0.42, 0.6, 6]} />
          <meshStandardMaterial color="#0d1117" emissive="#6df1ff" emissiveIntensity={0.1} metalness={0.85} roughness={0.35} transparent opacity={0.12} />
        </mesh>
      ))}
      {positions.map((p, i) => {
        const n = positions[(i + 1) % positions.length];
        const mid = new THREE.Vector3().addVectors(p, n).multiplyScalar(0.5);
        const len = p.distanceTo(n);
        const dir = new THREE.Vector3().subVectors(n, p).normalize();
        const angle = Math.atan2(dir.x, dir.z);
        return (
          <mesh key={`e${i}`} position={mid} rotation={[0, angle + Math.PI / 2, 0]}>
            <boxGeometry args={[len, 0.015, 0.015]} />
            <meshBasicMaterial color="#38f8b3" transparent opacity={0.03} />
          </mesh>
        );
      })}
      <mesh>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshStandardMaterial color="#0d1117" emissive="#38f8b3" emissiveIntensity={0.3} metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh ref={packet}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#6df1ff" emissive="#6df1ff" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

export function IndiaGlobePatch() {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<(THREE.Mesh | null)[]>([]);
  const entry = useEntry(true, 1.5);
  const cities = useMemo(
    () => [
      new THREE.Vector3(-0.4, 0.3, 0.05),
      new THREE.Vector3(0.2, 0.1, 0.05),
      new THREE.Vector3(0.45, -0.1, 0.05),
      new THREE.Vector3(0.55, -0.4, 0.05),
    ],
    [],
  );
  useFrame((state) => {
    if (!group.current) return;
    const e = entry.current;
    const t = state.clock.elapsedTime;
    group.current.rotation.x = -0.5 + (1 - e) * 0.6;
    group.current.rotation.y = t * 0.08;
    group.current.scale.setScalar(0.7 + e * 0.5);
    nodes.current.forEach((m, i) => {
      if (!m) return;
      const local = Math.max(0, Math.min(1, (e - i * 0.1) / 0.6));
      const pulse = 0.7 + Math.sin(t * 2.2 + i * 1.4) * 0.3;
      m.scale.setScalar(local * pulse);
    });
  });
  return (
    <group ref={group}>
      <mesh>
        <circleGeometry args={[1.4, 64]} />
        <meshStandardMaterial color="#0d1117" metalness={0.8} roughness={0.45} transparent opacity={0.04} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <ringGeometry args={[1.4, 1.44, 64]} />
        <meshBasicMaterial color="#38f8b3" transparent opacity={0.04} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <ringGeometry args={[0.7, 0.71, 64]} />
        <meshBasicMaterial color="#6df1ff" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>
      {cities.slice(0, -1).map((c, i) => {
        const n = cities[i + 1];
        const mid = new THREE.Vector3().addVectors(c, n).multiplyScalar(0.5);
        const len = c.distanceTo(n);
        const dir = new THREE.Vector3().subVectors(n, c).normalize();
        const angle = Math.atan2(dir.y, dir.x);
        return (
          <mesh key={`ln${i}`} position={mid} rotation={[0, 0, angle]}>
            <boxGeometry args={[len, 0.01, 0.005]} />
            <meshBasicMaterial color="#38f8b3" transparent opacity={0.03} />
          </mesh>
        );
      })}
      {cities.map((p, i) => (
        <group key={i} position={p}>
          <mesh ref={(el) => { nodes.current[i] = el; }}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#38f8b3" emissive="#38f8b3" emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function SignalLock() {
  const rings = useRef<(THREE.Mesh | null)[]>([]);
  const core = useRef<THREE.Mesh>(null);
  const entry = useEntry(true, 2.0);
  useFrame((state) => {
    const e = entry.current;
    const t = state.clock.elapsedTime;
    rings.current.forEach((m, i) => {
      if (!m) return;
      const startR = 2.4 - i * 0.5;
      const targetR = 0.4;
      const r = startR + (targetR - startR) * e;
      m.scale.setScalar(r);
      m.rotation.z = t * (0.2 + i * 0.1) * (i % 2 ? -1 : 1);
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.04 + e * 0.06;
    });
    if (core.current) {
      const breath = 0.85 + Math.sin(t * 1.6) * 0.15;
      core.current.scale.setScalar(e * breath);
      const mat = core.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = e * 0.6;
    }
  });
  return (
    <group>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} ref={(el) => { rings.current[i] = el; }}>
          <ringGeometry args={[0.96, 1.0, 96]} />
          <meshBasicMaterial color="#38f8b3" transparent opacity={0.04} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <mesh ref={core}>
        <circleGeometry args={[0.6, 64]} />
        <meshStandardMaterial color="#38f8b3" emissive="#38f8b3" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

export const Scene = {
  Genesis: () => <SceneShell bloom><GenesisBeacon /></SceneShell>,
  Warning: () => <SceneShell><SignalSwarm /></SceneShell>,
  Fragmented: () => <SceneShell cameraZ={5}><FragmentShards /></SceneShell>,
  Connected: () => <SceneShell bloom><LatticeWeave /></SceneShell>,
  Distress: () => <SceneShell cameraZ={5}><DistressMeter /></SceneShell>,
  Network: () => <SceneShell cameraZ={5.5}><HexNetwork /></SceneShell>,
  Traction: () => <SceneShell cameraZ={4.5}><IndiaGlobePatch /></SceneShell>,
  Payoff: () => <SceneShell bloom cameraZ={5}><SignalLock /></SceneShell>,
};