import React, { useState } from 'react';
import {
  Layers,
  Search,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  X,
  Star,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ALL_100_SKILLS, SKILL_CATEGORIES } from '../data/skillsData';
import { UserSkill, SkillLevel, SkillCategory } from '../types';

export const OnboardingModal: React.FC = () => {
  const { currentUser, setSkillsAndMentoring, navigateTo } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Local state of selected skills
  const [selectedSkillsMap, setSelectedSkillsMap] = useState<Record<string, { level: SkillLevel; willingToMentor: boolean; availability: any }>>(() => {
    const map: Record<string, { level: SkillLevel; willingToMentor: boolean; availability: any }> = {};
    currentUser.skills.forEach((s) => {
      map[s.name] = {
        level: s.level,
        willingToMentor: s.willingToMentor,
        availability: s.availability || 'Weekends only'
      };
    });
    return map;
  });

  const filteredSkills = ALL_100_SKILLS.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleSkill = (skillName: string, category: SkillCategory) => {
    setSelectedSkillsMap((prev) => {
      const next = { ...prev };
      if (next[skillName]) {
        delete next[skillName];
      } else {
        next[skillName] = {
          level: 'Intermediate',
          willingToMentor: false,
          availability: 'Weekends only'
        };
      }
      return next;
    });
  };

  const updateSkillLevel = (skillName: string, level: SkillLevel) => {
    setSelectedSkillsMap((prev) => ({
      ...prev,
      [skillName]: { ...prev[skillName], level }
    }));
  };

  const updateMentoring = (skillName: string, willingToMentor: boolean, availability: string) => {
    setSelectedSkillsMap((prev) => ({
      ...prev,
      [skillName]: { ...prev[skillName], willingToMentor, availability }
    }));
  };

  const handleSave = () => {
    const skillsArray: UserSkill[] = Object.keys(selectedSkillsMap).map((name) => {
      const item = selectedSkillsMap[name];
      const category = ALL_100_SKILLS.find((s) => s.name === name)?.category || 'Software & Development';
      return {
        name,
        category,
        level: item.level,
        willingToMentor: item.willingToMentor,
        availability: item.availability
      };
    });

    setSkillsAndMentoring(skillsArray);
    navigateTo('profile');
  };

  const selectedCount = Object.keys(selectedSkillsMap).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-500/30 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full border border-indigo-400/30 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-300" />
              100-Skill Campus Taxonomy
            </span>
            <span className="text-xs text-indigo-200">Personalized Profiles</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Select Your Skills & Mentorship Settings
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-xl">
            Choose skills from all 7 engineering and design domains. Set your proficiency and whether you want to mentor junior students.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[170px]">
          <p className="text-[11px] text-indigo-200 uppercase font-bold">Selected Skills</p>
          <p className="text-2xl font-extrabold text-white font-display my-0.5">
            {selectedCount} / 100
          </p>
          <span className="text-[11px] text-emerald-300">
            {Object.values(selectedSkillsMap).filter((s: any) => s?.willingToMentor).length} Mentoring
          </span>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search across all 100 skills (e.g. Python, KiCad, ANSYS, Solidity, Video Editing, GenAI)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none"
          />
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition ${
              selectedCategory === 'All'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All 100 Skills
          </button>
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Skills Configuration Section */}
      {selectedCount > 0 && (
        <div className="bg-white p-6 rounded-3xl border border-indigo-200 shadow-sm space-y-4">
          <h3 className="font-display font-bold text-base text-slate-900 flex items-center justify-between">
            <span>Configure Selected Skills & Mentoring ({selectedCount})</span>
            <span className="text-xs text-slate-500 font-normal">Set level & mentoring availability</span>
          </h3>

          <div className="space-y-3">
            {Object.keys(selectedSkillsMap).map((skillName) => {
              const item = selectedSkillsMap[skillName];
              return (
                <div
                  key={skillName}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{skillName}</span>
                    <button
                      onClick={() => {
                        const next = { ...selectedSkillsMap };
                        delete next[skillName];
                        setSelectedSkillsMap(next);
                      }}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    {/* Proficiency level selector */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 font-medium">Level:</span>
                      <select
                        value={item.level}
                        onChange={(e) => updateSkillLevel(skillName, e.target.value as SkillLevel)}
                        className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-semibold text-indigo-700 outline-none"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>

                    {/* Mentoring checkbox & availability */}
                    <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-slate-200">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.willingToMentor}
                          onChange={(e) => updateMentoring(skillName, e.target.checked, item.availability)}
                          className="rounded text-indigo-600"
                        />
                        <span className="font-semibold text-slate-800">Mentor Peers (🎟️)</span>
                      </label>

                      {item.willingToMentor && (
                        <select
                          value={item.availability}
                          onChange={(e) => updateMentoring(skillName, true, e.target.value)}
                          className="text-[11px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded outline-none"
                        >
                          <option value="Weekends only">Weekends only</option>
                          <option value="Evenings only">Evenings only</option>
                          <option value="Yes, available">Flexible / Always</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Skills Grid */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900">
          Click Skills to Add / Remove ({filteredSkills.length} Available)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {filteredSkills.map((skill) => {
            const isSelected = !!selectedSkillsMap[skill.name];
            return (
              <button
                key={skill.id}
                onClick={() => toggleSkill(skill.name, skill.category)}
                className={`p-3 rounded-2xl border text-left text-xs transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100/80 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold truncate">{skill.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white flex-shrink-0" />}
                </div>
                <span className={`text-[10px] truncate ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {skill.category.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating / Bottom Save Bar */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl flex items-center justify-between shadow-xl sticky bottom-4 z-20">
        <div>
          <p className="font-bold text-sm text-white">
            {selectedCount} Skills Selected
          </p>
          <p className="text-xs text-slate-400">
            Click save to update your public profile and mentor directory listings
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Save Skills & Profile</span>
        </button>
      </div>

    </div>
  );
};
