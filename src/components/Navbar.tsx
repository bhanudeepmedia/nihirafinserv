import React from 'react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { ShieldCheck, CalendarRange, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeTab: PageId;
  setActiveTab: (tab: PageId) => void;
  openBookingModal: () => void;
}

export default function Navbar({ activeTab, setActiveTab, openBookingModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'success-stories', label: 'Success Stories' },
    { id: 'emi-calculator', label: 'EMI Calculator' },
    { id: 'contact', label: 'Contact' },
  ] as const;

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-5 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/95 bgs-blur border border-[#E6E6E6]/80 rounded-full h-16 px-6 md:px-8 shadow-[0_4px_30px_rgba(0,0,0,0.03)] pointer-events-auto transition-all duration-300">
        
        {/* Logo and Emblem */}
        <div 
          onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} 
          className="flex items-center gap-3 cursor-pointer select-none"
          id="nav_logo"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-sm bg-[#0d3979] text-white">
            <div className="w-4.5 h-[2px] bg-white -rotate-45 translate-x-[1.5px]" />
            <div className="w-4.5 h-[2px] bg-white rotate-45 -translate-x-[1.5px]" />
          </div>
          <div>
            <span className="font-sans font-bold tracking-[0.16em] text-sm text-[#0d3979]">
              NIHIRA
            </span>
            <span className="font-mono font-medium tracking-[0.2em] text-[9px] text-[#2F6E73] block -mt-1">
              FINSERV
            </span>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav_link_${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-2 rounded-full font-sans text-xs tracking-wider transition-colors duration-300 cursor-pointer ${
                  isActive ? 'text-[#0d3979] font-semibold' : 'text-[#111827]/70 hover:text-[#0d3979]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar_active_indicator"
                    className="absolute inset-0 bg-[#F5F5F4] rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Dynamic CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            id="nav_cta"
            onClick={openBookingModal}
            className="group flex items-center gap-2 px-5 py-2.5 bg-[#0d3979] hover:bg-black text-white text-xs font-sans tracking-widest uppercase font-medium rounded-full transition-all duration-300 shadow-[0_3px_10px_rgba(13,57,121,0.15)] cursor-pointer hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
          >
            <CalendarRange className="w-3.5 h-3.5" />
            <span>Book Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-60 group-hover:opacity-100" />
          </button>
        </div>

        {/* Mobile Menu Actuator */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            id="nav_mobile_cta"
            onClick={openBookingModal}
            className="flex items-center justify-center p-2.5 bg-[#F5F5F4] hover:bg-[#E6E6E6] rounded-full text-[#0d3979] transition-colors"
          >
            <CalendarRange className="w-4 h-4" />
          </button>
          <button
            id="nav_toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center p-2 rounded-full hover:bg-[#F5F5F4] text-[#111827] transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden absolute top-24 left-0 w-full px-4 pointer-events-auto"
        >
          <div className="bg-white border border-[#E6E6E6] rounded-3xl p-6 shadow-xl flex flex-col gap-4">
            <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] uppercase border-b border-[#E6E6E6] pb-2">
              NAVIGATION PORTAL
            </span>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav_mobile_link_${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl text-xs text-left transition-all ${
                    activeTab === item.id
                      ? 'bg-[#0d3979] text-white font-medium'
                      : 'bg-[#F5F5F4] hover:bg-[#E6E6E6] text-[#111827]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            <button
              id="nav_drawer_cta"
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="mt-2 w-full py-3 bg-black hover:bg-[#0d3979] text-white text-xs font-sans tracking-widest uppercase font-semibold rounded-2xl transition-colors duration-300 flex items-center justify-center gap-2 shadow-md"
            >
              <CalendarRange className="w-4 h-4" />
              <span>Request Consultation Session</span>
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
