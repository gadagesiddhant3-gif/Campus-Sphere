import React from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Heart,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Pledge & Core Philosophy Banner */}
        <div className="bg-indigo-950/80 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/40 border border-indigo-400/40 flex items-center justify-center text-indigo-300 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-display font-black text-lg">
                "Trust is earned, not claimed."
              </h4>
              <p className="text-xs text-slate-300 mt-0.5 max-w-xl leading-relaxed">
                Every gig, review, and mentorship interaction on Campus Sphere is backed by verified institutional identity and peer feedback.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => navigateTo('verify_email')}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-1.5 shadow-md shadow-emerald-950/30"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Get Verified Student Badge</span>
            </button>
            <button
              onClick={() => navigateTo('reputation')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition"
            >
              View Trust Ladder
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="bg-indigo-600 p-2 rounded-xl text-white font-black text-base flex items-center justify-center shadow-md shadow-indigo-900/50">
                CS
              </div>
              <span className="font-display font-black text-xl text-white">
                Campus<span className="text-indigo-400">Sphere</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The digital campus ecosystem connecting student talent with peer mentorship, freelance gigs, verified skill journeys, hackathons, and tier-1 internships.
            </p>
            <div className="flex items-center gap-3 mt-4 text-slate-400">
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Active on 60+ Campuses
              </span>
            </div>
          </div>

          {/* Col 1: Marketplace & Skills */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Marketplace
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('gigs')} className="hover:text-white transition">
                  Explore Gigs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('post_gig')} className="hover:text-white transition">
                  Post a Gig (₹)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('mentors')} className="hover:text-white transition">
                  Find a Skill Mentor
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('onboarding')} className="hover:text-white transition">
                  100 Searchable Skills
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('trending')} className="hover:text-white transition">
                  Monthly Trending Skills
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Campus & Communities */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Campus Life
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('communities')} className="hover:text-white transition">
                  Student Communities
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('competitions')} className="hover:text-white transition">
                  Weekly Competitions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('leaderboard')} className="hover:text-white transition">
                  Campus Leaderboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('insights')} className="hover:text-white transition">
                  Campus Insights Analytics
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('coupons')} className="hover:text-white transition">
                  Mentor Coupons (🎟️)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Career & Trust */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Career & Trust
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('career')} className="hover:text-white transition">
                  Career Hub & Internships
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('reputation')} className="hover:text-white transition">
                  Reputation Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('verify_email')} className="hover:text-white transition">
                  Institutional Verification
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('referral')} className="hover:text-white transition">
                  Invite & Earn Program
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('subscription')} className="hover:text-white transition">
                  Campus Sphere Pro & Business
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Campus Sphere Ecosystem. Built for ambitious student creators & engineers.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Privacy Policy</span>
            <span className="text-slate-400">Terms of Campus Service</span>
            <span className="text-slate-400">Trust Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
