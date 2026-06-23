import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function LaptopCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);

    // Renderer with Alpha (transparent background)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ambient Grid (Holographic base)
    const gridHelper = new THREE.GridHelper(10, 20, 0x00f5ff, 0x14f195);
    gridHelper.position.y = -1.2;
    // Fade grid edge by using raw materials
    if (gridHelper.material instanceof THREE.Material) {
      gridHelper.material.opacity = 0.25;
      gridHelper.material.transparent = true;
    }
    scene.add(gridHelper);

    // Laptop Group (to rotate as a whole)
    const laptopGroup = new THREE.Group();
    laptopGroup.position.y = -0.2;
    scene.add(laptopGroup);

    // 1. Laptop Base (Futuristic panel)
    const baseGeo = new THREE.BoxGeometry(2.4, 0.08, 1.6);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const solidBaseMat = new THREE.MeshBasicMaterial({
      color: 0x070b1e,
      transparent: true,
      opacity: 0.85,
    });
    const baseWire = new THREE.Mesh(baseGeo, wireframeMat);
    const baseSolid = new THREE.Mesh(baseGeo, solidBaseMat);
    laptopGroup.add(baseSolid);
    laptopGroup.add(baseWire);

    // Laptop trackpad glowing frame
    const trackGeo = new THREE.PlaneGeometry(0.5, 0.3);
    const trackWire = new THREE.Mesh(trackGeo, new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    }));
    trackWire.rotation.x = -Math.PI / 2;
    trackWire.position.set(0, 0.045, 0.5);
    laptopGroup.add(trackWire);

    // 2. Laptop Lid/Screen (at an angle)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.04, -0.78); // Joint at back
    laptopGroup.add(lidGroup);

    // Screen frame
    const lidGeo = new THREE.BoxGeometry(2.3, 1.4, 0.05);
    const lidSolidMat = new THREE.MeshBasicMaterial({
      color: 0x050816,
      transparent: true,
      opacity: 0.7,
    });
    const lidWireMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const lidSolid = new THREE.Mesh(lidGeo, lidSolidMat);
    const lidWire = new THREE.Mesh(lidGeo, lidWireMat);
    lidSolid.position.y = 0.7; // Offset to joint on bottom edge
    lidWire.position.y = 0.7;
    lidGroup.add(lidSolid);
    lidGroup.add(lidWire);

    // Holographic screen glow
    const screenGeo = new THREE.PlaneGeometry(2.1, 1.2);
    const screenMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 0.7, 0.03);
    lidGroup.add(screen);

    // Screen glowing edge
    const screenEdgeGeo = new THREE.EdgesGeometry(screenGeo);
    const screenEdgeLine = new THREE.LineSegments(
      screenEdgeGeo,
      new THREE.LineBasicMaterial({ color: 0x14f195, linewidth: 2 })
    );
    screenEdgeLine.position.set(0, 0.7, 0.035);
    lidGroup.add(screenEdgeLine);

    // Lid angle (open laptop at ~110 degrees)
    lidGroup.rotation.x = 0.45;

    // 3. Floating Spark Particles (Holographic projection)
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Form a cone/cylinder projection from screen upwards
      positions[i * 3] = (Math.random() - 0.5) * 2.2;
      positions[i * 3 + 1] = Math.random() * 2 - 0.4; // height
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5 - 0.2;
      speeds[i] = 0.005 + Math.random() * 0.015;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x14f195,
      size: 0.04,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    laptopGroup.add(particleSystem);

    // Auxiliary holographic elements - Floating orbit ring
    const ringGeo = new THREE.RingGeometry(1.6, 1.63, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.3;
    laptopGroup.add(ring);

    // Lighting (subtle)
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x00f5ff, 2, 8);
    pointLight.position.set(0, 1.5, 1);
    scene.add(pointLight);

    // Mouse control tracker
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (event: MouseEvent) => {
      // Normalized mouse coords (-1 to 1)
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;
    };

    container.addEventListener("mousemove", onMouseMove);

    // Animation variables
    let angle = 0;
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      angle += 0.003;

      // Rotate whole laptop on a gentle orbit
      laptopGroup.position.y = -0.2 + Math.sin(angle * 2) * 0.08;
      
      // Interpolate laptop group rotations toward mouse
      targetRotationY = mouseX * 0.4;
      targetRotationX = -mouseY * 0.25;

      // Base rotation + mouse tilt
      laptopGroup.rotation.y += (targetRotationY + angle * 0.25 - laptopGroup.rotation.y) * 0.05;
      laptopGroup.rotation.x += (targetRotationX - laptopGroup.rotation.x) * 0.05;

      // Gently pulse screen transparency
      if (screen.material instanceof THREE.Material) {
        screen.material.opacity = 0.12 + Math.sin(angle * 4) * 0.05;
      }

      // Rotate decorative orbit ring opposite direction
      ring.rotation.z -= 0.004;

      // Move particle clouds upwards
      const positionsArr = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positionsArr[i * 3 + 1] += speeds[i]; // Move Y up
        // Spark jitter
        positionsArr[i * 3] += Math.sin(angle + i) * 0.002;
        
        // Reset if too high
        if (positionsArr[i * 3 + 1] > 2.0) {
          positionsArr[i * 3 + 1] = -0.4;
          positionsArr[i * 3] = (Math.random() - 0.5) * 1.8;
          positionsArr[i * 3 + 2] = (Math.random() - 0.5) * 1.2 - 0.2;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", onMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      // dispose geometries/materials
      baseGeo.dispose();
      wireframeMat.dispose();
      solidBaseMat.dispose();
      trackGeo.dispose();
      lidGeo.dispose();
      lidSolidMat.dispose();
      lidWireMat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      screenEdgeGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="3d-laptop"
      className="w-full h-[320px] md:h-[450px] relative cursor-grab active:cursor-grabbing select-none"
    />
  );
}
