"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
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
    const isLowEnd =
      typeof navigator !== "undefined" &&
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 2;
    const COUNT = isMobile || isLowEnd ? 600 : 2400;

    const W = container.clientWidth || window.innerWidth;
    const H = container.clientHeight || window.innerHeight;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
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
    const cam = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    cam.position.z = 10;

    // ── Particle Field ─────────────────────────────────────────────────────
    const positions = new Float32Array(COUNT * 3);
    const origins = new Float32Array(COUNT * 3);
    const phases = new Float32Array(COUNT);
    const speeds = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);

    const palette = [
      new THREE.Color(0x47ffe0),
      new THREE.Color(0x34d399),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0xa78bfa),
    ];

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 18;
      const z = (Math.random() - 0.5) * 10;
      positions[i * 3] = origins[i * 3] = x;
      positions[i * 3 + 1] = origins[i * 3 + 1] = y;
      positions[i * 3 + 2] = origins[i * 3 + 2] = z;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.06 + Math.random() * 0.18;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(positions, 3);
    geo.setAttribute("position", posAttr);
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const ptsMat = new THREE.PointsMaterial({
      size: isMobile ? 0.05 : 0.07,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });
    scene.add(new THREE.Points(geo, ptsMat));

    // ── Faint Far Layer ────────────────────────────────────────────────────
    const COUNT2 = Math.floor(COUNT * 0.4);
    const pos2 = new Float32Array(COUNT2 * 3);
    const orig2 = new Float32Array(COUNT2 * 3);
    const ph2 = new Float32Array(COUNT2);
    const sp2 = new Float32Array(COUNT2);
    for (let i = 0; i < COUNT2; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 22;
      const z = (Math.random() - 0.5) * 6 - 4;
      pos2[i * 3] = orig2[i * 3] = x;
      pos2[i * 3 + 1] = orig2[i * 3 + 1] = y;
      pos2[i * 3 + 2] = orig2[i * 3 + 2] = z;
      ph2[i] = Math.random() * Math.PI * 2;
      sp2[i] = 0.04 + Math.random() * 0.1;
    }
    const geo2 = new THREE.BufferGeometry();
    const posAttr2 = new THREE.BufferAttribute(pos2, 3);
    geo2.setAttribute("position", posAttr2);
    const ptsMat2 = new THREE.PointsMaterial({
      color: 0x34d399,
      size: isMobile ? 0.08 : 0.12,
      transparent: true,
      opacity: 0.28,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(geo2, ptsMat2));

    // ── Central Distorted Icosahedron (mouse reactive) ─────────────────────
    const icoGeo = new THREE.IcosahedronGeometry(2.2, isMobile ? 2 : 3);
    const icoBasePos = (
      icoGeo.getAttribute("position") as THREE.BufferAttribute
    ).array.slice() as Float32Array;
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x47ffe0,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(0, 0, -1);
    scene.add(ico);

    // Inner solid glow icosahedron
    const icoCoreGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const icoCoreMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const icoCore = new THREE.Mesh(icoCoreGeo, icoCoreMat);
    icoCore.position.set(0, 0, -1);
    scene.add(icoCore);

    // ── Torus Ring (orbiting) ──────────────────────────────────────────────
    const torusGeo = new THREE.TorusGeometry(3.6, 0.015, 8, 200);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(0, 0, -1);
    torus.rotation.x = Math.PI / 2.3;
    scene.add(torus);

    const torusGeo2 = new THREE.TorusGeometry(4.4, 0.01, 8, 200);
    const torus2 = new THREE.Mesh(torusGeo2, torusMat.clone());
    torus2.position.set(0, 0, -1);
    torus2.rotation.x = Math.PI / 1.7;
    torus2.rotation.y = Math.PI / 4;
    scene.add(torus2);

    // ── Constellation Lines (only desktop) ─────────────────────────────────
    const LINE_COUNT = isMobile ? 0 : 60;
    let linesObj: THREE.LineSegments | null = null;
    if (LINE_COUNT > 0) {
      const linePositions = new Float32Array(LINE_COUNT * 6);
      const lineOrigins = new Float32Array(LINE_COUNT * 6);
      for (let i = 0; i < LINE_COUNT; i++) {
        const x1 = (Math.random() - 0.5) * 18;
        const y1 = (Math.random() - 0.5) * 12;
        const z1 = (Math.random() - 0.5) * 6;
        const x2 = x1 + (Math.random() - 0.5) * 3;
        const y2 = y1 + (Math.random() - 0.5) * 3;
        const z2 = z1 + (Math.random() - 0.5) * 3;
        linePositions[i * 6] = lineOrigins[i * 6] = x1;
        linePositions[i * 6 + 1] = lineOrigins[i * 6 + 1] = y1;
        linePositions[i * 6 + 2] = lineOrigins[i * 6 + 2] = z1;
        linePositions[i * 6 + 3] = lineOrigins[i * 6 + 3] = x2;
        linePositions[i * 6 + 4] = lineOrigins[i * 6 + 4] = y2;
        linePositions[i * 6 + 5] = lineOrigins[i * 6 + 5] = z2;
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(linePositions, 3),
      );
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x47ffe0,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
      });
      linesObj = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(linesObj);
    }

    // ── Nebula Orbs ────────────────────────────────────────────────────────
    const orbDefs = [
      { x: 3.5, y: 2.0, z: -3, r: 1.8, col: 0x47ffe0, op: 0.06, sp: 0.11 },
      { x: -4.0, y: -1.5, z: -5, r: 2.3, col: 0x34d399, op: 0.05, sp: 0.08 },
      { x: 5.0, y: -2.5, z: -4, r: 1.1, col: 0x06b6d4, op: 0.08, sp: 0.16 },
      { x: -2.0, y: 3.5, z: -6, r: 1.9, col: 0xa78bfa, op: 0.045, sp: 0.09 },
    ];
    const orbs = orbDefs.map((o) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(o.r, 12, 12),
        new THREE.MeshBasicMaterial({
          color: o.col,
          transparent: true,
          opacity: o.op,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      mesh.position.set(o.x, o.y, o.z);
      scene.add(mesh);
      return { mesh, ox: o.x, oy: o.y, sp: o.sp };
    });

    // ── Shooting Stars ─────────────────────────────────────────────────────
    type Star = {
      mesh: THREE.Mesh;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    };
    const stars: Star[] = [];
    const starGeo = new THREE.SphereGeometry(0.04, 6, 6);
    const spawnStar = () => {
      const m = new THREE.Mesh(
        starGeo,
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 1,
          blending: THREE.AdditiveBlending,
        }),
      );
      const startX = -12 + Math.random() * 4;
      const startY = 4 + Math.random() * 4;
      m.position.set(startX, startY, -2);
      const speed = 0.18 + Math.random() * 0.12;
      const angle = -Math.PI / 6 - Math.random() * 0.3;
      stars.push({
        mesh: m,
        vx: Math.cos(angle) * speed * -1,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 120 + Math.random() * 60,
      });
      scene.add(m);
    };
    let starTimer = 0;

    // ── Mouse / Touch ──────────────────────────────────────────────────────
    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 3.2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2.2;
    };
    if (!isMobile)
      window.addEventListener("mousemove", onMouse, { passive: true });

    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      mx = (e.touches[0].clientX / window.innerWidth - 0.5) * 1.5;
      my = -(e.touches[0].clientY / window.innerHeight - 0.5) * 1.0;
    };
    if (isMobile)
      window.addEventListener("touchmove", onTouch, { passive: true });

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize, { passive: true });

    // ── Animation Loop ─────────────────────────────────────────────────────
    let raf: number;
    let t = 0;
    const icoPosAttr = icoGeo.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const icoArr = icoPosAttr.array as Float32Array;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 0.016;

      cx += (mx - cx) * 0.028;
      cy += (my - cy) * 0.028;
      cam.position.x = cx;
      cam.position.y = cy;
      cam.lookAt(0, 0, 0);

      // Animate primary particles
      for (let i = 0; i < COUNT; i++) {
        const ph = phases[i],
          sp = speeds[i];
        positions[i * 3] = origins[i * 3] + Math.sin(t * sp + ph) * 0.6;
        positions[i * 3 + 1] =
          origins[i * 3 + 1] + Math.cos(t * sp * 0.7 + ph) * 0.6;
        positions[i * 3 + 2] =
          origins[i * 3 + 2] + Math.sin(t * sp * 0.4 + ph * 0.5) * 0.3;
      }
      posAttr.needsUpdate = true;

      // Far layer
      for (let i = 0; i < COUNT2; i++) {
        const ph = ph2[i],
          sp = sp2[i];
        pos2[i * 3] = orig2[i * 3] + Math.sin(t * sp + ph) * 0.8;
        pos2[i * 3 + 1] = orig2[i * 3 + 1] + Math.cos(t * sp * 0.6 + ph) * 0.8;
      }
      posAttr2.needsUpdate = true;

      // Distort icosahedron based on mouse + time
      const mouseLen = Math.hypot(mx, my);
      const distortAmount = 0.08 + mouseLen * 0.05;
      for (let i = 0; i < icoArr.length; i += 3) {
        const ox = icoBasePos[i];
        const oy = icoBasePos[i + 1];
        const oz = icoBasePos[i + 2];
        const n = Math.sin(ox * 2 + t * 1.4) * Math.cos(oy * 2 + t * 1.1);
        const d = 1 + n * distortAmount;
        icoArr[i] = ox * d;
        icoArr[i + 1] = oy * d;
        icoArr[i + 2] = oz * d;
      }
      icoPosAttr.needsUpdate = true;
      icoGeo.computeVertexNormals();

      ico.rotation.x = t * 0.15 + my * 0.3;
      ico.rotation.y = t * 0.2 + mx * 0.3;
      icoCore.rotation.x = -t * 0.1;
      icoCore.rotation.y = t * 0.15;
      icoCore.material.opacity = 0.06 + Math.sin(t * 1.5) * 0.03;

      torus.rotation.z = t * 0.3;
      torus2.rotation.z = -t * 0.22;

      if (linesObj) {
        linesObj.rotation.z = t * 0.04;
        linesObj.rotation.x = Math.sin(t * 0.2) * 0.1;
      }

      for (const o of orbs) {
        o.mesh.position.x = o.ox + Math.sin(t * o.sp) * 0.9;
        o.mesh.position.y = o.oy + Math.cos(t * o.sp * 1.3) * 0.9;
      }

      // Shooting stars
      starTimer += 0.016;
      if (starTimer > 2.2 + Math.random() * 1.5) {
        starTimer = 0;
        if (!isMobile && stars.length < 4) spawnStar();
      }
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.mesh.position.x += s.vx;
        s.mesh.position.y += s.vy;
        s.life++;
        const fade = 1 - s.life / s.maxLife;
        (s.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(
          0,
          fade,
        );
        if (s.life >= s.maxLife) {
          scene.remove(s.mesh);
          (s.mesh.material as THREE.Material).dispose();
          stars.splice(i, 1);
        }
      }

      renderer.render(scene, cam);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", onResize);

      geo.dispose();
      ptsMat.dispose();
      geo2.dispose();
      ptsMat2.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      icoCoreGeo.dispose();
      icoCoreMat.dispose();
      torusGeo.dispose();
      torusGeo2.dispose();
      torusMat.dispose();
      starGeo.dispose();
      if (linesObj) {
        linesObj.geometry.dispose();
        (linesObj.material as THREE.Material).dispose();
      }

      for (const o of orbs) {
        o.mesh.geometry.dispose();
        (o.mesh.material as THREE.Material).dispose();
        scene.remove(o.mesh);
      }
      for (const s of stars) {
        (s.mesh.material as THREE.Material).dispose();
        scene.remove(s.mesh);
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
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    />
  );
}
