/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, Service, ConsultationRequest } from './types';
import { INITIAL_SERVICES } from './data';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import AboutView from './components/AboutView';
import SuccessView from './components/SuccessView';
import EMICalculator from './components/EMICalculator';
import ContactView from './components/ContactView';
import AdminView from './components/AdminView';
import BookingModal from './components/BookingModal';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageId>('home');
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. ROUTING SYNC (Listen to both /admin paths and #admin hashes)
  useEffect(() => {
    const handleSyncRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || hash === '#admin' || hash === '#/admin') {
        setActiveTab('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    handleSyncRoute();
    window.addEventListener('popstate', handleSyncRoute);
    window.addEventListener('hashchange', handleSyncRoute);
    return () => {
      window.removeEventListener('popstate', handleSyncRoute);
      window.removeEventListener('hashchange', handleSyncRoute);
    };
  }, []);

  // 2. DATABASE INITIALIZATION (LOCALSTORAGE SYNCHRONIZED with self-repair check)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nihira_services_db_v6');
      const validIds = ['loans', 'insurance', 'credit-repair', 'mutual-funds', 'tax-filing'];
      
      let parsed = null;
      if (stored) {
        try {
          parsed = JSON.parse(stored);
        } catch {
          parsed = null;
        }
      }

      const isValid = Array.isArray(parsed) && 
                      parsed.length > 0 && 
                      parsed.every((s: any) => validIds.includes(s.id)) &&
                      parsed.some((s: any) => s.id === 'loans');

      if (isValid) {
        setServices(parsed);
      } else {
        localStorage.setItem('nihira_services_db_v6', JSON.stringify(INITIAL_SERVICES));
        setServices(INITIAL_SERVICES);
      }
    } catch (e) {
      console.error('Error synchronizing client-side database:', e);
      setServices(INITIAL_SERVICES);
    }
  }, []);

  const handleSaveServices = (updated: Service[]) => {
    try {
      setServices(updated);
      localStorage.setItem('nihira_services_db_v6', JSON.stringify(updated));
      if (selectedService) {
        const found = updated.find(s => s.id === selectedService.id);
        if (found) {
          setSelectedService(found);
        } else {
          setSelectedService(null);
        }
      }
    } catch (e) {
      console.error('Error committing update:', e);
    }
  };

  const handleResetDefaults = () => {
    try {
      localStorage.setItem('nihira_services_db_v6', JSON.stringify(INITIAL_SERVICES));
      setServices(INITIAL_SERVICES);
      setSelectedService(null);
    } catch (e) {
      console.error('Error hard reverting default structures:', e);
    }
  };

  // 3. LEAD FORM HANDLERS (PERSISTENT LOGS INTEGRATION & WHATSAPP REDIRECTS)
  const handleSubmitConsultation = async (request: ConsultationRequest): Promise<boolean> => {
    return new Promise((resolve) => {
      try {
        const storedLogs = localStorage.getItem('nihira_consultations_db');
        const logs = storedLogs ? JSON.parse(storedLogs) : [];
        
        const newLog = {
          ...request,
          id: `lead-${Date.now()}`,
          timestamp: new Date().toISOString()
        };

        localStorage.setItem('nihira_consultations_db', JSON.stringify([newLog, ...logs]));

        // Generate dynamic professional WhatsApp message text detailing form parameters
        const messageText = `*Hello Nihira Finserv Visakhapatnam,*

I would like to request a professional consultation callback. Here are my submission details:

• *Full Name:* ${request.fullName}
• *Mobile Phone:* ${request.phone}
• *Service Category:* ${request.serviceOfInterest}
• *Specific Service Desired:* ${request.wealthBracket}
• *Brief Message / Notes:* ${request.message || 'N/A'}

Please coordinate my callback schedule accordingly. Thank you!`;

        // Direct WhatsApp redirection to the official Visakhapatnam number +91 8143355559
        const encodedText = encodeURIComponent(messageText);
        const whatsappUrl = `https://wa.me/918143355559?text=${encodedText}`;
        
        // Open the WhatsApp link
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        resolve(true);
      } catch (e) {
        console.error('Core transaction log or WhatsApp redirect failure:', e);
        resolve(false);
      }
    });
  };

  const handleSelectServiceFromHome = (service: Service) => {
    setSelectedService(service);
    setActiveTab('services');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <>
      {loading && <LoadingScreen onLoadingComplete={() => setLoading(false)} />}
      <div className={`min-h-screen bg-white text-[#111827] antialiased selection:bg-black/10 selection:text-black flex flex-col justify-between transition-opacity duration-700 ${loading ? 'h-screen overflow-hidden opacity-0' : 'opacity-100'}`}>
        
        {/* Dynamic Floating Navbar Section */}
        <Navbar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openBookingModal={() => setBookingModalOpen(true)}
      />

      {/* CORE RENDER ROUTER */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomeView
            services={services}
            onSelectService={handleSelectServiceFromHome}
            setActiveTab={setActiveTab}
            openAdminPanel={() => setActiveTab('admin')}
            openBookingModal={() => setBookingModalOpen(true)}
          />
        )}

        {activeTab === 'services' && (
          <ServicesView
            services={services}
            selectedService={selectedService}
            onSelectService={setSelectedService}
            onSubmitConsultation={handleSubmitConsultation}
          />
        )}

        {activeTab === 'about' && <AboutView />}

        {activeTab === 'success-stories' && <SuccessView />}

        {activeTab === 'emi-calculator' && (
          <div className="w-full bg-white pt-28 pb-20 px-6 md:px-8">
            <div className="max-w-5xl mx-auto">
              <EMICalculator />
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <ContactView onSubmitConsultation={handleSubmitConsultation} />
        )}

        {activeTab === 'admin' && (
          <AdminView
            services={services}
            onSaveServices={handleSaveServices}
            onResetDefaults={handleResetDefaults}
          />
        )}
      </main>

      {/* Premium Footer with Clocks & NY/UK Tickers */}
      <Footer
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openAdminPanel={() => setActiveTab('admin')}
        openBookingModal={() => setBookingModalOpen(true)}
      />

      {/* Action-Intake Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onSubmitConsultation={handleSubmitConsultation}
      />

    </div>
    </>
  );
}
