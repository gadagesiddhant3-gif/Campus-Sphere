import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Clock,
  Ticket,
  CheckCircle2,
  Users,
  Code2,
  Send,
  ExternalLink,
  Flame,
  X,
  FileCode,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Competition } from '../types';

export const CompetitionsPage: React.FC = () => {
  const {
    competitions,
    submitCompetitionProject,
    userCompetitionSubmissions,
    currentUser,
    selectedItemId,
    globalSearchQuery
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [submitModalComp, setSubmitModalComp] = useState<Competition | null>(null);
  const [githubUrl, setGithubUrl] = useState('https://github.com/rahul-sharma/campus-challenge-solution');
  const [demoUrl, setDemoUrl] = useState('https://campus-demo.vercel.app');
  const [submissionNotes, setSubmissionNotes] = useState('Implemented complete modular pipeline with 98% test coverage, comprehensive README, and benchmark scripts.');

  const effectiveSearch = (localSearch || globalSearchQuery || '').trim().toLowerCase();

  const filteredCompetitions = competitions.filter((comp) => {
    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Active' && (comp.status?.toLowerCase().includes('active') || comp.status?.toLowerCase().includes('live'))) ||
      (selectedStatus === 'Submitted' && userCompetitionSubmissions.includes(comp.id));

    if (!effectiveSearch) return matchesStatus;

    const title = comp.title || '';
    const desc = comp.description || '';
    const cat = comp.skillCategory || comp.category || '';
    const tags = comp.tags || [];

    const matchesSearch =
      title.toLowerCase().includes(effectiveSearch) ||
      desc.toLowerCase().includes(effectiveSearch) ||
      cat.toLowerCase().includes(effectiveSearch) ||
      tags.some((t) => t.toLowerCase().includes(effectiveSearch));

    return matchesStatus && matchesSearch;
  });

  const handleOpenSubmit = (comp: Competition) => {
    setSubmitModalComp(comp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitModalComp) return;
    submitCompetitionProject(submitModalComp.id, githubUrl, demoUrl, submissionNotes);
    setSubmitModalComp(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              Weekly Skill Challenges
            </span>
            <span className="text-xs text-orange-100">Nationwide Campus Hackathons</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Campus Skill Competitions
          </h1>
          <p className="text-xs sm:text-sm text-orange-100 mt-1 max-w-xl">
            Test your skills under realistic constraints. Win cash bounties, virtual mentor coupons, verified badges, and recruiter attention.
          </p>
        </div>

        <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
          <p className="text-[11px] text-orange-200">Total Monthly Prize Pool</p>
          <p className="text-2xl font-extrabold text-amber-300 font-display">₹75,000 + 500 Coupons</p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm">
        <div className="flex items-center gap-3 w-full sm:w-80 bg-indigo-50/70 px-3.5 py-2 rounded-xl border border-indigo-100">
          <Search className="w-4 h-4 text-indigo-500" />
          <input
            type="text"
            placeholder="Search competitions, categories, prizes..."
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
          {['All', 'Active', 'Submitted'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedStatus === status
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {status === 'Submitted' ? `My Submissions (${userCompetitionSubmissions.length})` : status}
            </button>
          ))}
        </div>
      </div>

      {/* Competitions Grid */}
      {filteredCompetitions.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-dashed border-indigo-200 text-center space-y-2">
          <p className="font-bold text-slate-800 text-base">No competitions match your search query.</p>
          <p className="text-xs text-slate-500">Try searching for terms like "AI", "Frontend", "IoT", or clear your filter.</p>
          <button
            onClick={() => {
              setLocalSearch('');
              setSelectedStatus('All');
            }}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCompetitions.map((comp) => {
            const hasSubmitted = userCompetitionSubmissions.includes(comp.id);
            const isHighlighted = selectedItemId === comp.id;
            return (
              <div
                key={comp.id}
                className={`bg-white rounded-3xl border shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between ${
                  isHighlighted ? 'ring-2 ring-indigo-500 border-indigo-500' : 'border-slate-200'
                }`}
              >
                <div className="p-6 space-y-4">
                  
                  {/* Header info */}
                  <div className="flex items-center justify-between">
                    <span className="bg-rose-50 text-rose-700 text-xs font-bold px-3 py-1 rounded-full border border-rose-200 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-rose-600" />
                      {comp.status}
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Ends in {comp.deadline}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-900 leading-snug">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {comp.description}
                  </p>

                  {/* Skill tag */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Required Skillset:
                    </span>
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg border border-indigo-100">
                      {comp.skillCategory || comp.category}
                    </span>
                  </div>

                  {/* Prize Breakdown Box */}
                  <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-2 text-xs">
                    <p className="font-bold text-amber-900 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-600" />
                      <span>Prizes & Leaderboard Bounties:</span>
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-[11px]">
                      <div className="p-2 bg-white/80 rounded-xl border border-amber-200">
                        <span className="font-bold text-amber-800 block">🥇 1st Place</span>
                        <span className="text-slate-700">{comp.prizes?.first || '₹10,000'}</span>
                      </div>
                      <div className="p-2 bg-white/80 rounded-xl border border-amber-200">
                        <span className="font-bold text-slate-700 block">🥈 2nd Place</span>
                        <span className="text-slate-700">{comp.prizes?.second || '₹5,000'}</span>
                      </div>
                      <div className="p-2 bg-white/80 rounded-xl border border-amber-200">
                        <span className="font-bold text-amber-700 block">🥉 3rd Place</span>
                        <span className="text-slate-700">{comp.prizes?.third || '₹2,500'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rules & Guidelines */}
                  {comp.rules && comp.rules.length > 0 && (
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-slate-700 block">Evaluation Criteria:</span>
                      <ul className="space-y-0.5 text-slate-600 text-[11px] list-disc list-inside">
                        {comp.rules.map((rule, idx) => (
                          <li key={idx}>{rule}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>

                {/* Action footer */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {comp.participantsCount} Students Competing
                  </span>

                  <button
                    onClick={() => handleOpenSubmit(comp)}
                    className={`px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                      hasSubmitted
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                    }`}
                  >
                    {hasSubmitted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Project Submitted ✓</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Solution</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Project Submission Modal */}
      {submitModalComp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="bg-amber-50 text-amber-700 p-2 rounded-xl">
                  <Trophy className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">
                    Submit Challenge Project
                  </h3>
                  <p className="text-[11px] text-slate-500">{submitModalComp.title}</p>
                </div>
              </div>
              <button onClick={() => setSubmitModalComp(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">GitHub / Code Repository URL</label>
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Live Demo / Video Demonstration URL</label>
                <input
                  type="text"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Architecture & Implementation Summary</label>
                <textarea
                  rows={3}
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Explain algorithms used, performance benchmarks, and any special features..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-[11px] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Submitted under: {currentUser.name} ({currentUser.college})</span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSubmitModalComp(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md"
                >
                  Confirm & Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
