"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function LoadingScene() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = divRef.current;
    if (!container || typeof window === "undefined") return;

    try {
      const probe = document.createElement("canvas");
      const hasGL =
        !!probe.getContext("webgl") ||
        !!probe.getContext("experimental-webgl");
      if (!hasGL) return;
    } catch {
      return;
    }

    const W = window.innerWidth;
    const H = window.innerHeight;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    cam.position.z = 7;

    // Tunnel-like ring stack
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < 14; i++) {
      const g = new THREE.TorusGeometry(2 + i * 0.05, 0.012, 8, 64);
      const m = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x47ffe0 : 0x06b6d4,
        transparent: true,
        opacity: 0.4 - i * 0.02,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(g, m);
      ring.position.z = -i * 0.6;
      ring.rotation.x = (Math.random() - 0.5) * 0.3;
      ring.rotation.y = (Math.random() - 0.5) * 0.3;
      rings.push(ring);
      scene.add(ring);
    }

    // Particles
    const COUNT = 600;
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x47ffe0,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      cam.aspect = window.innerWidth / window.innerHeight;
      cam.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize, { passive: true });

    let raf: number;
    let t = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 0.016;
      for (let i = 0; i < rings.length; i++) {
        rings[i].rotation.z = t * (0.6 + i * 0.08);
        rings[i].rotation.y = t * 0.3 + i * 0.1;
      }
      points.rotation.y = t * 0.05;
      points.rotation.x = Math.sin(t * 0.2) * 0.1;
      renderer.render(scene, cam);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      for (const r of rings) {
        r.geometry.dispose();
        (r.material as THREE.Material).dispose();
        scene.remove(r);
      }
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement))
        container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={divRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
