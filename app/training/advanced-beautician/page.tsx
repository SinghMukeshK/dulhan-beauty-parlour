"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Scissors, PaintBucket, Sparkles, Layout, ArrowRight, ShieldCheck } from 'lucide-react';
import Reveal from '@/app/components/Reveal';

const CURRICULUM = [
  {
    title: "Clinical Skincare & Facials",
    modules: ["Skin Type & Concern Analysis", "Standard & Luxury Facial Protocols", "Manual Massage Techniques", "Electronic Skin Care Tools"]
  },
  {
    title: "Hair Artistry & Chemistry",
    modules: ["Professional Hair Cutting", "Color Theory & Application", "Chemical Treatments (Smoothing, Keratin)", "Advanced Hair Spa Therapy"]
  },
  {
    title: "Essential Grooming & Ethics",
    modules: ["Precision Threading & Mapping", "Global & Body Waxing Techniques", "Hygienic Sanitation Protocols", "Client Interaction & Etiquette"]
  },
  {
    title: "Nail Science & Aesthetics",
    modules: ["Anatomy of the Nail", "Classic & Gel Manicure/Pedicure", "Nail Extension Basics", "Modern Nail Art Designs"]
  },
  {
    title: "Salon Operation & Management",
    modules: ["Inventory & Supply Management", "Studio Setup & Lighting", "Business Accounting Basics", "Marketing Your Salon Services"]
  }
];

export default function AdvancedBeauticianCourse() {
  return (
    <main className="bg-[#FCFBF8] min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-amber-50/30">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-100/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Reveal from="up">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-700 mb-6">
                Professional Diploma
              </span>
              <h1 className="text-5xl md:text-7xl font-serif italic text-stone-900 mb-8 leading-[1.1]">
                Advanced <span className="text-amber-800">Beautician & Skincare</span> Mastery
              </h1>
              <p className="text-xl text-stone-600 mb-10 leading-relaxed max-w-2xl">
                Become a certified beauty professional with our 6-month comprehensive diploma. Master hair, skin, and salon operations with intensive hands-on training.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/book-appointment?service=Advanced%20Beautician%20Course" className="px-8 py-4 bg-amber-800 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-amber-900 transition-all shadow-[0_5px_15px_rgba(180,83,9,0.3)] hover:-translate-y-1">
                  Enroll Now
                </Link>
                <Link href="/contact" className="px-8 py-4 bg-white border border-amber-200 text-amber-800 rounded-xl font-bold uppercase tracking-widest text-sm shadow-sm hover:bg-amber-50 transition-all">
                  Get Syllabus
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-white border-y border-amber-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Scissors className="w-6 h-6" />, label: "Hair Experts", sub: "Cut, color & style" },
              { icon: <Sparkles className="w-6 h-6" />, label: "Skin Science", sub: "Deep-level facials" },
              { icon: <Layout className="w-6 h-6" />, label: "Salon Management", sub: "Business skills" },
              { icon: <ShieldCheck className="w-6 h-6" />, label: "Job Placement", sub: "100% assistance" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-700 mb-4 border border-amber-100">
                  {item.icon}
                </div>
                <h3 className="font-bold text-stone-900 text-lg mb-1">{item.label}</h3>
                <p className="text-stone-500 text-sm">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-serif italic text-stone-900 mb-6">Course Syllabus</h2>
            <p className="text-stone-600">Our structured syllabus ensures you master every aspect of modern beauty therapy and salon operations.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CURRICULUM.map((section, idx) => (
              <Reveal key={idx} from="up" delay={idx * 0.1}>
                <div className="bg-white rounded-3xl border border-stone-200 p-8 h-full hover:shadow-xl hover:border-amber-200 transition-all group">
                  <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-700 font-bold mb-6 group-hover:bg-amber-700 group-hover:text-white transition-colors">
                    0{idx + 1}
                  </div>
                  <h3 className="text-2xl font-serif italic text-stone-900 mb-6">{section.title}</h3>
                  <ul className="space-y-4">
                    {section.modules.map((mod, i) => (
                      <li key={i} className="flex items-center gap-3 text-stone-600">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span className="text-sm font-medium">{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}

            {/* Final Info Card */}
            <Reveal from="up" delay={0.3}>
              <div className="bg-amber-800 rounded-3xl p-10 text-white h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Graduation & Certification</h3>
                <p className="text-amber-100 text-sm leading-relaxed mb-8">
                  Upon completion, students undergo a rigorous practical examination. Successful candidates receive an industry-recognized diploma from Dulhan Training Centre.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all">
                  Inquire Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="bg-stone-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full" />
          <Reveal from="up">
            <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-8">Ready to launch your career in the beauty industry?</h2>
            <p className="text-stone-400 text-lg mb-12 max-w-2xl mx-auto">
              Our professional training program provides the skills, confidence, and certification you need to succeed.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/book-appointment?service=Advanced%20Beautician%20Course" className="px-10 py-5 bg-amber-700 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-amber-800 transition-all shadow-lg">
                Join Upcoming Batch
              </Link>
              <a href="https://wa.me/919999999999" className="px-10 py-5 bg-white text-stone-900 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-rose-50 transition-all shadow-lg flex items-center justify-center gap-3">
                Talk to Advisor <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
