"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SIGNAL_BLUE = "#3E7BFA";

function latLonToVec3(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

// A handful of node positions, arranged for visual balance — decorative,
// not real geographic/activity data (same abstraction level as the
// icosahedron/particle scenes elsewhere in this app).
const NODES: [number, number][] = [
  [28, 77], [51, 0], [35, 139], [-33, 151], [40, -74],
  [-23, -46], [1, 103], [55, 37], [-1, 36], [19, 72],
];

const ARCS: [number, number][] = [
  [0, 4], [1, 5], [2, 3], [4, 6], [7, 8], [9, 1], [0, 8], [5, 2],
];

function Globe() {
  const group = useRef<THREE.Group>(null);
  const radius = 1.7;

  const nodePositions = useMemo(() => NODES.map(([lat, lon]) => latLonToVec3(lat, lon, radius)), []);

  // Built as real THREE.Line objects (not JSX <line>) — R3F's JSX
  // typings for `line` collide with the SVG `<line>` element in this
  // TS setup, so `primitive` is the clean way to render them.
  const arcLines = useMemo(() => {
    const material = new THREE.LineBasicMaterial({ color: SIGNAL_BLUE, transparent: true, opacity: 0.45 });
    return ARCS.map(([a, b]) => {
      const start = nodePositions[a];
      const end = nodePositions[b];
      const mid = start.clone().add(end).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(radius * (1.25 + Math.random() * 0.25));
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(32));
      return new THREE.Line(geometry, material);
    });
  }, [nodePositions]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y += (Math.PI * 2) / (55 * 60);
    const { pointer } = state;
    group.current.rotation.x = pointer.y * 0.08;
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[radius, 24, 18]} />
        <meshBasicMaterial color={SIGNAL_BLUE} wireframe transparent opacity={0.16} />
      </mesh>
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color={SIGNAL_BLUE} transparent opacity={0.9} />
        </mesh>
      ))}
      {arcLines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}

export default function GlobeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.6], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
      <Globe />
    </Canvas>
  );
}
