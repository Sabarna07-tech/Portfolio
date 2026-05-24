'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleCloud() {
  const pointsRef = useRef<THREE.Points>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particlesCount = 4000;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const color = new THREE.Color();
    
    // Theme colors: Sentri primary is deep violet, accents are lime and pink.
    const palette = [
      '#6a5fc1', // accent-violet
      '#c2ef4e', // accent-lime
      '#fa7faa', // accent-pink
      '#ffffff', // white
      '#422082'  // accent-violet-deep
    ];

    for (let i = 0; i < particlesCount; i++) {
      // Distribute in a wide rectangular volume in front of the camera
      const x = (Math.random() - 0.5) * 60; // Wide horizontal spread
      const y = (Math.random() - 0.5) * 60; // Tall vertical spread
      // Camera is at z=15. Place particles between z=-20 and z=5
      const z = (Math.random() - 0.5) * 25 - 7.5; 

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      color.set(palette[Math.floor(Math.random() * palette.length)]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [positions, colors];
  }, [particlesCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Slow constant rotation
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;

      // Mouse parallax reaction
      const targetX = mouse.x * 2;
      const targetY = mouse.y * 2;
      
      pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
      pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function WebGLBackground() {
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ParticleCloud />
      </Canvas>
    </div>
  );
}
