'use client';

import { useThree, useFrame } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject } from 'react';
import * as THREE from 'three';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollCameraProps {
  containerRef?: RefObject<HTMLDivElement | null>;
}

export function ScrollCamera({ containerRef }: ScrollCameraProps) {
  const { camera } = useThree();

  useGSAP(() => {
    // Basic camera targets and positions mapped to scroll progress
    // Section 1: Hero [0, 0, 7]
    // Section 2: Braid Bar [2.5, 0.5, 5.5]
    // Section 3: Shop [-2.5, -0.5, 5]
    // Section 4: WerkSpace [0, 1.5, 6]
    
    // We animate a proxy object or just animate camera directly
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5, // Smooth lag/catch-up
        // markers: false,
      }
    });

    timeline
      // To Braid Bar Section (looking at braids)
      .to(camera.position, {
        x: 1.5,
        y: 0.5,
        z: 4.5,
        ease: 'none',
      })
      // To Shop Section (looking at cloth)
      .to(camera.position, {
        x: -2.0,
        y: -0.2,
        z: 4.0,
        ease: 'none',
      })
      // To WerkSpace Section (overview / center-aligned)
      .to(camera.position, {
        x: 0,
        y: 0,
        z: 6.0,
        ease: 'none',
      });

  }, { dependencies: [camera] });

  return null;
}
