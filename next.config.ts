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
    logging: 'verbose', // Enable detailed logs
    serverComponentsExternalPackages: ['@fortawesome', '@tiptap', 'react-draft-wysiwyg'], // Add this for external packages
  },
  compiler: {
    removeConsole: false,
  },
};

export default nextConfig;
