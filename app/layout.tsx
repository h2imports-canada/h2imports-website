import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// NEW: Import the component we just built
import MobileFloatingBar from "@/components/MobileFloatingBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "H2 Imports",
  description:
    "Elevating home spaces in Winnipeg with custom cabinetry, blinds, and modern renovations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Added relative here so the absolute/fixed elements map properly */}
      <body className="min-h-full flex flex-col relative">
        <Navbar />
        {children}

        {/* NEW: Drop the bar right here at the bottom! */}
        <MobileFloatingBar />
      </body>
    </html>
  );
}
