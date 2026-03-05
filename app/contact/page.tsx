'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import SectionDivider from '../components/SectionDivider';
import config from '../config/config';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Star, ExternalLink } from 'lucide-react';

// export const metadata: Metadata = {
//   title: 'Contact Us | Dulhan Beauty Parlour',
//   description: 'Get in touch with Dulhan Beauty Parlour for appointments, inquiries, and more information about our beauty services.',
// };

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const mapsUrl = typeof config.business.contact.latitude === 'number' && typeof config.business.contact.longitude === 'number'
    ? `https://www.google.com/maps/search/?api=1&query=${config.business.contact.latitude},${config.business.contact.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.business.contact.address.replace(/\n/g, ' '))}`;

  const reviewUrl = config.business.contact.googlePlaceId
    ? `https://search.google.com/local/writereview?placeid=${config.business.contact.googlePlaceId}`
    : mapsUrl;

  return (
    <div className="bg-[#FCFBF8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-amber-50 text-stone-900 py-32 border-b border-rose-100/50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-rose-200/20 blur-[120px]"></div>
          <div className="absolute top-[60%] -left-[10%] w-[40%] h-[40%] rounded-full bg-amber-200/20 blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif italic mb-6 text-stone-900 tracking-tight">
            Contact <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-700 to-amber-600">Us</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-stone-600 font-medium">
            We'd love to hear from you. Experience the luxury of Dulhan by getting in touch today.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Information */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-rose-50">
            <h2 className="text-3xl font-serif italic mb-10 text-stone-900">Get in Touch</h2>

            <div className="space-y-10">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-100 transition-colors border border-rose-100">
                  <MapPin className="text-rose-700 w-6 h-6" aria-hidden />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-bold text-stone-400 mb-2">Location</h3>
                  <p className="text-stone-700 leading-relaxed font-medium">{config.business.contact.address}</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-100 transition-colors border border-rose-100">
                  <Phone className="text-rose-700 w-6 h-6" aria-hidden />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-bold text-stone-400 mb-2">Direct Line</h3>
                  <p className="text-stone-700 font-serif text-xl"><a href={`tel:${config.business.contact.phone}`} className="hover:text-rose-700 transition-colors">{config.business.contact.phone}</a></p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-100 transition-colors border border-rose-100">
                  <Mail className="text-rose-700 w-6 h-6" aria-hidden />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-bold text-stone-400 mb-2">Email Inquiries</h3>
                  <p className="text-stone-700"><a href={`mailto:${config.business.contact.email}`} className="hover:text-rose-700 transition-colors">{config.business.contact.email}</a></p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-100 transition-colors border border-rose-100">
                  <Clock className="text-rose-700 w-6 h-6" aria-hidden />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-bold text-stone-400 mb-2">Opening Hours</h3>
                  {config.business.contact.hours.map((line, index) => (
                    <div key={index} className="text-stone-700 mb-1">{line.day} <b className="font-semibold">{line.time}</b></div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100">
                <h3 className="text-sm uppercase tracking-widest font-bold text-stone-400 mb-4">Connect With Us</h3>
                <div className="flex gap-4">
                  <a href={config.business.social.facebook} target="_blank" rel="noreferrer" className="inline-flex w-12 h-12 bg-white border border-stone-200 text-stone-500 hover:text-rose-800 hover:border-rose-800 rounded-full items-center justify-center shadow-sm hover:shadow-md transition-all">
                    <Facebook className="w-5 h-5" aria-hidden />
                  </a>
                  <a href={config.business.social.instagram} target="_blank" rel="noreferrer" className="inline-flex w-12 h-12 bg-white border border-stone-200 text-stone-500 hover:text-rose-800 hover:border-rose-800 rounded-full items-center justify-center shadow-sm hover:shadow-md transition-all">
                    <Instagram className="w-5 h-5" aria-hidden />
                  </a>
                  <a href={config.business.social.twitter} target="_blank" rel="noreferrer" className="inline-flex w-12 h-12 bg-white border border-stone-200 text-stone-500 hover:text-rose-800 hover:border-rose-800 rounded-full items-center justify-center shadow-sm hover:shadow-md transition-all">
                    <Twitter className="w-5 h-5" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-8 md:mt-0">
            <h2 className="text-3xl font-serif italic mb-8 text-stone-900">Send us a Message</h2>
            <p className="text-stone-600 mb-10">Have a question about our bridal packages, training courses, or everyday services? Fill out the form below and our team will get back to you promptly.</p>

            {submitted && (
              <div className="mb-8 p-6 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center text-rose-800 shrink-0">✓</div>
                <div>
                  <h4 className="font-bold">Thank you!</h4>
                  <p className="text-sm text-rose-700">We've received your message and will reach out shortly.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-stone-600 text-sm font-semibold mb-2 uppercase tracking-wide">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 shadow-sm"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-stone-600 text-sm font-semibold mb-2 uppercase tracking-wide">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 shadow-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-stone-600 text-sm font-semibold mb-2 uppercase tracking-wide">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 shadow-sm"
                    placeholder={config.business.contact.phone}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-stone-600 text-sm font-semibold mb-2 uppercase tracking-wide">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 shadow-sm appearance-none"
                  >
                    <option value="">Select a subject</option>
                    <option value="appointment">Appointment Inquiry</option>
                    <option value="bridal">Bridal Package Inquiry</option>
                    <option value="services">Services Inquiry</option>
                    <option value="training">Training Courses</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-stone-600 text-sm font-semibold mb-2 uppercase tracking-wide">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-5 py-4 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 shadow-sm resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button type="submit" className="w-full py-4 px-8 bg-rose-800 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-rose-900 transition-all shadow-[0_5px_15px_rgba(159,18,57,0.3)] hover:-translate-y-1">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* Map Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-rose-700 font-bold tracking-widest uppercase text-sm mb-3 block">Visit Us</span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-stone-900">Find Us on the Map</h2>
          </div>
          <div className="w-full h-[500px] rounded-3xl overflow-hidden mt-8 shadow-lg border border-stone-100">
            {/* Responsive Google Maps embed (no API key) - prefers coordinates when available */}
            {typeof config.business.contact.latitude === 'number' && typeof config.business.contact.longitude === 'number' ? (
              <iframe
                title="Dulhan Beauty Parlour location"
                src={`https://www.google.com/maps?q=${config.business.contact.latitude},${config.business.contact.longitude}&z=15&output=embed`}
                className="w-full h-full border-0 grayscale-[20%] contrast-125 sepia-[10%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Map showing Dulhan Beauty Parlour location"
              />
            ) : (
              <iframe
                title="Dulhan Beauty Parlour location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(config.business.contact.address.replace(/\n/g, ' '))}&output=embed`}
                className="w-full h-full border-0 grayscale-[20%] contrast-125 sepia-[10%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Map showing Dulhan Beauty Parlour location"
              />
            )}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-stone-700 rounded-xl border border-stone-200 font-bold uppercase tracking-widest text-sm hover:border-rose-800 hover:text-rose-800 shadow-sm transition-all hover:-translate-y-1">
              <ExternalLink className="w-5 h-5" />
              <span>Open in Maps</span>
            </a>
            <a href={reviewUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-rose-800 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-rose-900 shadow-[0_5px_15px_rgba(159,18,57,0.3)] transition-all hover:-translate-y-1">
              <Star className="w-5 h-5 fill-current" />
              <span>Rate Your Visit</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
