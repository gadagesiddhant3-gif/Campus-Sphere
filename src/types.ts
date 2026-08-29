export type UserRole = 'student' | 'mentor' | 'recruiter' | 'admin';

export type SkillCategory = 
  | 'Software & Development'
  | 'AI, Data & Emerging Technology'
  | 'Cybersecurity & Networking'
  | 'Electronics & Engineering'
  | 'Mechanical, Civil & Core Engineering'
  | 'Business & Professional'
  | 'Creative & Freelancing';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type MentorAvailability = 'Yes, I\'m available' | 'Weekends only' | 'Evenings only' | 'Maybe later' | 'No';

export interface UserSkill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  willingToMentor: boolean;
  availability?: MentorAvailability;
  hourlyRate?: number; // In ₹ or coupon basis
  yearsExp?: number;
}

export interface SkillJourneyItem {
  id: string;
  skillName: string;
  monthYear: string;
  title: string;
  description: string;
  type: 'learning' | 'course' | 'project' | 'certification' | 'mentoring' | 'competition';
}

export interface Certificate {
  id: string;
  courseName: string;
  skill: string;
  issuingOrg: string;
  startDate: string;
  endDate: string;
  issueDate: string;
  credentialId: string;
  verificationLink?: string;
  isVerified: boolean;
  certificateUrl?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  skillUsed: string;
  date: string;
  link?: string;
  githubUrl?: string;
  imageUrl?: string;
  mediaType: 'image' | 'video' | 'document' | 'code';
  category: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  category: 'mentor' | 'reputation' | 'competition' | 'community' | 'trust';
  description: string;
  unlockedAt?: string;
  level?: string;
}

export interface MentorReview {
  id: string;
  mentorId: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentCollege: string;
  rating: number;
  comment: string;
  skill: string;
  date: string;
  verifiedInteraction: boolean;
  sessionDurationMins?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  college: string;
  branch: string;
  year: string;
  bio: string;
  isVerifiedStudent: boolean;
  verifiedEmailDomain?: string;
  role: UserRole;
  reputationScore: number; // 0-100
  skills: UserSkill[];
  interests: string[];
  portfolio: PortfolioItem[];
  certificates: Certificate[];
  skillJourneys: Record<string, SkillJourneyItem[]>;
  completedGigsCount: number;
  totalEarnings: number; // in ₹
  studentsMentoredCount: number;
  couponsBalance: number;
  referralCode: string;
  referralsCount: number;
  communityContributionsCount: number;
  competitionWinsCount: number;
  badges: Badge[];
  reviews: MentorReview[];
  rating: number; // average mentor/gig rating
  isPremium: boolean;
  joinedDate: string;
  location: string;
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  category: SkillCategory;
  requiredSkills: string[];
  budget: number; // in ₹
  deadline: string;
  locationType: 'Remote' | 'On-Campus' | 'Hybrid';
  campusLocation?: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Urgent (24-48h)';
  postedBy: {
    id: string;
    name: string;
    avatar: string;
    college: string;
    isVerified: boolean;
    rating: number;
  };
  createdAt: string;
  status: 'Open' | 'In Progress' | 'Completed' | 'Closed';
  applicantsCount: number;
  attachments?: string[];
  tags: string[];
}

export interface GigApplication {
  id: string;
  gigId: string;
  applicantId: string;
  applicant: UserProfile;
  pitch: string;
  proposedBudget: number;
  estimatedDelivery: string;
  createdAt: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed';
}

export interface MentorshipRequest {
  id: string;
  mentorId: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  mentorName: string;
  mentorAvatar: string;
  skill: string;
  topic: string;
  preferredTime: string;
  couponsUsed: number;
  status: 'Pending' | 'Accepted' | 'Completed' | 'Declined';
  createdAt: string;
  meetLink?: string;
  notes?: string;
}

export interface CommunityPost {
  id: string;
  communityId: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    college: string;
    isVerified: boolean;
    badge?: string;
  };
  title: string;
  content: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  isLikedByMe?: boolean;
  createdAt: string;
  type: 'discussion' | 'question' | 'poll' | 'event' | 'resource';
  pollOptions?: { id: string; text: string; votes: number; userVoted?: boolean }[];
  mediaUrl?: string;
}

export interface Community {
  id: string;
  name: string;
  icon: string;
  category: SkillCategory;
  description: string;
  membersCount: number;
  postsCount: number;
  isJoined?: boolean;
  featuredMentors: string[];
  topTags: string[];
}

export interface Internship {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  companyType: 'Startup' | 'MNC' | 'Research Lab' | 'Campus Venture';
  location: string;
  workType: 'Remote' | 'On-site' | 'Hybrid';
  stipend: string;
  duration: string;
  requiredSkills: string[];
  description: string;
  eligibility: string;
  openings: number;
  deadline: string;
  isVerifiedRecruiter: boolean;
  applicantsCount: number;
  postedDate: string;
  recruiterId: string;
}

export interface Competition {
  id: string;
  title: string;
  skill: string;
  category: SkillCategory;
  bannerImage: string;
  description: string;
  rules: string[];
  deadline: string;
  startsAt: string;
  participantsCount: number;
  status: 'Active' | 'Upcoming' | 'Completed';
  prizes: {
    first: string;
    second: string;
    third: string;
    coupons: number;
    xp: number;
  };
  leaderboardPreview: {
    rank: number;
    studentName: string;
    avatar: string;
    college: string;
    score: number;
  }[];
}

export interface LeaderboardEntry {
  id?: string;
  rank: number;
  studentId: string;
  userId?: string;
  name: string;
  avatar: string;
  college: string;
  branch?: string;
  reputationScore?: number;
  points: number;
  completedGigs?: number;
  gigsCompleted: number;
  studentsMentored: number;
  mentoredCount?: number;
  badges: string[];
  badgesAwarded?: string[];
  rewardsCoupon: number;
  isCurrentUser?: boolean;
}

export interface TrendingSkillItem {
  skillName: string;
  category: string;
  growthRate: string;
  growthPercentage?: number;
  gigCount: number;
  activeGigs?: number;
  avgStipend: string;
  searchVolume: number;
  demandLevel?: 'Very High' | 'High' | 'Moderate' | 'Explosive';
}

export interface RisingSkillItem {
  skillName: string;
  category: string;
  predictedGrowth: string;
  reason: string;
  confidenceScore?: number;
}

export interface SkillTrend {
  skillName: string;
  category: SkillCategory;
  growthPercentage: number;
  activeGigs: number;
  avgStipend: string;
  demandLevel: 'Very High' | 'High' | 'Moderate' | 'Explosive';
  prediction: string;
  confidenceScore: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'gig' | 'mentor' | 'coupon' | 'badge' | 'competition' | 'internship' | 'community' | 'system';
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeAccent = 'indigo' | 'emerald' | 'violet' | 'amber' | 'rose' | 'ocean';
export type ThemeDensity = 'comfortable' | 'compact';

export interface ThemeSettings {
  mode: ThemeMode;
  accent: ThemeAccent;
  density: ThemeDensity;
}

export interface DemandVsSupplyItem {
  skill: string;
  demand: number;
  supply: number;
}

export interface TopCollegeInsight {
  college: string;
  studentsCount: number;
  gigsCount: number;
}

export interface CampusInsights {
  totalStudents: number;
  totalGigsPosted: number;
  completedGigs: number;
  totalEarningsDistributed: number;
  totalMentorshipSessions: number;
  demandVsSupply: DemandVsSupplyItem[];
  topColleges: TopCollegeInsight[];
}

