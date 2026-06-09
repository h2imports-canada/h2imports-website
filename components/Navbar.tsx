"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className="w-full flex items-center justify-between px-8 md:px-14 py-4 sticky top-0 z-50 bg-white"
      style={{
        borderBottom: "1px solid #E5E5E5",
        paddingTop: "1.1rem",
        paddingBottom: "1.1rem",
      }}
    >
      {/* LEFT SIDE: Logo */}
      <div className="flex-1 flex justify-start">
        <Link href="/" className="no-underline flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="H2 Imports Logo"
            className="h-12 w-auto object-contain"
          />
          <span className="font-black text-black tracking-tight hidden sm:block">
            <span style={{ fontSize: "1.35rem", letterSpacing: "-0.03em" }}>
              H2 IMPORTS
            </span>
          </span>
        </Link>
      </div>

      {/* CENTER: Hamburger (Mobile) & Nav Links (Desktop) */}
      <div className="flex justify-center">
        {/* Hamburger Icon (Visible only on Mobile) */}
        <button
          className="md:hidden flex items-center justify-center p-2 text-black hover:bg-gray-100 rounded-md transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              // Close 'X' icon
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              // Hamburger 3-lines icon
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>

        {/* Desktop Links (Visible only on Desktop/Tablet) */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/about"
            className="font-medium text-gray-800 hover:text-black transition-colors no-underline"
          >
            About
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-gray-800 hover:text-black transition-colors no-underline"
            style={{ fontSize: "1rem" }}
          >
            Services
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE: Contact Button */}
      <div className="flex-1 flex justify-end">
        <Link
          href="/contact"
          className="font-semibold text-white no-underline rounded-md transition-colors bg-[#0033CC] hover:bg-[#1a4fd6]"
          style={{
            fontSize: "1rem",
            padding: "0.6rem 1.6rem",
          }}
        >
          Contact
        </Link>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg md:hidden flex flex-col px-8 py-6 gap-6 z-40">
          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-medium text-gray-800 hover:text-[#0033CC] text-lg no-underline transition-colors"
          >
            About
          </Link>
          <Link
            href="/services"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-medium text-gray-800 hover:text-[#0033CC] text-lg no-underline transition-colors"
          >
            Services
          </Link>
        </div>
      )}
    </nav>
  );
}
