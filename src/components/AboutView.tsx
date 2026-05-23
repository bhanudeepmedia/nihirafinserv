import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Target, Award, Eye } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="w-full bg-white pt-24">
      
      {/* EXEMPT LARGE POLISHED BANNER */}
      <section className="relative h-[380px] w-full overflow-hidden flex items-end justify-start">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop"
            alt="Nihira Finserv Guidance and Support Office"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover contrast-110 brightness-75 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d3979] via-[#0d3979]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-8 pb-12">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] tracking-widest text-[#2F6E73] font-black bg-white px-3 py-1 rounded mb-3 inline-block uppercase shadow-sm">
              Learn Our Values
            </span>
            <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[0.9]">
              About Nihira Finserv
            </h1>
            <p className="font-sans text-xs sm:text-sm text-white/90 mt-4 max-w-lg leading-relaxed font-medium">
              We help individuals and businesses access financial services through guidance, consultation and support.
            </p>
          </div>
        </div>
      </section>

      {/* CORE PHILOSOPHY AND NARRATIVE */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 divide-y divide-[#E6E6E6]">
        
        {/* Who We Are & Our Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] font-bold block bg-[#F5F5F4] w-max px-2.5 py-1 rounded uppercase mb-2">
              CLIENT POSITIONING
            </span>
            <h2 className="font-sans font-black text-3xl md:text-4xl text-[#0d3979] uppercase tracking-tight">
              Trusted Mentorship
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-8 text-sm text-[#111827]/75 font-sans leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-[#0d3979] font-black text-xl uppercase tracking-tight">
                Who We Are
              </h3>
              <p className="text-[#111827] text-base font-semibold leading-relaxed">
                Nihira Finserv is a financial services company focused on helping individuals and businesses access guidance and support across important financial requirements.
              </p>
              <p>
                Whether you are exploring loans, evaluating insurance covers, looking to improve your credit standing, saving systematically via mutual funds, or handling critical tax compliance documents, we bridge the gap between complex requirements and clear, actionable steps.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#E6E6E6]">
              <h3 className="text-[#0d3979] font-black text-xl uppercase tracking-tight">
                Our Approach
              </h3>
              <p className="text-base text-[#111827] font-semibold leading-relaxed">
                We believe financial services should feel simple, transparent and accessible.
              </p>
              <p>
                Our entire consulting workflow is structured to avoid exhausting, confusing jargon. We focus instead on honest explanation, guided timelines, and absolute human support so you can make confident decisions without pressure.
              </p>
            </div>
          </div>
        </div>

        {/* Experience Section in Highlight layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-20 items-center">
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm rounded-[36px] overflow-hidden border border-[#E6E6E6] bg-stone-100 p-8 shadow-sm">
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-40 h-40 rounded-full bg-[#0d3979]/5 pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0d3979] flex items-center justify-center text-white">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="text-5xl font-sans font-black tracking-tighter text-[#0d3979]">
                  10+
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#2F6E73]">
                  Years of Diligent Service
                </div>
                <p className="text-xs text-[#111827]/70 leading-relaxed font-sans font-medium">
                  Guiding clients through structural financial requirements with high satisfaction rates and error-free support loops.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-[9px] tracking-widest text-[#2F6E73] font-bold block uppercase bg-[#F5F5F4] w-max px-2.5 py-1 rounded">
              PRACTICAL HISTORIC VALUE
            </span>
            <h3 className="font-sans font-black text-3xl text-[#0d3979] uppercase tracking-tight leading-none">
              Client Support History
            </h3>
            <p className="font-sans text-sm text-[#111827]/70 leading-relaxed">
              Serving clients with practical financial guidance and service support over the last ten years. Throughout this journey, we have stayed committed to giving our clients clear, prompt advice with direct access to top credit partners and certified filing assistance.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border border-[#E6E6E6] rounded-xl p-4 bg-[#F5F5F4]/35">
                <span className="block font-sans font-black text-xs text-[#0d3979] uppercase">Grounded Experience</span>
                <span className="block font-sans text-[11px] text-[#111827]/60 mt-1 leading-normal">10 uninterrupted years of reliable service in loans and taxation consultation.</span>
              </div>
              <div className="border border-[#E6E6E6] rounded-xl p-4 bg-[#F5F5F4]/35">
                <span className="block font-sans font-black text-xs text-[#0d3979] uppercase">Client Focus</span>
                <span className="block font-sans text-[11px] text-[#111827]/60 mt-1 leading-normal">Dedicated support to resolve documentation hurdles and explain terms fully.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission and Vision Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-20 divide-y md:divide-y-0 md:divide-x divide-[#E6E6E6]">
          
          {/* Mission Card */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F5F5F4] flex items-center justify-center border border-[#E6E6E6]">
                <Target className="w-5 h-5 text-[#0d3979]" />
              </div>
              <span className="font-sans font-black text-sm uppercase tracking-widest text-[#0d3979]">
                Our Mission
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#111827]/70 leading-relaxed">
              Provide trustworthy guidance and practical support for financial needs. We make it easy for businesses and individuals to secure credit, manage protection policies, and comply with tax filing standards.
            </p>
          </div>

          {/* Vision Card */}
          <div className="space-y-6 pt-8 md:pt-0 pl-0 md:pl-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F5F5F4] flex items-center justify-center border border-[#E6E6E6]">
                <Eye className="w-5 h-5 text-[#2F6E73]" />
              </div>
              <span className="font-sans font-black text-sm uppercase tracking-widest text-[#0d3979]">
                Our Vision
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#111827]/70 leading-relaxed">
              To make financial services easier to understand and easier to access. We strive to be the most trustworthy financial guide, creating clarity and transparency for every domestic savings and credit seeker we serve.
            </p>
          </div>

        </div>

      </section>
    </div>
  );
}
