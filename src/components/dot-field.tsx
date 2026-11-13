"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Settings — every knob of the effect. Override any of them via `settings`.  */
/* Colors are not here: they are read from colors.css.                        */
/* -------------------------------------------------------------------------- */
export const dotFieldDefaults = {
  // Gradient
  driftSpeed: 0.16, // how fast the color areas move
  sway: 0.04, // gentle wobble of the color edges
  blobTightness: 2.2, // higher = smaller color areas
  colorSharpness: 1.6, // higher = purer colors, harder blends
  grain: 0.05, // film-grain opacity
  grainFps: 24, // grain re-seeds per second

  // Dots (radii in px)
  spacing: 30, // px between dots
  spacingMobile: 26, // px between dots below 640px
  dotSmall: 2,
  dotMedium: 2.4,
  dotLarge: 3,
  labelDot: 10, // dots that carry a label
  shimmer: 0.06, // idle size wave
  shimmerSpeed: 1,

  // Cursor
  influence: 50, // px radius where dots grow and move away
  magnify: 0.6, // extra size at the cursor
  repel: 6, // px dots get pushed
  hoverRadius: 14, // px around a label dot that opens it

  // Ripple
  ripple: 0.15, // strength on click (half of it when a label opens)
  rippleSpeed: 240, // px per second
  rippleLife: 2, // seconds

  // Labels
  labelEvery: 2.5, // seconds between automatic pop-ups
  labelHold: 5, // seconds an automatic label stays open
  maxOpen: 3, // max automatic labels open at once
  morphMs: 700, // dot → chip morph duration
  hoverLinger: 0.9, // seconds a label stays open after the cursor leaves

  // Fade (only with `fade`)
  fadeStart: 0.1, // 0–1 from the top: where dots begin to appear
  fadeMin: 0.04, // dot opacity at the top of the fade
  fadeMax: 0.95, // dot opacity at the bottom
};

export type DotFieldSettings = typeof dotFieldDefaults;
export type DotFieldLabel = { text: string; x: number; y: number };

/** Gradient color areas: palette variable, position (0–1 from top-left), drift and tightness. */
const blobs = [
  { color: "blue", x: 0.18, y: 0.2, ax: 0.08, ay: 0.1, fx: 1.1, fy: 0.9, k: 1 },
  {
    color: "blue",
    x: 0.48,
    y: 0.05,
    ax: 0.1,
    ay: 0.06,
    fx: 0.7,
    fy: 1.3,
    k: 1.3,
  },
  {
    color: "lavender",
    x: 0.9,
    y: 0.18,
    ax: 0.05,
    ay: 0.1,
    fx: 0.8,
    fy: 1.2,
    k: 0.75,
  },
  {
    color: "orange",
    x: 0.08,
    y: 0.92,
    ax: 0.07,
    ay: 0.08,
    fx: 1,
    fy: 0.8,
    k: 1.2,
  },
  {
    color: "lavender",
    x: 0.62,
    y: 0.88,
    ax: 0.12,
    ay: 0.1,
    fx: 0.6,
    fy: 1.1,
    k: 1,
  },
  {
    color: "orange",
    x: 0.95,
    y: 0.9,
    ax: 0.04,
    ay: 0.08,
    fx: 0.9,
    fy: 0.7,
    k: 1.4,
  },
];

const noLabels: DotFieldLabel[] = [];

/* -------------------------------------------------------------------------- */

/**
 * Animated dot field. Children render on top of the effect.
 * - `gradient`: moving color background; when off, set the background via `className`.
 * - `dotColor`: palette variable the dots are drawn with.
 * - `fade`: dots fade in from the top.
 */
export function DotField({
  labels = noLabels,
  gradient = true,
  dotColor = "background",
  fade = false,
  settings,
  className,
  children,
}: {
  labels?: DotFieldLabel[];
  gradient?: boolean;
  dotColor?: string;
  fade?: boolean;
  settings?: Partial<DotFieldSettings>;
  className?: string;
  children?: React.ReactNode;
}) {
  const cfg = { ...dotFieldDefaults, ...settings };
  const rootRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLCanvasElement>(null);
  const grainRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<HTMLCanvasElement>(null);
  const chipRefs = useRef<HTMLDivElement[]>([]);

  useEffect(
    () =>
      startDotField({
        root: rootRef.current!,
        gradientCanvas: gradientRef.current,
        grainCanvas: grainRef.current,
        dotCanvas: dotsRef.current!,
        chips: chipRefs.current,
        labels,
        dotColor,
        fade,
        cfg: { ...dotFieldDefaults, ...settings },
      }),
    [labels, dotColor, fade, settings],
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative isolate overflow-hidden",
        gradient && "bg-blue",
        className,
      )}
      style={
        {
          "--dot": `${cfg.labelDot * 2}px`,
          "--morph": `${cfg.morphMs}ms`,
          "--text-delay": `${cfg.morphMs * 0.45}ms`,
        } as React.CSSProperties
      }
    >
      {gradient && (
        <>
          <canvas
            ref={gradientRef}
            aria-hidden="true"
            className="absolute inset-0 -z-10 size-full"
          />
          <canvas
            ref={grainRef}
            aria-hidden="true"
            className="absolute inset-0 -z-10 size-full mix-blend-overlay"
            style={{ opacity: cfg.grain }}
          />
        </>
      )}
      <canvas
        ref={dotsRef}
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full"
      />

      {labels.map((label, i) => (
        <div
          key={label.text}
          ref={(el) => {
            if (el) chipRefs.current[i] = el;
          }}
          data-open="false"
          className={cn(
            "group pointer-events-none absolute top-0 left-0 flex select-none size-(--dot) items-center justify-center overflow-hidden rounded-full bg-background",
            "transition-[width,height,box-shadow] duration-(--morph) ease-[cubic-bezier(0.34,1.35,0.64,1)]",
            "data-[open=true]:h-8 data-[open=true]:w-(--chip-w) data-[open=true]:shadow-lg data-[open=true]:shadow-foreground/10 sm:data-[open=true]:h-9",
          )}
        >
          <span className="shrink-0 px-3 text-xs font-medium whitespace-nowrap opacity-0 transition-opacity duration-200 group-data-[open=true]:opacity-100 group-data-[open=true]:delay-(--text-delay) sm:px-4 sm:text-sm">
            {label.text}
          </span>
        </div>
      ))}

      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Animation engine                                                           */
/* -------------------------------------------------------------------------- */

type RGB = [number, number, number];

type Dot = {
  x: number;
  y: number;
  wave: number; // diagonal offset for the shimmer
  base: number;
  alpha: number;
  scale: number;
  vs: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
};

type Anchor = {
  el: HTMLDivElement;
  x: number;
  y: number;
  width: number; // chip width when open
  shift: number; // horizontal offset that keeps the open chip inside the box
  open: boolean;
  hovered: boolean;
  closeAt: number;
};

type Ripple = { x: number; y: number; t: number; strength: number };

/** Resolves any CSS color (hex, oklch, …) of a custom property to RGB. */
function readColor(el: Element, name: string): RGB {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = getComputedStyle(el).getPropertyValue(`--${name}`).trim();
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}

/* OKLab conversion (https://bottosson.github.io/posts/oklab), so blends look even to the eye. */
const toLinear = (c: number) =>
  (c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const fromLinear = (c: number) =>
  255 *
  (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.max(c, 0) ** (1 / 2.4) - 0.055);

function rgbToOklab([r, g, b]: RGB): RGB {
  const [lr, lg, lb] = [toLinear(r), toLinear(g), toLinear(b)];
  const l = Math.cbrt(
    0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb,
  );
  const m = Math.cbrt(
    0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb,
  );
  const s = Math.cbrt(
    0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb,
  );
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function oklabToRgb(L: number, a: number, b: number): RGB {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    fromLinear(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    fromLinear(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    fromLinear(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

/** Stable pseudo-random number in [0, 1) for a given index. */
function seeded(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function startDotField({
  root,
  gradientCanvas,
  grainCanvas,
  dotCanvas,
  chips,
  labels,
  dotColor: dotColorName,
  fade,
  cfg,
}: {
  root: HTMLDivElement;
  gradientCanvas: HTMLCanvasElement | null;
  grainCanvas: HTMLCanvasElement | null;
  dotCanvas: HTMLCanvasElement;
  chips: HTMLDivElement[];
  labels: DotFieldLabel[];
  dotColor: string;
  fade: boolean;
  cfg: DotFieldSettings;
}) {
  const gctx = gradientCanvas?.getContext("2d");
  const nctx = grainCanvas?.getContext("2d");
  const ctx = dotCanvas.getContext("2d")!;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const now = () => performance.now() / 1000;

  const dotColor = `rgb(${readColor(root, dotColorName).join(",")})`;
  const blobColors = blobs.map((b) => rgbToOklab(readColor(root, b.color)));

  // Grain: one random tile, redrawn at a random offset.
  const tile = document.createElement("canvas");
  tile.width = tile.height = 128;
  const tctx = tile.getContext("2d")!;
  const noise = tctx.createImageData(128, 128);
  for (let i = 0; i < noise.data.length; i += 4) {
    noise.data[i] = noise.data[i + 1] = noise.data[i + 2] = Math.random() * 255;
    noise.data[i + 3] = 255;
  }
  tctx.putImageData(noise, 0, 0);
  const grainPattern = nctx?.createPattern(tile, "repeat");

  const anchors: Anchor[] = chips.map((el) => ({
    el,
    x: 0,
    y: 0,
    width: 0,
    shift: 0,
    open: false,
    hovered: false,
    closeAt: 0,
  }));

  let W = 0;
  let H = 0;
  let dots: Dot[] = [];
  let gradient: ImageData | undefined;
  const ripples: Ripple[] = [];
  const mouse = { x: 0, y: 0, inside: false };

  function measureChips() {
    for (const a of anchors) {
      a.width = (a.el.firstElementChild as HTMLElement).offsetWidth;
      a.el.style.setProperty("--chip-w", `${a.width}px`);
    }
  }

  function build() {
    const rect = root.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    const dpr = Math.min(devicePixelRatio, 2);
    dotCanvas.width = W * dpr;
    dotCanvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (grainCanvas) {
      grainCanvas.width = W;
      grainCanvas.height = H;
    }
    if (gradientCanvas && gctx) {
      gradientCanvas.width = Math.ceil(W / 8);
      gradientCanvas.height = Math.ceil(H / 8);
      gradient = gctx.createImageData(
        gradientCanvas.width,
        gradientCanvas.height,
      );
    }

    const spacing = W < 640 ? cfg.spacingMobile : cfg.spacing;
    const cols = Math.floor((W - spacing * 1.9) / spacing) + 1;
    const rows = Math.floor((H - spacing * 1.9) / spacing) + 1;
    const ox = (W - (cols - 1) * spacing) / 2;
    const oy = (H - (rows - 1) * spacing) / 2;

    // Label dots snap to the nearest grid point and are drawn by their chip.
    const anchorCells = new Set<number>();
    labels.forEach((label, i) => {
      const c = Math.round(label.x * (cols - 1));
      const r = Math.round(label.y * (rows - 1));
      anchorCells.add(r * cols + c);
      anchors[i].x = ox + c * spacing;
      anchors[i].y = oy + r * spacing;
    });

    dots = [];
    for (let r = 0; r < rows; r++) {
      const y = oy + r * spacing;
      const f = Math.max(0, (y / H - cfg.fadeStart) / (1 - cfg.fadeStart));
      const alpha = fade
        ? cfg.fadeMin + (cfg.fadeMax - cfg.fadeMin) * f ** 1.6
        : 1;
      for (let c = 0; c < cols; c++) {
        if (anchorCells.has(r * cols + c)) continue;
        const rv = seeded(r * 97 + c);
        dots.push({
          x: ox + c * spacing,
          y,
          wave: (c + r) * 0.35 - seeded(r * 97 + c + 999) * 2,
          base:
            rv > 0.86 ? cfg.dotLarge : rv > 0.55 ? cfg.dotMedium : cfg.dotSmall,
          alpha,
          scale: 1,
          vs: 0,
          dx: 0,
          dy: 0,
          vx: 0,
          vy: 0,
        });
      }
    }
    measureChips();
  }

  function drawGradient(drift: number) {
    if (!gctx || !gradient) return;
    const { width: gw, height: gh, data } = gradient;
    const asp = W / H;
    const centers = blobs.map((b) => [
      (b.x + b.ax * Math.sin(drift * b.fx)) * asp,
      b.y + b.ay * Math.cos(drift * b.fy),
      cfg.blobTightness * b.k * cfg.colorSharpness,
    ]);
    let i = 0;
    for (let y = 0; y < gh; y++) {
      const py = (y + 0.5) / gh;
      for (let x = 0; x < gw; x++) {
        const px = ((x + 0.5) / gw) * asp;
        const wx = px + cfg.sway * Math.sin(py * 3.1 + drift * 0.5);
        const wy = py + cfg.sway * Math.cos(px * 2.7 - drift * 0.5);
        // weighted mix of the blob colors, in OKLab
        let sum = 1e-9;
        let L = 0;
        let A = 0;
        let B = 0;
        for (let k = 0; k < centers.length; k++) {
          const [cx, cy, tightness] = centers[k];
          const w = Math.exp(-((wx - cx) ** 2 + (wy - cy) ** 2) * tightness);
          sum += w;
          L += blobColors[k][0] * w;
          A += blobColors[k][1] * w;
          B += blobColors[k][2] * w;
        }
        const [r, g, b] = oklabToRgb(L / sum, A / sum, B / sum);
        data[i++] = r;
        data[i++] = g;
        data[i++] = b;
        data[i++] = 255;
      }
    }
    gctx.putImageData(gradient, 0, 0);
  }

  function drawGrain() {
    if (!nctx || !grainPattern) return;
    nctx.save();
    nctx.translate(-Math.random() * 128, -Math.random() * 128);
    nctx.fillStyle = grainPattern;
    nctx.fillRect(0, 0, W + 128, H + 128);
    nctx.restore();
  }

  function setOpen(a: Anchor, open: boolean) {
    a.open = open;
    a.el.dataset.open = String(open);
  }

  function updateLabels(t: number, dt: number) {
    if (!reduceMotion && t >= nextAuto) {
      nextAuto = t + cfg.labelEvery;
      const closed = anchors.filter((a) => !a.open);
      if (anchors.length - closed.length < cfg.maxOpen && closed.length) {
        const a = closed[Math.floor(Math.random() * closed.length)];
        setOpen(a, true);
        a.closeAt = t + cfg.labelHold;
      }
    }
    for (const a of anchors) {
      if (a.open && !a.hovered && t >= a.closeAt) setOpen(a, false);
      const half = a.width / 2 + 10;
      const target = a.open ? Math.min(Math.max(a.x, half), W - half) - a.x : 0;
      a.shift += (target - a.shift) * Math.min(1, dt * 8);
      a.el.style.transform = `translate(${a.x + a.shift}px, ${a.y}px) translate(-50%, -50%)`;
    }
  }

  function drawDots(t: number, dt: number) {
    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].t += dt;
      if (ripples[i].t > cfg.rippleLife) ripples.splice(i, 1);
    }

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = dotColor;

    for (const d of dots) {
      let scale = 1;
      let tx = 0;
      let ty = 0;

      if (mouse.inside) {
        const mx = d.x - mouse.x;
        const my = d.y - mouse.y;
        const dist = Math.hypot(mx, my);
        if (dist < cfg.influence) {
          const f = 1 - dist / cfg.influence;
          const e = f * f * (3 - 2 * f);
          scale += e * cfg.magnify;
          tx += (mx * e * cfg.repel) / (dist || 1);
          ty += (my * e * cfg.repel) / (dist || 1);
        }
      }

      for (const rp of ripples) {
        const dist = Math.hypot(d.x - rp.x, d.y - rp.y);
        const band =
          Math.exp(-((dist - rp.t * cfg.rippleSpeed) ** 2) / 600) *
          (1 - rp.t / cfg.rippleLife) *
          rp.strength;
        if (band > 0.002) {
          scale += band * 1.4;
          tx += ((d.x - rp.x) * band * 8) / (dist || 1);
          ty += ((d.y - rp.y) * band * 8) / (dist || 1);
        }
      }

      // springs
      d.vs = (d.vs + (scale - d.scale) * 180 * dt) * 0.8;
      d.scale += d.vs * dt * 6;
      d.vx = (d.vx + (tx - d.dx) * 160 * dt) * 0.82;
      d.dx += d.vx * dt * 6;
      d.vy = (d.vy + (ty - d.dy) * 160 * dt) * 0.82;
      d.dy += d.vy * dt * 6;

      const wave = Math.sin(t * cfg.shimmerSpeed - d.wave);
      ctx.globalAlpha = d.alpha * (0.88 + 0.12 * wave);
      ctx.beginPath();
      ctx.arc(
        d.x + d.dx,
        d.y + d.dy,
        Math.max(0.5, d.base * d.scale * (1 + wave * cfg.shimmer)),
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Loop
  let raf = 0;
  let last = now();
  let drift = 0;
  let nextGrain = 0;
  let nextAuto = last + 0.6;
  let visible = true;

  function frame() {
    raf = requestAnimationFrame(frame);
    const t = now();
    const dt = Math.min(t - last, 1 / 30);
    last = t;
    if (!visible) return;

    drift += dt * cfg.driftSpeed * (reduceMotion ? 0.3 : 1);
    drawGradient(drift);
    if (!reduceMotion && t >= nextGrain) {
      nextGrain = t + 1 / cfg.grainFps;
      drawGrain();
    }
    updateLabels(t, dt);
    drawDots(reduceMotion ? t * 0.3 : t, dt);
  }

  // Pointer
  function onMove(e: PointerEvent) {
    const rect = root.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.inside = true;

    const hit = anchors.find((a) =>
      a.open
        ? Math.abs(mouse.x - a.x - a.shift) <= a.el.offsetWidth / 2 &&
          Math.abs(mouse.y - a.y) <= a.el.offsetHeight / 2
        : Math.hypot(mouse.x - a.x, mouse.y - a.y) <= cfg.hoverRadius,
    );
    for (const a of anchors) {
      if (a === hit && !a.hovered) {
        a.hovered = true;
        if (!a.open) {
          setOpen(a, true);
          ripples.push({ x: a.x, y: a.y, t: 0, strength: cfg.ripple / 2 });
        }
      } else if (a !== hit && a.hovered) {
        a.hovered = false;
        a.closeAt = now() + cfg.hoverLinger;
      }
    }
    root.style.cursor = hit ? "pointer" : "";
  }

  function onLeave() {
    mouse.inside = false;
    for (const a of anchors) {
      if (a.hovered) {
        a.hovered = false;
        a.closeAt = now() + cfg.hoverLinger;
      }
    }
  }

  function onDown(e: PointerEvent) {
    const rect = root.getBoundingClientRect();
    ripples.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      t: 0,
      strength: cfg.ripple,
    });
  }

  build();
  drawGrain();
  document.fonts?.ready.then(measureChips);

  const resizeObserver = new ResizeObserver(build);
  resizeObserver.observe(root);
  const visibilityObserver = new IntersectionObserver(
    ([entry]) => (visible = entry.isIntersecting),
  );
  visibilityObserver.observe(root);
  root.addEventListener("pointermove", onMove);
  root.addEventListener("pointerleave", onLeave);
  root.addEventListener("pointerdown", onDown);
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    root.removeEventListener("pointermove", onMove);
    root.removeEventListener("pointerleave", onLeave);
    root.removeEventListener("pointerdown", onDown);
  };
}
