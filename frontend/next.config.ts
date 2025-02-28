import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
  reactStrictMode: process.env.NODE_ENV !== "production", // Enable only in development
  experimental: {
    serverActions: {
      bodySizeLimit: undefined,
      allowedOrigins: undefined,
    },
    serverComponentsExternalPackages: [
      "@fortawesome",
      "@tiptap",
      "react-draft-wysiwyg",
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Removes console logs in production
  },
};

export default nextConfig;
