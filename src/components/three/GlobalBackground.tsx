"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Fixed full-screen Three.js background that lives behind every section.
 * Subtle far-particle field + animated grid plane + scroll-reactive nebula.
 * Pointer-events:none — never blocks clicks.
 */
export default function GlobalBackground() {
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

    const isMobile = window.innerWidth < 768;
    const W = window.innerWidth;
    const H = window.innerHeight;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(70, W / H, 0.1, 200);
    cam.position.z = 14;

    // ── Far star field (slow drift) ───────────────────────────────────────
    const FAR = isMobile ? 600 : 1500;
    const farPos = new Float32Array(FAR * 3);
    for (let i = 0; i < FAR; i++) {
      farPos[i * 3] = (Math.random() - 0.5) * 60;
      farPos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      farPos[i * 3 + 2] = -10 - Math.random() * 50;
    }
    const farGeo = new THREE.BufferGeometry();
    farGeo.setAttribute("position", new THREE.BufferAttribute(farPos, 3));
    const farMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const farPoints = new THREE.Points(farGeo, farMat);
    scene.add(farPoints);

    // ── Animated grid plane (deep below) ──────────────────────────────────
    const GRID_SIZE = isMobile ? 30 : 50;
    const GRID_SEG = isMobile ? 24 : 40;
    const gridGeo = new THREE.PlaneGeometry(
      GRID_SIZE,
      GRID_SIZE,
      GRID_SEG,
      GRID_SEG,
    );
    const gridPosAttr = gridGeo.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const gridBase = (gridPosAttr.array as Float32Array).slice() as Float32Array;
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x47ffe0,
      wireframe: true,
      transparent: true,
      opacity: 0.07,
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 2.3;
    grid.position.y = -8;
    grid.position.z = -10;
    scene.add(grid);

    // ── Cyan / purple nebula orbs ─────────────────────────────────────────
    const orbDefs = [
      { x: -8, y: 4, z: -15, r: 6, col: 0x06b6d4, op: 0.05 },
      { x: 9, y: -3, z: -18, r: 7, col: 0xa78bfa, op: 0.04 },
      { x: 0, y: -6, z: -12, r: 4, col: 0x34d399, op: 0.05 },
    ];
    const orbs = orbDefs.map((o) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(o.r, 12, 12),
        new THREE.MeshBasicMaterial({
          color: o.col,
          transparent: true,
          opacity: o.op,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      m.position.set(o.x, o.y, o.z);
      scene.add(m);
      return { mesh: m, ox: o.x, oy: o.y };
    });

    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize, { passive: true });

    let raf: number;
    let t = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 0.016;

      const sNorm = Math.min(scrollY / 4000, 1);

      // Drift far stars
      farPoints.rotation.y = t * 0.01 + sNorm * 0.4;
      farPoints.rotation.x = -sNorm * 0.2;

      // Animate grid waves
      for (let i = 0; i < gridBase.length; i += 3) {
        const ox = gridBase[i];
        const oy = gridBase[i + 1];
        const z =
          Math.sin(ox * 0.3 + t * 1.2) * 0.4 +
          Math.cos(oy * 0.3 + t * 1.0) * 0.4;
        (gridPosAttr.array as Float32Array)[i + 2] = z;
      }
      gridPosAttr.needsUpdate = true;
      grid.rotation.z = t * 0.02;

      // Nebula slow movement
      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];
        o.mesh.position.x = o.ox + Math.sin(t * 0.1 + i) * 1.2;
        o.mesh.position.y = o.oy + Math.cos(t * 0.08 + i) * 1.0 - sNorm * 6;
      }

      // Camera scroll parallax
      cam.position.y = -sNorm * 4;
      cam.rotation.x = -sNorm * 0.18;

      renderer.render(scene, cam);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      farGeo.dispose();
      farMat.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      for (const o of orbs) {
        o.mesh.geometry.dispose();
        (o.mesh.material as THREE.Material).dispose();
        scene.remove(o.mesh);
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={divRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden
    />
  );
}
