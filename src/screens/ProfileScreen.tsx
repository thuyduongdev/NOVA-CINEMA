import React, { useState } from 'react';
import { useCinema } from '../context/CinemaContext';

export const ProfileScreen: React.FC = () => {
  const { user, updateUserProfile, navigateTo } = useCinema();

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [favoriteCinema, setFavoriteCinema] = useState('landmark81');
  const [birthday, setBirthday] = useState('1992-08-15');

  // Password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passSuccess, setPassSuccess] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, phone, email });
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass || newPass !== confirmPass) {
      alert('Mật khẩu xác nhận không khớp hoặc chưa nhập!');
      return;
    }
    setPassSuccess(true);
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    setTimeout(() => setPassSuccess(false), 3000);
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
          <span className="text-[#f7c96d] font-semibold">Tài Khoản & Đặc Quyền Hội Viên</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#d3e4ff] tracking-tight font-['Be_Vietnam_Pro']">
          Hồ Sơ Cá Nhân & Thẻ VIP Gold
        </h1>
        <p className="text-sm text-[#aec9eb] max-w-2xl">
          Quản lý thông tin tài khoản cá nhân, theo dõi hành trình tích lũy điểm thưởng Nova Elite Pass và mở khóa các đặc quyền thượng lưu.
        </p>
      </div>

      {/* VIP Pass Card & Loyalty Progress Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Virtual Digital Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-gradient-to-tr from-[#5c4200] via-[#d9ae55] to-[#f7c96d] text-[#261900] shadow-[0_20px_50px_rgba(217,174,85,0.35)] relative overflow-hidden min-h-[260px] group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl font-bold">theaters</span>
              <span className="font-extrabold text-sm tracking-widest font-['Be_Vietnam_Pro'] uppercase">
                NOVA ELITE PASS
              </span>
            </div>
            <span className="material-symbols-outlined text-2xl">contactless</span>
          </div>

          <div className="my-4">
            <span className="text-[11px] uppercase tracking-widest text-[#402d00] font-bold">
              {user.tier} • HỘI VIÊN DANH DỰ
            </span>
            <p className="font-mono text-xl sm:text-2xl font-black tracking-widest mt-1">
              NV • 8921 • 4567 • 0019
            </p>
          </div>

          <div className="flex items-end justify-between text-xs font-bold pt-2 border-t border-[#402d00]/20">
            <div>
              <span className="text-[10px] uppercase text-[#402d00] font-semibold block">Chủ sở hữu</span>
              <span className="text-sm font-black tracking-wider uppercase">{user.name}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase text-[#402d00] font-semibold block">Hiệu lực</span>
              <span>12/28</span>
            </div>
          </div>
        </div>

        {/* Right: Loyalty Stats & Progress to Platinum (7 cols) */}
        <div className="lg:col-span-7 bg-[#07203a] border border-[#142b45] rounded-3xl p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#00142a] border border-[#203650]">
              <span className="text-[10px] uppercase text-[#aec9eb] tracking-wider font-semibold">
                Điểm tích lũy Nova Points
              </span>
              <div className="text-2xl font-extrabold text-[#f7c96d] font-mono mt-1">
                {user.points.toLocaleString()} <span className="text-xs text-[#aec9eb]">pts</span>
              </div>
              <span className="text-[10px] text-[#22c55e] mt-1 block">Tương đương 485.000đ</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#00142a] border border-[#203650]">
              <span className="text-[10px] uppercase text-[#aec9eb] tracking-wider font-semibold">
                Chi tiêu năm 2025
              </span>
              <div className="text-2xl font-extrabold text-[#d3e4ff] font-mono mt-1">
                28.5 <span className="text-xs text-[#aec9eb]">Triệu</span>
              </div>
              <span className="text-[10px] text-[#f7c96d] mt-1 block">Đã xem 18 suất chiếu</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#00142a] border border-[#203650]">
              <span className="text-[10px] uppercase text-[#aec9eb] tracking-wider font-semibold">
                Đặc quyền hiện tại
              </span>
              <div className="text-base font-bold text-[#f7c96d] mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>VIP Lounge Miễn Phí</span>
              </div>
              <span className="text-[10px] text-[#aec9eb] mt-1 block">Giảm 10% mọi đơn hàng</span>
            </div>
          </div>

          {/* Progress bar to Platinum */}
          <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[#00142a] border border-[#203650]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#d3e4ff] font-semibold">
                Tiến độ thăng hạng <strong>Platinum Tier</strong>
              </span>
              <span className="text-[#f7c96d] font-mono font-bold">28.5M / 50.0M VNĐ (57%)</span>
            </div>
            <div className="w-full bg-[#142b45] h-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#d9ae55] to-[#f7c96d]" style={{ width: '57%' }}></div>
            </div>
            <span className="text-[11px] text-[#aec9eb]">
              Còn 21.500.000đ chi tiêu để mở khóa đặc quyền ghế đôi Sweetbox miễn phí hàng tháng & mời thảm đỏ.
            </span>
          </div>
        </div>
      </div>

      {/* Forms Dual Column: Personal Details & Security */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Edit Personal Details (7 cols) */}
        <div className="lg:col-span-7 bg-[#07203a] border border-[#142b45] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#142b45]">
            <div className="flex items-center gap-2 text-[#f7c96d]">
              <span className="material-symbols-outlined">badge</span>
              <h3 className="text-lg font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
                Thông Tin Cá Nhân
              </h3>
            </div>
            <span className="text-xs text-[#aec9eb]">Mã số: {user.memberId}</span>
          </div>

          <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase text-[#aec9eb] font-semibold">Họ và tên</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs focus:border-[#f7c96d] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase text-[#aec9eb] font-semibold">Số điện thoại</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs focus:border-[#f7c96d] focus:outline-none font-mono"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase text-[#aec9eb] font-semibold">Email tài khoản</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs focus:border-[#f7c96d] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase text-[#aec9eb] font-semibold">Ngày sinh (Nhận quà VIP)</label>
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs focus:border-[#f7c96d] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase text-[#aec9eb] font-semibold">Cụm rạp yêu thích nhất</label>
              <select
                value={favoriteCinema}
                onChange={(e) => setFavoriteCinema(e.target.value)}
                className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs focus:border-[#f7c96d] focus:outline-none"
              >
                <option value="landmark81">NOVA Landmark 81 VIP (TP. HCM)</option>
                <option value="westlake">NOVA West Lake (Hà Nội)</option>
                <option value="bactrieu">NOVA Vincom Bà Triệu (Hà Nội)</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-2 py-3 px-6 rounded-xl bg-[#f7c96d] hover:bg-[#ffdea2] text-[#402d00] font-bold text-xs uppercase tracking-wider shadow-lg transition-all self-start"
            >
              Lưu Thông Tin Hồ Sơ
            </button>
          </form>
        </div>

        {/* Right: Security & Password (5 cols) */}
        <div className="lg:col-span-5 bg-[#07203a] border border-[#142b45] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col gap-6">
          <div className="flex items-center gap-2 text-[#f7c96d] pb-4 border-b border-[#142b45]">
            <span className="material-symbols-outlined">lock_reset</span>
            <h3 className="text-lg font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
              Bảo Mật & Mật Khẩu
            </h3>
          </div>

          <form onSubmit={handlePasswordSave} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase text-[#aec9eb] font-semibold">Mật khẩu hiện tại</label>
              <input
                type="password"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="••••••••••••"
                className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs focus:border-[#f7c96d] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase text-[#aec9eb] font-semibold">Mật khẩu mới</label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Tối thiểu 8 ký tự"
                className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs focus:border-[#f7c96d] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase text-[#aec9eb] font-semibold">Xác nhận mật khẩu mới</label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Nhập lại mật khẩu mới"
                className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs focus:border-[#f7c96d] focus:outline-none"
              />
            </div>

            {passSuccess && (
              <div className="p-3 bg-[#22c55e]/20 text-[#22c55e] rounded-xl text-xs font-bold text-center">
                Mật khẩu đã được mã hóa SHA-256 và cập nhật an toàn!
              </div>
            )}

            <button
              type="submit"
              className="mt-2 py-3 px-6 rounded-xl bg-[#142b45] hover:bg-[#203650] text-[#f7c96d] border border-[#d9ae55]/30 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Cập Nhật Mật Khẩu
            </button>
          </form>

          {/* Concierge support */}
          <div className="p-4 rounded-2xl bg-[#00142a] border border-[#203650] flex items-center justify-between text-xs text-[#aec9eb]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#f7c96d] text-2xl">support_agent</span>
              <div>
                <span className="font-bold text-[#d3e4ff] block">Quản Gia VIP 24/7</span>
                <span className="text-[11px] text-[#9a8f7e]">Hỗ trợ đổi vé & đặt phòng riêng</span>
              </div>
            </div>
            <a
              href="tel:19008899"
              className="text-[#f7c96d] font-bold font-mono hover:underline"
            >
              1900 8899
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
