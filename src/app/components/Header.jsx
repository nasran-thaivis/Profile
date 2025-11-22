"use client";

import Link from "next/link";
import { useState } from "react";
import LogoEditor from "./LogoEditor";
import { useAuth } from "../contexts/AuthContext";

// === Navigation Links สำหรับ Desktop และ Mobile ===
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/review", label: "Review" },
  { href: "/contact", label: "Contact" },
];

// === Header Component (Responsive) ===
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuth();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-white shadow-sm text-[var(--color-text)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        {/* ส่วนที่ 1 (ซ้าย): Logo และชื่อ 'Nasran Salaeh' */}
        <div className="flex items-center gap-3">
          {/* Logo Editor: แสดง Logo ที่อัปโหลด (เก็บใน localStorage) - ซ่อนปุ่มควบคุมใน Header */}
          <LogoEditor size={40} showControls={false} />
          <Link href="/" className="text-base font-semibold text-[var(--color-text)]" onClick={closeMenu}>
            Nasran Salaeh
          </Link>
        </div>

        {/* ส่วนที่ 2 (กลาง): Navigation links 5 รายการ แนวนอน */}
        <nav className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-3 py-1 hover:bg-gray-100 hover:text-[var(--color-primary)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ส่วนที่ 3 (ขวา): Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* แสดง Username */}
              <span className="text-sm text-gray-600">
                Welcome, <span className="text-[var(--color-text)] font-medium">{currentUser?.name}</span>
              </span>
              {/* Admin Button */}
              <Link
                href="/admin"
                className="px-4 py-2 bg-[var(--color-primary)] hover:opacity-90 text-white text-sm rounded-lg transition-all"
              >
                Admin
              </Link>
              {/* Logout Button */}
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[var(--color-text)] text-sm rounded-lg transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login Button */}
              <Link
                href="/login"
                className="px-4 py-2 bg-[var(--color-primary)] hover:opacity-90 text-white text-sm rounded-lg transition-all"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-white shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}

            {/* Auth Section (Mobile) */}
            <div className="pt-3 border-t border-gray-200 space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-600">
                    Welcome, <span className="text-[var(--color-text)] font-medium">{currentUser?.name}</span>
                  </div>
                  <Link
                    href="/admin"
                    onClick={closeMenu}
                    className="block rounded px-3 py-2 bg-[var(--color-primary)] hover:opacity-90 text-white text-sm text-center transition-all"
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="w-full rounded px-3 py-2 bg-gray-100 hover:bg-gray-200 text-[var(--color-text)] text-sm text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="block rounded px-3 py-2 bg-[var(--color-primary)] hover:opacity-90 text-white text-sm text-center transition-all"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
