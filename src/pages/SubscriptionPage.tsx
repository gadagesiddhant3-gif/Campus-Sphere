import React from 'react';
import {
  Check,
  Zap,
  ShieldCheck,
  Building2,
  GraduationCap,
  Sparkles,
  Ticket
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SubscriptionPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Sustainable Ecosystem Model
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900">
          Transparent Pricing for Students & Recruiters
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Campus Sphere is 100% free for student peer-to-peer discovery. Upgrade for advanced career telemetry or recruiter talent access.
        </p>
      </div>

      {/* 3 Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Tier 1: Free Student Tier */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2.5 bg-slate-100 text-slate-700 rounded-2xl">
                <GraduationCap className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                Default
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-slate-900">Campus Scholar</h3>
            <p className="text-xs text-slate-500 mt-1">For all verified college students</p>

            <div className="my-6">
              <span className="text-4xl font-extrabold text-slate-900 font-display">₹0</span>
              <span className="text-xs text-slate-500"> / forever free</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Browse & apply to all 1,240+ campus gigs</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>4 Free Mentor Coupons on signup</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Verified student badge & trust ladder</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Join all 10+ field tech communities</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Weekly competition participation</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigateTo('gigs')}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-2xl transition"
          >
            Current Active Plan
          </button>
        </div>

        {/* Tier 2: Campus Sphere Pro */}
        <div className="bg-gradient-to-b from-indigo-950 to-slate-900 text-white p-8 rounded-3xl border-2 border-indigo-500 shadow-xl flex flex-col justify-between space-y-6 relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 px-3 py-1 rounded-full shadow-md">
            Recommended For High Achievers
          </span>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2.5 bg-indigo-600 text-white rounded-2xl">
                <Zap className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-800 text-indigo-200 px-2 py-0.5 rounded">
                Campus Pro
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-white">Campus Sphere Pro</h3>
            <p className="text-xs text-slate-300 mt-1">Accelerate career & client visibility</p>

            <div className="my-6">
              <span className="text-4xl font-extrabold text-white font-display">₹199</span>
              <span className="text-xs text-indigo-300"> / semester</span>
            </div>

            <ul className="space-y-3 text-xs text-indigo-100">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Priority applicant badge on gig proposals</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>12 Monthly Mentor Coupons included</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Featured placement in Recruiter Talent Search</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Advanced skill demand & rate telemetry</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Zero platform escrow deductions</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => alert('CampusGig Pro plan activated for demo session!')}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold text-xs rounded-2xl shadow-lg transition"
          >
            Upgrade to Pro (Demo)
          </button>
        </div>

        {/* Tier 3: Verified Recruiter Partner */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl">
                <Building2 className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                For Employers
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-slate-900">Verified Recruiter Partner</h3>
            <p className="text-xs text-slate-500 mt-1">Hire vetted student engineers & designers</p>

            <div className="my-6">
              <span className="text-4xl font-extrabold text-slate-900 font-display">₹4,999</span>
              <span className="text-xs text-slate-500"> / month</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Direct Search 4,280+ Verified Student Profiles</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Post Unlimited Tier-1 Internships</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Filter candidates by Reputation (80+) & Gigs</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>"✓ Verified Hiring Partner" badge</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigateTo('career')}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl transition"
          >
            Access Recruiter Portal
          </button>
        </div>

      </div>

    </div>
  );
};
