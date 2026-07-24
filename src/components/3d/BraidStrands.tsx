'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * BraidStrands
 * ============
 * Procedurally generates glossy 3D braided hair strands that react
 * organically to pointer/mouse movement with a springy sway.
 */

interface BraidProps {
  position: [number, number, number];
  length?: number;
  radius?: number;
  period?: number;
  offsetY?: number;
}

function Braid({ position, length = 5, radius = 0.08, period = 1.0, offsetY = 0 }: BraidProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef(new THREE.Vector2(0, 0));
  const currentRotation = useRef(new THREE.Vector2(0, 0));
  const { pointer } = useThree();

  // Create curves for the three interlocking strands of a braid
  const curves = useMemo(() => {
    const pointsStrandA: THREE.Vector3[] = [];
    const pointsStrandB: THREE.Vector3[] = [];
    const pointsStrandC: THREE.Vector3[] = [];

    const segments = 100;
    const braidWidth = 0.25;

    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * length;
      const y = length / 2 - t; // Drape downwards

      // Three-strand braiding mathematics:
      // Each strand follows a sinusoidal curve out of phase by 2pi/3
      const angleA = (t / period) * Math.PI * 2;
      const angleB = angleA + (Math.PI * 2) / 3;
      const angleC = angleB + (Math.PI * 2) / 3;

      // Interweaving displacements (simulates braids crossing over each other)
      const xA = Math.sin(angleA) * braidWidth;
      const zA = Math.cos(angleA * 2) * (braidWidth * 0.4);

      const xB = Math.sin(angleB) * braidWidth;
      const zB = Math.cos(angleB * 2) * (braidWidth * 0.4);

      const xC = Math.sin(angleC) * braidWidth;
      const zC = Math.cos(angleC * 2) * (braidWidth * 0.4);

      pointsStrandA.push(new THREE.Vector3(xA, y, zA));
      pointsStrandB.push(new THREE.Vector3(xB, y, zB));
      pointsStrandC.push(new THREE.Vector3(xC, y, zC));
    }

    return [
      new THREE.CatmullRomCurve3(pointsStrandA),
      new THREE.CatmullRomCurve3(pointsStrandB),
      new THREE.CatmullRomCurve3(pointsStrandC),
    ];
  }, [length, period]);

  useFrame(() => {
    if (!groupRef.current) return;

    // Track mouse / pointer coordinates to tilt/sway the braids
    targetRotation.current.set(pointer.x * 0.25, -pointer.y * 0.25);
    
    // Smooth lerp (spring-like damping)
    currentRotation.current.lerp(targetRotation.current, 0.05);

    // Apply rotation around the anchor point (top of the braid)
    groupRef.current.rotation.z = currentRotation.current.x;
    groupRef.current.rotation.x = currentRotation.current.y;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Anchor point at top */}
      <mesh position={[0, length / 2, 0]}>
        <sphereGeometry args={[radius * 1.5, 16, 16]} />
        <meshPhysicalMaterial color="#C9A96E" metalness={0.8} roughness={0.2} />
      </mesh>
      {curves.map((curve, idx) => (
        <mesh key={idx} castShadow receiveShadow>
          <tubeGeometry args={[curve, 64, radius, 8, false]} />
          <meshPhysicalMaterial
            color="#3C2415"
            roughness={0.1}
            metalness={0.05}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            anisotropy={8} // High anisotropy creates realistic hair specular highlight streaks
            anisotropyRotation={0.5}
            sheen={0.5}
            sheenColor="#C9A96E"
          />
        </mesh>
      ))}
    </group>
  );
}

export function BraidStrands() {
  return (
    <group position={[2, 0, 0]}>
      {/* Several braids grouped with varied heights, offsets, and period variables */}
      <Braid position={[-0.4, 0.5, 0.2]} length={4} radius={0.06} period={0.8} />
      <Braid position={[0.0, 0.0, 0.0]} length={5} radius={0.08} period={1.0} />
      <Braid position={[0.4, 0.3, -0.2]} length={4.5} radius={0.07} period={0.9} />
    </group>
  );
}
