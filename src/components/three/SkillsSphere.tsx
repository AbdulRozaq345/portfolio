"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const ICONS = [
  { src: "/next.svg", invert: true },
  { src: "/react.avif", invert: false },
  { src: "/vercel.svg", invert: true },
  { src: "/laravel.avif", invert: false },
  { src: "/Figma-Emblem.png", invert: false },
];

export default function SkillsSphere() {
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
    const W = container.clientWidth || 420;
    const H = container.clientHeight || 420;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    cam.position.z = 8;

    // ── Wireframe Sphere ──────────────────────────────────────────────────
    const sphereGeo = new THREE.SphereGeometry(2.4, 24, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x47ffe0,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // Inner solid glow
    const innerGeo = new THREE.SphereGeometry(2.0, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    scene.add(inner);

    // ── Particle dust ──────────────────────────────────────────────────────
    const DUST = isMobile ? 200 : 500;
    const dustPos = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      const r = 3.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      dustPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dustPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dustPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x47ffe0,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // ── Logo Sprites positioned on sphere ─────────────────────────────────
    const loader = new THREE.TextureLoader();
    const sprites: { sprite: THREE.Sprite; basePos: THREE.Vector3 }[] = [];

    const total = 14;
    for (let i = 0; i < total; i++) {
      // Fibonacci sphere distribution
      const phi = Math.acos(-1 + (2 * i) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      const r = 2.55;
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      const icon = ICONS[i % ICONS.length];
      const tex = loader.load(icon.src);
      tex.colorSpace = THREE.SRGBColorSpace;
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
      });
      if (icon.invert) mat.color.set(0xffffff);
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(0.6, 0.6, 1);
      sprite.position.set(x, y, z);
      scene.add(sprite);
      sprites.push({ sprite, basePos: new THREE.Vector3(x, y, z) });
    }

    // ── Center pulse ──────────────────────────────────────────────────────
    const pulseGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0x47ffe0,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const pulse = new THREE.Mesh(pulseGeo, pulseMat);
    scene.add(pulse);

    // ── Mouse drag/hover rotation ─────────────────────────────────────────
    let targetRotX = 0,
      targetRotY = 0;
    let curRotX = 0,
      curRotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetRotY = (e.clientX - cx) / window.innerWidth * 1.6;
      targetRotX = -(e.clientY - cy) / window.innerHeight * 1.2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onResize = () => {
      const w = container.clientWidth || 420;
      const h = container.clientHeight || 420;
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

      curRotX += (targetRotX - curRotX) * 0.05;
      curRotY += (targetRotY - curRotY) * 0.05;

      const autoY = t * 0.18;
      sphere.rotation.y = autoY + curRotY;
      sphere.rotation.x = curRotX;
      inner.rotation.y = -autoY * 0.6;
      inner.rotation.x = -curRotX * 0.5;
      dust.rotation.y = autoY * 0.4;

      // Rotate sprites around the same group transform
      const cosY = Math.cos(autoY + curRotY);
      const sinY = Math.sin(autoY + curRotY);
      const cosX = Math.cos(curRotX);
      const sinX = Math.sin(curRotX);
      for (const s of sprites) {
        const { x, y, z } = s.basePos;
        // rotate Y
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        // rotate X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        s.sprite.position.set(x1, y2, z2);
        // depth-fade sprites behind the sphere
        const depth = (z2 + 3) / 6;
        (s.sprite.material as THREE.SpriteMaterial).opacity =
          0.25 + Math.max(0, Math.min(1, depth)) * 0.85;
        const scale = 0.45 + depth * 0.4;
        s.sprite.scale.set(scale, scale, 1);
      }

      pulse.scale.setScalar(1 + Math.sin(t * 2.2) * 0.15);
      pulseMat.opacity = 0.25 + Math.sin(t * 2.2) * 0.12;

      renderer.render(scene, cam);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      sphereGeo.dispose();
      sphereMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      for (const s of sprites) {
        const m = s.sprite.material as THREE.SpriteMaterial;
        m.map?.dispose();
        m.dispose();
        scene.remove(s.sprite);
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
        position: "relative",
        width: "100%",
        height: "100%",
        minWidth: 320,
        minHeight: 320,
      }}
    />
  );
}
