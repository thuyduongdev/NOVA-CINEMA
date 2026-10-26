import React, { useState } from 'react';
import { useCinema } from '../context/CinemaContext';

export const MovieDetailScreen: React.FC = () => {
  const {
    selectedMovie,
    showtimes,
    cinemas,
    startBookingForShowtime,
    startBookingForMovie,
    navigateTo,
  } = useCinema();

  const [activeDateTab, setActiveDateTab] = useState('2025-05-18');
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const movie = selectedMovie;

  const movieShowtimes = showtimes.filter((st) => st.movieId === movie.id);

  // Group showtimes by Cinema and Hall
  const landmarkShowtimes = movieShowtimes.filter((st) => st.cinemaId === 'landmark81');
  const westlakeShowtimes = movieShowtimes.filter((st) => st.cinemaId === 'westlake');

  return (
    <div className="w-full min-h-screen pt-28 pb-32 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col gap-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#aec9eb]">
        <button onClick={() => navigateTo('home')} className="hover:text-[#f7c96d] transition-colors">
          Trang chủ
        </button>
        <span>/</span>
        <button onClick={() => navigateTo('movies')} className="hover:text-[#f7c96d] transition-colors">
          Phim
        </button>
        <span>/</span>
        <span className="text-[#f7c96d] font-semibold">{movie.title}</span>
      </div>

      {/* Main Grid: Left Poster (4 cols) & Right Trailer/Details (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Poster & Scores */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="relative rounded-2xl overflow-hidden bg-[#07203a] border border-[#d9ae55]/30 shadow-2xl">
            <div className="aspect-[2/3] w-full relative">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07203a] via-transparent to-transparent"></div>

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#93000a] text-[#ffdad6] text-xs font-bold shadow-md">
                  {movie.ageRating}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#00142a]/80 backdrop-blur-md text-[#f7c96d] text-xs font-bold uppercase tracking-wider">
                  {movie.formats[0]}
                </span>
              </div>

              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded bg-[#00142a]/80 backdrop-blur-md text-[#aec9eb] text-xs font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#f7c96d]">spatial_audio</span>
                  Dolby Atmos 12.0
                </span>
              </div>

              {/* Overlaid scores inside poster bottom */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-[#00142a]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#203650]">
                  <span className="text-xl font-bold text-[#f7c96d]">{movie.imdbScore}</span>
                  <div className="flex flex-col text-[10px]">
                    <span className="uppercase text-[#aec9eb] font-bold">IMDb</span>
                    <span className="text-[#d1c5b2]">Top Rated</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#f7c96d]/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#d9ae55]/40 text-[#f7c96d]">
                  <span className="material-symbols-outlined text-[20px]">hotel_class</span>
                  <div className="flex flex-col text-[10px]">
                    <span className="text-sm font-bold leading-none">{movie.rating}/10</span>
                    <span className="text-[#aec9eb]">{movie.reviewsCount.toLocaleString()} Đánh giá</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Poster footer */}
            <div className="p-3 bg-[#07203a] flex items-center justify-between gap-2 border-t border-[#142b45]">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  isLiked
                    ? 'bg-[#93000a]/30 text-[#ffb4ab] border border-[#ffb4ab]/30'
                    : 'bg-[#142b45] text-[#aec9eb] hover:bg-[#203650]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] text-[#f7c96d]">
                  {isLiked ? 'favorite' : 'favorite_border'}
                </span>
                <span>{isLiked ? 'Đã yêu thích (3.8k)' : 'Yêu thích (3.8k)'}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Đã sao chép liên kết chia sẻ phim!');
                }}
                className="py-2 px-3 rounded-lg bg-[#142b45] hover:bg-[#203650] text-[#aec9eb] text-xs font-semibold"
                title="Chia sẻ liên kết phim"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
              </button>
            </div>
          </div>

          {/* Luxury Highlights Box */}
          <div className="bg-[#07203a] border border-[#d9ae55]/20 p-5 rounded-2xl flex flex-col gap-3 shadow-lg">
            <span className="text-xs uppercase tracking-widest text-[#f7c96d] font-bold">
              Đặc Quyền Khách VIP Tại NOVA
            </span>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#f7c96d] text-[20px] shrink-0 mt-0.5">diamond</span>
              <p className="text-xs text-[#d1c5b2] leading-relaxed">
                Thưởng thức ly Champagne Moët thượng hạng & canapé miễn phí tại sảnh VIP Lounge trước giờ chiếu 30 phút.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#f7c96d] text-[20px] shrink-0 mt-0.5">aspect_ratio</span>
              <p className="text-xs text-[#d1c5b2] leading-relaxed">
                Màn chiếu thế hệ mới IMAX GT Dual Laser tỷ lệ 1.43:1 lớn nhất Đông Nam Á mang lại trải nghiệm mãn nhãn.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Video Player & Narrative & Showtimes */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* 4K Trailer Video Player Preview */}
          <div className="relative rounded-2xl overflow-hidden bg-[#000f21] border border-[#142b45] shadow-2xl group">
            <div className="aspect-video w-full relative">
              {isPlayingTrailer ? (
                <div className="w-full h-full bg-black flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#f7c96d] text-[#402d00] flex items-center justify-center mb-4 animate-bounce">
                    <span className="material-symbols-outlined text-3xl">play_arrow</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#d3e4ff] mb-2">Đang phát Trailer 4K UHD DCI Dolby Atmos</h4>
                  <p className="text-xs text-[#aec9eb] max-w-md mb-4">
                    Tác phẩm: {movie.title} • Âm thanh không gian đa kênh 12.0
                  </p>
                  <button
                    onClick={() => setIsPlayingTrailer(false)}
                    className="px-4 py-2 rounded-xl bg-[#142b45] text-xs font-semibold text-[#aec9eb] hover:text-[#d3e4ff]"
                  >
                    Đóng Player
                  </button>
                </div>
              ) : (
                <>
                  <img
                    src={movie.trailerThumb}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00142a] via-[#00142a]/30 to-transparent"></div>

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#00142a]/80 backdrop-blur-md text-[#f7c96d] text-xs font-semibold flex items-center gap-1.5 border border-[#d9ae55]/30">
                      <span className="w-2 h-2 rounded-full bg-[#ffb4ab] animate-ping"></span>
                      Trailer Chính Thức #2 (Bản 4K UHD)
                    </span>
                  </div>

                  {/* Play trigger button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setIsPlayingTrailer(true)}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f7c96d]/90 hover:bg-[#ffdea2] text-[#402d00] flex items-center justify-center shadow-[0_0_30px_rgba(247,201,109,0.6)] hover:scale-110 active:scale-95 transition-all"
                      title="Phát trailer 4K"
                    >
                      <span className="material-symbols-outlined text-4xl ml-1">play_arrow</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Title & Technical Specs */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#aec9eb]">
                <span>{movie.originalTitle}</span>
                <span>•</span>
                <span>Khởi chiếu: {movie.releaseDate}</span>
                <span>•</span>
                <span className="text-[#f7c96d] font-semibold">{movie.language}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#d3e4ff] mt-1 font-['Be_Vietnam_Pro']">
                {movie.title}
              </h1>
            </div>

            <p className="text-sm text-[#d1c5b2] leading-relaxed">
              {movie.synopsis}
            </p>

            {/* DCI Tech specs bar */}
            <div className="p-3.5 rounded-xl bg-[#07203a] border border-[#142b45] flex items-center gap-3 text-xs text-[#aec9eb]">
              <span className="material-symbols-outlined text-[#f7c96d] text-[20px]">verified</span>
              <span>
                <strong>Chuẩn kỹ thuật DCI:</strong> {movie.dciSpecs}
              </span>
            </div>
          </div>

          {/* Cast & Crew Section */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm uppercase tracking-wider text-[#f7c96d] font-bold">
              Đạo Diễn & Diễn Viên Chính
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#07203a] border border-[#142b45]">
                <div className="w-10 h-10 rounded-full bg-[#142b45] flex items-center justify-center text-[#f7c96d]">
                  <span className="material-symbols-outlined text-[20px]">videocam</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#d3e4ff] truncate">{movie.director}</span>
                  <span className="text-[10px] text-[#aec9eb]">Đạo diễn</span>
                </div>
              </div>

              {movie.cast.map((actor, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#07203a] border border-[#142b45]"
                >
                  <img
                    src={actor.avatar}
                    alt={actor.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-[#d9ae55]/40"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-[#d3e4ff] truncate">{actor.name}</span>
                    <span className="text-[10px] text-[#aec9eb] truncate">{actor.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SHOWTIMES BOOKING MATRIX */}
          <div className="bg-[#07203a] border border-[#d9ae55]/30 rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#142b45]">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#f7c96d] font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                  Lịch Chiếu & Đặt Vé Trực Tuyến
                </span>
                <h3 className="text-xl font-bold text-[#d3e4ff] mt-0.5 font-['Be_Vietnam_Pro']">
                  Chọn Suất Chiếu Hôm Nay
                </h3>
              </div>

              {/* Date Filter selector */}
              <div className="flex items-center gap-1.5 bg-[#00142a] p-1 rounded-xl border border-[#203650]">
                {[
                  { label: 'Hôm nay', date: '2025-05-18' },
                  { label: 'Ngày mai', date: '2025-05-19' },
                  { label: '20/05', date: '2025-05-20' },
                ].map((d) => (
                  <button
                    key={d.date}
                    onClick={() => setActiveDateTab(d.date)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeDateTab === d.date
                        ? 'bg-[#f7c96d] text-[#402d00] shadow'
                        : 'text-[#aec9eb] hover:text-[#d3e4ff]'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Landmark 81 Hall Group */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-[#aec9eb]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#f7c96d] text-[18px]">location_on</span>
                  <strong className="text-[#d3e4ff] font-semibold">NOVA Landmark 81 VIP (TP. HCM)</strong>
                </div>
                <span className="text-[11px] text-[#aec9eb]">Tầng B1, Vincom Landmark 81</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {landmarkShowtimes.map((st) => (
                  <div
                    key={st.id}
                    className="p-4 rounded-xl bg-[#142b45] border border-[#203650] hover:border-[#d9ae55] transition-all flex flex-col justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#aec9eb]">
                        <span className="font-semibold text-[#f7c96d]">{st.hallName}</span>
                        <span className="px-2 py-0.5 rounded bg-[#00142a] text-[10px] text-[#aec9eb]">
                          {st.availableSeats} ghế trống
                        </span>
                      </div>
                      <div className="text-xl font-extrabold text-[#d3e4ff] mt-1 font-mono">
                        {st.startTime} <span className="text-xs text-[#aec9eb] font-sans font-normal">- {st.endTime}</span>
                      </div>
                      <p className="text-xs text-[#aec9eb] mt-1 font-medium">
                        Giá vé: {st.priceStandard.toLocaleString('vi-VN')}đ - {st.priceVip.toLocaleString('vi-VN')}đ
                      </p>
                    </div>

                    <button
                      onClick={() => startBookingForShowtime(st.id)}
                      className="w-full py-2.5 rounded-lg bg-[#f7c96d] group-hover:bg-[#ffdea2] text-[#402d00] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow"
                    >
                      <span className="material-symbols-outlined text-[16px]">airline_seat_recline_extra</span>
                      <span>Chọn Ghế Suất Này</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Westlake Hall Group */}
            {westlakeShowtimes.length > 0 && (
              <div className="flex flex-col gap-3 pt-4 border-t border-[#142b45]">
                <div className="flex items-center justify-between text-xs text-[#aec9eb]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#f7c96d] text-[18px]">location_on</span>
                    <strong className="text-[#d3e4ff] font-semibold">NOVA West Lake (Hà Nội)</strong>
                  </div>
                  <span className="text-[11px] text-[#aec9eb]">Tầng 4, Lotte Mall West Lake</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {westlakeShowtimes.map((st) => (
                    <div
                      key={st.id}
                      className="p-4 rounded-xl bg-[#142b45] border border-[#203650] hover:border-[#d9ae55] transition-all flex flex-col justify-between gap-3 group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-[#aec9eb]">
                          <span className="font-semibold text-[#f7c96d]">{st.hallName}</span>
                          <span className="px-2 py-0.5 rounded bg-[#00142a] text-[10px] text-[#aec9eb]">
                            {st.availableSeats} ghế trống
                          </span>
                        </div>
                        <div className="text-xl font-extrabold text-[#d3e4ff] mt-1 font-mono">
                          {st.startTime} <span className="text-xs text-[#aec9eb] font-sans font-normal">- {st.endTime}</span>
                        </div>
                        <p className="text-xs text-[#aec9eb] mt-1 font-medium">
                          Giá vé: {st.priceStandard.toLocaleString('vi-VN')}đ - {st.priceVip.toLocaleString('vi-VN')}đ
                        </p>
                      </div>

                      <button
                        onClick={() => startBookingForShowtime(st.id)}
                        className="w-full py-2.5 rounded-lg bg-[#f7c96d] group-hover:bg-[#ffdea2] text-[#402d00] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow"
                      >
                        <span className="material-symbols-outlined text-[16px]">airline_seat_recline_extra</span>
                        <span>Chọn Ghế Suất Này</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Fast Booking Dock */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#07203a]/90 backdrop-blur-2xl border-t border-[#d9ae55]/30 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-10 h-14 object-cover rounded-md hidden sm:block shrink-0 ring-1 ring-[#d9ae55]/40"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase tracking-widest text-[#f7c96d] font-bold">
                Đang Xem Phim
              </span>
              <h4 className="text-sm font-bold text-[#d3e4ff] truncate font-['Be_Vietnam_Pro']">
                {movie.title}
              </h4>
              <p className="text-xs text-[#aec9eb]">
                {movie.formats.join(' • ')} | Thời lượng: {movie.duration} phút
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => startBookingForMovie(movie.id)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d9ae55] to-[#f7c96d] text-[#402d00] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
              <span>Đặt Vé Ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
