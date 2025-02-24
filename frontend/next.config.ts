import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["via.placeholder.com"],
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
