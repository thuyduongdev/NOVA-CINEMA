import React, { useState } from 'react';
import { useCinema, ViewType } from '../context/CinemaContext';

export const Header: React.FC = () => {
  const { currentView, navigateTo, user, isLoggedIn, logout, bookings } = useCinema();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { movies, startBookingForMovie } = useCinema();

  const activeTicketsCount = bookings.filter((b) => b.status === 'confirmed').length;

  const filteredMovies = searchQuery.trim()
    ? movies.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const navLinks: { label: string; view: ViewType }[] = [
    { label: 'Trang chủ', view: 'home' },
    { label: 'Phim', view: 'movies' },
    { label: 'Lịch chiếu', view: 'schedule' },
    { label: 'Giá vé & Ưu đãi', view: 'pricing' },
    { label: 'Giới thiệu', view: 'about' },
    { label: 'Liên hệ', view: 'contact' },
  ];

  const handleNav = (v: ViewType) => {
    navigateTo(v);
    setDropdownOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#00142a]/90 backdrop-blur-xl border-b border-[#142b45] shadow-[0_1px_12px_rgba(0,0,0,0.6)]">
        <div className="h-20 w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-6 shrink-0">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#d9ae55] to-[#f7c96d] p-0.5 shadow-lg shadow-[#f7c96d]/20 group-hover:scale-105 transition-transform flex items-center justify-center">
                <div className="w-full h-full bg-[#00142a] rounded-[6px] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#f7c96d] text-[22px]">theaters</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-['Be_Vietnam_Pro'] font-bold text-lg uppercase tracking-wider text-[#f7c96d] group-hover:text-[#ffdea2] transition-colors leading-tight">
                  NOVA CINEMA
                </span>
                <span className="text-[10px] uppercase text-[#aec9eb] tracking-[0.2em] font-medium">
                  Luxury Experience
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8">
            {navLinks.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNav(item.view)}
                  className={`relative py-1 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#f7c96d] font-semibold after:content-[""] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-[#f7c96d]'
                      : 'text-[#aec9eb] hover:text-[#d3e4ff]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions Right */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#142b45] text-[#aec9eb] hover:text-[#f7c96d] hover:bg-[#203650] transition-all"
              title="Tìm kiếm phim (⌘K)"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Quick My Tickets Icon with badge */}
            <button
              onClick={() => handleNav('my-tickets')}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#142b45] text-[#aec9eb] hover:text-[#f7c96d] hover:bg-[#203650] transition-all"
              title="Vé của tôi"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">confirmation_number</span>
              {activeTicketsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#f7c96d] text-[#402d00] text-[11px] font-bold flex items-center justify-center ring-2 ring-[#00142a]">
                  {activeTicketsCount}
                </span>
              )}
            </button>

            {/* VIP Tier Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#142b45] border border-[#d9ae55]/30">
              <span className="material-symbols-outlined text-[#f7c96d] text-[17px]">workspace_premium</span>
              <span className="text-[11px] uppercase text-[#f7c96d] font-semibold tracking-wider">
                {user.tier}
              </span>
            </div>

            {/* Admin Command quick shortcut */}
            <button
              onClick={() => handleNav('admin-overview')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#304b68] hover:bg-[#304b68]/80 text-[#d3e4ff] transition-all border border-[#aec9eb]/20"
              title="Chuyển sang Giao diện Quản trị Rạp"
            >
              <span className="material-symbols-outlined text-[16px] text-[#f7c96d]">admin_panel_settings</span>
              <span className="text-xs font-semibold">Quản trị Admin</span>
            </button>

            {/* Profile Menu Dropdown */}
            <div className="relative py-2">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 focus:outline-none p-0.5 rounded-full hover:ring-2 hover:ring-[#f7c96d]/40 transition-all"
                type="button"
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-[#f7c96d]/60"
                  src={user.avatar}
                />
                <span className="material-symbols-outlined text-[#aec9eb] text-[18px]">
                  {dropdownOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 top-full w-60 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="bg-[#142b45] rounded-xl p-2 shadow-[0_16px_40px_rgba(0,0,0,0.8)] border border-[#d9ae55]/20 backdrop-blur-2xl">
                    <div className="px-3 py-2">
                      <p className="font-semibold text-sm text-[#d3e4ff] truncate">{user.name}</p>
                      <p className="text-xs text-[#f7c96d] font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">stars</span>
                        {user.tier} • {user.points.toLocaleString()} pts
                      </p>
                    </div>

                    <div className="h-px bg-[#203650] my-1"></div>

                    <button
                      onClick={() => handleNav('profile')}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[#aec9eb] hover:text-[#d3e4ff] hover:bg-[#203650] transition-colors text-left"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#f7c96d]">person</span>
                      <span>Hồ sơ & Đặc quyền VIP</span>
                    </button>

                    <button
                      onClick={() => handleNav('my-tickets')}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#aec9eb] hover:text-[#d3e4ff] hover:bg-[#203650] transition-colors text-left"
                    >
                      <span className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[18px] text-[#f7c96d]">
                          confirmation_number
                        </span>
                        <span>Vé của tôi & QR Pass</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded-full bg-[#d9ae55] text-[#402d00] text-[10px] font-bold">
                        {activeTicketsCount}
                      </span>
                    </button>

                    <button
                      onClick={() => handleNav('admin-overview')}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[#aec9eb] hover:text-[#d3e4ff] hover:bg-[#203650] transition-colors text-left"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#aec9eb]">dashboard</span>
                      <span>Hệ thống Quản trị (AD)</span>
                    </button>

                    <div className="h-px bg-[#203650] my-1"></div>

                    {isLoggedIn ? (
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[#ffb4ab] hover:text-[#ffdad6] hover:bg-[#93000a]/30 transition-colors text-left"
                      >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        <span>Đăng xuất tài khoản</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleNav('auth')}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#f7c96d] hover:bg-[#203650] transition-colors text-left"
                      >
                        <span className="material-symbols-outlined text-[18px]">login</span>
                        <span>Đăng nhập VIP</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => handleNav('movies')}
              className="xl:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#142b45] text-[#aec9eb]"
              title="Danh mục phim"
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Omni-search modal popup */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 px-4">
          <div className="w-full max-w-2xl bg-[#07203a] border border-[#d9ae55]/30 rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#142b45]">
              <div className="flex items-center gap-2 text-[#f7c96d]">
                <span className="material-symbols-outlined">search</span>
                <span className="font-semibold text-lg">Tìm kiếm siêu phẩm điện ảnh</span>
              </div>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#142b45] hover:bg-[#203650] text-[#aec9eb] flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="mt-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                placeholder="Nhập tựa phim (Dune 2, Oppenheimer...), đạo diễn Christopher Nolan, diễn viên..."
                className="w-full px-4 py-3 rounded-xl bg-[#00142a] text-[#d3e4ff] placeholder-[#aec9eb]/50 border border-[#203650] focus:border-[#f7c96d] focus:outline-none"
              />
            </div>

            {/* Results or trending */}
            <div className="mt-4 max-h-80 overflow-y-auto space-y-2">
              {searchQuery.trim() === '' ? (
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#aec9eb] mb-2 font-semibold">
                    Được tìm kiếm nhiều nhất tại NOVA
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {movies.slice(0, 4).map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          setSearchModalOpen(false);
                          navigateTo('movie-detail', { movieId: m.id });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#142b45] hover:bg-[#203650] text-xs text-[#d3e4ff] flex items-center gap-1.5 border border-[#203650]"
                      >
                        <span className="material-symbols-outlined text-[14px] text-[#f7c96d]">movie</span>
                        {m.title}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredMovies.length === 0 ? (
                <div className="py-8 text-center text-[#aec9eb]">
                  Không tìm thấy kết quả phù hợp với từ khóa "{searchQuery}"
                </div>
              ) : (
                filteredMovies.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#142b45] hover:bg-[#203650] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={m.posterUrl}
                        alt={m.title}
                        className="w-12 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h4 className="font-semibold text-sm text-[#d3e4ff]">{m.title}</h4>
                        <p className="text-xs text-[#aec9eb]">
                          {m.genres.join(' • ')} | {m.duration} phút | Rating {m.rating}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSearchModalOpen(false);
                          navigateTo('movie-detail', { movieId: m.id });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#203650] text-xs text-[#aec9eb] hover:text-[#d3e4ff]"
                      >
                        Chi tiết
                      </button>
                      <button
                        onClick={() => {
                          setSearchModalOpen(false);
                          startBookingForMovie(m.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#f7c96d] text-[#402d00] font-bold text-xs hover:bg-[#ffdea2]"
                      >
                        Đặt vé
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
