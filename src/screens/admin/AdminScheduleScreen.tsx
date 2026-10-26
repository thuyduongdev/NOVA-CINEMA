import React, { useState } from 'react';
import { useCinema } from '../../context/CinemaContext';
import { AdminLayout } from './AdminLayout';

export const AdminScheduleScreen: React.FC = () => {
  const {
    showtimes,
    movies,
    cinemas,
    adminAddShowtime,
    adminDeleteShowtime,
  } = useCinema();

  const [selectedCinemaId, setSelectedCinemaId] = useState('landmark81');
  const [selectedDate, setSelectedDate] = useState('2025-05-18');
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);

  // Form states for adding showtime
  const [formMovieId, setFormMovieId] = useState(movies[0].id);
  const [formHallId, setFormHallId] = useState('hall-01');
  const [formStartTime, setFormStartTime] = useState('22:30');
  const [formStandardPrice, setFormStandardPrice] = useState(140000);
  const [formVipPrice, setFormVipPrice] = useState(180000);
  const [conflictError, setConflictError] = useState<string | null>(null);

  const selectedMovieObj = movies.find((m) => m.id === formMovieId) || movies[0];

  // Halls at landmark 81
  const halls = [
    { id: 'hall-01', name: 'Hall 01 - IMAX Laser GT Dual', format: 'IMAX Laser GT', color: '#f7c96d' },
    { id: 'hall-02', name: 'Hall 02 - VIP Suite Lounge', format: 'VIP Gold Lounge', color: '#d9ae55' },
    { id: 'hall-03', name: 'Hall 03 - Dolby Atmos Prestige', format: 'Dolby Atmos', color: '#aec9eb' },
    { id: 'hall-04', name: 'Hall 04 - ScreenX Panoramic', format: 'ScreenX 270°', color: '#e7cc9d' },
  ];

  // Calculate projected end time
  const calculateEndTime = (start: string, durationMin: number): string => {
    const [h, m] = start.split(':').map(Number);
    const totalMin = (h || 0) * 60 + (m || 0) + durationMin;
    const endH = Math.floor(totalMin / 60) % 24;
    const endM = totalMin % 60;
    return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
  };

  const calculatedEndTime = calculateEndTime(formStartTime, selectedMovieObj.duration);

  const handleCreateShowtime = (e: React.FormEvent) => {
    e.preventDefault();
    setConflictError(null);

    const hallObj = halls.find((h) => h.id === formHallId) || halls[0];

    const result = adminAddShowtime({
      movieId: formMovieId,
      cinemaId: selectedCinemaId,
      hallId: formHallId,
      hallName: hallObj.name,
      format: hallObj.format,
      date: selectedDate,
      startTime: formStartTime,
      endTime: calculatedEndTime,
      priceStandard: Number(formStandardPrice),
      priceVip: Number(formVipPrice),
      priceSweetbox: Number(formVipPrice) * 1.8,
      availableSeats: 48,
      totalSeats: 48,
      status: 'available',
    });

    if (!result.success) {
      setConflictError(result.conflictMessage || 'Phát hiện xung đột lịch chiếu.');
    } else {
      setCreateDrawerOpen(false);
    }
  };

  // Convert time to percentage on Gantt timeline from 09:00 (540m) to 25:00 (1500m)
  const timelineStart = 9 * 60; // 09:00
  const timelineTotal = 16 * 60; // 16 hours
  const getTimeLeftPercent = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    let totalMin = h * 60 + m;
    if (totalMin < timelineStart) totalMin += 24 * 60; // next day after midnight
    return Math.max(0, Math.min(100, ((totalMin - timelineStart) / timelineTotal) * 100));
  };

  const getTimeWidthPercent = (startStr: string, endStr: string) => {
    const [sh, sm] = startStr.split(':').map(Number);
    const [eh, em] = endStr.split(':').map(Number);
    let startMin = sh * 60 + sm;
    let endMin = eh * 60 + em;
    if (endMin < startMin) endMin += 24 * 60;
    const durMin = endMin - startMin;
    return Math.max(2, Math.min(100, (durMin / timelineTotal) * 100));
  };

  const currentShowtimes = showtimes.filter(
    (st) => st.cinemaId === selectedCinemaId && st.date === selectedDate
  );

  return (
    <AdminLayout activeSection="admin-schedule">
      <div className="flex flex-col gap-8 max-w-7xl">
        {/* Top Header & Conflict Detector Banner */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-4 border-b border-[#142b45]">
          <div>
            <div className="flex items-center gap-2 text-[#f7c96d] text-xs uppercase font-bold tracking-widest">
              <span className="material-symbols-outlined text-[16px]">calendar_month</span>
              <span>Điều Phối Suất Chiếu & Gantt Matrix (AD04)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#d3e4ff] tracking-tight font-['Be_Vietnam_Pro'] mt-1">
              Quản Lý Lịch Chiếu & Smart Conflict Detector
            </h1>
            <p className="text-xs text-[#aec9eb] mt-0.5">
              Hệ thống tự động rà soát giao thoa suất chiếu, đảm bảo khoảng đệm dọn dẹp tối thiểu +15 phút giữa các ca phim.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setConflictError(null);
                setCreateDrawerOpen(true);
              }}
              className="py-3 px-5 rounded-xl bg-gradient-to-r from-[#d9ae55] to-[#f7c96d] text-[#402d00] font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#f7c96d]/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Tạo Suất Chiếu Mới</span>
            </button>
          </div>
        </div>

        {/* Conflict Detector Status Pill */}
        <div className="p-4 rounded-2xl bg-[#07203a] border border-[#22c55e]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22c55e]/20 text-[#22c55e] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">verified_user</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#d3e4ff]">
                  Trạng Thái Thuật Toán: Sẵn Sàng (Zero-Conflict Active)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#22c55e]/20 text-[#22c55e] text-[10px] font-bold">
                  Bảo đảm +15m Buffer
                </span>
              </div>
              <p className="text-[11px] text-[#aec9eb] mt-0.5">
                Khi thêm suất chiếu mới, hệ thống tự động cộng thêm 15 phút bảo trì và vệ sinh phòng trước khi cho phép ca tiếp theo bắt đầu.
              </p>
            </div>
          </div>
        </div>

        {/* 16-HOUR VISUAL GANTT CHART ROOM TIMELINE MATRIX */}
        <div className="bg-[#07203a] border border-[#142b45] rounded-3xl p-6 shadow-xl flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f7c96d]">view_timeline</span>
              <h3 className="text-base font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
                Biểu Đồ Gantt Tiến Độ Chiếu 16 Giờ (09:00 - 01:00)
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#aec9eb]">Ngày:</span>
              <span className="font-mono text-[#f7c96d] font-bold">18/05/2025</span>
            </div>
          </div>

          {/* Timeline Viewport */}
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[900px] flex flex-col gap-4">
              {/* Timeline Header Hours */}
              <div className="grid grid-cols-16 pl-48 text-[10px] font-mono font-bold text-[#aec9eb] border-b border-[#203650] pb-2">
                {[
                  '09:00',
                  '10:00',
                  '11:00',
                  '12:00',
                  '13:00',
                  '14:00',
                  '15:00',
                  '16:00',
                  '17:00',
                  '18:00',
                  '19:00',
                  '20:00',
                  '21:00',
                  '22:00',
                  '23:00',
                  '24:00',
                ].map((hour) => (
                  <div key={hour} className="text-center">
                    {hour}
                  </div>
                ))}
              </div>

              {/* Hall Rows */}
              {halls.map((hall) => {
                const hallShowtimes = currentShowtimes.filter((st) => st.hallId === hall.id);

                return (
                  <div key={hall.id} className="flex items-center h-16 border-b border-[#142b45]/50 group">
                    {/* Hall Label (48 = 12rem = 192px) */}
                    <div className="w-48 shrink-0 flex flex-col justify-center pr-3">
                      <span className="text-xs font-bold text-[#d3e4ff] truncate">{hall.name}</span>
                      <span className="text-[10px] text-[#f7c96d] truncate">{hall.format}</span>
                    </div>

                    {/* Timeline Canvas */}
                    <div className="flex-1 h-12 bg-[#00142a] rounded-xl border border-[#203650] relative overflow-hidden">
                      {/* Grid background lines */}
                      <div className="absolute inset-0 grid grid-cols-16 pointer-events-none opacity-20 divide-x divide-[#aec9eb]">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div key={i} className="h-full"></div>
                        ))}
                      </div>

                      {/* Showtime Blocks */}
                      {hallShowtimes.map((st) => {
                        const m = movies.find((movie) => movie.id === st.movieId);
                        const leftPercent = getTimeLeftPercent(st.startTime);
                        const widthPercent = getTimeWidthPercent(st.startTime, st.endTime);

                        return (
                          <div
                            key={st.id}
                            style={{
                              left: `${leftPercent}%`,
                              width: `${widthPercent}%`,
                            }}
                            className="absolute top-1 bottom-1 rounded-lg bg-gradient-to-r from-[#142b45] to-[#203650] border border-[#f7c96d] p-1.5 flex flex-col justify-between shadow-md group/block hover:brightness-125 transition-all overflow-hidden z-10"
                            title={`${m?.title || 'Phim'} (${st.startTime} - ${st.endTime})`}
                          >
                            <span className="text-[10px] font-bold text-[#f7c96d] truncate leading-tight">
                              {m?.title || 'Phim'}
                            </span>
                            <span className="text-[9px] font-mono text-[#aec9eb] truncate">
                              {st.startTime} ~ {st.endTime}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Showtime List Table */}
        <div className="bg-[#07203a] border border-[#142b45] rounded-3xl p-6 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#142b45]">
            <h3 className="text-base font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
              Danh Sách Suất Chiếu Đang Khai Thác
            </h3>
            <span className="text-xs text-[#f7c96d] font-semibold">
              Tổng cộng {currentShowtimes.length} suất chiếu
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#aec9eb]">
              <thead className="text-[11px] uppercase tracking-wider text-[#f7c96d] bg-[#00142a] border-b border-[#203650]">
                <tr>
                  <th className="py-3 px-4">Phòng Chiếu</th>
                  <th className="py-3 px-4">Tác Phẩm</th>
                  <th className="py-3 px-4">Định Dạng</th>
                  <th className="py-3 px-4">Khung Giờ</th>
                  <th className="py-3 px-4">Giá Vé (Thường/VIP)</th>
                  <th className="py-3 px-4">Ghế Trống</th>
                  <th className="py-3 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#142b45]">
                {currentShowtimes.map((st) => {
                  const m = movies.find((item) => item.id === st.movieId);
                  return (
                    <tr key={st.id} className="hover:bg-[#142b45]/40 transition-colors">
                      <td className="py-3 px-4 font-semibold text-[#d3e4ff]">{st.hallName}</td>
                      <td className="py-3 px-4">
                        <strong className="text-[#d3e4ff] block">{m?.title || st.movieId}</strong>
                        <span className="text-[10px] text-[#9a8f7e]">Độ dài: {m?.duration} phút</span>
                      </td>
                      <td className="py-3 px-4 text-[#f7c96d] font-semibold">{st.format}</td>
                      <td className="py-3 px-4 font-mono font-bold text-[#d3e4ff]">
                        {st.startTime} - {st.endTime}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px]">
                        {st.priceStandard.toLocaleString()}đ / {st.priceVip.toLocaleString()}đ
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-[#22c55e]">{st.availableSeats}</span>
                        <span className="text-[#9a8f7e]">/{st.totalSeats}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Bạn có chắc muốn hủy suất chiếu ${st.startTime} tại ${st.hallName}?`)) {
                              adminDeleteShowtime(st.id);
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#93000a]/20 hover:bg-[#93000a]/40 text-[#ffb4ab] text-[11px] font-semibold transition-colors"
                        >
                          Hủy Suất
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Slide-over Drawer for Creating Showtime */}
      {createDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
          <div className="w-full max-w-lg bg-[#07203a] border-l border-[#d9ae55]/40 h-full p-8 overflow-y-auto flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#142b45]">
                <div className="flex items-center gap-2 text-[#f7c96d]">
                  <span className="material-symbols-outlined">add_alarm</span>
                  <h3 className="text-lg font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
                    Xếp Lịch Suất Chiếu Mới (AD04)
                  </h3>
                </div>
                <button
                  onClick={() => setCreateDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#142b45] text-[#aec9eb] flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              {/* Conflict Error Notice */}
              {conflictError && (
                <div className="p-4 rounded-xl bg-[#93000a]/30 border border-[#ffb4ab]/50 text-[#ffdad6] text-xs flex items-start gap-3 animate-in shake">
                  <span className="material-symbols-outlined text-[20px] text-[#ffb4ab] shrink-0 mt-0.5">
                    warning
                  </span>
                  <div>
                    <strong className="block text-[#ffb4ab] font-bold">
                      Cảnh Báo Xung Đột Lịch Chiếu (AD04 Collision)
                    </strong>
                    <p className="mt-1 leading-relaxed">{conflictError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleCreateShowtime} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase text-[#aec9eb] font-semibold">Chọn phim chiếu</label>
                  <select
                    value={formMovieId}
                    onChange={(e) => setFormMovieId(e.target.value)}
                    className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs focus:border-[#f7c96d] focus:outline-none"
                  >
                    {movies.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title} ({m.duration} phút)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase text-[#aec9eb] font-semibold">Chọn phòng chiếu</label>
                  <select
                    value={formHallId}
                    onChange={(e) => setFormHallId(e.target.value)}
                    className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs focus:border-[#f7c96d] focus:outline-none"
                  >
                    {halls.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase text-[#aec9eb] font-semibold">Giờ bắt đầu (HH:mm)</label>
                    <input
                      type="time"
                      required
                      value={formStartTime}
                      onChange={(e) => setFormStartTime(e.target.value)}
                      className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2 text-xs focus:border-[#f7c96d] focus:outline-none font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase text-[#aec9eb] font-semibold">
                      Giờ kết thúc (+15m vệ sinh)
                    </label>
                    <div className="bg-[#142b45] text-[#f7c96d] border border-[#203650] rounded-xl px-4 py-2 text-xs font-mono font-bold">
                      {calculatedEndTime}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase text-[#aec9eb] font-semibold">Giá vé thường (VNĐ)</label>
                    <input
                      type="number"
                      value={formStandardPrice}
                      onChange={(e) => setFormStandardPrice(Number(e.target.value))}
                      className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2 text-xs focus:border-[#f7c96d] focus:outline-none font-mono"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase text-[#aec9eb] font-semibold">Giá vé VIP (VNĐ)</label>
                    <input
                      type="number"
                      value={formVipPrice}
                      onChange={(e) => setFormVipPrice(Number(e.target.value))}
                      className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2 text-xs focus:border-[#f7c96d] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#00142a] border border-[#203650] text-[11px] text-[#aec9eb] leading-relaxed">
                  💡 <strong>Cơ chế tự động AD04:</strong> Thời gian chiếm dụng phòng chiếu thực tế sẽ là{' '}
                  <span className="text-[#f7c96d] font-bold">{selectedMovieObj.duration} phút chiếu + 15 phút dọn dẹp</span>.
                  Nếu trùng lặp với bất kỳ suất nào trong cùng phòng chiếu, hệ thống sẽ ngăn chặn việc lưu để tránh sự cố kỹ thuật.
                </div>

                <button
                  type="submit"
                  className="mt-4 py-3.5 rounded-xl bg-[#f7c96d] hover:bg-[#ffdea2] text-[#402d00] font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  Xác Thực & Thêm Suất Chiếu
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
