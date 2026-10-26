import React, { useState } from 'react';
import { useCinema } from '../context/CinemaContext';

export const ContactScreen: React.FC = () => {
  const { cinemas, user, showNotification, navigateTo } = useCinema();

  const [selectedCinemaId, setSelectedCinemaId] = useState('landmark81');
  const [requestType, setRequestType] = useState('private-screening');
  const [fullName, setFullName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const activeCinema = cinemas.find((c) => c.id === selectedCinemaId) || cinemas[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showNotification({
      type: 'success',
      title: 'Đã tiếp nhận yêu cầu Concierge',
      message: 'Chuyên viên quản gia VIP sẽ liên hệ lại quý khách trong vòng 15 phút qua điện thoại.',
    });
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
          <span className="text-[#f7c96d] font-semibold">VIP Concierge & Khách Hàng Thượng Lưu</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#d3e4ff] tracking-tight font-['Be_Vietnam_Pro']">
          Liên Hệ & Dịch Vụ Quản Gia VIP
        </h1>
        <p className="text-sm text-[#aec9eb] max-w-2xl leading-relaxed">
          Đội ngũ VIP Concierge túc trực 24/7 để tiếp nhận các yêu cầu bao rạp riêng tư, tổ chức cầu hôn lãng mạn, sự kiện ra mắt thương hiệu hoặc hỗ trợ đặt vé đặc biệt.
        </p>
      </div>

      {/* 3 Contact Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#07203a] border border-[#d9ae55]/30 shadow-xl flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#142b45] flex items-center justify-center text-[#f7c96d]">
            <span className="material-symbols-outlined text-[28px]">phone_in_talk</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-[#aec9eb] tracking-wider">
            Hotline VIP 24/7
          </span>
          <a href="tel:19008899" className="text-xl font-bold font-mono text-[#f7c96d] hover:underline">
            1900 8899
          </a>
          <p className="text-xs text-[#aec9eb]">
            Phím 1: Đặt phòng VIP Landmark 81<br />
            Phím 2: Hỗ trợ khẩn cấp & Đổi vé
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#07203a] border border-[#d9ae55]/30 shadow-xl flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#142b45] flex items-center justify-center text-[#f7c96d]">
            <span className="material-symbols-outlined text-[28px]">mail</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-[#aec9eb] tracking-wider">
            Thư Điện Tử Concierge
          </span>
          <a href="mailto:concierge@novacinema.vn" className="text-lg font-bold text-[#f7c96d] hover:underline">
            concierge@novacinema.vn
          </a>
          <p className="text-xs text-[#aec9eb]">
            Phản hồi văn bản trong vòng 15 phút với hồ sơ đối tác doanh nghiệp.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#07203a] border border-[#d9ae55]/30 shadow-xl flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#142b45] flex items-center justify-center text-[#f7c96d]">
            <span className="material-symbols-outlined text-[28px]">stars</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-[#aec9eb] tracking-wider">
            Cam Kết Dịch Vụ 5 Sao
          </span>
          <div className="text-lg font-bold text-[#d3e4ff]">
            Frictionless Hospitality
          </div>
          <p className="text-xs text-[#aec9eb]">
            Đón tiếp tại sảnh VIP riêng biệt, hỗ trợ gửi xe miễn phí & hướng dẫn tận chỗ ngồi.
          </p>
        </div>
      </div>

      {/* Main Dual Grid: Form & Cinema Locator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Concierge Request (7 cols) */}
        <div className="lg:col-span-7 bg-[#07203a] border border-[#142b45] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col gap-6">
          <div className="flex items-center gap-2 text-[#f7c96d] pb-4 border-b border-[#142b45]">
            <span className="material-symbols-outlined">room_service</span>
            <h3 className="text-lg font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
              Gửi Yêu Cầu Đến Quản Gia VIP
            </h3>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-[#00142a] rounded-2xl border border-[#22c55e]/40 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#22c55e]/20 text-[#22c55e] flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl">check</span>
              </div>
              <h4 className="text-lg font-bold text-[#d3e4ff]">Yêu Cầu Đã Được Tiếp Nhận!</h4>
              <p className="text-xs text-[#aec9eb] max-w-sm">
                Quản gia cao cấp của NOVA CINEMA sẽ chuẩn bị báo giá chi tiết và liên hệ lại với quý khách qua số điện thoại <strong>{phone}</strong> trong ít phút.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-5 py-2 rounded-xl bg-[#f7c96d] text-[#402d00] font-bold text-xs"
              >
                Gửi yêu cầu khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase text-[#aec9eb] font-semibold">Loại hình dịch vụ yêu cầu</label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs focus:border-[#f7c96d] focus:outline-none"
                >
                  <option value="private-screening">Bao rạp riêng tư (Private Screening cho gia đình & VIP)</option>
                  <option value="corporate-event">Sự kiện ra mắt sản phẩm / Hội thảo doanh nghiệp</option>
                  <option value="proposal">Trọn gói Cầu hôn lãng mạn tại rạp chiếu VIP</option>
                  <option value="ticket-support">Hỗ trợ vé & Hóa đơn giá trị gia tăng (VAT)</option>
                </select>
              </div>

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
                  <label className="text-xs uppercase text-[#aec9eb] font-semibold">Số điện thoại liên hệ</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs focus:border-[#f7c96d] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase text-[#aec9eb] font-semibold">Email nhận kế hoạch & báo giá</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs focus:border-[#f7c96d] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase text-[#aec9eb] font-semibold">Nội dung chi tiết yêu cầu</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Thời gian dự kiến, số lượng khách mời, yêu cầu về ẩm thực canapé & rượu vang..."
                  className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl p-3 text-xs focus:border-[#f7c96d] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-8 rounded-xl bg-gradient-to-r from-[#d9ae55] to-[#f7c96d] text-[#402d00] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all self-start"
              >
                Gửi Yêu Cầu Đến Quản Gia
              </button>
            </form>
          )}
        </div>

        {/* Right Cinema Location Switcher & Map Preview (5 cols) */}
        <div className="lg:col-span-5 bg-[#07203a] border border-[#142b45] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col gap-6">
          <div className="flex items-center gap-2 text-[#f7c96d] pb-4 border-b border-[#142b45]">
            <span className="material-symbols-outlined">location_city</span>
            <h3 className="text-lg font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
              Hệ Thống Rạp Flagship
            </h3>
          </div>

          {/* Selector pills */}
          <div className="flex flex-col gap-2">
            {cinemas.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCinemaId(c.id)}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  selectedCinemaId === c.id
                    ? 'bg-[#142b45] border-[#f7c96d] text-[#f7c96d] shadow-md'
                    : 'bg-[#00142a] border-[#203650] text-[#aec9eb] hover:bg-[#142b45]/60'
                }`}
              >
                <div>
                  <strong className="text-xs block text-[#d3e4ff]">{c.name}</strong>
                  <span className="text-[11px] text-[#aec9eb] truncate">{c.cityName}</span>
                </div>
                <span className="material-symbols-outlined text-[18px]">
                  {selectedCinemaId === c.id ? 'radio_button_checked' : 'radio_button_unchecked'}
                </span>
              </button>
            ))}
          </div>

          {/* Active Cinema Detail & Visual */}
          <div className="p-4 rounded-2xl bg-[#00142a] border border-[#203650] flex flex-col gap-3">
            <img
              src={activeCinema.image}
              alt={activeCinema.name}
              className="w-full h-36 object-cover rounded-xl shadow-md"
            />
            <div>
              <h4 className="text-sm font-bold text-[#d3e4ff]">{activeCinema.name}</h4>
              <p className="text-xs text-[#aec9eb] mt-1">{activeCinema.address}</p>
              <p className="text-xs text-[#f7c96d] mt-1 font-semibold">{activeCinema.phone}</p>
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(activeCinema.address)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#142b45] hover:bg-[#203650] text-[#f7c96d] border border-[#d9ae55]/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">directions</span>
              <span>Mở Bản Đồ Đường Đi</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
