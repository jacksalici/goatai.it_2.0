"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const settings = {
  spacing: 28, // px between dots
  spacingMobile: 24, // px between dots below 640px
  dotSmall: 2.2,
  dotLarge: 3.4,
  largeChance: 0.12, // share of dots drawn large
  fadeStart: 0.1, // 0–1 from the top: where dots begin to appear
  minAlpha: 0.04, // opacity at the top of the fade
  maxAlpha: 0.95, // opacity at the bottom
  twinkle: 0.15, // opacity wave amplitude (0 = static)
  twinkleSpeed: 0.8,
};

/** Stable pseudo-random number in [0, 1) for a given index. */
function seeded(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** Dot grid in the brand color that fades in from the top. */
export function DotGrid({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const color = getComputedStyle(canvas).getPropertyValue("--brand").trim();

    let W = 0;
    let H = 0;
    let dots: { x: number; y: number; r: number; a: number; phase: number }[] = [];

    function build() {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      const dpr = Math.min(devicePixelRatio, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const spacing = W < 640 ? settings.spacingMobile : settings.spacing;
      const cols = Math.floor((W - spacing) / spacing) + 1;
      const rows = Math.floor((H - spacing) / spacing) + 1;
      const ox = (W - (cols - 1) * spacing) / 2;
      const oy = (H - (rows - 1) * spacing) / 2;

      dots = [];
      for (let r = 0; r < rows; r++) {
        const y = oy + r * spacing;
        const t = Math.max(0, (y / H - settings.fadeStart) / (1 - settings.fadeStart));
        const a = settings.minAlpha + (settings.maxAlpha - settings.minAlpha) * t ** 1.6;
        for (let c = 0; c < cols; c++) {
          const i = r * 131 + c;
          dots.push({
            x: ox + c * spacing,
            y,
            r: seeded(i) < settings.largeChance ? settings.dotLarge : settings.dotSmall,
            a,
            phase: seeded(i + 777) * Math.PI * 2,
          });
        }
      }
      draw(0);
    }

    function draw(t: number) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = color;
      for (const d of dots) {
        const wave = reduceMotion ? 0 : Math.sin(t * settings.twinkleSpeed + d.phase);
        ctx.globalAlpha = Math.max(0, d.a * (1 - settings.twinkle + settings.twinkle * wave));
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    let raf = 0;
    let visible = true;
    function frame(ms: number) {
      raf = requestAnimationFrame(frame);
      if (visible) draw(ms / 1000);
    }

    build();
    const resizeObserver = new ResizeObserver(build);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    visibilityObserver.observe(canvas);
    if (!reduceMotion) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
    />
  );
}
