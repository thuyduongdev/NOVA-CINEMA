import React, { useState } from 'react';
import { useCinema } from '../context/CinemaContext';

export const ScheduleScreen: React.FC = () => {
  const {
    cinemas,
    movies,
    showtimes,
    startBookingForShowtime,
    navigateTo,
  } = useCinema();

  const [selectedCity, setSelectedCity] = useState<'hcm' | 'hanoi' | 'danang'>('hcm');
  const [selectedCinemaId, setSelectedCinemaId] = useState('landmark81');
  const [selectedDate, setSelectedDate] = useState('2025-05-18');
  const [formatFilter, setFormatFilter] = useState('all');

  const activeCinema = cinemas.find((c) => c.id === selectedCinemaId) || cinemas[0];

  const daysList = [
    { dayOfWeek: 'Hôm nay', dateStr: '18/05', fullDate: '2025-05-18', highlight: true },
    { dayOfWeek: 'Ngày mai', dateStr: '19/05', fullDate: '2025-05-19' },
    { dayOfWeek: 'Thứ Ba', dateStr: '20/05', fullDate: '2025-05-20' },
    { dayOfWeek: 'Thứ Tư (VIP)', dateStr: '21/05', fullDate: '2025-05-21' },
    { dayOfWeek: 'Thứ Năm', dateStr: '22/05', fullDate: '2025-05-22' },
    { dayOfWeek: 'Thứ Sáu', dateStr: '23/05', fullDate: '2025-05-23' },
    { dayOfWeek: 'Thứ Bảy', dateStr: '24/05', fullDate: '2025-05-24' },
  ];

  // Filter showtimes for this cinema and date
  const filteredShowtimes = showtimes.filter((st) => {
    if (st.cinemaId !== selectedCinemaId) return false;
    if (formatFilter !== 'all' && st.format !== formatFilter) return false;
    return true;
  });

  // Unique movies that have showtimes here
  const movieIdsWithShowtimes = Array.from(new Set(filteredShowtimes.map((st) => st.movieId)));
  const scheduledMovies = movies.filter((m) => movieIdsWithShowtimes.includes(m.id));

  return (
    <div className="w-full min-h-screen pt-28 pb-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header and Cinema Status */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#142b45]">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#aec9eb]">
            <button onClick={() => navigateTo('home')} className="hover:text-[#f7c96d] transition-colors">
              Trang chủ
            </button>
            <span>/</span>
            <span className="text-[#f7c96d] font-semibold">Lịch Chiếu & Suất Chiếu</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#d3e4ff] tracking-tight font-['Be_Vietnam_Pro'] mt-1">
            Lịch Chiếu Toàn Quốc
          </h1>
          <p className="text-sm text-[#aec9eb] max-w-2xl mt-1">
            Cập nhật tức thời tình trạng ghế trống, thông số kỹ thuật âm thanh và phòng chiếu VIP tại tất cả cụm rạp NOVA CINEMA.
          </p>
        </div>

        {/* Active Cinema Quick Badge */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#07203a] border border-[#d9ae55]/30 shadow-lg shrink-0">
          <div className="w-12 h-12 rounded-xl bg-[#142b45] flex items-center justify-center text-[#f7c96d]">
            <span className="material-symbols-outlined text-[28px]">theaters</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-[#aec9eb]">Cụm rạp đang chọn</span>
            <span className="text-base font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
              {activeCinema.name}
            </span>
            <span className="text-[11px] text-[#f7c96d]">{activeCinema.hallsDesc}</span>
          </div>
        </div>
      </div>

      {/* FILTER CONTROL PANEL */}
      <div className="bg-[#07203a] border border-[#142b45] p-6 rounded-2xl shadow-xl flex flex-col gap-6">
        {/* City and Cinema selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Thành phố */}
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider text-[#aec9eb] font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#f7c96d]">location_on</span>
              <span>1. Khu vực / Tỉnh thành</span>
            </label>
            <div className="grid grid-cols-3 gap-2 bg-[#00142a] p-1.5 rounded-xl border border-[#203650]">
              {[
                { id: 'hcm', label: 'TP. HCM' },
                { id: 'hanoi', label: 'Hà Nội' },
                { id: 'danang', label: 'Đà Nẵng' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCity(c.id as any);
                    if (c.id === 'hcm') setSelectedCinemaId('landmark81');
                    if (c.id === 'hanoi') setSelectedCinemaId('westlake');
                  }}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all text-center ${
                    selectedCity === c.id
                      ? 'bg-[#f7c96d] text-[#402d00] shadow'
                      : 'text-[#aec9eb] hover:text-[#d3e4ff]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Cụm Rạp */}
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider text-[#aec9eb] font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#f7c96d]">apartment</span>
              <span>2. Chọn Cụm Rạp Chiếu</span>
            </label>
            <div className="relative">
              <select
                value={selectedCinemaId}
                onChange={(e) => setSelectedCinemaId(e.target.value)}
                className="w-full appearance-none bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs font-medium focus:border-[#f7c96d] focus:outline-none cursor-pointer"
              >
                {cinemas
                  .filter((c) => (selectedCity === 'hcm' ? c.city === 'hcm' : c.city === 'hanoi'))
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.address.split(',')[0]})
                    </option>
                  ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#aec9eb] text-[18px]">
                expand_more
              </span>
            </div>
          </div>

          {/* 3. Định dạng */}
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider text-[#aec9eb] font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#f7c96d]">tune</span>
              <span>3. Lọc Công Nghệ Chiếu</span>
            </label>
            <div className="relative">
              <select
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value)}
                className="w-full appearance-none bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2.5 text-xs font-medium focus:border-[#f7c96d] focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả định dạng phòng chiếu</option>
                <option value="IMAX Laser GT">IMAX Laser GT Dual 4K</option>
                <option value="Dolby Atmos">Dolby Atmos Spatial Audio</option>
                <option value="VIP Gold Lounge">VIP Gold Suite Lounger</option>
                <option value="ScreenX 270°">ScreenX 270° Panoramic</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#aec9eb] text-[18px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Date Selector Strip (7 Days) */}
        <div className="pt-2 border-t border-[#142b45] flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-wider text-[#aec9eb] font-semibold">
            Chọn Ngày Chiếu:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {daysList.map((d) => {
              const isSelected = selectedDate === d.fullDate;
              return (
                <button
                  key={d.fullDate}
                  onClick={() => setSelectedDate(d.fullDate)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#f7c96d] border-[#f7c96d] text-[#402d00] shadow-lg shadow-[#f7c96d]/20 scale-102'
                      : 'bg-[#00142a] border-[#203650] text-[#d3e4ff] hover:border-[#f7c96d]/50'
                  }`}
                >
                  <span className={`text-[10px] uppercase font-bold ${isSelected ? 'text-[#402d00]' : 'text-[#aec9eb]'}`}>
                    {d.dayOfWeek}
                  </span>
                  <span className="text-base font-extrabold mt-0.5 font-mono">{d.dateStr}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SHOWTIMES BY MOVIE CARDS */}
      <div className="flex flex-col gap-6">
        {scheduledMovies.length === 0 ? (
          <div className="p-16 text-center bg-[#07203a] rounded-2xl border border-[#142b45]">
            <span className="material-symbols-outlined text-4xl text-[#aec9eb] mb-2">event_busy</span>
            <p className="text-base text-[#d3e4ff] font-semibold">Không có suất chiếu phù hợp</p>
            <p className="text-xs text-[#aec9eb] mt-1">
              Vui lòng chọn ngày khác hoặc thử chọn định dạng chiếu "Tất cả".
            </p>
          </div>
        ) : (
          scheduledMovies.map((movie) => {
            const movieStList = filteredShowtimes.filter((st) => st.movieId === movie.id);

            return (
              <div
                key={movie.id}
                className="bg-[#07203a] border border-[#142b45] rounded-2xl p-6 shadow-xl flex flex-col lg:flex-row gap-6"
              >
                {/* Left Movie thumbnail */}
                <div className="flex items-start gap-4 lg:w-72 shrink-0">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-24 h-36 object-cover rounded-xl shadow-lg ring-1 ring-[#d9ae55]/30"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="px-1.5 py-0.5 rounded bg-[#93000a] text-[#ffdad6] text-[10px] font-bold">
                        {movie.ageRating}
                      </span>
                      <span className="text-xs text-[#f7c96d] font-bold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[13px]">star</span>
                        {movie.rating}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#d3e4ff] line-clamp-2 font-['Be_Vietnam_Pro']">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-[#aec9eb] mt-1">
                      {movie.duration} phút • {movie.genres[0]}
                    </p>
                    <button
                      onClick={() => navigateTo('movie-detail', { movieId: movie.id })}
                      className="text-xs text-[#f7c96d] hover:underline font-semibold mt-2 inline-flex items-center gap-1"
                    >
                      <span>Xem thông tin phim</span>
                      <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    </button>
                  </div>
                </div>

                {/* Right Showtimes Pill Matrix */}
                <div className="flex-1 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-[#142b45] pt-4 lg:pt-0 lg:pl-6">
                  <div className="flex items-center justify-between text-xs text-[#aec9eb]">
                    <span className="font-semibold uppercase tracking-wider text-[#f7c96d]">
                      Các Suất Chiếu Hôm Nay:
                    </span>
                    <span className="text-[11px] text-[#aec9eb]">
                      Nhấp vào giờ chiếu để tiến hành chọn ghế trực tiếp
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                    {movieStList.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => startBookingForShowtime(st.id)}
                        className="p-3 rounded-xl bg-[#142b45] border border-[#203650] hover:border-[#f7c96d] text-left transition-all hover:-translate-y-1 hover:shadow-lg group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-base font-bold text-[#d3e4ff] group-hover:text-[#f7c96d] font-mono">
                            {st.startTime}
                          </span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                            st.status === 'low'
                              ? 'bg-[#93000a]/50 text-[#ffb4ab]'
                              : 'bg-[#00142a] text-[#aec9eb]'
                          }`}>
                            {st.status === 'low' ? 'Chỉ còn ' + st.availableSeats : st.availableSeats + ' ghế'}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#aec9eb] truncate mt-1">
                          {st.hallName}
                        </div>
                        <div className="text-[10px] text-[#d1c5b2] mt-0.5">
                          {st.priceStandard.toLocaleString('vi-VN')}đ ~ {st.priceVip.toLocaleString('vi-VN')}đ
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Facility & Location info */}
      <div className="bg-[#07203a] border border-[#142b45] p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#142b45] flex items-center justify-center text-[#f7c96d] shrink-0">
            <span className="material-symbols-outlined text-[24px]">map</span>
          </div>
          <div className="flex flex-col">
            <h4 className="text-sm font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
              Vị trí & Đường đi tới {activeCinema.name}
            </h4>
            <p className="text-xs text-[#aec9eb] mt-0.5">{activeCinema.address}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(activeCinema.address)}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#142b45] hover:bg-[#203650] text-xs font-semibold text-[#f7c96d] border border-[#d9ae55]/30 flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">directions</span>
            <span>Chỉ đường Google Maps</span>
          </a>
          <button
            onClick={() => navigateTo('contact')}
            className="px-4 py-2.5 rounded-xl bg-[#f7c96d] hover:bg-[#ffdea2] text-xs font-bold text-[#402d00] transition-colors"
          >
            Liên hệ lễ tân VIP
          </button>
        </div>
      </div>
    </div>
  );
};
