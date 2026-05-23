import React from 'react';
import { motion } from 'motion/react';
import { Service, PageId } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, ChevronRight, Sliders, MessageCircle, PhoneCall, Shield, Clock, Users, Award, Leaf, Smartphone, FileText, UserCheck, Search, Handshake } from 'lucide-react';

interface HomeViewProps {
  services: Service[];
  onSelectService: (service: Service) => void;
  setActiveTab: (tab: PageId) => void;
  openAdminPanel: () => void;
  openBookingModal: () => void;
}

export default function HomeView({ services, onSelectService, setActiveTab, openAdminPanel, openBookingModal }: HomeViewProps) {
  const visibleServices = services.filter(s => s.isVisible);

  // Moving finance ticker content using real services only
  const tickerServices = [
    'Personal Loans',
    'Business Loans',
    'Health Insurance',
    'Credit Repair',
    'Mutual Funds',
    'Tax Filing',
    'GST Returns',
    'Property Loans',
    'Financial Support',
    'Insurance Guidance'
  ];

  return (
    <div className="w-full relative bg-white">
      
      {/* ABSTRACT LIGHT DECORATIVE FLOWING LINES & GRID OVERLAY */}
      <div className="absolute inset-x-0 top-0 h-[850px] overflow-hidden pointer-events-none select-none z-0">
        <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#0d3979_1px,transparent_1px),linear-gradient(to_bottom,#0d3979_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Soft elegant linear background fade to blend graphic */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />

        <svg className="absolute w-[140%] md:w-[120%] h-full left-1/2 -translate-x-1/2 opacity-[0.25]" fill="none" viewBox="0 0 1440 850" preserveAspectRatio="none">
          {/* DEFINITIONS FOR GRADIENTS */}
          <defs>
            <linearGradient id="heroFlowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0d3979" stopOpacity="0.05" />
              <stop offset="30%" stopColor="#2F6E73" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#0d3979" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2F6E73" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="heroFlowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2F6E73" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#1e40af" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0d3979" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="glowPulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0d3979" stopOpacity="0" />
              <stop offset="50%" stopColor="#2F6E73" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0d3979" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Flow Line 1 - Broad sweeping curved wave */}
          <motion.path
            d="M -100 350 C 300 150, 500 550, 900 320 C 1200 180, 1300 600, 1600 380"
            stroke="url(#heroFlowGradient1)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, strokeDasharray: "20 40" }}
            animate={{ 
              pathLength: 1,
              strokeDashoffset: [0, -1200]
            }}
            transition={{ 
              pathLength: { duration: 3, ease: "easeOut" },
              strokeDashoffset: { duration: 25, ease: "linear", repeat: Infinity }
            }}
          />

          {/* Flow Line 2 - Technical secondary dash wave */}
          <motion.path
            d="M -50 450 C 350 250, 650 650, 1050 350 C 1300 150, 1400 550, 1650 300"
            stroke="url(#heroFlowGradient2)"
            strokeWidth="1.5"
            strokeLinejoin="round"
            initial={{ pathLength: 0, strokeDasharray: "10 20" }}
            animate={{ 
              pathLength: 1,
              strokeDashoffset: [0, 800]
            }}
            transition={{ 
              pathLength: { duration: 3.5, ease: "easeOut" },
              strokeDashoffset: { duration: 20, ease: "linear", repeat: Infinity }
            }}
          />

          {/* Flow Line 3 - Fast-flowing energy accent track */}
          <motion.path
            d="M -200 250 Q 400 600, 1000 280 T 1700 450"
            stroke="url(#glowPulse)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, strokeDasharray: "150 450" }}
            animate={{ 
              pathLength: 1,
              strokeDashoffset: [0, -1800]
            }}
            transition={{ 
              pathLength: { duration: 4, ease: "easeOut" },
              strokeDashoffset: { duration: 12, ease: "linear", repeat: Infinity }
            }}
          />

          {/* Dynamic flowing packets/orbs traveling along the paths */}
          {/* Packet 1 */}
          <motion.circle
            r="4"
            fill="#2F6E73"
            animate={{
              offsetDistance: ["0%", "100%"]
            }}
            transition={{
              duration: 15,
              ease: "linear",
              repeat: Infinity
            }}
            style={{
              offsetPath: "path('M -100 350 C 300 150, 500 550, 900 320 C 1200 180, 1300 600, 1600 380')",
              offsetRotate: "auto"
            }}
          />

          {/* Packet 2 */}
          <motion.circle
            r="3.5"
            fill="#0d3979"
            animate={{
              offsetDistance: ["0%", "100%"]
            }}
            transition={{
              duration: 18,
              ease: "linear",
              repeat: Infinity,
              delay: 4
            }}
            style={{
              offsetPath: "path('M -50 450 C 350 250, 650 650, 1050 350 C 1300 150, 1400 550, 1650 300')",
              offsetRotate: "auto"
            }}
          />
        </svg>

        {/* Ambient background glow points (Subtle) */}
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-blue-50/40 blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-[45%] left-[5%] w-[400px] h-[400px] rounded-full bg-emerald-50/30 blur-3xl -z-10 pointer-events-none" />
      </div>

      {/* HOMEPAGE HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-between pt-28 md:pt-36 pb-12 z-10 px-6 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center flex-1">
          
          {/* TEXT STACK (Left Side) */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-center">
            
            {/* Visual spacer bar tag */}
            <div className="mb-6 flex items-center space-x-2">
              <div className="w-12 h-[1.5px] bg-[#2F6E73]"></div>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#2F6E73]">
                Your Financial Journey, Guided • Visakhapatnam
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-sans font-black leading-[1.0] tracking-tighter text-[#0d3979] text-5xl sm:text-6xl md:text-7xl lg:text-[76px] uppercase select-none">
              Nihira Finserv<br/>
              Smarter Financial<br/>
              Solutions Vizag
            </h1>

            {/* Secondary outlined typography */}
            <div className="mt-4 mb-6">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent uppercase tracking-tight" style={{ WebkitTextStroke: '1.5px #0d3979' }}>
                Loans. Insurance. Growth.
              </span>
            </div>

            {/* Subheadline */}
            <p className="font-sans text-[#111827]/75 text-sm sm:text-base leading-relaxed max-w-lg mt-2 select-none font-medium">
              We provide individuals and businesses in Visakhapatnam & Andhra Pradesh with access to smarter finance options, focusing on Housing loans, MSME funding, General insurance, credit repair, and tax solutions.
            </p>

            {/* Supporting trust text */}
            <p className="font-sans text-[11px] text-[#2F6E73] font-bold uppercase tracking-wider mt-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F6E73] animate-ping" />
              Trusted local advisory for Visakhapatnam, Vizag and across Andhra Pradesh.
            </p>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                id="hero_primary_cta"
                onClick={openBookingModal}
                className="px-8 py-4 bg-[#0d3979] hover:bg-black text-white text-xs font-sans font-black tracking-widest uppercase rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(13,57,121,0.2)] hover:shadow-black/15 cursor-pointer flex items-center gap-2"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <a
                id="hero_secondary_cta"
                href="https://wa.me/918143355559?text=Hello%20Nihira%20Finserv%20Visakhapatnam,%20I%20would%20like%20to%20inquire%20about%20your%20financial%20services%20in%20Vizag."
                target="_blank"
                rel="noopener noreferrer"
                className="group px-7 py-4 border border-[#E6E6E6] bg-white hover:bg-[#F5F5F4] text-[#0d3979] hover:text-black hover:border-black text-xs font-sans font-black tracking-widest uppercase rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]/10" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE GRAPHICAL BOX (Aesthetic & Purposeful Placeholder Content) */}
          <div className="lg:col-span-12 xl:col-span-5 relative flex justify-center items-center">
            
            {/* Visual Frame */}
            <div className="relative w-full aspect-[4/5] max-w-sm rounded-[36px] border border-[#E6E6E6] shadow-[0_20px_40px_rgba(0,0,0,0.04)] overflow-hidden bg-[#0d3979] flex flex-col justify-between p-8">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F5F5F4 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              
              {/* Header metrics */}
              <div className="relative z-10 w-full flex justify-between items-start">
                <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] bg-white rounded px-2.5 py-1 font-bold">
                  NIHIRA CORE MD
                </span>
                <div className="text-white/60 text-[9px] font-mono tracking-wider text-right leading-none space-y-1">
                  <p>EXPERIENCE: 10Y</p>
                  <p>STATUS: ACTIVE_SUPPORT</p>
                </div>
              </div>

              {/* Decorative clean image showing client consulting */}
              <div className="relative z-10 my-4 border border-white/10 rounded-2xl overflow-hidden aspect-[16/11] bg-[#111827]">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=700&auto=format&fit=crop"
                  alt="Financial Guidance and Support Session"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-85 hover:scale-102 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d3979]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <div className="text-[7.5px] uppercase tracking-widest text-[#0d3979] font-black bg-white px-2 py-0.5 rounded leading-none inline-block">HUMAN APPRECIABLE VIEW</div>
                  <div className="text-xs font-sans font-bold text-white uppercase mt-1">Clarity & Direction Support</div>
                </div>
              </div>

              {/* Direct Quick support indicator panel */}
              <div className="relative z-10 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 mt-auto">
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/95 font-bold mb-3 flex items-center gap-2">
                  <div className="relative flex items-center justify-center w-5 h-5 rounded-sm bg-white text-[#0d3979] shrink-0">
                    <div className="w-3.5 h-[1.5px] bg-[#0d3979] -rotate-45 translate-x-[1px]" />
                    <div className="w-3.5 h-[1.5px] bg-[#0d3979] rotate-45 -translate-x-[1px]" />
                  </div>
                  <span>Standard Guidance Goals</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/80 font-sans">Compare Loan Products</span>
                    <span className="text-white font-mono font-bold">Guided</span>
                  </div>
                  <div className="h-[1px] bg-white/10 w-full" />
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/80 font-sans">Tax Filing Deadlines</span>
                    <span className="text-[#D8F3DC] bg-[#2D6A4F]/20 px-2.5 py-0.5 rounded font-mono font-bold uppercase text-[8.5px]">Assisted</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* BOTTOM METEORIC SLOW FINANCIAL TICKER using REAL SERVICES ONLY */}
        <div className="relative w-screen left-1/2 -translate-x-1/2 bg-black py-4.5 overflow-hidden select-none z-20 mt-12 border-y border-white/10 shadow-md">
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          <div className="flex w-max gap-16 whitespace-nowrap animate-marquee">
            {[1, 2].map((loopIdx) => (
              <div key={loopIdx} className="flex gap-16 shrink-0 text-[11px] font-mono font-bold text-white/95 tracking-[0.18em] uppercase items-center">
                {tickerServices.map((tickerItem, tidx) => (
                  <React.Fragment key={tidx}>
                    <span>{tickerItem}</span>
                    <span className="text-white/20">•</span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIMARY SERVICES SHOWCASE SHOWDOWN SECTION */}
      <section id="horizontal_services_center" className="bg-[#F5F5F4] border-y border-[#E6E6E6] py-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] uppercase font-bold block mb-2 font-black bg-white w-max px-2.5 py-1 rounded shadow-sm">
                GUIDANCE AND CONSULTATION
              </span>
              <h2 className="font-sans font-black text-4xl md:text-5xl tracking-tight text-[#0d3979] uppercase">
                Our Primary Services
              </h2>
            </div>
          </div>

          {/* RENDER DYNAMIC SERVICES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleServices.map((service, idx) => (
              <div
                key={service.id}
                id={`horizontal_service_card_${service.id}`}
                className="group relative bg-white border border-[#E6E6E6] hover:border-black rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col justify-between aspect-[4/5] transition-all duration-300 hover:shadow-md"
              >
                {/* Image block */}
                <div className="relative w-full aspect-[16/10] bg-stone-100 rounded-2xl overflow-hidden mb-6">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-all duration-300"
                  />
                  {/* Status element */}
                  <div className="absolute bottom-3 left-3 bg-[#0d3979] text-white px-3 py-1 rounded-lg font-mono text-[9px] tracking-widest uppercase font-bold">
                    {service.stats.value}
                  </div>
                </div>

                {/* Body Text */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] font-bold uppercase">
                      SERVICE SERVICE • 0{idx + 1}
                    </span>
                    <span className="font-mono text-[9px] text-[#111827]/40 font-bold uppercase">
                      {service.stats.label}
                    </span>
                  </div>
                  
                  <h3 className="font-sans font-black text-xl text-[#0d3979] group-hover:text-black transition-colors leading-tight uppercase">
                    {service.title}
                  </h3>
                  
                  <p className="font-sans text-xs text-[#111827]/70 leading-relaxed mt-2">
                    {service.description}
                  </p>
                </div>

                {/* Detail Analysis clicker */}
                <div className="mt-6 pt-4 border-t border-[#E6E6E6] flex items-center justify-between">
                  <button
                    onClick={() => onSelectService(service)}
                    className="flex items-center gap-1 font-mono text-[10px] tracking-widest text-[#0d3979] hover:text-black font-black uppercase transition-colors pointer-events-auto cursor-pointer"
                  >
                    <span>Read Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Human readable premium CTA block */}
          <div className="mt-12 bg-white rounded-[32px] p-8 md:p-10 border border-[#E6E6E6] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex gap-4 items-start max-w-2xl">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F5F4] border border-[#E6E6E6] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div>
                <h4 className="font-sans font-black text-base text-[#0d3979] uppercase">
                  Need Help Planning Your Application?
                </h4>
                <p className="font-sans text-xs text-[#111827]/60 leading-relaxed mt-1 font-medium">
                  We provide friendly explanation of loan criterias, auto policy exclusions, index selection, or tax documents required. Book a consultation format with our core office consultants.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('contact')}
              className="px-6 py-3 border border-[#0d3979] text-[#0d3979] hover:bg-[#0d3979] hover:text-white transition-all text-xs font-sans font-black tracking-wider uppercase rounded-full shrink-0 cursor-pointer"
            >
              Get Consultation
            </button>
          </div>
        </div>
      </section>

      {/* CORE GROUNDATIVE TRUST DETAILS (Trust stats matching prompt guidelines) */}
      <section className="bg-white py-24 px-6 md:px-8 border-b border-[#E6E6E6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] uppercase font-bold block mb-2 bg-[#F5F5F4] w-max px-2.5 py-1 rounded mx-auto leading-none">
              OUR GUIDANCE STANDARDS
            </span>
            <h2 className="font-sans font-black text-3xl md:text-4xl tracking-tight text-[#0d3979] uppercase">
              Reliable Support and Financial Guidance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            {/* Stat 1 */}
            <div className="border border-[#E6E6E6] rounded-3xl p-6 bg-[#F5F5F4]/20 hover:scale-[1.02] transition-transform duration-300">
              <span className="block font-sans font-black text-4xl tracking-tighter text-[#0d3979] uppercase">
                5
              </span>
              <span className="block font-sans font-black text-xs tracking-wider text-[#2F6E73] uppercase mt-2.5">
                Core Services
              </span>
              <p className="font-sans text-[11px] text-[#111827]/60 mt-1 leading-relaxed font-semibold">
                Access guided support across Loans, Insurance, Credit Score, Mutual Funds, and Tax Filing.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="border border-[#E6E6E6] rounded-3xl p-6 bg-[#F5F5F4]/20 hover:scale-[1.02] transition-transform duration-300">
              <span className="block font-sans font-black text-4xl tracking-tighter text-black uppercase">
                10+ Years
              </span>
              <span className="block font-sans font-black text-xs tracking-wider text-[#2F6E73] uppercase mt-2.5">
                Experience
              </span>
              <p className="font-sans text-[11px] text-[#111827]/60 mt-1 leading-relaxed font-semibold">
                Successfully advising individual and business clients with practical support over ten years.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="border border-[#E6E6E6] rounded-3xl p-6 bg-[#F5F5F4]/20 hover:scale-[1.02] transition-transform duration-300">
              <span className="block font-sans font-black text-4xl tracking-tighter text-[#0d3979] uppercase">
                Trusted
              </span>
              <span className="block font-sans font-black text-xs tracking-wider text-[#2F6E73] uppercase mt-2.5">
                Guidance
              </span>
              <p className="font-sans text-[11px] text-[#111827]/60 mt-1 leading-relaxed font-semibold">
                Clear documentation instructions, option listings, and zero hidden bank percentages.
              </p>
            </div>

            {/* Stat 4 */}
            <div className="border border-[#E6E6E6] rounded-3xl p-6 bg-[#F5F5F4]/20 hover:scale-[1.02] transition-transform duration-300">
              <span className="block font-sans font-black text-4xl tracking-tighter text-black uppercase">
                Human Focus
              </span>
              <span className="block font-sans font-black text-xs tracking-wider text-[#2F6E73] uppercase mt-2.5">
                Client-Focused Support
              </span>
              <p className="font-sans text-[11px] text-[#111827]/60 mt-1 leading-relaxed font-semibold">
                We design services around understanding your daily needs and budget, strictly without hype.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE NIHIRA FINSERV? */}
      <section className="bg-white py-24 px-6 md:px-8 border-b border-[#E6E6E6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-sans font-black text-3xl md:text-4xl tracking-tight text-[#0d3979] uppercase">
              Why Choose Nihira Finserv?
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#111827]/60 leading-relaxed mt-2.5 font-medium">
              Discover what sets us apart in the financial services industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Trusted Partnerships */}
            <div className="border border-[#E6E6E6] rounded-[32px] p-8 bg-[#F5F5F4]/20 hover:scale-[1.02] hover:border-[#0d3979] transition-all duration-300 flex flex-col items-center text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#0d3979]/5 flex items-center justify-center text-[#0d3979]">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="font-sans font-black text-lg text-[#0d3979] uppercase">
                Trusted Partnerships
              </h3>
              <p className="font-sans text-xs text-[#111827]/70 leading-relaxed font-medium">
                We partner with over 40 leading banks to offer you the best rates and terms available in the market.
              </p>
            </div>

            {/* Card 2: Quick Processing */}
            <div className="border border-[#E6E6E6] rounded-[32px] p-8 bg-[#F5F5F4]/20 hover:scale-[1.02] hover:border-[#0d3979] transition-all duration-300 flex flex-col items-center text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#2F6E73]/5 flex items-center justify-center text-[#2F6E73]">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="font-sans font-black text-lg text-[#0d3979] uppercase">
                Quick Processing
              </h3>
              <p className="font-sans text-xs text-[#111827]/70 leading-relaxed font-medium">
                Our streamlined process ensures fast approvals and disbursals, getting you the funds you need when you need them.
              </p>
            </div>

            {/* Card 3: Expert Guidance */}
            <div className="border border-[#E6E6E6] rounded-[32px] p-8 bg-[#F5F5F4]/20 hover:scale-[1.02] hover:border-[#0d3979] transition-all duration-300 flex flex-col items-center text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#0d3979]/5 flex items-center justify-center text-[#0d3979]">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-sans font-black text-lg text-[#0d3979] uppercase">
                Expert Guidance
              </h3>
              <p className="font-sans text-xs text-[#111827]/70 leading-relaxed font-medium">
                Our experienced team provides personalized financial advice to help you make informed decisions.
              </p>
            </div>

            {/* Card 4: 95+% Success Rate */}
            <div className="border border-[#E6E6E6] rounded-[32px] p-8 bg-[#F5F5F4]/20 hover:scale-[1.02] hover:border-[#0d3979] transition-all duration-300 flex flex-col items-center text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#2F6E73]/5 flex items-center justify-center text-[#2F6E73]">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-sans font-black text-lg text-[#0d3979] uppercase">
                95+% Success Rate
              </h3>
              <p className="font-sans text-xs text-[#111827]/70 leading-relaxed font-medium">
                With nearly two decades of experience, we have a proven track record of helping clients achieve their financial goals.
              </p>
            </div>

            {/* Card 5: Sustainable Financing */}
            <div className="border border-[#E6E6E6] rounded-[32px] p-8 bg-[#F5F5F4]/20 hover:scale-[1.02] hover:border-[#0d3979] transition-all duration-300 flex flex-col items-center text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#0d3979]/5 flex items-center justify-center text-[#0d3979]">
                <Leaf className="w-7 h-7" />
              </div>
              <h3 className="font-sans font-black text-lg text-[#0d3979] uppercase">
                Sustainable Financing
              </h3>
              <p className="font-sans text-xs text-[#111827]/70 leading-relaxed font-medium">
                We offer green financing options to support environmentally friendly projects and initiatives.
              </p>
            </div>

            {/* Card 6: Digital Convenience */}
            <div className="border border-[#E6E6E6] rounded-[32px] p-8 bg-[#F5F5F4]/20 hover:scale-[1.02] hover:border-[#0d3979] transition-all duration-300 flex flex-col items-center text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#2F6E73]/5 flex items-center justify-center text-[#2F6E73]">
                <Smartphone className="w-7 h-7" />
              </div>
              <h3 className="font-sans font-black text-lg text-[#0d3979] uppercase">
                Digital Convenience
              </h3>
              <p className="font-sans text-xs text-[#111827]/70 leading-relaxed font-medium">
                Apply online, track your application status, and manage your loans through our user-friendly digital platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SIMPLE PROCESS */}
      <section className="bg-[#F5F5F4]/60 py-24 px-6 md:px-8 border-b border-[#E6E6E6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="font-sans font-black text-3xl md:text-4xl tracking-tight text-[#0d3979] uppercase">
              Our Simple Process
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#111827]/60 leading-relaxed mt-2.5 font-medium">
              Get your loan in just a few easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="relative border border-[#E6E6E6] rounded-[32px] p-8 bg-white hover:border-[#0d3979] transition-all duration-300 flex flex-col items-center text-center space-y-4 shadow-sm pt-12 animate-none">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0d3979] text-white flex items-center justify-center font-sans font-black text-sm shadow-md border-4 border-white">
                01
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#0d3979]/5 flex items-center justify-center text-[#0d3979]">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="font-sans font-black text-lg text-[#0d3979] uppercase animate-none">
                Apply Online
              </h3>
              <p className="font-sans text-xs text-[#111827]/70 leading-relaxed font-medium">
                Fill out our simple online application form with your basic details and requirements.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative border border-[#E6E6E6] rounded-[32px] p-8 bg-white hover:border-[#0d3979] transition-all duration-300 flex flex-col items-center text-center space-y-4 shadow-sm pt-12 animate-none">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0d3979] text-white flex items-center justify-center font-sans font-black text-sm shadow-md border-4 border-white">
                02
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#2F6E73]/5 flex items-center justify-center text-[#2F6E73]">
                <UserCheck className="w-7 h-7" />
              </div>
              <h3 className="font-sans font-black text-lg text-[#0d3979] uppercase animate-none">
                Document Verification
              </h3>
              <p className="font-sans text-xs text-[#111827]/70 leading-relaxed font-medium">
                Submit your documents for verification. Our team will guide you through the process.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative border border-[#E6E6E6] rounded-[32px] p-8 bg-white hover:border-[#0d3979] transition-all duration-300 flex flex-col items-center text-center space-y-4 shadow-sm pt-12 animate-none">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0d3979] text-white flex items-center justify-center font-sans font-black text-sm shadow-md border-4 border-white">
                03
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#0d3979]/5 flex items-center justify-center text-[#0d3979]">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="font-sans font-black text-lg text-[#0d3979] uppercase animate-none">
                Credit Assessment
              </h3>
              <p className="font-sans text-xs text-[#111827]/70 leading-relaxed font-medium">
                We assess your creditworthiness and match you with the best loan options available.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative border border-[#E6E6E6] rounded-[32px] p-8 bg-white hover:border-[#0d3979] transition-all duration-300 flex flex-col items-center text-center space-y-4 shadow-sm pt-12 animate-none">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0d3979] text-white flex items-center justify-center font-sans font-black text-sm shadow-md border-4 border-white">
                04
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#2F6E73]/5 flex items-center justify-center text-[#2F6E73]">
                <Handshake className="w-7 h-7" />
              </div>
              <h3 className="font-sans font-black text-lg text-[#0d3979] uppercase animate-none">
                Loan Approval & Disbursal
              </h3>
              <p className="font-sans text-xs text-[#111827]/70 leading-relaxed font-medium">
                Once approved, funds are disbursed directly to your account within 24-48 hours.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* BRIEF INTERACTION TRIGGER FOR THE EMI CALCULATOR COMPONENT */}
      <section className="bg-[#F5F5F4] py-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] uppercase font-bold block mb-2 bg-white w-max px-2.5 py-1 rounded mx-auto shadow-sm">
            CALCULATORS PREVIEW
          </span>
          <h2 className="font-sans font-black text-3xl md:text-4xl text-[#0d3979] uppercase tracking-tight">
            Perform Loan Amortization Calculations
          </h2>
          <p className="font-sans text-xs text-[#111827]/60 leading-relaxed mt-2.5 max-w-lg mx-auto font-medium">
            Test loan schedules instantly using our standard computing tool. Completely offline, transparent, and private.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-4 rounded-[36px] shadow-sm border border-[#E6E6E6]">
            <div className="px-4 py-2 border-b border-[#E6E6E6] flex items-center justify-between text-xs font-mono text-[#111827]/60">
              <span>ONLINE LOAN CALCULATOR COMPONENT</span>
              <span className="text-black font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                SECURE & READY
              </span>
            </div>
            <div className="p-4 flex flex-col items-center">
              <p className="text-xs text-[#111827]/70 font-sans mb-4 text-center">
                Access our detailed EMI Calculator featuring full yearly ledger breakdowns, circular ratio loaders, and parameter sliders.
              </p>
              <button
                onClick={() => {
                  setActiveTab('emi-calculator');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0d3979] hover:bg-black text-white rounded-full font-mono text-xs font-extrabold uppercase transition-all cursor-pointer shadow-sm hover:shadow"
              >
                <span>Launch Interactive EMI Calculator</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
