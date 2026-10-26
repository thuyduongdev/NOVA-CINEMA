import React, { useState } from 'react';
import { useCinema } from '../context/CinemaContext';

export const HomeScreen: React.FC = () => {
  const {
    movies,
    cinemas,
    navigateTo,
    startBookingForMovie,
    startBookingForShowtime,
    showtimes,
  } = useCinema();

  const [activeTab, setActiveTab] = useState<'now-showing' | 'upcoming'>('now-showing');
  const [quickMovie, setQuickMovie] = useState(movies[0].id);
  const [quickCinema, setQuickCinema] = useState(cinemas[0].id);
  const [quickDate, setQuickDate] = useState('2025-05-18');

  const heroMovie = movies.find((m) => m.id === 'dune-2') || movies[0];

  const nowShowingMovies = movies.filter((m) => m.status === 'now-showing');
  const upcomingMovies = movies.filter((m) => m.status === 'upcoming');
  const displayedMovies = activeTab === 'now-showing' ? nowShowingMovies : upcomingMovies;

  const handleQuickBook = () => {
    const matchedShowtime = showtimes.find(
      (st) => st.movieId === quickMovie && st.cinemaId === quickCinema
    );
    if (matchedShowtime) {
      startBookingForShowtime(matchedShowtime.id);
    } else {
      startBookingForMovie(quickMovie);
    }
  };

  return (
    <div className="flex flex-col w-full relative overflow-hidden">
      {/* Golden atmospheric ambient light leak */}
      <div className="pointer-events-none absolute -top-40 left-1/3 w-[700px] h-[700px] bg-[#f7c96d]/10 rounded-full blur-[160px] mix-blend-screen" />
      <div className="pointer-events-none absolute top-1/2 -right-40 w-[600px] h-[600px] bg-[#304b68]/20 rounded-full blur-[140px]" />

      {/* 1. HERO BILLBOARD BANNER */}
      <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-start overflow-hidden pt-20">
        {/* Background Key Art Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('${heroMovie.bannerUrl}')`,
          }}
        >
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00142a] via-[#00142a]/80 to-transparent w-full lg:w-3/4"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#00142a] via-[#00142a]/40 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 w-full flex flex-col justify-end">
          <div className="max-w-2xl flex flex-col gap-4">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#f7c96d] text-[#402d00] text-xs font-bold uppercase tracking-wider shadow-md">
                Premiere Landmark
              </span>
              <span className="px-3 py-1 rounded-full bg-[#142b45]/90 backdrop-blur-md text-[#d3e4ff] text-xs font-medium border border-[#203650]">
                IMAX Laser GT Dual 1.43:1
              </span>
              <span className="px-2.5 py-0.5 rounded bg-[#93000a] text-[#ffdad6] text-xs font-bold">
                {heroMovie.ageRating}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#d3e4ff] tracking-tight font-['Be_Vietnam_Pro'] leading-tight">
              {heroMovie.title}
            </h1>

            {/* Metas */}
            <div className="flex items-center gap-4 text-xs sm:text-sm text-[#aec9eb]">
              <span className="flex items-center gap-1 text-[#f7c96d] font-bold">
                <span className="material-symbols-outlined text-[18px]">star</span>
                {heroMovie.rating}/10
              </span>
              <span>•</span>
              <span>{heroMovie.duration} Phút</span>
              <span>•</span>
              <span>{heroMovie.genres.join(' • ')}</span>
              <span>•</span>
              <span className="text-[#f7c96d]">Đạo diễn: {heroMovie.director}</span>
            </div>

            {/* Synopsis */}
            <p className="text-sm sm:text-base text-[#d1c5b2] line-clamp-3 leading-relaxed">
              {heroMovie.synopsis}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => startBookingForMovie(heroMovie.id)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d9ae55] to-[#f7c96d] text-[#402d00] font-bold text-sm shadow-xl shadow-[#f7c96d]/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">confirmation_number</span>
                <span>Đặt vé IMAX ngay</span>
              </button>

              <button
                onClick={() => navigateTo('movie-detail', { movieId: heroMovie.id })}
                className="px-6 py-3.5 rounded-xl bg-[#142b45]/85 hover:bg-[#203650] text-[#d3e4ff] text-sm font-semibold border border-[#d9ae55]/30 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px] text-[#f7c96d]">play_circle</span>
                <span>Xem Trailer 4K & Chi tiết</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FAST BOOKING WIDGET (Docked below hero) */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 -mt-10 w-full">
        <div className="bg-[#07203a] border border-[#d9ae55]/30 rounded-2xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          <div className="flex items-center gap-2 text-[#f7c96d] text-xs font-bold uppercase tracking-widest mb-3">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>Đặt Vé Nhanh VIP Concierge</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {/* Phim */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-wider text-[#aec9eb] font-semibold">
                1. Chọn Phim
              </label>
              <select
                value={quickMovie}
                onChange={(e) => setQuickMovie(e.target.value)}
                className="w-full bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-3 py-2.5 text-xs font-medium focus:border-[#f7c96d] focus:outline-none"
              >
                {movies.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Rạp */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-wider text-[#aec9eb] font-semibold">
                2. Chọn Cụm Rạp
              </label>
              <select
                value={quickCinema}
                onChange={(e) => setQuickCinema(e.target.value)}
                className="w-full bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-3 py-2.5 text-xs font-medium focus:border-[#f7c96d] focus:outline-none"
              >
                {cinemas.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Ngày */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-wider text-[#aec9eb] font-semibold">
                3. Ngày Chiếu
              </label>
              <select
                value={quickDate}
                onChange={(e) => setQuickDate(e.target.value)}
                className="w-full bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-3 py-2.5 text-xs font-medium focus:border-[#f7c96d] focus:outline-none"
              >
                <option value="2025-05-18">Hôm nay - 18/05/2025</option>
                <option value="2025-05-19">Ngày mai - 19/05/2025</option>
                <option value="2025-05-20">Thứ Ba - 20/05/2025</option>
                <option value="2025-05-21">Thứ Tư Vui Vẻ - 21/05/2025</option>
              </select>
            </div>

            {/* Submit */}
            <div className="flex flex-col justify-end pt-5">
              <button
                onClick={handleQuickBook}
                className="w-full py-2.5 px-4 rounded-xl bg-[#f7c96d] hover:bg-[#ffdea2] text-[#402d00] font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Tìm Suất Chiếu</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NOW SHOWING & COMING SOON CAROUSEL / GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 w-full">
        {/* Header with tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-8 border-b border-[#142b45]">
          <div>
            <div className="flex items-center gap-2 text-[#f7c96d] text-xs uppercase font-bold tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#f7c96d]"></span>
              Danh Mục Phim Tuyển Chọn
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#d3e4ff] mt-1 font-['Be_Vietnam_Pro']">
              Tác Phẩm Chiếu Rạp Đỉnh Cao
            </h2>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center bg-[#07203a] p-1 rounded-xl border border-[#142b45]">
            <button
              onClick={() => setActiveTab('now-showing')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'now-showing'
                  ? 'bg-[#f7c96d] text-[#402d00] shadow-md'
                  : 'text-[#aec9eb] hover:text-[#d3e4ff]'
              }`}
            >
              Đang Chiếu ({nowShowingMovies.length})
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-[#f7c96d] text-[#402d00] shadow-md'
                  : 'text-[#aec9eb] hover:text-[#d3e4ff]'
              }`}
            >
              Sắp Khởi Chiếu ({upcomingMovies.length})
            </button>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {displayedMovies.map((movie) => (
            <article
              key={movie.id}
              className="group relative flex flex-col bg-[#07203a] rounded-2xl overflow-hidden border border-[#142b45] hover:border-[#d9ae55]/50 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(217,174,85,0.15)]"
            >
              {/* Poster 2:3 */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#142b45]">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07203a] via-transparent to-transparent"></div>

                {/* Badges on poster */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[#f7c96d] text-[11px] font-bold">
                    {movie.ageRating}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#d9ae55] text-[#402d00] text-[10px] font-bold">
                    {movie.formats[0]}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[#f7c96d] text-xs font-semibold">
                    <span className="material-symbols-outlined text-[13px]">star</span>
                    {movie.rating}
                  </span>
                </div>

                {/* Bottom specs */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#aec9eb]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    {movie.duration} phút
                  </span>
                  <span className="text-[11px] text-[#f7c96d] font-medium">Dolby Atmos</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase text-[#aec9eb] tracking-wider font-semibold">
                    {movie.genres.slice(0, 2).join(' • ')}
                  </p>
                  <h3 className="text-base font-bold text-[#d3e4ff] group-hover:text-[#f7c96d] transition-colors line-clamp-1 mt-0.5 font-['Be_Vietnam_Pro']">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-[#d1c5b2] line-clamp-2 mt-1 leading-relaxed">
                    {movie.synopsis}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#142b45]">
                  <button
                    onClick={() => startBookingForMovie(movie.id)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#f7c96d] hover:bg-[#ffdea2] text-[#402d00] font-bold text-xs text-center transition-all shadow-md flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">confirmation_number</span>
                    <span>Đặt vé ngay</span>
                  </button>

                  <button
                    onClick={() => navigateTo('movie-detail', { movieId: movie.id })}
                    className="p-2 rounded-xl bg-[#142b45] hover:bg-[#203650] text-[#aec9eb] hover:text-[#d3e4ff] transition-colors"
                    title="Chi tiết & Lịch chiếu"
                  >
                    <span className="material-symbols-outlined text-[18px]">info</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigateTo('movies')}
            className="px-6 py-3 rounded-xl bg-[#07203a] hover:bg-[#142b45] text-[#f7c96d] border border-[#d9ae55]/30 text-xs uppercase tracking-widest font-bold transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Khám phá toàn bộ 20+ phim đang chiếu</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* 4. LUXURY EXPERIENCE PILLARS (3 Columns) */}
      <section className="w-full bg-[#031c36] py-20 border-y border-[#142b45]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#f7c96d] text-xs uppercase tracking-widest font-bold">
              Đẳng Cấp Điện Ảnh Số 1
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#d3e4ff] mt-2 font-['Be_Vietnam_Pro']">
              Ba Trụ Cột Trải Nghiệm Xa Xỉ
            </h2>
            <p className="text-sm text-[#aec9eb] mt-2">
              Mỗi khoảnh khắc tại NOVA CINEMA đều được thiết kế tỉ mỉ để thỏa mãn mọi giác quan của những khán giả khó tính nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="p-8 rounded-2xl bg-[#07203a] border border-[#d9ae55]/20 shadow-xl flex flex-col gap-4 relative overflow-hidden group hover:border-[#f7c96d] transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#142b45] flex items-center justify-center text-[#f7c96d] shadow-inner group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px]">theaters</span>
              </div>
              <h3 className="text-xl font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
                IMAX Laser GT Dual 4K
              </h3>
              <p className="text-xs text-[#d1c5b2] leading-relaxed">
                Màn chiếu vĩ đại tỷ lệ 1.43:1 lớn nhất khu vực với hệ thống máy chiếu laser đôi thế hệ mới, mang lại độ tương phản tuyệt đối và độ sáng gấp 3 lần chuẩn rạp thông thường.
              </p>
              <div className="text-xs font-semibold text-[#f7c96d] flex items-center gap-1 mt-auto pt-2">
                <span>Âm thanh Dolby Atmos 12.0</span>
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-2xl bg-[#07203a] border border-[#d9ae55]/20 shadow-xl flex flex-col gap-4 relative overflow-hidden group hover:border-[#f7c96d] transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#142b45] flex items-center justify-center text-[#f7c96d] shadow-inner group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px]">airline_seat_recline_extra</span>
              </div>
              <h3 className="text-xl font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
                Suite Lounger Da Bò Ý
              </h3>
              <p className="text-xs text-[#d1c5b2] leading-relaxed">
                Ghế sofa lười chỉnh điện không trọng lực bọc da Nappa cao cấp nhập khẩu từ Ý, tích hợp cổng sạc không dây, đèn đọc sách riêng và khoảng cách riêng tư tuyệt đối giữa các hàng ghế.
              </p>
              <div className="text-xs font-semibold text-[#f7c96d] flex items-center gap-1 mt-auto pt-2">
                <span>Rung phản hồi 4D tích hợp</span>
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-2xl bg-[#07203a] border border-[#d9ae55]/20 shadow-xl flex flex-col gap-4 relative overflow-hidden group hover:border-[#f7c96d] transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#142b45] flex items-center justify-center text-[#f7c96d] shadow-inner group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[32px]">wine_bar</span>
              </div>
              <h3 className="text-xl font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
                VIP Lounge & Fine Dining
              </h3>
              <p className="text-xs text-[#d1c5b2] leading-relaxed">
                Đặc quyền nghỉ ngơi tại sảnh VIP sang trọng trước giờ chiếu 45 phút, thưởng thức canapé nghệ thuật, rượu vang hảo hạng hoặc bắp caramel nấm truffle phục vụ tận chỗ ngồi.
              </p>
              <div className="text-xs font-semibold text-[#f7c96d] flex items-center gap-1 mt-auto pt-2">
                <span>Phục vụ quản gia chuyên biệt</span>
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NOVA ELITE CLUB LOYALTY CARD PROMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 w-full">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#07203a] via-[#142b45] to-[#07203a] border border-[#d9ae55]/40 p-8 sm:p-12 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl flex flex-col gap-3">
            <span className="text-[#f7c96d] text-xs uppercase font-bold tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              Nova Elite Membership Pass
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
              Mở Khóa Đặc Quyền Hội Viên VIP Gold
            </h2>
            <p className="text-xs sm:text-sm text-[#d1c5b2] leading-relaxed">
              Tích lũy 10% giá trị cho mỗi giao dịch vé và ẩm thực, ưu tiên chọn vị trí ghế VIP trước giờ mở bán công khai 48 giờ, nhận vé mời tham dự thảm đỏ công chiếu phim độc quyền.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => navigateTo('profile')}
                className="px-6 py-3 rounded-xl bg-[#f7c96d] hover:bg-[#ffdea2] text-[#402d00] font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Xem Hạng Thẻ Của Bạn
              </button>
              <button
                onClick={() => navigateTo('pricing')}
                className="px-6 py-3 rounded-xl bg-[#00142a] text-[#aec9eb] hover:text-[#d3e4ff] border border-[#203650] text-xs font-semibold"
              >
                Chính Sách Điểm Thưởng
              </button>
            </div>
          </div>

          {/* Virtual VIP Card Mock */}
          <div className="relative w-80 h-48 rounded-2xl bg-gradient-to-tr from-[#5c4200] via-[#d9ae55] to-[#f7c96d] p-6 text-[#261900] shadow-[0_15px_35px_rgba(217,174,85,0.4)] flex flex-col justify-between shrink-0 transform hover:rotate-1 hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm tracking-widest font-['Be_Vietnam_Pro'] uppercase">
                NOVA ELITE PASS
              </span>
              <span className="material-symbols-outlined text-[24px]">contactless</span>
            </div>
            <div className="my-2">
              <span className="text-[10px] uppercase tracking-widest text-[#402d00] font-semibold">
                Gold Tier Member
              </span>
              <p className="font-mono text-lg font-bold tracking-widest">
                NV • 8921 • 4567 • 0019
              </p>
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span>ALEXANDRE NGUYEN</span>
              <span>EXP: 12/28</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
