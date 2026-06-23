import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { SKILLS } from "../data";
import { Skill } from "../types";
import { Activity, ShieldAlert } from "lucide-react";

export default function SkillsUniverse() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILLS[0]);
  const [hoveredSkillName, setHoveredSkillName] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Skills Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Create a beautiful subtle wireframe globe mesh on the background
    const coreGlobeGeo = new THREE.SphereGeometry(2.2, 24, 24);
    const coreGlobeMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const coreGlobe = new THREE.Mesh(coreGlobeGeo, coreGlobeMat);
    globeGroup.add(coreGlobe);

    // Subtle constellation lines
    const orbitRing1Geo = new THREE.RingGeometry(2.35, 2.37, 64);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide
    });
    const ring1 = new THREE.Mesh(orbitRing1Geo, orbitRingMat);
    ring1.rotation.x = Math.PI / 2;
    globeGroup.add(ring1);

    const ring2 = new THREE.Mesh(orbitRing1Geo, orbitRingMat);
    ring2.rotation.y = Math.PI / 4;
    globeGroup.add(ring2);

    // Distribute skills as floating glowing spheres using Fibonacci distribution
    const numPoints = SKILLS.length;
    const sphereRadius = 2.4;
    const sphereNodes: { mesh: THREE.Mesh; skill: Skill; initialPos: THREE.Vector3 }[] = [];

    SKILLS.forEach((skill, index) => {
      // Golden Spiral distribution
      const phi = Math.acos(1 - (2 * (index + 0.5)) / numPoints);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5);

      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);

      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(x, y, z);

      // Core sphere (representing physical/glass node)
      const nodeGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(skill.glow),
        transparent: true,
        opacity: 0.65,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeGroup.add(nodeMesh);

      // Outer glow shell (wireframe)
      const glowGeo = new THREE.SphereGeometry(0.28, 8, 8);
      const glowMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(skill.glow),
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      nodeGroup.add(glowMesh);

      // Store references
      // We'll add nodeGroup as a child of the globeGroup
      globeGroup.add(nodeGroup);

      // To hit-test this group properly, we can treat the core sphere as our raycast target
      // but attach the custom skill details onto it
      (nodeMesh as any).userData = { skill, group: nodeGroup, glowMesh };
      sphereNodes.push({ mesh: nodeMesh, skill, initialPos: new THREE.Vector3(x, y, z) });
    });

    // Particle field inside the sphere
    const internalParticleCount = 60;
    const intGeo = new THREE.BufferGeometry();
    const intPositions = new Float32Array(internalParticleCount * 3);
    for (let i = 0; i < internalParticleCount * 3; i++) {
      intPositions[i * 3] = (Math.random() - 0.5) * 4.0;
      intPositions[i * 3 + 1] = (Math.random() - 0.5) * 4.0;
      intPositions[i * 3 + 2] = (Math.random() - 0.5) * 4.0;
    }
    intGeo.setAttribute("position", new THREE.BufferAttribute(intPositions, 3));
    const intMat = new THREE.PointsMaterial({
      color: 0x14f195,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
    });
    const internalParticles = new THREE.Points(intGeo, intMat);
    globeGroup.add(internalParticles);

    // Raycaster for Hover & Click Interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Interaction vars
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let velocity = { x: 0.002, y: 0.003 }; // inertial speed

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      const rect = container.getBoundingClientRect();
      previousMousePosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (isDragging) {
        const deltaX = clientX - previousMousePosition.x;
        const deltaY = clientY - previousMousePosition.y;

        globeGroup.rotation.y += deltaX * 0.007;
        globeGroup.rotation.x += deltaY * 0.007;

        velocity = { x: deltaX * 0.001, y: deltaY * 0.001 };
        previousMousePosition = { x: clientX, y: clientY };
      }

      // Raycast calculations
      mouse.x = (clientX / rect.width) * 2 - 1;
      mouse.y = -(clientY / rect.height) * 2 + 1;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Track click to select skill
    const onClick = (e: MouseEvent) => {
      if (isDragging) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.x = (clientX / rect.width) * 2 - 1;
      mouse.y = -(clientY / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      // Raycast against all physical node spheres (the nodeMesh elements child objects)
      const meshesToTest = sphereNodes.map(n => n.mesh);
      const intersects = raycaster.intersectObjects(scene.children, true);
      
      const skillIntersect = intersects.find(i => i.object.userData && i.object.userData.skill);

      if (skillIntersect) {
        const skill = skillIntersect.object.userData.skill;
        setSelectedSkill(skill);
      }
    };

    // Listeners
    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("click", onClick);

    // Touch support for mobiles
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      isDragging = true;
      const rect = container.getBoundingClientRect();
      previousMousePosition = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.touches[0].clientX - rect.left;
      const clientY = e.touches[0].clientY - rect.top;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.007;
      globeGroup.rotation.x += deltaY * 0.007;

      velocity = { x: deltaX * 0.0015, y: deltaY * 0.0015 };
      previousMousePosition = { x: clientX, y: clientY };
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onMouseUp);

    let reqId: number;
    let angle = 0;

    // Pulse animation loop
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      angle += 0.01;

      // Inertial damping rotation when not dragging
      if (!isDragging) {
        globeGroup.rotation.y += velocity.x;
        globeGroup.rotation.x += velocity.y;
        velocity.x *= 0.95;
        velocity.y *= 0.95;

        // Base continuous slow rotate
        globeGroup.rotation.y += 0.002;
        globeGroup.rotation.z += 0.0005;
      }

      // Apply dynamic breathing and float animations on skill nodes
      sphereNodes.forEach((node, idx) => {
        const breathingOffset = Math.sin(angle + idx) * 0.02;
        
        // Slightly float positions
        node.mesh.parent?.position.set(
          node.initialPos.x * (1 + breathingOffset),
          node.initialPos.y * (1 + breathingOffset),
          node.initialPos.z * (1 + breathingOffset)
        );

        // Slow hover rotation of raw shell
        const glowMesh = node.mesh.userData.glowMesh as THREE.Mesh;
        if (glowMesh) {
          glowMesh.rotation.y += 0.02;
          glowMesh.rotation.x += 0.01;
        }
      });

      // Raycast check for hover state
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      const hovered = intersects.find(i => i.object.userData && i.object.userData.skill);

      if (hovered) {
        const skill = hovered.object.userData.skill as Skill;
        setHoveredSkillName(skill.name);
        
        // Expand the core sphere scale
        const mesh = hovered.object as THREE.Mesh;
        mesh.scale.set(1.4, 1.4, 1.4);
        
        // brighten glow mesh
        const gm = mesh.userData.glowMesh as THREE.Mesh;
        if (gm && gm.material instanceof THREE.Material) {
          gm.material.opacity = 0.6;
        }
      } else {
        setHoveredSkillName(null);
        // Reset scale on all
        sphereNodes.forEach((node) => {
          node.mesh.scale.set(1, 1, 1);
          const gm = node.mesh.userData.glowMesh as THREE.Mesh;
          if (gm && gm.material instanceof THREE.Material) {
            gm.material.opacity = 0.25;
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mouseup", onMouseUp);

      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("click", onClick);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onMouseUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      coreGlobeGeo.dispose();
      coreGlobeMat.dispose();
      orbitRing1Geo.dispose();
      orbitRingMat.dispose();
      intGeo.dispose();
      intMat.dispose();
    };
  }, []);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#050816]/30 p-1 md:p-6 rounded-3xl border border-purple-500/10 backdrop-blur-md relative" id="skills-globe">
      
      {/* 3D Orbit Universe Canvas */}
      <div className="lg:col-span-7 w-full h-[320px] md:h-[450px] relative order-2 lg:order-1 select-none">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        
        {/* Instruction overlay */}
        <div className="absolute top-4 left-4 bg-black/60 border border-cyan-500/20 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-400 backdrop-blur-sm pointer-events-none select-none flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 animate-pulse text-[#14f195]" />
          <span>DRAG TO ROTATE • HOVER/CLICK NODES</span>
        </div>

        {/* Hover tag indicator overlays on canvas */}
        {hoveredSkillName && (
          <div className="absolute inset-x-0 bottom-6 text-center pointer-events-none">
            <span className="bg-[#8b5cf6]/20 border border-purple-400/40 px-3 py-1.5 rounded-full text-xs font-mono text-white tracking-widest uppercase shadow-[0_0_15px_rgba(139,92,246,0.3)] select-none backdrop-blur-md">
              {hoveredSkillName}
            </span>
          </div>
        )}
      </div>

      {/* Cyberpunk HUD Details Output Display */}
      <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col h-full justify-center">
        <div className="text-left bg-black/65 border-2 border-purple-500/20 p-6 rounded-2xl relative shadow-[0_0_40px_rgba(139,92,246,0.15)] backdrop-blur-xl">
          
          {/* Neon Corner Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 translate-x-[-2px] translate-y-[-2px]"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 translate-x-[2px] translate-y-[-2px]"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 translate-x-[-2px] translate-y-[2px]"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 translate-x-[2px] translate-y-[2px]"></div>

          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
            <span className="text-[10px] font-mono tracking-widest text-[#14f195] bg-[#14f195]/10 px-2.5 py-1 rounded-sm uppercase">
              {selectedSkill.category}
            </span>
            <span className="text-xs font-mono text-gray-400">TELEMETRY DECK</span>
          </div>

          <h3
            className="text-2xl font-sans font-bold tracking-tight text-white mb-2 uppercase flex items-center gap-2"
            style={{ textShadow: `0 0 10px ${selectedSkill.glow}50` }}
          >
            <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: selectedSkill.glow }} />
            {selectedSkill.name}
          </h3>

          <p className="text-sm text-slate-300 min-h-[50px] mb-6 leading-relaxed">
            {selectedSkill.description}
          </p>

          <div className="space-y-4 font-mono">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-400 uppercase">PROFICIENCY PARAMETER</span>
                <span className="text-white font-bold" style={{ color: selectedSkill.glow }}>
                  {selectedSkill.level}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${selectedSkill.level}%`,
                    backgroundColor: selectedSkill.glow,
                    boxShadow: `0 0 10px ${selectedSkill.glow}`,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div className="bg-slate-950/50 p-2.5 rounded border border-white/5">
                <div className="text-[10px] text-gray-500 uppercase mb-0.5">MATRIX NODE</div>
                <div className="text-xs text-slate-300">SPHERICAL - SPIN</div>
              </div>
              <div className="bg-slate-950/50 p-2.5 rounded border border-white/5">
                <div className="text-[10px] text-gray-500 uppercase mb-0.5">COGNITIVE RATINGS</div>
                <div className="text-xs text-[#14f195] font-bold">OPTIMIZED</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
