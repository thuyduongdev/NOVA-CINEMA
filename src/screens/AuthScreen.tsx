import React, { useState } from 'react';
import { useCinema } from '../context/CinemaContext';

export const AuthScreen: React.FC = () => {
  const { login, navigateTo } = useCinema();

  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'client' | 'admin'>('client');
  const [email, setEmail] = useState('khachhang.vip@novacinema.vn');
  const [password, setPassword] = useState('nova@vip2025');
  const [fullName, setFullName] = useState('Alexandre Nguyen');
  const [phone, setPhone] = useState('0908 123 456');

  // Quick fill accounts
  const handleQuickFill = (targetRole: 'client' | 'admin') => {
    setRole(targetRole);
    if (targetRole === 'client') {
      setEmail('khachhang.vip@novacinema.vn');
      setPassword('nova@vip2025');
      setFullName('Alexandre Nguyen');
    } else {
      setEmail('admin.master@novacinema.vn');
      setPassword('admin@nova2025');
      setFullName('Alexandre Nguyen (Super Admin)');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
  };

  return (
    <div className="w-full min-h-screen pt-28 pb-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col gap-10">
      {/* Editorial Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#aec9eb]">
          <button onClick={() => navigateTo('home')} className="hover:text-[#f7c96d] transition-colors">
            Trang chủ
          </button>
          <span>/</span>
          <span className="text-[#f7c96d] font-semibold">Xác thực người dùng</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#142b45] text-[#f7c96d] mb-2 border border-[#d9ae55]/30">
              <span className="material-symbols-outlined text-[16px]">stars</span>
              <span className="text-[11px] uppercase tracking-widest font-bold">
                Cổng Xác Thực Phân Quyền SRS RBAC
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#d3e4ff] tracking-tight font-['Be_Vietnam_Pro']">
              Chào Mừng Đến Với <span className="text-[#f7c96d]">NOVA CINEMA</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#aec9eb] max-w-xl mt-1">
              Đăng nhập tài khoản để mở khóa các đặc quyền hội viên Gold VIP hoặc chuyển sang tài khoản Quản trị viên điều hành rạp.
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#07203a] border border-[#203650] shrink-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f7c96d] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#f7c96d]"></span>
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-[#aec9eb] font-semibold">Bảo mật hệ thống</span>
              <span className="text-xs text-[#d3e4ff] font-medium font-mono">SRS RBAC Level-3 Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Authentication Module (7 cols) */}
        <div className="lg:col-span-7 bg-[#07203a] border border-[#d9ae55]/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#f7c96d] to-transparent"></div>

          {/* Tab Switcher: Đăng nhập vs Đăng ký */}
          <div className="flex items-center justify-between p-1 bg-[#00142a] rounded-xl border border-[#203650]">
            <button
              onClick={() => setAuthTab('login')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                authTab === 'login'
                  ? 'bg-[#f7c96d] text-[#402d00] shadow'
                  : 'text-[#aec9eb] hover:text-[#d3e4ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">login</span>
              <span>Đăng Nhập</span>
            </button>
            <button
              onClick={() => setAuthTab('register')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                authTab === 'register'
                  ? 'bg-[#f7c96d] text-[#402d00] shadow'
                  : 'text-[#aec9eb] hover:text-[#d3e4ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              <span>Đăng Ký Thành Viên</span>
            </button>
          </div>

          {/* Role selector pills */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#aec9eb] font-semibold">
              Phân Quyền Vai Trò (Role-Based Access Control):
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuickFill('client')}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  role === 'client'
                    ? 'bg-[#142b45] border-[#f7c96d] text-[#f7c96d] shadow-md ring-1 ring-[#f7c96d]'
                    : 'bg-[#00142a] border-[#203650] text-[#aec9eb]'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                <div>
                  <strong className="text-xs block text-[#d3e4ff]">Khách Hàng VIP</strong>
                  <span className="text-[10px] text-[#aec9eb]">Gold / Platinum Pass</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  role === 'admin'
                    ? 'bg-[#142b45] border-[#f7c96d] text-[#f7c96d] shadow-md ring-1 ring-[#f7c96d]'
                    : 'bg-[#00142a] border-[#203650] text-[#aec9eb]'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
                <div>
                  <strong className="text-xs block text-[#d3e4ff]">Quản Trị Viên Admin</strong>
                  <span className="text-[10px] text-[#aec9eb]">Điều Hành Rạp Chiếu</span>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {authTab === 'register' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase text-[#aec9eb] font-semibold">Họ và tên</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs focus:border-[#f7c96d] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase text-[#aec9eb] font-semibold">Số điện thoại</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs focus:border-[#f7c96d] focus:outline-none font-mono"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase text-[#aec9eb] font-semibold">Email tài khoản</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs focus:border-[#f7c96d] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase text-[#aec9eb] font-semibold">Mật khẩu</label>
                <button
                  type="button"
                  onClick={() => alert('Mã xác thực khôi phục mật khẩu đã được gửi đến email của bạn.')}
                  className="text-[11px] text-[#f7c96d] hover:underline"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs focus:border-[#f7c96d] focus:outline-none font-mono"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#d9ae55] to-[#f7c96d] text-[#402d00] font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-[#f7c96d]/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">
                {authTab === 'login' ? 'login' : 'how_to_reg'}
              </span>
              <span>
                {authTab === 'login'
                  ? `Đăng Nhập (${role === 'admin' ? 'Quản Trị Admin' : 'Khách VIP'})`
                  : 'Hoàn Tất Đăng Ký Tài Khoản VIP'}
              </span>
            </button>
          </form>

          {/* Social login divider */}
          <div className="pt-2 border-t border-[#142b45] flex flex-col gap-3">
            <span className="text-center text-[10px] text-[#9a8f7e] uppercase tracking-wider">
              Hoặc đăng nhập nhanh bằng tài khoản liên kết
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuickFill('client')}
                className="py-2.5 px-3 rounded-xl bg-[#00142a] hover:bg-[#142b45] text-[#d3e4ff] text-xs font-semibold border border-[#203650] flex items-center justify-center gap-2 transition-colors"
              >
                <span>Google Account</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('client')}
                className="py-2.5 px-3 rounded-xl bg-[#00142a] hover:bg-[#142b45] text-[#d3e4ff] text-xs font-semibold border border-[#203650] flex items-center justify-center gap-2 transition-colors"
              >
                <span>Apple ID</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Info: SRS Demo Fast Fill Helper (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#07203a] border border-[#d9ae55]/30 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col gap-5">
            <div className="flex items-center gap-2 text-[#f7c96d]">
              <span className="material-symbols-outlined">dataset</span>
              <h3 className="text-base font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
                SRS Kiểm Thử Nhanh (1-Click Fill)
              </h3>
            </div>
            <p className="text-xs text-[#aec9eb] leading-relaxed">
              Dành cho đánh giá yêu cầu đặc tả SRS: Nhấp vào nút bên dưới để tự động điền thông tin tài khoản mẫu và trải nghiệm đầy đủ quyền hạn.
            </p>

            {/* Card 1: VIP Member */}
            <div className="p-4 rounded-2xl bg-[#00142a] border border-[#203650] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#f7c96d] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">person</span>
                  Tài Khoản Khách Hàng VIP Gold
                </span>
                <span className="text-[10px] text-[#22c55e] font-semibold">Active</span>
              </div>
              <p className="text-[11px] font-mono text-[#d3e4ff]">
                khachhang.vip@novacinema.vn
              </p>
              <p className="text-[10px] text-[#aec9eb]">
                Xem vé đã đặt, tích lũy điểm thưởng Nova, đổi suất chiếu và đặt phòng VIP.
              </p>
              <button
                type="button"
                onClick={() => handleQuickFill('client')}
                className="mt-1 py-1.5 px-3 rounded-lg bg-[#142b45] hover:bg-[#203650] text-[#f7c96d] text-[11px] font-bold self-start border border-[#d9ae55]/30"
              >
                Điền tài khoản Khách VIP
              </button>
            </div>

            {/* Card 2: Super Admin */}
            <div className="p-4 rounded-2xl bg-[#00142a] border border-[#203650] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#f7c96d] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">security</span>
                  Tài Khoản Quản Trị Viên (Super Admin)
                </span>
                <span className="text-[10px] text-[#f7c96d] font-semibold">Command</span>
              </div>
              <p className="text-[11px] font-mono text-[#d3e4ff]">
                admin.master@novacinema.vn
              </p>
              <p className="text-[10px] text-[#aec9eb]">
                Truy cập AD01 (Doanh thu), AD02 (Kho phim DCI), AD04 (Bộ kiểm soát xung đột lịch chiếu).
              </p>
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className="mt-1 py-1.5 px-3 rounded-lg bg-[#d9ae55] hover:bg-[#ffdea2] text-[#402d00] text-[11px] font-extrabold self-start"
              >
                Điền tài khoản Super Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
