import Link from 'next/link'

export const metadata = {
  title: 'Training Centre — Dulhan Beauty Parlour',
  description: 'Professional beauty training courses and certifications at Dulhan Beauty Parlour.',
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 bg-white border border-rose-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-bold text-stone-900 text-lg mb-2">{title}</h3>
      <p className="text-stone-600 leading-relaxed">{desc}</p>
    </div>
  )
}

function Module({ num, title, desc }: { num: number; title: string; desc: string }) {
  return (
    <li className="p-6 bg-white border border-rose-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-5">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-600 to-rose-800 text-white flex items-center justify-center font-bold font-serif text-xl shadow-sm shrink-0">{num}</div>
        <div>
          <h4 className="font-bold text-stone-900 text-lg mb-1">{title}</h4>
          <p className="text-stone-600 leading-relaxed">{desc}</p>
        </div>
      </div>
    </li>
  )
}

export default function TrainingPage() {
  return (
    <main className="bg-[#FCFBF8] min-h-screen pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-amber-50 pt-32 pb-20 border-b border-rose-100/50 mb-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-rose-200/20 blur-[120px]"></div>
          <div className="absolute top-[60%] -left-[10%] w-[40%] h-[40%] rounded-full bg-amber-200/20 blur-[120px]"></div>
        </div>
        <div className="container mx-auto px-4 md:flex md:items-center md:justify-between gap-12 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-serif italic text-stone-900 mb-6 tracking-tight">Professional Beauty <span className="text-rose-700">Courses</span></h1>
            <p className="text-xl text-stone-600 mb-10 leading-relaxed">Hands-on, industry-led training for makeup artists, bridal stylists, skincare specialists and nail technicians. Small classes, practical demos and certification on completion.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book-appointment" className="px-8 py-4 bg-rose-800 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-rose-900 transition-all shadow-[0_5px_15px_rgba(159,18,57,0.3)] hover:-translate-y-1">Book a Slot</Link>
              <Link href="/contact" className="px-8 py-4 bg-white border border-rose-200 text-rose-800 rounded-xl font-bold uppercase tracking-widest text-sm shadow-sm hover:bg-rose-50 transition-all">Contact Us</Link>
            </div>
          </div>
          <div className="mt-12 md:mt-0 w-full md:w-1/3">
            <div className="rounded-3xl overflow-hidden shadow-xl bg-white border border-rose-100 p-8 transform hover:scale-105 transition-transform duration-500">
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-700 text-xl font-serif">★</div>
              <h3 className="font-serif italic text-2xl text-stone-900 mb-2">Upcoming Batch</h3>
              <div className="space-y-3 mt-6">
                <p className="text-stone-600 flex justify-between items-center border-b border-rose-50 pb-3"><span>Starts</span> <strong className="text-stone-900">5th Jan 2026</strong></p>
                <p className="text-stone-600 flex justify-between items-center border-b border-rose-50 pb-3"><span>Duration</span> <strong className="text-stone-900">4 weeks</strong></p>
                <p className="text-stone-600 flex justify-between items-center"><span>Hours</span> <strong className="text-stone-900">Mon–Fri, 10–2 PM</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="container mx-auto px-4 grid md:grid-cols-3 gap-12 mb-20">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-serif italic text-stone-900 mb-6">Why choose Dulhan Training Centre?</h2>
          <p className="text-stone-600 mb-10 text-lg leading-relaxed">Our trainers are certified industry professionals with years of salon and bridal experience. We focus on practical skills, portfolio building and live client demos so you graduate job-ready.</p>
          <div className="grid sm:grid-cols-2 gap-6">
            <Feature title="Hands-on Practice" desc="Small groups with guaranteed real-model practice sessions." />
            <Feature title="Certification" desc="Accredited certificate on successful course completion." />
            <Feature title="Industry Tools" desc="Learn with professional luxury brands and top salon equipment." />
            <Feature title="Career Support" desc="Portfolio reviews, mentorship, and salon placement guidance." />
          </div>
        </div>
        <aside className="p-8 bg-white border border-rose-100 rounded-3xl shadow-sm h-fit">
          <h3 className="font-bold text-stone-900 uppercase tracking-widest text-sm mb-3">Class Size</h3>
          <p className="text-stone-600 mb-8 border-b border-rose-50 pb-8">Maximum 6 students per batch to ensure highly personalised attention and mentorship.</p>
          <h3 className="font-bold text-stone-900 uppercase tracking-widest text-sm mb-3">Location</h3>
          <p className="text-stone-600">Dulhan Beauty Parlour<br />Main Sanctuary Branch</p>
        </aside>
      </section>

      {/* Curriculum */}
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-serif italic text-stone-900 mb-8 text-center">Course Curriculum</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Module num={1} title="Foundations of Makeup" desc="Skin prep, product knowledge, daytime & evening looks." />
          <Module num={2} title="Bridal Makeup & Styling" desc="Traditional & contemporary bridal looks, premium techniques." />
          <Module num={3} title="Skincare & Facials" desc="Skin analysis, luxury facial protocols and client consultation." />
          <Module num={4} title="Nail Art & Manicure" desc="Sanitation, classic & gel manicure, creative nail art basics." />
        </ul>
      </section>

      {/* Instructors */}
      <section className="container mx-auto px-4 mb-20 bg-white py-16 rounded-3xl border border-rose-50 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-rose-700 font-bold tracking-widest uppercase text-sm mb-3 block">Experts</span>
          <h2 className="text-3xl font-serif italic text-stone-900">Meet Your Trainers</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-8 px-4 md:px-12">
          <div className="text-center group">
            <div className="w-24 h-24 mx-auto rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-serif text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform">AR</div>
            <h4 className="font-bold text-stone-900 text-xl mb-1">Anjali Roy</h4>
            <p className="text-stone-500 font-medium">Senior Artist — 10+ yrs experience</p>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 mx-auto rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-serif text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform">SK</div>
            <h4 className="font-bold text-stone-900 text-xl mb-1">Sana Khan</h4>
            <p className="text-stone-500 font-medium">Skincare Specialist & Trainer</p>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 mx-auto rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-serif text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform">RM</div>
            <h4 className="font-bold text-stone-900 text-xl mb-1">Ritu Mehra</h4>
            <p className="text-stone-500 font-medium">Nail & Styling Maestro</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 mb-24">
        <h2 className="text-3xl font-serif italic text-stone-900 mb-10 text-center">Pricing & Enrollment</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="p-10 bg-white rounded-3xl border border-rose-100 shadow-sm text-center hover:shadow-xl transition-shadow relative top-4">
            <h3 className="font-bold text-stone-900 text-xl mb-2">Basic</h3>
            <p className="text-stone-500 mb-8 pb-8 border-b border-rose-50">Introductory course • 1 week</p>
            <p className="text-4xl font-serif text-rose-800 mb-8">₹4,999</p>
            <Link href="/book-appointment" className="block w-full py-3 bg-white border-2 border-rose-800 text-rose-800 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-rose-50 transition-colors">Enroll Now</Link>
          </div>
          <div className="p-10 bg-rose-800 rounded-3xl shadow-xl text-center transform md:-translate-y-4">
            <div className="bg-rose-400 text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full inline-block mb-4">Most Popular</div>
            <h3 className="font-bold text-white text-xl mb-2">Professional</h3>
            <p className="text-rose-200 mb-8 pb-8 border-b border-rose-700">Full program • 4 weeks</p>
            <p className="text-4xl font-serif text-white mb-8">₹19,999</p>
            <Link href="/book-appointment" className="block w-full py-3 bg-white text-rose-900 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-rose-50 transition-colors shadow-lg">Enroll Now</Link>
          </div>
          <div className="p-10 bg-white rounded-3xl border border-rose-100 shadow-sm text-center hover:shadow-xl transition-shadow relative top-4">
            <h3 className="font-bold text-stone-900 text-xl mb-2">Masterclass</h3>
            <p className="text-stone-500 mb-8 pb-8 border-b border-rose-50">Advanced techniques • 2 weeks</p>
            <p className="text-4xl font-serif text-rose-800 mb-8">₹29,999</p>
            <Link href="/book-appointment" className="block w-full py-3 bg-white border-2 border-rose-800 text-rose-800 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-rose-50 transition-colors">Enroll Now</Link>
          </div>
        </div>
      </section>

      {/* Testimonials / CTA */}
      <section className="container mx-auto px-4 mb-10">
        <div className="bg-rose-50 rounded-3xl p-10 md:p-16 border border-rose-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl"></div>
          <h2 className="text-3xl font-serif italic text-stone-900 mb-12 relative z-10">Success Stories</h2>
          <div className="grid sm:grid-cols-2 gap-8 relative z-10 text-left">
            <blockquote className="p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white">
              <span className="text-4xl text-rose-300 font-serif leading-none">"</span>
              <p className="text-stone-700 italic mb-6 leading-relaxed">The trainers were so supportive — hands-on classes made all the difference. I started freelancing within a month.</p>
              <footer className="font-bold text-stone-900 text-sm tracking-widest uppercase">— Meera S.</footer>
            </blockquote>
            <blockquote className="p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm border border-white">
              <span className="text-4xl text-rose-300 font-serif leading-none">"</span>
              <p className="text-stone-700 italic mb-6 leading-relaxed">Excellent curriculum and real-client practice. The portfolio review helped me land a premium salon position.</p>
              <footer className="font-bold text-stone-900 text-sm tracking-widest uppercase">— Riya P.</footer>
            </blockquote>
          </div>
          <div className="mt-12 text-center relative z-10">
            <Link href="/contact" className="inline-block px-8 py-4 bg-white border border-rose-200 text-rose-800 rounded-xl font-bold uppercase tracking-widest text-sm shadow-sm hover:bg-rose-100 transition-all hover:shadow-md">Ask about group discounts</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
