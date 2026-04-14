"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import config from '../config/config';
import { useTenant } from '@/app/contexts/TenantContext';
import { getDristaServiceItems } from '@/lib/dristaService';

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const BASE_NAV: NavItem[] = [
  { label: 'Home', href: '/#home' },
  { label: 'About Us', href: '/#about' },
  { label: 'Services', href: '/services', children: [] }, // children populated dynamically
  { label: 'Gallery', href: '/#gallery' },
  {
    label: 'Courses',
    children: [
      { label: 'Professional Makeup Course', href: '/training/professional-makeup' },
      { label: 'Advanced Beautician Course', href: '/training/advanced-beautician' },
    ],
  },
  { label: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const { tenantProfile } = useTenant();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenIdx, setMobileOpenIdx] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);
  const [navItems, setNavItems] = useState<NavItem[]>(BASE_NAV);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setVisible(currentY <= lastScrollY.current || currentY <= 80 || mobileMenuOpen);
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  useEffect(() => { if (mobileMenuOpen) setVisible(true); }, [mobileMenuOpen]);

  useEffect(() => {
    const fetchServices = async () => {
      const items = await getDristaServiceItems();
      if (!items || items.length === 0) return;

      const children = items
        .filter((item: any) => item.is_active !== false && item.name)
        .map((item: any) => ({
          label: item.name as string,
          href: `/book-appointment?service=${encodeURIComponent(item.name)}`,
        }));

      if (children.length === 0) return;

      setNavItems(prev => prev.map(nav =>
        nav.label === 'Services' ? { ...nav, children } : nav
      ));
    };

    fetchServices();
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50`}
      animate={{ y: visible ? 0 : '-100%' }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as any }}
    >
      {/* Top info bar */}
      <div className="bg-stone-900 text-stone-300 text-xs">
        <div className="container mx-auto px-4 h-9 flex items-center justify-between">
          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a href={tenantProfile?.settings?.social?.facebook || config.business.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href={tenantProfile?.settings?.social?.instagram || config.business.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="hover:text-white transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
          {/* Contact */}
          <div className="flex items-center gap-6 font-medium tracking-wide">
            <span>Phone: <a href={`tel:${tenantProfile?.phone || config.business.contact.phone}`} className="hover:text-white transition-colors">{tenantProfile?.phone || config.business.contact.phone}</a></span>
            <span>Email: <a href={`mailto:${tenantProfile?.email || config.business.contact.email}`} className="hover:text-white transition-colors">{tenantProfile?.email || config.business.contact.email}</a></span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-rose-100 shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-400 via-rose-500 to-amber-500 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-[0_0_15px_rgba(244,63,94,0.2)] group-hover:shadow-[0_0_25px_rgba(244,63,94,0.4)] transition-all duration-300">
              {tenantProfile?.name ? tenantProfile.name.charAt(0) : 'D'}
            </div>
            <span className="font-serif italic text-xl text-stone-900 hidden sm:inline tracking-wide font-medium">
              {tenantProfile?.name || config.business.name}
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, idx) =>
            item.children ? (
              /* Dropdown item */
              <motion.div
                key={item.label}
                className="relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + idx * 0.06, ease: 'easeOut' }}
              >
                {item.href ? (
                  <Link href={item.href} className="flex items-center gap-1 px-4 py-2 text-stone-600 hover:text-rose-800 font-semibold text-xs uppercase tracking-widest transition-colors duration-200 rounded-md hover:bg-rose-50">
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>
                ) : (
                  <button className="flex items-center gap-1 px-4 py-2 text-stone-600 hover:text-rose-800 font-semibold text-xs uppercase tracking-widest transition-colors duration-200 rounded-md hover:bg-rose-50">
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                )}

                {/* Dropdown panel */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                  <div className="bg-white border border-rose-100 rounded-2xl shadow-xl shadow-rose-900/10 overflow-hidden py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-5 py-3 text-xs font-bold uppercase tracking-widest text-stone-600 hover:text-rose-800 hover:bg-rose-50 transition-colors duration-150"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + idx * 0.06, ease: 'easeOut' }}
              >
                <Link
                  href={item.href!}
                  className="block px-4 py-2 text-stone-600 hover:text-rose-800 font-semibold text-xs uppercase tracking-widest transition-colors duration-200 rounded-md hover:bg-rose-50 relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[1.5px] after:bg-rose-800 after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
                >
                  {item.label}
                </Link>
              </motion.div>
            )
          )}

          <Link
            href="/book-appointment"
            className="ml-4 px-6 py-2.5 bg-rose-800 text-white rounded-full font-bold text-xs tracking-widest uppercase hover:bg-rose-900 hover:shadow-[0_4px_15px_rgba(159,18,57,0.3)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2 z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={`w-6 h-0.5 bg-rose-800 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-rose-800 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-rose-800 transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'} bg-white/95 backdrop-blur-2xl border-b border-rose-100`}
      >
        <div className="px-4 pb-6 pt-2 flex flex-col gap-1">
          {navItems.map((item, idx) =>
            item.children ? (
              <div key={item.label}>
                <button
                  onClick={() => setMobileOpenIdx(mobileOpenIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-4 py-3 text-stone-700 font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-rose-50 transition-colors"
                >
                  {item.label}
                  <ChevronDown className={`w-4 h-4 text-rose-700 transition-transform duration-200 ${mobileOpenIdx === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${mobileOpenIdx === idx ? 'max-h-80' : 'max-h-0'}`}>
                  <div className="ml-4 flex flex-col gap-1 py-1 border-l-2 border-rose-100 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-xs font-bold uppercase tracking-widest text-stone-600 hover:text-rose-800 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-stone-700 font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-rose-50 hover:text-rose-800 transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/book-appointment"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-3 px-6 py-4 bg-rose-800 text-white rounded-xl font-bold uppercase tracking-widest text-sm text-center hover:bg-rose-900 transition-colors shadow-lg"
          >
            Book Appointment
          </Link>
        </div>
      </div>
      </div>{/* end main nav wrapper */}
    </motion.header>
  );
}
