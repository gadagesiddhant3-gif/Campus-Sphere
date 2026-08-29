import React from 'react';
import {
  Palette,
  Sun,
  Moon,
  Laptop,
  Check,
  Sparkles,
  X,
  RotateCcw,
  Sliders,
  Eye,
  ShieldCheck,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ThemeAccent, ThemeMode, ThemeDensity } from '../types';

interface ThemeOption {
  id: ThemeAccent;
  name: string;
  subtitle: string;
  primaryColor: string;
  bgLight: string;
  borderLight: string;
  textColor: string;
  badge: string;
}

export const THEME_COLOR_PRESETS: ThemeOption[] = [
  {
    id: 'indigo',
    name: 'Electric Indigo',
    subtitle: 'Classic Campus Pro',
    primaryColor: '#4f46e5',
    bgLight: 'bg-indigo-50',
    borderLight: 'border-indigo-200',
    textColor: 'text-indigo-600',
    badge: 'Classic'
  },
  {
    id: 'emerald',
    name: 'Emerald Growth',
    subtitle: 'Campus Mint & Growth',
    primaryColor: '#059669',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-200',
    textColor: 'text-emerald-600',
    badge: 'Popular'
  },
  {
    id: 'violet',
    name: 'Mystic Violet',
    subtitle: 'AI & Creative Tech',
    primaryColor: '#7c3aed',
    bgLight: 'bg-purple-50',
    borderLight: 'border-purple-200',
    textColor: 'text-purple-600',
    badge: 'Trending'
  },
  {
    id: 'amber',
    name: 'Sunset Amber',
    subtitle: 'Warm Golden Opportunity',
    primaryColor: '#d97706',
    bgLight: 'bg-amber-50',
    borderLight: 'border-amber-200',
    textColor: 'text-amber-600',
    badge: 'Warm'
  },
  {
    id: 'rose',
    name: 'Ruby Rose',
    subtitle: 'Dynamic & Energetic',
    primaryColor: '#e11d48',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-200',
    textColor: 'text-rose-600',
    badge: 'Vibrant'
  },
  {
    id: 'ocean',
    name: 'Ocean Azure',
    subtitle: 'Caribbean Coastal Blue',
    primaryColor: '#0284c7',
    bgLight: 'bg-sky-50',
    borderLight: 'border-sky-200',
    textColor: 'text-sky-600',
    badge: 'Fresh'
  }
];

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeCustomizerModal: React.FC<ThemeCustomizerModalProps> = ({ isOpen, onClose }) => {
  const {
    themeMode,
    setThemeMode,
    themeAccent,
    setThemeAccent,
    themeDensity,
    setThemeDensity,
    isDarkMode,
    addToast,
    triggerConfetti
  } = useApp();

  if (!isOpen) return null;

  const currentTheme = THEME_COLOR_PRESETS.find((t) => t.id === themeAccent) || THEME_COLOR_PRESETS[0];

  const handleReset = () => {
    setThemeMode('light');
    setThemeAccent('indigo');
    setThemeDensity('comfortable');
    addToast('info', 'Theme Reset', 'Restored default Electric Indigo light theme.');
  };

  const handleApply = () => {
    triggerConfetti();
    addToast('success', 'Theme Applied', `Active theme: ${currentTheme.name} (${themeMode.toUpperCase()})`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 border border-white/10 shadow-inner">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-white flex items-center gap-2">
                <span>Theme & Appearance Studio</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  Live Customizer
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Personalize dark mode, color accents, and layout density
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* 1. Theme Mode Selection */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              1. Color Scheme Mode
            </label>
            <div className="grid grid-cols-3 gap-3">
              {/* Light */}
              <button
                type="button"
                onClick={() => setThemeMode('light')}
                className={`p-3.5 rounded-2xl border text-left transition flex flex-col items-center gap-2 relative ${
                  themeMode === 'light'
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-medium'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
                  <Sun className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <span className="text-xs block font-bold">Light Mode</span>
                  <span className="text-[10px] text-slate-500 block">Clean & luminous</span>
                </div>
                {themeMode === 'light' && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </button>

              {/* Dark */}
              <button
                type="button"
                onClick={() => setThemeMode('dark')}
                className={`p-3.5 rounded-2xl border text-left transition flex flex-col items-center gap-2 relative ${
                  themeMode === 'dark'
                    ? 'border-indigo-600 bg-slate-900 text-white font-bold ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-900 text-slate-300 font-medium'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-700 flex items-center justify-center text-indigo-300 shadow-xs">
                  <Moon className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <span className="text-xs block font-bold text-white">Dark Mode</span>
                  <span className="text-[10px] text-slate-400 block">Deep obsidian slate</span>
                </div>
                {themeMode === 'dark' && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </button>

              {/* System */}
              <button
                type="button"
                onClick={() => setThemeMode('system')}
                className={`p-3.5 rounded-2xl border text-left transition flex flex-col items-center gap-2 relative ${
                  themeMode === 'system'
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-medium'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shadow-xs">
                  <Laptop className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <span className="text-xs block font-bold">System Auto</span>
                  <span className="text-[10px] text-slate-500 block">Follows device OS</span>
                </div>
                {themeMode === 'system' && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* 2. Color Accent Presets */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                2. Brand & Accent Color Presets
              </label>
              <span className="text-[11px] font-bold text-slate-500">
                Selected: <strong style={{ color: currentTheme.primaryColor }}>{currentTheme.name}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {THEME_COLOR_PRESETS.map((t) => {
                const isSelected = themeAccent === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setThemeAccent(t.id)}
                    className={`p-3 rounded-2xl border text-left transition relative flex items-start gap-3 ${
                      isSelected
                        ? 'border-slate-900 bg-slate-50/80 font-bold ring-2 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                    style={{
                      borderColor: isSelected ? t.primaryColor : undefined,
                      boxShadow: isSelected ? `0 0 0 2px ${t.primaryColor}25` : undefined
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center text-white shadow-xs mt-0.5"
                      style={{ backgroundColor: t.primaryColor }}
                    >
                      {isSelected ? <Check className="w-4 h-4" /> : <span className="w-2 h-2 rounded-full bg-white/60"></span>}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-900 truncate">{t.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate">{t.subtitle}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Layout Density */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              3. Interface Density
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
                  <span className="text-[10px] text-slate-500 block">Spacious padding & smooth cards</span>
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
                  <span className="text-[10px] text-slate-500 block">Denser data layout for power users</span>
                </div>
                {themeDensity === 'compact' && <Check className="w-4 h-4 text-indigo-600" />}
              </button>
            </div>
          </div>

          {/* 4. Live Interactive UI Preview */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-indigo-600" />
                Live Component Preview
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                {isDarkMode ? 'Dark Preview' : 'Light Preview'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-xs"
                    style={{ backgroundColor: currentTheme.primaryColor }}
                  >
                    CS
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Campus Web App Gig</h4>
                    <p className="text-[10px] text-slate-500">FastAPI & React Dashboard • ₹8,500</p>
                  </div>
                </div>

                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold border"
                  style={{
                    backgroundColor: `${currentTheme.primaryColor}15`,
                    borderColor: `${currentTheme.primaryColor}40`,
                    color: currentTheme.primaryColor
                  }}
                >
                  Active Match
                </span>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  className="px-3 py-1.5 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-1"
                  style={{ backgroundColor: currentTheme.primaryColor }}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Apply with Proposal</span>
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl bg-white hover:bg-slate-50"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-5 py-2 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
              style={{ backgroundColor: currentTheme.primaryColor }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Save & Apply Theme</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
