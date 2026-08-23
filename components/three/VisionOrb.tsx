"use client";

import dynamic from "next/dynamic";
import { Scene3D } from "./Scene3D";
import { StaticIcosahedronSVG } from "./StaticShapeSVG";

const IcosahedronScene = dynamic(() => import("./IcosahedronScene"), { ssr: false });

export function VisionOrb() {
  return (
    <Scene3D fallback={<StaticIcosahedronSVG />}>
      <IcosahedronScene />
    </Scene3D>
  );
}
