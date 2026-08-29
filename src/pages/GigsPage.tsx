import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  PlusCircle,
  Clock,
  MapPin,
  CheckCircle2,
  Star,
  Send,
  X,
  IndianRupee,
  Layers,
  AlertCircle,
  User,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ALL_100_SKILLS, SKILL_CATEGORIES } from '../data/skillsData';
import { Gig, SkillCategory } from '../types';

export const GigsPage: React.FC = () => {
  const {
    gigs,
    postNewGig,
    applyToGig,
    userApplications,
    myPostedGigs,
    currentUser,
    navigateTo,
    selectedItemId,
    setSelectedItemId
  } = useApp();

  const [activeTab, setActiveTab] = useState<'explore' | 'my_posted' | 'my_applied'>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [budgetRange, setBudgetRange] = useState<string>('all');

  // Modals state
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [applyModalGig, setApplyModalGig] = useState<Gig | null>(null);
  const [detailsModalGig, setDetailsModalGig] = useState<Gig | null>(null);

  // Apply form state
  const [pitch, setPitch] = useState('');
  const [proposedBudget, setProposedBudget] = useState<number>(1000);
  const [portfolioLink, setPortfolioLink] = useState('');

  // Post form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<SkillCategory>('Software & Development');
  const [newSkills, setNewSkills] = useState<string[]>(['Web Development']);
  const [newBudget, setNewBudget] = useState<number>(1200);
  const [newDeadline, setNewDeadline] = useState('3 days');
  const [newLocationType, setNewLocationType] = useState<'Remote' | 'On-Campus'>('Remote');
  const [newCampusLocation, setNewCampusLocation] = useState('');
  const [newUrgency, setNewUrgency] = useState<'Low' | 'Medium' | 'High' | 'Urgent (24-48h)'>('Medium');

  // Filter logic
  const filteredGigs = gigs.filter((gig) => {
    const matchesSearch =
      gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || gig.category === selectedCategory;

    const matchesUrgency =
      selectedUrgency === 'All' || gig.urgency === selectedUrgency;

    const matchesLocation =
      selectedLocation === 'All' || gig.locationType === selectedLocation;

    let matchesBudget = true;
    if (budgetRange === 'under_1000') matchesBudget = gig.budget < 1000;
    if (budgetRange === '1000_2500') matchesBudget = gig.budget >= 1000 && gig.budget <= 2500;
    if (budgetRange === 'above_2500') matchesBudget = gig.budget > 2500;

    return matchesSearch && matchesCategory && matchesUrgency && matchesLocation && matchesBudget;
  });

  const handleOpenApplyModal = (gig: Gig) => {
    setApplyModalGig(gig);
    setProposedBudget(gig.budget);
    setPitch(`Hi ${gig.postedBy.name}, I am a ${currentUser.year} student at ${currentUser.college} with strong expertise in ${gig.requiredSkills.join(', ')}. I've delivered multiple similar projects and can get this done cleanly within ${gig.deadline}.`);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyModalGig) return;
    applyToGig(applyModalGig.id, pitch, proposedBudget);
    setApplyModalGig(null);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    postNewGig({
      title: newTitle,
      description: newDescription,
      category: newCategory,
      requiredSkills: newSkills,
      budget: newBudget,
      deadline: newDeadline,
      locationType: newLocationType,
      campusLocation: newLocationType === 'On-Campus' ? newCampusLocation || currentUser.college : undefined,
      urgency: newUrgency,
      tags: [...newSkills, newLocationType]
    });

    setPostModalOpen(false);
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
              Campus Gig Marketplace
            </span>
            <span className="text-xs text-slate-500 font-medium">100% Student Verified</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            Student Skill & Gig Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Earn money doing campus projects or hire vetted students with verified skills in Python, Video Editing, VLSI, Design & CAD.
          </p>
        </div>

        <button
          onClick={() => setPostModalOpen(true)}
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post a New Campus Gig</span>
        </button>
      </div>

      {/* Main Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('explore')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'explore'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Explore All Gigs ({gigs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('my_posted')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'my_posted'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>My Posted Gigs ({myPostedGigs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('my_applied')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'my_applied'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>My Applications ({userApplications.length})</span>
        </button>
      </div>

      {/* Explore Gigs View */}
      {activeTab === 'explore' && (
        <div className="space-y-6">
          
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            {/* Top Search */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search gigs by skill, keyword (e.g. Video Editing, Python, KiCad, Fest)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition"
                />
              </div>

              {/* Category selector */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium cursor-pointer"
              >
                <option value="All">All Categories</option>
                {SKILL_CATEGORIES.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Budget Range */}
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium cursor-pointer"
              >
                <option value="all">Any Budget</option>
                <option value="under_1000">Under ₹1,000</option>
                <option value="1000_2500">₹1,000 - ₹2,500</option>
                <option value="above_2500">₹2,500+</option>
              </select>

              {/* Urgency */}
              <select
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium cursor-pointer"
              >
                <option value="All">All Urgencies</option>
                <option value="Urgent (24-48h)">Urgent (24-48h)</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          {/* Gigs List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGigs.map((gig) => (
              <div
                key={gig.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-0.5">
                      <span>₹</span>
                      <span>{gig.budget.toLocaleString()}</span>
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        gig.urgency.includes('Urgent')
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      ⚡ {gig.urgency}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-sm text-slate-900 leading-snug">
                    {gig.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {gig.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {gig.requiredSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {gig.deadline}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {gig.locationType} {gig.campusLocation && `(${gig.campusLocation})`}
                    </span>
                  </div>
                </div>

                {/* Bottom Poster & Apply */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={gig.postedBy.avatar}
                      alt={gig.postedBy.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <div className="text-[11px] leading-tight">
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                        {gig.postedBy.name}
                        {gig.postedBy.isVerified && (
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        )}
                      </span>
                      <span className="text-[10px] text-slate-400">{gig.postedBy.college}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenApplyModal(gig)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
                    >
                      Apply (₹{gig.budget})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredGigs.length === 0 && (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-800">No matching gigs found</p>
              <p className="text-xs text-slate-500 mt-1">Try changing your search terms or category filter</p>
            </div>
          )}

        </div>
      )}

      {/* My Posted Gigs View */}
      {activeTab === 'my_posted' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-slate-900">
              Gigs Posted By You ({myPostedGigs.length})
            </h2>
            <button
              onClick={() => setPostModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post Another Gig</span>
            </button>
          </div>

          {myPostedGigs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myPostedGigs.map((gig) => (
                <div key={gig.id} className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg text-xs">
                      ₹{gig.budget.toLocaleString()}
                    </span>
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      Status: {gig.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{gig.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{gig.description}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>Deadline: {gig.deadline}</span>
                    <span className="font-bold text-indigo-600">👥 {gig.applicantsCount} Applicants</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-sm font-semibold text-slate-700">You haven't posted any gigs yet.</p>
              <button
                onClick={() => setPostModalOpen(true)}
                className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Post Your First Campus Gig
              </button>
            </div>
          )}
        </div>
      )}

      {/* My Applications View */}
      {activeTab === 'my_applied' && (
        <div className="space-y-4">
          <h2 className="font-display font-bold text-lg text-slate-900">
            Your Active Gig Applications ({userApplications.length})
          </h2>
          {userApplications.length > 0 ? (
            <div className="space-y-3">
              {userApplications.map((app) => {
                const gig = gigs.find((g) => g.id === app.gigId);
                return (
                  <div key={app.id} className="p-4 bg-white rounded-2xl border border-slate-200 flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                        Status: {app.status}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 mt-1">
                        {gig ? gig.title : 'Campus Gig Application'}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 italic">"{app.pitch}"</p>
                      <p className="text-xs font-bold text-emerald-600 mt-2">
                        Proposed Budget: ₹{app.proposedBudget.toLocaleString()}
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-400 flex-shrink-0">{app.createdAt}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-sm font-semibold text-slate-700">You haven't applied to any gigs yet.</p>
              <button
                onClick={() => setActiveTab('explore')}
                className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Browse & Apply to Gigs
              </button>
            </div>
          )}
        </div>
      )}

      {/* Apply To Gig Modal */}
      {applyModalGig && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-50 text-indigo-700 p-2 rounded-xl">
                  <Send className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">
                    Apply for Campus Gig
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Client: {applyModalGig.postedBy.name} ({applyModalGig.postedBy.college})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setApplyModalGig(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
              <p className="font-bold text-slate-800">{applyModalGig.title}</p>
              <p className="text-slate-600">Client Budget: ₹{applyModalGig.budget} • Deadline: {applyModalGig.deadline}</p>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Your Pitch & Relevant Experience
                </label>
                <textarea
                  rows={4}
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  placeholder="Explain why you are the best fit, your past projects, and delivery timeline..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Proposed Budget (₹)
                  </label>
                  <input
                    type="number"
                    value={proposedBudget}
                    onChange={(e) => setProposedBudget(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-emerald-700"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Your Profile Verified
                  </label>
                  <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl font-semibold flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>✓ Verified Student ({currentUser.college})</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setApplyModalGig(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Gig Modal */}
      {postModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-50 text-indigo-700 p-2 rounded-xl">
                  <PlusCircle className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">
                    Post a New Campus Gig
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Reach 4,280+ verified students across engineering & design
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPostModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Gig Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Need a video editor for college fest aftermovie"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description & Requirements</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe the deliverables, timeline, raw files provided, and expected output..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as SkillCategory)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    {SKILL_CATEGORIES.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Required Skill</label>
                  <select
                    onChange={(e) => setNewSkills([e.target.value])}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    {ALL_100_SKILLS.slice(0, 30).map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Budget (₹)</label>
                  <input
                    type="number"
                    value={newBudget}
                    onChange={(e) => setNewBudget(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-emerald-700"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Deadline</label>
                  <input
                    type="text"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    placeholder="e.g. 2 days"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Urgency</label>
                  <select
                    value={newUrgency}
                    onChange={(e) => setNewUrgency(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Urgent (24-48h)">Urgent (24-48h)</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location Type</label>
                  <select
                    value={newLocationType}
                    onChange={(e) => setNewLocationType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Remote">Remote</option>
                    <option value="On-Campus">On-Campus</option>
                  </select>
                </div>
                {newLocationType === 'On-Campus' && (
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Campus Location</label>
                    <input
                      type="text"
                      value={newCampusLocation}
                      onChange={(e) => setNewCampusLocation(e.target.value)}
                      placeholder="e.g. IIT Bombay Tinkering Lab"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPostModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md"
                >
                  Publish Gig Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
