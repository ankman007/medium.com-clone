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
  reactStrictMode: process.env.NODE_ENV !== "production",
  serverExternalPackages: [
    "@fortawesome",
    "@tiptap",
    "react-draft-wysiwyg",
  ],
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;