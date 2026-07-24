'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ClothSimulation } from './ClothSimulation';
import { BraidStrands } from './BraidStrands';
import { ScrollCamera } from './ScrollCamera';

export default function HeroCanvas() {
  return (
    <div className="canvas-container select-none">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{ pointerEvents: 'none' }} // Let scroll and cursor pass through to html body
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.6} color="#FAF8F5" />

        {/* Studio main light (Warm Gold Key) */}
        <directionalLight
          castShadow
          position={[5, 8, 5]}
          intensity={1.5}
          color="#D4BC8B"
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={20}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
        />

        {/* Cool Rim/Fill Light (Slight lavender/blue for high-fashion studio depth) */}
        <directionalLight
          position={[-8, 4, -4]}
          intensity={0.8}
          color="#9E8BD4"
        />

        {/* Soft Point bounce light */}
        <pointLight position={[0, -2, 2]} intensity={0.5} color="#C67B5C" />

        {/* 3D Scene Components */}
        <Suspense fallback={null}>
          <ClothSimulation />
          <BraidStrands />
          
          {/* Subtle contact shadows below the simulations */}
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.4}
            scale={12}
            blur={2.5}
            far={4}
          />
          
          {/* Studio HDR Environment reflections */}
          <Environment preset="studio" />
        </Suspense>

        {/* Scroll camera control */}
        <ScrollCamera />

        {/* Cinematic Post-Processing */}
        <EffectComposer>
          <Bloom
            intensity={0.4}
            luminanceThreshold={0.7}
            luminanceSmoothing={0.3}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
