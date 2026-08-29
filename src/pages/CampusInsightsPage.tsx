import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Briefcase,
  IndianRupee,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  PieChart,
  Activity,
  ArrowUpRight,
  School,
  Flame,
  Search,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_CAMPUS_INSIGHTS } from '../data/mockData';

export const CampusInsightsPage: React.FC = () => {
  const { campusInsights, navigateTo, globalSearchQuery, selectedItemId } = useApp();
  const insights = campusInsights || INITIAL_CAMPUS_INSIGHTS;

  const [localSearch, setLocalSearch] = useState('');

  const effectiveSearch = (localSearch || globalSearchQuery || '').trim().toLowerCase();

  const filteredDemandSupply = (insights.demandVsSupply || []).filter((item) => {
    if (!effectiveSearch) return true;
    return item.skill.toLowerCase().includes(effectiveSearch);
  });

  const filteredColleges = (insights.topColleges || []).filter((col) => {
    if (!effectiveSearch) return true;
    return col.college.toLowerCase().includes(effectiveSearch);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-200/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 backdrop-blur-xs">
              <BarChart3 className="w-3.5 h-3.5 text-amber-300" />
              Ecosystem Macro Analytics
            </span>
            <span className="text-xs text-indigo-100 font-semibold">Live Campus Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
            CampusGig Ecosystem Insights
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 mt-1 max-w-xl">
            Real-time analytics on student talent distribution, skill supply shortages, verified payout volume, and college engagement.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md p-5 rounded-2xl border border-white/25 shadow-inner">
          <div className="text-right">
            <p className="text-[11px] text-indigo-100 font-bold uppercase tracking-wider">Student Satisfaction</p>
            <p className="text-2xl font-black text-emerald-300 font-display">98.4% Positive</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-400/20 border border-emerald-300/30 text-emerald-300 flex items-center justify-center font-black text-lg">
            ✓
          </div>
        </div>
      </div>

      {/* Search Bar for Insights */}
      <div className="bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-96 bg-indigo-50/70 px-3.5 py-2 rounded-xl border border-indigo-100">
          <Search className="w-4 h-4 text-indigo-500" />
          <input
            type="text"
            placeholder="Search skills, demand analytics, colleges..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs outline-none text-slate-800 placeholder:text-slate-400"
          />
          {localSearch && (
            <button onClick={() => setLocalSearch('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          onClick={() => navigateTo('trending')}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 whitespace-nowrap"
        >
          <span>Explore 100+ Skills Market</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top 4 Macro Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-100/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verified Students</span>
              <span className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
                <Users className="w-4 h-4" />
              </span>
            </div>
            <p className="text-3xl font-black text-slate-900 font-display">
              {(insights.totalStudents || 4280).toLocaleString()}
            </p>
          </div>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-3 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 w-fit">
            <TrendingUp className="w-3.5 h-3.5" /> +18% this month
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-100/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Campus Gigs Posted</span>
              <span className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
                <Briefcase className="w-4 h-4" />
              </span>
            </div>
            <p className="text-3xl font-black text-slate-900 font-display">
              {(insights.totalGigsPosted || 1240).toLocaleString()}
            </p>
          </div>
          <span className="text-[11px] text-slate-600 font-bold block mt-3 bg-slate-100 px-2.5 py-1 rounded-full w-fit">
            {insights.completedGigs || 934} completed (75.3% rate)
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-100/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Student Gig Earnings</span>
              <span className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
                <IndianRupee className="w-4 h-4" />
              </span>
            </div>
            <p className="text-3xl font-black text-emerald-600 font-display">
              ₹{(((insights.totalEarningsDistributed || 874000)) / 100000).toFixed(1)} Lakhs
            </p>
          </div>
          <span className="text-[11px] text-emerald-700 font-bold block mt-3 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 w-fit">
            Directly to student accounts
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-100/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mentorship Sessions</span>
              <span className="p-2.5 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
                <Sparkles className="w-4 h-4" />
              </span>
            </div>
            <p className="text-3xl font-black text-amber-600 font-display">
              {insights.totalMentorshipSessions || 1820}
            </p>
          </div>
          <span className="text-[11px] text-amber-700 font-bold block mt-3 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 w-fit">
            Using virtual Mentor Coupons
          </span>
        </div>
      </div>

      {/* Visual Demand vs Supply Comparison Section */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-100/50 space-y-6">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-black text-xl text-slate-800 flex items-center gap-2">
                <span>Skill Demand vs. Talent Supply Ratio</span>
                <Flame className="w-5 h-5 text-rose-500" />
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Identifies high-shortage skills where student freelancers command the highest hourly rates
              </p>
            </div>
            <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-200 shadow-xs w-fit">
              Live Campus Market Analysis
            </span>
          </div>
        </div>

        {filteredDemandSupply.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-indigo-200 rounded-2xl">
            No skill supply data matches "{effectiveSearch}".
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDemandSupply.map((item, idx) => {
              const isShortage = item.demand > item.supply;
              const isSelected = selectedItemId === item.skill;
              return (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 rounded-2xl border transition space-y-3 shadow-xs ${
                    isSelected
                      ? 'bg-indigo-100/70 border-indigo-500 ring-2 ring-indigo-500'
                      : 'bg-indigo-50/30 border-indigo-100/80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{item.skill}</span>
                      {isShortage && (
                        <span className="text-[10px] bg-rose-100 text-rose-800 font-black px-2.5 py-0.5 rounded-full border border-rose-200">
                          High Shortage / Top Pay 🔥
                        </span>
                      )}
                    </div>
                    <span className="text-slate-600 text-xs font-semibold">
                      Demand: <strong className="text-indigo-700 font-black">{item.demand}%</strong> | Supply: <strong className="text-emerald-700 font-black">{item.supply}%</strong>
                    </span>
                  </div>

                  {/* Progress bars comparison */}
                  <div className="space-y-2 pt-1">
                    {/* Demand Bar */}
                    <div className="flex items-center gap-3 text-xs">
                      <span className="w-16 text-slate-500 font-bold text-right">Demand</span>
                      <div className="flex-1 bg-indigo-100/80 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full transition-all duration-500 shadow-xs"
                          style={{ width: `${item.demand}%` }}
                        ></div>
                      </div>
                    </div>
                    {/* Supply Bar */}
                    <div className="flex items-center gap-3 text-xs">
                      <span className="w-16 text-slate-500 font-bold text-right">Supply</span>
                      <div className="flex-1 bg-emerald-100/80 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500 shadow-xs"
                          style={{ width: `${item.supply}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Top Participating Colleges */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-100/50 space-y-6">
        <div>
          <h3 className="font-display font-black text-xl text-slate-800 flex items-center gap-2">
            <School className="w-5 h-5 text-indigo-600" />
            <span>Top Participating Colleges & Verified Campuses</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Ranked by active verified student profiles and completed transactions
          </p>
        </div>

        {filteredColleges.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-indigo-200 rounded-2xl">
            No participating colleges match "{effectiveSearch}".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredColleges.map((col, idx) => (
              <div
                key={idx}
                className="p-5 bg-indigo-50/30 hover:bg-indigo-50/60 transition rounded-2xl border border-indigo-100 flex items-center justify-between shadow-xs"
              >
                <div>
                  <span className="text-xs font-black text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-100">
                    #{idx + 1}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mt-1.5">{col.college}</h4>
                  <p className="text-xs text-slate-500 font-medium">{col.studentsCount} active students</p>
                </div>
                <span className="px-3 py-1.5 bg-white rounded-xl border border-emerald-200 font-black text-xs text-emerald-700 shadow-xs">
                  {col.gigsCount} Gigs
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
