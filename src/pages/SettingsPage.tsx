import React, { useState } from 'react';
import {
  Settings,
  User,
  ShieldCheck,
  Bell,
  Mail,
  CheckCircle2,
  Lock,
  Sparkles,
  Save,
  Palette,
  Sun,
  Moon,
  Laptop,
  Check,
  RotateCcw,
  Sliders,
  Eye,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { THEME_COLOR_PRESETS } from '../components/ThemeCustomizerModal';

export const SettingsPage: React.FC = () => {
  const {
    currentUser,
    updateProfile,
    navigateTo,
    themeMode,
    setThemeMode,
    themeAccent,
    setThemeAccent,
    themeDensity,
    setThemeDensity,
    isDarkMode,
    toggleThemeMode,
    addToast,
    triggerConfetti
  } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [college, setCollege] = useState(currentUser.college);
  const [branch, setBranch] = useState(currentUser.branch);
  const [year, setYear] = useState(currentUser.year);
  const [saved, setSaved] = useState(false);

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [gigAlerts, setGigAlerts] = useState(true);
  const [mentorshipAlerts, setMentorshipAlerts] = useState(true);

  const activePreset = THEME_COLOR_PRESETS.find((t) => t.id === themeAccent) || THEME_COLOR_PRESETS[0];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      bio,
      college,
      branch,
      year
    });
    setSaved(true);
    addToast('success', 'Profile Updated', 'Your student information has been successfully saved.');
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetTheme = () => {
    setThemeMode('light');
    setThemeAccent('indigo');
    setThemeDensity('comfortable');
    addToast('info', 'Theme Reset', 'Restored default Electric Indigo light theme.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-extrabold text-slate-900 flex items-center gap-2">
          <Settings className="w-6 h-6 text-indigo-600" />
          <span>Account & App Settings</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your student identity, visual appearance, themes, privacy, and notifications
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 flex items-center gap-2 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* 1. Theme & Appearance Customization Suite */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Appearance & Theme Customizer
              </h3>
              <p className="text-[11px] text-slate-500">
                Customize light/dark mode, accent colors, and layout density
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetTheme}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>
        </div>

        {/* Color Scheme Mode */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Color Scheme Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Light Mode Button */}
            <button
              type="button"
              onClick={() => {
                setThemeMode('light');
                addToast('info', 'Light Mode', 'Switched to clean light appearance.');
              }}
              className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 relative ${
                themeMode === 'light'
                  ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-medium'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
                <Sun className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold block">Light Theme</span>
                <span className="text-[10px] text-slate-500 block truncate">Crisp, luminous canvas</span>
              </div>
              {themeMode === 'light' && (
                <span className="ml-auto w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                  <Check className="w-3 h-3" />
                </span>
              )}
            </button>

            {/* Dark Mode Button */}
            <button
              type="button"
              onClick={() => {
                setThemeMode('dark');
                addToast('info', 'Dark Mode', 'Switched to obsidian slate night mode.');
              }}
              className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 relative ${
                themeMode === 'dark'
                  ? 'border-indigo-600 bg-slate-900 text-white font-bold ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-900 text-slate-300 font-medium'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-700 flex items-center justify-center text-indigo-300 shadow-xs">
                <Moon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold block text-white">Dark Theme</span>
                <span className="text-[10px] text-slate-400 block truncate">Deep obsidian slate</span>
              </div>
              {themeMode === 'dark' && (
                <span className="ml-auto w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                  <Check className="w-3 h-3" />
                </span>
              )}
            </button>

            {/* System Auto Button */}
            <button
              type="button"
              onClick={() => {
                setThemeMode('system');
                addToast('info', 'System Sync', 'Theme will automatically match your OS settings.');
              }}
              className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 relative ${
                themeMode === 'system'
                  ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-medium'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shadow-xs">
                <Laptop className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold block">System Auto</span>
                <span className="text-[10px] text-slate-500 block truncate">Sync with device OS</span>
              </div>
              {themeMode === 'system' && (
                <span className="ml-auto w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                  <Check className="w-3 h-3" />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 6 Accent Color Themes */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700">
              Primary Accent Color Palette
            </label>
            <span className="text-xs font-bold" style={{ color: activePreset.primaryColor }}>
              Active: {activePreset.name}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {THEME_COLOR_PRESETS.map((preset) => {
              const isSelected = themeAccent === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setThemeAccent(preset.id);
                    triggerConfetti();
                    addToast('success', 'Palette Changed', `Applied ${preset.name} theme.`);
                  }}
                  className={`p-3 rounded-2xl border text-left transition relative flex items-start gap-3 ${
                    isSelected
                      ? 'border-slate-900 bg-slate-50/80 font-bold ring-2 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                  style={{
                    borderColor: isSelected ? preset.primaryColor : undefined,
                    boxShadow: isSelected ? `0 0 0 2px ${preset.primaryColor}30` : undefined
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center text-white shadow-xs mt-0.5"
                    style={{ backgroundColor: preset.primaryColor }}
                  >
                    {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : <span className="w-2 h-2 rounded-full bg-white/70"></span>}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-slate-900 truncate">{preset.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block truncate">{preset.subtitle}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Layout Density */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Display Density
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setThemeDensity('comfortable')}
              className={`p-3 rounded-2xl border text-left transition flex items-center justify-between ${
                themeDensity === 'comfortable'
                  ? 'border-indigo-600 bg-indigo-50/40 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div>
                <span className="text-xs font-bold block">Comfortable</span>
                <span className="text-[10px] text-slate-500 block">Spacious typography & relaxed padding</span>
              </div>
              {themeDensity === 'comfortable' && <Check className="w-4 h-4 text-indigo-600" />}
            </button>

            <button
              type="button"
              onClick={() => setThemeDensity('compact')}
              className={`p-3 rounded-2xl border text-left transition flex items-center justify-between ${
                themeDensity === 'compact'
                  ? 'border-indigo-600 bg-indigo-50/40 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div>
                <span className="text-xs font-bold block">Compact</span>
                <span className="text-[10px] text-slate-500 block">Denser layout for power users</span>
              </div>
              {themeDensity === 'compact' && <Check className="w-4 h-4 text-indigo-600" />}
            </button>
          </div>
        </div>

        {/* Live Interactive Preview Card */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-indigo-600" />
              Live Theme Preview
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
              {isDarkMode ? 'Dark Mode Active' : 'Light Mode Active'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-xs"
                  style={{ backgroundColor: activePreset.primaryColor }}
                >
                  CS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">AI Prompt Engineer & Agent Builder</h4>
                  <p className="text-[10px] text-slate-500">FastAPI • LangChain • ₹12,000 Milestone</p>
                </div>
              </div>

              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-bold border"
                style={{
                  backgroundColor: `${activePreset.primaryColor}15`,
                  borderColor: `${activePreset.primaryColor}40`,
                  color: activePreset.primaryColor
                }}
              >
                Top Match
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-500">
                Current accent: <strong className="text-slate-800">{activePreset.name}</strong>
              </span>

              <button
                type="button"
                className="px-3.5 py-1.5 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-1.5"
                style={{ backgroundColor: activePreset.primaryColor }}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Interactive Action</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Profile Form */}
      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="font-display font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
          Student Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">College / University</label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Branch / Major</label>
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Academic Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            >
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="Masters / PhD">Masters / PhD</option>
            </select>
          </div>
        </div>

        <div className="text-xs">
          <label className="block font-bold text-slate-700 mb-1">Bio / Headline</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            required
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigateTo('onboarding')}
            className="text-xs text-indigo-600 font-bold hover:underline"
          >
            Manage 100 Searchable Skills & Levels →
          </button>

          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>

      {/* 3. College Email Status Box */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <h3 className="font-display font-bold text-base text-slate-900">
          Institutional Email Verification Status
        </h3>

        <div className="p-4 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-bold">{currentUser.email}</p>
              <p className="text-emerald-700 text-[11px]">✓ Verified Institutional Student Domain</p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('verify_email')}
            className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition"
          >
            Re-verify
          </button>
        </div>
      </div>

    </div>
  );
};

