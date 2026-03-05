import { Metadata } from 'next';
import ServiceCard from '../components/ServiceCard';
import SectionDivider from '../components/SectionDivider';
import config from '../config/config';
import { getIconByCategory } from '../components/Icons';
import Reveal from '../components/Reveal';
import { UserCheck, Package, ShieldCheck, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services | Dulhan Beauty Parlour',
  description: 'Explore our wide range of beauty services including bridal makeup, skincare, hair care, and more.',
};

const allServices = config.services;

export default function Services() {
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
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-700 to-amber-600">Services</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-stone-600 font-medium">
            Comprehensive beauty treatments designed to enhance your natural beauty and confidence.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service, index) => (
            <Reveal key={index} from="up" delay={index * 60} className="h-full">
              <ServiceCard
                icon={getIconByCategory(service.category)}
                title={service.title}
                description={service.description}
                price={service.price}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* Why Choose Us */}
      <section className="py-24 bg-white border-t border-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-rose-700 font-bold tracking-widest uppercase text-sm mb-3 block">Excellence</span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-stone-900">Why Choose Dulhan?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
            {[
              { icon: <UserCheck size={40} className="mx-auto text-rose-700" />, title: 'Expert Stylists', desc: 'Certified professionals with years of elite bridal experience' },
              { icon: <Package size={40} className="mx-auto text-rose-700" />, title: 'Premium Products', desc: 'We strictly use luxury, cruelty-free global brands' },
              { icon: <ShieldCheck size={40} className="mx-auto text-rose-700" />, title: 'Pristine Hygiene', desc: 'Uncompromising sanitization and safety protocols' },
              { icon: <Clock size={40} className="mx-auto text-rose-700" />, title: 'Flexible Timing', desc: 'Accommodating hours for your special day preparations' },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto bg-rose-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-100 transition-colors duration-300 border border-rose-100/50 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-stone-900">{item.title}</h3>
                <p className="text-stone-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
