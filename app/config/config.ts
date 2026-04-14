/**
 * Dulhan Beauty - Configuration File
 * 
 * Edit this file to quickly customize your beauty salon website
 * without modifying component files.
 */

export const config = {
  // Business Information
  business: {
    name: 'Dulhan Beauty Parlour',
    owner: 'Vandana Singh',
    tagline: 'Premium Beauty Services',
    description: 'Experience luxury beauty treatments in our state-of-the-art salon.',
    
    // Contact Information
    contact: {
      email: 'hello@dulhanbeautyparlour.in',
      phone: '+91 98911 03958',
      whatsApp: '+918936076541',
      address: 'Du Du Singh, Mantri Ji ke Katra,\nSatramganj Bazar,\nBhadaura, Uttar Pradesh 232333\nIndia',
      // GPS coordinates (latitude, longitude)
      latitude: 25.4530387,
      longitude: 83.7396613, 
      // Optional Google Business Place ID (leave blank to use address search)
      googlePlaceId: 'ChIJCSQFHvzp3TkRE92g5jejwaU',
      
      // Business Hours
      hours: [
        { day: 'Monday - Friday', time: '10am - 8pm' },
        { day: 'Saturday', time: '10am - 6pm' },
        { day: 'Sunday', time: '12pm - 6pm' },
      ],
    },
    
    // Social Media Links
    social: {
      facebook: 'https://facebook.com/dulhanbeauty',
      instagram: 'https://instagram.com/dulhanbeauty',
      twitter: 'https://twitter.com/dulhanbeauty',
    },
  },

  // Services
  services: [
    {
      icon: 'MakeupIcon',
      title: 'Bridal Makeup',
      description: 'Bespoke bridal makeup tailored to your skin tone and wedding style — includes a trial, long-wear products and on-day touch-ups so you stay radiant from ceremony to reception.',
      price: '$150+',
      category: 'makeup',
    },
    {
      icon: 'NailIcon',
      title: 'Manicure',
      description: 'Luxury manicure with nail shaping, cuticle care, hydrating treatment and your choice of premium polish or custom nail art for a polished, long-lasting finish.',
      price: '$30',
      category: 'nails',
    },
    {
      icon: 'FootIcon',
      title: 'Pedicure',
      description: 'Soothing pedicure including exfoliation, nail care, hydrating mask and a relaxing foot massage to leave feet soft and rejuvenated.',
      price: '$40',
      category: 'nails',
    },
    {
      icon: 'FacialIcon',
      title: 'Facial',
      description: 'Results-driven facials using professional-grade products — choose from brightening, hydrating, anti-acne or anti-aging treatments customized to your skin’s needs.',
      price: '$60',
      category: 'skincare',
    },
    {
      icon: 'ThreadingIcon',
      title: 'Threading',
      description: 'Gentle, precise threading for eyebrow shaping and facial hair removal that creates clean, natural-looking lines without harsh chemicals.',
      price: '$15',
      category: 'waxing',
    },
    {
      icon: 'WaxIcon',
      title: 'Waxing',
      description: 'Quick, hygienic waxing using premium products for smooth, long-lasting results — options from brows and bikini to full-body treatments.',
      price: '$25+',
      category: 'waxing',
    },
    {
      icon: 'ScissorsIcon',
      title: 'Hair Cutting',
      description: 'Precision cutting and styling by experienced stylists — includes consultation, personalized cut and finishing to suit your lifestyle and face shape.',
      price: '$40',
      category: 'hair',
    },
    {
      icon: 'SpaIcon',
      title: 'Hair Spa',
      description: 'Nourishing hair spa with deep conditioning masks, steam and scalp massage to restore shine, strength and manageability.',
      price: '$50',
      category: 'hair',
    },
    {
      icon: 'PackageIcon',
      title: 'Bridal Package',
      description: 'Comprehensive bridal package combining makeup, hair styling and pre-bridal skincare consultations to create a cohesive, picture-perfect wedding look.',
      price: '$300+',
      category: 'packages',
    },
  ],

  // Testimonials
  testimonials: [
    {
      name: 'Sarah Johnson',
      role: 'Bride',
      testimonial: 'Dulhan made me feel beautiful on my wedding day. The makeup was flawless and lasted all day!',
      rating: 5,
    },
    {
      name: 'Emily Davis',
      role: 'Regular Client',
      testimonial: 'Professional, friendly, and always provides excellent service. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Jessica Wilson',
      role: 'Event Client',
      testimonial: 'The team was incredibly helpful for my engagement party. Worth every penny!',
      rating: 5,
    },
  ],

  // Features / Why Choose Us
  features: [
    {
      icon: 'UserCheck',
      title: 'Expert Staff',
      description: 'Certified professionals with years of experience',
    },
    {
      icon: 'Package',
      title: 'Premium Products',
      description: 'Only best quality, cruelty-free products',
    },
    {
      icon: 'ShieldCheck',
      title: 'Hygienic',
      description: 'Strict hygiene and safety standards',
    },
    {
      icon: 'Clock',
      title: 'Flexible Hours',
      description: 'Open early morning to late evening',
    },
  ],

  // Time Slots for Booking
  timeSlots: [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  ],

  // FAQ
  faq: [
    {
      question: 'How far in advance should I book?',
      answer: 'We recommend booking at least 24 hours in advance. For bridal appointments, we suggest booking 2-3 weeks ahead.',
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Cancellations made 24 hours before the appointment are free. Late cancellations may incur a 50% charge.',
    },
    {
      question: 'Do you offer gift certificates?',
      answer: 'Yes! Gift certificates are available for any amount. Perfect for special occasions!',
    },
    {
      question: 'Are walk-ins accepted?',
      answer: 'Walk-ins are welcome subject to availability. Booking in advance ensures your preferred time slot.',
    },
  ],

  // Color Scheme
  colors: {
    primary: '#ec4899',        // Pink
    primaryLight: '#f472b6',
    primaryDark: '#be185d',
    secondary: '#8b5cf6',      // Purple
    neutral: '#f3f4f6',
    dark: '#1f2937',
  },

  // SEO
  seo: {
    title: 'Dulhan Beauty Parlour | Premium Beauty Services',
    description: 'Experience luxury beauty treatments at Dulhan Beauty Parlour. Specializing in bridal, makeup, and skincare services.',
    keywords: ['beauty salon', 'bridal makeup', 'skincare', 'makeup artist', 'beauty services'],
    ogImage: '/og-image.png',
  },
};

export default config;
