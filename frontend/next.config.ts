import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["127.0.0.1"], // Allow images from Django backend
  },
  reactStrictMode: false,
  experimental: {
    serverActions: {
      bodySizeLimit: undefined,
      allowedOrigins: undefined,
    },
    serverComponentsExternalPackages: ['@fortawesome', '@tiptap', 'react-draft-wysiwyg'],
  },
  compiler: {
    removeConsole: false,
  },
};

export default nextConfig;
