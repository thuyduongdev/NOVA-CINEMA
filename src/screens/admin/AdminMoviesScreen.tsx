import React, { useState } from 'react';
import { useCinema } from '../../context/CinemaContext';
import { AdminLayout } from './AdminLayout';
import { Movie } from '../../data/cinemaData';

export const AdminMoviesScreen: React.FC = () => {
  const { movies, adminAddMovie, adminDeleteMovie } = useCinema();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [director, setDirector] = useState('');
  const [duration, setDuration] = useState(120);
  const [ageRating, setAgeRating] = useState<'P' | 'K' | 'T13' | 'T16' | 'T18'>('T16');
  const [genres, setGenres] = useState('Khoa học viễn tưởng, Hành động');
  const [formats, setFormats] = useState('IMAX Laser GT, Dolby Atmos');
  const [dciSpecs, setDciSpecs] = useState('DCP 4K SMPTE 24fps • Aspect 1.90:1 • Dolby Atmos');
  const [synopsis, setSynopsis] = useState('');
  const [posterUrl, setPosterUrl] = useState('');

  const handleOpenAdd = () => {
    setEditingMovie(null);
    setTitle('');
    setOriginalTitle('');
    setDirector('');
    setDuration(120);
    setAgeRating('T16');
    setGenres('Khoa học viễn tưởng, Hành động');
    setFormats('IMAX Laser GT, Dolby Atmos');
    setDciSpecs('DCP 4K SMPTE 24fps • Aspect 1.90:1 • Dolby Atmos');
    setSynopsis('');
    setPosterUrl('https://lh3.googleusercontent.com/aida-public/AB6AXuCCa_LOJOnHza2YutumH1cfUNiZ65iqVzNq91p7_8LnaWu2G_aB45ZQg2CX-Ift-tV-96pglQ55DDwmhizW_YIhWPjCeW6_47XlVIu-8cvKC2CyNZJ49omXXL4Bh85w_9NXhCGIKJ3wljgIIf1LEwXWYuZEAp6sq725BJmLzYzsZ_Kf9hF7EBf7intFh0Kgv29yyhYnTWBd0TbjIQC4YpsLbT_QPNNjgtpHh-YhEZKqp8S5ddxfHz0z');
    setDrawerOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    adminAddMovie({
      title,
      originalTitle: originalTitle || title,
      genres: genres.split(',').map((s) => s.trim()),
      duration: Number(duration),
      ageRating,
      formats: formats.split(',').map((s) => s.trim()),
      rating: 9.0,
      imdbScore: 8.5,
      reviewsCount: 100,
      posterUrl:
        posterUrl ||
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCCa_LOJOnHza2YutumH1cfUNiZ65iqVzNq91p7_8LnaWu2G_aB45ZQg2CX-Ift-tV-96pglQ55DDwmhizW_YIhWPjCeW6_47XlVIu-8cvKC2CyNZJ49omXXL4Bh85w_9NXhCGIKJ3wljgIIf1LEwXWYuZEAp6sq725BJmLzYzsZ_Kf9hF7EBf7intFh0Kgv29yyhYnTWBd0TbjIQC4YpsLbT_QPNNjgtpHh-YhEZKqp8S5ddxfHz0z',
      bannerUrl:
        posterUrl ||
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCCa_LOJOnHza2YutumH1cfUNiZ65iqVzNq91p7_8LnaWu2G_aB45ZQg2CX-Ift-tV-96pglQ55DDwmhizW_YIhWPjCeW6_47XlVIu-8cvKC2CyNZJ49omXXL4Bh85w_9NXhCGIKJ3wljgIIf1LEwXWYuZEAp6sq725BJmLzYzsZ_Kf9hF7EBf7intFh0Kgv29yyhYnTWBd0TbjIQC4YpsLbT_QPNNjgtpHh-YhEZKqp8S5ddxfHz0z',
      trailerThumb:
        posterUrl ||
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCCa_LOJOnHza2YutumH1cfUNiZ65iqVzNq91p7_8LnaWu2G_aB45ZQg2CX-Ift-tV-96pglQ55DDwmhizW_YIhWPjCeW6_47XlVIu-8cvKC2CyNZJ49omXXL4Bh85w_9NXhCGIKJ3wljgIIf1LEwXWYuZEAp6sq725BJmLzYzsZ_Kf9hF7EBf7intFh0Kgv29yyhYnTWBd0TbjIQC4YpsLbT_QPNNjgtpHh-YhEZKqp8S5ddxfHz0z',
      synopsis,
      director,
      cast: [],
      releaseDate: new Date().toLocaleDateString('vi-VN'),
      status: 'now-showing',
      language: 'Tiếng Anh - Phụ đề Việt',
      revenue: '0 VNĐ',
      dciSpecs,
    });
    setDrawerOpen(false);
  };

  return (
    <AdminLayout activeSection="admin-movies">
      <div className="flex flex-col gap-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#142b45]">
          <div>
            <div className="flex items-center gap-2 text-[#f7c96d] text-xs uppercase font-bold tracking-widest">
              <span className="material-symbols-outlined text-[16px]">movie</span>
              <span>Quản Lý Kho Phim Kỹ Thuật Số (AD02)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#d3e4ff] tracking-tight font-['Be_Vietnam_Pro'] mt-1">
              Kho Phim & Bản Mã Hóa DCI Hollywood
            </h1>
            <p className="text-xs text-[#aec9eb] mt-0.5">
              Kiểm tra tính tương thích máy chiếu, thời lượng phim và cấu hình đệm dọn dẹp (+15m) phục vụ thuật toán AD04.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="py-3 px-5 rounded-xl bg-[#f7c96d] hover:bg-[#ffdea2] text-[#402d00] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Thêm Phim Mới</span>
          </button>
        </div>

        {/* Movies Inventory Table */}
        <div className="bg-[#07203a] border border-[#142b45] rounded-3xl p-6 shadow-xl flex flex-col gap-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#aec9eb]">
              <thead className="text-[11px] uppercase tracking-wider text-[#f7c96d] bg-[#00142a] border-b border-[#203650]">
                <tr>
                  <th className="py-3.5 px-4">Tác Phẩm & Áp Phích</th>
                  <th className="py-3.5 px-4">Độ Tuổi</th>
                  <th className="py-3.5 px-4">Thời Lượng</th>
                  <th className="py-3.5 px-4">Định Dạng Chiếu</th>
                  <th className="py-3.5 px-4">Chuẩn Kỹ Thuật DCI</th>
                  <th className="py-3.5 px-4">Doanh Thu Tích Lũy</th>
                  <th className="py-3.5 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#142b45]">
                {movies.map((m) => (
                  <tr key={m.id} className="hover:bg-[#142b45]/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={m.posterUrl}
                          alt={m.title}
                          className="w-12 h-16 object-cover rounded-lg shadow shrink-0"
                        />
                        <div>
                          <strong className="text-[#d3e4ff] text-sm block">{m.title}</strong>
                          <span className="text-[10px] text-[#9a8f7e]">ĐD: {m.director}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#93000a] text-[#ffdad6] text-[10px] font-bold">
                        {m.ageRating}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#d3e4ff]">
                      {m.duration} phút
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {m.formats.map((f, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 rounded bg-[#142b45] text-[#aec9eb] text-[10px]"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-[#d1c5b2] max-w-xs truncate">
                      {m.dciSpecs || 'DCP 4K SMPTE 24fps'}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#f7c96d]">
                      {m.revenue || '0 VNĐ'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            if (confirm(`Bạn có chắc muốn gỡ tác phẩm "${m.title}" khỏi rạp?`)) {
                              adminDeleteMovie(m.id);
                            }
                          }}
                          className="w-8 h-8 rounded-lg bg-[#93000a]/20 hover:bg-[#93000a]/40 text-[#ffb4ab] flex items-center justify-center transition-colors"
                          title="Gỡ phim"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Slide-over Drawer for Adding Movie */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
          <div className="w-full max-w-xl bg-[#07203a] border-l border-[#d9ae55]/40 h-full p-8 overflow-y-auto flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#142b45]">
                <div className="flex items-center gap-2 text-[#f7c96d]">
                  <span className="material-symbols-outlined">add_to_photos</span>
                  <h3 className="text-lg font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
                    Nhập Phim Kỹ Thuật Số Mới (DCI Package)
                  </h3>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#142b45] text-[#aec9eb] flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSave} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase text-[#aec9eb] font-semibold">Tựa phim tiếng Việt</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="VD: Gladiator II"
                    className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2 text-xs focus:border-[#f7c96d] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase text-[#aec9eb] font-semibold">Tựa gốc</label>
                    <input
                      type="text"
                      value={originalTitle}
                      onChange={(e) => setOriginalTitle(e.target.value)}
                      placeholder="VD: Gladiator II"
                      className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2 text-xs focus:border-[#f7c96d] focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase text-[#aec9eb] font-semibold">Đạo diễn</label>
                    <input
                      type="text"
                      required
                      value={director}
                      onChange={(e) => setDirector(e.target.value)}
                      placeholder="VD: Ridley Scott"
                      className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2 text-xs focus:border-[#f7c96d] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase text-[#aec9eb] font-semibold">Thời lượng (Phút)</label>
                    <input
                      type="number"
                      required
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2 text-xs focus:border-[#f7c96d] focus:outline-none font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase text-[#aec9eb] font-semibold">Phân loại tuổi</label>
                    <select
                      value={ageRating}
                      onChange={(e) => setAgeRating(e.target.value as any)}
                      className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2 text-xs focus:border-[#f7c96d] focus:outline-none"
                    >
                      <option value="P">P (Mọi đối tượng)</option>
                      <option value="K">K (Dưới 13 tuổi có phụ huynh)</option>
                      <option value="T13">T13 (Từ 13 tuổi trở lên)</option>
                      <option value="T16">T16 (Từ 16 tuổi trở lên)</option>
                      <option value="T18">T18 (Từ 18 tuổi trở lên)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase text-[#aec9eb] font-semibold">Thể loại (ngăn cách bằng dấu phẩy)</label>
                  <input
                    type="text"
                    value={genres}
                    onChange={(e) => setGenres(e.target.value)}
                    className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2 text-xs focus:border-[#f7c96d] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase text-[#aec9eb] font-semibold">Định dạng hỗ trợ</label>
                  <input
                    type="text"
                    value={formats}
                    onChange={(e) => setFormats(e.target.value)}
                    className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2 text-xs focus:border-[#f7c96d] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase text-[#aec9eb] font-semibold">Thông số DCI DCP</label>
                  <input
                    type="text"
                    value={dciSpecs}
                    onChange={(e) => setDciSpecs(e.target.value)}
                    className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl px-4 py-2 text-xs focus:border-[#f7c96d] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase text-[#aec9eb] font-semibold">Tóm tắt nội dung</label>
                  <textarea
                    rows={3}
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                    placeholder="Tóm tắt ngắn gọn cốt truyện..."
                    className="bg-[#00142a] text-[#d3e4ff] border border-[#203650] rounded-xl p-3 text-xs focus:border-[#f7c96d] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 py-3.5 rounded-xl bg-[#f7c96d] hover:bg-[#ffdea2] text-[#402d00] font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  Lưu Vào Kho Phim Kỹ Thuật Số
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
