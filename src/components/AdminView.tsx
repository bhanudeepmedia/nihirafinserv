import React, { useState } from 'react';
import { Service } from '../types';
import { Plus, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, RotateCcw, ShieldAlert, KeyRound, Check, FileCode, Landmark } from 'lucide-react';

interface AdminViewProps {
  services: Service[];
  onSaveServices: (updated: Service[]) => void;
  onResetDefaults: () => void;
}

const PRESET_IMAGES = [
  { label: 'Loans & Support', url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Insurance Advisory', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Credit Reparation', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop' },
  { label: 'SIP & Mutual Funds', url: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Accounts & GST', url: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1200&auto=format&fit=crop' },
];

export default function AdminView({ services, onSaveServices, onResetDefaults }: AdminViewProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('nihira_staff_authenticated') === 'true';
    } catch {
      return false;
    }
  });
  const [errorMsg, setErrorMsg] = useState('');
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Editable Form fields
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formDetailIntro, setFormDetailIntro] = useState('');
  const [formHow1, setFormHow1] = useState('');
  const [formHow2, setFormHow2] = useState('');
  const [formHow3, setFormHow3] = useState('');
  const [formBenefit1, setFormBenefit1] = useState('');
  const [formBenefit2, setFormBenefit2] = useState('');
  const [formBenefit3, setFormBenefit3] = useState('');
  const [formClient, setFormClient] = useState('');
  const [formChallenge, setFormChallenge] = useState('');
  const [formSolution, setFormSolution] = useState('');
  const [formResult, setFormResult] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formStatLabel, setFormStatLabel] = useState('');
  const [formStatValue, setFormStatValue] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'nihira789' || password === 'admin123') {
      setIsAuthenticated(true);
      setErrorMsg('');
      try {
        sessionStorage.setItem('nihira_staff_authenticated', 'true');
      } catch (err) {
        console.error(err);
      }
    } else {
      setErrorMsg('Incorrect administrative credentials. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('nihira_staff_authenticated');
    } catch (err) {
      console.error(err);
    }
  };

  const triggerNotification = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => setShowNotification(null), 3000);
  };

  const handleToggleVisibility = (id: string) => {
    const updated = services.map(s => s.id === id ? { ...s, isVisible: !s.isVisible } : s);
    onSaveServices(updated);
    triggerNotification('Visibility state altered.');
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === services.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const copy = [...services];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    const updated = copy.map((serv, idx) => ({ ...serv, order: idx + 1 }));
    onSaveServices(updated);
    triggerNotification('Service display priority adjusted.');
  };

  const handleDelete = (id: string) => {
    const updated = services.filter(s => s.id !== id);
    onSaveServices(updated);
    if (editingId === id) setEditingId(null);
    triggerNotification('Service deleted from portfolio.');
  };

  const startEditing = (s: Service) => {
    setEditingId(s.id);
    setFormTitle(s.title);
    setFormDescription(s.description);
    setFormDetailIntro(s.detailIntro);
    setFormHow1(s.howItWorks[0] || '');
    setFormHow2(s.howItWorks[1] || '');
    setFormHow3(s.howItWorks[2] || '');
    setFormBenefit1(s.benefits[0] || '');
    setFormBenefit2(s.benefits[1] || '');
    setFormBenefit3(s.benefits[2] || '');
    setFormClient(s.caseExample?.client || '');
    setFormChallenge(s.caseExample?.challenge || '');
    setFormSolution(s.caseExample?.solution || '');
    setFormResult(s.caseExample?.result || '');
    setFormImageUrl(s.imageUrl);
    setFormStatLabel(s.stats?.label || '');
    setFormStatValue(s.stats?.value || '');
  };

  const startNewService = () => {
    const tempId = `custom-service-${Date.now()}`;
    const newService: Service = {
      id: tempId,
      title: 'New Financial Action Line',
      description: 'Consultation guidelines support tailored to custom financial queries.',
      detailIntro: 'Detailed outline of parameters, conditions, and processing steps.',
      howItWorks: [
        'Initial Inquiry Review',
        'Requirements and Checks Check',
        'Submission Guidance Call'
      ],
      benefits: [
        'Transparent Guidelines',
        'Supportive Consultant Review',
        'Swift Callback Status'
      ],
      caseExample: {
        client: 'Retail Consultation Client',
        challenge: 'Awaiting direct file guidance.',
        solution: 'Organized and validated compliance credentials.',
        result: 'Achieved complete clarity and filed requests correctly.'
      },
      imageUrl: PRESET_IMAGES[0].url,
      stats: { label: 'Supported Values', value: '₹10 Lakhs+' },
      order: services.length + 1,
      isVisible: true,
      faqs: [
        { question: 'What is the required documentation?', answer: 'Our consultation outlines the exact paper lists needed based on guidelines.' }
      ]
    };

    onSaveServices([...services, newService]);
    startEditing(newService);
    triggerNotification('New service item initialized.');
  };

  const saveEditing = () => {
    if (!editingId) return;

    const updated = services.map(s => {
      if (s.id === editingId) {
        return {
          ...s,
          title: formTitle,
          description: formDescription,
          detailIntro: formDetailIntro,
          howItWorks: [formHow1, formHow2, formHow3].filter(line => line.trim() !== ''),
          benefits: [formBenefit1, formBenefit2, formBenefit3].filter(line => line.trim() !== ''),
          caseExample: {
            client: formClient,
            challenge: formChallenge,
            solution: formSolution,
            result: formResult
          },
          imageUrl: formImageUrl || PRESET_IMAGES[0].url,
          stats: {
            label: formStatLabel,
            value: formStatValue
          }
        };
      }
      return s;
    });

    onSaveServices(updated);
    setEditingId(null);
    triggerNotification('Service parameters saved successfully.');
  };

  // 1. Password Protection view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6 py-12 relative">
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <div className="w-6 h-6 bg-[#0d3979] rounded-sm flex items-center justify-center text-white text-[10px] font-black">
            N
          </div>
          <span className="font-sans font-bold tracking-widest text-[11px] text-[#0d3979]">
            NIHIRA PORTAL
          </span>
        </div>

        <div className="w-full max-w-sm rounded-[32px] border border-[#E6E6E6] bg-white p-8 md:p-10 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-[#F5F5F4]/60 rounded-full flex items-center justify-center border border-[#E6E6E6]">
              <KeyRound className="w-5 h-5 text-[#0d3979]" />
            </div>
            <h1 className="font-sans font-black text-xl text-[#0d3979] uppercase tracking-tight">
              Administrative Gate
            </h1>
            <p className="font-sans text-xs text-[#111827]/55">
              Secure, unindexed corridor for database and service reordering management.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
            <div>
              <label className="font-mono text-[8.5px] font-black uppercase text-[#2F6E73] block mb-1">
                ENTER STAFF PASSWORD
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="••••••••••••"
                className="w-full border border-[#E6E6E6] px-4 py-3 rounded-xl text-xs font-mono focus:outline-none focus:border-black bg-[#F5F5F4]/25"
              />
            </div>

            {errorMsg && (
              <p className="text-red-600 font-sans text-[11px] font-medium leading-relaxed bg-red-50 border border-red-100 rounded-lg p-2.5">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-black hover:bg-[#0d3979] text-white rounded-xl text-xs font-sans tracking-widest font-black uppercase transition-all shadow-sm cursor-pointer"
            >
              Verify Staff Token
            </button>
          </form>

          <p className="text-[10px] font-mono text-[#111827]/40 text-center leading-relaxed">
            Authorized personnel only. Sessions are logs-monitored.
          </p>
        </div>
      </div>
    );
  }

  // 2. Full Admin dashboard view (Styled cleanly: solid white, clean table, secure)
  return (
    <div className="min-h-screen bg-white pt-28 pb-20 px-6 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#E6E6E6]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] tracking-widest bg-emerald-500/10 text-emerald-600 font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                SECURED SYSTEM ACTIVE
              </span>
            </div>
            <h1 className="font-sans font-black text-3xl text-[#0d3979] uppercase tracking-tight mt-1.5">
              Service Ecosystem Manager
            </h1>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => {
                if (confirm('Revert all customizations back to vetted core business defaults? This destroys custom additions.')) {
                  onResetDefaults();
                  setEditingId(null);
                  triggerNotification('Showcase memory Hard-Reverted to core lines.');
                }
              }}
              className="px-3 py-2 bg-white hover:bg-red-50 border border-[#E6E6E6] hover:border-red-200 text-xs text-[#111827]/75 hover:text-red-600 rounded-xl transition-all font-mono font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Revert defaults
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-black hover:bg-[#0d3979] text-white text-xs rounded-xl transition-all font-sans font-bold uppercase tracking-wider cursor-pointer"
            >
              Secure Lock Out
            </button>
          </div>
        </div>

        {/* Notification Alert Ticker */}
        {showNotification && (
          <div className="bg-[#0d3979] text-white px-5 py-3 rounded-xl flex items-center gap-2 text-xs font-semibold justify-between transition-all font-sans shadow-md">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{showNotification}</span>
            </div>
          </div>
        )}

        {/* Action center cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: showing service rows */}
          <div className="lg:col-span-12 space-y-4">
            
            <div className="flex justify-between items-center bg-stone-50 border border-[#E6E6E6] px-5 py-3 rounded-2xl">
              <span className="font-sans font-extrabold text-xs text-[#0d3979] uppercase tracking-wider">
                Showcased Business Offerings ({services.length})
              </span>

              <button
                onClick={startNewService}
                className="flex items-center gap-1 text-[10px] font-mono tracking-widest uppercase font-black bg-black text-white px-3.5 py-1.5 rounded-xl hover:bg-[#0d3979] transition-all cursor-pointer shadow-sm hover:shadow"
              >
                <Plus className="w-3.5 h-3.5" /> Initialize New Line
              </button>
            </div>

            <div className="border border-[#E6E6E6] rounded-[24px] overflow-hidden bg-white divide-y divide-[#E6E6E6] shadow-sm">
              {services.map((item, index) => {
                const isEditing = editingId === item.id;
                return (
                  <div 
                    key={item.id}
                    className={`transition-all p-5 ${
                      isEditing ? 'bg-amber-50/10 border-l-4 border-[#0d3979]' : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#E6E6E6] bg-[#F5F5F4] shrink-0">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-sans font-black text-sm text-[#0d3979] tracking-tight">
                              {item.title}
                            </h3>
                            <span className="font-mono text-[9px] px-2 py-0.5 bg-[#F5F5F4] text-[#111827]/60 rounded-full font-bold">
                              ID: {item.id}
                            </span>
                          </div>
                          <p className="font-sans text-xs text-[#111827]/60 line-clamp-1 mt-0.5 max-w-xl">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-[9px] font-mono text-[#2F6E73] font-bold uppercase">
                            <span>Order Priority: #{item.order}</span>
                            <span>•</span>
                            <span>KPI: {item.stats?.value || '-'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        {/* Eye checkbox toggle for visibility */}
                        <button
                          onClick={() => handleToggleVisibility(item.id)}
                          className="p-2 hover:bg-[#F5F5F4] rounded-lg transition-colors border border-[#E6E6E6] bg-white cursor-pointer"
                          title="Toggle system visibility"
                        >
                          {item.isVisible ? (
                            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600">
                              <Eye className="w-3.5 h-3.5" />
                              <span className="hidden md:inline">Visible</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-stone-400">
                              <EyeOff className="w-3.5 h-3.5" />
                              <span className="hidden md:inline">Hidden</span>
                            </div>
                          )}
                        </button>

                        {/* Reordering Controls */}
                        <div className="flex items-center border border-[#E6E6E6] rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => handleMoveOrder(index, 'up')}
                            disabled={index === 0}
                            className="p-2 hover:bg-[#F5F5F4] transition-colors disabled:opacity-20 cursor-pointer border-r border-[#E6E6E6]"
                            title="Move Priority Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5 text-black" />
                          </button>
                          <button
                            onClick={() => handleMoveOrder(index, 'down')}
                            disabled={index === services.length - 1}
                            className="p-2 hover:bg-[#F5F5F4] transition-colors disabled:opacity-20 cursor-pointer"
                            title="Move Priority Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5 text-black" />
                          </button>
                        </div>

                        {/* Config trigger */}
                        <button
                          onClick={() => startEditing(item)}
                          className="px-3.5 py-2 text-xs font-sans font-bold uppercase tracking-wider bg-white border border-[#E6E6E6] hover:border-black rounded-lg text-black transition-all cursor-pointer"
                        >
                          Configure
                        </button>

                        {/* Hard Delete */}
                        <button
                          onClick={() => {
                            if (confirm(`Completely remove standard action line: ${item.title}?`)) {
                              handleDelete(item.id);
                            }
                          }}
                          className="p-2 hover:bg-red-50 hover:border-red-200 text-red-600 border border-transparent rounded-lg transition-all cursor-pointer"
                          title="Purge completely"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>

                    {/* Editor Form expansion */}
                    {isEditing && (
                      <div className="mt-6 pt-6 border-t border-[#E6E6E6] space-y-5 bg-stone-50/50 p-4 sm:p-6 rounded-2xl border border-[#E6E6E6]">
                        <div className="flex justify-between items-center pb-2 border-b border-[#E6E6E6]">
                          <span className="font-mono text-[9.5px] font-black text-[#0d3979] tracking-widest block uppercase">
                            CONFIGURATION PANELS
                          </span>
                          <span className="font-mono text-[9px] text-[#2F6E73] font-bold">Editing: {item.title}</span>
                        </div>

                        {/* Title & Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          <div className="md:col-span-5">
                            <label className="font-sans text-[10px] font-black text-[#111827]/70 uppercase block mb-1">
                              Headline Title
                            </label>
                            <input 
                              type="text" 
                              value={formTitle}
                              onChange={(e) => setFormTitle(e.target.value)}
                              className="w-full border border-[#E6E6E6] bg-white px-3 py-2 rounded-xl text-xs font-sans text-[#0d3979] focus:outline-none focus:border-black"
                            />
                          </div>

                          <div className="md:col-span-3">
                            <label className="font-sans text-[10px] font-black text-[#111827]/70 uppercase block mb-1">
                              KPI Stat Value
                            </label>
                            <input 
                              type="text" 
                              value={formStatValue}
                              onChange={(e) => setFormStatValue(e.target.value)}
                              className="w-full border border-[#E6E6E6] bg-white px-3 py-2 rounded-xl text-xs font-mono text-[#0d3979] focus:outline-none focus:border-black"
                            />
                          </div>

                          <div className="md:col-span-4">
                            <label className="font-sans text-[10px] font-black text-[#111827]/70 uppercase block mb-1">
                              KPI Stat Label
                            </label>
                            <input 
                              type="text" 
                              value={formStatLabel}
                              onChange={(e) => setFormStatLabel(e.target.value)}
                              className="w-full border border-[#E6E6E6] bg-white px-3 py-2 rounded-xl text-xs font-sans focus:outline-none focus:border-black"
                            />
                          </div>
                        </div>

                        {/* Image preset drop-selector */}
                        <div>
                          <label className="font-sans text-[10px] font-black text-[#111827]/70 uppercase block mb-1">
                            Representative Contextual Unsplash Image Preset
                          </label>
                          <select
                            value={formImageUrl}
                            onChange={(e) => setFormImageUrl(e.target.value)}
                            className="w-full border border-[#E6E6E6] bg-white px-3 py-2.5 rounded-xl text-xs font-sans focus:outline-none"
                          >
                            {PRESET_IMAGES.map((img) => (
                              <option key={img.url} value={img.url}>{img.label} — {img.url.substring(0, 50)}...</option>
                            ))}
                            {PRESET_IMAGES.every(p => p.url !== formImageUrl) && (
                              <option value={formImageUrl}>Custom Context URL ({formImageUrl.substring(0, 40)}...)</option>
                            )}
                          </select>
                        </div>

                        {/* Card synopsis description */}
                        <div>
                          <label className="font-sans text-[10px] font-black text-[#111827]/70 uppercase block mb-1">
                            Homepage Card Summary Synopsis (Keep small, max 2 lines)
                          </label>
                          <textarea 
                            rows={2}
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                            className="w-full border border-[#E6E6E6] bg-white px-3 py-2 rounded-xl text-xs font-sans focus:outline-none focus:border-black"
                          />
                        </div>

                        {/* Detailed Description */}
                        <div>
                          <label className="font-sans text-[10px] font-black text-[#111827]/70 uppercase block mb-1">
                            Detailed Landing Page Intro Paragarph
                          </label>
                          <textarea 
                            rows={3}
                            value={formDetailIntro}
                            onChange={(e) => setFormDetailIntro(e.target.value)}
                            className="w-full border border-[#E6E6E6] bg-white px-3 py-2 rounded-xl text-xs font-sans focus:outline-none focus:border-black"
                          />
                        </div>

                        {/* Steps - process how it works */}
                        <div className="space-y-2">
                          <label className="font-sans text-[10px] font-black text-[#111827]/70 uppercase block">
                            Service Working Steps (How It Works Execution Stages)
                          </label>
                          <div className="grid grid-cols-1 gap-2">
                            <input 
                              type="text" 
                              value={formHow1}
                              onChange={(e) => setFormHow1(e.target.value)}
                              placeholder="Stage 1..."
                              className="w-full border border-[#E6E6E6] bg-white px-3 py-2 rounded-xl text-xs font-sans text-stone-700"
                            />
                            <input 
                              type="text" 
                              value={formHow2}
                              onChange={(e) => setFormHow2(e.target.value)}
                              placeholder="Stage 2..."
                              className="w-full border border-[#E6E6E6] bg-white px-3 py-2 rounded-xl text-xs font-sans text-stone-700"
                            />
                            <input 
                              type="text" 
                              value={formHow3}
                              onChange={(e) => setFormHow3(e.target.value)}
                              placeholder="Stage 3..."
                              className="w-full border border-[#E6E6E6] bg-white px-3 py-2 rounded-xl text-xs font-sans text-stone-700"
                            />
                          </div>
                        </div>

                        {/* Benefits list */}
                        <div className="space-y-2 pt-2">
                          <label className="font-sans text-[10px] font-black text-[#111827]/70 uppercase block">
                            Key Core Action Benefits
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input 
                              type="text" 
                              value={formBenefit1}
                              onChange={(e) => setFormBenefit1(e.target.value)}
                              placeholder="Benefit 1"
                              className="w-full border border-[#E6E6E6] bg-white px-3 py-2 rounded-xl text-xs font-sans text-stone-700"
                            />
                            <input 
                              type="text" 
                              value={formBenefit2}
                              onChange={(e) => setFormBenefit2(e.target.value)}
                              placeholder="Benefit 2"
                              className="w-full border border-[#E6E6E6] bg-white px-3 py-2 rounded-xl text-xs font-sans text-stone-700"
                            />
                            <input 
                              type="text" 
                              value={formBenefit3}
                              onChange={(e) => setFormBenefit3(e.target.value)}
                              placeholder="Benefit 3"
                              className="w-full border border-[#E6E6E6] bg-white px-3 py-2 rounded-xl text-xs font-sans text-stone-700"
                            />
                          </div>
                        </div>

                        {/* Case Study Group */}
                        <div className="border border-[#E6E6E6] p-4 rounded-xl space-y-3 bg-white mt-4">
                          <span className="font-mono text-[8.5px] font-bold text-[#2F6E73] uppercase tracking-wide block">
                            Vetted Historic Case Outcome Showcase
                          </span>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="font-sans text-[9px] font-black text-[#111827]/55 uppercase block mb-0.5">Client Type / Name</label>
                              <input 
                                type="text" 
                                value={formClient}
                                onChange={(e) => setFormClient(e.target.value)}
                                className="w-full border border-[#E6E6E6] px-3 py-1.5 rounded-lg text-xs font-sans focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="font-sans text-[9px] font-black text-[#111827]/55 uppercase block mb-0.5">Initial Glitch / Challenge</label>
                              <input 
                                type="text" 
                                value={formChallenge}
                                onChange={(e) => setFormChallenge(e.target.value)}
                                className="w-full border border-[#E6E6E6] px-3 py-1.5 rounded-lg text-xs font-sans focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="font-sans text-[9px] font-black text-[#111827]/55 uppercase block mb-0.5">Action Plan / Solution</label>
                              <input 
                                type="text" 
                                value={formSolution}
                                onChange={(e) => setFormSolution(e.target.value)}
                                className="w-full border border-[#E6E6E6] px-3 py-1.5 rounded-lg text-xs font-sans focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="font-sans text-[9px] font-black text-[#111827]/55 uppercase block mb-0.5 font-bold">Vetted Outcome Result</label>
                              <input 
                                type="text" 
                                value={formResult}
                                onChange={(e) => setFormResult(e.target.value)}
                                className="w-full border border-stone-300 px-3 py-1.5 rounded-lg text-xs font-sans focus:outline-none font-bold"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Editor triggers */}
                        <div className="flex gap-2 justify-end pt-2 border-t border-[#E6E6E6]">
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-4 py-2 hover:bg-stone-100 text-[#111827] text-xs font-sans font-bold rounded-xl transition-all cursor-pointer"
                          >
                            Cancel Changes
                          </button>
                          <button
                            onClick={saveEditing}
                            className="px-5 py-2 bg-black hover:bg-[#0d3979] text-white text-xs font-sans font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                          >
                            Commit Service Config
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
