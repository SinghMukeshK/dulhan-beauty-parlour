"use client";

import Link from 'next/link';
import Image from 'next/image';
import SectionDivider from './components/SectionDivider';
import config from './config/config';
import { getIconByCategory } from './components/Icons';
import Reveal from './components/Reveal';
import { UserCheck, Package, ShieldCheck, Clock, ArrowRight, Sparkles, Star } from 'lucide-react';

export default function Home() {
  const services = config.services.slice(0, 6);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Bride',
      testimonial: 'Dulhan made me feel like royalty on my wedding day. The attention to detail and absolute perfection in makeup was breathtaking.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Regular Client',
      testimonial: 'Every visit is a luxurious retreat. The staff is professional, the ambiance is serene, and the results are consistently flawless.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Event Client',
      testimonial: 'The transformation was unbelievable. They use premium products that matched perfectly with my skin tone. Worth every single penny.',
      rating: 5
    },
  ];

  return (
    <div className="bg-[#FCFBF8] text-stone-800 selection:bg-rose-300/40 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden border-b border-rose-900/10">
        {/* Abstract luxury background glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rose-200/40 rounded-full blur-[120px] mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-0 left-[-20%] w-[600px] h-[600px] bg-amber-100/50 rounded-full blur-[100px] mix-blend-multiply pointer-events-none"></div>

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            {/* Left Content */}
            <Reveal from="left" delay={100} className="flex flex-col justify-center max-w-2xl">
              <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-rose-300/50 bg-white/60 backdrop-blur-md w-fit shadow-sm">
                <Sparkles className="w-4 h-4 text-rose-600" />
                <span className="text-rose-800 text-xs font-semibold uppercase tracking-[0.2em]">The Pinnacle of Bridal Luxury</span>
              </div>

              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-stone-900 mb-6 leading-[1.1]">
                Unveil Your <br />
                <span className="font-serif italic bg-gradient-to-r from-rose-700 via-rose-500 to-amber-600 bg-clip-text text-transparent">True Radiance</span>
              </h1>

              <p className="text-lg sm:text-xl text-stone-600 mb-10 leading-relaxed max-w-xl font-light">
                Experience the epitome of luxury beauty treatments. Our elite artisans deliver transformative results using world-class, ethically-sourced products tailored exclusively for you.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link href="/book-appointment" className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-rose-800 text-white rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_30px_rgba(159,18,57,0.2)]">
                  <span className="relative z-10 flex items-center gap-2">Reserve Your Session <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-700 to-rose-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link href="/services" className="inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-stone-700 hover:text-rose-800 transition-colors duration-300">
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-rose-800 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 pb-1">
                    Discover Services
                  </span>
                </Link>
              </div>

              <div className="mt-16 flex items-center gap-6 border-t border-stone-200 pt-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#FCFBF8] bg-rose-100 flex items-center justify-center overflow-hidden z-[${5 - i}]`}>
                      <Star className="w-4 h-4 text-rose-500 fill-rose-500" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-rose-500 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className="text-xs text-stone-500 font-medium tracking-wide">Loved by 1,000+ elegant brides</p>
                </div>
              </div>
            </Reveal>

            {/* Right Image Container */}
            <Reveal from="right" delay={300} className="relative hidden lg:block h-[700px] w-full pl-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-200/60 to-transparent rounded-full blur-[80px]"></div>
              <div className="relative h-full w-full rounded-[2rem] border border-stone-200 overflow-hidden bg-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                <div className="absolute inset-0 bg-stone-200 animate-pulse"></div>
                <Image
                  src="/images/pricing_men_banner.png"
                  alt="Dulhan Beauty Transformation"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-top opacity-95 transition-all duration-700 hover:scale-105"
                  priority
                />

                {/* Floating highlight badge */}
                <div className="absolute bottom-10 left-[-30px] lg:left-[-50px] bg-white/80 backdrop-blur-xl border border-white/50 p-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-rose-600" />
                    </div>
                    <div>
                      <p className="text-stone-900 font-serif italic text-lg leading-tight">Award Winning</p>
                      <p className="text-rose-700 text-xs uppercase tracking-widest font-semibold mt-1">Bridal Studio</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* About Section - Alabaster Background */}
      <section className="py-32 bg-white text-stone-800 relative shadow-[0_-1px_20px_rgba(0,0,0,0.02)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Image cluster */}
            <div className="order-2 lg:order-1 relative h-[600px] w-full">
              <Reveal delay={200} from="up" className="absolute top-0 right-10 w-3/4 h-3/4 rounded-t-full rounded-b-md bg-stone-100 overflow-hidden shadow-xl border border-stone-200/50">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-900/10 z-10"></div>
                <Image src="/images/pricing_men_banner.png" alt="Salon experience" fill className="object-cover hover:scale-105 transition-all duration-1000" />
              </Reveal>
              <Reveal delay={400} from="left" className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full border-8 border-white overflow-hidden shadow-2xl z-20">
                <Image src="/images/pricing_men_banner.png" alt="Details" fill className="object-cover zoom-in-110" />
              </Reveal>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-[1px] w-12 bg-rose-600"></span>
                <span className="text-rose-800 text-sm font-semibold uppercase tracking-[0.2em]">Our Heritage</span>
              </div>

              <h2 className="text-5xl lg:text-7xl font-medium tracking-tight text-stone-900 mb-8 leading-[1.1]">
                Mastery in <br />
                <span className="font-serif italic text-rose-800">Aesthetic Arts</span>
              </h2>

              <p className="text-lg text-stone-600 mb-6 leading-relaxed font-light">
                Dulhan—meaning bride in Hindi—is your sanctuary for transformative beauty. With over a decade of excellence, our master artisans curate personalized experiences designed to highlight your intrinsic beauty and confidence.
              </p>

              <p className="text-stone-500 mb-12 leading-relaxed font-light">
                We believe in uncompromising quality. Our studio adheres strictly to international luxury standards, utilizing only premium, ethically-sourced, and cruelty-free preparations to guarantee exceptional results.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {config.features.map((f, idx) => {
                  const iconMap: Record<string, React.ReactNode> = {
                    UserCheck: <UserCheck className="w-6 h-6 text-rose-700" />,
                    Package: <Package className="w-6 h-6 text-rose-700" />,
                    ShieldCheck: <ShieldCheck className="w-6 h-6 text-rose-700" />,
                    Clock: <Clock className="w-6 h-6 text-rose-700" />,
                  };

                  return (
                    <Reveal key={idx} from="up" delay={100 * idx} className="flex gap-4">
                      <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center">
                        {iconMap[f.icon]}
                      </div>
                      <div>
                        <h4 className="text-stone-900 font-semibold mb-1">{f.title}</h4>
                        <p className="text-stone-500 text-sm leading-relaxed">{f.description}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Soft Alabaster Theme */}
      <section className="py-32 relative bg-[#FAF9F6] overflow-hidden border-t border-stone-200">
        {/* Decorative background lines */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-rose-300/50 to-transparent"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-[100px]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="text-rose-700 text-sm font-semibold uppercase tracking-[0.2em]">Curated Offerings</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-medium tracking-tight text-stone-900 m-0">
                Signature <span className="font-serif italic text-rose-800">Treatments</span>
              </h2>
            </div>
            <Link href="/services" className="group inline-flex items-center gap-2 text-rose-700 font-semibold hover:text-rose-900 transition-colors uppercase tracking-widest text-sm pb-2 border-b-2 border-rose-200 hover:border-rose-400">
              View Complete Menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Reveal key={index} from="up" delay={index * 100} className="group">
                <div className="h-full p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-stone-200 hover:border-rose-300 hover:bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(225,29,72,0.08)] transition-all duration-500 flex flex-col relative overflow-hidden">
                  {/* Subtle shine effect on hover */}
                  <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-rose-100/40 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out pointer-events-none"></div>

                  <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 group-hover:bg-rose-100">
                    {getIconByCategory(service.category, 'w-8 h-8 text-rose-600')}
                  </div>

                  <h3 className="text-2xl font-medium text-stone-900 mb-4 group-hover:text-rose-800 transition-colors duration-300 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-stone-600 mb-8 leading-relaxed font-light flex-grow">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-stone-100 pt-6 mt-auto">
                    <p className="text-xl font-serif text-rose-800 font-medium">
                      {service.price}
                    </p>
                    <Link href={`/book-appointment?service=${encodeURIComponent(service.title)}`} className="w-10 h-10 rounded-full border border-rose-200 flex items-center justify-center group-hover:bg-rose-800 group-hover:border-rose-800 group-hover:text-white text-rose-600 transition-all duration-300 shadow-sm">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Carousel Concept */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="text-center mb-20">
            <span className="text-rose-700 text-sm font-semibold uppercase tracking-[0.2em] block mb-4">Portfolio</span>
            <h2 className="text-5xl lg:text-7xl font-medium tracking-tight text-stone-900 mb-8">
              The Gallery of <span className="font-serif italic text-rose-800">Elegance</span>
            </h2>
          </div>

          {/* Asymmetric Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px] max-w-6xl mx-auto p-4 bg-[#FCFBF8] rounded-[3rem] border border-stone-100 shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)]">
            {[
              { size: 'col-span-2 row-span-2' },
              { size: 'col-span-1 row-span-1' },
              { size: 'col-span-1 row-span-1' },
              { size: 'col-span-2 row-span-1' },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 150} from="up" className={`relative rounded-3xl overflow-hidden group ${item.size} bg-stone-100`}>
                <div className="absolute inset-0 bg-stone-100 animate-pulse z-0"></div>
                {/* Decorative placeholder */}
                <Image
                  src="/images/pricing_men_banner.png"
                  alt={`Gallery ${idx + 1}`}
                  fill
                  className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 z-10"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 rounded-full border border-stone-300 text-stone-600 hover:border-rose-800 hover:text-rose-800 hover:bg-rose-50 transition-all duration-300 text-sm uppercase tracking-widest font-bold">
              Discover More
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials - Minimalist Elegance */}
      <section className="py-32 bg-[#FCFBF8] border-t border-stone-200 border-b text-center relative overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-rose-200/20 rounded-full blur-[60px]"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-200/20 rounded-full blur-[60px]"></div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="w-20 h-20 bg-white rounded-full mx-auto mb-8 flex items-center justify-center shadow-sm border border-stone-100">
            <Sparkles className="w-8 h-8 text-rose-400" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif italic text-stone-800 mb-20 leading-tight">
            "An absolute sanctuary. The level of care and artistry at Dulhan is unprecedented."
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((testimonial, index) => (
              <Reveal key={index} from="up" delay={index * 100}>
                <div className="p-8 rounded-3xl bg-white border border-stone-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  {/* Glowing top line */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>

                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>

                  <p className="text-stone-600 mb-8 font-light leading-relaxed flex-grow text-sm lg:text-base">
                    "{testimonial.testimonial}"
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-800 font-serif text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-stone-900 font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-stone-500 text-xs uppercase tracking-widest mt-0.5">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Immersive Full Width */}
      <section className="relative py-40 overflow-hidden bg-rose-950">
        {/* Soft glowing orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <Reveal from="up">
            <div className="inline-flex items-center justify-center mb-8 px-4 py-2 border border-rose-300/30 rounded-full bg-white/5 backdrop-blur-sm">
              <span className="text-rose-200 text-xs uppercase tracking-[0.2em] font-medium">Your Journey Begins</span>
            </div>

            <h2 className="text-5xl sm:text-7xl font-medium text-white mb-8 tracking-tight">
              Awaiting Your <br />
              <span className="font-serif italic text-rose-300">Arrival</span>
            </h2>

            <p className="text-xl text-rose-100/70 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
              Step into a realm of sophisticated beauty. Let our expert artisans craft your perfect look in our serene, private studios.
            </p>

            <Link href="/book-appointment" className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-rose-950 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              <span className="relative z-10 flex items-center gap-2">Secure Your Appointment <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}