import {
  UserProfile,
  Gig,
  Community,
  CommunityPost,
  Internship,
  Competition,
  LeaderboardEntry,
  SkillTrend,
  TrendingSkillItem,
  RisingSkillItem,
  NotificationItem,
  Badge,
  CampusInsights
} from '../types';

export const INITIAL_BADGES: Badge[] = [
  { id: 'b1', name: 'Campus Expert', icon: '🥇', category: 'mentor', description: 'Mentored 30+ students with 4.8+ rating', level: 'Gold' },
  { id: 'b2', name: 'Skill Mentor', icon: '🥈', category: 'mentor', description: 'Completed 15+ verified mentorship sessions', level: 'Silver' },
  { id: 'b3', name: 'Campus Guide', icon: '🥉', category: 'mentor', description: 'Helped 5 verified students on campus', level: 'Bronze' },
  { id: 'b4', name: 'New Mentor', icon: '🌱', category: 'mentor', description: 'First student helped successfully' },
  { id: 'b5', name: 'Community Mentor', icon: '💎', category: 'mentor', description: 'Helped 50+ students across colleges', level: 'Diamond' },
  { id: 'b6', name: 'Competition Winner', icon: '🏆', category: 'competition', description: '1st place in official campus weekly challenge' },
  { id: 'b7', name: 'Top Contributor', icon: '🔥', category: 'community', description: 'Over 30+ upvoted community discussions' },
  { id: 'b8', name: 'Consistent Mentor', icon: '🎯', category: 'mentor', description: 'Active 4 consecutive weeks with 100% response rate' },
  { id: 'b9', name: 'Verified Identity', icon: '✓', category: 'trust', description: 'Authenticated with official college institutional email' },
];

export const CURRENT_STUDENT_USER: UserProfile = {
  id: 'usr_siddhant',
  name: 'Siddhant',
  email: 'siddhant.cse@nitandhra.ac.in',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  college: 'NIT Andhra Pradesh',
  branch: 'Computer Science & Engineering',
  year: '3rd Year',
  bio: 'Full-stack developer & Python enthusiast at NIT Andhra Pradesh. Passionate about helping peers with open-source projects, automation, and backend architectures. 3x Hackathon finalist.',
  isVerifiedStudent: true,
  verifiedEmailDomain: 'nitandhra.ac.in',
  role: 'student',
  reputationScore: 88,
  skills: [
    { name: 'Python', category: 'Software & Development', level: 'Advanced', willingToMentor: true, availability: 'Weekends only', yearsExp: 3 },
    { name: 'Machine Learning', category: 'AI, Data & Emerging Technology', level: 'Intermediate', willingToMentor: true, availability: 'Evenings only', yearsExp: 2 },
    { name: 'Web Development', category: 'Software & Development', level: 'Advanced', willingToMentor: true, availability: 'Yes, I\'m available', yearsExp: 2 },
    { name: 'Generative AI', category: 'AI, Data & Emerging Technology', level: 'Intermediate', willingToMentor: false, availability: 'Maybe later', yearsExp: 1 },
    { name: 'Database Management', category: 'Software & Development', level: 'Advanced', willingToMentor: true, availability: 'Weekends only', yearsExp: 2 }
  ],
  interests: ['FastAPI Microservices', 'Autonomous AI Agents', 'Prompt Engineering', 'Robotics Systems', 'FinTech'],
  portfolio: [
    {
      id: 'p1',
      title: 'NIT Andhra Campus Food Delivery & Hostel Utility App',
      description: 'A real-time hostel food ordering bot and web application with WebSocket alerts used by 450+ campus residents.',
      skillUsed: 'Web Development',
      date: 'Jan 2026',
      link: 'https://github.com/siddhant-nitap/campus-eats',
      githubUrl: 'https://github.com/siddhant-nitap/campus-eats',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
      mediaType: 'image',
      category: 'Full-Stack Project'
    },
    {
      id: 'p2',
      title: 'Automated Academic Schedule & Exam Scraper',
      description: 'Python script with BeautifulSoup & Selenium to sync NIT Andhra portal updates into Google Calendar automatically.',
      skillUsed: 'Python',
      date: 'Nov 2025',
      githubUrl: 'https://github.com/siddhant-nitap/moodle-sync',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
      mediaType: 'code',
      category: 'Automation'
    },
    {
      id: 'p3',
      title: 'NIT Andhra Fest Video Highlight Reel',
      description: 'Edited 4k 60fps dynamic aftermovie for college cultural festival with sound design and speed ramping.',
      skillUsed: 'Video Editing',
      date: 'Dec 2025',
      link: 'https://youtube.com',
      imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80',
      mediaType: 'video',
      category: 'Creative Work'
    }
  ],
  certificates: [
    {
      id: 'c1',
      courseName: 'Deep Learning Specialization with PyTorch',
      skill: 'Machine Learning',
      issuingOrg: 'DeepLearning.AI / Coursera',
      startDate: '2025-06-01',
      endDate: '2025-09-15',
      issueDate: '2025-09-20',
      credentialId: 'DLAI-PYT-89421',
      verificationLink: 'https://coursera.org/verify/DLAI-PYT-89421',
      isVerified: true
    },
    {
      id: 'c2',
      courseName: 'Advanced Python Architectures & Concurrency',
      skill: 'Python',
      issuingOrg: 'Python Software Foundation Institute',
      startDate: '2025-08-10',
      endDate: '2025-10-25',
      issueDate: '2025-11-02',
      credentialId: 'PSF-ADV-77218',
      verificationLink: 'https://verify.psf.org/cert/77218',
      isVerified: true
    },
    {
      id: 'c3',
      courseName: 'AWS Certified Cloud Practitioner (Student Track)',
      skill: 'DevOps',
      issuingOrg: 'Amazon Web Services',
      startDate: '2025-11-01',
      endDate: '2026-01-10',
      issueDate: '2026-01-15',
      credentialId: 'AWS-CCP-99382',
      verificationLink: 'https://aws.amazon.com/verification',
      isVerified: true
    }
  ],
  skillJourneys: {
    'Python': [
      { id: 'sj1', skillName: 'Python', monthYear: 'August 2025', title: 'Started Learning Python', description: 'Learned syntax, data structures, OOP fundamentals and virtual environments.', type: 'learning' },
      { id: 'sj2', skillName: 'Python', monthYear: 'October 2025', title: 'Completed Fundamentals Course', description: 'Built CLI utilities, file processors, and solved 120+ LeetCode problems in Python.', type: 'course' },
      { id: 'sj3', skillName: 'Python', monthYear: 'December 2025', title: 'Built First Automation Project', description: 'Developed academic portal scraper syncing timetables with Google Calendar for 200+ batchmates.', type: 'project' },
      { id: 'sj4', skillName: 'Python', monthYear: 'January 2026', title: 'Completed Advanced Certification', description: 'Passed PSF Advanced Certification with 96% score covering asyncio & metaprogramming.', type: 'certification' },
      { id: 'sj5', skillName: 'Python', monthYear: 'March 2026', title: 'Started Mentoring Beginners', description: 'Held 1-on-1 peer sessions helping 37 students debug coursework and projects.', type: 'mentoring' }
    ]
  },
  completedGigsCount: 18,
  totalEarnings: 24500,
  studentsMentoredCount: 37,
  couponsBalance: 4,
  referralCode: 'SIDDHANT-NITAP-88',
  referralsCount: 8,
  communityContributionsCount: 34,
  competitionWinsCount: 3,
  badges: [
    INITIAL_BADGES[0], // Campus Expert
    INITIAL_BADGES[1], // Skill Mentor
    INITIAL_BADGES[6], // Top Contributor
    INITIAL_BADGES[5], // Competition Winner
    INITIAL_BADGES[8], // Verified Identity
  ],
  reviews: [
    {
      id: 'rev1',
      mentorId: 'usr_siddhant',
      studentId: 'usr_shivang_kumar',
      studentName: 'Shivang Kumar',
      studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      studentCollege: 'NIT Andhra Pradesh',
      rating: 5,
      comment: 'Siddhant explained asyncio and API pagination so clearly. He reviewed my GitHub repo and gave actionable feedback on our campus IoT backend!',
      skill: 'Python Mentorship',
      date: '2 days ago',
      verifiedInteraction: true,
      sessionDurationMins: 45
    },
    {
      id: 'rev2',
      mentorId: 'usr_siddhant',
      studentId: 'usr_amit_kumar',
      studentName: 'Amit Kumar',
      studentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      studentCollege: 'NIT Andhra Pradesh',
      rating: 5,
      comment: 'Super patient mentor! Helped me debug my OpenCV facial recognition pipeline before the college hackathon.',
      skill: 'Machine Learning Mentorship',
      date: '1 week ago',
      verifiedInteraction: true,
      sessionDurationMins: 60
    }
  ],
  rating: 4.9,
  isPremium: false,
  joinedDate: 'August 2025',
  location: 'Tadepalligudem, Andhra Pradesh'
};

export const OTHER_STUDENTS: UserProfile[] = [
  {
    id: 'usr_shivang_kumar',
    name: 'Shivang Kumar',
    email: 'shivang.ece@nitandhra.ac.in',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    college: 'NIT Andhra Pradesh',
    branch: 'Electronics & Communication Engineering',
    year: '4th Year',
    bio: 'VLSI & Embedded Systems enthusiast at NIT Andhra Pradesh. Gold medalist in Texas Instruments Innovation Challenge. Mentoring students in Verilog, FPGA prototyping, & STM32 firmware.',
    isVerifiedStudent: true,
    verifiedEmailDomain: 'nitandhra.ac.in',
    role: 'mentor',
    reputationScore: 94,
    skills: [
      { name: 'VLSI Design', category: 'Electronics & Engineering', level: 'Expert', willingToMentor: true, availability: 'Weekends only', yearsExp: 3 },
      { name: 'Embedded Systems', category: 'Electronics & Engineering', level: 'Advanced', willingToMentor: true, availability: 'Yes, I\'m available', yearsExp: 3 },
      { name: 'PCB Design', category: 'Electronics & Engineering', level: 'Advanced', willingToMentor: true, availability: 'Evenings only', yearsExp: 2 },
      { name: 'Verilog', category: 'Electronics & Engineering', level: 'Expert', willingToMentor: true, availability: 'Weekends only', yearsExp: 3 }
    ],
    interests: ['ASIC Physical Design', 'FPGA Prototyping', 'Robotics Hardware', 'IoT Gateways'],
    portfolio: [
      {
        id: 'p_shivang1',
        title: '32-Bit RISC-V Microprocessor Core in Verilog',
        description: 'Pipelined 5-stage RISC-V CPU core with hazard detection unit, validated on Xilinx Artix-7 FPGA board.',
        skillUsed: 'VLSI Design',
        date: 'Dec 2025',
        githubUrl: 'https://github.com/shivang-nitap/riscv-core',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
        mediaType: 'code',
        category: 'Hardware Architecture'
      },
      {
        id: 'p_shivang2',
        title: 'IoT Weather Node & Environmental Sensor Grid',
        description: 'Compact 2-layer ESP32 solar node measuring air quality with MQTT live reporting for campus grounds.',
        skillUsed: 'Embedded Systems',
        date: 'Jan 2026',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
        mediaType: 'image',
        category: 'Embedded Systems'
      }
    ],
    certificates: [
      {
        id: 'c_s1',
        courseName: 'Cadence Certified ASIC Physical Design Professional',
        skill: 'VLSI Design',
        issuingOrg: 'Cadence Design Systems',
        startDate: '2025-04-01',
        endDate: '2025-08-30',
        issueDate: '2025-09-05',
        credentialId: 'CAD-ASIC-9921',
        isVerified: true
      }
    ],
    skillJourneys: {
      'VLSI Design': [
        { id: 'sj_s1', skillName: 'VLSI Design', monthYear: 'July 2024', title: 'Digital Circuit Foundations', description: 'Mastered logic design, CMOS gates, and Boolean synthesis.', type: 'learning' },
        { id: 'sj_s2', skillName: 'VLSI Design', monthYear: 'Jan 2025', title: 'FPGA Vivado Labs', description: 'Implemented state machines and UART controllers.', type: 'course' },
        { id: 'sj_s3', skillName: 'VLSI Design', monthYear: 'Aug 2025', title: 'RISC-V Tape-Out Simulation', description: 'Designed 5-stage CPU with 100% test coverage.', type: 'project' },
        { id: 'sj_s4', skillName: 'VLSI Design', monthYear: 'Nov 2025', title: 'Started Peer Mentoring', description: 'Helped 42 students crack core hardware placement tests.', type: 'mentoring' }
      ]
    },
    completedGigsCount: 22,
    totalEarnings: 38000,
    studentsMentoredCount: 42,
    couponsBalance: 7,
    referralCode: 'SHIVANG-NITAP-99',
    referralsCount: 14,
    communityContributionsCount: 52,
    competitionWinsCount: 4,
    badges: [INITIAL_BADGES[0], INITIAL_BADGES[1], INITIAL_BADGES[6], INITIAL_BADGES[8]],
    reviews: [
      {
        id: 'rev_s1',
        mentorId: 'usr_shivang_kumar',
        studentId: 'usr_siddhant',
        studentName: 'Siddhant',
        studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        studentCollege: 'NIT Andhra Pradesh',
        rating: 5,
        comment: 'Shivang helped me understand Verilog testbenches and FPGA clock domains for our campus IoT lab. Extremely knowledgeable and patient!',
        skill: 'VLSI Design Mentorship',
        date: '5 days ago',
        verifiedInteraction: true,
        sessionDurationMins: 60
      }
    ],
    rating: 5.0,
    isPremium: true,
    joinedDate: 'June 2025',
    location: 'Tadepalligudem, Andhra Pradesh'
  }
];

export const INITIAL_GIGS: Gig[] = [
  {
    id: 'gig_1',
    title: 'Need a video editor for college fest aftermovie & viral reels',
    description: 'Looking for a skilled video editor to cut 3 dynamic Instagram reels (30-60s) and a 3-minute highlight aftermovie from raw 4K footage of our cultural fest. Need snappy transitions, beat syncing, and clean color grading.',
    category: 'Creative & Freelancing',
    requiredSkills: ['Video Editing', 'Content Creation'],
    budget: 1200,
    deadline: '2 days',
    locationType: 'Remote',
    urgency: 'Urgent (24-48h)',
    postedBy: {
      id: 'usr_fest_convenor',
      name: 'Kavya Nair',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      college: 'NIT Andhra Pradesh',
      isVerified: true,
      rating: 4.9
    },
    createdAt: '3 hours ago',
    status: 'Open',
    applicantsCount: 6,
    tags: ['Reels', 'Premiere Pro', 'DaVinci', 'Fast Delivery']
  },
  {
    id: 'gig_2',
    title: 'Python Web Scraper & Fast API service for Research Paper Dataset',
    description: 'Need a student proficient in Python (BeautifulSoup/Playwright + FastAPI) to extract structured metrics from arXiv preprint listings and export clean JSON endpoints for an academic research project.',
    category: 'Software & Development',
    requiredSkills: ['Python', 'Web Development', 'API Development'],
    budget: 1800,
    deadline: '4 days',
    locationType: 'Remote',
    urgency: 'Medium',
    postedBy: {
      id: 'usr_dr_sharma',
      name: 'Arjun Mehta',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
      college: 'NIT Andhra Pradesh',
      isVerified: true,
      rating: 4.8
    },
    createdAt: '1 day ago',
    status: 'Open',
    applicantsCount: 4,
    tags: ['Web Scraping', 'FastAPI', 'Research']
  },
  {
    id: 'gig_3',
    title: 'PCB Schematic & 2-Layer Layout Design for IoT Weather Node',
    description: 'Design a compact 2-layer PCB in KiCad using an ESP32-WROOM module, BME280 temperature sensor, LiPo charging circuit (TP4056), and solar power input. Must deliver schematics, layout, and Gerber files.',
    category: 'Electronics & Engineering',
    requiredSkills: ['PCB Design', 'Embedded Systems', 'Circuit Design'],
    budget: 2500,
    deadline: '5 days',
    locationType: 'Remote',
    urgency: 'Medium',
    postedBy: {
      id: 'usr_shivang_kumar',
      name: 'Shivang Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      college: 'NIT Andhra Pradesh',
      isVerified: true,
      rating: 5.0
    },
    createdAt: '6 hours ago',
    status: 'Open',
    applicantsCount: 2,
    tags: ['KiCad', 'ESP32', 'Hardware', 'Gerber']
  },
  {
    id: 'gig_4',
    title: 'Figma UI/UX Prototype for Campus Hackathon Pitch',
    description: 'We need 5 high-fidelity mobile screens designed in Figma for our health-tech app before our hackathon finals this Sunday. Need clean auto-layout and a click-through prototype.',
    category: 'Creative & Freelancing',
    requiredSkills: ['UI/UX Design', 'Graphic Design'],
    budget: 1000,
    deadline: '2 days',
    locationType: 'Remote',
    urgency: 'High',
    postedBy: {
      id: 'usr_siddhant',
      name: 'Siddhant',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      college: 'NIT Andhra Pradesh',
      isVerified: true,
      rating: 4.9
    },
    createdAt: '12 hours ago',
    status: 'Open',
    applicantsCount: 8,
    tags: ['Figma', 'Mobile App', 'Hackathon']
  },
  {
    id: 'gig_5',
    title: 'SolidWorks 3D Model & Stress Simulation for Quadcopter Arm',
    description: 'Model a lightweight carbon-reinforced 3D printed arm for our student robotics team drone. Run FEA static load analysis for 3kg thrust and export STL & STEP files.',
    category: 'Mechanical, Civil & Core Engineering',
    requiredSkills: ['SolidWorks', 'CAD Design', 'ANSYS'],
    budget: 2200,
    deadline: '3 days',
    locationType: 'On-Campus',
    campusLocation: 'NIT Andhra Pradesh Innovation Lab',
    urgency: 'High',
    postedBy: {
      id: 'usr_lead_robotics',
      name: 'Campus Robotics Club',
      avatar: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop&q=80',
      college: 'NIT Andhra Pradesh',
      isVerified: true,
      rating: 4.85
    },
    createdAt: '1 day ago',
    status: 'Open',
    applicantsCount: 3,
    tags: ['Robotics', 'SolidWorks', 'FEA']
  },
  {
    id: 'gig_6',
    title: 'Penetration Testing & Security Audit for Student Council Voting Portal',
    description: 'Perform blackbox web application security audit (OWASP Top 10, SQLi, XSS, CSRF, IDOR check) on our staging election web app and provide a detailed PDF report with remediation steps.',
    category: 'Cybersecurity & Networking',
    requiredSkills: ['Cybersecurity', 'Penetration Testing', 'Ethical Hacking'],
    budget: 3000,
    deadline: '3 days',
    locationType: 'Remote',
    urgency: 'Urgent (24-48h)',
    postedBy: {
      id: 'usr_council_head',
      name: 'Siddharth Rao',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      college: 'NIT Andhra Pradesh',
      isVerified: true,
      rating: 4.95
    },
    createdAt: '5 hours ago',
    status: 'Open',
    applicantsCount: 5,
    tags: ['Security Audit', 'BurpSuite', 'OWASP']
  }
];

export const INITIAL_COMMUNITIES: Community[] = [
  {
    id: 'comm_prog',
    name: 'Programming & Web Dev',
    icon: '💻',
    category: 'Software & Development',
    description: 'DSA, Full-Stack frameworks, Git, open source discussions, architecture patterns and code reviews.',
    membersCount: 1420,
    postsCount: 384,
    isJoined: true,
    featuredMentors: ['Siddhant', 'Shivang Kumar'],
    topTags: ['React', 'Python', 'FastAPI', 'DSA', 'Next.js']
  },
  {
    id: 'comm_aiml',
    name: 'AI, Data & Emerging Tech',
    icon: '🤖',
    category: 'AI, Data & Emerging Technology',
    description: 'Neural networks, PyTorch, Generative AI agent workflows, HuggingFace models, Kaggle competitions.',
    membersCount: 1850,
    postsCount: 512,
    isJoined: true,
    featuredMentors: ['Siddhant', 'Shivang Kumar'],
    topTags: ['PyTorch', 'LLMs', 'PromptEng', 'ComputerVision']
  },
  {
    id: 'comm_cyber',
    name: 'Cybersecurity & Network Defense',
    icon: '🔐',
    category: 'Cybersecurity & Networking',
    description: 'CTF challenges, ethical hacking writeups, malware analysis, network security, and bug bounty hunting.',
    membersCount: 920,
    postsCount: 198,
    isJoined: false,
    featuredMentors: ['Siddhant', 'Shivang Kumar'],
    topTags: ['CTF', 'BurpSuite', 'ReverseEng', 'ZeroDay']
  },
  {
    id: 'comm_vlsi',
    name: 'VLSI & Semiconductor Design',
    icon: '⚡',
    category: 'Electronics & Engineering',
    description: 'RTL Verilog/SystemVerilog, FPGA development, static timing analysis, ASIC tape-outs and chip design.',
    membersCount: 780,
    postsCount: 165,
    isJoined: true,
    featuredMentors: ['Shivang Kumar'],
    topTags: ['Verilog', 'UVM', 'FPGA', 'ASIC', 'Cadence']
  },
  {
    id: 'comm_embedded',
    name: 'Embedded Systems & IoT',
    icon: '🔌',
    category: 'Electronics & Engineering',
    description: 'STM32 microcontrollers, RTOS, PCB layout, sensor integration, ESP32 automation & robotics firmware.',
    membersCount: 840,
    postsCount: 220,
    isJoined: false,
    featuredMentors: ['Shivang Kumar', 'Siddhant'],
    topTags: ['STM32', 'FreeRTOS', 'KiCad', 'ESP32', 'Robotics']
  },
  {
    id: 'comm_design',
    name: 'Design & Visual Arts',
    icon: '🎨',
    category: 'Creative & Freelancing',
    description: 'UI/UX Figma systems, typography, design critiques, 3D Blender renders, product branding & poster design.',
    membersCount: 1150,
    postsCount: 340,
    isJoined: false,
    featuredMentors: ['Siddhant'],
    topTags: ['Figma', 'UIUX', 'Branding', 'Blender', 'DesignSystem']
  },
  {
    id: 'comm_content',
    name: 'Video & Content Creation',
    icon: '🎥',
    category: 'Creative & Freelancing',
    description: 'Shorts/Reels viral editing, color grading, sound engineering, podcast production, and creator monetization.',
    membersCount: 960,
    postsCount: 210,
    isJoined: false,
    featuredMentors: ['Siddhant', 'Shivang Kumar'],
    topTags: ['PremierePro', 'DaVinci', 'ReelsPacing', 'AfterEffects']
  },
  {
    id: 'comm_core_mech',
    name: 'Core Engineering & CAD',
    icon: '⚙️',
    category: 'Mechanical, Civil & Core Engineering',
    description: 'SolidWorks, ANSYS FEA/CFD, 3D printing, Electric Vehicles, Formula Student design and structural analysis.',
    membersCount: 890,
    postsCount: 245,
    isJoined: false,
    featuredMentors: ['Shivang Kumar'],
    topTags: ['SolidWorks', 'ANSYS', 'EVTech', '3DPrinting']
  },
  {
    id: 'comm_business',
    name: 'Business, Analytics & Finance',
    icon: '📊',
    category: 'Business & Professional',
    description: 'Case studies, financial modeling, product management teardowns, consulting decks & SQL analytics.',
    membersCount: 1040,
    postsCount: 280,
    isJoined: false,
    featuredMentors: ['Siddhant'],
    topTags: ['ProductMgmt', 'FinancialModel', 'Consulting', 'Tableau']
  },
  {
    id: 'comm_startups',
    name: 'Campus Startups & Incubation',
    icon: '🚀',
    category: 'Business & Professional',
    description: 'Pitch decks, finding student co-founders, grant applications, MVP validation, and seed fundraising.',
    membersCount: 1220,
    postsCount: 310,
    isJoined: true,
    featuredMentors: ['Siddhant', 'Shivang Kumar'],
    topTags: ['Startup', 'PitchDeck', 'CoFounders', 'MVP']
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post_1',
    communityId: 'comm_aiml',
    author: {
      id: 'usr_siddhant',
      name: 'Siddhant',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      college: 'NIT Andhra Pradesh',
      isVerified: true,
      badge: '🥇 Campus Expert'
    },
    title: 'How to build your first local RAG pipeline with PyTorch & ChromaDB (No expensive APIs)',
    content: 'A lot of juniors were asking during mentorship how to index their lecture PDFs without burning OpenAI credits. Here is a step-by-step architecture using open-source sentence-transformers and Ollama with local Llama 3 8B. Drop questions below and I will review your implementations!',
    tags: ['Generative AI', 'Python', 'Open Source', 'Tutorial'],
    likesCount: 68,
    commentsCount: 24,
    isLikedByMe: true,
    createdAt: '4 hours ago',
    type: 'discussion'
  },
  {
    id: 'post_2',
    communityId: 'comm_vlsi',
    author: {
      id: 'usr_shivang_kumar',
      name: 'Shivang Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      college: 'NIT Andhra Pradesh',
      isVerified: true,
      badge: '⚡ VLSI Mentor'
    },
    title: 'Poll: Which HDL do you think campus recruiters value the most for Core Hardware roles?',
    content: 'We are organizing an inter-college RTL workshop next week at NIT Andhra Pradesh. Vote on the primary language you want us to focus on for ASIC and FPGA verification labs:',
    tags: ['VLSI Design', 'Career', 'Hardware'],
    likesCount: 42,
    commentsCount: 15,
    createdAt: '1 day ago',
    type: 'poll',
    pollOptions: [
      { id: 'opt1', text: 'SystemVerilog (with UVM methodology)', votes: 84, userVoted: true },
      { id: 'opt2', text: 'Verilog HDL (Synthesizable RTL)', votes: 52 },
      { id: 'opt3', text: 'VHDL (Defense & Aerospace standard)', votes: 14 },
      { id: 'opt4', text: 'Chisel / SpinalHDL (Scala-based HDLs)', votes: 9 }
    ]
  },
  {
    id: 'post_3',
    communityId: 'comm_design',
    author: {
      id: 'usr_siddhant',
      name: 'Siddhant',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      college: 'NIT Andhra Pradesh',
      isVerified: true,
      badge: '🎨 UI/UX Mentor'
    },
    title: 'Free Figma UI Design System Kit tailored for student hackathon projects 🚀',
    content: 'I packaged 120+ pre-built mobile components, accessible dark/light palettes, and auto-layout cards designed specifically for pitching web3, edtech, and AI apps in 36-hour hackathons. Feel free to duplicate and use!',
    tags: ['UI/UX Design', 'Figma', 'Free Resources', 'Hackathon'],
    likesCount: 94,
    commentsCount: 31,
    isLikedByMe: false,
    createdAt: '2 days ago',
    type: 'resource'
  }
];

export const INITIAL_INTERNSHIPS: Internship[] = [
  {
    id: 'int_1',
    title: 'AI Systems & Backend Engineering Intern',
    companyName: 'Vertex AI Labs (Bengaluru)',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    companyType: 'Startup',
    location: 'Bengaluru / Hybrid',
    workType: 'Hybrid',
    stipend: '₹45,000 / month',
    duration: '3 - 6 Months',
    requiredSkills: ['Python', 'FastAPI', 'Generative AI', 'Database Management'],
    description: 'Work alongside core researchers deploying autonomous AI agent pipelines and vector retrieval architectures. High Pre-Placement Offer (PPO) conversion rate for standout performers.',
    eligibility: '3rd & 4th Year B.Tech / M.Tech in CS, IT, ECE or equivalent with strong GitHub portfolio.',
    openings: 3,
    deadline: 'In 5 days',
    isVerifiedRecruiter: true,
    applicantsCount: 42,
    postedDate: '2 days ago',
    recruiterId: 'rec_vertex_labs'
  },
  {
    id: 'int_2',
    title: 'RTL Design & Silicon Verification Intern',
    companyName: 'SiliconWave Microelectronics',
    companyLogo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&auto=format&fit=crop&q=80',
    companyType: 'MNC',
    location: 'Hyderabad, Telangana',
    workType: 'On-site',
    stipend: '₹50,000 / month',
    duration: '6 Months (Summer)',
    requiredSkills: ['VLSI Design', 'Verilog', 'SystemVerilog', 'Digital Electronics'],
    description: 'Assist in writing synthesizable Verilog modules and UVM testbenches for next-gen PCIe 6.0 and DDR5 memory interface controllers. Hands-on Cadence toolsuite exposure.',
    eligibility: '3rd/4th Year ECE, EEE or VLSI specialization with verified certificates.',
    openings: 2,
    deadline: 'In 9 days',
    isVerifiedRecruiter: true,
    applicantsCount: 28,
    postedDate: '3 days ago',
    recruiterId: 'rec_siliconwave'
  },
  {
    id: 'int_3',
    title: 'UI/UX Product Design & Motion Intern',
    companyName: 'Razorpay Campus Guild',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&auto=format&fit=crop&q=80',
    companyType: 'MNC',
    location: 'Remote (Any Campus)',
    workType: 'Remote',
    stipend: '₹35,000 / month',
    duration: '3 Months',
    requiredSkills: ['UI/UX Design', 'Graphic Design', 'Video Editing'],
    description: 'Design intuitive merchant checkout flows, student payment interfaces, and dynamic motion assets. Work directly with Senior Product Designers.',
    eligibility: 'Open to all college years. Portfolio with case studies mandatory.',
    openings: 4,
    deadline: 'In 3 days',
    isVerifiedRecruiter: true,
    applicantsCount: 65,
    postedDate: '1 day ago',
    recruiterId: 'rec_razorpay'
  },
  {
    id: 'int_4',
    title: 'Robotics Mechanical Design Intern (EV Powertrain)',
    companyName: 'Apex HyperMotion Dynamics',
    companyLogo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop&q=80',
    companyType: 'Startup',
    location: 'Pune / On-site',
    workType: 'On-site',
    stipend: '₹30,000 / month',
    duration: '4 Months',
    requiredSkills: ['SolidWorks', 'ANSYS', 'CAD Design', 'Electric Vehicle Technology'],
    description: 'Collaborate with the hardware dynamics team on CAD packaging, thermal cooling channels for EV battery packs, and rapid 3D prototyping.',
    eligibility: 'Mechanical, Production or Automobile engineering students.',
    openings: 2,
    deadline: 'In 7 days',
    isVerifiedRecruiter: true,
    applicantsCount: 19,
    postedDate: '4 days ago',
    recruiterId: 'rec_apex_robotics'
  }
];

export const INITIAL_COMPETITIONS: Competition[] = [
  {
    id: 'comp_python',
    title: '🐍 Campus Python Automation & Scraping Challenge #14',
    skill: 'Python',
    category: 'Software & Development',
    bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    description: 'Build an automated CLI or web utility that solves a tangible campus pain point (e.g. library seat availability, canteen queue prediction, hostel laundry tracker). Clean code, PEP8 compliance, and README documentation evaluated.',
    rules: [
      'Must use Python 3.10+ and provide reproducible requirements.txt',
      'Original open-source student submission with GitHub repository',
      'Include a 60-second video demo or GIF walkthrough in README',
      'Zero plagiarism: All submissions checked via automated AST diff'
    ],
    deadline: 'Sunday, 11:59 PM (2 days left)',
    startsAt: 'Active Now',
    participantsCount: 148,
    status: 'Active',
    prizes: {
      first: '₹5,000 Cash + 3 Mentor Coupons + 🏆 Gold Badge',
      second: '₹2,500 Cash + 2 Mentor Coupons + 🥈 Silver Badge',
      third: '₹1,000 Cash + 2 Mentor Coupons + 🥉 Bronze Badge',
      coupons: 3,
      xp: 500
    },
    leaderboardPreview: [
      { rank: 1, studentName: 'Siddhant', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', college: 'NIT Andhra Pradesh', score: 98 },
      { rank: 2, studentName: 'Shivang Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', college: 'NIT Andhra Pradesh', score: 95 }
    ]
  },
  {
    id: 'comp_web',
    title: '🌐 Micro-SaaS Frontend Sprint: Interactive Dashboard',
    skill: 'Web Development',
    category: 'Software & Development',
    bannerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    description: 'Design and deploy an interactive analytics dashboard in React/Vue with smooth chart animations, responsive dark mode, and zero external layout flaws.',
    rules: [
      'Responsive down to 360px mobile viewport',
      'Must incorporate at least 3 custom data visualizations',
      'Lighthouse performance score ≥ 90'
    ],
    deadline: 'Next Wednesday, 6:00 PM',
    startsAt: 'Active Now',
    participantsCount: 210,
    status: 'Active',
    prizes: {
      first: '₹6,000 Cash + 3 Mentor Coupons + Recruiter Fast-Track',
      second: '₹3,000 Cash + 2 Mentor Coupons',
      third: '₹1,500 Cash + 2 Mentor Coupons',
      coupons: 3,
      xp: 600
    },
    leaderboardPreview: [
      { rank: 1, studentName: 'Siddhant', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', college: 'NIT Andhra Pradesh', score: 97 },
      { rank: 2, studentName: 'Shivang Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', college: 'NIT Andhra Pradesh', score: 94 }
    ]
  },
  {
    id: 'comp_vlsi',
    title: '⚡ Hardware RTL Challenge: Pipelined ALU with Booth Multiplier',
    skill: 'VLSI Design',
    category: 'Electronics & Engineering',
    bannerImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    description: 'Implement a 32-bit arithmetic logic unit incorporating a Radix-4 Booth Multiplier with minimal gate count and optimized propagation delay in synthesizable Verilog.',
    rules: [
      'Self-checking testbench required with 1000+ randomized test vectors',
      'Must report maximum frequency and logic gate count',
      'Simulation logs must show zero timing hazards'
    ],
    deadline: 'In 6 days',
    startsAt: 'Active Now',
    participantsCount: 82,
    status: 'Active',
    prizes: {
      first: '₹7,500 Cash + SiliconWave Direct Interview + 3 Coupons',
      second: '₹4,000 Cash + 2 Coupons',
      third: '₹2,000 Cash + 2 Coupons',
      coupons: 3,
      xp: 750
    },
    leaderboardPreview: [
      { rank: 1, studentName: 'Shivang Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', college: 'NIT Andhra Pradesh', score: 99 },
      { rank: 2, studentName: 'Siddhant', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', college: 'NIT Andhra Pradesh', score: 96 }
    ]
  }
];

export const INITIAL_LEADERBOARD_WEEKLY: LeaderboardEntry[] = [
  {
    id: 'lead_1',
    rank: 1,
    studentId: 'usr_shivang_kumar',
    userId: 'usr_shivang_kumar',
    name: 'Shivang Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    college: 'NIT Andhra Pradesh',
    branch: 'B.Tech Electronics & Communication',
    reputationScore: 98,
    points: 1420,
    completedGigs: 6,
    gigsCompleted: 6,
    studentsMentored: 8,
    mentoredCount: 8,
    badges: ['🥇 Campus Expert', '⚡ VLSI Lead', '🛡️ Trusted Mentor'],
    badgesAwarded: ['🥇 Campus Expert', '⚡ VLSI Lead', '🛡️ Trusted Mentor'],
    rewardsCoupon: 3
  },
  {
    id: 'lead_2',
    rank: 2,
    studentId: 'usr_siddhant',
    userId: 'usr_siddhant',
    name: 'Siddhant (You)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    college: 'NIT Andhra Pradesh',
    branch: 'B.Tech Computer Science',
    reputationScore: 88,
    points: 1290,
    completedGigs: 5,
    gigsCompleted: 5,
    studentsMentored: 7,
    mentoredCount: 7,
    badges: ['🥇 Campus Expert', '🐍 Python Lead', '⚡ Hackathon Star'],
    badgesAwarded: ['🥇 Campus Expert', '🐍 Python Lead', '⚡ Hackathon Star'],
    rewardsCoupon: 2,
    isCurrentUser: true
  }
];

export const INITIAL_TRENDING_SKILLS_DATA: TrendingSkillItem[] = [
  {
    skillName: 'Generative AI & LLM Fine-Tuning',
    category: 'AI, Data & Emerging Technology',
    growthRate: '+148%',
    growthPercentage: 148,
    gigCount: 48,
    activeGigs: 48,
    avgStipend: '₹3,500 / project',
    searchVolume: 3420,
    demandLevel: 'Explosive'
  },
  {
    skillName: 'Video Editing & Motion Graphics',
    category: 'Creative & Freelancing',
    growthRate: '+112%',
    growthPercentage: 112,
    gigCount: 64,
    activeGigs: 64,
    avgStipend: '₹1,500 / reel',
    searchVolume: 4180,
    demandLevel: 'Explosive'
  },
  {
    skillName: 'VLSI Design & SystemVerilog',
    category: 'Electronics & Engineering',
    growthRate: '+86%',
    growthPercentage: 86,
    gigCount: 32,
    activeGigs: 32,
    avgStipend: '₹4,000 / project',
    searchVolume: 1950,
    demandLevel: 'Very High'
  },
  {
    skillName: 'Full-Stack Web (React & Node)',
    category: 'Software & Development',
    growthRate: '+74%',
    growthPercentage: 74,
    gigCount: 115,
    activeGigs: 115,
    avgStipend: '₹2,500 / project',
    searchVolume: 5600,
    demandLevel: 'Very High'
  },
  {
    skillName: 'Cybersecurity & CTF Defense',
    category: 'Cybersecurity & Networking',
    growthRate: '+68%',
    growthPercentage: 68,
    gigCount: 28,
    activeGigs: 28,
    avgStipend: '₹3,200 / audit',
    searchVolume: 2100,
    demandLevel: 'High'
  },
  {
    skillName: 'SolidWorks & 3D Prototyping',
    category: 'Mechanical, Civil & Core Engineering',
    growthRate: '+55%',
    growthPercentage: 55,
    gigCount: 34,
    activeGigs: 34,
    avgStipend: '₹2,800 / model',
    searchVolume: 1840,
    demandLevel: 'High'
  }
];

export const INITIAL_RISING_SKILLS_DATA: RisingSkillItem[] = [
  {
    skillName: 'Autonomous AI Agents (LangGraph & CrewAI)',
    category: 'AI, Data & Emerging Technology',
    predictedGrowth: '+185% Next Month',
    reason: 'Heavy influx of enterprise startup hackathons requiring automated researcher and code reviewing agents.',
    confidenceScore: 98
  },
  {
    skillName: 'Rust for Embedded & Systems',
    category: 'Software & Development',
    predictedGrowth: '+120% Next Month',
    reason: 'Campus robotics clubs and drone hardware teams transitioning firmware from C/C++ to memory-safe Rust.',
    confidenceScore: 92
  },
  {
    skillName: '3D Spline & Interactive Three.js Design',
    category: 'Design, UI/UX & Media',
    predictedGrowth: '+95% Next Month',
    reason: 'Top collegiate cultural and tech festivals revamping web portals with WebGL spatial landing screens.',
    confidenceScore: 89
  },
  {
    skillName: 'Cloud Infrastructure As Code (Terraform)',
    category: 'Cybersecurity & Networking',
    predictedGrowth: '+78% Next Month',
    reason: 'Increasing demand for automated cloud cluster provisioning during campus recruitment drives.',
    confidenceScore: 87
  }
];

export const INITIAL_TRENDING_SKILLS: SkillTrend[] = [
  { skillName: 'Generative AI & AI Agents', category: 'AI, Data & Emerging Technology', growthPercentage: 148, activeGigs: 48, avgStipend: '₹3,500 / project', demandLevel: 'Explosive', prediction: 'Projected +65% surge as campus startup incubators demand RAG & agentic tooling.', confidenceScore: 96 },
  { skillName: 'Video Editing & Short-form Reels', category: 'Creative & Freelancing', growthPercentage: 112, activeGigs: 64, avgStipend: '₹1,200 / reel', demandLevel: 'Explosive', prediction: 'High recurring gig frequency for college fests, student creators, and agency clients.', confidenceScore: 94 },
  { skillName: 'VLSI Design & SystemVerilog', category: 'Electronics & Engineering', growthPercentage: 86, activeGigs: 32, avgStipend: '₹4,000 / project', demandLevel: 'Very High', prediction: 'Rising semiconductor fab investments in India driving intensive campus hiring.', confidenceScore: 91 },
  { skillName: 'Full-Stack Web Development', category: 'Software & Development', growthPercentage: 74, activeGigs: 115, avgStipend: '₹2,500 / project', demandLevel: 'Very High', prediction: 'Evergreen campus foundation across hackathons, startup MVPs, and student clubs.', confidenceScore: 98 },
  { skillName: 'Cybersecurity & Pen-Testing', category: 'Cybersecurity & Networking', growthPercentage: 68, activeGigs: 28, avgStipend: '₹3,200 / audit', demandLevel: 'High', prediction: 'Universities mandating security audits on student voting portals and event apps.', confidenceScore: 89 },
  { skillName: 'SolidWorks & 3D Prototyping', category: 'Mechanical, Civil & Core Engineering', growthPercentage: 55, activeGigs: 34, avgStipend: '₹2,800 / model', demandLevel: 'High', prediction: 'Booming drone hardware and EV student teams demanding custom CAD models.', confidenceScore: 88 }
];

export const INITIAL_CAMPUS_INSIGHTS: CampusInsights = {
  totalStudents: 4280,
  totalGigsPosted: 1240,
  completedGigs: 934,
  totalEarningsDistributed: 874000, // ₹8.74L
  totalMentorshipSessions: 1820,
  demandVsSupply: [
    { skill: 'AI/ML & Generative AI', demand: 95, supply: 62 },
    { skill: 'Web Development', demand: 92, supply: 88 },
    { skill: 'Video Editing', demand: 90, supply: 54 },
    { skill: 'Cybersecurity', demand: 78, supply: 41 },
    { skill: 'VLSI & Embedded', demand: 82, supply: 48 },
    { skill: 'UI/UX Design', demand: 86, supply: 70 },
    { skill: 'CAD & SolidWorks', demand: 72, supply: 50 }
  ],
  topColleges: [
    { college: 'NIT Andhra Pradesh', studentsCount: 840, gigsCount: 290 },
    { college: 'IIT Bombay', studentsCount: 620, gigsCount: 210 },
    { college: 'NIT Trichy', studentsCount: 580, gigsCount: 195 },
    { college: 'BITS Pilani', studentsCount: 490, gigsCount: 165 },
    { college: 'IIIT Hyderabad', studentsCount: 450, gigsCount: 140 },
    { college: 'NID Ahmedabad', studentsCount: 380, gigsCount: 130 }
  ]
};

export const CAMPUS_INSIGHTS_DATA = INITIAL_CAMPUS_INSIGHTS;

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: '🎟️ Mentor Coupon Earned!',
    message: 'You unlocked 1 Mentor Coupon because your peer Shivang Kumar successfully verified his institutional college email.',
    timestamp: '15 mins ago',
    type: 'coupon',
    isRead: false,
    actionUrl: 'coupons',
    actionText: 'View Balance'
  },
  {
    id: 'n2',
    title: '🤝 Mentorship Request Received',
    message: 'Shivang Kumar (ECE 4th Year) requested a 45-min Python & FastAPI integration review session with you.',
    timestamp: '1 hour ago',
    type: 'mentor',
    isRead: false,
    actionUrl: 'mentors',
    actionText: 'Respond Now'
  },
  {
    id: 'n3',
    title: '🎯 Recommended Gig for Your Skills',
    message: 'New gig posted: "Python Web Scraper & Fast API service for Research Paper Dataset" matches your Advanced Python skill.',
    timestamp: '3 hours ago',
    type: 'gig',
    isRead: false,
    actionUrl: 'gigs',
    actionText: 'Apply (₹1,800)'
  },
  {
    id: 'n4',
    title: '🏆 Weekly Leaderboard Update',
    message: 'You are currently #2 on the Weekly Campus Leaderboard (1,290 pts). Finish 1 more gig to claim #1!',
    timestamp: '5 hours ago',
    type: 'competition',
    isRead: true,
    actionUrl: 'leaderboard',
    actionText: 'Check Ranks'
  },
  {
    id: 'n5',
    title: '💼 New Internship Opening',
    message: 'Vertex AI Labs posted "AI Systems & Backend Engineering Intern" (₹45,000/mo) matching your skills.',
    timestamp: '1 day ago',
    type: 'internship',
    isRead: true,
    actionUrl: 'career',
    actionText: 'View Details'
  }
];
