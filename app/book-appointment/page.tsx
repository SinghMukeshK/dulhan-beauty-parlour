'use client';

import { useState } from 'react';
import SectionDivider from '../components/SectionDivider';
// import { config } from '../../config';

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const services = [
    'Bridal Makeup',
    'Manicure',
    'Pedicure',
    'Facial',
    'Threading',
    'Waxing',
    'Hair Cutting',
    'Hair Spa',
    'Hair Coloring',
    'Makeup Lesson',
    'Nail Art',
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the booking to a backend
    console.log('Booking submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', service: '', date: '', time: '', notes: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="bg-[#FCFBF8] min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-amber-50 text-stone-900 py-32 border-b border-rose-100/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-rose-200/20 blur-[120px]"></div>
          <div className="absolute top-[60%] -left-[10%] w-[40%] h-[40%] rounded-full bg-amber-200/20 blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif italic mb-6 text-stone-900 tracking-tight">
            Reserve Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-700 to-amber-600">Sanctuary</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-stone-600 font-medium">
            Schedule your personalized beauty experience. An easy, elegant booking process for our esteemed guests.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          {submitted && (
            <div className="mb-10 p-8 bg-rose-50 border border-rose-200 text-rose-800 rounded-3xl text-center shadow-sm">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-rose-600 text-3xl mx-auto mb-4 italic font-serif shadow-sm">✓</div>
              <h3 className="text-2xl font-serif italic mb-2">Reservation Confirmed!</h3>
              <p className="text-stone-600">We'll send you an official confirmation shortly. Thank you for choosing Dulhan Beauty.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-rose-900/5 border border-rose-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-rose-700 via-rose-500 to-amber-500"></div>

            {/* Personal Information */}
            <div className="mb-12">
              <h3 className="text-2xl font-serif italic text-stone-900 mb-8 border-b border-stone-100 pb-4">1. Guest Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-2">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-[#FCFBF8] border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800"
                    placeholder="Your Full Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-2">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-[#FCFBF8] border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-[#FCFBF8] border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800"
                    placeholder="+91..."
                  />
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-serif italic text-stone-900 mb-8 border-b border-stone-100 pb-4">2. Service Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="service" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-2">Desired Service *</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-[#FCFBF8] border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 appearance-none"
                  >
                    <option value="">Select an experience</option>
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-2">Select Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={minDate}
                    className="w-full px-5 py-4 bg-[#FCFBF8] border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 text-center"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-2">Preferred Time *</label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-[#FCFBF8] border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 appearance-none text-center"
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-serif italic text-stone-900 mb-8 border-b border-stone-100 pb-4">3. Final Touches</h3>
              <label htmlFor="notes" className="block text-stone-500 text-xs font-bold uppercase tracking-widest mb-2">Special Requests (Optional)</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-5 py-4 bg-[#FCFBF8] border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-800 focus:border-rose-800 transition-all text-stone-800 resize-none"
                placeholder="Any special requests, preferences, or allergies? Let us know here..."
              />
            </div>

            <button type="submit" className="w-full py-5 px-8 bg-rose-800 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-rose-900 transition-all shadow-[0_5px_15px_rgba(159,18,57,0.3)] hover:-translate-y-1 mb-6">
              Confirm Reservation
            </button>

            <p className="text-center text-stone-500 text-sm">
              By confirming, you agree to our salon policies and terms.
            </p>
          </form>

          {/* FAQ Section */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <span className="text-rose-700 font-bold tracking-widest uppercase text-sm mb-3 block">Before You Book</span>
              <h2 className="text-4xl font-serif italic text-stone-900">Common Questions</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: 'How far in advance should I book?',
                  a: 'We recommend booking at least 24 hours in advance. For full bridal packages, we strongly suggest reserving your date 4-8 weeks ahead.'
                },
                {
                  q: 'What is your cancellation policy?',
                  a: 'We respectfully request at least 24 hours notice for cancellations. Late cancellations may be subject to a 50% cancellation fee.'
                },
                {
                  q: 'Do you offer premium gift certificates?',
                  a: 'Absolutely! Our luxury gift certificates are available for any amount or specific packages, beautifully packaged for gifting.'
                },
                {
                  q: 'Are walk-ins accommodated?',
                  a: 'Walk-ins are welcomed subject to our daily availability. However, securing a reservation in advance guarantees your premium experience.'
                },
              ].map((item, index) => (
                <details key={index} className="group bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:border-rose-200 transition-colors cursor-pointer">
                  <summary className="font-bold text-stone-800 group-open:text-rose-800 select-none outline-none">
                    {item.q}
                  </summary>
                  <p className="text-stone-600 mt-4 leading-relaxed pt-4 border-t border-stone-100">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
