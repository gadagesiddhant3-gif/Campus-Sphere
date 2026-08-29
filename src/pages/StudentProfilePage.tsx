import React, { useState } from 'react';
import {
  User,
  CheckCircle2,
  ShieldCheck,
  Award,
  BookOpen,
  Star,
  ExternalLink,
  PlusCircle,
  Briefcase,
  Layers,
  Calendar,
  IndianRupee,
  Github,
  Globe,
  Sparkles,
  Edit3,
  X,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserProfile, Certificate, PortfolioItem, SkillJourneyItem } from '../types';

export const StudentProfilePage: React.FC = () => {
  const {
    currentUser,
    availableUsers,
    addCertificate,
    addPortfolioProject,
    addSkillJourneyMilestone,
    navigateTo,
    selectedItemId
  } = useApp();

  // If a specific student was selected, show them, otherwise show current user
  const displayUser: UserProfile =
    availableUsers.find((u) => u.id === selectedItemId) || currentUser;

  const isOwnProfile = displayUser.id === currentUser.id;

  const [activeTab, setActiveTab] = useState<'journey' | 'portfolio' | 'certs' | 'reviews' | 'skills'>('journey');

  // Modals
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [milestoneModalOpen, setMilestoneModalOpen] = useState(false);

  // Cert form
  const [certName, setCertName] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certSkill, setCertSkill] = useState('Full-Stack Web Development');
  const [certYear, setCertYear] = useState('2025');
  const [certUrl, setCertUrl] = useState('https://coursera.org/verify/CAMPUS-DEMO-991');

  // Portfolio form
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projSkill, setProjSkill] = useState('React.js');
  const [projUrl, setProjUrl] = useState('https://github.com/campus-gig/demo-app');

  // Milestone form
  const [mileTitle, setMileTitle] = useState('');
  const [mileSkill, setMileSkill] = useState('React.js');
  const [mileDate, setMileDate] = useState('Jan 2026');
  const [mileDesc, setMileDesc] = useState('');

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certName || !certIssuer) return;
    addCertificate({
      courseName: certName,
      skill: certSkill,
      issuingOrg: certIssuer,
      startDate: '2024-06-01',
      endDate: '2024-12-01',
      issueDate: certYear,
      credentialId: `CERT-${Date.now().toString().slice(-6)}`,
      verificationLink: certUrl,
      isVerified: true
    });
    setCertModalOpen(false);
    setCertName('');
    setCertIssuer('');
  };

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projDesc) return;
    addPortfolioProject({
      title: projTitle,
      description: projDesc,
      skillUsed: projSkill,
      date: 'Feb 2026',
      link: projUrl,
      githubUrl: projUrl,
      mediaType: 'code',
      category: 'Web App',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80'
    });
    setPortfolioModalOpen(false);
    setProjTitle('');
    setProjDesc('');
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mileTitle || !mileDesc) return;
    addSkillJourneyMilestone(mileSkill, {
      skillName: mileSkill,
      monthYear: mileDate,
      title: mileTitle,
      description: mileDesc,
      type: 'project'
    });
    setMilestoneModalOpen(false);
    setMileTitle('');
    setMileDesc('');
  };

  const allMilestones = Object.values(displayUser.skillJourneys || {}).flat();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-xl shadow-indigo-100/50 relative overflow-hidden">
        {/* Gradient Top Strip */}
        <div className="h-28 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 relative mb-6"></div>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 relative">
          
          {/* Avatar & User Details */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <img
              src={displayUser.avatar}
              alt={displayUser.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-xl -mt-16 bg-white flex-shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-800">
                  {displayUser.name}
                </h1>
                {displayUser.isVerifiedStudent && (
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-xl border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ✓ Verified Student
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-bold">
                {displayUser.college} • {displayUser.branch} ({displayUser.year})
              </p>
              <p className="text-xs text-slate-500 max-w-xl pt-1 leading-relaxed">
                {displayUser.bio}
              </p>
            </div>
          </div>

          {/* Reputation Gauge & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            <div
              onClick={() => navigateTo('reputation')}
              className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center gap-3 cursor-pointer hover:bg-indigo-100/70 transition w-full sm:w-auto justify-between shadow-xs"
            >
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-indigo-700">
                  Reputation Score
                </p>
                <p className="text-xl font-black text-indigo-950 font-display">
                  {displayUser.reputationScore}
                  <span className="text-xs text-indigo-600 font-bold"> / 100</span>
                </p>
              </div>
              <ShieldCheck className="w-6 h-6 text-indigo-600" />
            </div>

            {isOwnProfile ? (
              <button
                onClick={() => navigateTo('settings')}
                className="px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold rounded-2xl border border-indigo-200 transition flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <button
                onClick={() => navigateTo('mentors')}
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-2xl shadow-lg shadow-indigo-200 transition flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Book Mentorship (🎟️ 1 Coupon)</span>
              </button>
            )}
          </div>

        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 text-[11px] font-bold block uppercase tracking-wider">Completed Gigs</span>
            <span className="font-extrabold text-sm text-slate-800">{displayUser.completedGigsCount || 0} Gigs</span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] font-bold block uppercase tracking-wider">Students Mentored</span>
            <span className="font-extrabold text-sm text-slate-800">👥 {displayUser.studentsMentoredCount || 0} Peers</span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] font-bold block uppercase tracking-wider">Student Rating</span>
            <span className="font-extrabold text-sm text-amber-600">⭐ {displayUser.rating || 4.9} / 5.0</span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] font-bold block uppercase tracking-wider">Coupons Balance</span>
            <span className="font-extrabold text-sm text-indigo-700">🎟️ {displayUser.couponsBalance || 4} Coupons</span>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-indigo-100 pb-2 overflow-x-auto">
        {[
          { id: 'journey', label: `Skill Journey Timeline (${allMilestones.length})`, icon: Calendar },
          { id: 'portfolio', label: `Portfolio Projects (${displayUser.portfolio.length})`, icon: Briefcase },
          { id: 'certs', label: `Verified Certifications (${displayUser.certificates.length})`, icon: Award },
          { id: 'skills', label: `Skills & Levels (${displayUser.skills.length})`, icon: Layers },
          { id: 'reviews', label: `Verified Reviews (${displayUser.reviews.length})`, icon: Star }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 border border-indigo-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content: Skill Journey Timeline */}
      {activeTab === 'journey' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Verified Skill Journey & Milestones
              </h3>
              <p className="text-xs text-slate-500">
                A progressive record of projects, completed gigs, and learning achievements
              </p>
            </div>
            {isOwnProfile && (
              <button
                onClick={() => setMilestoneModalOpen(true)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Milestone</span>
              </button>
            )}
          </div>

          <div className="relative border-l-2 border-indigo-200 ml-4 space-y-8 py-2">
            {allMilestones.map((item) => (
              <div key={item.id} className="relative pl-6">
                {/* Node indicator */}
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white shadow-xs"></div>
                <div className="bg-slate-50 hover:bg-slate-100/80 p-4 rounded-2xl border border-slate-200 transition">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-indigo-700">{item.title}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{item.monthYear}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-semibold bg-indigo-100/70 text-indigo-800 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Skill: {item.skillName}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Portfolio Projects */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Showcase & Work Samples
              </h3>
              <p className="text-xs text-slate-500">
                Real codebases, design files, and working demos
              </p>
            </div>
            {isOwnProfile && (
              <button
                onClick={() => setPortfolioModalOpen(true)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayUser.portfolio.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                {proj.imageUrl && (
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-full h-40 object-cover border-b border-slate-100"
                  />
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display font-bold text-base text-slate-900">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {proj.skillUsed}
                      </span>
                    </div>
                  </div>

                  {proj.link && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:underline font-bold flex items-center gap-1"
                      >
                        <span>View Project Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Verified Certifications */}
      {activeTab === 'certs' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Verified Student Certifications
              </h3>
              <p className="text-xs text-slate-500">
                All certificates are cryptographically or URL verified to prevent fake credentials
              </p>
            </div>
            {isOwnProfile && (
              <button
                onClick={() => setCertModalOpen(true)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Upload Certificate</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayUser.certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-slate-900">{cert.courseName}</h4>
                      {cert.isVerified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {cert.issuingOrg} • Issued {cert.issueDate}
                    </p>
                    {cert.verificationLink && (
                      <a
                        href={cert.verificationLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-indigo-600 hover:underline font-semibold flex items-center gap-1 mt-2"
                      >
                        <span>Verify Credential Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified ✓
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Skills */}
      {activeTab === 'skills' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Skills, Proficiency & Mentoring Status
              </h3>
              <p className="text-xs text-slate-500">
                Selected from the 100-skill campus taxonomy
              </p>
            </div>
            {isOwnProfile && (
              <button
                onClick={() => navigateTo('onboarding')}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
              >
                Manage 100 Skills
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayUser.skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">{skill.name}</span>
                  <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                    {skill.level}
                  </span>
                </div>
                <div className="text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-200">
                  <span>Mentoring:</span>
                  <span className={`font-semibold ${skill.willingToMentor ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {skill.willingToMentor ? `Yes (${skill.availability || 'Weekends'})` : 'Not available'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Verified Reviews */}
      {activeTab === 'reviews' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900">
              Verified Peer Reviews & Feedback
            </h3>
            <p className="text-xs text-slate-500">
              Reviews can only be submitted after a verified gig or completed 1-on-1 mentorship session.
            </p>
          </div>

          <div className="space-y-4">
            {displayUser.reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={review.studentAvatar}
                      alt={review.studentName}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div>
                      <span className="font-bold text-xs text-slate-900 block leading-tight">
                        {review.studentName}
                      </span>
                      <span className="text-[10px] text-slate-400">{review.studentCollege}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    {'⭐'.repeat(review.rating)}
                    <span className="text-slate-400 text-[10px] ml-1">{review.date}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 italic">"{review.comment}"</p>

                <div className="flex items-center gap-2 text-[10px] text-emerald-700 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Peer Interaction ✓ ({review.skill})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Certificate Modal */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-base text-slate-900">
                Add Verified Certification
              </h3>
              <button onClick={() => setCertModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCert} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Certificate Course Title</label>
                <input
                  type="text"
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                  placeholder="e.g. Deep Learning Specialization"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Associated Skill</label>
                <input
                  type="text"
                  value={certSkill}
                  onChange={(e) => setCertSkill(e.target.value)}
                  placeholder="e.g. Python / Neural Networks"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Issuing Organization</label>
                <input
                  type="text"
                  value={certIssuer}
                  onChange={(e) => setCertIssuer(e.target.value)}
                  placeholder="e.g. DeepLearning.AI / Coursera / AWS"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Issue Year</label>
                  <input
                    type="text"
                    value={certYear}
                    onChange={(e) => setCertYear(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Verification Link</label>
                  <input
                    type="text"
                    value={certUrl}
                    onChange={(e) => setCertUrl(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCertModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold"
                >
                  Add & Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Portfolio Modal */}
      {portfolioModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-base text-slate-900">
                Add Project to Showcase
              </h3>
              <button onClick={() => setPortfolioModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPortfolio} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  placeholder="e.g. Autonomous Maze Solving Robot"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Skill Used</label>
                <input
                  type="text"
                  value={projSkill}
                  onChange={(e) => setProjSkill(e.target.value)}
                  placeholder="e.g. Embedded C++ / React"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  placeholder="What does it do? What technologies did you use?"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Demo / GitHub Link</label>
                <input
                  type="text"
                  value={projUrl}
                  onChange={(e) => setProjUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPortfolioModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Milestone Modal */}
      {milestoneModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-base text-slate-900">
                Add Skill Journey Milestone
              </h3>
              <button onClick={() => setMilestoneModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMilestone} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Milestone Title</label>
                  <input
                    type="text"
                    value={mileTitle}
                    onChange={(e) => setMileTitle(e.target.value)}
                    placeholder="e.g. Won 1st Prize Hackathon"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Skill Category</label>
                  <input
                    type="text"
                    value={mileSkill}
                    onChange={(e) => setMileSkill(e.target.value)}
                    placeholder="e.g. React.js"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Date</label>
                <input
                  type="text"
                  value={mileDate}
                  onChange={(e) => setMileDate(e.target.value)}
                  placeholder="e.g. Feb 2026"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={mileDesc}
                  onChange={(e) => setMileDesc(e.target.value)}
                  placeholder="Details of what you built, learned, or achieved..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMilestoneModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
