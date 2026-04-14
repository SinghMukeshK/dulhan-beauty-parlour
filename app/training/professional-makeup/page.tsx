"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Users, Award, ArrowRight, Star } from 'lucide-react';
import Reveal from '@/app/components/Reveal';

const CURRICULUM = [
  {
    title: "Foundations & Skin Science",
    modules: ["Skin Analysis & Preparation", "Understanding Undertones", "Sanitation & Hygiene", "Product Knowledge & Tool Kit Prep"]
  },
  {
    title: "Face Artistry & Sculpting",
    modules: ["Primer & Base Application", "Color Correction & Concealing", "Contouring & Highlighting (Cream & Powder)", "Blush & Bronzer Placement"]
  },
  {
    title: "Advanced Eye Techniques",
    modules: ["Eyebrow Shaping & Fill", "Classic & Winged Eyeliner", "Smokey Eyes & Cut Crease", "Lash Application (Strip & Individual)"]
  },
  {
    title: "Professional Bridal Mastery",
    modules: ["Traditional Indian Bridal Look", "Reception & Engagement Styles", "Nikaah & Christian Bridal Makeup", "Waterproof & Long-wear Techniques"]
  },
  {
    title: "Business & Portfolio",
    modules: ["Portfolio Building", "Client Consultation", "Social Media Branding", "Freelance Business Management"]
  }
];

export default function ProfessionalMakeupCourse() {
  return (
    <main className="bg-[#FCFBF8] min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-rose-50/30">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-100/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Reveal from="up">
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-rose-700 mb-6">
                Premium Certification
              </span>
              <h1 className="text-5xl md:text-7xl font-serif italic text-stone-900 mb-8 leading-[1.1]">
                Master the Art of <span className="text-rose-800">Professional Bridal Makeup</span>
              </h1>
              <p className="text-xl text-stone-600 mb-10 leading-relaxed max-w-2xl">
                A comprehensive 4-week intensive program designed for aspiring artists. Learn from industry experts, practice on live models, and build a world-class portfolio.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/book-appointment?service=Professional%20Makeup%20Course" className="px-8 py-4 bg-rose-800 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-rose-900 transition-all shadow-[0_5px_15px_rgba(159,18,57,0.3)] hover:-translate-y-1">
                  Enroll Now
                </Link>
                <Link href="/contact" className="px-8 py-4 bg-white border border-rose-200 text-rose-800 rounded-xl font-bold uppercase tracking-widest text-sm shadow-sm hover:bg-rose-50 transition-all">
                  Get Brochure
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats/Features */}
      <section className="py-16 bg-white border-y border-rose-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Clock className="w-6 h-6" />, label: "4 Weeks", sub: "Intensive training" },
              { icon: <Users className="w-6 h-6" />, label: "Small Batches", sub: "Max 6 per group" },
              { icon: <Star className="w-6 h-6" />, label: "Practical Focus", sub: "80% hands-on" },
              { icon: <Award className="w-6 h-6" />, label: "Certification", sub: "Recognized industry-wide" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-700 mb-4 border border-rose-100">
                  {item.icon}
                </div>
                <h3 className="font-bold text-stone-900 text-lg mb-1">{item.label}</h3>
                <p className="text-stone-500 text-sm">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3">
              <Reveal from="left">
                <h2 className="text-4xl font-serif italic text-stone-900 mb-6">Course Curriculum</h2>
                <p className="text-stone-600 leading-relaxed mb-8">
                  Our curriculum is structured to take you from basic foundations to advanced bridal mastery. Each module includes theory followed by extensive practical sessions.
                </p>
                <div className="bg-rose-800 text-white p-8 rounded-[2rem] shadow-xl">
                  <h3 className="font-bold text-xl mb-4">What's Included?</h3>
                  <ul className="space-y-3">
                    {["Premium Product Kit", "Live Model Practice", "Professional Portfolio Shoots", "Lifetime Mentorship"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium">
                        <CheckCircle2 className="w-5 h-5 text-rose-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
            
            <div className="lg:w-2/3 space-y-6">
              {CURRICULUM.map((section, idx) => (
                <Reveal key={idx} from="up" delay={idx * 0.1}>
                  <div className="bg-white rounded-3xl border border-stone-200 p-8 hover:border-rose-200 transition-colors shadow-sm">
                    <h4 className="text-rose-700 font-bold uppercase tracking-widest text-xs mb-4">Module 0{idx + 1}</h4>
                    <h3 className="text-2xl font-serif italic text-stone-900 mb-6">{section.title}</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {section.modules.map((mod, i) => (
                        <div key={i} className="flex items-center gap-3 text-stone-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                          <span className="text-sm">{mod}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="bg-stone-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/20 blur-[100px] rounded-full" />
          <Reveal from="up">
            <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-8">Start your journey to becoming a professional makeup artist today.</h2>
            <p className="text-stone-400 text-lg mb-12 max-w-2xl mx-auto">
              Limited seats available for the upcoming winter batch. Book your consultation to learn more about the enrollment process.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/book-appointment?service=Professional%20Makeup%20Course" className="px-10 py-5 bg-rose-700 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-rose-800 transition-all shadow-lg">
                Book My Seat
              </Link>
              <a href="https://wa.me/919999999999" className="px-10 py-5 bg-white text-stone-900 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-rose-50 transition-all shadow-lg flex items-center justify-center gap-3">
                Chat on WhatsApp <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
