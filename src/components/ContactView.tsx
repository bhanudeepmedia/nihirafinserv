import React, { useState } from 'react';
import { Phone, Clock, Send, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { ConsultationRequest } from '../types';

interface ContactViewProps {
  onSubmitConsultation: (request: ConsultationRequest) => Promise<boolean>;
}

export default function ContactView({ onSubmitConsultation }: ContactViewProps) {
  // Dynamic categories dictionary matching user specs
  const SUBTYPES_BY_SERVICE: Record<string, string[]> = {
    'Loans': [
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
      'NRA loans'
    ],
    'Insurance': [
      'Health Insurance',
      'Life Insurance',
      'Vehicle Insurance',
      'Business Insurance',
      'General Insurance'
    ],
    'Credit Score Repair': [
      'Credit Score Education & Consultation',
      'Credit Report Discrepancy Parsing',
      'Credit Habit Coaching & Plan',
      'Score Rebuilding Support'
    ],
    'Mutual Funds': [
      'Equity Mutual Funds',
      'Debt Mutual Funds',
      'Index & Hybrid Funds',
      'SIP Investment Consulting',
      'Lumpsum Financial Planning'
    ],
    'Accounts & Tax Filing': [
      'Income Tax Returns (ITR) Filing',
      'GST Setup & Returns filing',
      'Business Accounting & Booking',
      'Auditing & Compliance Consultation'
    ]
  };

  // Lead Form States
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceOfInterest, setServiceOfInterest] = useState('Loans');
  const [selectedSubType, setSelectedSubType] = useState('Housing loans');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    const list = SUBTYPES_BY_SERVICE[serviceOfInterest] || [];
    if (list.length > 0) {
      setSelectedSubType(list[0]);
    } else {
      setSelectedSubType('');
    }
  }, [serviceOfInterest]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);
    const req: ConsultationRequest = {
      fullName,
      email: `${phone.replace(/[^0-9]/g, '') || Date.now()}@nihiracallback.com`, // Compliant with standard schema without exposing email input
      phone,
      serviceOfInterest,
      wealthBracket: selectedSubType, 
      message
    };

    const success = await onSubmitConsultation(req);
    setIsSubmitting(false);
    if (success) {
      setFormSubmitted(true);
      setFullName('');
      setPhone('');
      setMessage('');
    }
  };

  return (
    <div className="w-full bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Intro requested message block */}
        <div className="max-w-4xl mb-16">
          <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] font-bold uppercase block mb-2 bg-[#F5F5F4] w-max px-2.5 py-1 rounded">
            GET IN TOUCH
          </span>
          <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-[#0d3979] uppercase tracking-tight leading-[1.1] mb-4">
            Need help with loans, insurance, taxation or financial guidance?
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#111827]/70 leading-relaxed font-semibold">
            Connect with Nihira Finserv for support and consultation.
          </p>
        </div>

        {/* Contact Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Consultation Form */}
          <div className="lg:col-span-7 bg-white border border-[#E6E6E6] p-6 md:p-8 rounded-[36px] shadow-sm">
            <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] font-bold uppercase block mb-1">
              CONSULTATION FORM
            </span>
            <h2 className="font-sans font-black text-2xl text-[#0d3979] uppercase tracking-tight block mb-6">
              Request Guidance Callback
            </h2>

            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0d3979] text-white">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-sans font-black text-lg text-[#0d3979] uppercase">
                  Request Received
                </h4>
                <p className="font-sans text-xs text-[#111827]/60 max-w-sm mx-auto leading-relaxed font-semibold">
                  Thank you for connecting. Our supportive consultant team has received your guidelines request and will call you back shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-[#0d3979] hover:bg-black text-white text-[9px] font-mono tracking-widest uppercase font-black rounded-lg transition-colors cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label className="font-sans text-[10px] font-black uppercase text-[#111827]/70 block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Shah"
                    className="w-full border border-[#E6E6E6] px-4 py-3 rounded-xl text-xs font-sans focus:outline-none focus:border-black bg-[#F5F5F4]/30 animate-none"
                  />
                </div>

                <div>
                  <label className="font-sans text-[10px] font-black uppercase text-[#111827]/70 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full border border-[#E6E6E6] px-4 py-3 rounded-xl text-xs font-sans focus:outline-none focus:border-black bg-[#F5F5F4]/30 animate-none"
                  />
                </div>

                <div>
                  <label className="font-sans text-[10px] font-black uppercase text-[#111827]/70 block mb-1">
                    Service of Interest
                  </label>
                  <select
                    value={serviceOfInterest}
                    onChange={(e) => setServiceOfInterest(e.target.value)}
                    className="w-full border border-[#E6E6E6] px-3 py-3 rounded-xl text-xs font-sans bg-white focus:outline-none focus:border-black font-semibold text-black"
                  >
                    <option value="Loans">Loans</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Credit Score Repair">Credit Score Repair</option>
                    <option value="Mutual Funds">Mutual Funds</option>
                    <option value="Accounts & Tax Filing">Accounts & Tax Filing</option>
                  </select>
                </div>

                <div>
                  <label className="font-sans text-[10px] font-black uppercase text-[#111827]/70 block mb-1">
                    Specific Service needed
                  </label>
                  <select
                    value={selectedSubType}
                    onChange={(e) => setSelectedSubType(e.target.value)}
                    className="w-full border border-[#E6E6E6] px-3 py-3 rounded-xl text-xs font-sans bg-white focus:outline-none focus:border-black font-semibold text-[#2F6E73]"
                  >
                    {(SUBTYPES_BY_SERVICE[serviceOfInterest] || []).map((subOpt) => (
                      <option key={subOpt} value={subOpt}>
                        {subOpt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-sans text-[10px] font-black uppercase text-[#111827]/70 block mb-1">
                    Describe your requirements or questions
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Let us know what you need help with (e.g., comparing loan interest rates, fixing credit score anomalies, tax filing support, etc.)"
                    className="w-full border border-[#E6E6E6] px-4 py-3 rounded-xl text-xs font-sans focus:outline-none focus:border-black bg-[#F5F5F4]/30"
                  />
                </div>

                <div className="bg-[#F5F5F4]/80 p-4 border border-[#E6E6E6] rounded-2xl flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#2F6E73] shrink-0" />
                  <p className="font-sans text-[10.5px] text-[#111827]/60 leading-relaxed font-semibold">
                    Privacy Guarantee: Nihira Finserv holds your contact parameters confidential; we do not share details with third-party telemarketers.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#0d3979] hover:bg-black disabled:bg-gray-500 text-white text-xs font-sans font-black tracking-widest uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'SENDING REQUEST...' : 'Book Consultation Callback'}</span>
                </button>

              </form>
            )}
          </div>

          {/* Right: Premium Phone & WhatsApp Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Connect Buttons (WhatsApp & Call) */}
            <div className="border border-[#E6E6E6] rounded-[36px] bg-[#0d3979] text-white p-6 relative overflow-hidden shadow-md">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F5F5F4 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              
              <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] font-bold block uppercase mb-1">
                    NIHIRA FINSERV CORE OFFICE
                  </span>
                  <h3 className="font-sans font-black text-2xl text-white uppercase tracking-tight">
                    Instant Connect Channels
                  </h3>
                  <p className="font-sans text-xs text-white/80 leading-relaxed mt-2 font-medium">
                    Skip documentation queues. Converse directly with an official financial consultant over a phone call or secure WhatsApp message.
                  </p>
                </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
                  {/* WhatsApp chat button */}
                  <a
                    href="https://wa.me/918143355559?text=Hello%20Nihira%20Finserv%20Visakhapatnam,%20I%20would%20like%20to%20schedule%20a%20consultation%20meeting%20regarding%20local%20financial%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center gap-2 py-3.5 bg-white hover:bg-[#F5F5F4] text-[#0d3979] hover:text-black rounded-2xl text-xs font-sans font-black tracking-wider uppercase transition-all shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]/5" />
                    <span>WhatsApp</span>
                  </a>

                  {/* Telephone call button */}
                  <a
                    href="tel:+918143355559"
                    className="flex justify-center items-center gap-2 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-sans font-black tracking-wider uppercase transition-all border border-white/10 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-[#25D366]" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Core Address / Email Section Placeholders (Removed Email Address and Registered Address) */}
            <div className="space-y-4">
              <span className="font-mono text-[10px] tracking-widest text-[#2F6E73] uppercase font-bold block pb-2 border-b border-[#E6E6E6]">
                Our Consultation Details
              </span>

              {/* Timing/Availability Block */}
              <div className="border border-[#E6E6E6] rounded-2xl p-5 bg-[#F5F5F4]/30 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E6E6E6] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#0d3979]" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] text-[#2F6E73] font-bold">WORKING TIME HOURS</span>
                  <span className="block font-sans font-bold text-xs text-black mt-0.5">Monday to Saturday: 10 AM to 6 PM</span>
                  <p className="font-sans text-[11px] text-[#111827]/50 mt-1">Closed on Standard National & Bank Holidays.</p>
                </div>
              </div>

              {/* Big Phone Contact Block */}
              <div className="border border-[#E6E6E6] rounded-2xl p-6 bg-stone-50 border-dashed space-y-3">
                <span className="font-mono text-[9px] font-bold tracking-widest text-[#0d3979] block uppercase">
                  DIRECT PHONE LINE
                </span>
                <p className="font-sans text-xl font-extrabold text-black tracking-tight select-all">
                  +91 8143355559
                </p>
                <a 
                  href="tel:+918143355559" 
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase font-black text-[#2F6E73] hover:text-[#0d3979] transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>Click-to-Call Primary Advisor</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
