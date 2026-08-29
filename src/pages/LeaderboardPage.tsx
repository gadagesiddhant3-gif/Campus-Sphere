import React, { useState } from 'react';
import {
  Award,
  Trophy,
  Star,
  CheckCircle2,
  Ticket,
  Flame,
  ShieldCheck,
  Search,
  Filter,
  ArrowUpRight,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LeaderboardPage: React.FC = () => {
  const { leaderboard, currentUser, navigateTo, globalSearchQuery, selectedItemId } = useApp();

  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'all_time'>('weekly');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [localSearch, setLocalSearch] = useState('');

  const effectiveSearch = (localSearch || globalSearchQuery || '').trim().toLowerCase();

  const filteredLeaderboard = leaderboard.filter((student) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      student.branch.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (student.badgesAwarded && student.badgesAwarded.some((b) => b.toLowerCase().includes(selectedCategory.toLowerCase())));

    if (!effectiveSearch) return matchesCategory;

    const name = student.name || '';
    const college = student.college || '';
    const branch = student.branch || '';
    const badges = student.badgesAwarded || [];

    const matchesSearch =
      name.toLowerCase().includes(effectiveSearch) ||
      college.toLowerCase().includes(effectiveSearch) ||
      branch.toLowerCase().includes(effectiveSearch) ||
      badges.some((b) => b.toLowerCase().includes(effectiveSearch));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-amber-200/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 flex items-center gap-1.5 backdrop-blur-xs">
              <Award className="w-3.5 h-3.5 text-amber-200" />
              Verified Campus Rankings
            </span>
            <span className="text-xs text-amber-100 font-semibold">Merit & Contribution Based</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
            Campus Ecosystem Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 mt-1 max-w-xl">
            Rankings reflect verified student gig completions, peer mentorship ratings, competition wins, and verified certifications.
          </p>
        </div>

        {/* Weekly Prize Pool Pill */}
        <div className="bg-black/20 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center shadow-inner">
          <p className="text-[11px] text-amber-200 font-bold uppercase tracking-wider">Weekly Leaderboard Rewards</p>
          <p className="text-xl font-black text-white font-display mt-0.5">
            🎟️ 150 Mentor Coupons Distributed
          </p>
          <p className="text-[10px] text-amber-100 mt-0.5 font-medium">Top 10 receive verified badges & perks</p>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm">
        <div className="flex items-center gap-3 w-full sm:w-80 bg-indigo-50/70 px-3.5 py-2 rounded-xl border border-indigo-100">
          <Search className="w-4 h-4 text-indigo-500" />
          <input
            type="text"
            placeholder="Search students, colleges, branches..."
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
          {['All', 'AI & Data', 'Computer Science', 'Design', 'Electronics'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {filteredLeaderboard.length >= 3 && !effectiveSearch && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {filteredLeaderboard.slice(0, 3).map((student, idx) => {
            const podiumColor =
              idx === 0
                ? 'border-amber-300 bg-amber-50/70 shadow-xl shadow-amber-100/50'
                : idx === 1
                ? 'border-indigo-100 bg-white shadow-xl shadow-indigo-100/50'
                : 'border-indigo-100 bg-white shadow-xl shadow-indigo-100/50';
            const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';

            return (
              <div
                key={student.id}
                onClick={() => navigateTo('profile', student.userId)}
                className={`p-6 rounded-3xl border-2 transition cursor-pointer hover:scale-[1.02] flex flex-col justify-between ${podiumColor}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{medal}</span>
                    <span className="font-black text-xs bg-white px-3 py-1 rounded-full border border-indigo-100 shadow-xs text-slate-800">
                      Rank #{student.rank}
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
                    />
                    <div>
                      <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-1">
                        {student.name}
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">{student.college}</p>
                      <p className="text-[11px] text-indigo-600 font-bold">{student.branch}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 bg-white rounded-2xl text-center text-xs mb-3 border border-indigo-50 shadow-xs">
                    <div>
                      <span className="font-black text-indigo-700 text-sm">{student.points}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">XP Points</span>
                    </div>
                    <div>
                      <span className="font-black text-emerald-700 text-sm">{student.completedGigs}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Gigs Done</span>
                    </div>
                    <div>
                      <span className="font-black text-amber-700 text-sm">{student.mentoredCount}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Mentored</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {student.badgesAwarded?.[0] || '🏆 Top Contributor'}
                  </span>
                  <span className="text-indigo-600 font-bold flex items-center gap-1 hover:text-indigo-800">
                    View Profile <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Timeframe Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-indigo-100 shadow-xl shadow-indigo-100/40">
        <div className="flex items-center gap-2">
          {[
            { id: 'weekly', label: 'This Week' },
            { id: 'monthly', label: 'This Month' },
            { id: 'all_time', label: 'All-Time Champions' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeframe(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                timeframe === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-indigo-50/50 text-slate-600 hover:bg-indigo-50 border border-indigo-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-semibold">
          Showing {filteredLeaderboard.length} ranked campus contributors
        </span>
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-100/50 overflow-hidden">
        {filteredLeaderboard.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <p className="font-bold text-slate-800 text-sm">No leaderboard entries match "{effectiveSearch}"</p>
            <p className="text-xs text-slate-500">Try searching for a student's name, college name, or branch.</p>
            <button
              onClick={() => {
                setLocalSearch('');
                setSelectedCategory('All');
              }}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
            >
              Clear Filter
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-indigo-50/60 text-slate-600 uppercase tracking-wider font-bold border-b border-indigo-100">
                <tr>
                  <th className="py-4 px-6">Rank</th>
                  <th className="py-4 px-6">Student</th>
                  <th className="py-4 px-6">College</th>
                  <th className="py-4 px-6 text-center">Reputation</th>
                  <th className="py-4 px-6 text-center">Gigs Completed</th>
                  <th className="py-4 px-6 text-center">Mentored</th>
                  <th className="py-4 px-6 text-right">Ecosystem Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-50">
                {filteredLeaderboard.map((student) => {
                  const isCurrent = student.userId === currentUser.id;
                  const isSelected = selectedItemId === student.userId || selectedItemId === student.id;
                  return (
                    <tr
                      key={student.id}
                      onClick={() => navigateTo('profile', student.userId)}
                      className={`hover:bg-indigo-50/40 transition cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-100/80 font-bold ring-2 ring-indigo-500 ring-inset'
                          : isCurrent
                          ? 'bg-indigo-50/60 font-semibold'
                          : ''
                      }`}
                    >
                      <td className="py-4 px-6 font-black text-slate-700 text-sm">
                        {student.rank === 1 ? '🥇 #1' : student.rank === 2 ? '🥈 #2' : student.rank === 3 ? '🥉 #3' : `#${student.rank}`}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100 shadow-xs"
                          />
                          <div>
                            <span className="font-bold text-slate-900 flex items-center gap-1">
                              {student.name}
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium">{student.branch}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-600 font-semibold">
                        {student.college}
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-indigo-700">
                        🛡️ {student.reputationScore}
                      </td>
                      <td className="py-4 px-6 text-center text-slate-700 font-bold">
                        {student.completedGigs} gigs
                      </td>
                      <td className="py-4 px-6 text-center text-slate-700 font-bold">
                        👥 {student.mentoredCount} helped
                      </td>
                      <td className="py-4 px-6 text-right font-black text-indigo-950 font-mono text-sm">
                        {student.points.toLocaleString()} XP
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
