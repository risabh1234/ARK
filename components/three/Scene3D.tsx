"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Lazy-mount wrapper for the R3F canvases, spec §30.3 — one 3D element
 * per page, only mounted once its section enters the viewport, with a
 * static SVG fallback under prefers-reduced-motion or when WebGL is
 * unavailable. Never leaves a blank space.
 */
export function Scene3D({
  children,
  fallback,
  height = 360,
}: {
  children: ReactNode;
  fallback: ReactNode;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanRender3D(!reduced && supportsWebGL());
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ height }} className="relative w-full">
      {inView && canRender3D ? children : fallback}
    </div>
  );
}
