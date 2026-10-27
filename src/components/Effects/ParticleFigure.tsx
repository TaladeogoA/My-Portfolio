import { useEffect, useRef } from "react";
import styled from "styled-components";
import * as THREE from "three";

interface ParticleFigureProps {
  /** Image to rebuild out of particles. Transparent pixels are skipped (or near-white ones if it has no transparency). */
  src: string;
  /** Size of the image box the figure should line up with, in CSS px. */
  boxWidth: number;
  boxHeight: number;
  /** Extra room around the figure so scattered particles aren't clipped. */
  bleed?: number;
  /** Draw the particles in greys instead of the image's colours. */
  mono?: boolean;
  /** Start the particles scattered so they visibly gather into the image. */
  gather?: boolean;
  /** Idle motion (shimmer, breath, motes, float). Off keeps every particle on its spot. */
  idle?: boolean;
  /** When true, the particles dissolve away one by one, in random order. */
  resolve?: boolean;
  /** Most particles to draw on phones. */
  maxPointsSmall?: number;
  /** Particle size as a multiple of the gap between them. Above 1 they overlap into a solid image. */
  pointScale?: number;
  onReady?: () => void;
  /** Called once, when the intro has settled. */
  onSettled?: () => void;
  onError?: () => void;
}

const VERTEX = /* glsl */ `
  attribute vec3 aColor;
  attribute vec3 aTrue; // the image's own colour, used by blooms on a mono figure
  attribute float aSize;
  attribute float aSeed;
  uniform float uPixelRatio;
  uniform float uDistance;
  uniform float uPointSize;
  uniform float uTime;
  uniform float uIdle; // 1 = idle motion on, 0 = still
  uniform float uFade; // 0..1, dissolves the particles away
  uniform float uColorize; // 1 on a mono figure: blooms and glints show true colour
  uniform vec4 uBlooms[3]; // x, y, start time, radius
  uniform vec2 uBounds; // bottom and top of the figure, world units
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    float seed = aSeed;
    float size = aSize;
    vec3 color = aColor;
    float alpha = 1.0;

    // Shimmer: every particle drifts on its own small loop.
    p += vec3(
      sin(uTime * 0.7 + seed * 40.0),
      cos(uTime * 0.6 + seed * 70.0),
      sin(uTime * 0.5 + seed * 25.0)
    ) * 0.012 * uIdle;

    // Current: a slow, soft sway that drifts through the figure in broad
    // patches, so neighbours move together instead of all at once.
    float span = uBounds.y - uBounds.x;
    vec2 flow = vec2(
      sin(p.y * 2.3 + uTime * 0.35) + sin(p.y * 4.1 - uTime * 0.23 + 1.7),
      cos(p.x * 2.7 + uTime * 0.29) + cos(p.x * 3.9 + uTime * 0.19 + 0.6)
    );
    p.xy += flow * 0.009 * uIdle;
    p.z += sin(p.x * 3.1 + p.y * 2.2 + uTime * 0.4) * 0.03 * uIdle;

    // Colour blooms: now and then a patch of the black and white figure
    // floods with the photo's real colour, spreading out from a point with a
    // ragged edge, then drains back to grey.
    float bloom = 0.0;
    for (int k = 0; k < 3; k++) {
      vec4 b = uBlooms[k];
      float age = uTime - b.z;
      if (age < 0.0 || age > 5.0) continue;
      float spread = smoothstep(0.0, 1.8, age);
      float drain = 1.0 - smoothstep(2.4, 5.0, age);
      float r = b.w * (0.3 + 0.7 * spread);
      float d = distance(position.xy, b.xy) + (seed - 0.5) * b.w * 0.45;
      bloom = max(bloom, smoothstep(r, r * 0.4, d) * drain);
    }

    // Glints: single particles here and there catch their colour and fade.
    float glint = pow(max(0.0, sin(uTime * 0.6 + seed * 113.0)), 90.0);
    float tint = max(bloom, glint) * uIdle * uColorize;
    color = mix(color, aTrue, tint);

    // Rising motes: a few particles at a time lift off, drift up and fade,
    // then fade back in at their spot.
    if (seed < 0.07 && uIdle > 0.5) {
      float phase = fract(uTime * 0.07 + seed * 37.0);
      float rise = smoothstep(0.0, 0.45, phase);
      p.y += rise * span * 0.45;
      p.x += sin(phase * 9.0 + seed * 90.0) * 0.06 * rise;
      alpha = phase < 0.45 ? 1.0 - rise : smoothstep(0.8, 1.0, phase);
    }

    // Dissolve: each particle fades at its own moment as uFade runs 0 to 1.
    float start = seed * 0.75;
    alpha *= 1.0 - smoothstep(start, start + 0.25, uFade);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uPointSize * size * uPixelRatio * (uDistance / -mv.z);
    vColor = color;
    vAlpha = alpha;
  }
`;

const FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25 || vAlpha < 0.01) discard;
    gl_FragColor = vec4(vColor, vAlpha);
  }
`;

const FOV = 35;
const PX = 100; // CSS px per world unit

/** Reads the image and returns particle home positions and colours, in world units. */
const sampleImage = (
  img: HTMLImageElement,
  boxWidth: number,
  boxHeight: number,
  maxPoints: number,
  mono: boolean
) => {
  // Bigger figures get a finer sample so faces keep their detail.
  const sampleW = Math.round(Math.min(280, Math.max(180, boxWidth / 2.2)));
  const sampleH = Math.round((sampleW * img.naturalHeight) / img.naturalWidth);
  const canvas = document.createElement("canvas");
  canvas.width = sampleW;
  canvas.height = sampleH;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("No 2D context");
  ctx.drawImage(img, 0, 0, sampleW, sampleH);
  const { data } = ctx.getImageData(0, 0, sampleW, sampleH);

  // A cut-out image is read by its transparency alone, so light clothing
  // survives. Only an image without transparency falls back to skipping
  // near-white background pixels.
  let clear = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] < 200) clear++;
  const hasAlpha = clear > data.length / 4 / 20;

  const candidates: number[] = [];
  for (let y = 0; y < sampleH; y++) {
    for (let x = 0; x < sampleW; x++) {
      const i = (y * sampleW + x) * 4;
      const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
      const isBackground = !hasAlpha && r > 236 && g > 232 && b > 224;
      if (a > 110 && !isBackground) candidates.push(x, y);
    }
  }

  const total = candidates.length / 2;
  const keepEvery = Math.max(1, total / maxPoints);
  const count = Math.min(total, maxPoints);
  const home = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const trueColors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const seeds = new Float32Array(count);
  let bottom = Infinity;
  let top = -Infinity;

  // The image is drawn into the box with object-fit: contain, top aligned.
  const scale = Math.min(boxWidth / sampleW, boxHeight / sampleH);
  const drawnW = sampleW * scale;
  const offsetX = -drawnW / 2;
  const offsetY = boxHeight / 2;

  for (let n = 0; n < count; n++) {
    const k = Math.floor(n * keepEvery);
    const x = candidates[k * 2];
    const y = candidates[k * 2 + 1];
    const i = (y * sampleW + x) * 4;
    home[n * 3] = (offsetX + (x + 0.5) * scale) / PX;
    home[n * 3 + 1] = (offsetY - (y + 0.5) * scale) / PX;
    home[n * 3 + 2] = (Math.random() - 0.5) * 0.08;
    trueColors[n * 3] = data[i] / 255;
    trueColors[n * 3 + 1] = data[i + 1] / 255;
    trueColors[n * 3 + 2] = data[i + 2] / 255;
    if (mono) {
      // Greys with a touch more contrast, kept a little warm to sit on the cream.
      const luma = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
      // Lift the midtones first so skin doesn't sink into the hair.
      const lifted = Math.pow(luma, 0.72);
      const v = Math.min(1, Math.max(0.05, (lifted - 0.5) * 1.15 + 0.5));
      colors[n * 3] = v;
      colors[n * 3 + 1] = v * 0.985;
      colors[n * 3 + 2] = v * 0.96;
    } else {
      colors[n * 3] = data[i] / 255;
      colors[n * 3 + 1] = data[i + 1] / 255;
      colors[n * 3 + 2] = data[i + 2] / 255;
    }
    // Every particle is the same size; mixed sizes looked like old film grain.
    sizes[n] = 1;
    seeds[n] = Math.random();
    bottom = Math.min(bottom, home[n * 3 + 1]);
    top = Math.max(top, home[n * 3 + 1]);
  }

  return {
    home,
    colors,
    trueColors,
    sizes,
    seeds,
    count,
    bounds: new THREE.Vector2(bottom, top),
    spacing: scale * Math.sqrt(keepEvery),
  };
};

const ParticleFigure: React.FC<ParticleFigureProps> = ({
  src,
  boxWidth,
  boxHeight,
  bleed = 0.35,
  mono = false,
  gather = false,
  idle = true,
  resolve = false,
  maxPointsSmall = 6000,
  pointScale = 1.35,
  onReady,
  onSettled,
  onError,
}) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const callbacks = useRef({ onReady, onSettled, onError, resolve });
  callbacks.current = { onReady, onSettled, onError, resolve };

  useEffect(() => {
    const host = hostRef.current;
    if (!host || boxWidth <= 0 || boxHeight <= 0) return;

    let disposed = false;
    let frame = 0;
    let cleanup = () => {};

    const img = new Image();
    img.decoding = "async";

    const build = () => {
      if (disposed) return;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
        });
      } catch {
        callbacks.current.onError?.();
        return;
      }
      // iOS Safari can hand back a context that is already lost, for example
      // after a few page changes. Fall back to the photo instead of a blank canvas.
      if (renderer.getContext().isContextLost()) {
        renderer.dispose();
        callbacks.current.onError?.();
        return;
      }

      const isSmall = window.matchMedia("(max-width: 767px)").matches;
      const { home, colors, trueColors, sizes, seeds, count, bounds, spacing } = sampleImage(
        img,
        boxWidth,
        boxHeight,
        isSmall ? maxPointsSmall : 12000,
        mono
      );

      const cssW = boxWidth * (1 + bleed * 2);
      const cssH = boxHeight * (1 + bleed * 2);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(cssW, cssH, false);
      renderer.setClearColor(0x000000, 0);
      const canvas = renderer.domElement;
      canvas.setAttribute("aria-hidden", "true");
      host.appendChild(canvas);

      const distance = cssH / PX / 2 / Math.tan(THREE.MathUtils.degToRad(FOV / 2));
      const camera = new THREE.PerspectiveCamera(FOV, cssW / cssH, 0.1, 100);
      camera.position.z = distance;

      const positions = new Float32Array(count * 3);
      const velocity = new Float32Array(count * 3);
      // How far each particle gives way to the cursor, so the edge looks loose.
      const looseness = new Float32Array(count);
      for (let n = 0; n < count; n++) looseness[n] = 0.45 + Math.random() * 0.9;
      // Start each particle just off its spot, slightly toward the viewer,
      // so the figure settles softly into focus as it replaces the image.
      // With gather on, they start further out and visibly pull together.
      const spread = gather ? (boxWidth / PX) * 0.6 : 0.06;
      for (let n = 0; n < count; n++) {
        const i = n * 3;
        positions[i] = home[i] + (Math.random() - 0.5) * spread;
        positions[i + 1] = home[i + 1] + (Math.random() - 0.5) * spread;
        positions[i + 2] =
          home[i + 2] + (gather ? 0.4 + Math.random() * 0.8 : 0.15 + Math.random() * 0.35);
      }

      const geometry = new THREE.BufferGeometry();
      const positionAttr = new THREE.BufferAttribute(positions, 3);
      positionAttr.setUsage(THREE.DynamicDrawUsage);
      geometry.setAttribute("position", positionAttr);
      geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("aTrue", new THREE.BufferAttribute(trueColors, 3));
      geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        uniforms: {
          uPixelRatio: { value: dpr },
          uDistance: { value: distance },
          uPointSize: { value: Math.max(1.5, spacing * pointScale) },
          uTime: { value: 0 },
          uIdle: { value: idle ? 1 : 0 },
          uFade: { value: 0 },
          uColorize: { value: mono ? 1 : 0 },
          uBlooms: {
            value: [0, 1, 2].map(() => new THREE.Vector4(0, 0, -100, 0)),
          },
          uBounds: { value: bounds },
        },
        transparent: true,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      const group = new THREE.Group();
      group.add(points);
      const scene = new THREE.Scene();
      scene.add(group);

      // Pointer in world units on the z = 0 plane. Far away when idle.
      const pointer = new THREE.Vector2(99, 99);
      let burst = 0;

      const toWorld = (clientX: number, clientY: number) => {
        const rect = canvas.getBoundingClientRect();
        pointer.set(
          ((clientX - rect.left) / rect.width - 0.5) * (cssW / PX),
          -((clientY - rect.top) / rect.height - 0.5) * (cssH / PX) -
            group.position.y
        );
      };

      const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType === "mouse") toWorld(e.clientX, e.clientY);
      };
      // A finger leaves a trail: each point parts the particles, then fades
      // so they drift back in behind it.
      const trail: { x: number; y: number; life: number }[] = [];
      const onTouch = (e: TouchEvent) => {
        const t = e.touches[0];
        if (!t) return;
        toWorld(t.clientX, t.clientY);
        const last = trail[trail.length - 1];
        const step = baseRadius * 0.35;
        if (!last || Math.hypot(pointer.x - last.x, pointer.y - last.y) > step) {
          trail.push({ x: pointer.x, y: pointer.y, life: 1 });
          if (trail.length > 24) trail.shift();
        } else {
          last.life = 1;
        }
        pointer.set(99, 99);
      };
      const onTouchEnd = () => {
        pointer.set(99, 99);
      };
      // A click or tap on the figure itself sends a bigger burst.
      const onDown = (e: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        const inX = e.clientX - rect.left - boxWidth * bleed;
        const inY = e.clientY - rect.top - boxHeight * bleed;
        if (inX < 0 || inY < 0 || inX > boxWidth || inY > boxHeight) return;
        toWorld(e.clientX, e.clientY);
        burst = 1;
      };
      const onLeave = () => {
        pointer.set(99, 99);
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
      window.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("touchstart", onTouch, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
      window.addEventListener("touchend", onTouchEnd);

      let visible = true;
      const observer = new IntersectionObserver(([entry]) => {
        // Always draw the first frame, so the photo is never swapped for an empty canvas.
        visible = entry.isIntersecting || !readySent;
        if (visible && !frame) frame = requestAnimationFrame(tick);
      });
      observer.observe(canvas);

      // Cursor reach scales with the figure so it feels the same on phones.
      const baseRadius = Math.max(0.3, (boxWidth / PX) * 0.17);
      const clock = new THREE.Clock();
      let readySent = false;
      let settledSent = false;
      let nextBloom = 1.5;
      let bloomSlot = 0;

      function tick() {
        frame = 0;
        if (disposed || !visible || document.hidden) return;
        // Scale the physics by elapsed time so it feels the same at 60Hz and 120Hz.
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;
        const step = dt * 60;
        // A still figure eases in more gently, without overshooting.
        const pull = (idle ? 0.07 : 0.035) * step;
        const damping = (idle ? 0.8 : 0.74) ** step;
        const r2 = baseRadius * baseRadius;
        const burstRadius = baseRadius * 2.2;
        const burstR2 = burstRadius * burstRadius;
        const bursting = burst;
        burst = 0;

        for (const p of trail) p.life -= dt * 0.7;
        while (trail.length && trail[0].life <= 0) trail.shift();
        const fade = material.uniforms.uFade;
        if (callbacks.current.resolve) fade.value = Math.min(1, fade.value + dt * 1.5);

        // Start a new colour bloom every few seconds, centred on a random particle.
        if (mono && idle && t > nextBloom) {
          const n = Math.floor(Math.random() * count);
          const slot = material.uniforms.uBlooms.value[bloomSlot] as THREE.Vector4;
          slot.set(home[n * 3], home[n * 3 + 1], t, (bounds.y - bounds.x) * (0.12 + Math.random() * 0.1));
          bloomSlot = (bloomSlot + 1) % 3;
          nextBloom = t + 2.2 + Math.random() * 2.2;
        }

        let motion = 0;
        for (let n = 0; n < count; n++) {
          const i = n * 3;
          const hx = home[i];
          const hy = home[i + 1];
          let tx = hx;
          let ty = hy;
          let tz = home[i + 2];

          // The cursor moves each nearby particle's resting spot outward,
          // which opens a soft hole that closes again when it leaves.
          const dx = hx - pointer.x;
          const dy = hy - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2) {
            const d = Math.sqrt(d2) || 0.0001;
            const falloff = (1 - d / baseRadius) ** 1.5;
            const push = falloff * baseRadius * 0.75 * looseness[n];
            tx += (dx / d) * push;
            ty += (dy / d) * push;
            tz += push * 2.2;
          }

          for (let k = 0; k < trail.length; k++) {
            const p = trail[k];
            const ex = hx - p.x;
            const ey = hy - p.y;
            const e2 = ex * ex + ey * ey;
            if (e2 >= r2) continue;
            const e = Math.sqrt(e2) || 0.0001;
            // Fades out smoothly as the trail point ages.
            const life = p.life * p.life * (3 - 2 * p.life);
            const push = (1 - e / baseRadius) ** 1.5 * baseRadius * 0.6 * looseness[n] * life;
            tx += (ex / e) * push;
            ty += (ey / e) * push;
            tz += push * 1.6;
          }

          let vx = velocity[i];
          let vy = velocity[i + 1];
          let vz = velocity[i + 2];

          // A click or tap throws nearby particles out once; the spring brings them home.
          if (bursting && d2 < burstR2) {
            const d = Math.sqrt(d2) || 0.0001;
            const kick = (1 - d / burstRadius) * 0.32;
            vx += (dx / d) * kick;
            vy += (dy / d) * kick;
            vz += kick * (Math.random() * 2 - 0.5);
          }

          vx = (vx + (tx - positions[i]) * pull) * damping;
          vy = (vy + (ty - positions[i + 1]) * pull) * damping;
          vz = (vz + (tz - positions[i + 2]) * pull) * damping;
          velocity[i] = vx;
          velocity[i + 1] = vy;
          velocity[i + 2] = vz;
          motion +=
            Math.abs(positions[i] - tx) +
            Math.abs(positions[i + 1] - ty) +
            Math.abs(positions[i + 2] - tz);
          positions[i] += vx * step;
          positions[i + 1] += vy * step;
          positions[i + 2] += vz * step;
        }
        positionAttr.needsUpdate = true;

        // A small up-and-down float. No rotation: the user rejected it.
        group.position.y = idle ? Math.sin(t * 1.05) * 0.05 : 0;
        material.uniforms.uTime.value = t;

        renderer.render(scene, camera);
        if (!readySent) {
          readySent = true;
          canvas.style.opacity = "1";
          callbacks.current.onReady?.();
        }
        // A still figure hands over as soon as its particles stop moving;
        // an idle one keeps moving, so it waits a fixed time.
        // (motion is each particle's average distance from its spot, world units.)
        const settled = idle ? t > 2.2 : t > 0.4 && motion / count < 0.006;
        if (!settledSent && settled) {
          settledSent = true;
          callbacks.current.onSettled?.();
        }
        frame = requestAnimationFrame(tick);
      }

      // If the browser drops the context later, stop and show the photo again.
      const onContextLost = () => {
        disposed = true;
        cancelAnimationFrame(frame);
        callbacks.current.onError?.();
      };
      canvas.addEventListener("webglcontextlost", onContextLost);

      const onVisibility = () => {
        if (!document.hidden && !frame) frame = requestAnimationFrame(tick);
      };
      document.addEventListener("visibilitychange", onVisibility);
      frame = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(frame);
        canvas.removeEventListener("webglcontextlost", onContextLost);
        observer.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("mouseleave", onLeave);
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("touchstart", onTouch);
        window.removeEventListener("touchmove", onTouch);
        window.removeEventListener("touchend", onTouchEnd);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        canvas.remove();
      };
    };

    img.onerror = () => callbacks.current.onError?.();
    img.onload = build;
    img.src = src;

    return () => {
      disposed = true;
      img.onload = null;
      img.onerror = null;
      cleanup();
    };
  }, [src, boxWidth, boxHeight, bleed, mono, gather, idle, maxPointsSmall]);

  return (
    <Host
      ref={hostRef}
      style={{
        width: boxWidth * (1 + bleed * 2),
        height: boxHeight * (1 + bleed * 2),
        left: -boxWidth * bleed,
        top: -boxHeight * bleed,
      }}
    />
  );
};

const Host = styled.div`
  position: absolute;
  pointer-events: none;

  canvas {
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
  }
`;

export default ParticleFigure;
