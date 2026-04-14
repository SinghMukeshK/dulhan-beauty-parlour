"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import config from './config/config';
import Reveal from './components/Reveal';
import { getIconByCategory } from './components/Icons';
import { ArrowRight } from 'lucide-react';
import { useTenant } from '@/app/contexts/TenantContext';

// Reusable animation variants
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: d, ease: EASE },
  }),
};
const fadeLeft = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function Home() {
  const { tenantProfile, loading: loadingProfile, error: profileError } = useTenant();
  const [backendServices, setBackendServices] = useState<any[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<{ url: string; caption?: string; title?: string }[]>([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const getBaseUrl = () =>
    (
      process.env.NEXT_PUBLIC_DRISTA_API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_URL?.replace(/\/v1\/?$/, '') ||
      'http://localhost:3000'
    ).replace(/\/+$/, '');

  useEffect(() => {
    const fetchServices = async () => {
      const baseUrl = getBaseUrl();
      const apiKey = process.env.NEXT_PUBLIC_DRISTA_API_KEY;

      if (!apiKey) {
        setServiceError('API key missing. Showing featured services.');
        setLoadingServices(false);
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/v1/ecommerce/products`, {
          headers: { Accept: 'application/json', 'x-api-key': apiKey },
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = await response.json();
        if (payload?.success && Array.isArray(payload.data) && payload.data.length > 0) {
          setBackendServices(payload.data.filter((s: any) => s.is_active !== false));
        } else {
          setServiceError('No live services found. Showing featured services.');
        }
      } catch (error) {
        console.error('[Home] Failed to fetch backend services', error);
        setServiceError('Unable to load live services. Showing featured services.');
      } finally {
        setLoadingServices(false);
      }
    };

    const fetchGallery = async () => {
      const baseUrl = getBaseUrl();
      const apiKey = process.env.NEXT_PUBLIC_DRISTA_API_KEY;
      if (!apiKey) return;

      try {
        const res = await fetch(`${baseUrl}/v1/gallery/albums?is_published=true`, {
          headers: { 'x-api-key': apiKey },
        });
        if (!res.ok) return;
        const payload = await res.json();
        if (!Array.isArray(payload?.data)) return;

        // Flatten all Media from all albums into a single list
        const images: { url: string; caption?: string; title?: string }[] = [];
        for (const album of payload.data) {
          const media: any[] = album.Media ?? [];
          for (const m of media) {
            if (m.file_url && m.media_type !== 'video') {
              images.push({ url: m.file_url, caption: m.caption || undefined, title: album.title });
            }
          }
          // Also include cover image if no media
          if (media.length === 0 && album.cover_image_url) {
            images.push({ url: album.cover_image_url, title: album.title });
          }
        }
        if (images.length > 0) setGalleryImages(images);
      } catch (err) {
        console.warn('[Home] Gallery fetch failed', err);
      }
    };

    fetchServices();
    fetchGallery();
  }, []);

  // Cycle hero image every 5 seconds
  useEffect(() => {
    if (galleryImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const services = backendServices.length ? backendServices : config.services.slice(0, 6);

  const getServiceTitle = (item: any) => item.title ?? item.name ?? 'Service';
  const getServiceDescription = (item: any) => item.description ?? '';
  const getServicePrice = (item: any) => {
    if (item.price) return item.price;
    const sp = parseFloat(item.selling_price);
    if (!isNaN(sp) && sp > 0) return `₹${sp.toLocaleString('en-IN')}`;
    return 'Price on request';
  };
  const getServiceCategory = (item: any) => item.category ?? item.item_category ?? item.item_type?.name ?? 'makeup';
  const getServiceImage = (item: any): string | null =>
    item.images?.find((img: any) => img.is_primary)?.url ?? item.images?.[0]?.url ?? null;

  return (
    <div className="text-stone-900 overflow-x-hidden">

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex flex-col lg:flex-row">

        {/* Left — staggered text */}
        <motion.div
          className="relative z-10 flex flex-col justify-center bg-[#fdf0f0] lg:w-[52%] px-8 sm:px-14 lg:px-20 pt-32 pb-20 lg:py-0"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-rose-200/30 blur-3xl pointer-events-none" />

          <motion.p variants={fadeUp} custom={0} className="text-xs font-bold uppercase tracking-[0.35em] text-rose-600 mb-6">
            {tenantProfile?.name || config.business.name}
          </motion.p>

          <motion.h1
            variants={fadeUp} custom={0.05}
            className="font-bold leading-[1.08] tracking-tight text-stone-900"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 4.5rem)' }}
          >
            Best Bridal<br />Makeup Artist<br />in Ghazipur
          </motion.h1>

          <motion.p variants={fadeUp} custom={0.1} className="mt-6 text-stone-600 text-base sm:text-lg leading-relaxed max-w-md">
            The premier destination for luxury bridal makeup and beauty treatments in <strong>Bhadaura, Zamania, and Dildarnagar</strong>. Experience flawless, expert styling for your special day.
          </motion.p>

          <motion.div variants={fadeUp} custom={0.15} className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/#gallery" className="inline-flex items-center justify-center gap-2 bg-rose-800 text-white text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-md hover:bg-rose-900 transition-colors shadow-lg shadow-rose-900/20">
              Explore Our Work <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/book-appointment" className="inline-flex items-center justify-center gap-2 border-2 border-rose-800 text-rose-800 text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-md hover:bg-rose-50 transition-colors">
              Book Appointment
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.2} className="mt-14 flex gap-8 sm:gap-12 flex-wrap">
            {[
              { value: '120+', label: 'Happy Brides' },
              { value: '5+', label: 'Years Experience' },
              { value: '4.9★', label: 'Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-rose-800">{stat.value}</p>
                <p className="text-xs uppercase tracking-widest text-stone-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — dynamic image carousel */}
        <motion.div
          className="relative lg:w-[48%] h-72 sm:h-96 lg:h-auto overflow-hidden bg-stone-100"
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={galleryImages.length > 0 ? galleryImages[currentHeroIndex].url : "/images/pricing_men_banner.png"}
                alt="Bridal makeup style"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 48vw, 100vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 lg:bg-gradient-to-r lg:from-[#fdf0f0]/20 lg:to-transparent pointer-events-none" />
        </motion.div>

      </section>

      {/* ── ABOUT ── */}
      <section className="py-28 bg-white" id="about">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
            <Reveal from="left" duration={0.7}>
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-rose-700">
                  Welcome to Dulhan Beauty Parlour
                </span>
                <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight text-stone-900">
                  Where beauty is elevated through precision, luxury and confidence.
                </h2>
                <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
                  Our expert team specialises in bridal makeup, hair styling, skincare and beauty services tailored to create a flawless, long-lasting look for your most memorable moments.
                </p>
                <p className="text-base sm:text-lg text-stone-500 max-w-2xl leading-relaxed">
                  Every service is delivered in a serene studio environment with premium products, hygienic care and a highly personalised approach.
                </p>
              </div>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2">
              {['Bridal Makeup', 'Hair Styling', 'Skin Care', 'Nail Art'].map((item, idx) => (
                <Reveal key={idx} from="up" delay={idx * 0.1} duration={0.55}>
                  <motion.div
                    className="rounded-[2rem] border border-stone-200 bg-[#fff5f4] p-8 shadow-sm cursor-default"
                    whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(159,18,57,0.1)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <h3 className="text-xl font-semibold text-stone-900 mb-3">{item}</h3>
                    <p className="text-stone-600 leading-relaxed text-sm">
                      Tailored service created to highlight your natural beauty with glowing results.
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-28 bg-[#fff5f7]" id="services">
        <div className="container mx-auto px-4">
          <Reveal from="up" duration={0.6}>
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-14">
              <div>
                <span className="text-rose-700 text-sm font-semibold uppercase tracking-[0.2em]">Our Services</span>
                <h2 className="mt-4 text-5xl font-semibold tracking-tight text-stone-900 max-w-2xl">
                  Experience premium beauty services designed for every celebration.
                </h2>
              </div>
              <Link href="/services" className="inline-flex items-center gap-2 text-rose-700 font-semibold uppercase tracking-[0.18em] hover:text-rose-900 transition">
                Explore All Services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          {loadingServices && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mb-8 rounded-3xl border border-rose-100 bg-rose-50 px-6 py-5 text-rose-700 shadow-sm"
            >
              Loading the latest services from the backend…
            </motion.div>
          )}
          {serviceError && (
            <div className="mb-8 rounded-3xl border border-rose-200 bg-rose-100 px-6 py-5 text-rose-900 shadow-sm">{serviceError}</div>
          )}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.slice(0, 6).map((item, index) => {
              const title = getServiceTitle(item);
              const price = getServicePrice(item);
              const description = getServiceDescription(item);
              const category = getServiceCategory(item);
              const imageUrl = getServiceImage(item);
              const cardKey = 'id' in item ? item.id : title;

              return (
                <Reveal key={cardKey} from="up" delay={index * 0.08}>
                  <motion.div
                    className="rounded-[2rem] border border-stone-200 bg-white overflow-hidden shadow-sm flex flex-col h-full"
                    whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(159,18,57,0.12)' }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  >
                    {imageUrl ? (
                      <div className="relative h-48 w-full overflow-hidden">
                        <motion.img
                          src={imageUrl}
                          alt={title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.06 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center text-rose-700">
                        {getIconByCategory(category, 'w-12 h-12')}
                      </div>
                    )}
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="text-2xl font-semibold text-stone-900 mb-3">{title}</h3>
                      <p className="text-stone-600 leading-relaxed mb-6 flex-1">{description}</p>
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xl font-semibold text-rose-700">{price}</p>
                        <Link href={`/book-appointment?service=${encodeURIComponent(title)}`} className="inline-flex items-center justify-center rounded-full border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-700 hover:bg-rose-50 transition">
                          Book <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-28 bg-white" id="gallery">
        <div className="container mx-auto px-4">
          <Reveal from="up" duration={0.6}>
            <div className="text-center mb-14">
              <span className="text-rose-700 text-sm font-semibold uppercase tracking-[0.2em] block mb-4">Our Work</span>
              <h2 className="text-5xl font-semibold tracking-tight text-stone-900">Bridal beauty captured in every moment.</h2>
              <p className="mt-4 text-stone-600 max-w-3xl mx-auto leading-relaxed">
                See how our luxury treatments create flawless, camera-ready looks for brides and special events.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((colIndex) => {
              const galleryToDisplay = galleryImages.length > 0 ? galleryImages.slice(0, 9) : Array.from({ length: 6 });
              const columnItems = galleryToDisplay.filter((_, i) => i % 3 === colIndex);

              return (
                <div key={colIndex} className="flex flex-col gap-6">
                  {columnItems.map((item: any, i) => (
                    <Reveal key={i} from="up" delay={(colIndex * 0.15) + (i * 0.1)}>
                      <motion.div
                        className="group relative overflow-hidden rounded-[2rem] bg-stone-100 shadow-sm cursor-pointer"
                        whileHover={{ y: -8, scale: 1.01 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="relative overflow-hidden aspect-[4/5]">
                          {item?.url ? (
                            <motion.img
                              src={item.url}
                              alt={item.caption || item.title || `Gallery image ${colIndex * 3 + i + 1}`}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.8 }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-rose-50 to-amber-50 animate-pulse" />
                          )}
                          
                          {/* Hover Overlay */}
                          <motion.div 
                            className="absolute inset-0 bg-rose-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]"
                            initial={false}
                          >
                            <div className="px-6 py-2 bg-white/90 backdrop-blur-md rounded-full text-rose-900 text-xs font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
                              View Work
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="py-28 bg-rose-950 text-white" id="contact">
        <div className="container mx-auto px-4 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <Reveal from="left" duration={0.7}>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-rose-200">
                Book Your Session Today
              </span>
              <h2 className="mt-6 text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
                Create your perfect bridal look with expert care and refined luxury.
              </h2>
              <p className="mt-6 text-stone-200 max-w-xl leading-relaxed text-base sm:text-lg">
                Reach us instantly by phone or email for appointment bookings, service guidance, and personalised consultations.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {
                  // Display dynamic emails or fallback to config
                  (tenantProfile?.emails?.length ? tenantProfile.emails : [config.business.contact.email]).map((email, i) => (
                    <motion.div
                      key={`email-${i}`}
                      className="rounded-3xl bg-white/10 border border-white/15 p-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * i }}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-stone-300">Email {(tenantProfile?.emails?.length ?? 0) > 1 ? i + 1 : ''}</p>
                      <p className="mt-3 text-lg font-semibold truncate">{email}</p>
                    </motion.div>
                  ))
                }
                {
                  // Display dynamic phone numbers or fallback to config
                  (tenantProfile?.contact_numbers?.length ? tenantProfile.contact_numbers : [config.business.contact.phone]).map((phone, i) => (
                    <motion.div
                      key={`phone-${i}`}
                      className="rounded-3xl bg-white/10 border border-white/15 p-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + 0.1 * i }}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-stone-300">Phone {(tenantProfile?.contact_numbers?.length ?? 0) > 1 ? i + 1 : ''}</p>
                      <p className="mt-3 text-lg font-semibold">{phone}</p>
                    </motion.div>
                  ))
                }
              </div>
            </div>
          </Reveal>

          <Reveal from="right" duration={0.7} delay={0.1}>
            <motion.div
              className="rounded-[2rem] bg-white/10 border border-white/15 p-10 shadow-[0_40px_120px_rgba(255,255,255,0.1)]"
              whileHover={{ boxShadow: '0 40px 120px rgba(255,255,255,0.18)' }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-300">Address</p>
                  <p className="mt-3 text-base text-stone-100 whitespace-pre-line">
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
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-300">Working Hours</p>
                  <div className="mt-3 space-y-2 text-stone-100 text-sm">
                    {config.business.contact.hours.map((item, idx) => (
                      <p key={idx}>{item.day}: {item.time}</p>
                    ))}
                  </div>
                </div>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-rose-950 px-7 py-4 text-sm font-semibold hover:bg-rose-100 transition">
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
