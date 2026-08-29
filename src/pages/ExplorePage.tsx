import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Briefcase,
  Trophy,
  Users,
  Zap,
  TrendingUp,
  ArrowRight,
  Star,
  CheckCircle2,
  Ticket,
  Clock,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ExplorePage: React.FC = () => {
  const {
    currentUser,
    gigs,
    mentors,
    competitions,
    internships,
    communities,
    navigateTo,
    applyToGig,
    applyToInternship,
    userInternshipApplications
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'gigs' | 'mentors' | 'competitions' | 'internships'>('all');

  // Filter recommendations based on user skills (Python, Web Development, ML, etc.)
  const userSkillNames = currentUser.skills.map((s) => s.name.toLowerCase());

  const recommendedGigs = gigs.filter((g) =>
    g.requiredSkills.some((req) => userSkillNames.includes(req.toLowerCase()))
  );

  const recommendedMentors = mentors.filter(
    (m) =>
      m.id !== currentUser.id &&
      m.skills.some((s) => s.willingToMentor)
  );

  const recommendedInternships = internships.filter((i) =>
    i.requiredSkills.some((req) => userSkillNames.includes(req.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500/30 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full border border-indigo-400/30 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Personalized Campus Recommendation Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Recommended For You, {currentUser.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-xl">
            Curated opportunities based on your skills in{' '}
            <span className="font-semibold text-white">
              {currentUser.skills.map((s) => s.name).join(', ')}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
          <div className="text-right">
            <p className="text-[11px] text-indigo-200">Campus Reputation</p>
            <p className="text-lg font-bold text-white">{currentUser.reputationScore}/100</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
            🛡️
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'all', label: 'All Recommendations', icon: Compass },
          { id: 'gigs', label: 'Recommended Gigs', icon: Briefcase },
          { id: 'mentors', label: 'Skill Mentors', icon: Sparkles },
          { id: 'competitions', label: 'Active Challenges', icon: Trophy },
          { id: 'internships', label: 'Internships', icon: Zap }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Recommended Gigs Section */}
      {(activeTab === 'all' || activeTab === 'gigs') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                🎯
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-slate-900">
                  Recommended Campus Gigs
                </h2>
                <p className="text-xs text-slate-500">
                  Because you have skills in Python, Web Development, and ML
                </p>
              </div>
            </div>
            <button
              onClick={() => navigateTo('gigs')}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Browse All ({gigs.length}) →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommendedGigs.slice(0, 3).map((gig) => (
              <div
                key={gig.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      ₹{gig.budget.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-semibold">
                      ⚡ {gig.urgency}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-sm text-slate-900 line-clamp-2">
                    {gig.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {gig.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {gig.requiredSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={gig.postedBy.avatar}
                      alt={gig.postedBy.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div className="text-[11px]">
                      <span className="font-semibold text-slate-800 block leading-none">
                        {gig.postedBy.name}
                      </span>
                      <span className="text-slate-400 text-[10px]">{gig.postedBy.college}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      applyToGig(gig.id, 'I have strong experience in this skill and can deliver high quality work fast.', gig.budget);
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
                  >
                    Quick Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommended Mentors Section */}
      {(activeTab === 'all' || activeTab === 'mentors') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-sm">
                👨‍🏫
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-slate-900">
                  Recommended Peer Mentors
                </h2>
                <p className="text-xs text-slate-500">
                  Connect with verified senior students for 1-on-1 guidance using 🎟️ Coupons
                </p>
              </div>
            </div>
            <button
              onClick={() => navigateTo('mentors')}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              View Mentor Directory →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recommendedMentors.slice(0, 3).map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-12 h-12 rounded-xl object-cover border border-indigo-200"
                    />
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-900 flex items-center gap-1">
                        {mentor.name}
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      </h4>
                      <p className="text-[11px] text-slate-500">{mentor.college}</p>
                      <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{mentor.rating || 4.9}</span>
                        <span className="text-slate-400 font-normal">({mentor.studentsMentoredCount} helped)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {mentor.bio}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {mentor.skills.filter((s) => s.willingToMentor).map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded-full"
                      >
                        {s.name} • {s.level}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    🎟️ 1 Coupon
                  </span>
                  <button
                    onClick={() => navigateTo('mentors', mentor.id)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    Request Mentorship →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Active Competitions Preview */}
      {(activeTab === 'all' || activeTab === 'competitions') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                🏆
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-slate-900">
                  Featured Weekly Competitions
                </h2>
                <p className="text-xs text-slate-500">
                  Compete with students nationwide, win cash prizes, badges & coupons
                </p>
              </div>
            </div>
            <button
              onClick={() => navigateTo('competitions')}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              All Challenges →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {competitions.slice(0, 2).map((comp) => (
              <div
                key={comp.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="bg-rose-50 text-rose-700 font-bold px-2.5 py-0.5 rounded-full border border-rose-200 animate-pulse">
                      🔥 {comp.status}
                    </span>
                    <span className="text-slate-500 text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {comp.deadline}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-slate-900">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                    {comp.description}
                  </p>

                  <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs">
                    <p className="font-bold text-amber-900">🎁 1st Prize Reward:</p>
                    <p className="text-amber-800 text-[11px] mt-0.5">{comp.prizes.first}</p>
                  </div>
                </div>

                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    👥 {comp.participantsCount} Students Competing
                  </span>
                  <button
                    onClick={() => navigateTo('competitions', comp.id)}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition"
                  >
                    View & Submit Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommended Internships Preview */}
      {(activeTab === 'all' || activeTab === 'internships') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                💼
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-slate-900">
                  Tier-1 Internships Matching Your Profile
                </h2>
                <p className="text-xs text-slate-500">
                  Posted by verified recruiters seeking proven student talent
                </p>
              </div>
            </div>
            <button
              onClick={() => navigateTo('career')}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              View Career Hub →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recommendedInternships.map((internship) => {
              const hasApplied = userInternshipApplications.includes(internship.id);
              return (
                <div
                  key={internship.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={internship.companyLogo}
                        alt={internship.companyName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="font-display font-bold text-sm text-slate-900">
                          {internship.title}
                        </h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                          {internship.companyName}
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                            {internship.workType}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 my-3 p-2.5 bg-slate-50 rounded-xl text-xs">
                      <div>
                        <span className="text-slate-400 text-[10px] block">Stipend</span>
                        <span className="font-bold text-emerald-700">{internship.stipend}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Duration</span>
                        <span className="font-semibold text-slate-800">{internship.duration}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {internship.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      👥 {internship.applicantsCount} applicants
                    </span>
                    <button
                      onClick={() => applyToInternship(internship.id)}
                      disabled={hasApplied}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                        hasApplied
                          ? 'bg-emerald-100 text-emerald-800 cursor-default'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                      }`}
                    >
                      {hasApplied ? '✓ Applied' : '1-Click Apply'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
};
