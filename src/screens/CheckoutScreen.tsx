import React, { useState } from 'react';
import { useCinema } from '../context/CinemaContext';
import { COMBOS } from '../data/cinemaData';

export const CheckoutScreen: React.FC = () => {
  const {
    selectedMovie,
    selectedCinema,
    selectedShowtime,
    selectedSeats,
    selectedCombos,
    appliedVoucher,
    user,
    lockCountdown,
    simulatePaymentSuccess,
    navigateTo,
  } = useCinema();

  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'vnpay' | 'card' | 'points'>('momo');
  const [customerName, setCustomerName] = useState(user.name);
  const [customerPhone, setCustomerPhone] = useState(user.phone);
  const [customerEmail, setCustomerEmail] = useState(user.email);
  const [requestInvoice, setRequestInvoice] = useState(false);
  const [companyName, setCompanyName] = useState('Công ty Cổ phần Công nghệ & Sáng tạo NOVA');
  const [taxCode, setTaxCode] = useState('0314987654');
  const [companyAddress, setCompanyAddress] = useState('Landmark 81, 720A Điện Biên Phủ, P. 22, Bình Thạnh, TP. HCM');
  const [timeoutModalOpen, setTimeoutModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const movie = selectedMovie;
  const cinema = selectedCinema;
  const showtime = selectedShowtime;

  // Countdown formatting
  const minutes = Math.floor(lockCountdown / 60);
  const seconds = lockCountdown % 60;
  const formattedCountdown = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progressPercent = Math.min(100, Math.max(0, (lockCountdown / 540) * 100));

  // Calculations
  const seatPriceStandard = showtime?.priceStandard || 140000;
  const seatPriceVip = showtime?.priceVip || 180000;
  const seatPriceSweetbox = showtime?.priceSweetbox || 320000;

  let totalSeatPrice = 0;
  selectedSeats.forEach((seat) => {
    const row = seat.charAt(0);
    if (row === 'J') {
      totalSeatPrice += seatPriceSweetbox;
    } else if (['E', 'F', 'G', 'H'].includes(row)) {
      totalSeatPrice += seatPriceVip;
    } else {
      totalSeatPrice += seatPriceStandard;
    }
  });

  let totalComboPrice = 0;
  const comboDetails: { name: string; qty: number; price: number }[] = [];
  Object.entries(selectedCombos).forEach(([comboId, qty]) => {
    const c = COMBOS.find((item) => item.id === comboId);
    if (c && qty > 0) {
      totalComboPrice += c.price * qty;
      comboDetails.push({ name: c.name, qty, price: c.price * qty });
    }
  });

  const discountAmount = appliedVoucher?.discount || 0;
  const grandTotal = Math.max(0, totalSeatPrice + totalComboPrice - discountAmount);

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      simulatePaymentSuccess(paymentMethod);
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Editorial Title */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#aec9eb]">
          <button onClick={() => navigateTo('seat-selection')} className="hover:text-[#f7c96d] transition-colors">
            Chọn ghế
          </button>
          <span>/</span>
          <span className="text-[#f7c96d] font-semibold">Cổng Thanh Toán Trực Tuyến SRS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#d3e4ff] tracking-tight font-['Be_Vietnam_Pro']">
          Xác Nhận Đơn Hàng & Thanh Toán
        </h1>
        <p className="text-sm text-[#aec9eb]">
          Quý khách vui lòng kiểm tra kỹ thông tin suất chiếu và ghế ngồi trước khi thực hiện chuyển khoản hoặc thanh toán thẻ.
        </p>
      </div>

      {/* 1. ATOMIC LOCK COUNTDOWN BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-[#07203a] border border-[#d9ae55]/40 p-6 shadow-xl">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#f7c96d]/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#142b45] border border-[#203650] flex items-center justify-center shrink-0 text-[#f7c96d]">
              <span className="material-symbols-outlined text-[28px] animate-pulse">timer</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold text-[#f7c96d] tracking-wider">
                  Trạng Thái: Khóa Giữ Ghế Tạm Thời
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#d9ae55] text-[#402d00] text-[10px] font-bold">
                  Atomic Lock
                </span>
              </div>
              <p className="text-xs text-[#d1c5b2] mt-1 leading-relaxed max-w-xl">
                Ghế ({selectedSeats.join(', ')}) đang được hệ thống tạm khóa an toàn. Quá thời hạn bên cạnh, ghế sẽ tự động giải phóng để đảm bảo công bằng cho khách hàng khác.
              </p>
            </div>
          </div>

          {/* Digital Timer */}
          <div className="flex sm:flex-col items-center justify-between sm:justify-center bg-[#00142a] border border-[#203650] px-6 py-3 rounded-xl shrink-0">
            <span className="text-[10px] text-[#aec9eb] uppercase tracking-wider font-semibold">
              Thời gian còn lại
            </span>
            <div className="text-2xl font-bold text-[#f7c96d] font-mono tracking-tight mt-0.5">
              {formattedCountdown}
            </div>
            <span className="text-[9px] text-[#9a8f7e] hidden sm:inline">Phút : Giây</span>
          </div>
        </div>

        {/* Progress line */}
        <div className="w-full bg-[#000f21] h-1.5 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#d9ae55] to-[#f7c96d] transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Main Form & Summary Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Payment Methods, Customer Info, VAT Invoice (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Order Details Specification Card */}
          <div className="rounded-2xl bg-[#07203a] border border-[#142b45] p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#142b45]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f7c96d]"></span>
                <h3 className="text-base font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
                  Chi Tiết Đơn Đặt Vé
                </h3>
              </div>
              <span className="text-xs font-mono text-[#f7c96d] bg-[#142b45] px-2.5 py-1 rounded-lg">
                #NV-894215
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-[#00142a] border border-[#203650]">
              <div className="md:col-span-2 flex flex-col">
                <span className="text-[10px] uppercase text-[#aec9eb] tracking-wider">Tác phẩm</span>
                <h4 className="text-base font-bold text-[#d3e4ff] mt-0.5">{movie.title}</h4>
                <p className="text-xs text-[#aec9eb] mt-1">
                  Định dạng: <strong className="text-[#f7c96d]">{showtime?.format}</strong> • {movie.duration} phút
                </p>
              </div>
              <div className="flex flex-col md:items-end justify-center">
                <span className="text-[10px] uppercase text-[#aec9eb]">Đặc quyền áp dụng</span>
                <span className="text-xs text-[#f7c96d] font-bold mt-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">stars</span>
                  {user.tier} Pass
                </span>
              </div>
            </div>

            {/* Matrix grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
              <div className="p-3 rounded-xl bg-[#142b45]/60 border border-[#203650]">
                <span className="text-[10px] text-[#aec9eb] block uppercase">Cụm rạp & Phòng</span>
                <strong className="text-[#d3e4ff] mt-0.5 block">{cinema.name}</strong>
                <span className="text-[#f7c96d] text-[11px]">{showtime?.hallName}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#142b45]/60 border border-[#203650]">
                <span className="text-[10px] text-[#aec9eb] block uppercase">Suất chiếu</span>
                <strong className="text-[#d3e4ff] mt-0.5 block">{showtime?.startTime} - {showtime?.endTime}</strong>
                <span className="text-[#aec9eb] text-[11px]">Hôm nay, 18/05/2025</span>
              </div>
              <div className="p-3 rounded-xl bg-[#142b45]/60 border border-[#203650]">
                <span className="text-[10px] text-[#aec9eb] block uppercase">Vị trí ghế VIP</span>
                <strong className="text-[#f7c96d] mt-0.5 block text-sm font-mono">
                  {selectedSeats.join(', ')}
                </strong>
                <span className="text-[#aec9eb] text-[11px]">Tổng {selectedSeats.length} vé</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="rounded-2xl bg-[#07203a] border border-[#142b45] p-6 shadow-xl flex flex-col gap-4">
            <h3 className="text-base font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro'] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f7c96d]">credit_card</span>
              <span>Phương Thức Thanh Toán Khả Dụng</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* MoMo QR */}
              <label
                className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'momo'
                    ? 'bg-[#142b45] border-[#f7c96d] shadow-lg ring-1 ring-[#f7c96d]'
                    : 'bg-[#00142a] border-[#203650] hover:border-[#aec9eb]/40'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="momo"
                  checked={paymentMethod === 'momo'}
                  onChange={() => setPaymentMethod('momo')}
                  className="accent-[#f7c96d]"
                />
                <div className="w-9 h-9 rounded-lg bg-[#a50064] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  MoMo
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#d3e4ff]">Ví Điện Tử MoMo</span>
                  <span className="text-[11px] text-[#aec9eb]">Quét mã QR Sandbox tức thì</span>
                </div>
              </label>

              {/* VNPay */}
              <label
                className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'vnpay'
                    ? 'bg-[#142b45] border-[#f7c96d] shadow-lg ring-1 ring-[#f7c96d]'
                    : 'bg-[#00142a] border-[#203650] hover:border-[#aec9eb]/40'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="vnpay"
                  checked={paymentMethod === 'vnpay'}
                  onChange={() => setPaymentMethod('vnpay')}
                  className="accent-[#f7c96d]"
                />
                <div className="w-9 h-9 rounded-lg bg-[#005ba9] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  VNP
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#d3e4ff]">VNPay SmartPay</span>
                  <span className="text-[11px] text-[#aec9eb]">Hỗ trợ tất cả app ngân hàng</span>
                </div>
              </label>

              {/* International Card */}
              <label
                className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-[#142b45] border-[#f7c96d] shadow-lg ring-1 ring-[#f7c96d]'
                    : 'bg-[#00142a] border-[#203650] hover:border-[#aec9eb]/40'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="accent-[#f7c96d]"
                />
                <div className="w-9 h-9 rounded-lg bg-[#142b45] border border-[#d9ae55]/40 text-[#f7c96d] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">credit_card</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#d3e4ff]">Thẻ Quốc Tế (Visa / MC)</span>
                  <span className="text-[11px] text-[#aec9eb]">Bảo mật 3D-Secure 2.0</span>
                </div>
              </label>

              {/* Nova Elite Points */}
              <label
                className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'points'
                    ? 'bg-[#142b45] border-[#f7c96d] shadow-lg ring-1 ring-[#f7c96d]'
                    : 'bg-[#00142a] border-[#203650] hover:border-[#aec9eb]/40'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="points"
                  checked={paymentMethod === 'points'}
                  onChange={() => setPaymentMethod('points')}
                  className="accent-[#f7c96d]"
                />
                <div className="w-9 h-9 rounded-lg bg-[#d9ae55] text-[#402d00] flex items-center justify-center font-bold text-xs shrink-0">
                  PTS
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#d3e4ff]">Điểm Nova Elite Pass</span>
                  <span className="text-[11px] text-[#f7c96d]">Khả dụng: {user.points.toLocaleString()} pts</span>
                </div>
              </label>
            </div>
          </div>

          {/* Customer Info Form */}
          <div className="rounded-2xl bg-[#07203a] border border-[#142b45] p-6 shadow-xl flex flex-col gap-4">
            <h3 className="text-base font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro'] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f7c96d]">person</span>
              <span>Thông Tin Người Nhận Vé Điện Tử</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#aec9eb] font-semibold">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-3 py-2.5 text-xs font-medium focus:border-[#f7c96d] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#aec9eb] font-semibold">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-3 py-2.5 text-xs font-medium focus:border-[#f7c96d] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#aec9eb] font-semibold">
                  Email nhận vé & QR code
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-3 py-2.5 text-xs font-medium focus:border-[#f7c96d] focus:outline-none"
                />
              </div>
            </div>

            {/* VAT Invoice Toggle */}
            <div className="pt-3 border-t border-[#142b45]">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#aec9eb] cursor-pointer">
                <input
                  type="checkbox"
                  checked={requestInvoice}
                  onChange={(e) => setRequestInvoice(e.target.checked)}
                  className="accent-[#f7c96d] rounded w-4 h-4"
                />
                <span>Yêu cầu xuất Hóa đơn Giá trị gia tăng (VAT) điện tử</span>
              </label>

              {requestInvoice && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#00142a] border border-[#203650]">
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-[11px] text-[#aec9eb]">Tên doanh nghiệp / Công ty</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="bg-[#142b45] text-[#d3e4ff] border border-[#203650] rounded-lg px-3 py-2 text-xs focus:border-[#f7c96d] focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-[#aec9eb]">Mã số thuế</label>
                    <input
                      type="text"
                      value={taxCode}
                      onChange={(e) => setTaxCode(e.target.value)}
                      className="bg-[#142b45] text-[#d3e4ff] border border-[#203650] rounded-lg px-3 py-2 text-xs focus:border-[#f7c96d] focus:outline-none font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-3">
                    <label className="text-[11px] text-[#aec9eb]">Địa chỉ doanh nghiệp</label>
                    <input
                      type="text"
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      className="bg-[#142b45] text-[#d3e4ff] border border-[#203650] rounded-lg px-3 py-2 text-xs focus:border-[#f7c96d] focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Summary Sidebar (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#07203a] border border-[#d9ae55]/30 rounded-2xl p-6 shadow-2xl flex flex-col gap-5 sticky top-28">
            <h3 className="text-base font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro'] pb-3 border-b border-[#142b45]">
              Tổng Kết Chi Phí Thanh Toán
            </h3>

            {/* Breakdown items */}
            <div className="flex flex-col gap-2.5 text-xs text-[#aec9eb]">
              <div className="flex justify-between">
                <span>Vé xem phim ({selectedSeats.length} vị trí):</span>
                <span className="font-semibold text-[#d3e4ff]">
                  {totalSeatPrice.toLocaleString('vi-VN')}đ
                </span>
              </div>

              {comboDetails.map((c, i) => (
                <div key={i} className="flex justify-between">
                  <span>{c.name} (x{c.qty}):</span>
                  <span className="font-semibold text-[#d3e4ff]">
                    {c.price.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              ))}

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#22c55e]">
                  <span>Mã ưu đãi ({appliedVoucher?.code}):</span>
                  <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}

              <div className="flex justify-between text-[11px] text-[#9a8f7e] pt-2 border-t border-[#142b45]">
                <span>Phí dịch vụ & tiện ích:</span>
                <span className="text-[#22c55e]">Miễn phí (VIP Gold)</span>
              </div>

              <div className="flex justify-between items-center text-sm font-bold text-[#d3e4ff] pt-3 border-t border-[#142b45]">
                <span>Tổng tiền cần thanh toán:</span>
                <span className="text-2xl font-extrabold text-[#f7c96d] font-mono">
                  {grandTotal.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>

            {/* Primary Payment CTA */}
            <button
              onClick={handlePayNow}
              disabled={isProcessing}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d9ae55] to-[#f7c96d] text-[#402d00] font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-[#f7c96d]/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                  <span>Đang Xác Thực Thanh Toán...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                  <span>Thanh Toán An Toàn ({grandTotal.toLocaleString('vi-VN')}đ)</span>
                </>
              )}
            </button>

            {/* SRS Test Scenarios */}
            <div className="pt-3 border-t border-[#142b45] flex flex-col gap-2">
              <span className="text-[10px] uppercase font-bold text-[#aec9eb] tracking-wider">
                SRS Kiểm Thử Tình Huống Kịch Bản:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => simulatePaymentSuccess(paymentMethod)}
                  className="py-2 px-2.5 rounded-lg bg-[#22c55e]/20 hover:bg-[#22c55e]/30 text-[#22c55e] text-[11px] font-bold border border-[#22c55e]/30 transition-colors"
                >
                  ⚡ Mô phỏng Thành công
                </button>
                <button
                  onClick={() => setTimeoutModalOpen(true)}
                  className="py-2 px-2.5 rounded-lg bg-[#93000a]/20 hover:bg-[#93000a]/30 text-[#ffb4ab] text-[11px] font-bold border border-[#93000a]/30 transition-colors"
                >
                  ⏱ Mô phỏng Hết giờ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeout simulation modal */}
      {timeoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#07203a] border border-[#ffb4ab]/40 rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center gap-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-[#93000a]/30 border border-[#ffb4ab]/50 flex items-center justify-center text-[#ffb4ab]">
              <span className="material-symbols-outlined text-3xl">timer_off</span>
            </div>
            <h3 className="text-xl font-bold text-[#ffdad6] font-['Be_Vietnam_Pro']">
              Hết Thời Gian Giữ Ghế (Atomic Lock Expired)
            </h3>
            <p className="text-xs text-[#d1c5b2] leading-relaxed">
              Phiên giao dịch đã quá thời hạn 9 phút. Để bảo đảm tính công bằng cho các khách hàng khác đang chờ, hệ thống đã tự động giải phóng vị trí ghế đã chọn.
            </p>
            <div className="flex items-center gap-3 w-full pt-2">
              <button
                onClick={() => {
                  setTimeoutModalOpen(false);
                  navigateTo('seat-selection');
                }}
                className="flex-1 py-3 rounded-xl bg-[#f7c96d] hover:bg-[#ffdea2] text-[#402d00] font-bold text-xs uppercase transition-colors"
              >
                Chọn Lại Ghế Ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
