"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Points as PointsType } from "three";

/**
 * Library page 3D element, spec §16/§30.3 — a slowly assembling
 * particle cluster, distinct from Vision's icosahedron so the two
 * pages don't read as the same shape. Points drift toward loose
 * icosahedral positions, then hold, rotating gently.
 */
function ParticleCluster() {
  const points = useRef<PointsType>(null);
  const COUNT = 220;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 1.3 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y += (Math.PI * 2) / (40 * 60);
    const { pointer } = state;
    points.current.rotation.x = pointer.y * 0.08;
    points.current.rotation.z = pointer.x * 0.04;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#B5502F" size={0.035} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function ParticleClusterScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
      <ParticleCluster />
    </Canvas>
  );
}
