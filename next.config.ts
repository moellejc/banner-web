import type { NextConfig } from 'next';
import { fallbackModeToFallbackField } from 'next/dist/lib/fallback';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
  turbopack:{
    resolveAlias:{
      tls: false,
      net: false,
      fs: false,
      http2: false,
      child_process: false
    }
  }
};

export default nextConfig;
