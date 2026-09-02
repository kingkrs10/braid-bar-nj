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
    remotePatterns: [
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn-s.acuityscheduling.com' },
    ],
  },

  // Subdomain Routing: Only shop.braidbarnj.com rewrites '/' to '/shop'.
  // braidbarnj.com, www.braidbarnj.com, and other domains remain 100% untouched.
  async rewrites() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'shop.braidbarnj.com',
          },
        ],
        destination: '/shop',
      },
    ];
  },

  // Set the Turbopack root directory explicitly to silence warning and resolve modules correctly
  turbopack: {
    root: path.resolve('.'),
  },
};

export default nextConfig;
