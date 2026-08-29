import React, { useState } from 'react';
import {
  TrendingUp,
  Flame,
  Sparkles,
  ArrowUpRight,
  Search,
  Briefcase,
  Users,
  IndianRupee,
  Layers,
  ChevronRight,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TrendingSkillsPage: React.FC = () => {
  const { trendingSkills, risingSkills, navigateTo, globalSearchQuery, selectedItemId } = useApp();

  const [filterCategory, setFilterCategory] = useState('All');
  const [localSearch, setLocalSearch] = useState('');

  const effectiveSearch = (localSearch || globalSearchQuery || '').trim().toLowerCase();

  const filteredTrending = trendingSkills.filter((item) => {
    const matchesCategory = filterCategory === 'All' || item.category.toLowerCase().includes(filterCategory.toLowerCase());
    if (!effectiveSearch) return matchesCategory;

    const name = item.skillName || '';
    const cat = item.category || '';
    const stipend = item.avgStipend || '';

    const matchesSearch =
      name.toLowerCase().includes(effectiveSearch) ||
      cat.toLowerCase().includes(effectiveSearch) ||
      stipend.toLowerCase().includes(effectiveSearch);

    return matchesCategory && matchesSearch;
  });

  const filteredRising = risingSkills.filter((item) => {
    const matchesCategory = filterCategory === 'All' || item.category.toLowerCase().includes(filterCategory.toLowerCase());
    if (!effectiveSearch) return matchesCategory;

    const name = item.skillName || '';
    const cat = item.category || '';
    const reason = item.reason || '';

    const matchesSearch =
      name.toLowerCase().includes(effectiveSearch) ||
      cat.toLowerCase().includes(effectiveSearch) ||
      reason.toLowerCase().includes(effectiveSearch);

    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'AI & ML', 'Web Development', 'Cloud & DevOps', 'Cybersecurity', 'Mobile App', 'Design & UI/UX'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-violet-500/30 text-violet-200 text-xs font-bold px-3 py-1 rounded-full border border-violet-400/30 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              Live Campus Labor Market Intelligence
            </span>
            <span className="text-xs text-violet-200">100+ Skills Analyzed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Trending & Predictive Campus Skills
          </h1>
          <p className="text-xs sm:text-sm text-violet-200 mt-1 max-w-xl">
            Real-time analytics on what skills campus founders, fest organizers, and recruiters are actively paying top rupees for.
          </p>
        </div>

        <button
          onClick={() => navigateTo('insights')}
          className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 flex-shrink-0"
        >
          <span>View Campus Insights Analytics</span>
          <ArrowUpRight className="w-4 h-4 text-indigo-600" />
        </button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm">
        <div className="flex items-center gap-3 w-full sm:w-80 bg-indigo-50/70 px-3.5 py-2 rounded-xl border border-indigo-100">
          <Search className="w-4 h-4 text-indigo-500" />
          <input
            type="text"
            placeholder="Search skills, domains, budgets..."
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

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Section 1: Trending This Month */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm">
              🔥
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-slate-900">
                Trending Skills This Month ({filteredTrending.length})
              </h2>
              <p className="text-xs text-slate-500">
                Highest surge in paid gig requests, search queries, and average hourly payout
              </p>
            </div>
          </div>
        </div>

        {filteredTrending.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-dashed border-indigo-200 text-center text-xs text-slate-500">
            No trending skills found matching "{effectiveSearch}".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTrending.map((item, idx) => {
              const isSelected = selectedItemId === item.skillName;
              return (
                <div
                  key={idx}
                  className={`bg-white p-5 rounded-2xl border transition flex flex-col justify-between ${
                    isSelected
                      ? 'border-indigo-600 ring-2 ring-indigo-500 shadow-md'
                      : 'border-slate-200 hover:border-indigo-400 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" />
                        {item.growthRate}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base text-slate-900">
                      {item.skillName}
                    </h3>

                    <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-xl text-center text-xs my-3">
                      <div>
                        <span className="font-bold text-slate-800">{item.gigCount}</span>
                        <span className="text-[10px] text-slate-400 block">Active Gigs</span>
                      </div>
                      <div>
                        <span className="font-bold text-emerald-700">{item.avgStipend}</span>
                        <span className="text-[10px] text-slate-400 block">Avg Budget</span>
                      </div>
                      <div>
                        <span className="font-bold text-indigo-600">{item.searchVolume.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-400 block">Searches</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => navigateTo('gigs')}
                      className="font-bold text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      <span>Browse Gigs</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => navigateTo('mentors')}
                      className="text-slate-500 hover:text-slate-800 font-medium"
                    >
                      Find Mentor →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Section 2: Predictive Rising Skills Next Month */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              🚀
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-slate-900">
                Rising Skills Next Month (Predictive Market Forecast) ({filteredRising.length})
              </h2>
              <p className="text-xs text-slate-500">
                AI analysis of upcoming hackathon themes, fest contracts, and recruiter early requisitions
              </p>
            </div>
          </div>
        </div>

        {filteredRising.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-dashed border-indigo-200 text-center text-xs text-slate-500">
            No predictive rising skills found matching "{effectiveSearch}".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRising.map((item, idx) => {
              const isSelected = selectedItemId === item.skillName;
              return (
                <div
                  key={idx}
                  className={`bg-white p-5 rounded-2xl border transition flex flex-col justify-between ${
                    isSelected
                      ? 'border-violet-600 ring-2 ring-violet-500 shadow-md'
                      : 'border-slate-200 hover:border-violet-400 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                      <span className="font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        {item.predictedGrowth}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base text-slate-900">
                      {item.skillName}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {item.reason}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">High Growth Potential</span>
                    <button
                      onClick={() => navigateTo('onboarding')}
                      className="font-bold text-indigo-600 hover:underline"
                    >
                      Add to My Profile →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
};
