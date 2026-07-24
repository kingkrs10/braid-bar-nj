import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Enable React strict mode for development
  reactStrictMode: true,

  // Allow tunnels (like localtunnel, Serveo, and Pinggy) to access dev resources without cross-origin blocks
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    'chatty-eyes-battle.loca.lt',
    '*.loca.lt',
    '*.serveousercontent.com',
    '*.pinggy.link',
    '*.pinggy.io'
  ],

  // Transpile Three.js packages for compatibility
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    '@react-three/postprocessing',
  ],

  // Image optimization config
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Set the Turbopack root directory explicitly to silence warning and resolve modules correctly
  turbopack: {
    root: path.resolve('.'),
  },
};

export default nextConfig;
