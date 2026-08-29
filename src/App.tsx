import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { InteractiveTourBanner } from './components/InteractiveTourBanner';
import { Footer } from './components/Footer';
import { SidebarChatbot } from './components/SidebarChatbot';

// Pages
import { LandingPage } from './pages/LandingPage';
import { ExplorePage } from './pages/ExplorePage';
import { GigsPage } from './pages/GigsPage';
import { MentorsPage } from './pages/MentorsPage';
import { StudentProfilePage } from './pages/StudentProfilePage';
import { CommunitiesPage } from './pages/CommunitiesPage';
import { CompetitionsPage } from './pages/CompetitionsPage';
import { CareerHubPage } from './pages/CareerHubPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { TrendingSkillsPage } from './pages/TrendingSkillsPage';
import { CampusInsightsPage } from './pages/CampusInsightsPage';
import { ReputationDashboardPage } from './pages/ReputationDashboardPage';
import { CouponsPage } from './pages/CouponsPage';
import { ReferralPage } from './pages/ReferralPage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { OnboardingModal } from './pages/OnboardingModal';
import { VerificationModal } from './pages/VerificationModal';

const MainContent: React.FC = () => {
  const { currentPage, isDarkMode, themeAccent } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'explore':
        return <ExplorePage />;
      case 'gigs':
        return <GigsPage />;
      case 'mentors':
        return <MentorsPage />;
      case 'profile':
        return <StudentProfilePage />;
      case 'communities':
        return <CommunitiesPage />;
      case 'competitions':
        return <CompetitionsPage />;
      case 'career':
        return <CareerHubPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'trending':
        return <TrendingSkillsPage />;
      case 'insights':
        return <CampusInsightsPage />;
      case 'reputation':
        return <ReputationDashboardPage />;
      case 'coupons':
        return <CouponsPage />;
      case 'referral':
        return <ReferralPage />;
      case 'subscriptions':
        return <SubscriptionPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'onboarding':
        return <OnboardingModal />;
      case 'verify_email':
        return <VerificationModal />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#0b0f19] font-sans text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* Global Interactive Demo Tour Bar */}
      <InteractiveTourBanner />

      {/* Global Top Navbar */}
      <Navbar />

      {/* Main Page Dynamic Router */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Site-wide Footer */}
      <Footer />

      {/* Sideways AI Chatbot Assistant */}
      <SidebarChatbot />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
