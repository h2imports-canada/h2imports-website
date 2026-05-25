import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="w-full flex items-center justify-between px-8 md:px-14 py-4 sticky top-0 z-50"
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #E5E5E5",
        paddingTop: "1.1rem",
        paddingBottom: "1.1rem",
      }}
    >
      {/* Logo & Company Name */}
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

      {/* Nav links */}
      <div className="flex items-center gap-8">
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
    </nav>
  );
}
