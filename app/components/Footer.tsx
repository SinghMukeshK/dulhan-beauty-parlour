import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Store,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

import config from '../config/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FCFBF8] text-stone-600 border-t border-stone-200 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-100/30 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 text-sm">

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-serif italic text-2xl text-stone-900">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/" className="hover:text-rose-700 transition-colors duration-300 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-rose-400/50"></span>Home</Link></li>
              <li><Link href="/services" className="hover:text-rose-700 transition-colors duration-300 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-rose-400/50"></span>Services</Link></li>
              <li><Link href="/contact" className="hover:text-rose-700 transition-colors duration-300 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-rose-400/50"></span>Contact Us</Link></li>
              <li><Link href="/book-appointment" className="hover:text-rose-700 transition-colors duration-300 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-rose-400/50"></span>Book Appointment</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-6">
            <h4 className="font-serif italic text-2xl text-stone-900">Our Services</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/services" className="hover:text-rose-700 transition-colors duration-300 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-rose-400/50"></span>Bridal Makeup</Link></li>
              <li><Link href="/services" className="hover:text-rose-700 transition-colors duration-300 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-rose-400/50"></span>Hair Care</Link></li>
              <li><Link href="/services" className="hover:text-rose-700 transition-colors duration-300 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-rose-400/50"></span>Skincare</Link></li>
              <li><Link href="/services" className="hover:text-rose-700 transition-colors duration-300 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-rose-400/50"></span>Nail Care</Link></li>
              <li><Link href="/services" className="hover:text-rose-700 transition-colors duration-300 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-rose-400/50"></span>Threading & Waxing</Link></li>
              <li><Link href="/contact" className="hover:text-rose-700 transition-colors duration-300 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-rose-400/50"></span>Special Events</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-6">
            <h4 className="font-serif italic text-2xl text-stone-900">Contact Us</h4>

            <div className="flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-100 transition-colors border border-rose-100">
                <MapPin size={18} className="text-rose-700" />
              </div>
              <p className="text-stone-600 leading-relaxed pt-1">
                {config.business.name}<br />
                {config.business.contact.address}
              </p>
            </div>

            <div className="flex gap-4 items-start mt-6 group">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-100 transition-colors border border-rose-100">
                <Store size={18} className="text-rose-700" />
              </div>
              <div className="text-stone-600 pt-1 flex flex-col gap-1">
                <span className="hover:text-rose-700 transition-colors cursor-pointer">Salon Locator</span>
                <span className="hover:text-rose-700 transition-colors cursor-pointer">Appointments</span>
              </div>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="space-y-6">
            <h4 className="font-serif italic text-2xl text-stone-900">Get in Touch</h4>

            <div className="flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-100 transition-colors border border-rose-100">
                <Phone size={18} className="text-rose-700" />
              </div>
              <p className="text-stone-800 pt-2 font-serif text-lg">{config.business.contact.phone}</p>
            </div>

            <div className="flex gap-4 items-start group mb-8">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-100 transition-colors border border-rose-100">
                <Mail size={18} className="text-rose-700" />
              </div>
              <p className="text-stone-600 pt-2 hover:text-rose-700 transition-colors cursor-pointer">{config.business.contact.email}</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href={config.business.social.instagram} aria-label="Instagram" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-rose-800 hover:border-rose-800 hover:text-white transition-all duration-300 text-stone-400 bg-white">
                <Instagram size={18} />
              </a>
              <a href={config.business.social.facebook} aria-label="Facebook" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-rose-800 hover:border-rose-800 hover:text-white transition-all duration-300 text-stone-400 bg-white">
                <Facebook size={18} />
              </a>
              <a href={config.business.social.twitter} aria-label="X" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-rose-800 hover:border-rose-800 hover:text-white transition-all duration-300 text-stone-400 bg-white">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-rose-800 hover:border-rose-800 hover:text-white transition-all duration-300 text-stone-400 bg-white">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-stone-200 bg-white">
        <div className="container mx-auto px-4 py-8 flex items-center justify-between flex-wrap gap-4 text-xs text-stone-500 uppercase tracking-widest font-semibold">
          <p>&copy; {currentYear} Dulhan Beauty Parlour. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-rose-800 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-rose-800 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>

      {/* Floating Action WhatsApp */}
      <div className="hidden md:flex fixed bottom-8 right-8 z-50">
        <a
          href={`https://wa.me/918936076541`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white shadow-[0_10px_30px_rgba(34,197,94,0.4)] hover:shadow-[0_10px_40px_rgba(34,197,94,0.6)] hover:-translate-y-1 transition-all duration-300"
          title="Chat with us on WhatsApp"
        >
          <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-20 animate-ping"></div>
          <span className="text-3xl relative z-10">💬</span>
        </a>
      </div>

      {/* Mobile sticky action bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-stone-200 z-50 py-3 px-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between gap-3">
          <Link href="/book-appointment" className="flex-1 bg-rose-800 text-white rounded-xl py-3.5 text-center font-bold tracking-widest uppercase text-sm shadow-[0_5px_15px_rgba(159,18,57,0.2)]">Book Now</Link>
          <a href={`https://wa.me/918936076541`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-600 text-white rounded-xl py-3.5 text-center font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2">
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
