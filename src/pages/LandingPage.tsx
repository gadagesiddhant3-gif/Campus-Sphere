import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  Users,
  Trophy,
  Award,
  Zap,
  TrendingUp,
  Ticket,
  GraduationCap,
  Star,
  Search,
  Code2,
  Cpu,
  Palette,
  Bot,
  Flame,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SKILL_CATEGORIES } from '../data/skillsData';

export const LandingPage: React.FC = () => {
  const { navigateTo, gigs, mentors, competitions, runDemoStep } = useApp();

  const coreLoopSteps = [
    { title: 'Discover', desc: 'Find campus gigs & peers', icon: '🔍' },
    { title: 'Learn', desc: 'Book peer mentorship', icon: '📚' },
    { title: 'Showcase', desc: 'Portfolio & certs', icon: '🎨' },
    { title: 'Help', desc: 'Mentor junior students', icon: '🤝' },
    { title: 'Earn', desc: 'Paid student gigs (₹)', icon: '💰' },
    { title: 'Reputation', desc: 'Verified trust score', icon: '🛡️' },
    { title: 'Compete', desc: 'Weekly challenges', icon: '🏆' },
    { title: 'Careers', desc: 'Tier-1 internships', icon: '💼' }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-indigo-100/60 via-indigo-50/40 to-transparent border-b border-indigo-100">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-violet-400/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Top Pill */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white border border-indigo-200 text-indigo-800 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm shadow-indigo-100">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>The Digital Campus Ecosystem</span>
              <span className="text-indigo-400">•</span>
              <span className="text-indigo-600 font-extrabold">100+ Searchable Skills</span>
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-slate-800 tracking-tight leading-[1.1]">
              Your Skills. Your Campus.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800">
                Your Opportunities.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Discover gigs, showcase your skills, find mentors, build your reputation, compete, connect with recruiters, and discover internships — all in one trusted student ecosystem.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigateTo('explore')}
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-200 transition flex items-center gap-2"
              >
                <span>Explore Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('verify_email')}
                className="px-6 py-3.5 bg-white hover:bg-indigo-50/50 border-2 border-indigo-100 text-slate-800 font-bold text-sm rounded-2xl shadow-sm transition flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Join Campus Sphere (Verify Email)</span>
              </button>

              <button
                onClick={() => runDemoStep(1)}
                className="px-5 py-3.5 bg-amber-100 hover:bg-amber-200 border border-amber-200 text-amber-800 font-bold text-sm rounded-2xl transition flex items-center gap-2 shadow-xs"
              >
                <span className="text-base">🎟️</span>
                <span>Start Interactive Tour (15 Steps)</span>
              </button>
            </div>

            {/* Campus Trust Stats Bar */}
            <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="p-4 bg-white rounded-3xl border border-indigo-100 text-center shadow-xl shadow-indigo-100/50">
                <p className="text-2xl sm:text-3xl font-black text-indigo-600 font-display">4,280+</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Verified Students</p>
              </div>
              <div className="p-4 bg-white rounded-3xl border border-indigo-100 text-center shadow-xl shadow-indigo-100/50">
                <p className="text-2xl sm:text-3xl font-black text-slate-800 font-display">1,240+</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Gigs Posted</p>
              </div>
              <div className="p-4 bg-white rounded-3xl border border-indigo-100 text-center shadow-xl shadow-indigo-100/50">
                <p className="text-2xl sm:text-3xl font-black text-emerald-600 font-display">₹8.7 Lakh+</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Student Earnings</p>
              </div>
              <div className="p-4 bg-white rounded-3xl border border-indigo-100 text-center shadow-xl shadow-indigo-100/50">
                <p className="text-2xl sm:text-3xl font-black text-violet-600 font-display">100 Skills</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Taxonomy</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* The Core Campus Loop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
            The Complete Student Ecosystem Loop
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Campus Sphere interconnects learning, peer freelancing, verified reputation, and tier-1 career outcomes.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {coreLoopSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-300 transition text-center group cursor-pointer"
              onClick={() => runDemoStep(idx + 1)}
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center text-lg mb-2 transition">
                {step.icon}
              </div>
              <p className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition">
                {step.title}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 Core Functional Modules (Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Ecosystem Features
          </span>
          <h2 className="text-3xl font-display font-extrabold text-slate-900 mt-3">
            Designed for How Students Actually Learn & Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Find Gigs */}
          <div
            onClick={() => navigateTo('gigs')}
            className="bg-white p-6 rounded-3xl border border-indigo-100/80 hover:border-indigo-400 shadow-xl shadow-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-200/50 transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition">
                Find Gigs & Earn Income
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Turn your skills into real money. Work on college fest aftermovies, Python scripts, PCB design, Figma prototypes, and research assistance.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>Explore 1,240+ Gigs</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 2: Find Talent */}
          <div
            onClick={() => navigateTo('post_gig')}
            className="bg-white p-6 rounded-3xl border border-indigo-100/80 hover:border-indigo-400 shadow-xl shadow-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-200/50 transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition">
                Find Reliable Student Talent
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Post what you need help with. Every student is authenticated with an institutional email, portfolio, verified certificates, and peer reviews.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>Post a Gig in 60s</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 3: Build Reputation */}
          <div
            onClick={() => navigateTo('reputation')}
            className="bg-white p-6 rounded-3xl border border-indigo-100/80 hover:border-indigo-400 shadow-xl shadow-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-200/50 transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition">
                Build Progressive Reputation
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                "Trust is earned, not claimed." Build credibility through verified student ID, skill journeys, certifications, completed gigs, and peer reviews.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>View Trust Ladder (0-100)</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 4: Find Mentors */}
          <div
            onClick={() => navigateTo('mentors')}
            className="bg-white p-6 rounded-3xl border border-indigo-100/80 hover:border-indigo-400 shadow-xl shadow-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-200/50 transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition">
                1-on-1 Peer Mentors
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Connect with experienced senior students for code reviews, VLSI lab guidance, and portfolio critiques using virtual Mentor Coupons (🎟️).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>Browse 450+ Verified Mentors</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 5: Discover Careers */}
          <div
            onClick={() => navigateTo('career')}
            className="bg-white p-6 rounded-3xl border border-indigo-100/80 hover:border-indigo-400 shadow-xl shadow-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-200/50 transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition">
                Career Hub & Internships
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Direct hiring pipeline from verified recruiters at startups, MNCs, and research labs seeking proven student talent (stipends ₹35,000–₹50,000/mo).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>View Verified Openings</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 6: Join Communities */}
          <div
            onClick={() => navigateTo('communities')}
            className="bg-white p-6 rounded-3xl border border-indigo-100/80 hover:border-indigo-400 shadow-xl shadow-indigo-100/50 hover:shadow-2xl hover:shadow-indigo-200/50 transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition">
                Campus Field Communities
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Join 10+ student tech domains: Programming, AI/ML, Cybersecurity, VLSI, Embedded Systems, Design, CAD, and Campus Startups.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>Explore Active Discussions</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

        </div>
      </section>

      {/* 100 Searchable Skills Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800">
                Extensive Skill Taxonomy
              </span>
              <h2 className="text-3xl font-display font-extrabold text-white mt-3">
                100 Searchable Student Skills
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                From full-stack web and generative AI to VLSI design, ANSYS CAD, ethical hacking, and video editing.
              </p>
            </div>
            <button
              onClick={() => navigateTo('onboarding')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 flex-shrink-0"
            >
              <span>Explore 100 Skills & Onboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => navigateTo('onboarding')}
                className="bg-slate-800/80 hover:bg-slate-800 p-4 rounded-2xl border border-slate-700 hover:border-indigo-500 transition cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-300">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                    Category
                  </span>
                </div>
                <h4 className="font-display font-bold text-sm text-white group-hover:text-indigo-400 transition">
                  {cat}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Click to view skills, mentors & gigs in this field →
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gigs & Mentors Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-display font-extrabold text-slate-900">
              Live Campus Gigs
            </h2>
            <p className="text-xs text-slate-500">Fresh peer opportunities posted by verified students</p>
          </div>
          <button
            onClick={() => navigateTo('gigs')}
            className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
          >
            <span>View All Gigs</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gigs.slice(0, 3).map((gig) => (
            <div
              key={gig.id}
              onClick={() => navigateTo('gigs')}
              className="bg-white p-6 rounded-3xl border border-indigo-100/80 hover:border-indigo-400 shadow-xl shadow-indigo-100/40 hover:shadow-2xl hover:shadow-indigo-200/50 transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl border border-emerald-200 text-sm">
                    ₹{gig.budget.toLocaleString()}
                  </span>
                  <span className="text-slate-500 text-xs font-semibold flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                    ⏱️ {gig.deadline}
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-slate-800 line-clamp-2 leading-snug">
                  {gig.title}
                </h4>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {gig.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {gig.requiredSkills.slice(0, 2).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-lg font-bold border border-indigo-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={gig.postedBy.avatar}
                    alt={gig.postedBy.name}
                    className="w-7 h-7 rounded-full object-cover border border-indigo-200"
                  />
                  <div className="text-[11px]">
                    <span className="font-bold text-slate-800 block leading-tight">
                      {gig.postedBy.name}
                    </span>
                    <span className="text-slate-400 text-[10px]">{gig.postedBy.college}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-white bg-indigo-600 px-3 py-1.5 rounded-xl shadow-xs hover:bg-indigo-700 transition">
                  Apply →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Mentors Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-display font-extrabold text-slate-900">
              Verified Student Mentors
            </h2>
            <p className="text-xs text-slate-500">
              Learn from experienced students who have built real projects and earned high ratings
            </p>
          </div>
          <button
            onClick={() => navigateTo('mentors')}
            className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
          >
            <span>Browse All Mentors</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mentors.slice(0, 3).map((mentor) => (
            <div
              key={mentor.id}
              onClick={() => navigateTo('mentors')}
              className="bg-white p-6 rounded-3xl border border-indigo-100/80 hover:border-indigo-400 shadow-xl shadow-indigo-100/40 hover:shadow-2xl hover:shadow-indigo-200/50 transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-100 shadow-xs"
                  />
                  <div>
                    <h4 className="font-display font-bold text-base text-slate-800 flex items-center gap-1">
                      {mentor.name}
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">{mentor.college} • {mentor.branch}</p>
                    <div className="flex items-center gap-2 mt-1 text-[11px]">
                      <span className="flex items-center gap-0.5 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {mentor.rating || 4.9}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-indigo-600 font-bold">
                        👥 {mentor.studentsMentoredCount} helped
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {mentor.bio}
                </p>

                <div className="mt-3.5 flex flex-wrap gap-1">
                  {mentor.skills.filter((s) => s.willingToMentor).map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-violet-50 text-violet-700 font-bold px-2.5 py-0.5 rounded-lg border border-violet-100"
                    >
                      {s.name} ({s.level})
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-amber-800 bg-amber-100 font-bold px-2.5 py-1 rounded-full text-[11px] border border-amber-200">
                  🎟️ 1 Coupon / Session
                </span>
                <span className="font-bold text-indigo-600 hover:text-indigo-800">
                  Request Mentorship →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-violet-800 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h3 className="text-3xl font-display font-extrabold text-white">
              Ready to Turn Your Campus Skills into Opportunities?
            </h3>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Authenticate with your college email in 30 seconds. Get your ✓ Verified Student badge, 4 free Mentor Coupons, and access to campus gigs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigateTo('verify_email')}
                className="px-6 py-3 bg-white text-indigo-900 font-extrabold text-xs rounded-xl shadow-md hover:bg-indigo-50 transition"
              >
                Verify College Email Now
              </button>
              <button
                onClick={() => navigateTo('onboarding')}
                className="px-6 py-3 bg-indigo-950/70 border border-indigo-400/40 text-white font-bold text-xs rounded-xl hover:bg-indigo-950 transition"
              >
                Select Your Skills & Interests
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
