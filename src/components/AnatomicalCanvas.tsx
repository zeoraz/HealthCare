import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Heart, Activity, RotateCw, ZoomIn, ZoomOut, Zap, Eye } from 'lucide-react';
import { playHeartbeatBeep, playBlip } from '../utils/audio';

interface AnatomicalCanvasProps {
  modelType: 'heart' | 'body';
  onModelChange?: (type: 'heart' | 'body') => void;
  accentColor?: string;
  bpm?: number;
}

export const AnatomicalCanvas: React.FC<AnatomicalCanvasProps> = ({
  modelType,
  onModelChange,
  accentColor = '#10b981',
  bpm = 72,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, modelType === 'heart' ? 4.8 : 7.2);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(new THREE.Color(accentColor), 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 2.0);
    dirLight2.position.set(-5, -3, 3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(new THREE.Color(accentColor), 4, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Group for model
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Ambient floating particles
    const particleCount = 280;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const col1 = new THREE.Color(accentColor);
    const col2 = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;

      const mixed = col1.clone().lerp(col2, Math.random());
      particleColors[i] = mixed.r;
      particleColors[i + 1] = mixed.g;
      particleColors[i + 2] = mixed.b;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Build Model Geometry
    if (modelType === 'heart') {
      buildHeartModel(modelGroup, accentColor);
    } else {
      buildBodyModel(modelGroup, accentColor);
    }

    // Interactive Drag Rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || !modelGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      modelGroupRef.current.rotation.y += deltaX * 0.008;
      modelGroupRef.current.rotation.x += deltaY * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Resize handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();
    let lastBeat = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Cardiac rhythm pulse
      const beatFrequency = (bpm / 60) * Math.PI * 2;
      const pulseRaw = Math.sin(elapsedTime * beatFrequency);
      const pulse = Math.pow(Math.max(0, pulseRaw), 4) * 0.12;

      // Pulse audio tick
      const beatInterval = 60 / bpm;
      if (elapsedTime - lastBeat >= beatInterval) {
        lastBeat = elapsedTime;
        playHeartbeatBeep(modelType === 'heart' ? 840 : 720, 0.06);
      }

      if (modelGroupRef.current) {
        if (isRotating && !isDragging) {
          modelGroupRef.current.rotation.y += 0.006;
        }

        // Apply heartbeat contraction & dilation
        const baseScale = 1;
        const currentScale = baseScale + pulse;
        modelGroupRef.current.scale.set(currentScale, currentScale, currentScale);

        // Pulsate point light
        pointLight.intensity = 2.5 + pulse * 18;
      }

      // Rotate particle aura slowly
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, [modelType, accentColor, bpm, isRotating]);

  // Adjust Zoom
  const handleZoom = (delta: number) => {
    if (!cameraRef.current) return;
    const newZoom = Math.max(0.6, Math.min(1.8, zoomLevel + delta));
    setZoomLevel(newZoom);
    const baseDist = modelType === 'heart' ? 4.8 : 7.2;
    cameraRef.current.position.z = baseDist / newZoom;
    playBlip(750);
  };

  return (
    <div className="relative w-full h-[480px] md:h-[580px] lg:h-[620px] rounded-3xl overflow-hidden glass-panel border border-emerald-500/20 group select-none">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Model Switcher Controls */}
      <div className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-xl">
        <button
          onClick={() => {
            onModelChange?.('heart');
            playBlip(880);
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
            modelType === 'heart'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>3D Cardiac Core</span>
        </button>

        <button
          onClick={() => {
            onModelChange?.('body');
            playBlip(920);
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
            modelType === 'body'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Full-Body Bio-Grid</span>
        </button>
      </div>

      {/* Camera & Rotation Action Bar */}
      <div className="absolute bottom-5 left-5 z-20 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10 text-slate-400 text-xs">
        <button
          onClick={() => {
            setIsRotating(!isRotating);
            playBlip(800);
          }}
          title={isRotating ? 'Pause auto-rotation' : 'Resume auto-rotation'}
          className={`p-1.5 rounded-lg transition-colors ${isRotating ? 'text-emerald-400 bg-emerald-500/10' : 'hover:text-white'}`}
        >
          <RotateCw className="w-4 h-4" />
        </button>
        <span className="w-px h-3.5 bg-white/10 mx-1" />
        <button
          onClick={() => handleZoom(0.15)}
          title="Zoom In"
          className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom(-0.15)}
          title="Zoom Out"
          className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="w-px h-3.5 bg-white/10 mx-1" />
        <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
          Drag to 3D Rotate
        </span>
      </div>

      {/* Floating Hotspot Badges (Anchored to Canvas) */}
      {modelType === 'heart' ? (
        <>
          <div className="absolute top-1/4 right-6 md:right-10 z-20 animate-float-slow">
            <div
              onClick={() => setActiveHotspot(activeHotspot === 'aorta' ? null : 'aorta')}
              className="cursor-pointer bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-3.5 shadow-xl hover:border-emerald-400 transition-all max-w-[210px]"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Aortic Arch
                </span>
              </div>
              <div className="text-sm font-bold text-white tracking-tight">120/80 mmHg</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Continuous systolic pressure</div>
              {activeHotspot === 'aorta' && (
                <div className="mt-2 pt-2 border-t border-white/10 text-[10px] text-emerald-300 font-mono leading-relaxed">
                  Laminar arterial flow confirmed. Zero turbulent resistance detected.
                </div>
              )}
            </div>
          </div>

          <div className="absolute bottom-16 right-8 md:right-16 z-20">
            <div
              onClick={() => setActiveHotspot(activeHotspot === 'ventricle' ? null : 'ventricle')}
              className="cursor-pointer bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-3.5 shadow-xl hover:border-cyan-400 transition-all max-w-[210px]"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  Left Ventricle
                </span>
              </div>
              <div className="text-sm font-bold text-white tracking-tight">64% Ejection Fraction</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Optimal myocardial elasticity</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="absolute top-24 left-6 md:left-8 z-20 animate-float-slow">
            <div className="bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-3.5 shadow-xl max-w-[220px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Neural Plexus
                </span>
              </div>
              <div className="text-sm font-bold text-white tracking-tight">Autonomous Vagal Tone</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Balanced autonomic nervous activity</div>
            </div>
          </div>

          <div className="absolute bottom-20 right-8 z-20">
            <div className="bg-slate-900/90 backdrop-blur-md border border-teal-500/30 rounded-2xl p-3.5 shadow-xl max-w-[220px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400 font-semibold">
                  Systemic Metabolic Grid
                </span>
              </div>
              <div className="text-sm font-bold text-white tracking-tight">84 Biomarkers Online</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Real-time capillary telemetry</div>
            </div>
          </div>
        </>
      )}

      {/* Live Pulse Rate Pill in Canvas Corner */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-emerald-500/30 shadow-lg">
        <Zap className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
        <div className="font-mono text-xs">
          <span className="text-white font-bold">{bpm}</span>
          <span className="text-slate-400 ml-1">BPM SYNCHRONIZED</span>
        </div>
      </div>
    </div>
  );
};

// ==================== Procedural 3D Heart Geometry ====================
function buildHeartModel(group: THREE.Group, accentHex: string) {
  const accent = new THREE.Color(accentHex);
  const cyan = new THREE.Color(0x06b6d4);
  const ruby = new THREE.Color(0xf43f5e);

  // Outer Glass / Translucent Heart Body
  const heartShape = new THREE.Shape();
  const x = 0, y = 0;
  heartShape.moveTo(x + 0.25, y + 0.25);
  heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
  heartShape.bezierCurveTo(x - 0.35, y, x - 0.35, y + 0.35, x - 0.35, y + 0.35);
  heartShape.bezierCurveTo(x - 0.35, y + 0.55, x - 0.15, y + 0.77, x + 0.25, y + 1.0);
  heartShape.bezierCurveTo(x + 0.65, y + 0.77, x + 0.85, y + 0.55, x + 0.85, y + 0.35);
  heartShape.bezierCurveTo(x + 0.85, y + 0.35, x + 0.85, y, x + 0.5, y);
  heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

  const extrudeSettings = {
    depth: 0.65,
    bevelEnabled: true,
    bevelSegments: 8,
    steps: 4,
    bevelSize: 0.25,
    bevelThickness: 0.25,
  };

  const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  heartGeo.center();

  // Glass Material with Specular Reflectance
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0f292e,
    emissive: accent,
    emissiveIntensity: 0.25,
    metalness: 0.1,
    roughness: 0.15,
    transmission: 0.75, // Glass refraction
    thickness: 1.2,
    transparent: true,
    opacity: 0.88,
    reflectivity: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  const heartMesh = new THREE.Mesh(heartGeo, glassMaterial);
  heartMesh.scale.set(1.4, -1.4, 1.4);
  heartMesh.position.y = 0.15;
  group.add(heartMesh);

  // Inner Glowing Core (Ventricle Chamber)
  const coreGeo = new THREE.SphereGeometry(0.55, 32, 32);
  const coreMat = new THREE.MeshStandardMaterial({
    color: ruby,
    emissive: ruby,
    emissiveIntensity: 1.8,
    wireframe: true,
    transparent: true,
    opacity: 0.7,
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreMesh.position.set(0, 0, 0);
  coreMesh.scale.set(0.9, 1.2, 0.7);
  group.add(coreMesh);

  // Aorta and Major Great Vessels (Curved Cylinders)
  const aortaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.1, 0.6, 0),
    new THREE.Vector3(-0.2, 1.1, 0.1),
    new THREE.Vector3(0.25, 1.35, 0.0),
    new THREE.Vector3(0.5, 1.1, -0.2),
  ]);
  const aortaGeo = new THREE.TubeGeometry(aortaCurve, 32, 0.18, 16, false);
  const vesselMat = new THREE.MeshPhysicalMaterial({
    color: 0x093339,
    emissive: accent,
    emissiveIntensity: 0.4,
    transmission: 0.6,
    roughness: 0.2,
    transparent: true,
    opacity: 0.85,
  });
  const aortaMesh = new THREE.Mesh(aortaGeo, vesselMat);
  group.add(aortaMesh);

  // Pulmonary Artery Branch
  const pulmonaryCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.1, 0.5, 0.2),
    new THREE.Vector3(0.3, 0.95, 0.25),
    new THREE.Vector3(0.65, 1.0, 0.1),
  ]);
  const pulmonaryGeo = new THREE.TubeGeometry(pulmonaryCurve, 24, 0.14, 12, false);
  const pulmonaryMesh = new THREE.Mesh(pulmonaryGeo, vesselMat);
  group.add(pulmonaryMesh);

  // Glowing Arterial Branching Network (Lattice of Glowing Curves)
  const vesselCount = 14;
  for (let i = 0; i < vesselCount; i++) {
    const angle = (i / vesselCount) * Math.PI * 2;
    const radius = 0.55 + Math.random() * 0.2;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.6, 0),
      new THREE.Vector3(
        Math.cos(angle) * radius * 0.7,
        0.2 - i * 0.05,
        Math.sin(angle) * radius * 0.7
      ),
      new THREE.Vector3(
        Math.cos(angle + 0.3) * radius,
        -0.4 - Math.random() * 0.3,
        Math.sin(angle + 0.3) * radius
      ),
    ]);
    const branchGeo = new THREE.TubeGeometry(curve, 16, 0.03, 8, false);
    const branchMat = new THREE.MeshStandardMaterial({
      color: accent,
      emissive: accent,
      emissiveIntensity: 1.4,
      transparent: true,
      opacity: 0.9,
    });
    group.add(new THREE.Mesh(branchGeo, branchMat));
  }
}

// ==================== Procedural 3D Holographic Body Geometry ====================
function buildBodyModel(group: THREE.Group, accentHex: string) {
  const accent = new THREE.Color(accentHex);
  const cyan = new THREE.Color(0x06b6d4);

  // Head
  const headGeo = new THREE.SphereGeometry(0.42, 24, 24);
  const wireMat = new THREE.MeshStandardMaterial({
    color: 0x0f2d35,
    emissive: accent,
    emissiveIntensity: 0.5,
    wireframe: true,
    transparent: true,
    opacity: 0.65,
  });
  const headMesh = new THREE.Mesh(headGeo, wireMat);
  headMesh.position.set(0, 2.3, 0);
  headMesh.scale.set(0.9, 1.1, 0.95);
  group.add(headMesh);

  // Neck
  const neckGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.35, 16);
  const neckMesh = new THREE.Mesh(neckGeo, wireMat);
  neckMesh.position.set(0, 1.75, 0);
  group.add(neckMesh);

  // Torso / Ribcage Hologram
  const torsoGeo = new THREE.CylinderGeometry(0.85, 0.55, 1.8, 24, 16);
  const torsoGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x071b24,
    emissive: accent,
    emissiveIntensity: 0.25,
    transmission: 0.7,
    roughness: 0.2,
    transparent: true,
    opacity: 0.6,
    wireframe: false,
  });
  const torsoMesh = new THREE.Mesh(torsoGeo, torsoGlassMat);
  torsoMesh.position.set(0, 0.75, 0);
  torsoMesh.scale.set(1.1, 1, 0.65);
  group.add(torsoMesh);

  // Torso Wire Lattice Overlay
  const torsoWireMesh = new THREE.Mesh(torsoGeo, wireMat);
  torsoWireMesh.position.set(0, 0.75, 0);
  torsoWireMesh.scale.set(1.12, 1, 0.67);
  group.add(torsoWireMesh);

  // Glowing Neural Spine Column
  const spineCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.9, -0.1),
    new THREE.Vector3(0, 1.2, -0.12),
    new THREE.Vector3(0, 0.4, -0.08),
    new THREE.Vector3(0, -0.3, -0.12),
  ]);
  const spineGeo = new THREE.TubeGeometry(spineCurve, 24, 0.05, 8, false);
  const spineMat = new THREE.MeshStandardMaterial({
    color: cyan,
    emissive: cyan,
    emissiveIntensity: 2.2,
  });
  group.add(new THREE.Mesh(spineGeo, spineMat));

  // Glowing Cardiac Nexus Inside Torso
  const heartCoreGeo = new THREE.SphereGeometry(0.28, 16, 16);
  const heartCoreMat = new THREE.MeshStandardMaterial({
    color: 0xf43f5e,
    emissive: 0xf43f5e,
    emissiveIntensity: 2.5,
  });
  const heartCore = new THREE.Mesh(heartCoreGeo, heartCoreMat);
  heartCore.position.set(-0.15, 0.95, 0.1);
  group.add(heartCore);

  // Arms
  const createArm = (isLeft: boolean) => {
    const sign = isLeft ? -1 : 1;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(sign * 0.95, 1.5, 0),
      new THREE.Vector3(sign * 1.3, 0.8, 0.1),
      new THREE.Vector3(sign * 1.45, -0.1, 0.15),
    ]);
    const geo = new THREE.TubeGeometry(curve, 20, 0.12, 12, false);
    return new THREE.Mesh(geo, wireMat);
  };
  group.add(createArm(true));
  group.add(createArm(false));

  // Legs
  const createLeg = (isLeft: boolean) => {
    const sign = isLeft ? -1 : 1;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(sign * 0.4, -0.2, 0),
      new THREE.Vector3(sign * 0.45, -1.3, 0),
      new THREE.Vector3(sign * 0.5, -2.5, 0.05),
    ]);
    const geo = new THREE.TubeGeometry(curve, 20, 0.15, 12, false);
    return new THREE.Mesh(geo, wireMat);
  };
  group.add(createLeg(true));
  group.add(createLeg(false));

  // Glowing Meridian Particle Points along Body
  const nodeCount = 36;
  const nodeGeo = new THREE.SphereGeometry(0.04, 8, 8);
  const nodeMat = new THREE.MeshBasicMaterial({ color: accent });
  for (let i = 0; i < nodeCount; i++) {
    const node = new THREE.Mesh(nodeGeo, nodeMat);
    node.position.set(
      (Math.random() - 0.5) * 1.2,
      (Math.random() - 0.5) * 4.2 + 0.2,
      (Math.random() - 0.5) * 0.5
    );
    group.add(node);
  }
}
