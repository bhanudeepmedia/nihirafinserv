import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { ShieldCheck, MessageCircle, Terminal, Clock, Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  activeTab: PageId;
  setActiveTab: (tab: PageId) => void;
  openAdminPanel: () => void;
  openBookingModal: () => void;
}

export default function Footer({ activeTab, setActiveTab, openAdminPanel, openBookingModal }: FooterProps) {
  const [mumbaiTime, setMumbaiTime] = useState('');

  // Local Mumbai time ticker
  useEffect(() => {
    const updateTimes = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(new Date());
        setMumbaiTime(formatted);
      } catch (e) {
        setMumbaiTime('--:--:--');
      }
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-white border-t border-[#E6E6E6] relative z-10">
      
      {/* WhatsApp floating button with prefilled realistic text */}
      <div className="fixed bottom-6 right-6 z-40 pointer-events-auto">
        <a
          href="https://wa.me/918143355559?text=Hello%20Nihira%20Finserv%20Visakhapatnam,%20I%20would%20like%20to%20schedule%20a%20consultation%20meeting%20regarding%20financial%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-5 py-3.5 bg-black hover:bg-[#0d3979] text-white rounded-full shadow-lg transition-all duration-300"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75 animate-ping" />
            <MessageCircle className="w-4 h-4 text-white relative z-10" />
          </div>
          <span className="font-mono text-[9px] tracking-widest uppercase font-black text-white">
            WhatsApp Help
          </span>
        </a>
      </div>

      {/* Main footer contents */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Column 1: Brand details */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-sm bg-[#0d3979] text-white">
                <div className="w-4.5 h-[2px] bg-white -rotate-45 translate-x-[1.5px]" />
                <div className="w-4.5 h-[2px] bg-white rotate-45 -translate-x-[1.5px]" />
              </div>
              <div>
                <span className="font-sans font-black tracking-widest text-sm text-[#0d3979] uppercase">
                  Nihira
                </span>
                <span className="font-mono font-bold tracking-widest text-[9px] text-[#2F6E73] block -mt-1 uppercase">
                  Finserv
                </span>
              </div>
            </div>

            <p className="font-sans text-[11px] text-[#111827]/60 leading-relaxed max-w-md font-medium">
              Nihira Finserv helps individuals and businesses access financial services through guidance, consultation and support across loans, insurance, credit score improvement, mutual funds, and tax-related services.
            </p>

            <div className="pt-4 border-t border-[#E6E6E6] space-y-2">
              <span className="font-mono text-[8.5px] tracking-widest text-[#2F6E73] font-bold block uppercase">
                MUMBAI HQ CURRENT TIME
              </span>
              <div className="inline-flex items-center gap-2 bg-[#F5F5F4] border border-[#E6E6E6] px-3.5 py-1.5 rounded-xl">
                <Clock className="w-3.5 h-3.5 text-[#0d3979]" />
                <span className="font-mono text-xs font-bold text-[#0d3979]">
                  {mumbaiTime || '10:00:00'} IST
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6E6E6] space-y-2">
              <span className="font-mono text-[8.5px] tracking-widest text-[#2F6E73] font-bold block uppercase">
                CONNECT WITH US
              </span>
              <div className="flex gap-4 items-center">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-xl bg-[#F5F5F4] border border-[#E6E6E6] flex items-center justify-center text-[#111827]/75 hover:bg-[#0d3979] hover:text-white hover:border-[#0d3979] transition-all cursor-pointer shadow-sm"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-xl bg-[#F5F5F4] border border-[#E6E6E6] flex items-center justify-center text-[#111827]/75 hover:bg-[#0d3979] hover:text-white hover:border-[#0d3979] transition-all cursor-pointer shadow-sm"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: 5 Core Services */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] font-bold block uppercase">
              Core Services Lines
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#111827]/70 font-bold uppercase tracking-wider">
              <li>
                <button onClick={() => { setActiveTab('services'); window.scrollTo({ top: 300, behavior: 'smooth' }); }} className="hover:text-black transition-colors cursor-pointer text-left">
                  Loans & Credit
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('services'); window.scrollTo({ top: 300, behavior: 'smooth' }); }} className="hover:text-black transition-colors cursor-pointer text-left">
                  Insurance Advisory
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('services'); window.scrollTo({ top: 300, behavior: 'smooth' }); }} className="hover:text-black transition-colors cursor-pointer text-left">
                  Credit Score Repair
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('services'); window.scrollTo({ top: 300, behavior: 'smooth' }); }} className="hover:text-black transition-colors cursor-pointer text-left">
                  Mutual Funds Guidance
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('services'); window.scrollTo({ top: 300, behavior: 'smooth' }); }} className="hover:text-black transition-colors cursor-pointer text-left">
                  Accounts & Tax Filing
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] font-bold block uppercase">
              Quick Navigation
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#111827]/70 font-bold uppercase tracking-wider">
              <li>
                <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-black transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('success-stories'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-black transition-colors cursor-pointer">
                  Client Stories
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-black transition-colors cursor-pointer">
                  Inquiry Form
                </button>
              </li>
              <li>
                <button onClick={openBookingModal} className="hover:text-black transition-colors cursor-pointer text-left">
                  Book Event
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Big visual label & Credit info */}
        <div className="mt-16 pt-8 border-t border-[#E6E6E6] text-center">
          <div className="flex flex-col md:flex-row items-center justify-between text-[11px] text-[#111827]/50 font-mono gap-4 mb-4 select-none">
            <p className="tracking-wide">© {new Date().getFullYear()} NIHIRA FINSERV. ALL RIGHTS RESERVED.</p>
            <p className="tracking-wide">
              DESIGNED & DEVELOPED BY{' '}
              <a 
                href="https://framenflowmedia.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#0d3979] hover:underline font-bold transition-colors pointer-events-auto"
              >
                FRAME N FLOW MEDIA
              </a>
            </p>
          </div>
          <div className="select-none text-center pointer-events-none opacity-[0.03]">
            <h2 className="font-sans font-black text-6xl sm:text-8xl md:text-[100px] uppercase tracking-tighter leading-none text-[#0d3979]">
              NIHIRA FINSERV
            </h2>
          </div>
        </div>
      </div>

      {/* Indian Local stock indices ribbon */}
      <div className="bg-black py-4 text-white overflow-hidden select-none">
        <div className="flex gap-16 whitespace-nowrap animate-marquee-fast">
          {[1, 2].map((loopIdx) => (
            <div key={loopIdx} className="flex gap-16 text-[9.5px] font-mono tracking-widest uppercase text-white/80 items-center">
              <span>BSE SENSEX <strong className="text-green-400">74,230.12 ▲ +0.45%</strong></span>
              <span className="text-white/20">•</span>
              <span>NSE NIFTY 50 <strong className="text-green-400">22,580.45 ▲ +0.32%</strong></span>
              <span className="text-white/20">•</span>
              <span>SBI FD RATES <strong className="text-white/90 font-bold">6.80% (STABLE)</strong></span>
              <span className="text-white/20">•</span>
              <span>G-SEC 10Y YIELD <strong className="text-green-400">7.12% ▲ +0.02%</strong></span>
              <span className="text-white/20">•</span>
              <span>GOLD SPOT (10G) <strong className="text-amber-400">₹72,400.00 ▲ +1.02%</strong></span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
