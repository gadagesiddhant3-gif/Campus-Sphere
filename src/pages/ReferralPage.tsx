import React, { useState } from 'react';
import {
  Gift,
  Copy,
  Check,
  Share2,
  Users,
  Ticket,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReferralPage: React.FC = () => {
  const { currentUser, earnCoupons, navigateTo } = useApp();

  const [copied, setCopied] = useState(false);
  const referralCode = `CG-${currentUser.name.split(' ')[0].toUpperCase()}-${currentUser.college.split(' ')[0].toUpperCase()}`;
  const referralLink = `https://campusgig.app/join?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulateInvite = () => {
    earnCoupons(2, 'Referral Bonus: Friend verified college email');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-violet-500/30 text-violet-200 text-xs font-bold px-3 py-1 rounded-full border border-violet-400/30 flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-amber-300" />
              Campus Ambassador & Referral Network
            </span>
            <span className="text-xs text-violet-200">Invite & Earn</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Invite Your Campus Peers, Earn 🎟️ Coupons
          </h1>
          <p className="text-xs sm:text-sm text-violet-200 mt-1 max-w-xl">
            Give your college batchmates 4 free Mentor Coupons and earn 2 extra coupons for every verified student signup.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
          <p className="text-[11px] text-violet-200">Your Referral Earnings</p>
          <p className="text-2xl font-extrabold text-amber-300 font-display">🎟️ 8 Coupons Earned</p>
          <p className="text-[10px] text-violet-200 mt-0.5">4 Friends Verified</p>
        </div>
      </div>

      {/* Referral Link Box */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="font-display font-bold text-lg text-slate-900">
            Your Personal Campus Invite Link
          </h3>
          <p className="text-xs text-slate-500">
            Share this link via WhatsApp college groups, Discord servers, or Telegram channels
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between font-mono text-xs text-slate-700">
            <span className="truncate">{referralLink}</span>
            <span className="ml-2 font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              {referralCode}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2 flex-shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Invite Link</span>
              </>
            )}
          </button>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Demo helper: Click below to simulate a college friend verifying their email
          </span>
          <button
            onClick={handleSimulateInvite}
            className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Simulate +1 Friend Verified (+2 Coupons)</span>
          </button>
        </div>
      </div>

      {/* Trust & Fraud Prevention Explainer */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-display font-bold text-base text-white">
              Institutional Email Anti-Fraud Protection
            </h4>
            <p className="text-xs text-slate-400">
              Only verified university accounts (.edu, .ac.in, or college domains) qualify for referral reward disbursement to ensure an authentic student community.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
