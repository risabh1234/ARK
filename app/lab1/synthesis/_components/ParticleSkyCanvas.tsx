"use client";

import { useEffect, useRef, memo, type ReactElement } from "react";

interface ParticleSkyCanvasProps {
  reducedMotion?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  alphaSpeed: number;
  maxAlpha: number;
  color: string;
}

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
}

export const ParticleSkyCanvas = memo(function ParticleSkyCanvas({
  reducedMotion = false,
}: ParticleSkyCanvasProps): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth || 800);
    let height = (canvas.height = canvas.offsetHeight || 600);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Generate static stars in the upper sky cavity (y < height * 0.7)
    const starCount = 80;
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.65),
        size: Math.random() * 1.4 + 0.4,
        baseAlpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Generate 35 rising golden dust motes
    const particleCount = 35;
    const particles: Particle[] = [];
    const colors = ["#ffb000", "#ffd27d", "#f0e7d8", "#f59e0b"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(Math.random() * 0.35 + 0.15), // Upward drift
        size: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
        alphaSpeed: (Math.random() * 0.01 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        maxAlpha: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let isVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.offsetWidth || 800;
      height = canvas.offsetHeight || 600;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    // Static draw for reduced motion
    if (reducedMotion) {
      ctx.clearRect(0, 0, width, height);
      // Draw stars
      for (const star of stars) {
        ctx.fillStyle = `rgba(240, 231, 216, ${star.baseAlpha})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      }
      // Draw static particles
      for (const p of particles) {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("resize", handleResize);
      };
    }

    // Animation Loop
    let lastTime = performance.now();
    const render = (now: number) => {
      const delta = Math.min((now - lastTime) / 16.666, 2.5);
      lastTime = now;

      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        // 1. Render Stars
        for (const star of stars) {
          star.phase += star.twinkleSpeed * delta;
          const currentAlpha = star.baseAlpha + Math.sin(star.phase) * 0.25;
          ctx.fillStyle = `rgba(240, 231, 216, ${Math.max(0.1, Math.min(1, currentAlpha))})`;
          ctx.fillRect(star.x, star.y, star.size, star.size);
        }

        // 2. Render & Update Golden Motes
        for (const p of particles) {
          p.x += p.vx * delta;
          p.y += p.vy * delta;

          // Wrap edges
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          // Pulse Alpha
          p.alpha += p.alphaSpeed * delta;
          if (p.alpha > p.maxAlpha || p.alpha < 0.1) {
            p.alphaSpeed = -p.alphaSpeed;
          }

          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0.05, Math.min(0.9, p.alpha));
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Tektronix micro-glow on larger particles
          if (p.size > 1.8) {
            ctx.fillStyle = "rgba(255, 176, 0, 0.2)";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="ark-stage-canvas-layer"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
});
