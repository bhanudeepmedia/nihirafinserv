import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Service, ConsultationRequest } from '../types';
import { 
  ArrowLeft, Send, CheckCircle2, ChevronDown, 
  ChevronUp, ShieldCheck, HelpCircle, ArrowRight, MessageCircle 
} from 'lucide-react';

interface ServicesViewProps {
  services: Service[];
  selectedService: Service | null;
  onSelectService: (service: Service | null) => void;
  onSubmitConsultation: (request: ConsultationRequest) => Promise<boolean>;
}

export default function ServicesView({ services, selectedService, onSelectService, onSubmitConsultation }: ServicesViewProps) {
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);
  
  // Dynamic categories dictionary matching user specs
  const SUBTYPES_BY_SERVICE: Record<string, string[]> = {
    'loans': [
      'Housing loans',
      'Personal loans',
      'Mortgage loans',
      'Unsecured business loans',
      'Working capital OD/CC loans',
      'MSME loans',
      'Professional loans',
      'Machinery loans',
      'Vehicle loans',
      'Project funding',
      'School and college funding',
      'Solar funding',
      'nihira-finserv loans'
    ],
    'insurance': [
      'Health Insurance',
      'Life Insurance',
      'Vehicle Insurance',
      'Business Insurance',
      'General Insurance'
    ],
    'credit-repair': [
      'Credit Score Education & Consultation',
      'Credit Report Discrepancy Parsing',
      'Credit Habit Coaching & Plan',
      'Score Rebuilding Support'
    ],
    'mutual-funds': [
      'Equity Mutual Funds',
      'Debt Mutual Funds',
      'Index & Hybrid Funds',
      'SIP Investment Consulting',
      'Lumpsum Financial Planning'
    ],
    'tax-filing': [
      'Income Tax Returns (ITR) Filing',
      'GST Setup & Returns filing',
      'Business Accounting & Booking',
      'Auditing & Compliance Consultation'
    ]
  };

  // Lead Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [helpOption, setHelpOption] = useState('Loans');
  const [selectedSubType, setSelectedSubType] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const visibleServices = services.filter(s => s.isVisible);

  // Synchronize helpOption based on selected service page
  React.useEffect(() => {
    if (selectedService) {
      const idMap: Record<string, string> = {
        'loans': 'Loans',
        'insurance': 'Insurance',
        'credit-repair': 'Credit Score Repair',
        'mutual-funds': 'Mutual Funds',
        'tax-filing': 'Accounts & Tax Filing'
      };
      setHelpOption(idMap[selectedService.id] || 'Loans');
    }
  }, [selectedService]);

  // Auto update dynamic subtypes configuration options for second selector
  const activeServiceKey = helpOption === 'Loans' ? 'loans' :
                           helpOption === 'Insurance' ? 'insurance' :
                           helpOption === 'Credit Score Repair' ? 'credit-repair' :
                           helpOption === 'Mutual Funds' ? 'mutual-funds' :
                           helpOption === 'Accounts & Tax Filing' ? 'tax-filing' : 'loans';

  const subTypeOptions = SUBTYPES_BY_SERVICE[activeServiceKey] || [];

  React.useEffect(() => {
    if (subTypeOptions.length > 0) {
      setSelectedSubType(subTypeOptions[0]);
    } else {
      setSelectedSubType('');
    }
  }, [helpOption, selectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    setIsSubmitting(true);
    const req: ConsultationRequest = {
      fullName,
      email,
      phone,
      serviceOfInterest: helpOption,
      wealthBracket: selectedSubType, // mapping search subtype cleanly
      message
    };

    const success = await onSubmitConsultation(req);
    setIsSubmitting(false);
    if (success) {
      setFormSubmitted(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }
  };

  // 1. DETAILED SERVICE LANDING PAGE RENDER
  if (selectedService) {
    const s = selectedService;
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="w-full bg-white pt-24"
      >
        {/* LARGE IMAGE BANNER */}
        <section className="relative h-[380px] w-full overflow-hidden flex items-end">
          <div className="absolute inset-0 z-0">
            <img
              src={s.imageUrl}
              alt={s.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover contrast-110 brightness-[0.5] scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d3979] via-[#0d3979]/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-8 pb-12">
            <div className="max-w-4xl">
              {/* Back Navigation */}
              <button
                onClick={() => { onSelectService(null); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                className="group inline-flex items-center gap-2 text-white/80 hover:text-white font-mono text-[9px] tracking-wider uppercase mb-6 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Return to Services Directory</span>
              </button>

              <div className="flex flex-wrap items-baseline gap-4 mb-2">
                <span className="font-mono text-[9px] tracking-widest text-[#25D366] font-bold uppercase bg-white/10 px-2 py-0.5 rounded">
                  SUPPORT ACTIVE
                </span>
                <span className="font-mono text-[9px] text-white/70">• {s.stats.label}</span>
              </div>
              
              <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[0.9]">
                {s.title}
              </h1>
            </div>
          </div>
        </section>

        {/* DETAILS LAYOUT & STORYTELLING */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 divide-y divide-[#E6E6E6]">
          
          {/* Intro description & stats block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 items-start">
            <div className="lg:col-span-8">
              <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] font-bold block mb-2">
                SERVICE SUMMARY
              </span>
              <p className="font-sans text-lg md:text-xl text-[#0d3979] leading-relaxed font-semibold">
                {s.detailIntro}
              </p>
            </div>
            
            <div className="lg:col-span-4 bg-[#F5F5F4] border border-[#E6E6E6] p-6 rounded-2xl">
              <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] block uppercase mb-1 font-bold">
                SUPPORT BENCHMARK
              </span>
              <span className="font-sans font-black text-3xl md:text-4xl text-[#0d3979] block">
                {s.stats.value}
              </span>
              <span className="font-sans text-[11px] text-[#111827]/60 block mt-2 whitespace-pre-line leading-relaxed">
                {s.stats.label}
              </span>
            </div>
          </div>

          {/* Sequential Process Map */}
          <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] font-bold block mb-2">
                PROCESS TIMELINE
              </span>
              <h2 className="font-sans font-black text-2xl md:text-3xl text-[#0d3979] uppercase tracking-tight">
                Simple process timeline
              </h2>
              <p className="font-sans text-xs text-[#111827]/60 mt-2 leading-relaxed">
                We guide you step-by-step through standard documentation and procedures in three clear stages.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-4">
              {s.howItWorks.map((step, idx) => {
                const parts = step.split(':');
                const title = parts[0];
                const desc = parts[1] || '';
                return (
                  <div key={idx} className="bg-[#F5F5F4]/60 border border-[#E6E6E6] p-6 rounded-2xl flex gap-4">
                    <span className="font-mono text-xs font-bold text-black shrink-0 bg-white border border-[#E6E6E6] w-8 h-8 rounded-full flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="font-sans font-bold text-xs text-[#0d3979] uppercase tracking-wider">{title}</h4>
                      {desc && <p className="font-sans text-xs text-[#111827]/70 leading-relaxed mt-1.5">{desc}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Core Advantages */}
          <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] font-bold block mb-2">
                WHY CHOOSE THIS
              </span>
              <h2 className="font-sans font-black text-2xl md:text-3xl text-[#0d3979] uppercase tracking-tight">
                Core benefits
              </h2>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {s.benefits.map((benefit, idx) => (
                <div key={idx} className="border border-[#E6E6E6] rounded-2xl p-6 space-y-3 shadow-sm bg-white">
                  <CheckCircle2 className="w-5 h-5 text-[#2F6E73]" />
                  <p className="font-sans text-xs font-semibold text-[#0d3979] leading-snug">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Case Example In Practice - Humble Story */}
          {s.caseExample && (
            <div className="py-16 bg-[#0d3979] text-white -mx-6 md:-mx-8 px-6 md:px-12 rounded-[40px] my-12 border border-[#0d3979]/10 relative overflow-hidden shadow-xl">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 rounded-full border border-white/[0.03] pointer-events-none" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-5 space-y-3">
                  <span className="font-mono text-[9px] tracking-widest text-[#25D366] font-bold uppercase block bg-white/10 w-max px-2 py-0.5 rounded">
                    CASE IN PRACTICE
                  </span>
                  <span className="font-mono text-[8px] text-white/50 block">PRACTICAL CASE EXAMPLE</span>
                  <h3 className="font-sans font-black text-2xl md:text-3xl text-white uppercase tracking-tight leading-tight">
                    Service Example
                  </h3>
                  <div className="pt-4 border-t border-white/10">
                    <span className="block font-sans text-[10px] text-white/60 uppercase">CLIENT SEGMENT</span>
                    <span className="block font-sans font-bold text-xs text-white uppercase mt-0.5">{s.caseExample.client}</span>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6 text-xs leading-relaxed font-medium">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <span className="font-mono text-[9px] text-[#2F6E73] font-bold block uppercase">
                        The Challenge
                      </span>
                      <p className="font-sans text-white/85">{s.caseExample.challenge}</p>
                    </div>
                    <div className="space-y-1.5">
                      <span className="font-mono text-[9px] text-white font-bold block uppercase">
                        The Solution Support
                      </span>
                      <p className="font-sans text-white/85">{s.caseExample.solution}</p>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl mt-4">
                    <span className="font-mono text-[9px] text-[#25D366] font-bold uppercase block mb-1">
                      Practical Outcome
                    </span>
                    <p className="font-sans font-bold text-sm text-white">
                      {s.caseExample.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQs Accordion */}
          <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] font-bold block mb-2">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="font-sans font-black text-2xl md:text-3xl text-[#0d3979] uppercase tracking-tight">
                Service FAQs
              </h2>
              <p className="font-sans text-xs text-[#111827]/60 mt-2 leading-relaxed">
                Find helpful answers below to common questions regarding timelines, eligibility, and process requirements.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-2">
              {s.faqs.map((faq, idx) => {
                const isOpen = activeFaqIdx === idx;
                return (
                  <div key={idx} className="border border-[#E6E6E6] rounded-2xl bg-white overflow-hidden transition-all">
                    <button
                      onClick={() => setActiveFaqIdx(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-sans font-black text-xs uppercase tracking-wider text-[#0d3979] hover:bg-[#F5F5F4] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className="w-4 h-4 text-[#2F6E73]" />
                        {faq.question}
                      </span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-black" /> : <ChevronDown className="w-4 h-4 text-black" />}
                    </button>
                    
                    {isOpen && (
                      <div className="p-5 border-t border-[#E6E6E6] bg-[#F5F5F4]/30 font-sans text-xs text-[#111827]/75 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lead Callback Form (Consultation Request) */}
          <div id="service_lead_calculator" className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-[9px] tracking-widest text-[#0d3979] font-bold uppercase block bg-[#F5F5F4] w-max px-2.5 py-1 rounded">
                BOOK YOUR SERVICES CONSULTATION
              </span>
              <h3 className="font-sans font-black text-2xl md:text-3xl text-[#0d3979] uppercase tracking-tight leading-none">
                Consultation Inquiry
              </h3>
              <p className="font-sans text-xs text-[#111827]/70 leading-relaxed">
                Submit raw query details below to schedule a direct callback or guidance meeting. Our supportive consulting team will reach out within 24 hours.
              </p>
              
              <div className="p-4 bg-[#F5F5F4] border border-[#E6E6E6] rounded-xl space-y-3">
                <div className="flex gap-2.5 items-start">
                  <ShieldCheck className="w-4 h-4 text-[#2F6E73] shrink-0 mt-0.5" />
                  <p className="font-sans text-[10.5px] text-[#111827]/70 leading-relaxed">
                    <strong>Privacy First Commitment:</strong> We keep your phone and inquiry details absolutely private. We do not share your documentation details with third parties.
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="p-4 border border-[#E6E6E6] rounded-xl flex items-center justify-between bg-white shadow-sm">
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <div className="text-xs">
                    <span className="block font-bold text-black font-sans">Need instant answers?</span>
                    <span className="text-[11px] text-[#111827]/50 font-medium">Message our Advisor on WhatsApp</span>
                  </div>
                </div>
                <a
                  href={`https://wa.me/918143355559?text=Hello%20Nihira%20Finserv%20Visakhapatnam,%20I%27m%20seeking%20guidance%20on%20${encodeURIComponent(s.title)}%20in%20Vizag.`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-mono text-[9px] tracking-wider uppercase font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Chat Now</span>
                  <ArrowRight className="w-3 h-3 text-white" />
                </a>
              </div>

            </div>

            {/* Form card */}
            <div className="lg:col-span-7 bg-white border border-[#E6E6E6] p-6 md:p-8 rounded-[32px] shadow-sm relative">
              {formSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-sans font-black text-lg text-[#0d3979] uppercase">
                    Inquiry Received
                  </h4>
                  <p className="font-sans text-xs text-[#111827]/60 max-w-sm mx-auto leading-relaxed font-semibold">
                    Thank you for your request. Our team has received your consultation inquiry and will call you back shortly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-5 py-2.5 bg-[#0d3979] hover:bg-black text-white text-[9px] font-mono tracking-widest uppercase font-black rounded-lg transition-colors cursor-pointer"
                  >
                    Open New Form Session
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div>
                    <label className="font-sans text-[10px] font-black uppercase text-[#111827]/75 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Arun Kumar"
                      className="w-full border border-[#E6E6E6] px-4 py-2.5 rounded-xl text-xs font-sans focus:outline-none focus:border-black bg-[#F5F5F4]/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-sans text-[10px] font-black uppercase text-[#111827]/75 block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full border border-[#E6E6E6] px-4 py-2.5 rounded-xl text-xs font-sans focus:outline-none focus:border-black bg-[#F5F5F4]/30"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-[10px] font-black uppercase text-[#111827]/75 block mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full border border-[#E6E6E6] px-4 py-2.5 rounded-xl text-xs font-sans focus:outline-none focus:border-black bg-[#F5F5F4]/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-sans text-[10px] font-black uppercase text-[#111827]/75 block mb-1">
                        How Can We Best Help You?
                      </label>
                      <select
                        value={helpOption}
                        onChange={(e) => setHelpOption(e.target.value)}
                        className="w-full border border-[#E6E6E6] px-3 py-2.5 rounded-xl text-xs font-sans bg-white focus:outline-none focus:border-black font-semibold text-black"
                      >
                        <option value="Loans">Loans</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Credit Score Repair">Credit Score Repair</option>
                        <option value="Mutual Funds">Mutual Funds</option>
                        <option value="Accounts & Tax Filing">Accounts & Tax Filing</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-sans text-[10px] font-black uppercase text-[#111827]/75 block mb-1">
                        Select Specific Service Needed
                      </label>
                      <select
                        value={selectedSubType}
                        onChange={(e) => setSelectedSubType(e.target.value)}
                        className="w-full border border-[#E6E6E6] px-3 py-2.5 rounded-xl text-xs font-sans bg-white focus:outline-none focus:border-black font-semibold text-[#0d3979]"
                      >
                        {subTypeOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-sans text-[10px] font-black uppercase text-[#111827]/75 block mb-1">
                      Brief Message or Inquiry Details (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share any special timing concerns or raw requirements here..."
                      className="w-full border border-[#E6E6E6] px-4 py-2.5 rounded-xl text-xs font-sans focus:outline-none focus:border-black bg-[#F5F5F4]/30"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#0d3979] hover:bg-black disabled:bg-gray-500 text-white text-xs font-sans font-black tracking-widest uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'SUBMITTING INQUIRY...' : 'Submit Consultation Request'}</span>
                  </button>

                </form>
              )}
            </div>
          </div>
        </section>
      </motion.div>
    );
  }

  // 2. PRINCIPAL DIRECTORY PAGE RENDER (WHEN NO SERVICE IS SELECTED)
  return (
    <div className="w-full bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Story Intro */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] font-bold uppercase block mb-2 bg-[#F5F5F4] w-max px-2.5 py-1 rounded">
            SERVICES DIRECTORY
          </span>
          <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-[#0d3979] uppercase tracking-tight leading-[0.9]">
            Unified Services Directory
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#111827]/70 mt-4 leading-relaxed font-semibold">
            Nihira Finserv helps individuals and businesses access financial services through guidance, consultation and support across loans, insurance, credit score improvement, mutual funds, and tax-related services.
          </p>
        </div>

        {/* Dynamic Card Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Directory Listing */}
          <div className="lg:col-span-8 space-y-6">
            {visibleServices.map((service, idx) => (
              <div
                key={service.id}
                className="group border border-[#E6E6E6] hover:border-black rounded-[32px] p-6 bg-[#F5F5F4]/20 flex flex-col md:flex-row gap-6 hover:shadow-md transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="w-full md:w-56 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 bg-stone-100">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-all duration-300"
                  />
                </div>

                {/* Content info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#2F6E73] uppercase mb-1 font-bold">
                      <span>Service Level 0{idx + 1}</span>
                      <span className="text-[#111827]/40 bg-white border border-[#E6E6E6] rounded px-1.5">{service.stats.value}</span>
                    </div>
                    <h3 className="font-sans font-black text-lg text-[#0d3979] group-hover:text-black transition-colors uppercase leading-tight">
                      {service.title}
                    </h3>
                    <p className="font-sans text-xs text-[#111827]/70 leading-relaxed mt-2">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E6E6E6] flex items-center justify-between">
                    <button
                      onClick={() => { onSelectService(service); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                      className="inline-flex items-center gap-1 font-mono text-[10px] tracking-widest text-[#0d3979] hover:text-black font-black uppercase transition-colors cursor-pointer"
                    >
                      <span>View Process & FAQs</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    
                    <span className="font-mono text-[9px] bg-white border border-[#E6E6E6] px-2 py-0.5 rounded-md text-[#111827]/60 font-medium">
                      ACTIVE SUPPORT
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0d3979] text-white p-6 rounded-[32px] border border-[#0d3979]/10 relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-40 h-40 rounded-full border border-white/[0.03] pointer-events-none" />
              <span className="font-mono text-[9px] tracking-widest text-white/95 font-bold uppercase block mb-1">
                INSTANT ENGAGEMENT
              </span>
              <h3 className="font-sans font-black text-xl text-white uppercase tracking-tight">
                Connect on WhatsApp
              </h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed mt-3 font-medium">
                Speak to our team immediately to clarify urgent documentation filing requirements or loan choices. No automated banking loops.
              </p>
              
              <div className="pt-4 mt-6 border-t border-white/10">
                <a
                  href="https://wa.me/918143355559?text=Hello%20Nihira%20Finserv%20Visakhapatnam,%20I%20have%20an%20urgent%20financial%20service%20inquiry%20regarding%20local%20compliance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-stone-100 text-black font-mono text-[10px] tracking-wider uppercase font-black py-3 px-4 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]/5" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="border border-[#E6E6E6] rounded-[32px] p-6 bg-[#F5F5F4]/50 space-y-4">
              <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] uppercase font-bold block mb-1">
                REGULATORY STANDARDS
              </span>
              <h4 className="font-sans font-bold text-xs text-[#0d3979] uppercase tracking-wider">
                Guidelines & Safety
              </h4>
              <p className="font-sans text-[11px] text-[#111827]/60 leading-relaxed">
                All financial support, tax operations, and mutual funds options follow the latest regulatory codes and government guidelines under standard business rules.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
