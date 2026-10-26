import { useEffect, useRef } from "react";
import styled from "styled-components";
import * as THREE from "three";

interface DitherPortraitProps {
  src: string;
  onReady?: () => void;
  onError?: () => void;
}

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uRadius;
  uniform float uProgress;
  uniform float uCell;
  uniform vec3 uInk;
  uniform vec3 uPaper;
  varying vec2 vUv;

  // Ordered dither threshold, built up from a 2x2 Bayer pattern.
  float bayer2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
  float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
  float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

  void main() {
    vec2 cell = floor(gl_FragCoord.xy / uCell);
    // Sample the photo at the centre of each dither cell so it reads as pixels.
    vec2 cellUv = (cell + 0.5) * uCell / uResolution;
    vec3 photo = texture2D(uTexture, vUv).rgb;
    vec3 cellColor = texture2D(uTexture, cellUv).rgb;

    float luma = dot(cellColor, vec3(0.299, 0.587, 0.114));
    // Lift the midtones so faces keep their detail, then add a little contrast.
    luma = pow(luma, 0.7);
    luma = clamp((luma - 0.5) * 1.3 + 0.55, 0.0, 1.0);
    // On load the portrait develops out of the paper.
    luma = mix(1.0, luma, uProgress);
    float ink = step(luma, bayer8(cell) * 0.98 + 0.01);
    vec3 dithered = mix(uPaper, uInk, ink);

    // Around the pointer, the real photo shows through.
    float aspect = uResolution.x / uResolution.y;
    vec2 delta = (vUv - uPointer) * vec2(aspect, 1.0);
    float reveal = 1.0 - smoothstep(uRadius * 0.55, uRadius, length(delta));

    gl_FragColor = vec4(mix(dithered, photo, reveal), 1.0);
  }
`;

const HOVER_RADIUS = 0.42;

const DitherPortrait: React.FC<DitherPortraitProps> = ({ src, onReady, onError }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const callbacks = useRef({ onReady, onError });
  callbacks.current = { onReady, onError };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup = () => {};

    const loader = new THREE.TextureLoader();
    loader.load(
      src,
      (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }

        let renderer: THREE.WebGLRenderer;
        try {
          renderer = new THREE.WebGLRenderer({ antialias: false });
        } catch {
          texture.dispose();
          callbacks.current.onError?.();
          return;
        }

        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        renderer.setPixelRatio(dpr);
        const canvas = renderer.domElement;
        canvas.setAttribute("aria-hidden", "true");
        host.appendChild(canvas);

        const uniforms = {
          uTexture: { value: texture },
          uResolution: { value: new THREE.Vector2(1, 1) },
          uPointer: { value: new THREE.Vector2(0.5, 0.5) },
          uRadius: { value: 0 },
          uProgress: { value: 0 },
          uCell: { value: 2 * dpr },
          // Raw sRGB values: this shader writes colours straight to the screen.
          uInk: { value: new THREE.Vector3(0x11 / 255, 0x11 / 255, 0x10 / 255) },
          uPaper: { value: new THREE.Vector3(0xf8 / 255, 0xf7 / 255, 0xf4 / 255) },
        };

        const material = new THREE.ShaderMaterial({
          vertexShader: VERTEX,
          fragmentShader: FRAGMENT,
          uniforms,
        });
        const geometry = new THREE.PlaneGeometry(2, 2);
        const scene = new THREE.Scene();
        scene.add(new THREE.Mesh(geometry, material));
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const resize = () => {
          const { width, height } = host.getBoundingClientRect();
          if (!width || !height) return;
          renderer.setSize(width, height, false);
          uniforms.uResolution.value.set(width * dpr, height * dpr);
          start();
        };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);

        const pointerTarget = new THREE.Vector2(0.5, 0.5);
        let radiusTarget = 0;
        let frame = 0;
        let readySent = false;
        const clock = new THREE.Clock();

        const setPointer = (clientX: number, clientY: number) => {
          const rect = host.getBoundingClientRect();
          pointerTarget.set(
            (clientX - rect.left) / rect.width,
            1 - (clientY - rect.top) / rect.height
          );
        };
        const onEnter = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          setPointer(e.clientX, e.clientY);
          uniforms.uPointer.value.copy(pointerTarget);
          radiusTarget = HOVER_RADIUS;
          start();
        };
        const onMove = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          setPointer(e.clientX, e.clientY);
          start();
        };
        const onLeave = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          radiusTarget = 0;
          start();
        };
        host.addEventListener("pointerenter", onEnter);
        host.addEventListener("pointermove", onMove);
        host.addEventListener("pointerleave", onLeave);

        function start() {
          if (!frame && !disposed) {
            clock.getDelta();
            frame = requestAnimationFrame(tick);
          }
        }

        function tick() {
          frame = 0;
          const step = Math.min(clock.getDelta(), 0.05) * 60;
          const ease = (k: number) => 1 - (1 - k) ** step;

          uniforms.uProgress.value = Math.min(1, uniforms.uProgress.value + 0.012 * step);
          uniforms.uRadius.value += (radiusTarget - uniforms.uRadius.value) * ease(0.12);
          uniforms.uPointer.value.lerp(pointerTarget, ease(0.2));
          renderer.render(scene, camera);

          if (!readySent) {
            readySent = true;
            callbacks.current.onReady?.();
          }

          const settling =
            uniforms.uProgress.value < 1 ||
            Math.abs(radiusTarget - uniforms.uRadius.value) > 0.001 ||
            uniforms.uPointer.value.distanceToSquared(pointerTarget) > 1e-6;
          if (settling) frame = requestAnimationFrame(tick);
        }

        resize();

        cleanup = () => {
          cancelAnimationFrame(frame);
          resizeObserver.disconnect();
          host.removeEventListener("pointerenter", onEnter);
          host.removeEventListener("pointermove", onMove);
          host.removeEventListener("pointerleave", onLeave);
          texture.dispose();
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.forceContextLoss();
          canvas.remove();
        };
      },
      undefined,
      () => callbacks.current.onError?.()
    );

    return () => {
      disposed = true;
      cleanup();
    };
  }, [src]);

  return <Host ref={hostRef} />;
};

const Host = styled.div`
  position: absolute;
  inset: 0;
  cursor: crosshair;

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export default DitherPortrait;
