'use client';

import { useState } from 'react';
import config from '../config/config';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Star, ExternalLink } from 'lucide-react';
import GoogleMap from '../components/GoogleMap';
import { useTenant } from '@/app/contexts/TenantContext';

export default function Contact() {
  const { tenantProfile } = useTenant();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    const baseUrl = (
      process.env.NEXT_PUBLIC_DRISTA_API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_URL?.replace(/\/v1\/?$/, '') ||
      'http://localhost:3000'
    ).replace(/\/+$/, '');
    const apiKey = process.env.NEXT_PUBLIC_DRISTA_API_KEY;

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (apiKey) headers['x-api-key'] = apiKey;

      const response = await fetch(`${baseUrl}/v1/contact/submit`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...formData, inquiryType: formData.subject || 'general' }),
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error || payload?.message || 'Failed to send message');

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err: any) {
      setSubmitError(err?.message || 'Unable to send your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const mapsUrl = `https://www.google.com/maps/place/BEAUTY+BLISS+(Dulhan+Beauty+Parlour+and+training+centre)/@25.4530387,83.7396613,15z/data=!4m6!3m5!1s0x398df9fc1e052409:0x9cc1a337e6a0ddcb!8m2!3d25.4530387!4d83.7396613!16s%2Fg%2F11st61hsl6`;
  const reviewUrl = `https://search.google.com/local/writereview?placeid=ChIJCSQFHvzp3TkRE92g5jejwaU`;

  return (
    <div className="bg-[#FCFBF8]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-amber-50 py-14 border-b border-rose-100/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif italic mb-2 text-stone-900 tracking-tight">
            Contact <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-700 to-amber-600">Us</span>
          </h1>
          <p className="text-base max-w-xl mx-auto text-stone-500">We'd love to hear from you — get in touch today.</p>
        </div>
      </section>

      {/* Info + Form */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">

          {/* Left — contact details */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-50 space-y-5 h-fit">
            <h2 className="text-xl font-serif italic text-stone-900">Get in Touch</h2>

            {[
              { 
                icon: <MapPin className="text-rose-700 w-4 h-4" />, 
                label: 'Location', 
                content: (
                  <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                    {tenantProfile?.contact_address ? (
                      <>
                        {tenantProfile.name}<br />
                        {tenantProfile.contact_address.line1}
                        {tenantProfile.contact_address.line2 && <br />}
                        {tenantProfile.contact_address.line2}
                        <br />
                        {tenantProfile.contact_address.city}, {tenantProfile.contact_address.state} {tenantProfile.contact_address.postal_code}
                      </>
                    ) : config.business.contact.address}
                  </p>
                )
              },
              { 
                icon: <Phone className="text-rose-700 w-4 h-4" />, 
                label: 'Direct Line', 
                content: (
                  <div className="flex flex-col gap-1">
                    {(tenantProfile?.contact_numbers?.length ? tenantProfile.contact_numbers : [config.business.contact.phone]).map((p, i) => (
                      <a key={i} href={`tel:${p}`} className="text-stone-700 text-sm font-medium hover:text-rose-700 transition-colors">
                        {p}
                      </a>
                    ))}
                  </div>
                )
              },
              { 
                icon: <Mail className="text-rose-700 w-4 h-4" />, 
                label: 'Email', 
                content: (
                  <div className="flex flex-col gap-1">
                    {(tenantProfile?.emails?.length ? tenantProfile.emails : [config.business.contact.email]).map((e, i) => (
                      <a key={i} href={`mailto:${e}`} className="text-stone-700 text-sm hover:text-rose-700 transition-colors">
                        {e}
                      </a>
                    ))}
                  </div>
                )
              },
              { icon: <Clock className="text-rose-700 w-4 h-4" />, label: 'Hours', content: <div className="space-y-0.5">{config.business.contact.hours.map((h, i) => <div key={i} className="text-stone-700 text-sm">{h.day} <span className="font-semibold">{h.time}</span></div>)}</div> },
            ].map(({ icon, label, content }) => (
              <div key={label} className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">{icon}</div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-0.5">{label}</p>
                  {content}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-stone-100">
              <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-3">Follow Us</p>
              <div className="flex gap-2">
                {[
                  { href: tenantProfile?.settings?.social?.facebook || config.business.social.facebook, icon: <Facebook className="w-4 h-4" /> },
                  { href: tenantProfile?.settings?.social?.instagram || config.business.social.instagram, icon: <Instagram className="w-4 h-4" /> },
                  { href: config.business.social.twitter, icon: <Twitter className="w-4 h-4" /> },
                ].map(({ href, icon }) => (
                  <a key={href} href={href} target="_blank" rel="noreferrer"
                    className="w-9 h-9 bg-white border border-stone-200 text-stone-500 hover:text-rose-800 hover:border-rose-800 rounded-full flex items-center justify-center shadow-sm transition-all">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <h2 className="text-xl font-serif italic text-stone-900 mb-4">Send a Message</h2>

            {submitted && (
              <div className="mb-4 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-center gap-3 text-sm">
                <div className="w-7 h-7 rounded-full bg-rose-200 flex items-center justify-center shrink-0 text-xs">✓</div>
                <div><span className="font-bold">Thank you! </span>We'll reach out shortly.</div>
              </div>
            )}

            {submitError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm font-semibold">{submitError}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-1.5">Name *</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 text-sm shadow-sm"
                    placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-1.5">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 text-sm shadow-sm"
                    placeholder="your@email.com" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-1.5">Phone *</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 text-sm shadow-sm"
                    placeholder={tenantProfile?.phone || config.business.contact.phone} />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-1.5">Subject *</label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 text-sm shadow-sm appearance-none">
                    <option value="">Select…</option>
                    <option value="appointment">Appointment</option>
                    <option value="bridal">Bridal Package</option>
                    <option value="services">Services</option>
                    <option value="training">Training</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-1.5">Message *</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 text-sm shadow-sm resize-none"
                  placeholder="Tell us how we can help..." />
              </div>

              <button type="submit" disabled={isSubmitting}
                className="w-full py-3.5 px-8 bg-rose-800 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-rose-900 transition-all shadow-[0_4px_12px_rgba(159,18,57,0.25)] hover:-translate-y-0.5 disabled:bg-rose-400 disabled:cursor-not-allowed">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map */}
      <section className="py-10 bg-white border-t border-stone-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-serif italic text-stone-900">Find Us</h2>
            <div className="flex gap-2">
              <a href={mapsUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-stone-600 rounded-lg border border-stone-200 font-bold uppercase tracking-widest text-xs hover:border-rose-800 hover:text-rose-800 shadow-sm transition-all">
                <ExternalLink className="w-3.5 h-3.5" /> Open in Maps
              </a>
              <a href={reviewUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-800 text-white rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-rose-900 shadow-sm transition-all">
                <Star className="w-3.5 h-3.5 fill-current" /> Rate Us
              </a>
            </div>
          </div>
          <div className="w-full h-72 rounded-2xl overflow-hidden shadow-md border border-stone-100">
            <GoogleMap
              lat={config.business.contact.latitude as number}
              lng={config.business.contact.longitude as number}
              zoom={16}
              markerTitle={tenantProfile?.name || config.business.name}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
