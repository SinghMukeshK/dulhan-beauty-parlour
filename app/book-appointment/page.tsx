'use client';

import { useEffect, useState } from 'react';
import { getDristaServiceItems, submitAppointment } from '@/lib/dristaService';

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: '',
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  type ServiceItem = {
    name: string;
    description?: string;
    selling_price?: string | number;
    image_url?: string;
  };

  const FALLBACK_SERVICES: ServiceItem[] = [
    { name: 'Bridal Makeup' }, { name: 'Manicure' }, { name: 'Pedicure' },
    { name: 'Facial' }, { name: 'Threading' }, { name: 'Waxing' },
    { name: 'Hair Cutting' }, { name: 'Hair Spa' }, { name: 'Hair Coloring' },
    { name: 'Makeup Lesson' }, { name: 'Nail Art' },
  ];

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const items = await getDristaServiceItems();
        if (!items || items.length === 0) {
          setServices(FALLBACK_SERVICES);
          return;
        }

        const mappedItems: ServiceItem[] = items
          .filter((item: any) => item.is_active !== false && item.name)
          .map((item: any) => ({
            name: item.name as string,
            description: item.description as string | undefined,
            selling_price: item.selling_price,
            image_url: item.images?.find((img: any) => img.is_primary)?.url
              || item.images?.[0]?.url,
          }));

        setServices(mappedItems.length > 0 ? mappedItems : FALLBACK_SERVICES);
      } catch (err: any) {
        console.warn('[BookAppointment] Services fetch failed:', err?.message);
        setServices(FALLBACK_SERVICES);
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const serviceParam = new URLSearchParams(window.location.search).get('service');
    if (serviceParam) setSelectedServices([serviceParam]);
  }, []);

  const toggleService = (name: string) => {
    setSelectedServices(prev =>
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  };

  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSuccessMessage('');

    if (selectedServices.length === 0) {
      setSubmitError('Please select at least one service before confirming.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = await submitAppointment({ ...formData, service: selectedServices.join(', ') });

      setSubmitted(true);
      setSuccessMessage(payload?.message || 'Your appointment has been captured successfully.');
      setFormData({ name: '', email: '', phone: '', date: '', time: '', notes: '' });
      setSelectedServices([]);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error: any) {
      setSubmitError(error?.message || 'Unable to submit your booking. Please try again.');
      console.error('[BookAppointment] submit error', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const totalPrice = selectedServices.reduce((sum, name) => {
    const svc = services.find(s => s.name === name);
    return sum + (svc?.selling_price ? Number(svc.selling_price) : 0);
  }, 0);

  return (
    <div className="bg-[#FCFBF8] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-amber-50 py-16 border-b border-rose-100/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif italic mb-3 text-stone-900 tracking-tight">
            Reserve Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-700 to-amber-600">Sanctuary</span>
          </h1>
          <p className="text-base max-w-xl mx-auto text-stone-500">
            Schedule your personalized beauty experience with our simple booking form.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">

          {submitError && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-900 rounded-2xl text-center text-sm font-semibold">
              {submitError}
            </div>
          )}

          {submitted && successMessage && (
            <div className="mb-6 p-6 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-rose-600 text-xl mx-auto mb-3 shadow-sm">✓</div>
              <h3 className="text-xl font-serif italic mb-1">Reservation Confirmed!</h3>
              <p className="text-stone-600 text-sm">{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-lg shadow-rose-900/5 border border-rose-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-700 via-rose-500 to-amber-500" />

            {/* 1. Guest Information */}
            <div className="mb-8">
              <h3 className="text-lg font-serif italic text-stone-900 mb-5 border-b border-stone-100 pb-3">1. Guest Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-1.5">Full Name *</label>
                  <input
                    type="text" id="name" name="name" value={formData.name}
                    onChange={handleChange} required
                    className="w-full px-4 py-3 bg-[#FCFBF8] border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 text-sm"
                    placeholder="Your Full Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-1.5">Email Address *</label>
                  <input
                    type="email" id="email" name="email" value={formData.email}
                    onChange={handleChange} required
                    className="w-full px-4 py-3 bg-[#FCFBF8] border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-1.5">Phone Number *</label>
                  <input
                    type="tel" id="phone" name="phone" value={formData.phone}
                    onChange={handleChange} required
                    className="w-full px-4 py-3 bg-[#FCFBF8] border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 text-sm"
                    placeholder="+91..."
                  />
                </div>
              </div>
            </div>

            {/* 2. Service Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-5 border-b border-stone-100 pb-3">
                <h3 className="text-lg font-serif italic text-stone-900">2. Select Services</h3>
                {selectedServices.length > 0 && (
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full">
                    {selectedServices.length} selected
                    {totalPrice > 0 && ` · ₹${totalPrice.toLocaleString('en-IN')}`}
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-400 mb-3">Tap to select one or more services</p>

              {servicesLoading ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-stone-100 rounded-xl h-24" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {services.map((svc) => {
                    const selected = selectedServices.includes(svc.name);
                    return (
                      <button
                        key={svc.name}
                        type="button"
                        onClick={() => toggleService(svc.name)}
                        className={`relative flex flex-col rounded-xl border-2 overflow-hidden text-left transition-all focus:outline-none focus:ring-2 focus:ring-rose-800 ${
                          selected ? 'border-rose-700 shadow-md shadow-rose-900/10 bg-rose-50/30' : 'border-stone-200 hover:border-rose-300'
                        }`}
                      >
                        {svc.image_url ? (
                          <img src={svc.image_url} alt={svc.name} className="w-full h-16 object-cover" />
                        ) : (
                          <div className="w-full h-16 bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center text-2xl">💄</div>
                        )}
                        <div className="p-2">
                          <p className="text-xs font-bold text-stone-800 leading-snug">{svc.name}</p>
                          {svc.selling_price && Number(svc.selling_price) > 0 && (
                            <p className="text-[10px] text-rose-700 font-semibold mt-0.5">₹{Number(svc.selling_price).toLocaleString('en-IN')}</p>
                          )}
                        </div>
                        {selected && (
                          <span className="absolute top-1.5 right-1.5 bg-rose-700 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center leading-none">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Selected services summary chips */}
              {selectedServices.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedServices.map(name => (
                    <span
                      key={name}
                      className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full"
                    >
                      {name}
                      <button
                        type="button"
                        onClick={() => toggleService(name)}
                        className="text-rose-600 hover:text-rose-900 leading-none"
                        aria-label={`Remove ${name}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {!servicesLoading && selectedServices.length === 0 && (
                <p className="text-xs text-rose-600 mt-2">Please select at least one service to continue.</p>
              )}
            </div>

            {/* 3. Date & Time */}
            <div className="mb-8">
              <h3 className="text-lg font-serif italic text-stone-900 mb-5 border-b border-stone-100 pb-3">3. Date &amp; Time</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-1.5">Select Date *</label>
                  <input
                    type="date" id="date" name="date" value={formData.date}
                    onChange={handleChange} required min={minDate}
                    className="w-full px-4 py-3 bg-[#FCFBF8] border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 text-sm text-center"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-1.5">Preferred Time *</label>
                  <select
                    id="time" name="time" value={formData.time}
                    onChange={handleChange} required
                    className="w-full px-4 py-3 bg-[#FCFBF8] border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 text-sm appearance-none"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Notes */}
            <div className="mb-6">
              <h3 className="text-lg font-serif italic text-stone-900 mb-5 border-b border-stone-100 pb-3">4. Final Touches</h3>
              <label htmlFor="notes" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-1.5">Special Requests (Optional)</label>
              <textarea
                id="notes" name="notes" value={formData.notes}
                onChange={handleChange} rows={3}
                className="w-full px-4 py-3 bg-[#FCFBF8] border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 text-sm resize-none"
                placeholder="Any special requests, preferences, or allergies..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-8 bg-rose-800 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-rose-900 transition-all shadow-[0_4px_12px_rgba(159,18,57,0.25)] hover:-translate-y-0.5 mb-4 disabled:cursor-not-allowed disabled:bg-rose-400"
            >
              {isSubmitting ? 'Sending...' : 'Confirm Reservation'}
            </button>

            <p className="text-center text-stone-400 text-xs">By confirming, you agree to our salon policies and terms.</p>
          </form>

          {/* FAQ */}
          <div className="mt-12">
            <div className="text-center mb-6">
              <span className="text-rose-700 font-bold tracking-widest uppercase text-xs mb-2 block">Before You Book</span>
              <h2 className="text-2xl font-serif italic text-stone-900">Common Questions</h2>
            </div>
            <div className="space-y-2">
              {[
                { q: 'How far in advance should I book?', a: 'We recommend booking at least 24 hours in advance. For bridal packages, reserve 4–8 weeks ahead.' },
                { q: 'What is your cancellation policy?', a: 'Please give at least 24 hours notice. Late cancellations may incur a 50% fee.' },
                { q: 'Do you offer gift certificates?', a: 'Yes! Gift certificates are available for any amount or specific package, beautifully packaged.' },
                { q: 'Are walk-ins accommodated?', a: 'Walk-ins are welcome subject to availability, but a reservation guarantees your experience.' },
              ].map((item, index) => (
                <details key={index} className="group bg-white border border-stone-200 rounded-xl p-4 shadow-sm hover:border-rose-200 transition-colors cursor-pointer">
                  <summary className="font-bold text-stone-800 text-sm group-open:text-rose-800 select-none outline-none">{item.q}</summary>
                  <p className="text-stone-500 text-sm mt-3 leading-relaxed pt-3 border-t border-stone-100">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
