import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, 
  images: {
    remotePatterns: [
      {
        protocol: 'http', 
        hostname: '127.0.0.1', 
        port: '8000'
      },
      {
        protocol: 'http', 
        hostname: 'localhost', 
        port: '3000'
      },
      {
        protocol: "https", 
        hostname: "*"
      }
    ]
  }
};

export default nextConfig;
