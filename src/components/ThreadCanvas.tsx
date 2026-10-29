"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Golden "threads" drifting like silk strands behind the CTA.
export default function ThreadCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 640;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, isSmall ? 16 : 12);

    const THREADS = isSmall ? 9 : 14;
    const SEGMENTS = isSmall ? 140 : 220;
    const WIDTH = 30;
    const palette = ["#d6bf7b", "#c9a451", "#a7833e", "#e7daaf"];

    const threads = Array.from({ length: THREADS }, (_, t) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(SEGMENTS * 3), 3));
      const material = new THREE.LineBasicMaterial({
        color: palette[t % palette.length],
        transparent: true,
        opacity: 0.18 + (t % 4) * 0.1,
      });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      return { geometry, material, offset: t * 0.45, amp: 0.8 + (t % 5) * 0.25 };
    });

    const update = (time: number) => {
      for (const { geometry, offset, amp } of threads) {
        const pos = geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < SEGMENTS; i++) {
          const u = i / (SEGMENTS - 1);
          const x = (u - 0.5) * WIDTH;
          const y =
            Math.sin(x * 0.22 + time * 0.4 + offset) * amp +
            Math.sin(x * 0.07 - time * 0.25 + offset * 2) * 1.2 +
            (offset - THREADS * 0.22) * 0.18;
          const z = Math.cos(x * 0.18 + time * 0.3 + offset) * 1.5;
          pos.setXYZ(i, x, y, z);
        }
        pos.needsUpdate = true;
      }
    };

    let pointerY = 0;
    const onPointer = (e: PointerEvent) => {
      pointerY = (e.clientY / window.innerHeight - 0.5) * 0.3;
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
    let running = false;
    const render = () => {
      update(clock.getElapsedTime());
      scene.rotation.x += (pointerY - scene.rotation.x) * 0.03;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };

    // Only animate while the CTA is on screen
    const observer = new IntersectionObserver(([entry]) => {
      if (reduceMotion) return;
      if (entry.isIntersecting && !running) {
        running = true;
        render();
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    observer.observe(mount);

    update(0);
    renderer.render(scene, camera);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      threads.forEach(({ geometry, material }) => {
        geometry.dispose();
        material.dispose();
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden className="absolute inset-0 pointer-events-none" />;
}
