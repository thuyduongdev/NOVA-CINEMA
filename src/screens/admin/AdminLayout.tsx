import React from 'react';
import { useCinema, ViewType } from '../../context/CinemaContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeSection: ViewType;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeSection }) => {
  const { navigateTo, user, logout } = useCinema();

  const adminNav: { label: string; view: ViewType; icon: string }[] = [
    { label: 'Tổng quan doanh thu (AD01)', view: 'admin-overview', icon: 'dashboard' },
    { label: 'Quản lý lịch chiếu (AD04)', view: 'admin-schedule', icon: 'calendar_month' },
    { label: 'Kho phim & Suất chiếu (AD02)', view: 'admin-movies', icon: 'movie' },
    { label: 'Phòng chiếu & Sơ đồ ghế', view: 'admin-theaters', icon: 'airline_seat_recline_extra' },
    { label: 'Giao dịch & Vé bán', view: 'admin-bookings', icon: 'receipt_long' },
    { label: 'Hội viên VIP Lounge', view: 'admin-members', icon: 'group' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#00142a] text-[#d3e4ff] flex">
      {/* Fixed Admin Sidebar (72 = 18rem = 288px) */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-[#031c36] z-50 flex flex-col justify-between py-6 border-r border-[#142b45] shadow-2xl">
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="px-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#d9ae55] to-[#f7c96d] p-0.5 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#00142a] rounded-[6px] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#f7c96d] text-[18px]">theaters</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-['Be_Vietnam_Pro'] font-bold text-base uppercase tracking-wider text-[#f7c96d]">
                NOVA CINEMA
              </span>
              <span className="text-[9px] uppercase text-[#aec9eb] tracking-[0.2em] font-semibold">
                Admin Command Center
              </span>
            </div>
          </div>

          {/* Active Cinema Branch pill */}
          <div className="px-4">
            <div className="p-3 rounded-xl bg-[#07203a] border border-[#203650] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f7c96d] text-[18px]">store</span>
                <span className="text-xs font-semibold text-[#d3e4ff]">NOVA Landmark 81 VIP</span>
              </div>
              <span className="text-[10px] text-[#22c55e] font-bold">Online</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 flex flex-col gap-1.5 overflow-y-auto">
            {adminNav.map((item) => {
              const isActive = activeSection === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => navigateTo(item.view)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-[#d9ae55] text-[#402d00] shadow-md'
                      : 'text-[#aec9eb] hover:bg-[#142b45] hover:text-[#d3e4ff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="px-4 flex flex-col gap-2 pt-4 border-t border-[#142b45]">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center justify-between p-3 rounded-xl bg-[#142b45] hover:bg-[#203650] text-[#aec9eb] hover:text-[#d3e4ff] text-xs font-semibold transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#f7c96d]">home</span>
              <span>Về Cổng Khách Hàng</span>
            </div>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 p-2 rounded-xl text-xs text-[#ffb4ab] hover:bg-[#93000a]/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Đăng xuất Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area (pl-72) */}
      <div className="pl-72 flex-1 flex flex-col min-w-0">
        {/* Admin Top Header */}
        <header className="h-16 bg-[#00142a]/90 backdrop-blur-xl border-b border-[#142b45] z-40 sticky top-0 flex items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#aec9eb] font-semibold">
              Hệ thống Điều hành & Khai thác Phòng vé DCI
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f7c96d]"></span>
            <span className="text-xs font-bold text-[#f7c96d]">Phiên bản 2.4-PROD</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 pl-4 border-l border-[#142b45]">
              <img
                src={user.avatar}
                alt="Admin Profile"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#f7c96d]"
              />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-[#d3e4ff]">{user.name}</span>
                <span className="text-[10px] text-[#f7c96d] font-semibold">Super Admin Master</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content View */}
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
};
