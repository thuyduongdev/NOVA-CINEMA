import React from 'react';
import { useCinema } from '../context/CinemaContext';

export const PricingScreen: React.FC = () => {
  const { navigateTo } = useCinema();

  const pricingTable = [
    { format: 'Standard 2D / Laser RGB', weekday: '120.000đ', weekend: '140.000đ', vipWeekday: '150.000đ', vipWeekend: '170.000đ' },
    { format: 'Dolby Atmos 4K Prestige', weekday: '140.000đ', weekend: '160.000đ', vipWeekday: '170.000đ', vipWeekend: '190.000đ' },
    { format: 'IMAX Laser GT Dual 1.43:1', weekday: '180.000đ', weekend: '220.000đ', vipWeekday: '220.000đ', vipWeekend: '260.000đ' },
    { format: 'ScreenX 270° Panoramic', weekday: '160.000đ', weekend: '190.000đ', vipWeekday: '190.000đ', vipWeekend: '230.000đ' },
    { format: 'VIP Suite Lounger (Sofa Da Ý)', weekday: '250.000đ', weekend: '300.000đ', vipWeekday: '250.000đ', vipWeekend: '300.000đ' },
    { format: 'Sweetbox Couple (Ghế Đôi)', weekday: '320.000đ', weekend: '380.000đ', vipWeekday: '320.000đ', vipWeekend: '380.000đ' },
  ];

  return (
    <div className="w-full min-h-screen pt-28 pb-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col gap-12">
      {/* Editorial Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#aec9eb]">
          <button onClick={() => navigateTo('home')} className="hover:text-[#f7c96d] transition-colors">
            Trang chủ
          </button>
          <span>/</span>
          <span className="text-[#f7c96d] font-semibold">Chính Sách Giá Vé & Ưu Đãi</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#d3e4ff] tracking-tight font-['Be_Vietnam_Pro']">
          Bảng Giá Vé & Đặc Quyền Hội Viên
        </h1>
        <p className="text-sm text-[#aec9eb] max-w-2xl">
          Minh bạch chính sách giá vé theo từng định dạng công nghệ phòng chiếu, ngày trong tuần và các ưu đãi thành viên độc quyền.
        </p>
      </div>

      {/* Pricing Matrix Table */}
      <div className="bg-[#07203a] border border-[#142b45] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#142b45]">
          <h3 className="text-base font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
            Bảng Giá Vé Niêm Yết Theo Định Dạng
          </h3>
          <span className="text-xs text-[#f7c96d] font-semibold">Đơn vị: VNĐ / Vé</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#aec9eb]">
            <thead className="text-[11px] uppercase tracking-wider text-[#f7c96d] bg-[#00142a] border-b border-[#203650]">
              <tr>
                <th className="py-3.5 px-4">Định Dạng Phòng Chiếu</th>
                <th className="py-3.5 px-4">Ghế Thường (Thứ 2 - 5)</th>
                <th className="py-3.5 px-4">Ghế Thường (Cuối Tuần)</th>
                <th className="py-3.5 px-4">Ghế VIP (Thứ 2 - 5)</th>
                <th className="py-3.5 px-4">Ghế VIP (Cuối Tuần)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#142b45]">
              {pricingTable.map((row, i) => (
                <tr key={i} className="hover:bg-[#142b45]/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#d3e4ff]">{row.format}</td>
                  <td className="py-3.5 px-4 font-mono">{row.weekday}</td>
                  <td className="py-3.5 px-4 font-mono text-[#f7c96d] font-semibold">{row.weekend}</td>
                  <td className="py-3.5 px-4 font-mono">{row.vipWeekday}</td>
                  <td className="py-3.5 px-4 font-mono text-[#f7c96d] font-bold">{row.vipWeekend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Promotional Programs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#07203a] border border-[#d9ae55]/30 shadow-xl flex flex-col justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#f7c96d] tracking-wider block mb-1">
              Thứ Tư Hàng Tuần
            </span>
            <h3 className="text-lg font-bold text-[#d3e4ff]">Thứ Tư Vui Vẻ - NOVA Day</h3>
            <p className="text-xs text-[#aec9eb] mt-2 leading-relaxed">
              Đồng giá vé chỉ từ 100.000đ cho tất cả suất chiếu 2D và giảm 30% giá vé IMAX Laser GT cho toàn bộ khách hàng.
            </p>
          </div>
          <button
            onClick={() => navigateTo('schedule')}
            className="py-2.5 px-4 rounded-xl bg-[#142b45] hover:bg-[#203650] text-[#f7c96d] text-xs font-bold self-start border border-[#d9ae55]/30 transition-colors"
          >
            Xem lịch chiếu thứ tư
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-[#07203a] border border-[#d9ae55]/30 shadow-xl flex flex-col justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#f7c96d] tracking-wider block mb-1">
              Hội Viên VIP Gold
            </span>
            <h3 className="text-lg font-bold text-[#d3e4ff]">Đặc Quyền Ẩm Thực & Lounge</h3>
            <p className="text-xs text-[#aec9eb] mt-2 leading-relaxed">
              Giảm 10% tổng hóa đơn F&B, miễn phí vào phòng chờ VIP Lounge thưởng thức rượu vang canapé và nhận 02 vé xem phim sinh nhật.
            </p>
          </div>
          <button
            onClick={() => navigateTo('profile')}
            className="py-2.5 px-4 rounded-xl bg-[#f7c96d] hover:bg-[#ffdea2] text-[#402d00] text-xs font-bold self-start transition-colors"
          >
            Xem hạng thẻ của bạn
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-[#07203a] border border-[#d9ae55]/30 shadow-xl flex flex-col justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#f7c96d] tracking-wider block mb-1">
              Đặt Vé Trước 48h
            </span>
            <h3 className="text-lg font-bold text-[#d3e4ff]">Early Bird IMAX GT</h3>
            <p className="text-xs text-[#aec9eb] mt-2 leading-relaxed">
              Nhập mã <span className="font-mono text-[#f7c96d] font-bold">PREMIERE20</span> khi đặt vé trước ngày công chiếu để được giảm ngay 80.000đ trên tổng hóa đơn.
            </p>
          </div>
          <button
            onClick={() => navigateTo('movies')}
            className="py-2.5 px-4 rounded-xl bg-[#142b45] hover:bg-[#203650] text-[#f7c96d] text-xs font-bold self-start border border-[#d9ae55]/30 transition-colors"
          >
            Khám phá phim sắp chiếu
          </button>
        </div>
      </div>
    </div>
  );
};
