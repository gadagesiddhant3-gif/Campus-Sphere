import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Ticket,
  Bell,
  Search,
  PlusCircle,
  Menu,
  X,
  CheckCircle2,
  ChevronDown,
  User,
  Briefcase,
  Users,
  Compass,
  Trophy,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Award,
  Layers,
  Settings,
  Gift,
  Zap,
  Sun,
  Moon,
  Laptop,
  Palette,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ThemeCustomizerModal, THEME_COLOR_PRESETS } from './ThemeCustomizerModal';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    setSelectedItemId,
    currentUser,
    switchUser,
    availableUsers,
    currentRole,
    setCurrentRole,
    notifications,
    unreadCount,
    markNotificationRead,
    markAllNotificationsRead,
    gigs,
    mentors,
    communities,
    competitions,
    trendingSkills,
    leaderboard,
    globalSearchQuery,
    setGlobalSearchQuery,
    themeMode,
    setThemeMode,
    themeAccent,
    setThemeAccent,
    isDarkMode,
    toggleThemeMode
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const trimmedQuery = globalSearch.trim().toLowerCase();

  // Multi-domain search results
  const matchingCommunities = trimmedQuery
    ? communities.filter(
        (c) =>
          c.name.toLowerCase().includes(trimmedQuery) ||
          c.description.toLowerCase().includes(trimmedQuery) ||
          c.category.toLowerCase().includes(trimmedQuery)
      ).slice(0, 3)
    : [];

  const matchingCompetitions = trimmedQuery
    ? competitions.filter(
        (c) =>
          c.title.toLowerCase().includes(trimmedQuery) ||
          c.description.toLowerCase().includes(trimmedQuery) ||
          c.category.toLowerCase().includes(trimmedQuery)
      ).slice(0, 3)
    : [];

  const matchingLeaderboard = trimmedQuery
    ? leaderboard.filter(
        (l) =>
          l.name.toLowerCase().includes(trimmedQuery) ||
          l.college.toLowerCase().includes(trimmedQuery) ||
          (l.branch && l.branch.toLowerCase().includes(trimmedQuery))
      ).slice(0, 3)
    : [];

  const matchingTrending = trimmedQuery
    ? trendingSkills.filter(
        (t) =>
          t.skillName.toLowerCase().includes(trimmedQuery) ||
          t.category.toLowerCase().includes(trimmedQuery)
      ).slice(0, 3)
    : [];

  const matchingGigs = trimmedQuery
    ? gigs.filter(
        (g) =>
          g.title.toLowerCase().includes(trimmedQuery) ||
          g.skillCategory.toLowerCase().includes(trimmedQuery) ||
          g.skillsRequired.some((s) => s.toLowerCase().includes(trimmedQuery))
      ).slice(0, 3)
    : [];

  const matchingMentors = trimmedQuery
    ? mentors.filter(
        (m) =>
          m.name.toLowerCase().includes(trimmedQuery) ||
          m.college.toLowerCase().includes(trimmedQuery) ||
          m.skills.some((s) => s.name.toLowerCase().includes(trimmedQuery))
      ).slice(0, 3)
    : [];

  const hasAnyResults =
    matchingCommunities.length > 0 ||
    matchingCompetitions.length > 0 ||
    matchingLeaderboard.length > 0 ||
    matchingTrending.length > 0 ||
    matchingGigs.length > 0 ||
    matchingMentors.length > 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmedQuery) return;
    setGlobalSearchQuery(globalSearch);

    if (matchingCompetitions.length > 0 && matchingCommunities.length === 0 && matchingGigs.length === 0) {
      navigateTo('competitions');
    } else if (matchingCommunities.length > 0 && matchingGigs.length === 0) {
      navigateTo('communities');
    } else if (matchingLeaderboard.length > 0 && matchingGigs.length === 0) {
      navigateTo('leaderboard');
    } else if (matchingTrending.length > 0 && matchingGigs.length === 0) {
      navigateTo('trending');
    } else {
      navigateTo('gigs');
    }
    setSearchFocused(false);
  };

  const navLinks = [
    { id: 'landing', label: 'Home', icon: GraduationCap },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'gigs', label: 'Gigs', icon: Briefcase },
    { id: 'mentors', label: 'Mentors', icon: Sparkles },
    { id: 'communities', label: 'Communities', icon: Users },
    { id: 'career', label: 'Career Hub', icon: Zap },
    { id: 'competitions', label: 'Competitions', icon: Trophy },
    { id: 'leaderboard', label: 'Leaderboard', icon: Award },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'insights', label: 'Insights', icon: BarChart3 }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-indigo-100 shadow-xs transition-all">
      {/* Top micro-bar for verification & campus status */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-200">Campus Network Live:</span>
            <span className="hidden sm:inline text-slate-400">4,280+ verified students across IITs, NITs, BITS & top colleges</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('verify_email')}
              className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {currentUser.isVerifiedStudent ? (
                <span>✓ Verified Student ({currentUser.college})</span>
              ) : (
                <span>Verify College Email</span>
              )}
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => navigateTo('reputation')}
              className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Rep: {currentUser.reputationScore}/100</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('landing')}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="bg-indigo-600 p-2 rounded-xl text-white font-black text-lg tracking-wider flex items-center justify-center shadow-md shadow-indigo-200 group-hover:scale-105 transition transform">
                CS
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-2xl tracking-tight text-slate-800">
                    Campus<span className="text-indigo-600">Sphere</span>
                  </span>
                  <span className="bg-indigo-100 text-indigo-700 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md border border-indigo-200">
                    Ecosystem
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium hidden sm:block">Learn • Help • Earn • Compete</p>
              </div>
            </button>
          </div>

          {/* Center Navigation Links (Scrollable / Dense) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 overflow-x-auto py-1 font-semibold text-slate-600">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 font-bold border border-indigo-200 shadow-xs'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Coupon Balance Pill */}
            <button
              onClick={() => navigateTo('coupons')}
              className="flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-full text-xs font-bold transition group shadow-xs"
              title="Virtual Mentor Coupons - Used to request 1-on-1 student mentorship"
            >
              <span className="text-sm">🎟️</span>
              <span>{currentUser.couponsBalance} Coupons</span>
            </button>

            {/* AI Assistant Sideways Trigger */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-campus-ai'))}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 border border-indigo-200/80 text-indigo-700 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-2xs group"
              title="Open Campus AI Sideways Advisor"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>

            {/* Post Gig Quick Action */}
            <button
              onClick={() => navigateTo('post_gig')}
              className="hidden sm:flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-md shadow-indigo-200 active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post Gig</span>
            </button>

            {/* Theme Customizer Quick Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setThemeDropdownOpen(!themeDropdownOpen);
                  setNotifDropdownOpen(false);
                  setUserDropdownOpen(false);
                }}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition flex items-center justify-center group"
                title="Customize Theme & Colors"
                aria-label="Customize Theme & Colors"
              >
                {isDarkMode ? (
                  <Moon className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500 group-hover:rotate-45 transition-transform" />
                )}
                <span
                  className="absolute bottom-1 right-1 w-2 h-2 rounded-full ring-1 ring-white"
                  style={{
                    backgroundColor:
                      THEME_COLOR_PRESETS.find((t) => t.id === themeAccent)?.primaryColor || '#4f46e5'
                  }}
                />
              </button>

              {/* Theme Quick Dropdown Popover */}
              {themeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 z-50 animate-in fade-in slide-in-from-top-2 text-slate-800">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Palette className="w-4 h-4 text-indigo-600" />
                      <span className="font-bold text-xs text-slate-900">Theme & Colors</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700">
                      {themeAccent}
                    </span>
                  </div>

                  {/* Mode Toggles */}
                  <div className="space-y-1 mb-3">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Mode</p>
                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-50 rounded-xl">
                      <button
                        onClick={() => setThemeMode('light')}
                        className={`py-1 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${
                          themeMode === 'light'
                            ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                        <span>Light</span>
                      </button>

                      <button
                        onClick={() => setThemeMode('dark')}
                        className={`py-1 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${
                          themeMode === 'dark'
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Moon className="w-3.5 h-3.5 text-indigo-300" />
                        <span>Dark</span>
                      </button>

                      <button
                        onClick={() => setThemeMode('system')}
                        className={`py-1 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${
                          themeMode === 'system'
                            ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Laptop className="w-3.5 h-3.5 text-slate-500" />
                        <span>Auto</span>
                      </button>
                    </div>
                  </div>

                  {/* 6 Accent Color Presets */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Color Palette</p>
                      <span className="text-[10px] font-bold text-slate-500 capitalize">
                        {THEME_COLOR_PRESETS.find((t) => t.id === themeAccent)?.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-6 gap-1.5 pt-0.5">
                      {THEME_COLOR_PRESETS.map((preset) => {
                        const isSelected = themeAccent === preset.id;
                        return (
                          <button
                            key={preset.id}
                            onClick={() => setThemeAccent(preset.id)}
                            className={`h-8 rounded-xl flex items-center justify-center text-white transition relative hover:scale-105 ${
                              isSelected ? 'ring-2 ring-offset-2 ring-slate-900 shadow-xs' : 'opacity-85 hover:opacity-100'
                            }`}
                            style={{ backgroundColor: preset.primaryColor }}
                            title={preset.name}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Open Full Studio Button */}
                  <button
                    onClick={() => {
                      setThemeDropdownOpen(false);
                      setThemeModalOpen(true);
                    }}
                    className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span>Open Appearance Studio</span>
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Flyout */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-indigo-600" />
                      <span className="font-semibold text-xs text-slate-900">Campus Alerts</span>
                      {unreadCount > 0 && (
                        <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] text-indigo-600 hover:underline font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.slice(0, 5).map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markNotificationRead(notif.id);
                          if (notif.actionUrl) {
                            navigateTo(notif.actionUrl as any);
                            setNotifDropdownOpen(false);
                          }
                        }}
                        className={`p-3 text-left hover:bg-slate-50 transition cursor-pointer flex gap-3 ${
                          !notif.isRead ? 'bg-indigo-50/40' : ''
                        }`}
                      >
                        <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-indigo-600"></div>
                        <div className="flex-1">
                          <p className="font-semibold text-xs text-slate-900 leading-snug">{notif.title}</p>
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                          <div className="flex items-center justify-between mt-1.5 text-[10px]">
                            <span className="text-slate-400">{notif.timestamp}</span>
                            {notif.actionText && (
                              <span className="text-indigo-600 font-semibold">{notif.actionText} →</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        navigateTo('notifications');
                        setNotifDropdownOpen(false);
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile & Demo Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 transition"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-indigo-200"
                />
                <span className="hidden sm:inline font-semibold text-xs text-slate-800 truncate max-w-[90px]">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile & Demo Switcher Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs text-slate-900 truncate flex items-center gap-1">
                        {currentUser.name}
                        {currentUser.isVerifiedStudent && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        )}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.college}</p>
                      <span className="inline-block mt-0.5 px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full">
                        Reputation: {currentUser.reputationScore}/100
                      </span>
                    </div>
                  </div>

                  {/* Navigation Shortcuts */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigateTo('profile');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>My Student Profile & Portfolio</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('my_gigs');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                    >
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      <span>My Gigs & Applications</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('reputation');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                    >
                      <ShieldCheck className="w-4 h-4 text-slate-400" />
                      <span>Trust Ladder & Reputation</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('onboarding');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                    >
                      <Layers className="w-4 h-4 text-slate-400" />
                      <span>Edit Skills & Mentoring (100 Skills)</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('referral');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                    >
                      <Gift className="w-4 h-4 text-amber-500" />
                      <span>Invite & Earn Coupons</span>
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('settings');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>Settings & Verification</span>
                    </button>
                  </div>

                  {/* Switch Demo Persona */}
                  <div className="border-t border-slate-100 pt-2 px-3 pb-1">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 px-1 mb-1">
                      Switch Demo Student Profile
                    </p>
                    <div className="space-y-1">
                      {availableUsers.map((u) => (
                        <button
                          key={u.id}
                          onClick={() => {
                            switchUser(u.id);
                            setUserDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-xs transition ${
                            currentUser.id === u.id
                              ? 'bg-indigo-50 text-indigo-700 font-bold'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <div className="truncate flex-1">
                            <span className="block truncate leading-none">{u.name}</span>
                            <span className="text-[10px] text-slate-400 truncate">{u.college}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <Search className="w-4 h-4 text-indigo-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search communities, competitions, skills..."
              value={globalSearch}
              onChange={(e) => {
                setGlobalSearch(e.target.value);
                setGlobalSearchQuery(e.target.value);
              }}
              className="w-full pl-9 pr-8 py-2 text-xs bg-indigo-50/70 focus:bg-white border border-indigo-100 focus:border-indigo-500 rounded-xl outline-none"
            />
            {globalSearch && (
              <button
                type="button"
                onClick={() => {
                  setGlobalSearch('');
                  setGlobalSearchQuery('');
                }}
                className="absolute right-2.5 top-2 p-0.5 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    navigateTo(link.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Theme Customizer Quick Row */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              onClick={toggleThemeMode}
              className="flex-1 py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 text-slate-700"
            >
              {isDarkMode ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
              <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setThemeModalOpen(true);
              }}
              className="flex-1 py-2 px-3 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Theme Studio</span>
            </button>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                navigateTo('post_gig');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Gig</span>
            </button>
            <button
              onClick={() => {
                navigateTo('coupons');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 bg-amber-500 text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Ticket className="w-4 h-4" />
              <span>🎟️ {currentUser.couponsBalance} Coupons</span>
            </button>
          </div>
        </div>
      )}

      {/* Full Theme & Visual Customizer Modal */}
      <ThemeCustomizerModal
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
      />
    </header>
  );
};
