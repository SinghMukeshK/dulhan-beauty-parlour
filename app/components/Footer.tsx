"use client";

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
import { useTenant } from "@/app/contexts/TenantContext";

export default function Footer() {
  const { tenantProfile } = useTenant();
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
              <div className="flex flex-col">
                <p className="text-stone-600 leading-relaxed pt-1">
                  {tenantProfile?.name || config.business.name}<br />
                  {tenantProfile?.contact_address ? (
                    <>
                      {tenantProfile.contact_address.line1}
                      {tenantProfile.contact_address.line2 && <br />}
                      {tenantProfile.contact_address.line2}
                      <br />
                      {tenantProfile.contact_address.city}, {tenantProfile.contact_address.state} {tenantProfile.contact_address.postal_code}
                      <br />
                      {tenantProfile.contact_address.country}
                    </>
                  ) : config.business.contact.address}
                </p>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=BEAUTY+BLISS+(Dulhan+Beauty+Parlour+and+training+centre)&destination_place_id=ChIJCSQFHvzp3TkRE92g5jejwaU`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-rose-700 font-bold hover:underline inline-flex items-center gap-1"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start mt-6 group">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-100 transition-colors border border-rose-100">
                <Store size={18} className="text-rose-700" />
              </div>
              <div className="text-stone-600 pt-1 flex flex-col gap-1">
                <a 
                  href="https://www.google.com/maps/place/BEAUTY+BLISS+(Dulhan+Beauty+Parlour+and+training+centre)/@25.4530387,83.7396613,15z/data=!4m6!3m5!1s0x398df9fc1e052409:0x9cc1a337e6a0ddcb!8m2!3d25.4530387!4d83.7396613!16s%2Fg%2F11st61hsl6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose-700 transition-colors"
                >
                  Salon Locator
                </a>
                <Link href="/book-appointment" className="hover:text-rose-700 transition-colors">Appointments</Link>
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
              <p className="text-stone-800 pt-2 font-serif text-lg">{tenantProfile?.phone || config.business.contact.phone}</p>
            </div>

            <div className="flex gap-4 items-start group mb-8">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-100 transition-colors border border-rose-100">
                <Mail size={18} className="text-rose-700" />
              </div>
              <p className="text-stone-600 pt-2 hover:text-rose-700 transition-colors cursor-pointer">{tenantProfile?.email || config.business.contact.email}</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href={tenantProfile?.settings?.social?.instagram || config.business.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-rose-800 hover:border-rose-800 hover:text-white transition-all duration-300 text-stone-400 bg-white">
                <Instagram size={18} />
              </a>
              <a href={tenantProfile?.settings?.social?.facebook || config.business.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-rose-800 hover:border-rose-800 hover:text-white transition-all duration-300 text-stone-400 bg-white">
                <Facebook size={18} />
              </a>
              <a href={config.business.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-rose-800 hover:border-rose-800 hover:text-white transition-all duration-300 text-stone-400 bg-white">
                <Twitter size={18} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-rose-800 hover:border-rose-800 hover:text-white transition-all duration-300 text-stone-400 bg-white">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-stone-200 bg-white">
        <div className="container mx-auto px-4 py-8 flex items-center justify-between flex-wrap gap-4 text-[10px] md:text-xs text-stone-500 uppercase tracking-widest font-semibold text-center md:text-left">
          <p className="w-full md:w-auto">&copy; {currentYear} {tenantProfile?.name || config.business.name}. All rights reserved.</p>
          <div className="flex gap-6 w-full md:w-auto justify-center md:justify-start">
            {/* <span className="hover:text-rose-800 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-rose-800 cursor-pointer transition-colors">Terms of Service</span> */}
          </div>
          <p className="w-full md:w-auto mt-2 md:mt-0 opacity-80">
            Designed and developed by <a href="https://drista.in" target="_blank" rel="noopener noreferrer" className="text-rose-700 hover:text-rose-900 transition-colors border-b border-rose-200 hover:border-rose-900 pb-0.5">Drista Cloud Solutions</a>
          </p>
        </div>
      </div>



      {/* Mobile sticky action bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-stone-200 z-50 py-3 px-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between gap-3">
          <Link href="/book-appointment" className="flex-1 bg-rose-800 text-white rounded-xl py-3.5 text-center font-bold tracking-widest uppercase text-sm shadow-[0_5px_15px_rgba(159,18,57,0.2)]">Book Now</Link>
          <a href={`https://wa.me/${(tenantProfile?.phone || config.business.contact.phone).replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-600 text-white rounded-xl py-3.5 text-center font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2">
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
