import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  Gig,
  GigApplication,
  MentorshipRequest,
  Community,
  CommunityPost,
  Internship,
  Competition,
  LeaderboardEntry,
  NotificationItem,
  UserRole,
  Certificate,
  PortfolioItem,
  SkillJourneyItem,
  MentorReview,
  UserSkill,
  CampusInsights,
  TrendingSkillItem,
  RisingSkillItem,
  ThemeMode,
  ThemeAccent,
  ThemeDensity
} from '../types';
import {
  CURRENT_STUDENT_USER,
  OTHER_STUDENTS,
  INITIAL_GIGS,
  INITIAL_COMMUNITIES,
  INITIAL_COMMUNITY_POSTS,
  INITIAL_INTERNSHIPS,
  INITIAL_COMPETITIONS,
  INITIAL_LEADERBOARD_WEEKLY,
  INITIAL_NOTIFICATIONS,
  INITIAL_CAMPUS_INSIGHTS,
  INITIAL_TRENDING_SKILLS_DATA,
  INITIAL_RISING_SKILLS_DATA
} from '../data/mockData';

export type PageView = 
  | 'landing'
  | 'explore'
  | 'gigs'
  | 'gig_detail'
  | 'post_gig'
  | 'my_gigs'
  | 'mentors'
  | 'mentor_detail'
  | 'request_mentorship'
  | 'communities'
  | 'community_detail'
  | 'career'
  | 'internship_detail'
  | 'recruiter_profile'
  | 'competitions'
  | 'competition_detail'
  | 'leaderboard'
  | 'trending'
  | 'insights'
  | 'profile'
  | 'edit_profile'
  | 'reputation'
  | 'coupons'
  | 'referral'
  | 'subscription'
  | 'notifications'
  | 'settings'
  | 'onboarding'
  | 'verify_email';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Navigation
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedItemId: string | null;
  setSelectedItemId: (id: string | null) => void;
  navigateTo: (page: PageView, itemId?: string) => void;

  // Active User & Switcher
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  availableUsers: UserProfile[];
  switchUser: (userId: string) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;

  // Gigs
  gigs: Gig[];
  postNewGig: (gigData: Partial<Gig>) => void;
  applyToGig: (gigId: string, pitch: string, budget: number) => void;
  userApplications: GigApplication[];
  myPostedGigs: Gig[];
  
  // Mentorship & Coupons
  mentors: UserProfile[];
  mentorshipRequests: MentorshipRequest[];
  requestMentorship: (mentorId: string, skill: string, topic: string, preferredTime: string) => boolean;
  completeMentorshipSession: (requestId: string, rating: number, comment: string) => void;
  addCoupons: (amount: number, reason?: string) => void;

  // Profile Customization & Trust Ladder
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  addCertificate: (cert: Omit<Certificate, 'id'>) => void;
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void;
  addSkillJourneyItem: (skillName: string, item: Omit<SkillJourneyItem, 'id'>) => void;
  verifyCollegeEmail: (email: string, otp: string) => boolean;
  saveUserSkills: (skills: UserSkill[]) => void;

  // Communities & Posts
  communities: Community[];
  communityPosts: CommunityPost[];
  createPost: (postData: Partial<CommunityPost>) => void;
  toggleLikePost: (postId: string) => void;
  votePoll: (postId: string, optionId: string) => void;
  toggleJoinCommunity: (communityId: string) => void;

  // Competitions & Leaderboard
  competitions: Competition[];
  leaderboard: LeaderboardEntry[];
  submitCompetitionProject: (competitionId: string, repoUrl: string, notes: string) => void;

  // Career Hub & Internships
  internships: Internship[];
  applyToInternship: (internshipId: string) => void;
  userInternshipApplications: string[]; // internship IDs

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadCount: number;

  // UI Feedback
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  triggerConfetti: () => void;

  // Global Search State
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;

  // Trending & Rising Skills
  trendingSkills: TrendingSkillItem[];
  risingSkills: RisingSkillItem[];

  // Communities Extended Helpers
  joinedCommunities: string[];
  joinCommunity: (communityId: string) => void;
  leaveCommunity: (communityId: string) => void;
  upvotePost: (postId: string) => void;
  voteOnPoll: (postId: string, optionId: string) => void;
  createCommunityPost: (communityId: string, title: string, content: string, type?: any, pollOptions?: any[]) => void;

  // Competitions Submissions
  userCompetitionSubmissions: string[];

  // Campus Insights Telemetry
  campusInsights: CampusInsights;

  // Demo Tour
  activeDemoStep: number;
  setActiveDemoStep: (step: number) => void;
  runDemoStep: (step: number) => void;

  // Theme & Appearance Customization
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  themeAccent: ThemeAccent;
  setThemeAccent: (accent: ThemeAccent) => void;
  themeDensity: ThemeDensity;
  setThemeDensity: (density: ThemeDensity) => void;
  isDarkMode: boolean;
  toggleThemeMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('landing');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Theme State with LocalStorage Persistence
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('campusgig_theme_mode');
      if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
    } catch (e) {
      // ignore
    }
    return 'light';
  });

  const [themeAccent, setThemeAccentState] = useState<ThemeAccent>(() => {
    try {
      const saved = localStorage.getItem('campusgig_theme_accent');
      if (saved && ['indigo', 'emerald', 'violet', 'amber', 'rose', 'ocean'].includes(saved)) {
        return saved as ThemeAccent;
      }
    } catch (e) {
      // ignore
    }
    return 'indigo';
  });

  const [themeDensity, setThemeDensityState] = useState<ThemeDensity>(() => {
    try {
      const saved = localStorage.getItem('campusgig_theme_density');
      if (saved === 'compact' || saved === 'comfortable') return saved;
    } catch (e) {
      // ignore
    }
    return 'comfortable';
  });

  // Calculate actual dark mode (considering system preference)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (themeMode === 'dark') return true;
    if (themeMode === 'light') return false;
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      localStorage.setItem('campusgig_theme_mode', mode);
    } catch (e) {}
  };

  const setThemeAccent = (accent: ThemeAccent) => {
    setThemeAccentState(accent);
    try {
      localStorage.setItem('campusgig_theme_accent', accent);
    } catch (e) {}
  };

  const setThemeDensity = (density: ThemeDensity) => {
    setThemeDensityState(density);
    try {
      localStorage.setItem('campusgig_theme_density', density);
    } catch (e) {}
  };

  const toggleThemeMode = () => {
    if (themeMode === 'light') {
      setThemeMode('dark');
    } else if (themeMode === 'dark') {
      setThemeMode('light');
    } else {
      // If system, switch to opposite of current isDarkMode
      setThemeMode(isDarkMode ? 'light' : 'dark');
    }
  };

  // Sync DOM with Theme Mode and Accent Colors
  useEffect(() => {
    const updateDarkMode = () => {
      let activeDark = false;
      if (themeMode === 'dark') {
        activeDark = true;
      } else if (themeMode === 'light') {
        activeDark = false;
      } else if (typeof window !== 'undefined' && window.matchMedia) {
        activeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      setIsDarkMode(activeDark);

      const root = document.documentElement;
      if (activeDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }

      root.setAttribute('data-theme-accent', themeAccent);
      root.setAttribute('data-theme-mode', themeMode);
      root.setAttribute('data-theme-density', themeDensity);

      // Also set body classes for accent overrides
      document.body.className = `theme-${themeAccent} density-${themeDensity} ${activeDark ? 'dark' : ''}`;
    };

    updateDarkMode();

    // Listen for system theme changes if set to system
    if (themeMode === 'system' && typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => updateDarkMode();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [themeMode, themeAccent, themeDensity]);

  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_STUDENT_USER);
  const [availableUsers, setAvailableUsers] = useState<UserProfile[]>([
    CURRENT_STUDENT_USER,
    ...OTHER_STUDENTS
  ]);
  const [currentRole, setCurrentRole] = useState<UserRole>('student');

  const [gigs, setGigs] = useState<Gig[]>(INITIAL_GIGS);
  const [userApplications, setUserApplications] = useState<GigApplication[]>([]);
  const [communities, setCommunities] = useState<Community[]>(INITIAL_COMMUNITIES);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [internships, setInternships] = useState<Internship[]>(INITIAL_INTERNSHIPS);
  const [userInternshipApplications, setUserInternshipApplications] = useState<string[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>(INITIAL_COMPETITIONS);
  const [userCompetitionSubmissions, setUserCompetitionSubmissions] = useState<string[]>(['comp_1']);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD_WEEKLY);
  const [trendingSkills] = useState<TrendingSkillItem[]>(INITIAL_TRENDING_SKILLS_DATA);
  const [risingSkills] = useState<RisingSkillItem[]>(INITIAL_RISING_SKILLS_DATA);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>(['comm_web', 'comm_ai']);
  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipRequest[]>([
    {
      id: 'req_1',
      mentorId: 'usr_siddhant',
      studentId: 'usr_shivang_kumar',
      studentName: 'Shivang Kumar',
      studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      mentorName: 'Siddhant',
      mentorAvatar: CURRENT_STUDENT_USER.avatar,
      skill: 'Python',
      topic: 'FastAPI Microservice setup & Async DB queries',
      preferredTime: 'Saturday 4:00 PM',
      couponsUsed: 1,
      status: 'Accepted',
      createdAt: 'Yesterday',
      meetLink: 'https://meet.google.com/abc-cgig-pyt'
    }
  ]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeDemoStep, setActiveDemoStep] = useState<number>(0);

  const navigateTo = (page: PageView, itemId?: string) => {
    setCurrentPage(page);
    if (itemId !== undefined) {
      setSelectedItemId(itemId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = Date.now().toString() + Math.random();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  const switchUser = (userId: string) => {
    const found = availableUsers.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
      setCurrentRole(found.role);
      addToast('info', 'Switched Profile', `Now browsing as ${found.name} (${found.college})`);
    }
  };

  // Gigs Actions
  const postNewGig = (gigData: Partial<Gig>) => {
    const newGig: Gig = {
      id: `gig_${Date.now()}`,
      title: gigData.title || 'Untitled Gig',
      description: gigData.description || '',
      category: gigData.category || 'Software & Development',
      requiredSkills: gigData.requiredSkills || ['Web Development'],
      budget: gigData.budget || 1000,
      deadline: gigData.deadline || '3 days',
      locationType: gigData.locationType || 'Remote',
      campusLocation: gigData.campusLocation,
      urgency: gigData.urgency || 'Medium',
      postedBy: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        college: currentUser.college,
        isVerified: currentUser.isVerifiedStudent,
        rating: currentUser.rating || 4.9
      },
      createdAt: 'Just now',
      status: 'Open',
      applicantsCount: 0,
      tags: gigData.tags || ['Campus Gig', 'Verified Student']
    };

    setGigs((prev) => [newGig, ...prev]);
    
    // Add reputation points
    setCurrentUser((prev) => ({
      ...prev,
      reputationScore: Math.min(100, prev.reputationScore + 1)
    }));

    addToast('success', 'Gig Published Successfully!', 'Your gig is now visible to all verified campus students.');
    triggerConfetti();
    navigateTo('gigs');
  };

  const applyToGig = (gigId: string, pitch: string, budget: number) => {
    const gig = gigs.find((g) => g.id === gigId);
    if (!gig) return;

    const application: GigApplication = {
      id: `app_${Date.now()}`,
      gigId,
      applicantId: currentUser.id,
      applicant: currentUser,
      pitch,
      proposedBudget: budget,
      estimatedDelivery: '2 days',
      createdAt: 'Just now',
      status: 'Pending'
    };

    setUserApplications((prev) => [application, ...prev]);
    
    // update gig applicant count
    setGigs((prev) =>
      prev.map((g) => (g.id === gigId ? { ...g, applicantsCount: g.applicantsCount + 1 } : g))
    );

    // add notification
    const newNotification: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Proposal Submitted 📤',
      message: `Your application for "${gig.title}" (₹${budget}) has been received by ${gig.postedBy.name}.`,
      timestamp: 'Just now',
      type: 'gig',
      isRead: false,
      actionUrl: 'my_gigs',
      actionText: 'Track Status'
    };
    setNotifications((prev) => [newNotification, ...prev]);

    addToast('success', 'Application Sent!', `You applied to "${gig.title}". The client will be notified.`);
    triggerConfetti();
  };

  // Mentorship & Coupons
  const requestMentorship = (mentorId: string, skill: string, topic: string, preferredTime: string): boolean => {
    if (currentUser.couponsBalance < 1) {
      addToast('error', 'Insufficient Coupons 🎟️', 'You need at least 1 Mentor Coupon to book a mentorship session. Refer a classmate or win a challenge to earn coupons!');
      navigateTo('coupons');
      return false;
    }

    const mentor = availableUsers.find((u) => u.id === mentorId);
    const mentorName = mentor ? mentor.name : 'Skill Mentor';
    const mentorAvatar = mentor ? mentor.avatar : '';

    const newRequest: MentorshipRequest = {
      id: `req_${Date.now()}`,
      mentorId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentAvatar: currentUser.avatar,
      mentorName,
      mentorAvatar,
      skill,
      topic,
      preferredTime,
      couponsUsed: 1,
      status: 'Pending',
      createdAt: 'Just now',
      meetLink: 'https://meet.google.com/cgig-mentor-session'
    };

    setMentorshipRequests((prev) => [newRequest, ...prev]);

    // Deduct 1 coupon
    setCurrentUser((prev) => ({
      ...prev,
      couponsBalance: Math.max(0, prev.couponsBalance - 1)
    }));

    addToast('success', 'Mentorship Requested 🤝', `Used 1 Mentor Coupon. Request sent to ${mentorName}.`);
    triggerConfetti();
    return true;
  };

  const completeMentorshipSession = (requestId: string, rating: number, comment: string) => {
    const req = mentorshipRequests.find((r) => r.id === requestId);
    if (!req) return;

    setMentorshipRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'Completed' } : r))
    );

    const newReview: MentorReview = {
      id: `rev_${Date.now()}`,
      mentorId: req.mentorId,
      studentId: req.studentId,
      studentName: req.studentName,
      studentAvatar: req.studentAvatar,
      studentCollege: currentUser.college,
      rating,
      comment,
      skill: `${req.skill} Mentorship`,
      date: 'Just now',
      verifiedInteraction: true,
      sessionDurationMins: 45
    };

    // Update mentor's reviews and stats
    setAvailableUsers((prev) =>
      prev.map((u) => {
        if (u.id === req.mentorId) {
          const updatedReviews = [newReview, ...u.reviews];
          const avg = updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
          return {
            ...u,
            studentsMentoredCount: u.studentsMentoredCount + 1,
            reviews: updatedReviews,
            rating: Number(avg.toFixed(2)),
            reputationScore: Math.min(100, u.reputationScore + 3)
          };
        }
        return u;
      })
    );

    // If current user is the mentor, update current user too
    if (currentUser.id === req.mentorId) {
      setCurrentUser((prev) => ({
        ...prev,
        studentsMentoredCount: prev.studentsMentoredCount + 1,
        reputationScore: Math.min(100, prev.reputationScore + 3)
      }));
    }

    addToast('success', 'Verified Review Submitted ⭐', 'Thank you! Your verified feedback boosts your mentor\'s campus credibility.');
    triggerConfetti();
  };

  const addCoupons = (amount: number, reason?: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      couponsBalance: prev.couponsBalance + amount
    }));
    addToast('success', `+${amount} Mentor Coupons Added! 🎟️`, reason || 'Updated coupon balance.');
    triggerConfetti();
  };

  // Profile Customization & Trust Ladder
  const updateProfile = (updatedData: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...updatedData
    }));
    addToast('success', 'Profile Updated', 'Your student credentials and bio were updated successfully.');
  };

  const addCertificate = (cert: Omit<Certificate, 'id'>) => {
    const newCert: Certificate = {
      ...cert,
      id: `cert_${Date.now()}`
    };
    setCurrentUser((prev) => ({
      ...prev,
      certificates: [newCert, ...prev.certificates],
      reputationScore: Math.min(100, prev.reputationScore + 4)
    }));
    addToast('success', 'Verified Certificate Added! 📜', '+4 Campus Reputation Points awarded for verified credential.');
    triggerConfetti();
  };

  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: `port_${Date.now()}`
    };
    setCurrentUser((prev) => ({
      ...prev,
      portfolio: [newItem, ...prev.portfolio],
      reputationScore: Math.min(100, prev.reputationScore + 3)
    }));
    addToast('success', 'Portfolio Showcase Added 🎨', '+3 Reputation points. Students and recruiters can now view this work.');
    triggerConfetti();
  };

  const addSkillJourneyItem = (skillName: string, item: Omit<SkillJourneyItem, 'id'>) => {
    const newItem: SkillJourneyItem = {
      ...item,
      id: `sj_${Date.now()}`
    };
    setCurrentUser((prev) => {
      const existing = prev.skillJourneys[skillName] || [];
      return {
        ...prev,
        skillJourneys: {
          ...prev.skillJourneys,
          [skillName]: [...existing, newItem]
        },
        reputationScore: Math.min(100, prev.reputationScore + 2)
      };
    });
    addToast('success', 'Skill Journey Milestone Added 🚀', `Documented a new milestone for ${skillName}.`);
  };

  const verifyCollegeEmail = (email: string, otp: string): boolean => {
    if (!email.includes('@') || otp.length < 4) {
      addToast('error', 'Invalid Verification', 'Please enter a valid college institutional email and 4+ digit OTP.');
      return false;
    }
    const domain = email.split('@')[1] || 'ac.in';
    setCurrentUser((prev) => ({
      ...prev,
      email,
      isVerifiedStudent: true,
      verifiedEmailDomain: domain,
      reputationScore: Math.min(100, prev.reputationScore + 10)
    }));

    addToast('success', '✓ Verified Student Status Conferred!', `Verified with ${domain}. You unlocked full gig & mentoring access.`);
    triggerConfetti();
    return true;
  };

  const saveUserSkills = (skills: UserSkill[]) => {
    setCurrentUser((prev) => ({
      ...prev,
      skills
    }));
    addToast('success', 'Skills & Mentoring Preferences Saved', `Configured ${skills.length} skills for your profile.`);
  };

  // Communities
  const createPost = (postData: Partial<CommunityPost>) => {
    const newPost: CommunityPost = {
      id: `post_${Date.now()}`,
      communityId: postData.communityId || 'comm_prog',
      author: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        college: currentUser.college,
        isVerified: currentUser.isVerifiedStudent,
        badge: '🥇 Campus Expert'
      },
      title: postData.title || 'Discussion',
      content: postData.content || '',
      tags: postData.tags || ['Campus', 'Community'],
      likesCount: 1,
      commentsCount: 0,
      isLikedByMe: true,
      createdAt: 'Just now',
      type: postData.type || 'discussion',
      pollOptions: postData.pollOptions
    };

    setCommunityPosts((prev) => [newPost, ...prev]);
    setCurrentUser((prev) => ({
      ...prev,
      communityContributionsCount: prev.communityContributionsCount + 1,
      reputationScore: Math.min(100, prev.reputationScore + 1)
    }));

    addToast('success', 'Post Shared with Community 💬', 'Your discussion is now live on the community board.');
  };

  const toggleLikePost = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLikedByMe;
          return {
            ...p,
            isLikedByMe: isLiked,
            likesCount: isLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
          };
        }
        return p;
      })
    );
  };

  const votePoll = (postId: string, optionId: string) => {
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId && p.pollOptions) {
          return {
            ...p,
            pollOptions: p.pollOptions.map((opt) =>
              opt.id === optionId
                ? { ...opt, votes: opt.votes + 1, userVoted: true }
                : { ...opt, userVoted: false }
            )
          };
        }
        return p;
      })
    );
    addToast('info', 'Vote Recorded 📊', 'Your vote has been added to the community poll.');
  };

  const joinCommunity = (communityId: string) => {
    setJoinedCommunities((prev) => (prev.includes(communityId) ? prev : [...prev, communityId]));
    setCommunities((prev) =>
      prev.map((c) =>
        c.id === communityId
          ? { ...c, isJoined: true, membersCount: c.isJoined ? c.membersCount : c.membersCount + 1 }
          : c
      )
    );
    const comm = communities.find((c) => c.id === communityId);
    addToast('success', `Joined ${comm?.name || 'Community'}! 🎉`, 'You can now post questions, participate in polls, and connect with peers.');
  };

  const leaveCommunity = (communityId: string) => {
    setJoinedCommunities((prev) => prev.filter((id) => id !== communityId));
    setCommunities((prev) =>
      prev.map((c) =>
        c.id === communityId
          ? { ...c, isJoined: false, membersCount: Math.max(0, c.membersCount - 1) }
          : c
      )
    );
    const comm = communities.find((c) => c.id === communityId);
    addToast('info', `Left ${comm?.name || 'Community'}`, 'You are no longer a member of this community.');
  };

  const toggleJoinCommunity = (communityId: string) => {
    if (joinedCommunities.includes(communityId)) {
      leaveCommunity(communityId);
    } else {
      joinCommunity(communityId);
    }
  };

  const upvotePost = (postId: string) => {
    toggleLikePost(postId);
  };

  const voteOnPoll = (postId: string, optionId: string) => {
    votePoll(postId, optionId);
  };

  const createCommunityPost = (
    communityId: string,
    title: string,
    content: string,
    type: any = 'discussion',
    pollOptions?: any[]
  ) => {
    const newPost: CommunityPost = {
      id: `post_${Date.now()}`,
      communityId,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        college: currentUser.college,
        isVerified: currentUser.isVerifiedStudent,
        badge: currentUser.badges?.[0]?.name || 'Campus Student'
      },
      title,
      content,
      type: typeof type === 'string' ? (type.toLowerCase() as any) : 'discussion',
      tags: ['CampusConnect', 'StudentCollab'],
      likesCount: 1,
      isLikedByMe: true,
      commentsCount: 0,
      createdAt: 'Just now',
      pollOptions: pollOptions && pollOptions.length > 0 ? pollOptions.map((opt: any, idx: number) => ({
        id: opt.id || `opt_${idx}`,
        text: typeof opt === 'string' ? opt : opt.text,
        votes: 0,
        userVoted: false
      })) : undefined
    };

    setCommunityPosts((prev) => [newPost, ...prev]);
    setCommunities((prev) =>
      prev.map((c) =>
        c.id === communityId ? { ...c, postsCount: c.postsCount + 1 } : c
      )
    );

    addToast('success', 'Post Published! 🚀', 'Your contribution is now live in the community feed.');
    triggerConfetti();
  };

  // Competitions
  const submitCompetitionProject = (competitionId: string, repoUrl: string, demoUrl?: string, notes?: string) => {
    setUserCompetitionSubmissions((prev) => [...prev, competitionId]);

    setCompetitions((prev) =>
      prev.map((c) =>
        c.id === competitionId
          ? { ...c, participantsCount: c.participantsCount + 1 }
          : c
      )
    );

    // Boost Leaderboard points & add coupons
    setLeaderboard((prev) =>
      prev.map((entry) =>
        entry.isCurrentUser
          ? { ...entry, points: entry.points + 250 }
          : entry
      )
    );

    setCurrentUser((prev) => ({
      ...prev,
      competitionWinsCount: prev.competitionWinsCount + 1,
      couponsBalance: prev.couponsBalance + 2,
      reputationScore: Math.min(100, prev.reputationScore + 5)
    }));

    addToast('success', 'Submission Accepted! 🏆', '+250 Leaderboard Points and +2 Mentor Coupons awarded.');
    triggerConfetti();
  };

  // Internships
  const applyToInternship = (internshipId: string) => {
    const internship = internships.find((i) => i.id === internshipId);
    if (!internship) return;

    if (userInternshipApplications.includes(internshipId)) {
      addToast('info', 'Already Applied', 'You have already applied for this opening.');
      return;
    }

    setUserInternshipApplications((prev) => [...prev, internshipId]);
    setInternships((prev) =>
      prev.map((i) => (i.id === internshipId ? { ...i, applicantsCount: i.applicantsCount + 1 } : i))
    );

    addToast('success', 'Internship Application Submitted! 💼', `Your verified profile was sent to ${internship.companyName}.`);
    triggerConfetti();
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast('info', 'All caught up', 'Marked all notifications as read.');
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const myPostedGigs = gigs.filter((g) => g.postedBy.id === currentUser.id);

  // Guided demo tour runner
  const runDemoStep = (step: number) => {
    setActiveDemoStep(step);
    switch (step) {
      case 1: // Sign up & Email verification
        navigateTo('verify_email');
        break;
      case 2: // Skill Onboarding
        navigateTo('onboarding');
        break;
      case 3: // View Student Profile
        navigateTo('profile');
        break;
      case 4: // Explore Gigs Marketplace
        navigateTo('gigs');
        break;
      case 5: // Post a Gig
        navigateTo('post_gig');
        break;
      case 6: // Discover Mentors & Request with Coupon
        navigateTo('mentors');
        break;
      case 7: // Verified Mentor Review
        navigateTo('profile');
        break;
      case 8: // Join Communities & Polls
        navigateTo('communities');
        break;
      case 9: // Weekly Competitions
        navigateTo('competitions');
        break;
      case 10: // Weekly Campus Leaderboard
        navigateTo('leaderboard');
        break;
      case 11: // Career Hub & Internships
        navigateTo('career');
        break;
      case 12: // Campus Insights Analytics
        navigateTo('insights');
        break;
      case 13: // Trending Skills & Next Month Predictions
        navigateTo('trending');
        break;
      case 14: // Reputation Trust Ladder
        navigateTo('reputation');
        break;
      case 15: // Coupons & Referral System
        navigateTo('coupons');
        break;
      default:
        navigateTo('landing');
        break;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedItemId,
        setSelectedItemId,
        navigateTo,
        currentUser,
        setCurrentUser,
        availableUsers,
        switchUser,
        currentRole,
        setCurrentRole,
        gigs,
        postNewGig,
        applyToGig,
        userApplications,
        myPostedGigs,
        mentors: availableUsers.filter((u) => u.skills.some((s) => s.willingToMentor)),
        mentorshipRequests,
        requestMentorship,
        completeMentorshipSession,
        addCoupons,
        updateProfile,
        addCertificate,
        addPortfolioItem,
        addSkillJourneyItem,
        verifyCollegeEmail,
        saveUserSkills,
        communities,
        communityPosts,
        createPost,
        toggleLikePost,
        votePoll,
        toggleJoinCommunity,
        joinedCommunities,
        joinCommunity,
        leaveCommunity,
        upvotePost,
        voteOnPoll,
        createCommunityPost,
        competitions,
        userCompetitionSubmissions,
        leaderboard,
        submitCompetitionProject,
        trendingSkills,
        risingSkills,
        globalSearchQuery,
        setGlobalSearchQuery,
        internships,
        applyToInternship,
        userInternshipApplications,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadCount,
        toasts,
        addToast,
        triggerConfetti,
        campusInsights: INITIAL_CAMPUS_INSIGHTS,
        activeDemoStep,
        setActiveDemoStep,
        runDemoStep,
        themeMode,
        setThemeMode,
        themeAccent,
        setThemeAccent,
        themeDensity,
        setThemeDensity,
        isDarkMode,
        toggleThemeMode
      }}
    >
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-3 ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/40'
                : toast.type === 'error'
                ? 'bg-rose-950/90 text-rose-100 border-rose-500/40'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 text-amber-100 border-amber-500/40'
                : 'bg-slate-900/90 text-slate-100 border-slate-700'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-sm leading-tight">{toast.title}</p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
