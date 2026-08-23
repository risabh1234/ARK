"use client";

import dynamic from "next/dynamic";
import { Scene3D } from "./Scene3D";
import { StaticGlobeSVG } from "./StaticShapeSVG";

const GlobeScene = dynamic(() => import("./GlobeScene"), { ssr: false });

export function GlobeVisual() {
  return (
    <Scene3D fallback={<StaticGlobeSVG />} height={420}>
      <GlobeScene />
    </Scene3D>
  );
}
