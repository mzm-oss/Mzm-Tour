"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function PackageNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
                        <Image src="/logo.png" alt="MZM Tour" width={90} height={45} className="object-contain" />
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-700">
                        <Link href="/" className="hover:text-teal-700 transition-colors">Beranda</Link>
                        <Link href="/paket-umroh" className="hover:text-teal-700 transition-colors">Umroh</Link>
                        <Link href="/paket-haji" className="hover:text-teal-700 transition-colors">Haji</Link>
                        <Link href="/paket-wisata" className="hover:text-teal-700 transition-colors">Wisata</Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button className="sm:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {menuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {menuOpen && (
                <div className="sm:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3 text-sm font-medium text-gray-700">
                    <Link href="/" onClick={() => setMenuOpen(false)}>Beranda</Link>
                    <Link href="/paket-umroh" onClick={() => setMenuOpen(false)}>Paket Umroh</Link>
                    <Link href="/paket-haji" onClick={() => setMenuOpen(false)}>Layanan Haji</Link>
                    <Link href="/paket-wisata" onClick={() => setMenuOpen(false)}>Wisata Islam</Link>
                </div>
            )}
        </nav>
    );
}
