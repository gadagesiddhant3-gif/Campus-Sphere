import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  CheckCircle2,
  Star,
  Ticket,
  Clock,
  Filter,
  Calendar,
  Send,
  X,
  Award,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ALL_100_SKILLS } from '../data/skillsData';
import { UserProfile } from '../types';

export const MentorsPage: React.FC = () => {
  const {
    mentors,
    currentUser,
    requestMentorship,
    mentorshipRequests,
    completeMentorshipSession,
    navigateTo
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  
  // Modals state
  const [selectedMentor, setSelectedMentor] = useState<UserProfile | null>(null);
  const [requestSkill, setRequestSkill] = useState('');
  const [requestTopic, setRequestTopic] = useState('');
  const [requestTime, setRequestTime] = useState('Saturday 4:00 PM');
  
  // Review Modal State
  const [reviewRequestId, setReviewRequestId] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.skills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSkill =
      selectedSkill === 'All' ||
      mentor.skills.some((s) => s.willingToMentor && s.name.toLowerCase() === selectedSkill.toLowerCase());

    const matchesAvail =
      selectedAvailability === 'All' ||
      mentor.skills.some((s) => s.availability?.toLowerCase().includes(selectedAvailability.toLowerCase()));

    return matchesSearch && matchesSkill && matchesAvail;
  });

  const handleOpenRequest = (mentor: UserProfile) => {
    setSelectedMentor(mentor);
    const mentorSkills = mentor.skills.filter((s) => s.willingToMentor);
    setRequestSkill(mentorSkills.length > 0 ? mentorSkills[0].name : 'Python');
    setRequestTopic(`Hi ${mentor.name.split(' ')[0]}, I would like guidance on structuring my project and debugging coursework.`);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) return;
    const success = requestMentorship(selectedMentor.id, requestSkill, requestTopic, requestTime);
    if (success) {
      setSelectedMentor(null);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewRequestId) return;
    completeMentorshipSession(reviewRequestId, reviewRating, reviewComment);
    setReviewRequestId(null);
    setReviewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500/30 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full border border-indigo-400/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Verified Student Mentor Directory
            </span>
            <span className="text-xs text-indigo-200">100% Peer-to-Peer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Connect with Verified Campus Mentors
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-xl">
            Book 1-on-1 guidance from top seniors in Python, VLSI, CAD, UI/UX, AI & Cybersecurity using virtual Mentor Coupons (🎟️).
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <div>
            <p className="text-[11px] text-indigo-200">Your Coupon Balance</p>
            <p className="text-xl font-bold text-amber-300">🎟️ {currentUser.couponsBalance} Coupons</p>
          </div>
          <button
            onClick={() => navigateTo('coupons')}
            className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition"
          >
            + Earn More
          </button>
        </div>
      </div>

      {/* Active Mentorship Sessions tracker (if any) */}
      {mentorshipRequests.length > 0 && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>Your Mentorship Requests & Sessions ({mentorshipRequests.length})</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mentorshipRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded">
                      {req.skill}
                    </span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                        req.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-800 mt-2">Mentor: {req.mentorName}</p>
                  <p className="text-slate-600 mt-0.5 italic">"{req.topic}"</p>
                  <p className="text-slate-500 text-[11px] mt-1">Scheduled: {req.preferredTime}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">🎟️ 1 Coupon Used</span>
                  {req.status !== 'Completed' && (
                    <button
                      onClick={() => setReviewRequestId(req.id)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition"
                    >
                      Complete Session & Leave Review ⭐
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search mentor by name, college (e.g. IIT Bombay, NIT Trichy), or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition"
          />
        </div>

        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium"
        >
          <option value="All">All Mentoring Skills</option>
          {ALL_100_SKILLS.slice(0, 25).map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          value={selectedAvailability}
          onChange={(e) => setSelectedAvailability(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium"
        >
          <option value="All">Any Availability</option>
          <option value="Weekends">Weekends only</option>
          <option value="Evenings">Evenings only</option>
          <option value="available">Flexible / Always Available</option>
        </select>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => {
          const mentorSkills = mentor.skills.filter((s) => s.willingToMentor);
          return (
            <div
              key={mentor.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start gap-3.5 mb-4">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-200 shadow-xs"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-display font-bold text-base text-slate-900 truncate">
                        {mentor.name}
                      </h3>
                      {mentor.isVerifiedStudent && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate">{mentor.college}</p>
                    <p className="text-[11px] text-indigo-600 font-medium truncate">
                      {mentor.branch} • {mentor.year}
                    </p>
                  </div>
                </div>

                {/* Rating & Stats row */}
                <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-xl text-center text-xs mb-3">
                  <div>
                    <span className="font-extrabold text-amber-600 flex items-center justify-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {mentor.rating || 4.9}
                    </span>
                    <span className="text-[10px] text-slate-400 block">Rating</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-800">
                      {mentor.studentsMentoredCount}
                    </span>
                    <span className="text-[10px] text-slate-400 block">Helped</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-indigo-600">
                      {mentor.reputationScore}
                    </span>
                    <span className="text-[10px] text-slate-400 block">Reputation</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {mentor.bio}
                </p>

                {/* Skills available for mentoring */}
                <div className="mt-4 space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    Mentoring In:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {mentorSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-indigo-50 text-indigo-700 font-semibold px-2.5 py-0.5 rounded-lg border border-indigo-100"
                      >
                        {s.name} ({s.level})
                      </span>
                    ))}
                  </div>
                </div>

                {/* Badges preview */}
                <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-100">
                  {mentor.badges.slice(0, 3).map((b, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded-full border border-amber-200"
                      title={b.description}
                    >
                      {b.icon} {b.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium text-[11px]">
                  🎟️ 1 Mentor Coupon
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateTo('profile', mentor.id)}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
                  >
                    View Journey
                  </button>
                  <button
                    onClick={() => handleOpenRequest(mentor)}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition"
                  >
                    Request Mentorship
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Request Mentorship Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedMentor.avatar}
                  alt={selectedMentor.name}
                  className="w-10 h-10 rounded-full object-cover border border-indigo-200"
                />
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-1">
                    Book Mentorship with {selectedMentor.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {selectedMentor.college} • ⭐ {selectedMentor.rating || 4.9} ({selectedMentor.studentsMentoredCount} helped)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMentor(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Coupon Usage Banner */}
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-amber-900">1 Virtual Mentor Coupon will be deducted</span>
              </div>
              <span className="font-bold text-amber-800">Your Balance: {currentUser.couponsBalance}</span>
            </div>

            <form onSubmit={handleRequestSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Select Skill to Focus On
                </label>
                <select
                  value={requestSkill}
                  onChange={(e) => setRequestSkill(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold"
                >
                  {selectedMentor.skills
                    .filter((s) => s.willingToMentor)
                    .map((s, idx) => (
                      <option key={idx} value={s.name}>
                        {s.name} ({s.level} — {s.availability || 'Weekends'})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  What do you need help with? (Specific Questions / Repo / Project)
                </label>
                <textarea
                  rows={3}
                  value={requestTopic}
                  onChange={(e) => setRequestTopic(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Preferred Time Slot
                </label>
                <input
                  type="text"
                  value={requestTime}
                  onChange={(e) => setRequestTime(e.target.value)}
                  placeholder="e.g. Saturday 4:00 PM or Sunday Evening"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMentor(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md flex items-center gap-1.5"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Confirm & Use 1 Coupon</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Modal (Verified Review System) */}
      {reviewRequestId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="bg-amber-50 text-amber-600 p-2 rounded-xl">
                  <Star className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">
                    Verified Mentor Review
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    ✓ Verified Interaction (Connected to completed session)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setReviewRequestId(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Rating (1 to 5 Stars)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 text-2xl focus:outline-none transition transform hover:scale-110"
                    >
                      {star <= reviewRating ? '⭐' : '☆'}
                    </button>
                  ))}
                  <span className="font-bold text-slate-800 text-sm ml-2">{reviewRating}.0 / 5.0</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Detailed Feedback for Mentor
                </label>
                <textarea
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="How did this mentorship session help you? (e.g. Helped me understand async code, reviewed my GitHub repository, gave clear next steps...)"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
                  required
                />
              </div>

              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>This review will appear publicly with a "Verified Interaction ✓" badge.</span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReviewRequestId(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md"
                >
                  Submit Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
