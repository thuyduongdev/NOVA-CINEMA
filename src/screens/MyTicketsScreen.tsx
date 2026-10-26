import React, { useState } from 'react';
import { useCinema } from '../context/CinemaContext';
import { Booking } from '../data/cinemaData';

export const MyTicketsScreen: React.FC = () => {
  const {
    bookings,
    cancelBooking,
    navigateTo,
    notification,
    clearNotification,
  } = useCinema();

  const [activeTab, setActiveTab] = useState<'active' | 'history' | 'canceled'>('active');
  const [selectedTicketForReview, setSelectedTicketForReview] = useState<Booking | null>(null);
  const [reviewRating, setReviewRating] = useState(10);
  const [reviewComment, setReviewComment] = useState('Trải nghiệm phòng chiếu IMAX Laser GT tuyệt vời, âm thanh sống động và phục vụ rất tận tâm!');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const activeBookings = bookings.filter((b) => b.status === 'confirmed');
  const canceledBookings = bookings.filter((b) => b.status === 'canceled');

  const currentTicket = activeBookings[0] || bookings[0];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewSuccess(false);
      setSelectedTicketForReview(null);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Notice Banner if active */}
      {notification && (
        <div className="relative overflow-hidden rounded-2xl bg-[#07203a] border border-[#d9ae55]/50 p-4 sm:p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in slide-in-from-top-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#f7c96d]/20 text-[#f7c96d] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">check_circle</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-[#f7c96d] tracking-widest">
                  {notification.title}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#aec9eb]"></span>
                <span className="text-[10px] text-[#aec9eb]">Hệ thống vé điện tử NOVA</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#d3e4ff] mt-0.5">
                {notification.message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              onClick={clearNotification}
              className="w-7 h-7 rounded-full bg-[#142b45] hover:bg-[#203650] text-[#aec9eb] flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Header Titles & Metas */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#142b45]">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#aec9eb]">
            <span className="text-[#aec9eb]">E-Ticket Concierge</span>
            <span>/</span>
            <span className="text-[#f7c96d] font-semibold">Luxury Booking Pass</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#d3e4ff] tracking-tight font-['Be_Vietnam_Pro'] mt-1">
            Vé Của Tôi & Lịch Sử Giao Dịch
          </h1>
          <p className="text-xs sm:text-sm text-[#aec9eb] max-w-2xl mt-1">
            Quản lý toàn bộ vé xem phim điện tử chuẩn VIP. Xuất trình thẻ vé trực tiếp tại quầy check-in ưu tiên hoặc cổng soát vé thông minh NOVA SmartGate.
          </p>
        </div>

        {/* Quick Action Utilities */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => alert('Đã tạo liên kết sự kiện Google Calendar cho suất chiếu này!')}
            className="px-4 py-2.5 rounded-xl bg-[#07203a] hover:bg-[#142b45] text-[#d3e4ff] text-xs font-semibold border border-[#203650] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px] text-[#f7c96d]">calendar_month</span>
            <span>Đồng bộ Lịch Google</span>
          </button>
          <button
            onClick={() => alert('Hóa đơn điện tử VAT hợp lệ đã được gửi về email của bạn!')}
            className="px-4 py-2.5 rounded-xl bg-[#f7c96d] text-[#402d00] text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-[#ffdea2] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            <span>Hóa đơn VAT</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabbed Segment */}
      <div className="w-full bg-[#031c36] p-1.5 rounded-2xl flex items-center gap-2 max-w-md border border-[#142b45]">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'active'
              ? 'bg-[#d9ae55] text-[#402d00] shadow'
              : 'text-[#aec9eb] hover:text-[#d3e4ff]'
          }`}
        >
          <span>Vé sắp xem</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 font-bold">
            {activeBookings.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'history'
              ? 'bg-[#d9ae55] text-[#402d00] shadow'
              : 'text-[#aec9eb] hover:text-[#d3e4ff]'
          }`}
        >
          <span>Lịch sử đặt vé</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 font-bold">
            {bookings.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('canceled')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'canceled'
              ? 'bg-[#d9ae55] text-[#402d00] shadow'
              : 'text-[#aec9eb] hover:text-[#d3e4ff]'
          }`}
        >
          <span>Vé đã hủy</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 font-bold">
            {canceledBookings.length}
          </span>
        </button>
      </div>

      {/* ACTIVE TICKETS TAB */}
      {activeTab === 'active' && (
        <div className="flex flex-col gap-8">
          {activeBookings.length === 0 ? (
            <div className="p-16 text-center bg-[#07203a] rounded-2xl border border-[#142b45]">
              <span className="material-symbols-outlined text-4xl text-[#aec9eb] mb-2">confirmation_number</span>
              <p className="text-base text-[#d3e4ff] font-semibold">Quý khách chưa có vé sắp xem</p>
              <p className="text-xs text-[#aec9eb] mt-1">Hãy chọn suất chiếu tiếp theo để trải nghiệm rạp VIP.</p>
              <button
                onClick={() => navigateTo('schedule')}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#f7c96d] text-[#402d00] text-xs font-bold uppercase"
              >
                Đặt vé ngay
              </button>
            </div>
          ) : (
            currentTicket && (
              /* LUXURY BOARDING PASS METAPHOR COMPONENT */
              <div className="relative w-full rounded-3xl bg-[#07203a] border border-[#d9ae55]/40 shadow-2xl overflow-hidden">
                <div className="absolute -left-20 top-0 w-96 h-96 bg-[#f7c96d]/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#304b68]/15 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex flex-col lg:flex-row w-full relative z-10">
                  {/* Left Segment: 70% Experience Showcase */}
                  <div className="lg:w-[70%] p-6 sm:p-8 flex flex-col justify-between gap-6 border-b lg:border-b-0 lg:border-r border-dashed border-[#8e784f]/40">
                    {/* Top status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#f7c96d]">
                        <span className="material-symbols-outlined text-[20px]">confirmation_number</span>
                        <span className="text-xs uppercase tracking-widest font-bold">
                          BOARDING PASS • VIP PRIVILEGE
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#142b45] text-xs font-medium text-[#d3e4ff]">
                        <span className="w-2 h-2 rounded-full bg-[#f7c96d] animate-pulse"></span>
                        <span>Sẵn sàng xuất trình</span>
                      </div>
                    </div>

                    {/* Movie info */}
                    <div className="flex items-start gap-4">
                      <img
                        src={currentTicket.moviePoster}
                        alt={currentTicket.movieTitle}
                        className="w-20 h-28 sm:w-24 sm:h-36 object-cover rounded-xl shadow-lg ring-1 ring-[#d9ae55]/40 shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-[#f7c96d] font-bold">
                          {currentTicket.movieFormat}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#d3e4ff] font-['Be_Vietnam_Pro'] mt-0.5">
                          {currentTicket.movieTitle}
                        </h2>
                        <p className="text-xs text-[#aec9eb] mt-1">
                          Khách hàng: <strong>{currentTicket.customerName}</strong> (Thành viên Gold Pass)
                        </p>
                      </div>
                    </div>

                    {/* Specs Matrix */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#00142a] border border-[#203650] text-xs">
                      <div>
                        <span className="text-[10px] uppercase text-[#aec9eb] block">Cụm Rạp</span>
                        <strong className="text-[#d3e4ff] mt-0.5 block truncate">{currentTicket.cinemaName}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#aec9eb] block">Phòng Chiếu</span>
                        <strong className="text-[#f7c96d] mt-0.5 block">{currentTicket.hallName}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#aec9eb] block">Suất Chiếu</span>
                        <strong className="text-[#d3e4ff] mt-0.5 block font-mono">{currentTicket.time}</strong>
                        <span className="text-[10px] text-[#aec9eb]">{currentTicket.date}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#aec9eb] block">Ghế VIP</span>
                        <strong className="text-base text-[#f7c96d] font-mono font-extrabold block">
                          {currentTicket.seats.join(', ')}
                        </strong>
                      </div>
                    </div>

                    {/* F&B items */}
                    {currentTicket.combos.length > 0 && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#142b45]/60 text-xs text-[#aec9eb]">
                        <span className="material-symbols-outlined text-[#f7c96d] text-[20px]">room_service</span>
                        <span>
                          <strong>Ẩm thực kèm theo:</strong>{' '}
                          {currentTicket.combos.map((c) => `${c.name} (x${c.quantity})`).join(', ')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right Segment: 30% Stub with QR Pass */}
                  <div className="lg:w-[30%] p-6 sm:p-8 bg-[#031c36] flex flex-col items-center justify-between text-center gap-6">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] uppercase tracking-widest text-[#aec9eb]">Mã Giao Dịch</span>
                      <span className="text-base font-bold font-mono text-[#f7c96d] tracking-widest mt-0.5">
                        #{currentTicket.bookingCode}
                      </span>
                    </div>

                    {/* Pearl QR Code */}
                    <div className="p-3 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                      <img
                        src={currentTicket.qrCodeUrl}
                        alt="QR Code Ticket"
                        className="w-36 h-36 object-contain"
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-xs font-semibold text-[#d3e4ff]">Cổng Soát Vé Tự Động</span>
                      <span className="text-[10px] text-[#aec9eb] mt-0.5">
                        Quét mã tại làn ưu tiên NOVA SmartGate
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="w-full flex flex-col gap-2">
                      <button
                        onClick={() => alert(`Đang tải file PDF vé điện tử #${currentTicket.bookingCode}...`)}
                        className="w-full py-2.5 rounded-xl bg-[#142b45] hover:bg-[#203650] text-[#f7c96d] border border-[#d9ae55]/30 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">download</span>
                        <span>Tải vé PDF / Apple Wallet</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Bạn có chắc muốn hủy đơn đặt vé #${currentTicket.bookingCode}? Hoàn 100% điểm thưởng.`)) {
                            cancelBooking(currentTicket.bookingCode);
                          }
                        }}
                        className="text-[11px] text-[#ffb4ab] hover:underline"
                      >
                        Hủy vé trước giờ chiếu 60 phút
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* HISTORY TAB */}
      {(activeTab === 'history' || activeTab === 'canceled') && (
        <div className="bg-[#07203a] border border-[#142b45] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
          <h3 className="text-base font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro'] pb-3 border-b border-[#142b45]">
            {activeTab === 'history' ? 'Lịch Sử Toàn Bộ Vé Đã Đặt' : 'Danh Sách Vé Đã Hủy'}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#aec9eb]">
              <thead className="text-[11px] uppercase tracking-wider text-[#f7c96d] bg-[#00142a] border-b border-[#203650]">
                <tr>
                  <th className="py-3 px-4">Mã Vé</th>
                  <th className="py-3 px-4">Tác Phẩm & Cụm Rạp</th>
                  <th className="py-3 px-4">Suất Chiếu</th>
                  <th className="py-3 px-4">Vị Trí Ghế</th>
                  <th className="py-3 px-4">Tổng Tiền</th>
                  <th className="py-3 px-4">Trạng Thái</th>
                  <th className="py-3 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#142b45]">
                {bookings
                  .filter((b) => (activeTab === 'history' ? true : b.status === 'canceled'))
                  .map((booking) => (
                    <tr key={booking.id} className="hover:bg-[#142b45]/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#f7c96d]">
                        #{booking.bookingCode}
                      </td>
                      <td className="py-3 px-4">
                        <strong className="text-[#d3e4ff] block">{booking.movieTitle}</strong>
                        <span className="text-[10px] text-[#9a8f7e]">{booking.cinemaName}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span>{booking.time}</span>
                        <span className="text-[10px] text-[#9a8f7e] block">{booking.date}</span>
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-[#f7c96d]">
                        {booking.seats.join(', ')}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-[#d3e4ff]">
                        {booking.total.toLocaleString('vi-VN')}đ
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            booking.status === 'confirmed'
                              ? 'bg-[#22c55e]/20 text-[#22c55e]'
                              : 'bg-[#93000a]/20 text-[#ffb4ab]'
                          }`}
                        >
                          {booking.status === 'confirmed' ? 'Đã xác nhận' : 'Đã hủy'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedTicketForReview(booking)}
                            className="px-2.5 py-1 rounded-lg bg-[#142b45] hover:bg-[#203650] text-[#f7c96d] text-[11px] font-semibold"
                          >
                            Đánh giá phim
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Review modal */}
      {selectedTicketForReview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#07203a] border border-[#d9ae55]/40 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-[#142b45]">
              <h3 className="text-base font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
                Đánh Giá Tác Phẩm & Dịch Vụ Rạp
              </h3>
              <button
                onClick={() => setSelectedTicketForReview(null)}
                className="w-7 h-7 rounded-full bg-[#142b45] text-[#aec9eb] flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4 mt-4">
              <div>
                <span className="text-xs text-[#aec9eb]">Phim đánh giá:</span>
                <p className="text-sm font-bold text-[#f7c96d]">{selectedTicketForReview.movieTitle}</p>
              </div>

              <div>
                <label className="text-xs uppercase text-[#aec9eb] font-semibold block mb-1">
                  Điểm số trải nghiệm (1 - 10 sao):
                </label>
                <div className="flex items-center gap-2">
                  {[6, 7, 8, 9, 10].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        reviewRating === star
                          ? 'bg-[#f7c96d] text-[#402d00]'
                          : 'bg-[#142b45] text-[#aec9eb]'
                      }`}
                    >
                      ★ {star}/10
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase text-[#aec9eb] font-semibold block mb-1">
                  Nhận xét của bạn:
                </label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#00142a] text-[#d3e4ff] border border-[#203650] text-xs focus:border-[#f7c96d] focus:outline-none"
                />
              </div>

              {reviewSuccess ? (
                <div className="p-3 bg-[#22c55e]/20 text-[#22c55e] rounded-xl text-xs font-bold text-center">
                  Cảm ơn quý khách! Đánh giá đã được gửi lên cộng đồng NOVA.
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#f7c96d] hover:bg-[#ffdea2] text-[#402d00] font-bold text-xs uppercase transition-all"
                >
                  Gửi Đánh Giá Ngay
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
