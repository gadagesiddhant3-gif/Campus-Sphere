import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  Star,
  Layers,
  Briefcase,
  Users,
  Lock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReputationDashboardPage: React.FC = () => {
  const { currentUser, navigateTo } = useApp();

  const trustLadderStages = [
    { stage: 1, title: 'Institutional Verification', desc: 'College email verification & active student ID status', completed: currentUser.isVerifiedStudent, points: '+15 Pts' },
    { stage: 2, title: 'Skill Profile Declaration', desc: 'Selected skills from 100-skill campus taxonomy with levels', completed: currentUser.skills.length > 0, points: '+10 Pts' },
    { stage: 3, title: 'Verified Certifications', desc: 'Uploaded verifiable course certificates & credentials', completed: currentUser.certificates.length > 0, points: '+15 Pts' },
    { stage: 4, title: 'Skill Journey Timeline', desc: 'Documented learning milestones and project evolution', completed: Object.keys(currentUser.skillJourneys || {}).length > 0, points: '+10 Pts' },
    { stage: 5, title: 'Portfolio & Working Code', desc: 'Added live project demos and GitHub repository links', completed: currentUser.portfolio.length > 0, points: '+15 Pts' },
    { stage: 6, title: 'Completed Campus Gigs', desc: 'Successfully delivered paid gigs with 100% on-time rate', completed: (currentUser.completedGigsCount || 0) > 0, points: '+15 Pts' },
    { stage: 7, title: 'Verified Peer Reviews', desc: 'Received positive authentic ratings from student clients', completed: currentUser.reviews.length > 0, points: '+10 Pts' },
    { stage: 8, title: 'Active Peer Mentorship', desc: 'Helped junior students using virtual Mentor Coupons', completed: (currentUser.studentsMentoredCount || 0) > 0, points: '+10 Pts' },
    { stage: 9, title: 'Campus Master Badge', desc: 'Achieved top 5% nationwide standing and master credibility', completed: currentUser.reputationScore >= 90, points: '+10 Pts' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-200/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              Progressive Trust Engine
            </span>
            <span className="text-xs text-indigo-100">"Trust is earned, not claimed"</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
            Campus Reputation & Trust Ladder
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 mt-1 max-w-xl">
            In our ecosystem, your reputation score unlocks higher gig rates, verified recruiter recommendations, and mentor status.
          </p>
        </div>

        {/* Big Score Gauge */}
        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/80 border border-indigo-300/40 flex items-center justify-center text-2xl font-black font-display text-white shadow-inner">
            {currentUser.reputationScore}
          </div>
          <div className="text-left">
            <p className="text-xs text-indigo-200 uppercase tracking-wider font-bold">Your Score</p>
            <p className="text-lg font-black text-white">Level: Campus Pro</p>
            <p className="text-[11px] text-emerald-300 font-bold">Top 4% on Campus</p>
          </div>
        </div>
      </div>

      {/* 9-Stage Trust Ladder */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-100/50 space-y-6">
        <div>
          <h3 className="font-display font-black text-xl text-slate-800">
            The 9-Stage Progressive Trust Ladder
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Each verified milestone permanently increases your campus credibility score
          </p>
        </div>

        <div className="space-y-3">
          {trustLadderStages.map((stage) => (
            <div
              key={stage.stage}
              className={`p-4 rounded-2xl border transition flex items-center justify-between gap-4 ${
                stage.completed
                  ? 'bg-emerald-50/70 border-emerald-200 text-slate-900 shadow-xs'
                  : 'bg-indigo-50/30 border-indigo-100 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                    stage.completed
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {stage.completed ? <CheckCircle2 className="w-4 h-4" /> : stage.stage}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <span>{stage.title}</span>
                    {stage.completed && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                        Completed ✓
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">{stage.desc}</p>
                </div>
              </div>

              <span className={`text-xs font-bold font-mono ${stage.completed ? 'text-emerald-700' : 'text-slate-400'}`}>
                {stage.points}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-100/50 space-y-6">
        <div>
          <h3 className="font-display font-black text-xl text-slate-800">
            Unlocked Campus Badges & Honors
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Recognized across all gigs, communities, and recruiter applications
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {currentUser.badges.map((badge) => (
            <div
              key={badge.id}
              className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200 text-center space-y-2 shadow-xs"
            >
              <div className="text-3xl">{badge.icon}</div>
              <h4 className="font-bold text-sm text-slate-800">{badge.name}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{badge.description}</p>
              <span className="text-[10px] text-amber-800 font-bold block bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">Unlocked {badge.unlockedAt}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
