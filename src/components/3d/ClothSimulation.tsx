'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ClothSimulation
 * ===============
 * A CPU-based Verlet integration spring-mass system for cloth physics.
 * Animates a PlaneGeometry structure by simulating particles (vertices)
 * connected by structural, shear, and bending springs.
 */

class Particle {
  position: THREE.Vector3;
  previous: THREE.Vector3;
  original: THREE.Vector3;
  acceleration: THREE.Vector3;
  mass: number;
  invMass: number;
  tmp: THREE.Vector3;

  constructor(x: number, y: number, z: number, mass: number) {
    this.position = new THREE.Vector3(x, y, z);
    this.previous = new THREE.Vector3(x, y, z);
    this.original = new THREE.Vector3(x, y, z);
    this.acceleration = new THREE.Vector3(0, 0, 0);
    this.mass = mass;
    this.invMass = mass === 0 ? 0 : 1 / mass;
    this.tmp = new THREE.Vector3();
  }

  addForce(force: THREE.Vector3) {
    this.acceleration.addScaledVector(force, this.invMass);
  }

  integrate(timeStepSq: number) {
    if (this.invMass === 0) return; // Pinned
    
    this.tmp.copy(this.position);
    
    // Verlet integration formula: pos_new = pos + (pos - pos_prev) * damping + acc * dt^2
    const damping = 0.98; // Drag/energy loss
    this.position
      .addScaledVector(this.position.clone().sub(this.previous), damping)
      .addScaledVector(this.acceleration, timeStepSq);
      
    this.previous.copy(this.tmp);
    this.acceleration.set(0, 0, 0); // Reset forces
  }
}

class Constraint {
  p1: Particle;
  p2: Particle;
  restLength: number;

  constructor(p1: Particle, p2: Particle) {
    this.p1 = p1;
    this.p2 = p2;
    this.restLength = p1.position.distanceTo(p2.position);
  }

  satisfy() {
    const diff = new THREE.Vector3().subVectors(this.p2.position, this.p1.position);
    const currentLength = diff.length();
    if (currentLength === 0) return; // Prevent divide by zero

    const diffLength = this.restLength - currentLength;
    // Scale correction by inverse masses
    const im1 = this.p1.invMass;
    const im2 = this.p2.invMass;
    const totalMass = im1 + im2;
    if (totalMass === 0) return; // Both pinned

    const correction = diff.normalize().multiplyScalar(diffLength / totalMass);
    
    this.p1.position.addScaledVector(correction, -im1);
    this.p2.position.addScaledVector(correction, im2);
  }
}

export function ClothSimulation() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Grid size configurations
  const widthSegments = 16;
  const heightSegments = 16;
  const clothWidth = 3;
  const clothHeight = 4;
  const gravity = new THREE.Vector3(0, -4.8, 0); // Reduced gravity for lighter drape
  const timeStep = 0.016; // Approx 60fps delta
  const timeStepSq = timeStep * timeStep;

  // 1. Create Particles and Constraints
  const { particles, constraints } = useMemo(() => {
    const tempParticles: Particle[] = [];
    const tempConstraints: Constraint[] = [];

    // Create particles in a vertical drape orientation
    for (let j = 0; j <= heightSegments; j++) {
      const y = clothHeight / 2 - (j / heightSegments) * clothHeight;
      for (let i = 0; i <= widthSegments; i++) {
        const x = (i / widthSegments) * clothWidth - clothWidth / 2;
        const z = 0;
        
        // Pin top row to create draped banner look
        const isPinned = j === 0;
        const mass = isPinned ? 0 : 0.1;
        
        tempParticles.push(new Particle(x, y, z, mass));
      }
    }

    // Index helper
    const index = (u: number, v: number) => u + v * (widthSegments + 1);

    // Create springs/constraints
    for (let v = 0; v <= heightSegments; v++) {
      for (let u = 0; u <= widthSegments; u++) {
        // Structural: horizontal & vertical links
        if (u < widthSegments) {
          tempConstraints.push(new Constraint(tempParticles[index(u, v)], tempParticles[index(u + 1, v)]));
        }
        if (v < heightSegments) {
          tempConstraints.push(new Constraint(tempParticles[index(u, v)], tempParticles[index(u, v + 1)]));
        }

        // Shear: diagonal links
        if (u < widthSegments && v < heightSegments) {
          tempConstraints.push(new Constraint(tempParticles[index(u, v)], tempParticles[index(u + 1, v + 1)]));
          tempConstraints.push(new Constraint(tempParticles[index(u + 1, v)], tempParticles[index(u, v + 1)]));
        }

        // Bending: double-distance links to keep cloth flat
        if (u < widthSegments - 1) {
          tempConstraints.push(new Constraint(tempParticles[index(u, v)], tempParticles[index(u + 2, v)]));
        }
        if (v < heightSegments - 1) {
          tempConstraints.push(new Constraint(tempParticles[index(u, v)], tempParticles[index(u, v + 2)]));
        }
      }
    }

    return { particles: tempParticles, constraints: tempConstraints };
  }, []);

  // Update logic run at 60fps
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const geom = meshRef.current.geometry as THREE.BufferGeometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;

    // Apply forces (Gravity + Wind)
    const windForce = new THREE.Vector3(
      Math.sin(time * 1.5) * 0.3 + 0.1, 
      Math.cos(time * 1.0) * 0.05,
      Math.sin(time * 2.2) * 1.2 // flap back and forth in wind
    );

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      // Gravity
      p.addForce(gravity);
      // Wind
      p.addForce(windForce);
      // Verlet Step
      p.integrate(timeStepSq);
    }

    // Satisfy Constraints multiple times for stiffness (relaxation loops)
    for (let k = 0; k < 5; k++) {
      for (let i = 0; i < constraints.length; i++) {
        constraints[i].satisfy();
      }
    }

    // Write back particle positions to geometry buffer
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      posAttr.setXYZ(i, p.position.x, p.position.y, p.position.z);
    }

    posAttr.needsUpdate = true;
    geom.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow position={[-2, 0, 0]}>
      <planeGeometry args={[clothWidth, clothHeight, widthSegments, heightSegments]} />
      <meshPhysicalMaterial
        color="#3C2415"
        roughness={0.2}
        metalness={0.1}
        clearcoat={0.9}
        clearcoatRoughness={0.1}
        side={THREE.DoubleSide}
        sheen={1.0}
        sheenRoughness={0.3}
        sheenColor="#C9A96E"
      />
    </mesh>
  );
}
