'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/training', label: 'Training Centre' },
    { href: '/contact', label: 'Contact' },
    { href: '/book-appointment', label: 'Book Now' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (currentY > lastScrollY.current && currentY > 80 && !mobileMenuOpen) {
            setVisible(false);
          } else {
            setVisible(true);
          }
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Ensure header is visible when mobile menu opens
  useEffect(() => {
    if (mobileMenuOpen) setVisible(true);
  }, [mobileMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transform transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'} bg-white/80 backdrop-blur-xl border-b border-rose-900/5 shadow-sm`}>
      <nav className="container mx-auto px-4 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-rose-400 via-rose-500 to-amber-500 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-[0_0_15px_rgba(244,63,94,0.2)] group-hover:shadow-[0_0_25px_rgba(244,63,94,0.4)] transition-all duration-300">
            D
          </div>
          <span className="font-serif italic text-2xl text-stone-900 hidden sm:inline tracking-wide font-medium">
            Dulhan
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-stone-600 hover:text-rose-800 transition-colors duration-300 font-semibold text-sm uppercase tracking-widest relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-rose-800 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/book-appointment" className="px-6 py-2.5 bg-rose-800 text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-rose-900 hover:shadow-[0_4px_15px_rgba(159,18,57,0.3)] transition-all duration-300 hover:-translate-y-0.5 ml-4">
            Book
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2 z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={`w-6 h-0.5 bg-rose-800 transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-rose-800 transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-rose-800 transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#FCFBF8]/95 backdrop-blur-2xl border-b border-rose-900/10 py-6 px-4 shadow-2xl z-40">
          <div className="flex flex-col gap-6 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-stone-700 hover:text-rose-800 transition-colors duration-300 text-lg uppercase tracking-widest font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/book-appointment" className="px-6 py-4 mt-4 bg-rose-800 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-rose-900 transition-colors shadow-lg" onClick={() => setMobileMenuOpen(false)}>
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

