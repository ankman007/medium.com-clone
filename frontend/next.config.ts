import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["via.placeholder.com"],
  },
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: undefined,
      allowedOrigins: undefined,
    },
    logging: 'verbose',
    serverComponentsExternalPackages: ['@fortawesome', '@tiptap', 'react-draft-wysiwyg'],
  },
  compiler: {
    removeConsole: false,
  },
};

export default nextConfig;
