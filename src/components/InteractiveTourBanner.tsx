import React from 'react';
import {
  Compass,
  CheckCircle2,
  Layers,
  User,
  Briefcase,
  PlusCircle,
  Sparkles,
  Star,
  Users,
  Trophy,
  Award,
  Zap,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Ticket,
  ChevronRight,
  ChevronLeft,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TOUR_STEPS = [
  { step: 1, title: '1. Email Verification', page: 'verify_email', icon: CheckCircle2, desc: 'Authenticate with college email to earn ✓ Verified Student badge' },
  { step: 2, title: '2. 100-Skill Onboarding', page: 'onboarding', icon: Layers, desc: 'Search 100 skills, set levels & mentoring availability' },
  { step: 3, title: '3. Student Profile & Journey', page: 'profile', icon: User, desc: 'Timeline journey, verified certs, and portfolio showcase' },
  { step: 4, title: '4. Gig Marketplace', page: 'gigs', icon: Briefcase, desc: 'Discover student gigs, filter by skills, apply with 1 click' },
  { step: 5, title: '5. Post a Campus Gig', page: 'post_gig', icon: PlusCircle, desc: 'Create gig with budget in ₹, deadline, and urgency' },
  { step: 6, title: '6. Mentor Directory', page: 'mentors', icon: Sparkles, desc: 'Book peer mentors using virtual Mentor Coupons (🎟️)' },
  { step: 7, title: '7. Verified Mentor Reviews', page: 'profile', icon: Star, desc: 'Authentic reviews tied directly to completed sessions' },
  { step: 8, title: '8. Field Communities', page: 'communities', icon: Users, desc: 'Join 10+ student tech domains, discussions & live polls' },
  { step: 9, title: '9. Weekly Challenges', page: 'competitions', icon: Trophy, desc: 'Submit code/projects to earn cash, XP & mentor coupons' },
  { step: 10, title: '10. Campus Leaderboard', page: 'leaderboard', icon: Award, desc: 'Weekly rankings based on verified student contributions' },
  { step: 11, title: '11. Career Hub & Internships', page: 'career', icon: Zap, desc: 'Verified recruiters hiring student talent (₹35k-50k/mo)' },
  { step: 12, title: '12. Campus Insights', page: 'insights', icon: BarChart3, desc: 'Live student marketplace metrics & Demand vs Supply' },
  { step: 13, title: '13. Trending Skills', page: 'trending', icon: TrendingUp, desc: 'Monthly surge analysis and predictive market forecasting' },
  { step: 14, title: '14. Trust Ladder Score', page: 'reputation', icon: ShieldCheck, desc: '"Trust is earned" progressive 9-step reputation meter' },
  { step: 15, title: '15. Coupons & Referral', page: 'coupons', icon: Ticket, desc: 'Invite friends, earn mentor coupons, and unlock perks' },
];

export const InteractiveTourBanner: React.FC = () => {
  const { activeDemoStep, setActiveDemoStep, runDemoStep } = useApp();

  const currentStepObj = TOUR_STEPS.find((s) => s.step === activeDemoStep) || TOUR_STEPS[0];

  const handleNext = () => {
    const nextStep = activeDemoStep >= TOUR_STEPS.length ? 1 : activeDemoStep + 1;
    runDemoStep(nextStep);
  };

  const handlePrev = () => {
    const prevStep = activeDemoStep <= 1 ? TOUR_STEPS.length : activeDemoStep - 1;
    runDemoStep(prevStep);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/50 py-2.5 px-4 sticky top-[65px] z-30 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        
        {/* Left: Indicator & Title */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="flex items-center gap-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-full border border-indigo-500/30">
            <Compass className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            Interactive Ecosystem Tour
          </span>
          <span className="text-xs font-semibold text-slate-200">
            Step {activeDemoStep || 1} of {TOUR_STEPS.length}:
          </span>
          <span className="text-xs font-bold text-amber-300">
            {currentStepObj.title}
          </span>
          <span className="hidden lg:inline text-xs text-slate-400">
            — {currentStepObj.desc}
          </span>
        </div>

        {/* Right: Step Shortcuts & Prev/Next controls */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
          {/* Direct Quick Jump dropdown / pills */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center transition"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <select
              value={activeDemoStep || 1}
              onChange={(e) => runDemoStep(Number(e.target.value))}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1 border border-slate-700 outline-none cursor-pointer font-medium"
            >
              {TOUR_STEPS.map((s) => (
                <option key={s.step} value={s.step}>
                  {s.title}
                </option>
              ))}
            </select>

            <button
              onClick={handleNext}
              className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 transition shadow-sm"
              title="Next Step"
            >
              <span>Next Step</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => runDemoStep(0)}
              className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs transition"
              title="Reset to Landing"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
