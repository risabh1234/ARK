"use client";

import dynamic from "next/dynamic";
import { Scene3D } from "./Scene3D";
import { StaticParticleClusterSVG } from "./StaticShapeSVG";

const ParticleClusterScene = dynamic(() => import("./ParticleClusterScene"), { ssr: false });

export function LibraryOrb() {
  return (
    <Scene3D fallback={<StaticParticleClusterSVG />}>
      <ParticleClusterScene />
    </Scene3D>
  );
}
