import React, { useState } from 'react';
import { useCinema } from '../context/CinemaContext';
import { COMBOS } from '../data/cinemaData';

export const SeatSelectionScreen: React.FC = () => {
  const {
    selectedMovie,
    selectedCinema,
    selectedShowtime,
    selectedSeats,
    toggleSeat,
    selectedCombos,
    updateComboQuantity,
    appliedVoucher,
    applyVoucherCode,
    lockCountdown,
    proceedToCheckout,
    navigateTo,
  } = useCinema();

  const [voucherInput, setVoucherInput] = useState('');
  const [voucherFeedback, setVoucherFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const movie = selectedMovie;
  const cinema = selectedCinema;
  const showtime = selectedShowtime;

  // Format countdown mm:ss
  const minutes = Math.floor(lockCountdown / 60);
  const seconds = lockCountdown % 60;
  const formattedCountdown = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Price calculations
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
  Object.entries(selectedCombos).forEach(([comboId, qty]) => {
    const c = COMBOS.find((item) => item.id === comboId);
    if (c && qty > 0) {
      totalComboPrice += c.price * qty;
    }
  });

  const discountAmount = appliedVoucher?.discount || 0;
  const grandTotal = Math.max(0, totalSeatPrice + totalComboPrice - discountAmount);

  // Sold seats simulation
  const soldSeats = ['A01', 'A02', 'B07', 'B08', 'C03', 'C04', 'D11', 'D12', 'E05', 'E06', 'G09', 'G10', 'H01', 'H02'];
  const heldSeats = ['C09', 'F03'];

  // Handle voucher
  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherInput.trim()) return;
    const res = applyVoucherCode(voucherInput);
    setVoucherFeedback(res);
  };

  const rowsStandard = ['A', 'B', 'C', 'D'];
  const rowsVip = ['E', 'F', 'G', 'H'];

  return (
    <div className="w-full min-h-screen pt-24 pb-20 px-4 sm:px-8 lg:px-12 max-w-[1720px] mx-auto flex flex-col gap-6">
      {/* Top Banner: Navigation and Atomic Lock Countdown */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#07203a] border border-[#142b45] shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('schedule')}
            className="w-9 h-9 rounded-xl bg-[#142b45] hover:bg-[#203650] text-[#aec9eb] hover:text-[#d3e4ff] flex items-center justify-center transition-colors"
            title="Quay lại lịch chiếu"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div>
            <div className="flex items-center gap-2 text-[11px] text-[#aec9eb]">
              <span>{cinema.name}</span>
              <span>•</span>
              <span className="text-[#f7c96d] font-semibold">{showtime?.hallName}</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
              {movie.title} ({showtime?.startTime} ~ {showtime?.endTime})
            </h1>
          </div>
        </div>

        {/* Atomic Lock Timer Badge */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#00142a] border border-[#d9ae55]/30 shadow-inner shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#142b45] flex items-center justify-center text-[#f7c96d]">
            <span className="material-symbols-outlined text-[20px] animate-pulse">timer</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-[#aec9eb]">Thời gian giữ ghế</span>
            <span className="text-lg font-mono font-bold text-[#f7c96d] leading-none">
              {formattedCountdown}
            </span>
          </div>
        </div>
      </div>

      {/* Main 70:30 Desktop Split Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Auditorium Interactive Seatmap */}
        <div className="xl:col-span-8 flex flex-col gap-6 bg-[#031c36] border border-[#142b45] rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Curved Projection Screen */}
          <div className="flex flex-col items-center justify-center relative select-none pt-2 pb-6">
            <div className="w-4/5 max-w-[640px] h-16 bg-gradient-to-b from-[#f7c96d]/25 via-[#f7c96d]/5 to-transparent blur-xl pointer-events-none rounded-t-full"></div>

            <div className="relative w-4/5 max-w-[680px] flex flex-col items-center -mt-8">
              <svg
                className="w-full text-[#f7c96d] drop-shadow-[0_0_18px_rgba(247,201,109,0.55)]"
                fill="none"
                viewBox="0 0 700 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 20 42 Q 350 4 680 42"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="5"
                ></path>
                <path
                  d="M 24 45 Q 350 8 676 45"
                  opacity="0.4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                ></path>
              </svg>
              <div className="flex items-center gap-2 -mt-1 text-[#f7c96d] tracking-[0.25em] text-[10px] sm:text-xs font-bold uppercase font-['Be_Vietnam_Pro']">
                <span className="material-symbols-outlined text-[14px]">theaters</span>
                <span>MÀN HÌNH CHIẾU IMAX LASER GT / DUAL 4K</span>
                <span className="material-symbols-outlined text-[14px]">theaters</span>
              </div>
            </div>

            {/* Sound and optimal viewing guide */}
            <div className="w-full flex justify-between px-4 text-[#9a8f7e] text-[10px] uppercase font-semibold mt-4">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">surround_sound</span> DOLBY ATMOS TRÁI
              </span>
              <span className="text-[#f7c96d]">TẦM NHÌN TỐI ƯU (HÀNG E - H)</span>
              <span className="flex items-center gap-1">
                DOLBY ATMOS PHẢI <span className="material-symbols-outlined text-[13px]">surround_sound</span>
              </span>
            </div>
          </div>

          {/* Seat Status Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-3 px-4 bg-[#07203a] rounded-xl border border-[#142b45] text-xs">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-t-md bg-[#142b45] border border-[#9a8f7e]/50"></div>
              <span className="text-[#aec9eb]">Thường (140k)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-t-md bg-[#304b68] border border-[#f7c96d]"></div>
              <span className="text-[#d3e4ff]">VIP Prime (180k)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-5 rounded-full bg-[#93000a]/80 border border-[#f7c96d]"></div>
              <span className="text-[#d3e4ff]">Sweetbox đôi (320k)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-t-md bg-[#f7c96d] text-[#402d00] font-bold text-[10px] flex items-center justify-center">
                ✓
              </div>
              <span className="text-[#f7c96d] font-bold">Đang chọn</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-t-md bg-[#203650] text-[#9a8f7e] flex items-center justify-center text-[10px] opacity-70">
                ✕
              </div>
              <span className="text-[#9a8f7e]">Đã bán</span>
            </div>
          </div>

          {/* Interactive Auditorium Grid */}
          <div className="overflow-x-auto pb-4 pt-2">
            <div className="min-w-[680px] flex flex-col gap-2.5 items-center justify-center">
              {/* Rows A - D: Standard Seats */}
              {rowsStandard.map((row) => (
                <div key={row} className="flex items-center gap-3">
                  <span className="w-5 text-center font-bold text-xs text-[#aec9eb]">{row}</span>
                  {/* Left block 4 seats */}
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4].map((num) => {
                      const seatId = `${row}${String(num).padStart(2, '0')}`;
                      const isSold = soldSeats.includes(seatId);
                      const isHeld = heldSeats.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          disabled={isSold || isHeld}
                          onClick={() => toggleSeat(seatId)}
                          title={`${seatId} - Ghế Thường (${seatPriceStandard.toLocaleString()}đ)`}
                          className={`w-6 h-6 rounded-t-md text-[10px] font-semibold flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-[#f7c96d] text-[#402d00] font-bold shadow-[0_0_10px_rgba(247,201,109,0.7)] scale-110'
                              : isSold
                              ? 'bg-[#203650] text-[#9a8f7e] opacity-40 cursor-not-allowed'
                              : isHeld
                              ? 'bg-[#142b45] border border-dashed border-[#e7cc9d] text-[#e7cc9d] cursor-not-allowed'
                              : 'bg-[#142b45] hover:bg-[#304b68] text-[#aec9eb] border border-[#9a8f7e]/30'
                          }`}
                        >
                          {isSelected ? '✓' : isSold ? '✕' : num}
                        </button>
                      );
                    })}
                  </div>

                  {/* Aisle gap */}
                  <div className="w-6"></div>

                  {/* Center block 6 seats */}
                  <div className="flex items-center gap-1.5">
                    {[5, 6, 7, 8, 9, 10].map((num) => {
                      const seatId = `${row}${String(num).padStart(2, '0')}`;
                      const isSold = soldSeats.includes(seatId);
                      const isHeld = heldSeats.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          disabled={isSold || isHeld}
                          onClick={() => toggleSeat(seatId)}
                          title={`${seatId} - Ghế Thường (${seatPriceStandard.toLocaleString()}đ)`}
                          className={`w-6 h-6 rounded-t-md text-[10px] font-semibold flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-[#f7c96d] text-[#402d00] font-bold shadow-[0_0_10px_rgba(247,201,109,0.7)] scale-110'
                              : isSold
                              ? 'bg-[#203650] text-[#9a8f7e] opacity-40 cursor-not-allowed'
                              : isHeld
                              ? 'bg-[#142b45] border border-dashed border-[#e7cc9d] text-[#e7cc9d] cursor-not-allowed'
                              : 'bg-[#142b45] hover:bg-[#304b68] text-[#aec9eb] border border-[#9a8f7e]/30'
                          }`}
                        >
                          {isSelected ? '✓' : isSold ? '✕' : num}
                        </button>
                      );
                    })}
                  </div>

                  {/* Aisle gap */}
                  <div className="w-6"></div>

                  {/* Right block 4 seats */}
                  <div className="flex items-center gap-1.5">
                    {[11, 12, 13, 14].map((num) => {
                      const seatId = `${row}${String(num).padStart(2, '0')}`;
                      const isSold = soldSeats.includes(seatId);
                      const isHeld = heldSeats.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          disabled={isSold || isHeld}
                          onClick={() => toggleSeat(seatId)}
                          title={`${seatId} - Ghế Thường (${seatPriceStandard.toLocaleString()}đ)`}
                          className={`w-6 h-6 rounded-t-md text-[10px] font-semibold flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-[#f7c96d] text-[#402d00] font-bold shadow-[0_0_10px_rgba(247,201,109,0.7)] scale-110'
                              : isSold
                              ? 'bg-[#203650] text-[#9a8f7e] opacity-40 cursor-not-allowed'
                              : isHeld
                              ? 'bg-[#142b45] border border-dashed border-[#e7cc9d] text-[#e7cc9d] cursor-not-allowed'
                              : 'bg-[#142b45] hover:bg-[#304b68] text-[#aec9eb] border border-[#9a8f7e]/30'
                          }`}
                        >
                          {isSelected ? '✓' : isSold ? '✕' : num}
                        </button>
                      );
                    })}
                  </div>
                  <span className="w-5 text-center font-bold text-xs text-[#aec9eb]">{row}</span>
                </div>
              ))}

              {/* Central Divider Indicator */}
              <div className="w-full flex items-center justify-center my-1 text-[10px] text-[#f7c96d] uppercase tracking-widest font-bold">
                ─── KHU VỰC GHẾ VIP PRIME (TẦM NHÌN HOÀN HẢO) ───
              </div>

              {/* Rows E - H: VIP Prime Seats */}
              {rowsVip.map((row) => (
                <div key={row} className="flex items-center gap-3">
                  <span className="w-5 text-center font-bold text-xs text-[#f7c96d]">{row}</span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4].map((num) => {
                      const seatId = `${row}${String(num).padStart(2, '0')}`;
                      const isSold = soldSeats.includes(seatId);
                      const isHeld = heldSeats.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          disabled={isSold || isHeld}
                          onClick={() => toggleSeat(seatId)}
                          title={`${seatId} - Ghế VIP Prime (${seatPriceVip.toLocaleString()}đ)`}
                          className={`w-6 h-6 rounded-t-md text-[10px] font-semibold flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-[#f7c96d] text-[#402d00] font-bold shadow-[0_0_12px_rgba(247,201,109,0.8)] scale-110'
                              : isSold
                              ? 'bg-[#203650] text-[#9a8f7e] opacity-40 cursor-not-allowed'
                              : isHeld
                              ? 'bg-[#142b45] border border-dashed border-[#e7cc9d] text-[#e7cc9d] cursor-not-allowed'
                              : 'bg-[#304b68] hover:bg-[#d9ae55]/30 text-[#d3e4ff] border border-[#d9ae55]/50'
                          }`}
                        >
                          {isSelected ? '✓' : isSold ? '✕' : num}
                        </button>
                      );
                    })}
                  </div>

                  <div className="w-6"></div>

                  <div className="flex items-center gap-1.5">
                    {[5, 6, 7, 8, 9, 10].map((num) => {
                      const seatId = `${row}${String(num).padStart(2, '0')}`;
                      const isSold = soldSeats.includes(seatId);
                      const isHeld = heldSeats.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          disabled={isSold || isHeld}
                          onClick={() => toggleSeat(seatId)}
                          title={`${seatId} - Ghế VIP Prime (${seatPriceVip.toLocaleString()}đ)`}
                          className={`w-6 h-6 rounded-t-md text-[10px] font-semibold flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-[#f7c96d] text-[#402d00] font-bold shadow-[0_0_12px_rgba(247,201,109,0.8)] scale-110'
                              : isSold
                              ? 'bg-[#203650] text-[#9a8f7e] opacity-40 cursor-not-allowed'
                              : isHeld
                              ? 'bg-[#142b45] border border-dashed border-[#e7cc9d] text-[#e7cc9d] cursor-not-allowed'
                              : 'bg-[#304b68] hover:bg-[#d9ae55]/30 text-[#d3e4ff] border border-[#d9ae55]/50'
                          }`}
                        >
                          {isSelected ? '✓' : isSold ? '✕' : num}
                        </button>
                      );
                    })}
                  </div>

                  <div className="w-6"></div>

                  <div className="flex items-center gap-1.5">
                    {[11, 12, 13, 14].map((num) => {
                      const seatId = `${row}${String(num).padStart(2, '0')}`;
                      const isSold = soldSeats.includes(seatId);
                      const isHeld = heldSeats.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          disabled={isSold || isHeld}
                          onClick={() => toggleSeat(seatId)}
                          title={`${seatId} - Ghế VIP Prime (${seatPriceVip.toLocaleString()}đ)`}
                          className={`w-6 h-6 rounded-t-md text-[10px] font-semibold flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-[#f7c96d] text-[#402d00] font-bold shadow-[0_0_12px_rgba(247,201,109,0.8)] scale-110'
                              : isSold
                              ? 'bg-[#203650] text-[#9a8f7e] opacity-40 cursor-not-allowed'
                              : isHeld
                              ? 'bg-[#142b45] border border-dashed border-[#e7cc9d] text-[#e7cc9d] cursor-not-allowed'
                              : 'bg-[#304b68] hover:bg-[#d9ae55]/30 text-[#d3e4ff] border border-[#d9ae55]/50'
                          }`}
                        >
                          {isSelected ? '✓' : isSold ? '✕' : num}
                        </button>
                      );
                    })}
                  </div>
                  <span className="w-5 text-center font-bold text-xs text-[#f7c96d]">{row}</span>
                </div>
              ))}

              {/* Row J: Sweetbox Double-Wide Loungers */}
              <div className="w-full flex items-center justify-center my-2 text-[10px] text-[#ffdad6] uppercase tracking-widest font-bold">
                ─── HÀNG GHẾ ĐÔI SWEETBOX LOUNGER ───
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 text-center font-bold text-xs text-[#ffb4ab]">J</span>
                <div className="flex items-center gap-3">
                  {['J01-02', 'J03-04', 'J05-06', 'J07-08', 'J09-10'].map((coupleId, idx) => {
                    const isSelected = selectedSeats.includes(coupleId);
                    return (
                      <button
                        key={coupleId}
                        onClick={() => toggleSeat(coupleId)}
                        title={`${coupleId} - Sweetbox (${seatPriceSweetbox.toLocaleString()}đ)`}
                        className={`w-14 h-6 rounded-full text-[10px] font-semibold flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#f7c96d] text-[#402d00] font-bold shadow-[0_0_12px_rgba(247,201,109,0.8)] scale-105'
                            : 'bg-[#93000a]/70 hover:bg-[#93000a] text-[#ffdad6] border border-[#d9ae55]/40'
                        }`}
                      >
                        {isSelected ? '✓ Đôi' : `SB ${idx + 1}`}
                      </button>
                    );
                  })}
                </div>
                <span className="w-5 text-center font-bold text-xs text-[#ffb4ab]">J</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Booking Summary & F&B Upsell */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <div className="bg-[#07203a] border border-[#d9ae55]/30 rounded-2xl p-6 shadow-2xl flex flex-col gap-5">
            {/* Movie recap */}
            <div className="flex items-start gap-3 pb-4 border-b border-[#142b45]">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-14 h-20 object-cover rounded-lg shadow-md shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#f7c96d]">
                  {showtime?.format}
                </span>
                <h3 className="text-sm font-bold text-[#d3e4ff] truncate font-['Be_Vietnam_Pro']">
                  {movie.title}
                </h3>
                <p className="text-xs text-[#aec9eb] mt-0.5">{cinema.name}</p>
                <p className="text-xs text-[#f7c96d] font-mono mt-0.5">
                  {showtime?.startTime} - {showtime?.endTime}
                </p>
              </div>
            </div>

            {/* Selected Seats chips */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#aec9eb] uppercase font-semibold text-[11px]">
                  Ghế đã chọn ({selectedSeats.length}):
                </span>
                <span className="font-bold text-[#f7c96d]">
                  {totalSeatPrice.toLocaleString('vi-VN')}đ
                </span>
              </div>

              {selectedSeats.length === 0 ? (
                <div className="p-3 rounded-xl bg-[#00142a] text-center text-xs text-[#9a8f7e] border border-[#203650]">
                  Vui lòng chọn vị trí ngồi trên sơ đồ ghế
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {selectedSeats.map((seat) => (
                    <span
                      key={seat}
                      className="px-2.5 py-1 rounded-lg bg-[#f7c96d] text-[#402d00] font-bold text-xs flex items-center gap-1 shadow-sm"
                    >
                      <span>{seat}</span>
                      <button
                        onClick={() => toggleSeat(seat)}
                        className="hover:opacity-75 focus:outline-none"
                        title="Bỏ chọn"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* F&B Gourmet Combos Section */}
            <div className="pt-2 border-t border-[#142b45]">
              <span className="text-xs uppercase tracking-wider text-[#f7c96d] font-bold block mb-3">
                Combo Ẩm Thực Rạp Chiếu VIP
              </span>
              <div className="space-y-3">
                {COMBOS.map((combo) => {
                  const qty = selectedCombos[combo.id] || 0;
                  return (
                    <div
                      key={combo.id}
                      className="p-3 rounded-xl bg-[#00142a] border border-[#203650] flex items-center justify-between gap-3"
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-[#d3e4ff] truncate">
                          {combo.name}
                        </span>
                        <span className="text-[11px] text-[#f7c96d] font-semibold">
                          {combo.price.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-[#142b45] px-2 py-1 rounded-lg shrink-0">
                        <button
                          onClick={() => updateComboQuantity(combo.id, qty - 1)}
                          className="w-6 h-6 rounded bg-[#203650] text-[#d3e4ff] flex items-center justify-center font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-[#f7c96d] w-4 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateComboQuantity(combo.id, qty + 1)}
                          className="w-6 h-6 rounded bg-[#f7c96d] text-[#402d00] flex items-center justify-center font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Voucher Promo Code */}
            <div className="pt-2 border-t border-[#142b45]">
              <form onSubmit={handleApplyVoucher} className="flex gap-2">
                <input
                  type="text"
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value)}
                  placeholder="Mã ưu đãi (VD: VIPGOLD10)"
                  className="flex-1 bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-3 py-2 text-xs uppercase focus:border-[#f7c96d] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-[#142b45] hover:bg-[#203650] text-xs font-semibold text-[#f7c96d] border border-[#d9ae55]/30 transition-colors"
                >
                  Áp dụng
                </button>
              </form>
              {voucherFeedback && (
                <p
                  className={`text-[11px] mt-1.5 ${
                    voucherFeedback.success ? 'text-[#22c55e]' : 'text-[#ffb4ab]'
                  }`}
                >
                  {voucherFeedback.message}
                </p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="pt-3 border-t border-[#142b45] flex flex-col gap-1.5 text-xs text-[#aec9eb]">
              <div className="flex justify-between">
                <span>Tiền vé ({selectedSeats.length} ghế):</span>
                <span>{totalSeatPrice.toLocaleString('vi-VN')}đ</span>
              </div>
              {totalComboPrice > 0 && (
                <div className="flex justify-between">
                  <span>Combo ẩm thực:</span>
                  <span>{totalComboPrice.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#22c55e]">
                  <span>Ưu đãi VIP / Voucher:</span>
                  <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm font-bold text-[#d3e4ff] pt-2 border-t border-[#142b45]">
                <span>Tổng cộng:</span>
                <span className="text-xl font-extrabold text-[#f7c96d] font-mono">
                  {grandTotal.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>

            {/* CTA Proceed to Payment */}
            <button
              onClick={proceedToCheckout}
              disabled={selectedSeats.length === 0}
              className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl ${
                selectedSeats.length > 0
                  ? 'bg-gradient-to-r from-[#d9ae55] to-[#f7c96d] text-[#402d00] hover:brightness-110 active:scale-95'
                  : 'bg-[#142b45] text-[#9a8f7e] cursor-not-allowed opacity-60'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">payments</span>
              <span>Tiến Hành Thanh Toán</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
