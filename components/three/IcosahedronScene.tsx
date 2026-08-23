"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

/**
 * Vision/Codex 3D element, spec §15/§30.3 — a slowly rotating wireframe
 * icosahedron in the accent color, one full turn per ~40s, with a small
 * mouse-parallax offset (max ~10px equivalent). This is the file
 * dynamically imported (ssr:false) by app/vision/page.tsx, mounted only
 * once its section is in view — see components/three/Scene3D.tsx.
 */
function Icosahedron() {
  const mesh = useRef<Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += (Math.PI * 2) / (40 * 60); // one turn / ~40s at 60fps
    mesh.current.rotation.x += (Math.PI * 2) / (90 * 60);
    const { pointer } = state;
    mesh.current.rotation.z = pointer.x * 0.04;
    mesh.current.position.y = pointer.y * 0.15;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.6, 0]} />
      <meshBasicMaterial color="#D94A16" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

export default function IcosahedronScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
      <Icosahedron />
    </Canvas>
  );
}
