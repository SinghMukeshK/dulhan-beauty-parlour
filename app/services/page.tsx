'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Reveal from '../components/Reveal';
import { UserCheck, Package, ShieldCheck, Clock } from 'lucide-react';
import { getDristaServiceItems, DristaServiceItem } from '@/lib/dristaService';

type ServiceItem = {
  id?: string;
  name: string;
  description?: string;
  selling_price?: string | number;
  image_url?: string;
};

const WHY_US = [
  { icon: <UserCheck className="w-6 h-6 text-rose-700" />, title: 'Expert Stylists', desc: 'Certified professionals with years of elite bridal experience' },
  { icon: <Package className="w-6 h-6 text-rose-700" />, title: 'Premium Products', desc: 'We strictly use luxury, cruelty-free global brands' },
  { icon: <ShieldCheck className="w-6 h-6 text-rose-700" />, title: 'Pristine Hygiene', desc: 'Uncompromising sanitization and safety protocols' },
  { icon: <Clock className="w-6 h-6 text-rose-700" />, title: 'Flexible Timing', desc: 'Accommodating hours for your special day preparations' },
];

const FALLBACK: ServiceItem[] = [
  { name: 'Bridal Makeup', description: 'Bespoke bridal makeup tailored to your skin tone and wedding style.' },
  { name: 'Hair Styling & Spa', description: 'Nourishing hair spa with deep conditioning and scalp massage.' },
  { name: 'Facial & Skin Care', description: "Results-driven facials customized to your skin's needs." },
  { name: 'Nail Art & Extensions', description: 'Luxury manicure and pedicure with custom nail art.' },
  { name: 'Threading & Waxing', description: 'Gentle, precise threading and premium waxing services.' },
  { name: 'Hair Coloring', description: 'Expert color treatments for a vibrant, long-lasting finish.' },
];

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const items = await getDristaServiceItems();
        if (!items || items.length === 0) {
          setServices(FALLBACK);
          return;
        }

        const mappedItems: ServiceItem[] = items
          .filter((item: any) => item.is_active !== false && item.name)
          .map((item: any) => ({
            id: item.id,
            name: item.name as string,
            description: item.description as string | undefined,
            selling_price: item.selling_price,
            image_url: item.images?.find((img: any) => img.is_primary)?.url || item.images?.[0]?.url,
          }));

        setServices(mappedItems.length > 0 ? mappedItems : FALLBACK);
      } catch (err) {
        console.warn('[ServicesPage] Failed to fetch services:', err);
        setServices(FALLBACK);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="bg-[#FCFBF8]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-amber-50 py-14 border-b border-rose-100/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif italic mb-2 text-stone-900 tracking-tight">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-700 to-amber-600">Services</span>
          </h1>
          <p className="text-base max-w-xl mx-auto text-stone-500">
            Comprehensive beauty treatments designed to enhance your natural beauty and confidence.
          </p>
        </div>
      </section>

      {/* Service Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm">
                <div className="h-48 bg-stone-100" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-stone-100 rounded w-2/3" />
                  <div className="h-3 bg-stone-100 rounded w-full" />
                  <div className="h-3 bg-stone-100 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, index) => (
              <Reveal key={svc.id || svc.name} from="up" delay={index * 0.05}>
                <div className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-lg hover:border-rose-100 transition-all duration-300 flex flex-col h-full">
                  {/* Image */}
                  {svc.image_url ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={svc.image_url}
                        alt={svc.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-rose-50 via-white to-amber-50 flex items-center justify-center text-5xl">
                      💄
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-stone-900 text-base leading-snug">{svc.name}</h3>
                      {svc.selling_price && Number(svc.selling_price) > 0 && (
                        <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                          ₹{Number(svc.selling_price).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    {svc.description && (
                      <p className="text-stone-500 text-sm leading-relaxed flex-1">{svc.description}</p>
                    )}
                    <Link
                      href={`/book-appointment?service=${encodeURIComponent(svc.name)}`}
                      className="mt-4 inline-block text-center w-full py-2.5 bg-rose-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-rose-900 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Why Choose Us */}
      <section className="py-12 bg-white border-t border-stone-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-rose-700 font-bold tracking-widest uppercase text-xs mb-2 block">Excellence</span>
            <h2 className="text-2xl font-serif italic text-stone-900">Why Choose Dulhan?</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {WHY_US.map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-12 h-12 mx-auto bg-rose-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-rose-100 transition-colors border border-rose-100/50">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-stone-900 mb-1">{item.title}</h3>
                <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
