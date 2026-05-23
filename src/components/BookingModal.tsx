import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Mail, Phone, User, CalendarDays } from 'lucide-react';
import { ConsultationRequest } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitConsultation: (request: ConsultationRequest) => Promise<boolean>;
}

export default function BookingModal({ isOpen, onClose, onSubmitConsultation }: BookingModalProps) {
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

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Loans');
  const [selectedSubType, setSelectedSubType] = useState('Housing loans');
  const [desc, setDesc] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const list = SUBTYPES_BY_SERVICE[service] || [];
    if (list.length > 0) {
      setSelectedSubType(list[0]);
    } else {
      setSelectedSubType('');
    }
  }, [service]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    setLoading(true);
    const req: ConsultationRequest = {
      fullName,
      email,
      phone,
      serviceOfInterest: service,
      wealthBracket: selectedSubType,
      message: desc
    };
    
    const res = await onSubmitConsultation(req);
    setLoading(false);
    if (res) {
      setSuccess(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setDesc('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0d3979]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white border border-[#E6E6E6] rounded-[36px] shadow-2xl w-full max-w-lg p-6 md:p-8 z-10 mx-4">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-full hover:bg-[#F5F5F4] text-[#111827] transition-all cursor-pointer"
        >
          <X className="w-5 h-5 animate-spin-slow" />
        </button>

        {success ? (
          <div className="text-center py-10 space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0d3979] text-white rounded-full">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-sans font-black text-xl text-[#0d3979] uppercase tracking-tight">
              Consultation Scheduled
            </h3>
            <p className="font-sans text-xs text-[#111827]/60 leading-relaxed max-w-xs mx-auto font-semibold">
              Your details are registered successfully. Our consultants will review your request and get in touch with you shortly.
            </p>
            <button
               onClick={() => { setSuccess(false); onClose(); }}
               className="mt-4 px-6 py-2.5 bg-[#0d3979] hover:bg-black text-white text-xs font-sans font-black tracking-widest uppercase rounded-lg transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] font-bold block uppercase mb-1">
                ONLINE CONSULTATION INTAKE
              </span>
              <h3 className="font-sans font-black text-xl text-[#0d3979] uppercase tracking-tight">
                Request Guidance Session
              </h3>
              <p className="font-sans text-[11px] text-[#111827]/60 leading-normal mt-1">
                Enter your details to coordinate a professional callbacks session with our team.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="relative">
                <label className="font-sans text-[9px] font-black uppercase text-[#111827]/60 block mb-1">Full Name</label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 w-4 h-4 text-[#111827]/30" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Shah"
                    className="w-full border border-[#E6E6E6] pl-9 pr-4 py-2.5 rounded-xl text-xs font-sans focus:outline-none focus:border-black bg-[#F5F5F4]/45"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <label className="font-sans text-[9px] font-black uppercase text-[#111827]/60 block mb-1">Email Address</label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-3.5 h-3.5 text-[#111827]/30" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@example.com"
                      className="w-full border border-[#E6E6E6] pl-9 pr-4 py-2.5 rounded-xl text-xs font-sans focus:outline-none focus:border-black bg-[#F5F5F4]/45"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="font-sans text-[9px] font-black uppercase text-[#111827]/60 block mb-1">Phone Number</label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-3 w-3.5 h-3.5 text-[#111827]/30" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full border border-[#E6E6E6] pl-9 pr-4 py-2.5 rounded-xl text-xs font-sans focus:outline-none focus:border-black bg-[#F5F5F4]/45"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-sans text-[9px] font-black uppercase text-[#111827]/60 block mb-1">Service Required</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full border border-[#E6E6E6] px-3 py-2.5 rounded-xl text-xs bg-white focus:outline-none focus:border-black font-sans font-semibold text-[#0d3979]"
                >
                  <option value="Loans">Loans</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Credit Score Repair">Credit Score Repair</option>
                  <option value="Mutual Funds">Mutual Funds</option>
                  <option value="Accounts & Tax Filing">Accounts & Tax Filing</option>
                </select>
              </div>

              <div>
                <label className="font-sans text-[9px] font-black uppercase text-[#111827]/60 block mb-1">Specific Service Type Needed</label>
                <select
                  value={selectedSubType}
                  onChange={(e) => setSelectedSubType(e.target.value)}
                  className="w-full border border-[#E6E6E6] px-3 py-2.5 rounded-xl text-xs bg-white focus:outline-none focus:border-black font-sans font-semibold text-[#2F6E73]"
                >
                  {(SUBTYPES_BY_SERVICE[service] || []).map((subOpt) => (
                    <option key={subOpt} value={subOpt}>
                      {subOpt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-sans text-[9px] font-black uppercase text-[#111827]/60 block mb-1">Inquiry or Message Details (Optional)</label>
                <textarea
                  rows={2}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Tell us a bit about what you seek help with..."
                  className="w-full border border-[#E6E6E6] px-3 py-2.5 rounded-xl text-xs font-sans focus:outline-none focus:border-black bg-[#F5F5F4]/45"
                />
              </div>
            </div>

            <div className="bg-[#F5F5F4]/50 border border-[#E6E6E6] p-4 rounded-2xl flex gap-3 items-start">
              <ShieldCheck className="w-5 h-5 text-[#2F6E73] shrink-0 mt-0.5" />
              <p className="font-sans text-[10px] text-[#111827]/70 leading-normal font-medium">
                <strong>Certified Privacy:</strong> Submit details directly with complete peace of mind. We maintain absolute confidentiality of all your financial documentation needs.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#0d3979] hover:bg-black disabled:bg-gray-500 text-white text-xs font-sans font-black tracking-widest uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <CalendarDays className="w-4 h-4 text-white" />
              <span>{loading ? 'SUBMITTING REQUEST...' : 'Book Guidance Session'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
