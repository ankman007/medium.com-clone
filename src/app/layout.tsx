import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css"; 

export const metadata: Metadata = {
  title: "DevFlow",
  description: "Web content management system that allows for hassle-free way to publish and manage content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
