import React from 'react';
import { INITIAL_CASE_STUDIES } from '../data';
import { Check, Info, Compass, HelpCircle } from 'lucide-react';

export default function SuccessView() {
  return (
    <div className="w-full bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Head intro */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] font-bold uppercase block mb-2 bg-[#F5F5F4] w-max px-2.5 py-1 rounded">
            Verified Experiences
          </span>
          <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-[#0d3979] uppercase tracking-tight leading-[0.9]">
            Client Experience Stories
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#111827]/70 mt-4 leading-relaxed">
            Real-world examples of how Nihira Finserv assists clients in navigate financial processes, loans, documentation, and tax filing with clear and trusted guidance.
          </p>
        </div>

        {/* Detailed Client Stories inside Challenge, Solution, Outcome loops */}
        <div className="space-y-16">
          {INITIAL_CASE_STUDIES.map((cs) => (
            <div 
              key={cs.id}
              className="border border-[#E6E6E6] rounded-[32px] overflow-hidden bg-[#F5F5F4]/20 hover:shadow-md transition-all duration-300 p-6 md:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                
                {/* Left Panel Context */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="inline-flex items-center gap-1.5 border border-[#E6E6E6] bg-white px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F6E73]" />
                    <span className="font-mono text-[9px] tracking-wider text-[#0d3979] font-bold uppercase">
                      {cs.category}
                    </span>
                  </div>

                  <h3 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-[#0d3979] leading-tight">
                    {cs.title}
                  </h3>

                  <div className="pt-4 border-t border-[#E6E6E6]">
                    <span className="block font-mono text-[8px] text-[#111827]/50 tracking-wider">CLIENT SEGMENT</span>
                    <span className="block font-sans font-bold text-xs text-[#0d3979] uppercase mt-0.5">{cs.clientType}</span>
                  </div>

                  {/* Clear quick points */}
                  <div className="space-y-2 pt-2">
                    {cs.metrics.map((m, i) => (
                      <div key={i} className="flex justify-between items-center bg-white border border-[#E6E6E6] px-4 py-2.5 rounded-xl text-xs">
                        <span className="font-sans text-[#111827]/60 font-medium">{m.label}</span>
                        <span className="font-mono font-bold text-[#0d3979]">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Panel Narrative (Challenge, Solution, Outcome) */}
                <div className="lg:col-span-8 flex flex-col justify-between">
                  <div className="w-full h-56 rounded-2xl overflow-hidden bg-stone-100 border border-[#E6E6E6] mb-6">
                    <img
                      src={cs.imageUrl}
                      alt={cs.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover contrast-110 hover:scale-[1.01] transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-6 text-xs sm:text-sm text-[#111827]/75 font-sans leading-relaxed">
                    
                    {/* Simplified Structured Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Challenge */}
                      <div className="border border-[#E6E6E6] p-5 rounded-2xl bg-white">
                        <h4 className="font-sans font-black text-xs uppercase tracking-tight text-[#0d3979] mb-2 flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-[#2F6E73]" />
                          Challenge
                        </h4>
                        <p className="text-xs text-[#111827]/75 leading-relaxed">
                          {cs.challenge}
                        </p>
                      </div>

                      {/* Solution */}
                      <div className="border border-[#E6E6E6] p-5 rounded-2xl bg-white">
                        <h4 className="font-sans font-black text-xs uppercase tracking-tight text-[#0d3979] mb-2 flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-[#2F6E73]" />
                          Solution Guidance
                        </h4>
                        <p className="text-xs text-[#111827]/75 leading-relaxed">
                          {cs.strategy} {cs.execution}
                        </p>
                      </div>

                    </div>

                    {/* Outcome Box */}
                    <div className="bg-[#0d3979] text-white p-5 rounded-2xl flex items-start gap-3">
                      <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-[8.5px] tracking-widest text-[#2F6E73] font-bold block bg-white w-max px-2 py-0.5 rounded mb-1.5 leading-none">
                          OUTCOME RESOLVED
                        </span>
                        <p className="font-sans font-black text-white text-xs sm:text-sm">
                          {cs.outcome}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Dynamic client disclaimer block */}
        <div className="mt-16 bg-[#F5F5F4]/50 border border-[#E6E6E6] p-6 rounded-2xl flex items-start gap-3 max-w-3xl mx-auto">
          <Info className="w-5 h-5 text-[#2F6E73] shrink-0 mt-0.5" />
          <p className="font-sans text-[11px] text-[#111827]/60 leading-relaxed">
            <strong>Client Privacy Commitment:</strong> To protect client privacy, the above examples represent standard process walkthroughs and simplified case studies. Individual documentation lists and advisory timelines depend on individual financial postures and credit assessment matrices.
          </p>
        </div>

      </div>
    </div>
  );
}
