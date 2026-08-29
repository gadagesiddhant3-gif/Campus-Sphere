import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Mail,
  KeyRound,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Ticket,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const VerificationModal: React.FC = () => {
  const { currentUser, verifyCollegeEmail, navigateTo } = useApp();

  const [emailInput, setEmailInput] = useState(currentUser.email || 'rahul.sharma@iitb.ac.in');
  const [collegeInput, setCollegeInput] = useState(currentUser.college || 'IIT Bombay');
  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');
  const [otpCode, setOtpCode] = useState('549281');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.includes('@')) return;
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    verifyCollegeEmail(emailInput, collegeInput);
    setStep('success');

    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }
  };

  const autofillCollege = (email: string, college: string) => {
    setEmailInput(email);
    setCollegeInput(college);
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      
      {/* Step 1: Input College Email */}
      {step === 'email' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 animate-in fade-in">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-display font-extrabold text-slate-900">
              Verify Institutional College Email
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Every student profile on CampusGig is authenticated to ensure genuine peer freelancing, trust, and safety.
            </p>
          </div>

          {/* Quick autofill helper */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
            <span className="font-bold text-slate-700 block text-[11px]">
              Demo Quick Presets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => autofillCollege('rahul.sharma@iitb.ac.in', 'IIT Bombay')}
                className="px-2.5 py-1 bg-white hover:bg-indigo-50 text-indigo-700 font-semibold rounded-lg border border-slate-200 text-[11px]"
              >
                IIT Bombay
              </button>
              <button
                type="button"
                onClick={() => autofillCollege('priya.patel@nitt.edu', 'NIT Trichy')}
                className="px-2.5 py-1 bg-white hover:bg-indigo-50 text-indigo-700 font-semibold rounded-lg border border-slate-200 text-[11px]"
              >
                NIT Trichy
              </button>
              <button
                type="button"
                onClick={() => autofillCollege('ananya.iyer@bits-pilani.ac.in', 'BITS Pilani')}
                className="px-2.5 py-1 bg-white hover:bg-indigo-50 text-indigo-700 font-semibold rounded-lg border border-slate-200 text-[11px]"
              >
                BITS Pilani
              </button>
              <button
                type="button"
                onClick={() => autofillCollege('rohan.gupta@dtu.ac.in', 'DTU Delhi')}
                className="px-2.5 py-1 bg-white hover:bg-indigo-50 text-indigo-700 font-semibold rounded-lg border border-slate-200 text-[11px]"
              >
                DTU Delhi
              </button>
            </div>
          </div>

          <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                College / Institutional Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="student@college.ac.in"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                College / University Name
              </label>
              <input
                type="text"
                value={collegeInput}
                onChange={(e) => setCollegeInput(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Send 6-Digit OTP Code</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Step 2: OTP Verification */}
      {step === 'otp' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 animate-in fade-in">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-xs">
              <KeyRound className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-display font-extrabold text-slate-900">
              Enter Verification Code
            </h2>
            <p className="text-xs text-slate-500">
              Sent to <strong className="text-slate-800">{emailInput}</strong>
            </p>
          </div>

          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-center text-xs font-semibold">
            Demo OTP is: <strong className="font-mono text-sm text-emerald-950">549281</strong>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1 text-center">
                6-Digit Security Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-xl font-mono tracking-widest font-bold focus:bg-white focus:border-indigo-500 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify & Unlock Student Badge</span>
            </button>
          </form>
        </div>
      )}

      {/* Step 3: Success Confirmation */}
      {step === 'success' && (
        <div className="bg-white p-8 rounded-3xl border border-emerald-300 shadow-2xl space-y-6 text-center animate-in zoom-in-95">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl shadow-sm">
            ✓
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-display font-extrabold text-slate-900">
              Institutional Verification Successful!
            </h2>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Your profile is now permanently tagged with <span className="font-bold text-emerald-700">✓ Verified Student ({collegeInput})</span>.
            </p>
          </div>

          {/* Perks unlocked card */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-left text-xs space-y-2 text-emerald-950">
            <p className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Perks Conferred to Your Account:</span>
            </p>
            <ul className="space-y-1 text-[11px] text-emerald-900 list-disc list-inside">
              <li>✓ Verified Student trust badge on all bids & gigs</li>
              <li>+15 Reputation Points added to Trust Ladder</li>
              <li>🎟️ 4 Free Virtual Mentor Coupons deposited</li>
              <li>Direct 1-click apply access on verified internships</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => navigateTo('profile')}
              className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition"
            >
              View My Verified Profile
            </button>
            <button
              onClick={() => navigateTo('gigs')}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition"
            >
              Explore Gigs Marketplace
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
