import React, { useState } from 'react';
import {
  Ticket,
  Sparkles,
  Gift,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CouponsPage: React.FC = () => {
  const { currentUser, earnCoupons, navigateTo } = useApp();

  const [purchasedPack, setPurchasedPack] = useState<string | null>(null);

  const handleSimulatePurchase = (count: number, label: string) => {
    earnCoupons(count, `Claimed ${label}`);
    setPurchasedPack(`Successfully added ${count} coupons!`);
    setTimeout(() => setPurchasedPack(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5 text-amber-200" />
              Virtual Campus Currency
            </span>
            <span className="text-xs text-amber-100">Peer Mentorship Exchange</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Virtual Mentor Coupons Hub
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 mt-1 max-w-xl">
            Mentor Coupons allow any student to request 1-on-1 guidance, project code reviews, and career feedback from vetted senior mentors.
          </p>
        </div>

        {/* Big Balance Box */}
        <div className="bg-black/30 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center min-w-[200px]">
          <p className="text-xs text-amber-200 uppercase font-bold">Your Balance</p>
          <p className="text-3xl font-extrabold text-amber-300 font-display my-1">
            🎟️ {currentUser.couponsBalance}
          </p>
          <span className="text-[11px] text-emerald-300 font-semibold">Active & Valid</span>
        </div>
      </div>

      {purchasedPack && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 flex items-center gap-2 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{purchasedPack}</span>
        </div>
      )}

      {/* How To Earn Free Coupons */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="font-display font-bold text-lg text-slate-900">
            How to Earn Free Mentor Coupons
          </h3>
          <p className="text-xs text-slate-500">
            Complete learning challenges, mentor peers, or invite friends to earn coupons
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <div>
              <span className="p-2.5 bg-indigo-100 text-indigo-700 rounded-xl inline-block mb-2">
                <Gift className="w-5 h-5" />
              </span>
              <h4 className="font-bold text-sm text-slate-900">Invite College Friends</h4>
              <p className="text-xs text-slate-600 mt-1">
                Earn <strong>🎟️ 2 Coupons</strong> for every friend who signs up with their verified college email.
              </p>
            </div>
            <button
              onClick={() => navigateTo('referral')}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold"
            >
              Get Invite Link
            </button>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <div>
              <span className="p-2.5 bg-amber-100 text-amber-700 rounded-xl inline-block mb-2">
                <Award className="w-5 h-5" />
              </span>
              <h4 className="font-bold text-sm text-slate-900">Weekly Leaderboard</h4>
              <p className="text-xs text-slate-600 mt-1">
                Top 10 contributors on the campus leaderboard receive up to <strong>🎟️ 15 Coupons</strong> every Sunday.
              </p>
            </div>
            <button
              onClick={() => navigateTo('leaderboard')}
              className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold"
            >
              View Rankings
            </button>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <div>
              <span className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl inline-block mb-2">
                <Sparkles className="w-5 h-5" />
              </span>
              <h4 className="font-bold text-sm text-slate-900">Mentor Others</h4>
              <p className="text-xs text-slate-600 mt-1">
                Help junior students in skills you're strong at. Every verified 5-star session rewards you with bonus coupons.
              </p>
            </div>
            <button
              onClick={() => navigateTo('onboarding')}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
            >
              Enable Mentoring
            </button>
          </div>
        </div>
      </div>

      {/* Simulated Coupon Pack Store */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="font-display font-bold text-lg text-slate-900">
            Need Extra Mentorship Sessions? Get Coupon Packs
          </h3>
          <p className="text-xs text-slate-500">
            100% of revenue goes directly into the campus student reward and hackathon prize pool
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 transition space-y-3 text-center">
            <h4 className="font-bold text-sm text-slate-800">Starter Pack</h4>
            <p className="text-2xl font-extrabold text-slate-900 font-display">🎟️ 3 Coupons</p>
            <p className="text-xs text-slate-500">Ideal for 1 assignment or portfolio review</p>
            <button
              onClick={() => handleSimulatePurchase(3, 'Starter Pack')}
              className="w-full py-2 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-800 rounded-xl text-xs font-bold transition"
            >
              Claim 3 Coupons (Free Demo)
            </button>
          </div>

          <div className="p-5 bg-indigo-50 rounded-2xl border-2 border-indigo-500 space-y-3 text-center shadow-xs">
            <span className="text-[10px] uppercase font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
              Most Popular
            </span>
            <h4 className="font-bold text-sm text-indigo-950">Campus Scholar</h4>
            <p className="text-2xl font-extrabold text-indigo-900 font-display">🎟️ 8 Coupons</p>
            <p className="text-xs text-indigo-700">Covers semester-long mentoring across 3 courses</p>
            <button
              onClick={() => handleSimulatePurchase(8, 'Scholar Pack')}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              Claim 8 Coupons (Free Demo)
            </button>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 transition space-y-3 text-center">
            <h4 className="font-bold text-sm text-slate-800">Master Pack</h4>
            <p className="text-2xl font-extrabold text-slate-900 font-display">🎟️ 20 Coupons</p>
            <p className="text-xs text-slate-500">Complete interview prep & thesis guidance</p>
            <button
              onClick={() => handleSimulatePurchase(20, 'Master Pack')}
              className="w-full py-2 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-800 rounded-xl text-xs font-bold transition"
            >
              Claim 20 Coupons (Free Demo)
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
