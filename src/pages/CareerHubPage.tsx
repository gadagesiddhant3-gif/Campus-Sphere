import React, { useState } from 'react';
import {
  Zap,
  Building2,
  CheckCircle2,
  MapPin,
  Clock,
  IndianRupee,
  Briefcase,
  Search,
  Filter,
  Send,
  ExternalLink,
  ShieldCheck,
  Star,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CareerHubPage: React.FC = () => {
  const {
    internships,
    applyToInternship,
    userInternshipApplications,
    currentUser,
    currentRole
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const filteredInternships = internships.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'All' || item.workType === selectedType;
    const matchesLocation = selectedLocation === 'All' || item.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-500/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              Tier-1 Verified Recruiter Pipeline
            </span>
            <span className="text-xs text-blue-200">Pre-Vetted Student Talent</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Career Hub & Student Internships
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-xl">
            Direct hiring channels for students with proven reputation, verified certificates, and completed campus gigs.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-xs space-y-1">
          <p className="font-bold text-white flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Direct Profile Referral Enabled</span>
          </p>
          <p className="text-blue-200 text-[11px]">
            Your verified reputation ({currentUser.reputationScore}/100) is automatically attached to applications.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search internships by role, company, or tech stack (e.g. AI, VLSI, Robotics, React)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition"
          />
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium"
        >
          <option value="All">All Work Types</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="On-site">On-site</option>
        </select>

        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium"
        >
          <option value="All">All Locations</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Pune">Pune</option>
          <option value="Remote">Remote</option>
        </select>
      </div>

      {/* Internships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInternships.map((internship) => {
          const hasApplied = userInternshipApplications.includes(internship.id);
          return (
            <div
              key={internship.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={internship.companyLogo}
                      alt={internship.companyName}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
                    />
                    <div>
                      <h3 className="font-display font-bold text-base text-slate-900 leading-snug">
                        {internship.title}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="font-semibold text-xs text-slate-700">
                          {internship.companyName}
                        </span>
                        {internship.isVerifiedRecruiter && (
                          <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Verified Partner
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                    {internship.workType}
                  </span>
                </div>

                {/* Key Details pill row */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl text-xs mb-4">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Stipend</span>
                    <span className="font-bold text-emerald-700">{internship.stipend}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Duration</span>
                    <span className="font-semibold text-slate-800">{internship.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Location</span>
                    <span className="font-semibold text-slate-800 truncate block">
                      {internship.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {internship.description}
                </p>

                {/* Eligibility criteria */}
                <div className="mt-3 p-2.5 bg-indigo-50/50 rounded-xl text-[11px] text-indigo-950 space-y-0.5">
                  <span className="font-bold block">Eligibility:</span>
                  <p className="text-slate-600">{internship.eligibility}</p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {internship.requiredSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  👥 {internship.applicantsCount} Applicants
                </span>

                <button
                  onClick={() => applyToInternship(internship.id)}
                  disabled={hasApplied}
                  className={`px-5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                    hasApplied
                      ? 'bg-emerald-100 text-emerald-800 cursor-default'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                  }`}
                >
                  {hasApplied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Applied with Verified Profile</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>1-Click Apply</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
