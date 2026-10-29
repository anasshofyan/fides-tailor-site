"use client";

import { useEffect, useRef } from "react";
type Three = typeof import("three");

// Soft, slow-moving particle "fabric" that drifts like silk in the hero background.
export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    // three.js is loaded after the page is idle so it stays out of the critical bundle.
    let cancelled = false;
    let teardown: (() => void) | undefined;
    const start = () =>
      import("three").then((THREE) => {
        if (!cancelled) teardown = setup(THREE, mount);
      });
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 2500 })
      : window.setTimeout(start, 1200);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      teardown?.();
    };
  }, []);

  return <div ref={mountRef} aria-hidden className="absolute inset-0 pointer-events-none" />;
}

function setup(THREE: Three, mount: HTMLDivElement) {

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 640 ? 1.5 : 2));
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  mount.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
  camera.position.set(0, 3.2, window.innerWidth < 640 ? 11 : 9);
  camera.lookAt(0, 0, 0);

  const isSmall = window.innerWidth < 640;
  const COLS = isSmall ? 70 : 120;
  const ROWS = isSmall ? 36 : 60;
  const positions = new Float32Array(COLS * ROWS * 3);
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      const k = (i * ROWS + j) * 3;
      positions[k] = (i / (COLS - 1) - 0.5) * 22;
      positions[k + 1] = 0;
      positions[k + 2] = (j / (ROWS - 1) - 0.5) * 10;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#b8913f") },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        p.y = sin(p.x * 0.35 + uTime * 0.5) * 0.55
            + cos(p.z * 0.5 + uTime * 0.35) * 0.35
            + sin((p.x + p.z) * 0.2 + uTime * 0.25) * 0.4;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = 3.2 * (9.0 / -mv.z);
        // smoothstep needs edge0 < edge1, so fade with 1.0 - smoothstep
        vAlpha = (1.0 - smoothstep(6.0, 17.0, -mv.z)) * 0.85;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        gl_FragColor = vec4(uColor, vAlpha * smoothstep(0.5, 0.0, d));
      }
    `,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  let pointerX = 0;
  const onPointer = (e: PointerEvent) => {
    pointerX = (e.clientX / window.innerWidth - 0.5) * 0.6;
  };
  const onResize = () => {
    camera.aspect = mount.clientWidth / mount.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
  };
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("resize", onResize);

  const clock = new THREE.Clock();
  let frame = 0;
  const render = () => {
    material.uniforms.uTime.value = clock.getElapsedTime();
    points.rotation.y += (pointerX - points.rotation.y) * 0.02;
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };
  if (reduceMotion) renderer.render(scene, camera);
  else render();

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("resize", onResize);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    mount.removeChild(renderer.domElement);
  };
}
