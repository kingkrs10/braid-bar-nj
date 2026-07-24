'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

interface ModelViewerProps {
  modelUrl?: string;
  productName: string;
}

// Subcomponent to load GLB model safely
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} castShadow receiveShadow />
    </Center>
  );
}

// Subcomponent representing the 3D placeholder box
function PlaceholderBox({ label }: { label: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  return (
    <Center>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshPhysicalMaterial
          color="#3C2415" // Espresso
          roughness={0.15}
          metalness={0.0}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          sheen={1.0}
          sheenColor="#C9A96E" // Gold sheen
        />
      </mesh>
    </Center>
  );
}

export default function ModelViewer({ modelUrl, productName }: ModelViewerProps) {
  return (
    <div className="w-full h-full relative aspect-square glass-panel select-none overflow-hidden bg-cream/30">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-espresso/45">
          3D Interactive Model
        </span>
        <h4 className="text-sm font-semibold text-espresso font-[family-name:var(--font-display)]">
          {productName}
        </h4>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} castShadow />
        
        <Suspense
          fallback={
            <HtmlWrapper>
              <div className="flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mb-2" />
                <p className="text-xs text-espresso/60">Loading 3D asset...</p>
              </div>
            </HtmlWrapper>
          }
        >
          {/* Automatically handles lights and shadows around the centered model */}
          <Stage intensity={0.6} environment="city" adjustCamera={false}>
            {modelUrl ? (
              <Model url={modelUrl} />
            ) : (
              <PlaceholderBox label={productName} />
            )}
          </Stage>
        </Suspense>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={2}
          maxDistance={6}
          autoRotate={true}
          autoRotateSpeed={1.5}
        />
      </Canvas>

      <div className="absolute bottom-4 right-4 pointer-events-none text-right">
        <p className="text-[10px] text-espresso/40">Drag to rotate • Pinch to zoom</p>
      </div>
    </div>
  );
}

// Lightweight wrapper to display loading HTML inside R3F Canvas
function HtmlWrapper({ children }: { children: React.ReactNode }) {
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial visible={false} />
      <foreignObject width="100%" height="100%" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </foreignObject>
    </mesh>
  );
}
