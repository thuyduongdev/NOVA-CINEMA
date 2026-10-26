import React from 'react';
import { CinemaProvider, useCinema } from './context/CinemaContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Client Screens
import { HomeScreen } from './screens/HomeScreen';
import { MovieCatalogScreen } from './screens/MovieCatalogScreen';
import { MovieDetailScreen } from './screens/MovieDetailScreen';
import { ScheduleScreen } from './screens/ScheduleScreen';
import { SeatSelectionScreen } from './screens/SeatSelectionScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { MyTicketsScreen } from './screens/MyTicketsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ContactScreen } from './screens/ContactScreen';
import { AboutScreen } from './screens/AboutScreen';
import { PricingScreen } from './screens/PricingScreen';
import { AuthScreen } from './screens/AuthScreen';

// Admin Screens
import { AdminOverviewScreen } from './screens/admin/AdminOverviewScreen';
import { AdminScheduleScreen } from './screens/admin/AdminScheduleScreen';
import { AdminMoviesScreen } from './screens/admin/AdminMoviesScreen';

const MainContent: React.FC = () => {
  const { currentView, navigateTo } = useCinema();

  const isAdminView = currentView.startsWith('admin-');

  const renderScreen = () => {
    switch (currentView) {
      case 'home':
        return <HomeScreen />;
      case 'movies':
        return <MovieCatalogScreen />;
      case 'movie-detail':
        return <MovieDetailScreen />;
      case 'schedule':
        return <ScheduleScreen />;
      case 'seat-selection':
        return <SeatSelectionScreen />;
      case 'checkout':
        return <CheckoutScreen />;
      case 'my-tickets':
        return <MyTicketsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'contact':
        return <ContactScreen />;
      case 'about':
        return <AboutScreen />;
      case 'pricing':
        return <PricingScreen />;
      case 'auth':
        return <AuthScreen />;
      case 'admin-overview':
      case 'admin-theaters':
      case 'admin-bookings':
      case 'admin-members':
        return <AdminOverviewScreen />;
      case 'admin-schedule':
        return <AdminScheduleScreen />;
      case 'admin-movies':
        return <AdminMoviesScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#00142a] text-[#d3e4ff] flex flex-col font-['Inter'] selection:bg-[#f7c96d] selection:text-[#402d00]">
      {!isAdminView && <Header />}

      <main className="flex-1 w-full">{renderScreen()}</main>

      {!isAdminView && <Footer />}

      {/* Floating Mode Switcher Button (Client ⇋ Admin) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            if (isAdminView) {
              navigateTo('home');
            } else {
              navigateTo('admin-overview');
            }
          }}
          className="px-4 py-2.5 rounded-full bg-[#142b45]/90 hover:bg-[#203650] text-[#f7c96d] border border-[#d9ae55]/50 shadow-[0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-xl flex items-center gap-2 text-xs font-bold transition-all hover:scale-105"
          title="Chuyển đổi giao diện Khách VIP và Quản trị Admin"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isAdminView ? 'home' : 'admin_panel_settings'}
          </span>
          <span>{isAdminView ? 'Cổng Khách Hàng' : 'Bảng Quản Trị'}</span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <CinemaProvider>
      <MainContent />
    </CinemaProvider>
  );
}
