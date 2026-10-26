import React, { useState } from 'react';
import { useCinema } from '../context/CinemaContext';

export const MovieCatalogScreen: React.FC = () => {
  const { movies, navigateTo, startBookingForMovie } = useCinema();

  const [activeTab, setActiveTab] = useState<'now-showing' | 'upcoming'>('now-showing');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'newest' | 'popularity'>('rating');

  const filteredMovies = movies.filter((m) => {
    if (m.status !== activeTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchDir = m.director.toLowerCase().includes(q);
      const matchCast = m.cast.some((c) => c.name.toLowerCase().includes(q));
      if (!matchTitle && !matchDir && !matchCast) return false;
    }
    if (selectedFormat !== 'all' && !m.formats.includes(selectedFormat)) {
      return false;
    }
    if (selectedGenre !== 'all' && !m.genres.includes(selectedGenre)) {
      return false;
    }
    if (selectedAge !== 'all' && m.ageRating !== selectedAge) {
      return false;
    }
    return true;
  });

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'popularity') return b.reviewsCount - a.reviewsCount;
    return 0;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedFormat('all');
    setSelectedGenre('all');
    setSelectedAge('all');
    setSortBy('rating');
  };

  return (
    <div className="w-full min-h-screen pt-28 pb-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Editorial Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#aec9eb]">
          <button onClick={() => navigateTo('home')} className="hover:text-[#f7c96d] transition-colors">
            Trang chủ
          </button>
          <span>/</span>
          <span className="text-[#f7c96d] font-semibold">Kho Phim Chuẩn DCI Hollywood</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#d3e4ff] tracking-tight font-['Be_Vietnam_Pro']">
          Danh Sách Phim Tuyển Chọn
        </h1>
        <p className="text-sm text-[#aec9eb] max-w-3xl leading-relaxed">
          Tất cả tác phẩm tại NOVA CINEMA đều được phát hành với bản mã hóa kỹ thuật số cao cấp nhất từ các xưởng phim Hollywood, hỗ trợ hình ảnh chuẩn 4K HDR và âm thanh vòm Dolby Atmos đa hướng.
        </p>
      </div>

      {/* Filter & Search Deck */}
      <div className="bg-[#07203a] border border-[#142b45] p-6 rounded-2xl flex flex-col gap-5 shadow-xl">
        {/* Top line: Tabs + Search + Sort */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center bg-[#00142a] p-1 rounded-xl border border-[#203650] shrink-0">
            <button
              onClick={() => setActiveTab('now-showing')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'now-showing'
                  ? 'bg-[#f7c96d] text-[#402d00] shadow-md'
                  : 'text-[#aec9eb] hover:text-[#d3e4ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">play_circle</span>
              <span>Đang Chiếu</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-black/20">
                {movies.filter((m) => m.status === 'now-showing').length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-[#f7c96d] text-[#402d00] shadow-md'
                  : 'text-[#aec9eb] hover:text-[#d3e4ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">upcoming</span>
              <span>Sắp Khởi Chiếu</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-black/20">
                {movies.filter((m) => m.status === 'upcoming').length}
              </span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-xl">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aec9eb] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tựa phim, đạo diễn Christopher Nolan, diễn viên..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#00142a] text-[#d3e4ff] text-xs placeholder-[#aec9eb]/50 border border-[#203650] focus:border-[#f7c96d] focus:outline-none"
            />
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[#aec9eb]">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-3 py-2 text-xs font-medium focus:border-[#f7c96d] focus:outline-none"
            >
              <option value="rating">Đánh giá cao nhất (9.0+)</option>
              <option value="popularity">Lượt xem & Phổ biến nhất</option>
              <option value="newest">Phim mới ra rạp</option>
            </select>
          </div>
        </div>

        {/* Multi-facet filter chips */}
        <div className="pt-2 border-t border-[#142b45] flex flex-col gap-3">
          {/* Format */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#aec9eb] font-semibold w-24">
              Định dạng:
            </span>
            {['all', 'IMAX Laser GT', 'Dolby Atmos', 'VIP Gold Lounge', 'ScreenX 270°'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedFormat === fmt
                    ? 'bg-[#f7c96d] text-[#402d00] font-bold'
                    : 'bg-[#142b45] text-[#aec9eb] hover:bg-[#203650] hover:text-[#d3e4ff]'
                }`}
              >
                {fmt === 'all' ? 'Tất cả' : fmt}
              </button>
            ))}
          </div>

          {/* Genre */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#aec9eb] font-semibold w-24">
              Thể loại:
            </span>
            {['all', 'Hành động', 'Khoa học viễn tưởng', 'Tiểu sử', 'Tâm lý', 'Hoạt hình'].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedGenre === g
                    ? 'bg-[#f7c96d] text-[#402d00] font-bold'
                    : 'bg-[#142b45] text-[#aec9eb] hover:bg-[#203650] hover:text-[#d3e4ff]'
                }`}
              >
                {g === 'all' ? 'Tất cả' : g}
              </button>
            ))}
          </div>

          {/* Age rating */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-[#aec9eb] font-semibold w-24">
                Độ tuổi:
              </span>
              {['all', 'P', 'K', 'T13', 'T16', 'T18'].map((age) => (
                <button
                  key={age}
                  onClick={() => setSelectedAge(age)}
                  className={`px-2.5 py-0.5 rounded text-xs font-bold transition-colors ${
                    selectedAge === age
                      ? 'bg-[#f7c96d] text-[#402d00]'
                      : 'bg-[#142b45] text-[#aec9eb] hover:bg-[#203650]'
                  }`}
                >
                  {age === 'all' ? 'Tất cả' : age}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-[#aec9eb]">
              <span>
                Hiển thị <strong className="text-[#f7c96d]">{sortedMovies.length}</strong> tác phẩm
              </span>
              <button
                onClick={resetFilters}
                className="text-[#f7c96d] hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                Đặt lại
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of movies */}
      {sortedMovies.length === 0 ? (
        <div className="p-16 text-center bg-[#07203a] rounded-2xl border border-[#142b45]">
          <span className="material-symbols-outlined text-4xl text-[#aec9eb] mb-2">movie_filter</span>
          <p className="text-base text-[#d3e4ff] font-semibold">Không tìm thấy phim phù hợp</p>
          <p className="text-xs text-[#aec9eb] mt-1">Vui lòng điều chỉnh hoặc đặt lại các bộ lọc tìm kiếm.</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-[#f7c96d] text-[#402d00] text-xs font-bold"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedMovies.map((movie) => (
            <article
              key={movie.id}
              className="group relative flex flex-col bg-[#07203a] rounded-2xl overflow-hidden border border-[#142b45] hover:border-[#d9ae55]/50 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(217,174,85,0.15)]"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#142b45]">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07203a] via-transparent to-transparent"></div>

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

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#aec9eb]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    {movie.duration} phút
                  </span>
                  <span className="text-[11px] text-[#d3e4ff] bg-black/60 px-2 py-0.5 rounded">
                    {movie.language.split(' - ')[0]}
                  </span>
                </div>
              </div>

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

                <div className="flex items-center gap-2 pt-2 border-t border-[#142b45]">
                  <button
                    onClick={() => startBookingForMovie(movie.id)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#f7c96d] hover:bg-[#ffdea2] text-[#402d00] font-bold text-xs text-center transition-all shadow-md flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">confirmation_number</span>
                    <span>Đặt vé</span>
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
      )}
    </div>
  );
};
