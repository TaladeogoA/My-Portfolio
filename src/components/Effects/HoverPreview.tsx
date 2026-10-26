import { useEffect, useRef } from "react";
import styled from "styled-components";
import * as THREE from "three";

export interface PreviewItem {
  id: string;
  url: string;
}

interface HoverPreviewProps {
  items: PreviewItem[];
  /** The item under the cursor, or null to hide the preview. */
  activeId: string | null;
}

const VERTEX = /* glsl */ `
  uniform vec2 uVelocity;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 p = position;
    // Bend the card against the direction it's moving, like it's being dragged.
    p.x -= uVelocity.x * sin(uv.y * 3.14159) * 0.35;
    p.y -= uVelocity.y * sin(uv.x * 3.14159) * 0.35;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform sampler2D uCurrent;
  uniform sampler2D uPrevious;
  uniform float uMix;
  uniform float uAlpha;
  uniform vec2 uVelocity;
  uniform vec2 uSize;
  uniform float uColor; // 0..1, how far colour has spread from the centre
  varying vec2 vUv;

  vec3 sampleSplit(sampler2D tex, vec2 uv, vec2 shift) {
    return vec3(
      texture2D(tex, uv + shift).r,
      texture2D(tex, uv).g,
      texture2D(tex, uv - shift).b
    );
  }

  void main() {
    vec2 shift = uVelocity * 0.05;
    vec3 color = mix(
      sampleSplit(uPrevious, vUv, shift),
      sampleSplit(uCurrent, vUv, shift),
      uMix
    );

    // Each preview arrives in warm greys, then colour spreads out from the
    // centre with a soft, uneven edge, like the blooms on the Home figure.
    float grey = dot(color, vec3(0.299, 0.587, 0.114));
    vec2 p = (vUv - 0.5) * vec2(uSize.x / uSize.y, 1.0);
    float wobble = sin(atan(p.y, p.x) * 5.0 + uColor * 4.0) * 0.04;
    float reach = uColor * 1.2;
    float colorAmount = 1.0 - smoothstep(reach - 0.22, reach, length(p) + wobble);
    color = mix(vec3(grey) * vec3(1.0, 0.985, 0.96), color, colorAmount);

    // Rounded corners, 8px in CSS pixels.
    float radius = 8.0;
    vec2 q = abs(vUv * uSize - uSize * 0.5) - (uSize * 0.5 - radius);
    float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - radius;
    float edge = 1.0 - smoothstep(-1.0, 0.0, d);

    gl_FragColor = vec4(color, uAlpha * edge);
  }
`;

const WIDTH = 320;

const HoverPreview: React.FC<HoverPreviewProps> = ({ items, activeId }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(activeId);
  const apiRef = useRef<{ activate: (id: string | null) => void } | null>(null);

  useEffect(() => {
    activeRef.current = activeId;
    apiRef.current?.activate(activeId);
  }, [activeId]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.left = 0;
      camera.right = w;
      camera.top = 0;
      camera.bottom = -h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const blank = new THREE.DataTexture(new Uint8Array([248, 247, 244, 255]), 1, 1);
    blank.needsUpdate = true;

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    const textures = new Map<string, THREE.Texture>();
    items.forEach(({ id, url }) => {
      loader.load(url, (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        textures.set(id, texture);
        // If this one is already hovered, swap it in now it has loaded.
        if (activeRef.current === id) activate(id);
      });
    });

    const uniforms = {
      uCurrent: { value: blank as THREE.Texture },
      uPrevious: { value: blank as THREE.Texture },
      uMix: { value: 1 },
      uAlpha: { value: 0 },
      uVelocity: { value: new THREE.Vector2() },
      uSize: { value: new THREE.Vector2(WIDTH, WIDTH * 0.62) },
      uColor: { value: 0 },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms,
      transparent: true,
      depthTest: false,
    });
    const geometry = new THREE.PlaneGeometry(1, 1, 24, 24);
    const mesh = new THREE.Mesh(geometry, material);
    const scene = new THREE.Scene();
    scene.add(mesh);

    const target = new THREE.Vector2(-999, -999);
    const pos = new THREE.Vector2(-999, -999);
    const velocity = new THREE.Vector2();
    let height = WIDTH * 0.62;
    let targetHeight = height;
    let shown = 0;
    let wantShown = 0;
    let currentId: string | null = null;
    let frame = 0;
    let hasPointer = false;
    const clock = new THREE.Clock();

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.set(e.clientX, e.clientY);
      if (!hasPointer) {
        pos.copy(target);
        hasPointer = true;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    function activate(id: string | null) {
      const texture = id ? textures.get(id) : undefined;
      if (!id || !texture) {
        wantShown = id ? wantShown : 0;
        start();
        return;
      }
      if (id !== currentId) {
        uniforms.uPrevious.value = shown > 0.05 ? uniforms.uCurrent.value : texture;
        uniforms.uCurrent.value = texture;
        uniforms.uMix.value = shown > 0.05 ? 0 : 1;
        uniforms.uColor.value = 0;
        currentId = id;
        const image = texture.image as { width: number; height: number };
        targetHeight = WIDTH * (image.height / image.width);
        if (shown < 0.05) height = targetHeight;
      }
      wantShown = 1;
      start();
    }
    apiRef.current = { activate };

    function start() {
      if (!frame) {
        clock.getDelta();
        frame = requestAnimationFrame(tick);
      }
    }

    function tick() {
      frame = 0;
      const step = Math.min(clock.getDelta(), 0.05) * 60;
      const ease = (k: number) => 1 - (1 - k) ** step;

      const prevX = pos.x;
      const prevY = pos.y;
      pos.x += (target.x - pos.x) * ease(0.14);
      pos.y += (target.y - pos.y) * ease(0.14);
      velocity.x += ((pos.x - prevX) / WIDTH / Math.max(step, 0.001) - velocity.x) * ease(0.2);
      velocity.y += ((pos.y - prevY) / WIDTH / Math.max(step, 0.001) - velocity.y) * ease(0.2);
      velocity.clampScalar(-0.6, 0.6);

      shown += (wantShown - shown) * ease(0.12);
      uniforms.uMix.value += (1 - uniforms.uMix.value) * ease(0.12);
      // Colour spreads out over about a second and a half while the row is hovered.
      if (wantShown > 0) {
        uniforms.uColor.value = Math.min(1.3, uniforms.uColor.value + (step / 60) * 0.9);
      }
      height += (targetHeight - height) * ease(0.15);

      const scale = 0.75 + shown * 0.25;
      mesh.scale.set(WIDTH * scale, height * scale, 1);
      mesh.position.set(pos.x, -pos.y, 0);
      uniforms.uAlpha.value = shown;
      uniforms.uVelocity.value.copy(velocity);
      uniforms.uSize.value.set(WIDTH * scale, height * scale);

      renderer.render(scene, camera);

      const moving = Math.abs(velocity.x) + Math.abs(velocity.y) > 0.0005;
      const fading = Math.abs(wantShown - shown) > 0.002;
      const coloring = wantShown > 0 && uniforms.uColor.value < 1.3;
      if (wantShown > 0 || fading || moving || coloring) {
        frame = requestAnimationFrame(tick);
      } else {
        shown = 0;
        currentId = null;
        renderer.clear();
      }
    }

    return () => {
      apiRef.current = null;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      textures.forEach((t) => t.dispose());
      blank.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    };
  }, [items]);

  return <Host ref={hostRef} />;
};

const Host = styled.div`
  position: fixed;
  inset: 0;
  z-index: 5;
  pointer-events: none;

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export default HoverPreview;
